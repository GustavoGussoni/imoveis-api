import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { returnMultipleUserSchema } from "../schemas/user.schemas";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers = await userRepository.find({
    withDeleted: true,
  });

  const users = returnMultipleUserSchema.parse(findUsers);

  const userFind = users.find((el) => el.id === parseInt(req.params.id));

  if (!userFind) throw new AppError("User not found", 404);

  return next();
};

export default ensureUserExistsMiddleware;
