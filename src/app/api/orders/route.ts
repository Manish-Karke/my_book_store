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
import { tr } from "zod/v4/locales";

export async function POST(request: Request, {}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return Response.json(
      {
        message: "not allowed",
      },
      {
        status: 401,
      }
    );
  }
  const requestData = await request.json();
  let validatedData;

  try {
    validatedData = await orderSchema.parse(requestData);
  } catch (error) {
    return Response.json(
      { message: "this iss the error from the order" },
      {
        status: 404,
      }
    );
  }

  console.log("validated deta", validatedData);

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

  let transcationError: String = "";
  //starting of transcation
  let finalOrder: any;
  try {
    finalOrder = await db.transaction(async (tx) => {
      //crating order
      const order = await tx
        .insert(orders)
        // @ts-ignore
        .values({
          ...validatedData,
          userId: session.token.id,
          // @ts-ignore
          price: foundProduct[0].price * validatedData.qty,
          status: "recevied",
        })
        .returning({
          id: orders.id,
          price: orders.price,
        });

      //checking the stocks"
      const avaliableStock = await tx
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

      if (avaliableStock.length < validatedData.qty) {
        transcationError = `stock is low and ${avaliableStock.length} is only avaliable`;
        tx.rollback();
        return;
      }

      //checking delilvery person
      const avaliablePerson = await tx
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

      if (!avaliablePerson.length) {
        transcationError = `Delivery person will be avaliable shortly`;
        tx.rollback();
        return;
      }

      //stock and deliveryperson is avaliable
      //updatinf inventories table and orderID
      await tx
        .update(inventories)
        .set({ orderId: order[0].id })
        .where(
          inArray(
            inventories.id,
            avaliableStock.map((stock) => stock.id)
          )
        );

      //update delivery person
      await tx
        .update(deliveryPerson)
        .set({ orderId: order[0].id })
        .where(eq(deliveryPerson.id, avaliablePerson[0].id));

      //update the order

      await tx
        .update(orders)
        .set({ status: "reserved" })
        .where(eq(orders.id, order[0].id));

      return order[0];
    });
  } catch (error) {
    return Response.json(
      {
        message: transcationError
          ? transcationError
          : "error during transcation",
      },
      {
        status: 500,
      }
    );
  }

  // payment==>creating invoice
}
