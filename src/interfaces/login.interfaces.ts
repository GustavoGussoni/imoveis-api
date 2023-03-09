import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

type ILogin = z.infer<typeof loginSchema>;

export { ILogin };
