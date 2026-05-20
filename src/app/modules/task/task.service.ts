import { pool } from "../../../db";
import type { ITask } from "./task.interface";

const createTaskInDB = async (payload: ITask) => {
  const { title, description, status, user_id } = payload;
  const result = await pool.query(
    `INSERT INTO tasks(title,description,status,user_id)
         VALUES($1,$2,COALESCE($3,'pending'),$4)
         RETURNING *`,
    [title, description, status, user_id],
  );
  return result;
};

const getAllTaskFromDB = async () => {
  const result = pool.query(`SELECT * FROM tasks`);
  return result;
};

const getSingleTaskFromDB = async (id: string) => {
  const result = pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
  return result;
};

const updateTaskInDB = async (payload: ITask, id: string) => {
  const { title, description, status } = payload;
  const result = await pool.query(
    `
 UPDATE tasks
    SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      status = COALESCE($3, status)
    WHERE id = $4
    RETURNING *
    `,
    [title, description, status, id],
  );

  return result;
};

const deleteTaskFromDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM tasks WHERE id=$1 `, [id]);
  return result;
};
export const taskService = {
  createTaskInDB,
  getAllTaskFromDB,
  getSingleTaskFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
};
