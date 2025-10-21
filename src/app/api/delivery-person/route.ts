import { authOptions } from "@/lib/auth/authOpreations";
import { db } from "@/lib/db/db";
import { deliveryPerson, wareHouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validation/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "not allowed" }, { status: 401 });
  }

  // @ts-ignore
  if (session.token.role?.toLowerCase() !== "admin") {
    return Response.json({ message: "not a admin" }, { status: 403 });
  }

  const deliveryData = await request.json();
  let validatedData;
  try {
    validatedData = await deliveryPersonSchema.parse(deliveryData);
  } catch (error) {
    return Response.json(
      {
        message: "error form post deliveryPerson Schema",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await db.insert(deliveryPerson).values(validatedData);
    return Response.json(
      {
        message: "ok",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({ message: "failed to store the delivery-person" });
  }
}

export async function GET() {
  try {
    const deliveryPersonDetail = await db
      .select({
        id: deliveryPerson.id,
        name: deliveryPerson.name,
        phone: deliveryPerson.phone,
        warehouse: wareHouses.name,
      })
      .from(deliveryPerson)
      .leftJoin(wareHouses, eq(deliveryPerson.wareHousesId, wareHouses.id))
      .orderBy(desc(deliveryPerson.id));
    return Response.json(deliveryPersonDetail);
  } catch (error) {
    return Response.json(
      {
        message: "failed to feteched data",
      },
      { status: 400 }
    );
  }
}
