import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./app/modules/user/user.routes";

const app: Application = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/users", userRouter);
app.use("/users/:id", userRouter);
app.use("users/:id", userRouter);
app.use("users/:id", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "express server is running" });
});

export default app;
