import { z } from "zod";

const VariantZodSchema = z.object({
  type: z.string().min(1, "Variant type is required."),
  value: z.string().min(1, "Variant value is required."),
});

const InventoryZodSchema = z.object({
  quantity: z.number().min(0, "Quantity must be a positive number."),
  inStock: z.boolean().refine((param) => param !== null, {
    message: "In-stock status is required.",
  }),
});


const ProductZodSchema = z.object({
  name: z.string().min(1, "Product name is required.").max(20,"Product name can not be more than 20 characters"),
  description: z.string().min(1, "Product description is required.").max(250,"Description can not be more than 250 character"),
  price: z.number().positive("Price must be a positive number."),
  category: z.string().min(1, "Category is required."),
  tags: z
    .array(z.string().min(1, "Tags cannot be empty."))
    .nonempty("At least one tag is required."),
  variants: z
    .array(VariantZodSchema)
    .nonempty("At least one variant is required."),
  inventory: InventoryZodSchema,
  
});


export default ProductZodSchema;