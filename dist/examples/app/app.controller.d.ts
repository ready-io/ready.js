import { LoggerService } from "../../src/index";
import { HttpService } from "../../src/index";
import { Controller } from "../../src/index";
export default class AppController extends Controller {
    http: HttpService;
    logger: LoggerService;
    constructor(http: HttpService, logger: LoggerService);
    bar(params: any): string;
    foo(): string;
}
