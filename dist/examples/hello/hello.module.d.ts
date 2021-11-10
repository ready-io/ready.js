import { Module } from "../../src/index";
import HelloController from "./hello.controller";
export default class HelloModule extends Module {
    declare(): ((typeof import("../../src/index").Service | import("../../src/index").ConfigHandler<any>)[] | typeof HelloController)[];
}
