import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IMultipleUsersReturn } from "../../interfaces/user.interfaces";
import { returnMultipleUserSchema } from "../../schemas/user.schemas";

const listUsersService = async (): Promise<IMultipleUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers = await userRepository.find({
    withDeleted: true,
  });

  const users = returnMultipleUserSchema.parse(findUsers);

  return users;
};

export { listUsersService };
