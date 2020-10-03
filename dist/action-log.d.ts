export default class ActionLog {
    logger: any;
    timestamp: string;
    action: string;
    level: string;
    message: string;
    constructor(logger: any, action?: string);
    info(message: string): void;
    debug(message: string): void;
    error(message: string): void;
    save(): void;
    getMemoryUsage(): number;
}
