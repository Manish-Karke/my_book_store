import { db } from "@/lib/db/db";
import { inventories, products, wareHouses } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validation/inventorieschema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();

  try {
    const validatedData = await inventoriesSchema.parse(requestData);
    const insertedData = await db.insert(inventories).values(validatedData);
    return Response.json({ message: insertedData }, { status: 200 });
  } catch (err: any) {
    console.error("POST Error:", err);
    return Response.json(
      { error: err.message || "Failed to insert inventory" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inventoriesData = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        wareHouses: wareHouses.id,
        product: products.id,
      })
      .from(inventories)
      .orderBy(desc(inventories.id))
      .leftJoin(wareHouses, eq(inventories.wareHousesId, wareHouses.id))
      .leftJoin(products, eq(inventories.productId, products.id));

    return Response.json(inventoriesData);
  } catch (err: any) {
    console.error("GET Error:", err);
    return Response.json(
      { message: err.message || "Error fetching inventories" },
      { status: 500 }
    );
  }
}
