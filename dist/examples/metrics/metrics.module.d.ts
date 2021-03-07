import { Module } from "../../src/index";
import MetricsController from "./metrics.controller";
export default class AppModule extends Module {
    declare: (any[] | typeof MetricsController)[];
    onInit(): void;
    onStop(reason: string): void;
    onError(error: Error): void;
}
