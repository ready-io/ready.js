import {Service, Inject} from "./service";

@Inject()
export class MonitorService extends Service
{
  /**
   * It returns the memory usage in MB
   */
  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}
