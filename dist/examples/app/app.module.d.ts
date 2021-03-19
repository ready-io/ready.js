import { Module } from "../../src/index";
import AppController from "./app.controller";
export default class AppModule extends Module {
    declare(): ((typeof import("../../src").Service | import("../../src").ConfigHandler<any>)[] | typeof AppController)[];
    onInit(): void;
    onStop(reason: string): void;
    onError(error: Error): void;
}
