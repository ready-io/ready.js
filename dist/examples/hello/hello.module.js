"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const index_2 = require("../../src/index");
const hello_controller_1 = __importDefault(require("./hello.controller"));
class HelloModule extends index_1.Module {
    declare() {
        return [
            index_2.HttpService.config(options => {
                options.port = 3000;
            }),
            hello_controller_1.default,
        ];
    }
}
exports.default = HelloModule;
//# sourceMappingURL=hello.module.js.map