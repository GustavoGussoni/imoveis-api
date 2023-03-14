import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listScheduleService = async (realEstateId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
    },
  });

  if (!realEstate) throw new AppError("RealEstate not found", 404);

  const listSchedules = await realEstateRepository
    .createQueryBuilder("realEstate")
    .select(["schedules", "user", "realEstate", "address", "category"])
    .innerJoin("realEstate.schedules", "schedules")
    .innerJoin("realEstate.address", "address")
    .innerJoin("realEstate.category", "category")
    .innerJoin("schedules.user", "user")
    .where("realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .getOne();

  return listSchedules;
};

export default listScheduleService;
