import { Module } from "../../src/index";
import MetricsController from "./metrics.controller";
export default class AppModule extends Module {
    declare(): ((typeof import("../../src/index").Service | import("../../src/index").ConfigHandler<any>)[] | typeof MetricsController)[];
    onInit(): void;
    onStop(reason: string): void;
    onError(error: Error): void;
}
