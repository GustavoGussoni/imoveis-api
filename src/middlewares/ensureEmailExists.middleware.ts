import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const ensureEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findEmail = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (findEmail) throw new AppError("Email already exists", 409);

  return next();
};

export default ensureEmailExistsMiddleware;
