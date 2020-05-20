const moment = require('moment')

class ActionLog
{
  constructor(logger, action = 'unknown')
  {
    this.logger    = logger;
    this.timestamp = moment().format('x');
    this.action    = action;
  }


  info(message)
  {
    this.level    = 'info';
    this.message  = message;
    this.save();
  }


  debug(message)
  {
    this.level    = 'debug';
    this.message  = message;
    this.save();
  }


  error(message)
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
      duration: `${moment().format('x') - this.timestamp}ms`
    });
  }


  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}

module.exports = ActionLog;
