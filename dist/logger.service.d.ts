import ActionLog from './action-log';
import 'winston-daily-rotate-file';
export default class LoggerService {
    logger: any;
    options: any;
    constructor(options: any);
    start(): void;
    action(name: string): ActionLog;
}
