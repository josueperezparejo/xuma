import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevelSeverity } from "../../domain/entities/log.entity";

export class LogRepositoryImplementation implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  async getLogs(level: LogLevelSeverity): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(level);
  }
}
