"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDecorator = void 0;
require("reflect-metadata");
const provider_service_1 = __importDefault(require("../services/provider.service"));
function InjectDecorator() {
    return (constructor) => {
        const types = Reflect.getMetadata('design:paramtypes', constructor) || [];
        const paramTypes = [];
        for (let type of types) {
            paramTypes.push(type.name);
        }
        provider_service_1.default.injectDefinitions.set(constructor.name, paramTypes);
    };
}
exports.InjectDecorator = InjectDecorator;
//# sourceMappingURL=inject.decorator.js.map