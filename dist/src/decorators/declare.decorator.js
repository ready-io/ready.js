"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareDecorator = void 0;
const provider_service_1 = __importDefault(require("../services/provider.service"));
function DeclareDecorator(declarations) {
    return (constructor) => {
        const moduleDeclarations = new Map();
        for (let declaration of declarations) {
            if (!Array.isArray(declaration)) {
                declaration = [declaration];
            }
            let Class = declaration[0];
            let configHandler = declaration[1];
            moduleDeclarations.set(Class.name, { Class: Class, configHandler: configHandler });
        }
        provider_service_1.default.moduleDeclarations.set(constructor.name, moduleDeclarations);
    };
}
exports.DeclareDecorator = DeclareDecorator;
//# sourceMappingURL=declare.decorator.js.map