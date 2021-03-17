"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLoggerOptions = void 0;
const moment_1 = __importDefault(require("moment"));
const logger_1 = __importDefault(require("./logger"));
const monitor_service_1 = __importDefault(require("../services/monitor.service"));
const service_1 = __importStar(require("../services/service"));
class ActionLoggerOptions {
    constructor() {
        this.timestamp = moment_1.default().format('x');
        this.action = 'unknown';
    }
}
exports.ActionLoggerOptions = ActionLoggerOptions;
let ActionLogger = class ActionLogger extends service_1.default {
    constructor(logger, monitor) {
        super();
        this.logger = logger;
        this.monitor = monitor;
        this.options = new ActionLoggerOptions();
    }
    static config(handler) {
        return super.config(handler);
    }
    error(...message) {
        this.log('error', ...message);
    }
    warn(...message) {
        this.log('warn', ...message);
    }
    info(...message) {
        this.log('info', ...message);
    }
    verbose(...message) {
        this.log('verbose', ...message);
    }
    debug(...message) {
        this.log('debug', ...message);
    }
    log(level, ...message) {
        let messageStr = "";
        for (let part of message) {
            messageStr += messageStr ? " " : "";
            if (typeof (part) === 'object') {
                messageStr += JSON.stringify(part);
            }
            else {
                messageStr += `${part}`;
            }
        }
        this.logger.log({
            timestamp: moment_1.default(+this.options.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
            memory: `${this.monitor.getMemoryUsage()}MB`,
            level: level,
            message: messageStr,
            action: this.options.action,
            duration: `${(+moment_1.default().format('x')) - (+this.options.timestamp)}ms`
        });
    }
};
ActionLogger = __decorate([
    service_1.Inject({ singleton: false }),
    __metadata("design:paramtypes", [logger_1.default,
        monitor_service_1.default])
], ActionLogger);
exports.default = ActionLogger;
//# sourceMappingURL=action-logger.service.js.map