import {ConfigHandler, Inject} from "../services/service";
import {Logger} from "./logger";
import {ActionLogger} from "./action-logger.service";
import {LoggerService} from "./logger.service";
import {EmptyModule} from "../empty-module";
import {MonitorService} from "../services/monitor.service";

export class Options
{
  dir: string = '';
  level: string = 'error';
}


@Inject()
export class LoggerModule extends EmptyModule
{
  options = new Options();


  static config(handler: ConfigHandler<Options>)
  {
    return super.config(handler);
  }


  declare()
  {
    return [
      Logger.config(options =>
      {
        options.dir = this.options.dir;
        options.level = this.options.level;
      }),
      ActionLogger,
      LoggerService,
      MonitorService,
    ];
  }
}
