import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listRealEstateService = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const listRealEstate = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return listRealEstate;
};

export default listRealEstateService;
