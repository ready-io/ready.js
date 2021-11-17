/// <reference types="node" />
import { Express, Response } from 'express';
import { Server } from 'http';
import { Server as IO } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import PromClient from 'prom-client';
import { Subject } from 'rxjs';
import { Service, ConfigHandler } from './service';
declare type RouteHandlerFun = (params: any, res: Response, req: Request) => any;
declare type RouteHandler = RouteHandlerFun | Array<any> | string;
declare class SocketsServerOptions {
    enabled: boolean;
    redisHost: string;
    redisPort: number;
    redisPrefix: string;
    cors: {
        origin: string;
    };
}
export declare class HttpServiceOptions {
    port: number;
    socketsServer: SocketsServerOptions;
    token: string;
    host: string;
}
export declare class HttpService extends Service {
    protected logger: LoggerService;
    options: HttpServiceOptions;
    express: Express;
    server: Server;
    protected deferred: any;
    io: IO;
    PromClient: typeof PromClient;
    protected metricsCollected: Subject<unknown>;
    constructor(logger: LoggerService);
    static config(handler: ConfigHandler<HttpServiceOptions>): (typeof Service | ConfigHandler<any>)[];
    onInit(): void;
    setDefaultRoutes(): void;
    startSocketsServer(): void;
    onStop(): void;
    route(route: string, handler: RouteHandler): void;
    debounce(id: string, timeout: number, callback: () => void): void;
    get(url: string, params: any): import("got").CancelableRequest<unknown>;
    post(url: string, params: any): import("got").CancelableRequest<unknown>;
    onMetricsCollected(callback: () => void): void;
}
export {};
