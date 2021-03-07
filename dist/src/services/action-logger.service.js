"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLoggerOptions = void 0;
const moment_1 = __importDefault(require("moment"));
const service_1 = __importDefault(require("./service"));
class ActionLoggerOptions {
    constructor() {
        this.timestamp = moment_1.default().format('x');
        this.action = 'unknown';
    }
}
exports.ActionLoggerOptions = ActionLoggerOptions;
class ActionLogger extends service_1.default {
    constructor(logger, monitor) {
        super();
        this.logger = logger;
        this.monitor = monitor;
        this.options = new ActionLoggerOptions();
    }
    error(message) {
        this.log('error', message);
    }
    warn(message) {
        this.log('warn', message);
    }
    info(message) {
        this.log('info', message);
    }
    debug(message) {
        this.log('debug', message);
    }
    log(level, message) {
        this.logger.log({
            timestamp: moment_1.default(+this.options.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
            memory: `${this.monitor.getMemoryUsage()}MB`,
            level: level,
            message: message,
            action: this.options.action,
            duration: `${(+moment_1.default().format('x')) - (+this.options.timestamp)}ms`
        });
    }
}
exports.default = ActionLogger;
//# sourceMappingURL=action-logger.service.js.map