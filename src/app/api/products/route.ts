import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validation/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  console.log(data);
  let validatedData;
  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      image: data.get("image"),
      description: data.get("description"),
      price: Number(data.get("price")),
    });
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      {
        status: 404,
      }
    );
  }

  const filename = `${Date.now()}.${validatedData.image.name
    .split(".")
    .slice(-1)}`;

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", filename),
      buffer
    );
  } catch (error) {
    return Response.json(
      { message: "filed to save in fs" },
      {
        status: 404,
      }
    );
  }

  try {
    await db.insert(products).values({ ...validatedData, image: filename });
  } catch (error) {
    //todo: removing of stored image as if the opreation remains incomplete//
    //yo man this is to be done a
    return Response.json(
      {
        message: "faile to store Databse",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    { message: `the taske has been done  as ${data}` },
    { status: 200 }
  );
}
