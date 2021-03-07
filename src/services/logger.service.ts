import winston, {Logger} from 'winston';
import ActionLogger from './action-logger.service';
import 'winston-daily-rotate-file';
import Service, {Inject} from './service';
import MonitorService from './monitor.service';


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


export class LoggerServiceOptions
{
  dir: string = '';
  level: string = 'error';
}


@Inject()
export default class LoggerService extends Service
{
  options = new LoggerServiceOptions();
  protected winstonLogger: Logger;


  constructor(protected monitor: MonitorService)
  {
    super();
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


  action(name: string)
  {
    const actionLogger = new ActionLogger(this, this.monitor);
    actionLogger.options.action = name;
    actionLogger.init();

    return actionLogger;
  }
}
