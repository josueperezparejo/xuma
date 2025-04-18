require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  dialect: "postgres",
  logging: false,
};

const config = {
  development: {
    ...baseConfig,
    username: process.env.POSTGRES_DEV_USER,
    password: process.env.POSTGRES_DEV_PASSWORD,
    database: process.env.POSTGRES_DEV_DB,
    host: process.env.POSTGRES_DEV_HOST,
    port: process.env.POSTGRES_DEV_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    ...baseConfig,
    username: process.env.POSTGRES_PROD_USER,
    password: process.env.POSTGRES_PROD_PASSWORD,
    database: process.env.POSTGRES_PROD_DB,
    host: process.env.POSTGRES_PROD_HOST,
    port: process.env.POSTGRES_PROD_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config[env];
