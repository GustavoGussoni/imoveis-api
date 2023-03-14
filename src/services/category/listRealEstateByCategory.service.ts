import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listRealEstateByCategoryService = async (
  categoryId: number
): Promise<any> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.find({
    where: {
      id: categoryId,
    },
  });

  if (!findCategory) throw new AppError("Category not found", 400);

  const findRealEstate = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  });

  if (!findRealEstate) throw new AppError("Category not found", 404);

  return findRealEstate;
};

export default listRealEstateByCategoryService;
