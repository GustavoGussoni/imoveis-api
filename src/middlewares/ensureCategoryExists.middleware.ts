import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category, User } from "../entities";
import { AppError } from "../errors";

const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findName = await categoryRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (findName) throw new AppError("Category already exists", 404);

  return next();
};

export default ensureCategoryExistsMiddleware;
