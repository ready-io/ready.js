import {Module} from "../../src/index";
import {LoggerModule} from "../../src/index";
import {HttpService} from "../../src/index";
import AppController from "./app.controller";


export default class AppModule extends Module
{
  declare()
  {
    return [
      LoggerModule.config(options =>
      {
        options.level = 'debug';
      }),
      HttpService.config(options =>
      {
        options.port = 3000;
      }),
      AppController,
    ];
  }


  onInit()
  {
    this.logger.action('AppModule.onInit').info(' ⚡');
  }


  onStop(reason: string)
  {
    this.logger.action('AppModule.onStop').info(reason);
  }


  onError(error: Error)
  {
    this.logger.action('AppModule.onError').error(error.stack);
  }
}
