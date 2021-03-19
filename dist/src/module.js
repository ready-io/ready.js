"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const logger_service_1 = require("./logger/logger.service");
const empty_module_1 = require("./empty-module");
const logger_module_1 = require("./logger/logger.module");
class Module extends empty_module_1.EmptyModule {
    constructor() {
        super(...arguments);
        this.declareDefault = [
            logger_module_1.LoggerModule,
        ];
    }
    initSingletons() {
        super.initSingletons();
        this.logger = this.provider.get(logger_service_1.LoggerService);
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map