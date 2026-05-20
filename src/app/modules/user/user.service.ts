import { pool } from "../../../db";
import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";
const createUserInDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'user'))
    RETURNING *
        `,
    [name, email, hashPass, role],
  );
  delete result.rows[0].password;
  return result;
};

const getUserFromDB = async () => {
  const result = await pool.query(
    `SELECT * FROM users
    `,
  );
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
};

const updateUserFromDB = async (id: string, payload: IUser) => {
  const { name, email, password, role } = payload;
  const result = pool.query(
    `UPDATE users 
     
    SET 
    name=COALESCE($1,name),
    email=COALESCE($2,email),
    password=COALESCE($3,password),
    role=COALESCE($4,role) 

    WHERE id=$5 RETURNING *
    `,
    [name, email, password, role, id],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `DELETE  FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};

export const userService = {
  createUserInDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
