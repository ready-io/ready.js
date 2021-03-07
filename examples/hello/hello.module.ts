import {Module} from "../../src/index";
import {HttpService, HttpServiceOptions} from "../../src/index";
import HelloController from "./hello.controller";

export default class HelloModule extends Module
{
  declare =
  [
    HttpService.config((options: HttpServiceOptions) =>
    {
      options.port = 3000;
    }),
    HelloController,
  ];
}
