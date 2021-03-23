"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProviderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const inject_decorator_1 = require("../decorators/inject.decorator");
const service_1 = require("./service");
let ProviderService = ProviderService_1 = class ProviderService extends service_1.Service {
    constructor() {
        super(...arguments);
        this.instances = new Map();
        this.declarations = new Map();
        this.providers = [];
        this.injectDefinitions = [inject_decorator_1.injectDefinitions];
    }
    onInit() {
        this.instances.set(ProviderService_1, this);
    }
    getInjectDefinitions(Class) {
        for (let injectDefinitions of this.injectDefinitions) {
            const injectDef = injectDefinitions.get(Class);
            if (injectDef) {
                return injectDef;
            }
        }
        throw new Error(`Inject definitions not found for ${Class.name}`);
    }
    add(Class) {
        if (Class.injectDefinitions) {
            this.injectDefinitions.push(Class.injectDefinitions);
        }
        const injectDef = this.getInjectDefinitions(Class);
        const singleton = injectDef.options.singleton;
        if (singleton) {
            return this.get(Class);
        }
    }
    get(Class) {
        const injectDef = this.getInjectDefinitions(Class);
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
        const injectDef = this.getInjectDefinitions(Class);
        let params = [];
        for (let paramType of injectDef.paramTypes) {
            params.push(this.get(paramType));
        }
        const instance = new Class(...params);
        const configHandler = classDeclarations.configHandler;
        if (typeof (configHandler) === 'function') {
            configHandler(instance.options);
        }
        if (Class.injectDefinitions) {
            this.providers.push(instance.provider);
        }
        return instance;
    }
    getDependenciesClasses(Class, dependencies = new Map(), level = 0) {
        if (dependencies.has(Class))
            return;
        dependencies.set(Class, []);
        const injectDef = this.getInjectDefinitions(Class);
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
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map