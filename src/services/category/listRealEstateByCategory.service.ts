import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { IMultipleRealEstate } from "../../interfaces/realEstate.interfaces";

const listRealEstateByCategoryService = async (
  categoryId: number
): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.find({
    where: {
      id: categoryId,
    },
  });

  if (!findCategory) throw new AppError("Category not found", 400);

  const findRealEstate = await realEstateRepository.find({
    where: {
      category: findCategory,
    },
    relations: {
      address: true,
      category: true,
    },
  });

  if (!findRealEstate.length) throw new AppError("Not found", 404);

  return findRealEstate;
};

export default listRealEstateByCategoryService;
