import { LoggerService, HttpService, Module } from "./index";
export default class AppModule extends Module {
    protected services: {
        logger: LoggerService;
        http: HttpService;
    };
    init(): void;
    startServices(): void;
    initControllers(): void;
    onStop(reason: string): void;
    onError(error: Error): void;
}
