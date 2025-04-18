import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
};

const credentials: Record<string, DBConfig> = {
  development: {
    username: process.env.POSTGRES_DEV_USER || "",
    password: process.env.POSTGRES_DEV_PASSWORD || "",
    database: process.env.POSTGRES_DEV_DB || "",
    host: process.env.POSTGRES_DEV_HOST || "localhost",
    port: Number(process.env.POSTGRES_DEV_PORT || 5432),
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_PROD_USER || "",
    password: process.env.POSTGRES_PROD_PASSWORD || "",
    database: process.env.POSTGRES_PROD_DB || "",
    host: process.env.POSTGRES_PROD_HOST || "localhost",
    port: Number(process.env.POSTGRES_PROD_PORT || 5432),
    dialect: "postgres",
  },
};

export default credentials[NODE_ENV];
