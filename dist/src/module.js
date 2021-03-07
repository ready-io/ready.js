"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = __importDefault(require("./services/logger.service"));
const monitor_service_1 = __importDefault(require("./services/monitor.service"));
const provider_service_1 = __importDefault(require("./services/provider.service"));
class Module {
    constructor() {
        this.unhandledRejection = false;
        this.exitOnError = false;
        this.servicesMap = new Map();
        this.stopped = false;
        this.declare = [];
        this.declareDefault = [
            monitor_service_1.default,
            logger_service_1.default,
        ];
    }
    init() {
        this.handleShutdown();
        this.startServices();
        this.onInit();
    }
    onInit() {
    }
    parseUserDeclaration(userDeclaration) {
        if (!Array.isArray(userDeclaration)) {
            userDeclaration = [userDeclaration];
        }
        return { Class: userDeclaration[0], configHandler: userDeclaration[1] };
    }
    getDeclarations() {
        const declarations = new Map();
        for (let userDeclaration of this.declareDefault) {
            let declaration = this.parseUserDeclaration(userDeclaration);
            declarations.set(declaration.Class.name, declaration);
        }
        for (let userDeclaration of this.declare) {
            let declaration = this.parseUserDeclaration(userDeclaration);
            declarations.set(declaration.Class.name, declaration);
        }
        return declarations;
    }
    startServices() {
        const providerService = new provider_service_1.default;
        providerService.declarations = this.getDeclarations();
        for (let [className, declaration] of providerService.declarations) {
            const instance = providerService.instance(className);
            instance.init();
            this.servicesMap.set(declaration.Class, instance);
        }
        this.logger = this.service(logger_service_1.default);
    }
    service(Class) {
        return this.servicesMap.get(Class);
    }
    stop(reason = 'stop called') {
        if (this.stopped)
            return;
        this.stopped = true;
        this.stopServices();
        this.onStop(reason);
    }
    stopServices() {
        for (let service of this.servicesMap.values()) {
            service.stop();
        }
    }
    handleShutdown() {
        process.on('unhandledRejection', e => { this.unhandledRejection = true; throw e; });
        process.on('uncaughtException', e => {
            this.onError(e);
            this.exitOnError = true;
            if (this.unhandledRejection)
                throw e;
        });
        process.on('exit', code => {
            if (this.exitOnError)
                code = 1;
            this.stop(`exit code ${code}`);
            process.exit(code);
        });
        process.on('SIGTERM', () => { this.stop('SIGTERM'); process.exit(0); });
        process.on('SIGINT', () => { this.stop('SIGINT'); process.exit(0); });
    }
    onStop(_reason) {
    }
    onError(_error) {
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map