import { authOptions } from "@/lib/auth/authOpreations";
import { db } from "@/lib/db/db";
import {
  deliveryPerson,
  inventories,
  orders,
  products,
  wareHouses,
} from "@/lib/db/schema";
import { orderSchema } from "@/lib/validation/orderSchema";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "not allowed" }, { status: 401 });
  }

  const requestData = await request.json();

  let validatedData;
  try {
    validatedData = await orderSchema.parse(requestData);
  } catch (error) {
    console.error("Validation Error:", error);
    return Response.json(
      { message: "Validation failed for order data" },
      { status: 400 }
    );
  }

  const warehouseResult = await db
    .select({ id: wareHouses.id })
    .from(wareHouses)
    .where(eq(wareHouses.pincode, validatedData.pincode));

  if (!warehouseResult.length) {
    return Response.json({ message: "No Warehouse found" }, { status: 400 });
  }

  const foundProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, validatedData.productId))
    .limit(1);

  if (!foundProduct.length) {
    return Response.json({ message: "No product found" }, { status: 400 });
  }

  let transcationError = "";
  let finalOrder: unknown;

  // normalize values TypeScript can't infer from runtime checks
  const userId = (session as any)?.token?.id ?? (session.user as any)?.id;
  const product = foundProduct[0];

  try {
    finalOrder = await db.transaction(async (tx) => {
      // creating order

      const order = await tx
        .insert(orders)
        .values({
          ...validatedData,
          userId,
          price: (product?.price ?? 0) * validatedData.qty,
          status: "received",
        })
        .returning({
          id: orders.id,
          price: orders.price,
        });

      // checking stocks
      const availableStock = await tx
        .select()
        .from(inventories)
        .where(
          and(
            eq(inventories.wareHousesId, warehouseResult[0].id),
            eq(inventories.productId, validatedData.productId),
            isNull(inventories.orderId)
          )
        )
        .limit(validatedData.qty)
        .for("update", { skipLocked: true });

      if (availableStock.length < validatedData.qty) {
        transcationError = `Stock is low; only ${availableStock.length} available`;
        tx.rollback();
        return;
      }

      // checking delivery person
      const availablePerson = await tx
        .select()
        .from(deliveryPerson)
        .where(
          and(
            isNull(deliveryPerson.orderId),
            eq(deliveryPerson.wareHousesId, warehouseResult[0].id)
          )
        )
        .for("update")
        .limit(1);

      if (!availablePerson.length) {
        transcationError = "Delivery person will be available shortly";
        tx.rollback();
        return;
      }

      // update inventories
      await tx
        .update(inventories)
        .set({ orderId: order[0].id })
        .where(
          inArray(
            inventories.id,
            availableStock.map((stock) => stock.id)
          )
        );

      // assign delivery person
      await tx
        .update(deliveryPerson)
        .set({ orderId: order[0].id })
        .where(eq(deliveryPerson.id, availablePerson[0].id));

      // update order status
      await tx
        .update(orders)
        .set({ status: "reserved" })
        .where(eq(orders.id, order[0].id));

      return order[0];
    });

    // ✅ Use finalOrder to prevent unused var warning
    return Response.json(
      { message: "Order successfully created", order: finalOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    return Response.json(
      {
        message: transcationError || "Error during transaction",
      },
      { status: 500 }
    );
  }

  // If you implement payment later, then use paymentUrl
  // const paymentUrl = "https://example-payment.com";
}
