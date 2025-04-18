export enum LogLevelSeverity {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogLevelSeverity;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogLevelSeverity;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options;

    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson(json: string): LogEntity {
    json = json === "" ? "{}" : json;
    const { level, message, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ level, message, createdAt, origin });

    return log;
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { level, message, createdAt, origin } = object;

    const log = new LogEntity({ level, message, createdAt, origin });

    return log;
  }
}
