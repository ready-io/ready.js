import LoggerService from './services/logger.service';
export default class Module {
    protected unhandledRejection: boolean;
    protected exitOnError: boolean;
    protected servicesMap: Map<any, any>;
    logger: LoggerService;
    stopped: boolean;
    declare: Array<any>;
    declareDefault: Array<any>;
    constructor();
    init(): void;
    onInit(): void;
    parseUserDeclaration(userDeclaration: any): {
        Class: any;
        configHandler: any;
    };
    getDeclarations(): Map<any, any>;
    startServices(): void;
    service<T>(Class: any): T;
    stop(reason?: string): void;
    stopServices(): void;
    handleShutdown(): void;
    onStop(_reason?: string): void;
    onError(_error: any): void;
}
