import { Gauge } from "prom-client";
import { LoggerService } from "../../src/index";
import { HttpService } from "../../src/index";
import { Controller } from "../../src/index";
export default class MetricsController extends Controller {
    http: HttpService;
    logger: LoggerService;
    requestsPerMinute: Gauge<string>;
    constructor(http: HttpService, logger: LoggerService);
    onInit(): void;
    bar(): string;
    foo(): string;
}
