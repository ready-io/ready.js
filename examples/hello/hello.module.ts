import {Module} from "../../src/index";
import {HttpService} from "../../src/index";
import HelloController from "./hello.controller";

export default class HelloModule extends Module
{
  declare()
  {
    return [
      HttpService.config(options =>
      {
        options.port = 3000;
      }),
      HelloController,
    ];
  }
}
