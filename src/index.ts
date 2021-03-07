import HttpService, {HttpServiceOptions} from "./services/http.service";
import LoggerService, {LoggerServiceOptions} from "./services/logger.service";
import Module from "./module";
import Service, {Inject} from "./services/service";
import Controller from "./controller";
import {Route} from "./decorators/route.decorator";

export
{
  Module,
  Service,
  Inject,
  HttpService,
  HttpServiceOptions,
  LoggerService,
  LoggerServiceOptions,
  Controller,
  Route,
};
