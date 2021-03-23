"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyModule = void 0;
const service_1 = require("./services/service");
const provider_service_1 = require("./services/provider.service");
const inject_decorator_1 = require("./decorators/inject.decorator");
class EmptyModule extends service_1.Service {
    constructor() {
        super(...arguments);
        this.unhandledRejection = false;
        this.exitOnError = false;
        this.provider = new provider_service_1.ProviderService();
        this.stopped = false;
        this.userDeclarations = [];
        this.declareDefault = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setUserDeclarations();
            this.handleShutdown();
            yield this.initSingletons();
            this.onInit();
        });
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
        return {
            Class: userDeclaration[0],
            configHandler: userDeclaration[1],
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
        return __awaiter(this, void 0, void 0, function* () {
            this.provider.declarations = this.getDeclarations();
            this.provider.init();
            for (let [Class] of this.provider.declarations) {
                const instance = this.provider.add(Class);
                if (instance) {
                    yield instance.init();
                }
            }
        });
    }
    stop(reason = 'stop called') {
        if (this.stopped)
            return;
        this.stopped = true;
        this.stopSingletons();
        this.onStop(reason);
    }
    stopSingletons() {
        for (let [Class] of this.provider.declarations) {
            this.provider.remove(Class);
        }
    }
    handleShutdown() {
        process.on('unhandledRejection', e => { this.unhandledRejection = true; throw e; });
        process.on('uncaughtException', e => {
            console.log(e);
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
exports.EmptyModule = EmptyModule;
EmptyModule.injectDefinitions = inject_decorator_1.injectDefinitions;
//# sourceMappingURL=empty-module.js.map