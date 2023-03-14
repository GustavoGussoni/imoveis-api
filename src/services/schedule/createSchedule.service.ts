import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";
import { ISchedule } from "../../interfaces/schedules.interfaces";

const createScheduleService = async (
  scheduleData: ISchedule,
  userId: number
) => {
  const { realEstateId, date, hour } = scheduleData;

  const scheduleHour = Number(scheduleData.hour.split(":")[0]);
  const scheduleDate = new Date(scheduleData.date);
  const scheduleDay = scheduleDate.getDay();

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const verifyRealEstateExists = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!verifyRealEstateExists) throw new AppError("RealEstate not found", 404);

  const schedulesList = await AppDataSource.createQueryBuilder(
    Schedule,
    "schedules"
  )
    .innerJoinAndSelect("schedules.realEstate", "realEstate")
    .where("realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();

  if (schedulesList)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const userList = await AppDataSource.createQueryBuilder(Schedule, "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("user.id = :userId", { userId: userId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();

  if (userList)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  if (scheduleHour < 8 || scheduleHour >= 18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  if (scheduleDay === 0 || scheduleDay === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const schedule = scheduleRepository.create(scheduleData);
  await scheduleRepository.save(schedule);

  return schedule;
};
export default createScheduleService;
