import { z } from "zod";

const categorySchema = z.object({
  name: z.string().max(45),
});

const returnCategorySchema = categorySchema.extend({
  id: z.number(),
});

const returnMultipleCategorySchema = returnCategorySchema.array();

export { categorySchema, returnCategorySchema, returnMultipleCategorySchema };
