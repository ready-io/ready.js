const winston   = require('winston');
const ActionLog = require('./action_log');

require('winston-daily-rotate-file');

class LoggerService
{
  constructor(options)
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


  action(name)
  {
    return new ActionLog(this.logger, name);
  }
}

module.exports = LoggerService
