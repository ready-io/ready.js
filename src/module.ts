import LoggerService from './logger/logger.service';
import EmptyModule from './empty-module';
import LoggerModule from './logger/logger.module';


export default class Module extends EmptyModule
{
  logger: LoggerService;
  declareDefault: Array<any> =
  [
    LoggerModule,
  ];


  initSingletons()
  {
    super.initSingletons();
    this.logger = this.provider.get<LoggerService>(LoggerService);
  }
}
