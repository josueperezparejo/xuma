import { LogEntity, LogLevelSeverity } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(level: LogLevelSeverity): Promise<LogEntity[]>;
}
