import { authOptions } from "@/lib/auth/authOpreations";
import { orderSchema } from "@/lib/validation/orderSchema";
import { getServerSession } from "next-auth";

export async function POST(request:Request,{}) {
  const session = await getServerSession(authOptions);
  console.log(session)

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

    console.log("validated deta",validatedData)
}