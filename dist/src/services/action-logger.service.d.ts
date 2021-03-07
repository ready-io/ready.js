import LoggerService from './logger.service';
import MonitorService from './monitor.service';
import Service from './service';
export declare class ActionLoggerOptions {
    timestamp: string;
    action: string;
}
export default class ActionLogger extends Service {
    protected logger: LoggerService;
    protected monitor: MonitorService;
    options: ActionLoggerOptions;
    constructor(logger: LoggerService, monitor: MonitorService);
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    log(level: string, message: string): void;
}
