"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const action_log_1 = __importDefault(require("./action-log"));
require("winston-daily-rotate-file");
class LoggerService {
    constructor(options) {
        this.logger = null;
        this.options = options;
    }
    start() {
        let transport = new (winston_1.default.transports.DailyRotateFile)({
            filename: `${this.options.dir}/app-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            maxFiles: '5d',
            utc: true,
            json: true,
            level: this.options.level || 'info'
        });
        this.logger = winston_1.default.createLogger({
            transports: [
                transport
            ],
        });
    }
    action(name) {
        return new action_log_1.default(this.logger, name);
    }
}
exports.default = LoggerService;
//# sourceMappingURL=logger.service.js.map