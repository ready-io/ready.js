"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.controllersRoutes = void 0;
exports.controllersRoutes = new Map();
function Route(path) {
    return function (target, propertyKey, _descriptor) {
        if (!exports.controllersRoutes.has(target)) {
            exports.controllersRoutes.set(target, []);
        }
        exports.controllersRoutes.get(target).push({ path: path, method: propertyKey });
    };
}
exports.Route = Route;
//# sourceMappingURL=route.decorator.js.map