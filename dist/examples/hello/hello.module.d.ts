import { Module } from "../../src/index";
import HelloController from "./hello.controller";
export default class HelloModule extends Module {
    declare(): ((typeof import("../../src").Service | import("../../src").ConfigHandler<any>)[] | typeof HelloController)[];
}
