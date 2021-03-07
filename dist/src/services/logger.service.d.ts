import { Logger } from 'winston';
import ActionLogger from './action-logger.service';
import 'winston-daily-rotate-file';
import Service from './service';
import MonitorService from './monitor.service';
/**
 * log levels
 * {
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   http: 3,
 *   verbose: 4,
 *   debug: 5,
 *   silly: 6
 * }
 */
export interface Log {
    timestamp: string;
    memory: string;
    level: string;
    message: string;
    action: string;
    duration: string;
}
export declare class LoggerServiceOptions {
    dir: string;
    level: string;
}
export default class LoggerService extends Service {
    protected monitor: MonitorService;
    options: LoggerServiceOptions;
    protected winstonLogger: Logger;
    constructor(monitor: MonitorService);
    onInit(): void;
    log(log: Log): void;
    action(name: string): ActionLogger;
}
