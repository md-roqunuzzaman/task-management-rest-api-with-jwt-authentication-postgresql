import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionSecret,
});

export const initDB = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT,
            role VARCHAR(10) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT NOW()
            )
            `,
    );
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
