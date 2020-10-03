import AppController from "./app.controller";
import { LoggerService, HttpService, Module} from "./index";

export default class AppModule extends Module
{
  protected services: {
    logger: LoggerService,
    http: HttpService
  };


  init()
  {
    this.services.logger = new LoggerService({dir: 'logs', level: 'debug'});
    this.services.logger.start();

    const log = this.services.logger.action('AppModule.init');

    this.startServices();
    this.initControllers();
    log.info('⚡');
  }


  startServices()
  {
    this.services.http = new HttpService({
      port: 3000,
    }, this.services.logger);

    this.services.http.start();
  }


  initControllers()
  {
    const appController = new AppController(this.services.http, this.services.logger);
    appController.init();
  }


  onStop(reason: string)
  {
    this.services.logger.action('AppModule.stop').info(reason);
  }


  onError(error: Error)
  {
    this.services.logger.action('AppModule.error').error(error.stack);
  }
}

