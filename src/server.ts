import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import express, { Application } from "express";

import database from "./database/postgres";
import { MongoDatabase } from "./database/mongo";
import { logRoutes, orderRoutes } from "./routes";

dotenv.config();

class Server {
  public app: Application;
  public port: number | string;

  constructor() {
    this.app = express();
    this.port = this.getPort;

    this.loadMiddlewares();
    this.loadRoutes();
  }

  private get getPort(): number | string {
    const NODE_ENV = process.env.NODE_ENV || "development";
    return NODE_ENV === "production"
      ? process.env.APP_PORT_PROD || 3000
      : process.env.APP_PORT_DEV || 3001;
  }

  private get getEnvironment(): string {
    return process.env.NODE_ENV || "development";
  }

  private loadMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging with morgan
    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }

    // Basic security
    this.app.use(helmet());

    // CORS enabled for all by default (you can configure it)
    this.app.use(cors());
  }

  private loadRoutes(): void {
    this.app.get("/", (_req, res) => {
      res.send("Hello world from Express + TypeScript 🚀");
    });

    this.app.use("/api/logs", logRoutes);
    this.app.use("/api/orders", orderRoutes);
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await database.authenticate();
      await database.sync();

      await MongoDatabase.connect({
        mongoURL: process.env.MONGO_URL || "",
        dbName: process.env.MONGO_DB_NAMEL || "",
      });
    } catch (error) {
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    await this.connectToDatabase();

    let message: string;

    const NODE_ENV = process.env.NODE_ENV || "development";

    NODE_ENV === "production"
      ? (message = `🚀 Server ${this.getEnvironment} running`)
      : (message = `🚀 Server ${this.getEnvironment} running at http://localhost:${this.port} `);

    this.app.listen(this.port, () => {
      console.log(message);
    });
  }
}

export default Server;
