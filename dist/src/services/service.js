"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
require("reflect-metadata");
const inject_decorator_1 = require("../decorators/inject.decorator");
exports.Inject = inject_decorator_1.InjectDecorator;
class Service {
    constructor() {
    }
    static config(handler) {
        return [this, handler];
    }
    init() {
        this.onInit();
    }
    onInit() {
    }
    stop() {
        this.onStop();
    }
    onStop() {
    }
}
exports.default = Service;
//# sourceMappingURL=service.js.map