/// <reference types="node" />
import { Express, Response } from 'express';
import { Server } from 'http';
import IO from 'socket.io';
import LoggerService from './logger.service';
import PromClient from 'prom-client';
import { Subject } from 'rxjs';
import Service from './service';
declare type RouteHandler = ((res: Response, params: any, req: Request) => any) | Array<any> | string;
declare class SocketsServerOptions {
    enabled: boolean;
    redisHost: string;
    redisPort: number;
}
export declare class HttpServiceOptions {
    port: number;
    socketsServer: SocketsServerOptions;
    token: string;
    host: string;
}
export default class HttpService extends Service {
    protected logger: LoggerService;
    options: HttpServiceOptions;
    express: Express;
    server: Server;
    protected deferred: any;
    io: IO.Server;
    PromClient: typeof PromClient;
    protected metricsCollected: Subject<unknown>;
    constructor(logger: LoggerService);
    onInit(): void;
    setDefaultRoutes(): void;
    startSocketsServer(): void;
    onStop(): void;
    route(route: string, handler: RouteHandler): void;
    debounce(id: string, timeout: number, callback: () => {}): void;
    get(url: string, params: any): import("got/dist/source").CancelableRequest<unknown>;
    post(url: string, params: any): import("got/dist/source").CancelableRequest<unknown>;
    onMetricsCollected(callback: () => void): void;
}
export {};
