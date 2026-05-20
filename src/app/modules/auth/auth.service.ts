import { error } from "console";
import { pool } from "../../../db";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../../config";
const loginUserInDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  //here is 3 steps
  //1 check if the user exits or not ,2 compare the password,then generate token

  const userDate = await pool.query(
    `SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  console.log(userDate);
  if (userDate.rows.length === 0) {
    throw new Error("invalid credential");
  }
  //2 compare the password
  const user = userDate.rows[0];
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    throw new Error("invalid credential");
  }

  //generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refreshSecret as string, {
    expiresIn: "1year",
  });
  console.log(accessToken);
  console.log(refreshToken);
  return { accessToken, refreshToken };
};
const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("unauthorized access");
  }

  const decode = jwt.verify(
    token as string,
    config.refreshSecret as string,
  ) as JwtPayload;
  const userData = pool.query(
    `
        SELECT * FROM users WHERE email=$1`,
    [decode.email],
  );
  const user = (await userData).rows[0];
  if (!user) {
    throw new Error("user not found");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};
export const authService = {
  loginUserInDB,
  generateRefreshToken,
};
