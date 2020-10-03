const CHECK_MEMORY_INTERVAL = 1000*60; // ms

export default class MonitorService
{
  logger: any;


  constructor(logger: any)
  {
    this.logger = logger;
  }


  start()
  {
  }


  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}

module.exports = MonitorService
