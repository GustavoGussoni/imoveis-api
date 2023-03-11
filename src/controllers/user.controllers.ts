import { Request, Response } from "express";
import { AppError } from "../errors";
import {
  IUser,
  IUserUpdate,
  IUserUpdateData,
} from "../interfaces/user.interfaces";
import createUserService from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import { listUsersService } from "../services/user/listUsers.service";
import updateUserService from "../services/user/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const idUser = parseInt(req.params.id);
  const isAdmin = req.user.admin;

  if (!isAdmin) {
    if (req.user.id === idUser) {
      const updatedUser = await updateUserService(userData, idUser);

      return res.json(updatedUser);
    }

    throw new AppError("User not found", 404);
  }

  if (isAdmin) {
    const updatedUser = await updateUserService(userData, idUser);

    return res.json(updatedUser);
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(parseInt(req.params.id));

  return res.status(204).send();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
