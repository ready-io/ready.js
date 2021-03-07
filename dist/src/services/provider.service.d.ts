export default class ProviderService {
    static injectDefinitions: Map<string, string[]>;
    static moduleDeclarations: Map<string, Map<string, any>>;
    instances: Map<any, any>;
    declarations: Map<any, any>;
    instance(className: string): any;
    static getDependenciesClasses(className: string, dependencies?: Map<any, any>, level?: number): string[];
}
