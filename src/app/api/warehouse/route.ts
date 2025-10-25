import { authOptions } from "@/lib/auth/authOpreations";
import { db } from "@/lib/db/db";
import { wareHouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validation/wareHouseSchema";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  // todo: check auth
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }
  // todo: check user access.
  // @ts-expect-error
  if (session.token.role?.toLowerCase() !== "admin") {
    return Response.json({ message: "Not allowed" }, { status: 403 });
  }

  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await warehouseSchema.parse(requestData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  try {
    await db.insert(wareHouses).values(validatedData);

    return Response.json({ message: "OK" }, { status: 201 });
  } catch (err:any) {
    return Response.json(
      { message:err.message ||"Failed to store the warehouse" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allWarehouses = await db
      .select()
      .from(wareHouses)
      .orderBy(desc(wareHouses.id));
    return Response.json(allWarehouses);
  } catch (err:any) {
    return Response.json(
      { message:err.message|| "Failed to fetch all warehouses" },
      { status: 500 }
    );
  }
}
