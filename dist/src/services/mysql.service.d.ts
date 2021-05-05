/// <reference types="node" />
import { Connection, MysqlError } from 'mysql';
import { LoggerService } from '../logger/logger.service';
import { Service, ConfigHandler } from './service';
export declare class MysqlServiceOptions {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}
export declare class MysqlService extends Service {
    logger: LoggerService;
    options: MysqlServiceOptions;
    connection: Connection;
    pingInterval: NodeJS.Timeout;
    constructor(logger: LoggerService);
    static config(handler: ConfigHandler<MysqlServiceOptions>): (typeof Service | ConfigHandler<any>)[];
    onInit(): void;
    connect(): void;
    handleError(error: MysqlError): void;
    reconnect(): void;
    startPingInterval(): void;
    query(sql: string, values?: Array<any>): Promise<Array<any>>;
    insert(table: string, row: any): Promise<any[]>;
    update(table: string, primary_key: string, key: string | number, row: any): Promise<any[]>;
}
