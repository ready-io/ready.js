"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inject_decorator_1 = require("./decorators/inject.decorator");
const service_1 = __importDefault(require("./services/service"));
const provider_service_1 = __importDefault(require("./services/provider.service"));
class EmptyModule extends service_1.default {
    constructor() {
        super(...arguments);
        this.unhandledRejection = false;
        this.exitOnError = false;
        this.provider = new provider_service_1.default();
        this.stopped = false;
        this.userDeclarations = [];
        this.declareDefault = [];
    }
    init() {
        this.setUserDeclarations();
        this.handleShutdown();
        this.initSingletons();
        this.onInit();
    }
    onInit() {
    }
    setUserDeclarations() {
        this.userDeclarations = this.declare();
    }
    declare() {
        return [];
    }
    parseUserDeclaration(userDeclaration) {
        if (!Array.isArray(userDeclaration)) {
            userDeclaration = [userDeclaration];
        }
        const Class = userDeclaration[0];
        const injectDef = inject_decorator_1.injectDefinitions.get(Class);
        const singleton = injectDef.options.singleton;
        return {
            Class: userDeclaration[0],
            configHandler: userDeclaration[1],
            singleton: singleton,
        };
    }
    getDeclarations() {
        const declarations = new Map();
        for (let userDeclaration of this.declareDefault) {
            let declaration = this.parseUserDeclaration(userDeclaration);
            declarations.set(declaration.Class, declaration);
        }
        for (let userDeclaration of this.userDeclarations) {
            let declaration = this.parseUserDeclaration(userDeclaration);
            declarations.set(declaration.Class, declaration);
        }
        return declarations;
    }
    initSingletons() {
        this.provider.declarations = this.getDeclarations();
        this.provider.init();
        for (let [Class, declaration] of this.provider.declarations) {
            if (declaration.singleton) {
                this.provider.get(Class);
            }
        }
    }
    stop(reason = 'stop called') {
        if (this.stopped)
            return;
        this.stopped = true;
        this.stopSingletons();
        this.onStop(reason);
    }
    stopSingletons() {
        for (let [Class, declaration] of this.provider.declarations) {
            if (declaration.singleton) {
                this.provider.remove(Class);
            }
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
exports.default = EmptyModule;
//# sourceMappingURL=empty-module.js.map