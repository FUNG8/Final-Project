import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pgClient = new Client({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host:process.env.POSTGRES_HOST
});

pgClient.connect()