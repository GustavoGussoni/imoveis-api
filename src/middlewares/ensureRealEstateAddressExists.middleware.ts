import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, User } from "../entities";
import { AppError } from "../errors";

const ensureRealEstateAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findAddress = await realEstateRepository.findOne({
    where: {
      address: req.body.address,
    },
  });

  if (findAddress) throw new AppError("Address already exists", 409);

  return next();
};

export default ensureRealEstateAddressExistsMiddleware;
