"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const route_decorator_1 = require("./decorators/route.decorator");
const http_service_1 = require("./services/http.service");
const service_1 = require("./services/service");
let Controller = class Controller extends service_1.Service {
    constructor(http) {
        super();
        this.http = http;
    }
    init() {
        this.onInit();
        this.initRoutes();
    }
    initRoutes() {
        const routes = route_decorator_1.controllersRoutes.get(this.constructor.prototype) || [];
        for (let route of routes) {
            this.http.route(route.path, [this, route.method]);
        }
    }
};
Controller = __decorate([
    service_1.Inject(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map