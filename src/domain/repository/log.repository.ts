import { LogEntity, LogLevelSeverity } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(level: LogLevelSeverity): Promise<LogEntity[]>;
}
