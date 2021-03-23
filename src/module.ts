import {LoggerService} from './logger/logger.service';
import {EmptyModule} from './empty-module';
import {LoggerModule} from './logger/logger.module';


export class Module extends EmptyModule
{
  logger: LoggerService;


  declareDefault: Array<any> =
  [
    LoggerModule,
  ];


  async initSingletons()
  {
    await super.initSingletons();
    this.logger = this.provider.get<LoggerService>(LoggerService);
  }
}
