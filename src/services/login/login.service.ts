import "dotenv/config";
import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/login.interfaces";
import jwt from "jsonwebtoken";

const loginService = async (loginData: ILogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) throw new AppError("Wrong email or password", 401);
  if (user.deletedAt !== null) throw new AppError("User is disabled", 401);

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) throw new AppError("Wrong email or password", 401);

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: String(process.env.EXPIRES_IN),
      subject: String(user.id),
    }
  );

  return token;
};

export default loginService;
