"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const service_1 = require("../services/service");
const logger_1 = __importDefault(require("./logger"));
const action_logger_service_1 = __importDefault(require("./action-logger.service"));
const logger_service_1 = __importDefault(require("./logger.service"));
const empty_module_1 = __importDefault(require("../empty-module"));
const monitor_service_1 = __importDefault(require("../services/monitor.service"));
class Options {
    constructor() {
        this.dir = '';
        this.level = 'error';
    }
}
exports.Options = Options;
let LoggerModule = class LoggerModule extends empty_module_1.default {
    constructor() {
        super(...arguments);
        this.options = new Options();
    }
    static config(handler) {
        return super.config(handler);
    }
    declare() {
        return [
            logger_1.default.config(options => {
                options.dir = this.options.dir;
                options.level = this.options.level;
            }),
            action_logger_service_1.default,
            logger_service_1.default,
            monitor_service_1.default,
        ];
    }
};
LoggerModule = __decorate([
    service_1.Inject()
], LoggerModule);
exports.default = LoggerModule;
//# sourceMappingURL=logger.module.js.map