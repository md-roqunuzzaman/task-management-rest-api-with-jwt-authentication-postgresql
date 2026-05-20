import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";
export const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("roles", roles);

    try {
      const token = req.headers.authorization;
      // console.log("token", token);
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "unauthorized access",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      const userData = pool.query(
        `
        SELECT * FROM users WHERE email=$1`,
        [decode.email],
      );
      const user = (await userData).rows[0];
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!,This role have no access!",
        });
      }

      req.user = decode;
      console.log(decode.role);
      console.log("user role", user.role);

      next();
    } catch (error) {
      next(error);
    }
  };
};
