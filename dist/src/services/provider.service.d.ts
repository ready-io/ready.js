import { Service } from "./service";
export declare class ProviderService extends Service {
    protected instances: Map<any, any>;
    declarations: Map<any, any>;
    providers: Array<ProviderService>;
    onInit(): void;
    get<T = any>(Class: any): T;
    remove(Class: any): void;
    create(Class: any): any;
    getDependenciesClasses(Class: Function, dependencies?: Map<any, any>, level?: number): string[];
}
