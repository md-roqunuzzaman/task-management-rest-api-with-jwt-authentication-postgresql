import type { Request, Response } from "express";
import { taskService } from "./task.service";

const createTask = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.id;
    const payload = {
      ...req.body,
      user_id,
    };
    const result = await taskService.createTaskInDB(payload);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.getAllTaskFromDB();
    res.status(200).json({
      success: true,
      message: "All tasks retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await taskService.getSingleTaskFromDB(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: " tasks not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "single tasks retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await taskService.updateTaskInDB(req.body, id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: " tasks not found",
      });
    }
    res.status(200).json({
      success: true,
      message: " tasks updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await taskService.deleteTaskFromDB(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: " tasks not found",
      });
    }
    res.status(200).json({
      success: true,
      message: " tasks deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const taskController = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
