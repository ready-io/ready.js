import { Logger } from './logger';
import { MonitorService } from '../services/monitor.service';
import { Service, ConfigHandler } from '../services/service';
export declare class ActionLoggerOptions {
    timestamp: string;
    action: string;
}
export declare class ActionLogger extends Service {
    protected logger: Logger;
    protected monitor: MonitorService;
    options: ActionLoggerOptions;
    constructor(logger: Logger, monitor: MonitorService);
    static config(handler: ConfigHandler<ActionLoggerOptions>): (typeof Service | ConfigHandler<any>)[];
    error(...message: any): void;
    warn(...message: any): void;
    info(...message: any): void;
    verbose(...message: any): void;
    debug(...message: any): void;
    log(level: string, ...message: any): void;
}
