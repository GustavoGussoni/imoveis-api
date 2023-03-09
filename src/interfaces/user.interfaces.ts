import {
  returnMultipleUserSchema,
  returnUserSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof returnUserSchema>;
type IMultipleUsersReturn = z.infer<typeof returnMultipleUserSchema>;

type IUserUpdateData = z.infer<typeof userUpdateSchema>;
type IUserUpdate = DeepPartial<IUserUpdateData>;

export { IUser, IUserReturn, IMultipleUsersReturn, IUserUpdate };
