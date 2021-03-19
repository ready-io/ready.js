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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const action_logger_service_1 = require("./action-logger.service");
const provider_service_1 = require("../services/provider.service");
const service_1 = require("../services/service");
let LoggerService = class LoggerService extends service_1.Service {
    constructor(provider) {
        super();
        this.provider = provider;
    }
    action(name) {
        const actionLogger = this.provider.get(action_logger_service_1.ActionLogger);
        actionLogger.options.action = name;
        return actionLogger;
    }
};
LoggerService = __decorate([
    service_1.Inject(),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map