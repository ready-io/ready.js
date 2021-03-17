import 'reflect-metadata';
export declare const injectDefinitions: Map<Function, any>;
export declare function InjectDecorator(options?: {
    singleton: boolean;
}): (constructor: Function) => void;
