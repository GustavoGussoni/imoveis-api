import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { IMultipleCategoryReturn } from "../../interfaces/category.interfaces";
import { returnMultipleCategorySchema } from "../../schemas/category.schemas";

const listCategoryService = async (): Promise<IMultipleCategoryReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategories = await categoryRepository.find();

  if (!findCategories) throw new AppError("Category not found", 400);

  const categories = returnMultipleCategorySchema.parse(findCategories);

  return categories;
};

export default listCategoryService;
