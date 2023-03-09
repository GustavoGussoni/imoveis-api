import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;

  if (!isAdmin) throw new AppError("User needs to be admin", 404);

  return next();
};

export default ensureUserIsAdminMiddleware;
