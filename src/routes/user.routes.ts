import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureEmailExistsMiddleware,
  createUserController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listUsersController
);
userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(userUpdateSchema),
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsAdminMiddleware,
  ensureUserIsActiveMiddleware,
  deleteUserController
);

export default userRoutes;
