import winston from 'winston';
import ActionLog from './action-log';
import 'winston-daily-rotate-file';

export default class LoggerService
{
  logger: any;
  options: any;


  constructor(options: any)
  {
    this.logger  = null;
    this.options = options;
  }


  start()
  {
    let transport = new (winston.transports.DailyRotateFile)({
      filename: `${this.options.dir}/app-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '5d',
      utc: true,
      json: true,
      level: this.options.level || 'info'
    });

    this.logger = winston.createLogger({
      transports: [
        transport
      ],
    });
  }


  action(name: string)
  {
    return new ActionLog(this.logger, name);
  }
}
