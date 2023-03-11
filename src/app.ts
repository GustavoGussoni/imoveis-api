import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import categoryRoutes from "./routes/category.routes";
import realEstateRoutes from "./routes/realEstate.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);
export default app;
