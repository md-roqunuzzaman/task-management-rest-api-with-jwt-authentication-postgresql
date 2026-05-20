import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
const config = {
  port: process.env.PORT || 3000,
  connectionSecret: process.env.connectionStr,
  secret: process.env.jwtSecret,
  refreshSecret: process.env.refreshTkn,
};
export default config;
