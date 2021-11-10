"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = exports.Options = void 0;
const service_1 = require("../services/service");
const logger_1 = require("./logger");
const action_logger_service_1 = require("./action-logger.service");
const logger_service_1 = require("./logger.service");
const empty_module_1 = require("../empty-module");
const monitor_service_1 = require("../services/monitor.service");
class Options {
    constructor() {
        this.dir = '';
        this.level = 'error';
    }
}
exports.Options = Options;
let LoggerModule = class LoggerModule extends empty_module_1.EmptyModule {
    constructor() {
        super(...arguments);
        this.options = new Options();
    }
    static config(handler) {
        return super.config(handler);
    }
    declare() {
        return [
            logger_1.Logger.config(options => {
                options.dir = this.options.dir;
                options.level = this.options.level;
            }),
            action_logger_service_1.ActionLogger,
            logger_service_1.LoggerService,
            monitor_service_1.MonitorService,
        ];
    }
};
LoggerModule = __decorate([
    (0, service_1.Inject)()
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map