import { Router } from "express";
import { validate } from "../middlewares";
import { LogController } from "../controllers";
import { getLogsValidationSchema } from "../validations";

const router = Router();

router.get("/", ...getLogsValidationSchema(), validate, LogController.getLogs);

export { router as logRoutes };
