"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProviderService {
    constructor() {
        this.instances = new Map();
        this.declarations = new Map();
    }
    instance(className) {
        if (!className) {
            throw new Error('Class_name empty');
        }
        if (this.instances.has(className)) {
            return this.instances.get(className);
        }
        const dependenciesClasses = ProviderService.getDependenciesClasses(className);
        if (dependenciesClasses.includes(className)) {
            throw new Error(`Circular dependency found in ${className}`);
        }
        let paramTypes = ProviderService.injectDefinitions.get(className);
        let params = [];
        for (let paramType of paramTypes) {
            params.push(this.instance(paramType));
        }
        const classDeclarations = this.declarations.get(className);
        const Class = classDeclarations.Class;
        const configHandler = classDeclarations.configHandler;
        const instance = new Class(...params);
        if (configHandler) {
            configHandler(instance.options);
        }
        this.instances.set(className, instance);
        return instance;
    }
    static getDependenciesClasses(className, dependencies = new Map(), level = 0) {
        if (dependencies.has(className))
            return;
        dependencies.set(className, []);
        let paramTypes = this.injectDefinitions.get(className);
        for (let paramType of paramTypes) {
            dependencies.get(className).push(paramType);
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
}
exports.default = ProviderService;
ProviderService.injectDefinitions = new Map();
ProviderService.moduleDeclarations = new Map();
//# sourceMappingURL=provider.service.js.map