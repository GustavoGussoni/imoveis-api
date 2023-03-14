import { z } from "zod";
import { addressSchema } from "./adress.schemas";

const realEstateSchema = z.object({
  value: z.string().or(z.number().multipleOf(0.01).positive()),
  categoryId: z.number(),
  size: z.number().positive(),
  address: addressSchema,
});

const returnRealEstateSchema = realEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sold: z.boolean(),
  })
  .omit({ categoryId: true });

const returnMultipleRealEstateSchema = returnRealEstateSchema.array();

export {
  realEstateSchema,
  returnRealEstateSchema,
  returnMultipleRealEstateSchema,
};
