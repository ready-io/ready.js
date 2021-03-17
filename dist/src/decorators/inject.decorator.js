"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDecorator = exports.injectDefinitions = void 0;
require("reflect-metadata");
exports.injectDefinitions = new Map();
function InjectDecorator(options = { singleton: true }) {
    return (constructor) => {
        const types = Reflect.getMetadata('design:paramtypes', constructor) || [];
        const paramTypes = [];
        for (let type of types) {
            if (typeof (type) !== 'function') {
                throw new Error(`Unknown type of parameter for the constructor ${constructor.name}`);
            }
            paramTypes.push(type);
        }
        exports.injectDefinitions.set(constructor, { paramTypes, options });
    };
}
exports.InjectDecorator = InjectDecorator;
//# sourceMappingURL=inject.decorator.js.map