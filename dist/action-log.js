"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class ActionLog {
    constructor(logger, action = 'unknown') {
        this.logger = logger;
        this.timestamp = moment_1.default().format('x');
        this.action = action;
    }
    info(message) {
        this.level = 'info';
        this.message = message;
        this.save();
    }
    debug(message) {
        this.level = 'debug';
        this.message = message;
        this.save();
    }
    error(message) {
        this.level = 'error';
        this.message = message;
        this.save();
    }
    save() {
        this.logger.log({
            timestamp: moment_1.default(+this.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
            memory: `${this.getMemoryUsage()}MB`,
            level: this.level,
            message: this.message,
            action: this.action,
            duration: `${(+moment_1.default().format('x')) - (+this.timestamp)}ms`
        });
    }
    getMemoryUsage() {
        return Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
    }
}
exports.default = ActionLog;
//# sourceMappingURL=action-log.js.map