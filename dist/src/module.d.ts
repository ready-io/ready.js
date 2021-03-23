import { LoggerService } from './logger/logger.service';
import { EmptyModule } from './empty-module';
export declare class Module extends EmptyModule {
    logger: LoggerService;
    declareDefault: Array<any>;
    initSingletons(): Promise<void>;
}
