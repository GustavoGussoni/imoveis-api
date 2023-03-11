import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;
  const reqId = parseInt(req.params.id);
  if (!isAdmin) {
    if (reqId === req.user.id) {
      return next();
    }
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureUserIsAdminMiddleware;
