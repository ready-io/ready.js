"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ProviderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inject_decorator_1 = require("../decorators/inject.decorator");
const service_1 = __importStar(require("./service"));
const empty_module_1 = __importDefault(require("../empty-module"));
let ProviderService = ProviderService_1 = class ProviderService extends service_1.default {
    constructor() {
        super(...arguments);
        this.instances = new Map();
        this.declarations = new Map();
        this.providers = [];
    }
    onInit() {
        this.instances.set(ProviderService_1, this);
    }
    get(Class) {
        const injectDef = inject_decorator_1.injectDefinitions.get(Class);
        const singleton = injectDef.options.singleton;
        if (singleton) {
            if (this.instances.has(Class)) {
                return this.instances.get(Class);
            }
        }
        const instance = this.create(Class);
        if (singleton) {
            this.instances.set(Class, instance);
        }
        return instance;
    }
    remove(Class) {
        if (!this.instances.has(Class)) {
            return;
        }
        const instance = this.instances.get(Class);
        instance.stop();
        this.instances.delete(Class);
    }
    create(Class) {
        if (!Class) {
            throw new Error('Class empty');
        }
        const dependenciesClasses = this.getDependenciesClasses(Class);
        if (dependenciesClasses.includes(Class)) {
            throw new Error(`Circular dependency found in ${Class.name}`);
        }
        const classDeclarations = this.declarations.get(Class);
        if (!classDeclarations) {
            for (let provider of this.providers) {
                try {
                    return provider.get(Class);
                }
                catch (error) { }
            }
            throw new Error(`${Class.name} not declared`);
        }
        const injectDef = inject_decorator_1.injectDefinitions.get(Class);
        let params = [];
        for (let paramType of injectDef.paramTypes) {
            params.push(this.get(paramType));
        }
        const instance = new Class(...params);
        const configHandler = classDeclarations.configHandler;
        if (typeof (configHandler) === 'function') {
            configHandler(instance.options);
        }
        instance.init();
        if (instance instanceof empty_module_1.default) {
            this.providers.push(instance.provider);
        }
        return instance;
    }
    getDependenciesClasses(Class, dependencies = new Map(), level = 0) {
        if (dependencies.has(Class))
            return;
        dependencies.set(Class, []);
        const injectDef = inject_decorator_1.injectDefinitions.get(Class);
        for (let paramType of injectDef.paramTypes) {
            dependencies.get(Class).push(paramType);
            this.getDependenciesClasses(paramType, dependencies, level + 1);
        }
        if (level > 0)
            return;
        const dependenciesClasses = [];
        for (let [_, deps] of dependencies) {
            dependenciesClasses.push(...deps);
        }
        return dependenciesClasses;
    }
};
ProviderService = ProviderService_1 = __decorate([
    service_1.Inject()
], ProviderService);
exports.default = ProviderService;
//# sourceMappingURL=provider.service.js.map