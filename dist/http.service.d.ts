import LoggerService from './logger.service';
import { Subject } from 'rxjs';
export default class HttpService {
    options: any;
    logger: any;
    express: any;
    server: any;
    deferred: any;
    io: any;
    prometheus: any;
    protected metricsCollected: Subject<unknown>;
    constructor(options: any, logger: LoggerService);
    start(): void;
    startSocketsServer(): void;
    route(route: any, handler: any): void;
    debounce(id: string, timeout: number, callback: () => {}): void;
    get(url: string, params: any): import("got/dist/source").CancelableRequest<unknown>;
    post(url: string, params: any): import("got/dist/source").CancelableRequest<unknown>;
    onMetricsCollected(callback: () => void): void;
}
