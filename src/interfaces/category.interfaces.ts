import {
  categorySchema,
  returnCategorySchema,
  returnMultipleCategorySchema,
} from "../schemas/category.schemas";
import { z } from "zod";

type ICategory = z.infer<typeof categorySchema>;
type ICategoryReturn = z.infer<typeof returnCategorySchema>;
type IMultipleCategoryReturn = z.infer<typeof returnMultipleCategorySchema>;

export { ICategory, ICategoryReturn, IMultipleCategoryReturn };
