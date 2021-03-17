import Service from './services/service';
import ProviderService from './services/provider.service';
export default class EmptyModule extends Service {
    unhandledRejection: boolean;
    exitOnError: boolean;
    provider: ProviderService;
    stopped: boolean;
    userDeclarations: Array<any>;
    declareDefault: Array<any>;
    init(): void;
    onInit(): void;
    setUserDeclarations(): void;
    declare(): Array<any>;
    parseUserDeclaration(userDeclaration: any): {
        Class: any;
        configHandler: any;
        singleton: any;
    };
    getDeclarations(): Map<any, any>;
    initSingletons(): void;
    stop(reason?: string): void;
    stopSingletons(): void;
    handleShutdown(): void;
    onStop(_reason?: string): void;
    onError(_error: any): void;
}
