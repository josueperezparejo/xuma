import { LogModel } from "../../database/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevelSeverity } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    await LogModel.create(log);
  }

  async getLogs(level: LogLevelSeverity): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: level });
    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
