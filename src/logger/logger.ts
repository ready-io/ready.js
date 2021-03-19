import winston from 'winston';
import 'winston-daily-rotate-file';
import {Service, ConfigHandler, Inject} from '../services/service';


/**
 * log levels
 * {
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   http: 3,
 *   verbose: 4,
 *   debug: 5,
 *   silly: 6
 * }
 */
export interface Log
{
  timestamp: string;
  memory: string;
  level: string;
  message: string;
  action: string;
  duration: string;
}


export class LoggerOptions
{
  dir: string = '';
  level: string = 'error';
}


@Inject()
export class Logger extends Service
{
  options = new LoggerOptions();
  protected winstonLogger: winston.Logger;


  constructor()
  {
    super();
  }


  static config(handler: ConfigHandler<LoggerOptions>)
  {
    return super.config(handler);
  }


  onInit()
  {
    this.winstonLogger = winston.createLogger();

    if (!this.options.dir)
    {
      this.winstonLogger.add(new winston.transports.Console({
        level: this.options.level,
        format: winston.format.json(),
      }));
    }
    else
    {
      const transport = new (winston.transports.DailyRotateFile)(
      {
        filename: `${this.options.dir}/app-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxFiles: '5d',
        utc: true,
        json: true,
        level: this.options.level
      });

      this.winstonLogger.add(transport);
    }
  }


  log(log: Log)
  {
    this.winstonLogger.log(log);
  }
}
