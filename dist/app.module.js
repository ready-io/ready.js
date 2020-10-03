"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_controller_1 = __importDefault(require("./app.controller"));
const index_1 = require("./index");
class AppModule extends index_1.Module {
    init() {
        this.services.logger = new index_1.LoggerService({ dir: 'logs', level: 'debug' });
        this.services.logger.start();
        const log = this.services.logger.action('AppModule.init');
        this.startServices();
        this.initControllers();
        log.info('⚡');
    }
    startServices() {
        this.services.http = new index_1.HttpService({
            port: 3000,
        }, this.services.logger);
        this.services.http.start();
    }
    initControllers() {
        const appController = new app_controller_1.default(this.services.http, this.services.logger);
        appController.init();
    }
    onStop(reason) {
        this.services.logger.action('AppModule.stop').info(reason);
    }
    onError(error) {
        this.services.logger.action('AppModule.error').error(error.stack);
    }
}
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map