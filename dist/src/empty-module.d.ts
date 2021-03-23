import { Service } from './services/service';
import { ProviderService } from './services/provider.service';
export declare class EmptyModule extends Service {
    unhandledRejection: boolean;
    exitOnError: boolean;
    provider: ProviderService;
    stopped: boolean;
    userDeclarations: Array<any>;
    declareDefault: Array<any>;
    static injectDefinitions: Map<Function, any>;
    init(): Promise<void>;
    onInit(): void;
    setUserDeclarations(): void;
    declare(): Array<any>;
    parseUserDeclaration(userDeclaration: any): {
        Class: any;
        configHandler: any;
    };
    getDeclarations(): Map<any, any>;
    initSingletons(): Promise<void>;
    stop(reason?: string): void;
    stopSingletons(): void;
    handleShutdown(): void;
    onStop(_reason?: string): void;
    onError(_error: any): void;
}
