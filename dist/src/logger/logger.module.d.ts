import { ConfigHandler } from "../services/service";
import ActionLogger from "./action-logger.service";
import LoggerService from "./logger.service";
import EmptyModule from "../empty-module";
import MonitorService from "../services/monitor.service";
export declare class Options {
    dir: string;
    level: string;
}
export default class LoggerModule extends EmptyModule {
    options: Options;
    static config(handler: ConfigHandler<Options>): (typeof import("../services/service").default | ConfigHandler<any>)[];
    declare(): ((typeof import("../services/service").default | ConfigHandler<any>)[] | typeof MonitorService | typeof ActionLogger | typeof LoggerService)[];
}
