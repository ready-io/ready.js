import moment from 'moment';
import Logger from './logger';
import MonitorService from '../services/monitor.service';
import Service, {ConfigHandler, Inject} from '../services/service';


export class ActionLoggerOptions
{
  timestamp: string = moment().format('x');
  action: string = 'unknown';
}


@Inject({singleton: false})
export default class ActionLogger extends Service
{
  options = new ActionLoggerOptions();


  constructor(protected logger: Logger,
              protected monitor: MonitorService)
  {
    super();
  }


  static config(handler: ConfigHandler<ActionLoggerOptions>)
  {
    return super.config(handler);
  }


  error(...message: any)
  {
    this.log('error', ...message);
  }


  warn(...message: any)
  {
    this.log('warn', ...message);
  }


  info(...message: any)
  {
    this.log('info', ...message);
  }


  verbose(...message: any)
  {
    this.log('verbose', ...message);
  }


  debug(...message: any)
  {
    this.log('debug', ...message);
  }


  log(level: string, ...message: any)
  {
    let messageStr = "";

    for (let part of message)
    {
      messageStr += messageStr? " ": "";

      if (typeof(part) === 'object')
      {
        messageStr += JSON.stringify(part);
      }
      else
      {
        messageStr += `${part}`;
      }
    }

    this.logger.log({
      timestamp: moment(+this.options.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
      memory: `${this.monitor.getMemoryUsage()}MB`,
      level: level,
      message: messageStr,
      action: this.options.action,
      duration: `${(+moment().format('x')) - (+this.options.timestamp)}ms`
    });
  }
}
