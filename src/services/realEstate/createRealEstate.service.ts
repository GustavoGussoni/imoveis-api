import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  IRealEstate,
  IRealEstateReturn,
} from "../../interfaces/realEstate.interfaces";

const createRealEstateService = async (
  realEstateData: IRealEstate
): Promise<IRealEstateReturn> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      id: realEstateData.categoryId,
    },
  });

  if (!findCategory) throw new AppError("Category not found", 404);

  const findAddress = await addressRepository.findOne({
    where: {
      street: realEstateData.address.street,
    },
  });
  if (findAddress) throw new AppError("Address already exists", 409);

  const address = addressRepository.create(realEstateData.address);
  await addressRepository.save(address);
  const newData = {
    ...realEstateData,
    address: address,
    category: findCategory,
  };

  const realEstate = realEstateRepository.create(newData);
  await realEstateRepository.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
