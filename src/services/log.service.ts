import { LogRepository } from "../domain/repository/log.repository";

import { LogLevelSeverity } from "../domain/entities/log.entity";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";

class LogService {
  constructor(private readonly mongoLogRepository: LogRepository) {}

  public async getLogs(level: LogLevelSeverity) {
    try {
      const logs = await this.mongoLogRepository.getLogs(level);
      return logs;
    } catch (error) {}
  }
}

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);

export default new LogService(mongoLogRepository);
