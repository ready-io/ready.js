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
const index_1 = require("../../src/index");
const index_2 = require("../../src/index");
const index_3 = require("../../src/index");
let MetricsController = class MetricsController extends index_3.Controller {
    constructor(http, logger) {
        super(http);
        this.http = http;
        this.logger = logger;
    }
    onInit() {
        this.requestsPerMinute = new this.http.PromClient.Gauge({
            name: 'requests_per_minute',
            help: 'Number of requests per minute',
            labelNames: ['action'],
        });
        this.http.onMetricsCollected(() => {
            this.requestsPerMinute.reset();
        });
    }
    bar() {
        this.logger.action('AppController.bar').info('bar');
        this.requestsPerMinute.inc({ action: 'bar' });
        return 'bar';
    }
    foo() {
        this.logger.action('AppController.foo').info('foo');
        this.requestsPerMinute.inc({ action: 'foo' });
        return 'foo';
    }
};
__decorate([
    (0, index_3.Route)('/bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "bar", null);
__decorate([
    (0, index_3.Route)('/foo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "foo", null);
MetricsController = __decorate([
    (0, index_3.Inject)(),
    __metadata("design:paramtypes", [index_2.HttpService,
        index_1.LoggerService])
], MetricsController);
exports.default = MetricsController;
//# sourceMappingURL=metrics.controller.js.map