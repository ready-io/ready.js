"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const _super = Object.create(null, {
            initSingletons: { get: () => super.initSingletons }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.initSingletons.call(this);
            this.logger = this.provider.get(logger_service_1.LoggerService);
        });
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map