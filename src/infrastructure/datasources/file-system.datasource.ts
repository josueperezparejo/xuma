import fs from "fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevelSeverity } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/log-all.log";
  private readonly lowLogPath = "logs/log-low.log";
  private readonly mediumLogPath = "logs/log-medium.log";
  private readonly highLogPath = "logs/log-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.lowLogPath,
      this.mediumLogPath,
      this.highLogPath,
    ].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    fs.appendFileSync(this.allLogsPath, `${JSON.stringify(newLog)} \n`);

    if (newLog.level === LogLevelSeverity.low) {
      fs.appendFileSync(this.lowLogPath, `${JSON.stringify(newLog)} \n`);
    }
    if (newLog.level === LogLevelSeverity.medium) {
      fs.appendFileSync(this.mediumLogPath, `${JSON.stringify(newLog)} \n`);
    }
    if (newLog.level === LogLevelSeverity.high) {
      fs.appendFileSync(this.highLogPath, `${JSON.stringify(newLog)} \n`);
    }
  }

  async getLogs(severityLevel: LogLevelSeverity): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogLevelSeverity.low:
        return this.getLogsFromFile(this.lowLogPath);

      case LogLevelSeverity.medium:
        return this.getLogsFromFile(this.mediumLogPath);

      case LogLevelSeverity.high:
        return this.getLogsFromFile(this.highLogPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));

    return logs;
  }
}
