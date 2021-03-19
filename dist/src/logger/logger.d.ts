import winston from 'winston';
import 'winston-daily-rotate-file';
import { Service, ConfigHandler } from '../services/service';
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
export declare class LoggerOptions {
    dir: string;
    level: string;
}
export declare class Logger extends Service {
    options: LoggerOptions;
    protected winstonLogger: winston.Logger;
    constructor();
    static config(handler: ConfigHandler<LoggerOptions>): (typeof Service | ConfigHandler<any>)[];
    onInit(): void;
    log(log: Log): void;
}
