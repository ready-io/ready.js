"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LoggerOptions = void 0;
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const service_1 = require("../services/service");
class LoggerOptions {
    constructor() {
        this.dir = '';
        this.level = 'error';
    }
}
exports.LoggerOptions = LoggerOptions;
let Logger = class Logger extends service_1.Service {
    constructor() {
        super();
        this.options = new LoggerOptions();
    }
    static config(handler) {
        return super.config(handler);
    }
    onInit() {
        this.winstonLogger = winston_1.default.createLogger();
        if (!this.options.dir) {
            this.winstonLogger.add(new winston_1.default.transports.Console({
                level: this.options.level,
                format: winston_1.default.format.json(),
            }));
        }
        else {
            const transport = new (winston_1.default.transports.DailyRotateFile)({
                filename: `${this.options.dir}/app-%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '5d',
                utc: true,
                json: true,
                level: this.options.level
            });
            this.winstonLogger.add(transport);
        }
    }
    log(log) {
        this.winstonLogger.log(log);
    }
};
Logger = __decorate([
    service_1.Inject(),
    __metadata("design:paramtypes", [])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map