import { db } from "@/lib/db/db";
import { wareHouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validation/wareHouseSchema";

export async function POST(request: Request) {
  // todo::check auth
  const requestData = await request.json();
  console.log("request", requestData);
  let validatedData;

  try {
    validatedData = await warehouseSchema.parse(requestData);
  } catch (error) {
    return Response.json(
      {
        error: error,
      },
      {
        status: 404,
      }
    );
  }

  try {
    await db.insert(wareHouses).values(validatedData);
    return Response.json(
      {
        maessage: "ok",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed to store the wareHouse",
      },
      {
        status: 500,
      }
    );
  }
}
