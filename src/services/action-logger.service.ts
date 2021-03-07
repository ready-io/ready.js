import moment from 'moment';
import LoggerService from './logger.service';
import MonitorService from './monitor.service';
import Service from './service';


export class ActionLoggerOptions
{
  timestamp: string = moment().format('x');
  action: string = 'unknown';
}


export default class ActionLogger extends Service
{
  options = new ActionLoggerOptions();


  constructor(protected logger: LoggerService,
              protected monitor: MonitorService)
  {
    super();
  }


  error(message: string)
  {
    this.log('error', message);
  }


  warn(message: string)
  {
    this.log('warn', message);
  }


  info(message: string)
  {
    this.log('info', message);
  }


  debug(message: string)
  {
    this.log('debug', message);
  }


  log(level: string, message: string)
  {
    this.logger.log({
      timestamp: moment(+this.options.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
      memory: `${this.monitor.getMemoryUsage()}MB`,
      level: level,
      message: message,
      action: this.options.action,
      duration: `${(+moment().format('x')) - (+this.options.timestamp)}ms`
    });
  }
}
