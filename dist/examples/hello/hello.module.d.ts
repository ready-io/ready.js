import { Module } from "../../src/index";
import HelloController from "./hello.controller";
export default class HelloModule extends Module {
    declare: (any[] | typeof HelloController)[];
}
