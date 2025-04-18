import credentials from "./config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: credentials.database,
  username: credentials.username,
  password: credentials.password,
  host: credentials.host,
  port: credentials.port,
  dialect: credentials.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const database = {
  sequelize,
  Sequelize,
  async authenticate() {
    try {
      await sequelize.authenticate();
      console.log("✅ Postgres Database connected");
    } catch (error) {
      console.error("❌ Unable to connect to the Postgres database");
      process.exit(1);
    }
  },
  async sync() {
    if (process.env.NODE_ENV === "development") {
      try {
        await sequelize.sync({ alter: true });
        console.log("✅ Models synchronized");
      } catch (error) {
        console.error("❌ Error synchronizing models");
        process.exit(1);
      }
    }
  },
};

export default database;
