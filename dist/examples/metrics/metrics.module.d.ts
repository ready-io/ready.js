import { Module } from "../../src/index";
import MetricsController from "./metrics.controller";
export default class AppModule extends Module {
    declare(): ((typeof import("../../src").Service | import("../../src/services/service").ConfigHandler<any>)[] | typeof MetricsController)[];
    onInit(): void;
    onStop(reason: string): void;
    onError(error: Error): void;
}
