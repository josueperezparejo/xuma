import { body } from "express-validator";
import { LogLevelSeverity } from "../domain/entities/log.entity";

const validLogLevelSeverity = Object.values(LogLevelSeverity);

export const getLogsValidationSchema = () => {
  return [
    body("level")
      .isIn(validLogLevelSeverity)
      .withMessage(
        `Invalid status. Valid values are: ${validLogLevelSeverity.join(", ")}`
      ),
  ];
};
