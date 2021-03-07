import 'reflect-metadata';
import { InjectDecorator } from '../decorators/inject.decorator';
export declare const Inject: typeof InjectDecorator;
export default class Service {
    protected options: any;
    constructor();
    static config(handler: any): any[];
    init(): void;
    onInit(): void;
    stop(): void;
    onStop(): void;
}
