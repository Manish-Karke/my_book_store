import { z } from "zod"; // ✅ use { z } not default import

export const orderSchema = z.object({
  productId: z.number({ message: "product id should be a number" }),
  pincode: z
    .string({ message: "pincode should be string" })
    .length(6, "pincode should be 6 character long"),
  qty: z.number({ message: "quantity should be a number" }),
  address: z
    .string({ message: "address should be a string" })
    .min(5, { message: "address should be 6 character long" }),
});
