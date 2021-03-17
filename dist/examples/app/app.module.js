"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const index_2 = require("../../src/index");
const index_3 = require("../../src/index");
const app_controller_1 = __importDefault(require("./app.controller"));
class AppModule extends index_1.Module {
    declare() {
        return [
            index_2.LoggerModule.config(options => {
                options.level = 'debug';
            }),
            index_3.HttpService.config(options => {
                options.port = 3000;
            }),
            app_controller_1.default,
        ];
    }
    onInit() {
        this.logger.action('AppModule.onInit').info(' ⚡');
    }
    onStop(reason) {
        this.logger.action('AppModule.onStop').info(reason);
    }
    onError(error) {
        this.logger.action('AppModule.onError').error(error.stack);
    }
}
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map