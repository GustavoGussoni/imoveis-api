import { z } from "zod";

const addressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string(),
  state: z.string().max(2),
});

const returnAddressSchema = addressSchema.extend({
  id: z.number(),
});

const multipleAddressSchema = returnAddressSchema.array();

export { addressSchema, returnAddressSchema, multipleAddressSchema };
