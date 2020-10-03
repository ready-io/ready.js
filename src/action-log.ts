import moment from 'moment';

export default class ActionLog
{
  logger: any;
  timestamp: string;
  action: string;
  level: string;
  message: string;


  constructor(logger: any, action = 'unknown')
  {
    this.logger    = logger;
    this.timestamp = moment().format('x');
    this.action    = action;
  }


  info(message: string)
  {
    this.level    = 'info';
    this.message  = message;
    this.save();
  }


  debug(message: string)
  {
    this.level    = 'debug';
    this.message  = message;
    this.save();
  }


  error(message: string)
  {
    this.level    = 'error';
    this.message  = message;
    this.save();
  }


  save()
  {
    this.logger.log({
      timestamp: moment(+this.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
      memory: `${this.getMemoryUsage()}MB`,
      level: this.level,
      message: this.message,
      action: this.action,
      duration: `${(+moment().format('x')) - (+this.timestamp)}ms`
    });
  }


  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}
