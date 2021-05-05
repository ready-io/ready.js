import { LoggerService, MysqlService } from "../../src/index";
import { HttpService } from "../../src/index";
import { Controller } from "../../src/index";
export default class AppController extends Controller {
    http: HttpService;
    logger: LoggerService;
    mysql: MysqlService;
    constructor(http: HttpService, logger: LoggerService, mysql: MysqlService);
    bar(params: any): Promise<string>;
    foo(): string;
}
