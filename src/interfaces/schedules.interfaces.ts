import { z } from "zod";
import {
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/schedules.schemas";

type ISchedule = z.infer<typeof scheduleSchema>;
type IScheduleReturn = z.infer<typeof returnScheduleSchema>;

export { ISchedule, IScheduleReturn };
