import { z } from "zod";
import { addressSchema } from "./adress.schemas";

const realEstateSchema = z.object({
  value: z.string().max(12).or(z.number().multipleOf(0.01).positive().max(12)),
  size: z.number(),
  address: addressSchema,
  category: z.number(),
  sold: z.boolean().default(false),
});

const realEstateSchemaAddressAsNumber = z.object({
  value: z.string().max(12).or(z.number().multipleOf(0.01).positive().max(12)),
  size: z.number(),
  address: z.number(),
  categoryId: z.number(),
  sold: z.boolean().default(false),
});

const returnRealEstateSchema = realEstateSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const returnMultipleRealEstateSchema = returnRealEstateSchema.array();

export {
  realEstateSchema,
  returnRealEstateSchema,
  realEstateSchemaAddressAsNumber,
  returnMultipleRealEstateSchema,
};
