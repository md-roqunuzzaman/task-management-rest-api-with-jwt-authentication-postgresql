import { Router } from "express";
import { taskController } from "./task.controller";
import { auth } from "../../../middleware/auth";
import { USER_ROLE } from "../../../types";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  taskController.createTask,
);

router.get("/", taskController.getAllTask);
router.get("/:id", taskController.getSingleTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
export const taskRouter = router;
