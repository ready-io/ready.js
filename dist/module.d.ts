export default class Module {
    protected services: any;
    unhandledRejection: boolean;
    exitOnError: boolean;
    constructor();
    handleShutdown(): void;
    onStop(_reason: any): void;
    onError(_error: any): void;
}
