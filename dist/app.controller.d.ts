import LoggerService from './logger.service';
import HttpService from './http.service';
export default class AppController {
    http: HttpService;
    logger: LoggerService;
    requestsPerMinute: any;
    constructor(http: HttpService, logger: LoggerService);
    init(): void;
    hello(res: any): void;
    foo(res: any): void;
}
