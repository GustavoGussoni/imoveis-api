import { hashSync } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z
    .string()
    .max(120)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  admin: z.boolean().default(false),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = returnUserSchema.array();

const userUpdateSchema = returnUserSchema
  .partial()
  .omit({ admin: true, id: true });

export {
  userSchema,
  userUpdateSchema,
  returnUserSchema,
  returnMultipleUserSchema,
};
