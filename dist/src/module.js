"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = __importDefault(require("./logger/logger.service"));
const empty_module_1 = __importDefault(require("./empty-module"));
const logger_module_1 = __importDefault(require("./logger/logger.module"));
class Module extends empty_module_1.default {
    constructor() {
        super(...arguments);
        this.declareDefault = [
            logger_module_1.default,
        ];
    }
    initSingletons() {
        super.initSingletons();
        this.logger = this.provider.get(logger_service_1.default);
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map