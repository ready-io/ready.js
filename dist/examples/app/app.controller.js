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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const index_2 = require("../../src/index");
const index_3 = require("../../src/index");
let AppController = class AppController extends index_3.Controller {
    constructor(http, logger, mysql) {
        super(http);
        this.http = http;
        this.logger = logger;
        this.mysql = mysql;
    }
    bar(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = this.logger.action('AppController.bar');
            log.info('bar', params.name, params.telephone);
            const results = yield this.mysql.query('SELECT 1+2 as test');
            return `${results[0].test}`;
        });
    }
    foo() {
        this.logger.action('AppController.foo').info('foo');
        return 'foo';
    }
};
__decorate([
    index_3.Route('/bar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "bar", null);
__decorate([
    index_3.Route('/foo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "foo", null);
AppController = __decorate([
    index_3.Inject(),
    __metadata("design:paramtypes", [index_2.HttpService,
        index_1.LoggerService,
        index_1.MysqlService])
], AppController);
exports.default = AppController;
//# sourceMappingURL=app.controller.js.map