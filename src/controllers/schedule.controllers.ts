import { Request, Response } from "express";
import { AppError } from "../errors";
import createScheduleService from "../services/schedule/createSchedule.service";
import listScheduleService from "../services/schedule/listSchedule.service";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleData = req.body;
  const userId = req.user.id;

  await createScheduleService(scheduleData, userId);

  return res.status(201).json({
    message: "Schedule created",
  });
};

const listScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin = req.user.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }
  const realEstateId = parseInt(req.params.id);

  const schedule = await listScheduleService(realEstateId);

  return res.json(schedule);
};

export { createScheduleController, listScheduleController };
