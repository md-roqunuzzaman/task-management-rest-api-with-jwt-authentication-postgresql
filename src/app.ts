import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./app/modules/user/user.routes";
import { taskRouter } from "./app/modules/task/task.routes";
import { authRouter } from "./app/modules/auth/auth.routes";
import cookieParse from "cookie-parser";
import globalErrorHandler from "./middleware/globalErorHandle";

const app: Application = express();
app.use(cookieParse());
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "express server is running" });
});

export default app;
