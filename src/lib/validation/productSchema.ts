import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Product name is required" }),
  description: z.string({ message: "Product description is required" }),
  price: z.coerce.number().min(0, "Price must be positive"),
  image: z.any().optional(),
});
