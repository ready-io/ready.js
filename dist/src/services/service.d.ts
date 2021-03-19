import { InjectDecorator } from '../decorators/inject.decorator';
export declare const Inject: typeof InjectDecorator;
export declare type ConfigHandler<T> = (options: T) => void;
export declare class Service {
    protected options: any;
    static config(handler: ConfigHandler<any>): (typeof Service | ConfigHandler<any>)[];
    init(): void;
    onInit(): void;
    stop(): void;
    onStop(): void;
}
