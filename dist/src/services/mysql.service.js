"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlServiceOptions = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("../util");
const logger_service_1 = __importDefault(require("../logger/logger.service"));
const service_1 = __importStar(require("./service"));
const RECONNECTION_TIME = 5 * util_1.SECONDS;
class MysqlServiceOptions {
}
exports.MysqlServiceOptions = MysqlServiceOptions;
let MysqlService = class MysqlService extends service_1.default {
    constructor(logger) {
        super();
        this.logger = logger;
        this.options = new MysqlServiceOptions();
    }
    static config(handler) {
        return super.config(handler);
    }
    onInit() {
        this.connect();
    }
    connect() {
        const log = this.logger.action('MysqlService.connect');
        log.info('Connecting to mysql');
        this.connection = mysql_1.default.createConnection({
            host: this.options.host,
            user: this.options.user,
            password: this.options.password,
            database: this.options.database,
        });
        this.connection.connect((error) => {
            if (error) {
                log.error(`Cannot connect to mysql ${error.stack}`);
                this.reconnect();
                return;
            }
            log.info('Connected to mysql');
        });
        this.connection.on('error', (error) => { this.handleError(error); });
    }
    handleError(error) {
        const log = this.logger.action('MysqlService.handleError');
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            log.error(`Mysql connection lost ${error.stack}`);
            this.reconnect();
        }
    }
    reconnect() {
        setTimeout(() => { this.connect(); }, RECONNECTION_TIME);
    }
    query(sql, values = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results, _fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    insert(table, row) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO ?? SET ?', [table, row], function (error, results, _fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    update(table, primary_key, key, row) {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE ?? SET ? WHERE ??=?', [table, row, primary_key, key], function (error, results, _fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
};
MysqlService = __decorate([
    service_1.Inject(),
    __metadata("design:paramtypes", [logger_service_1.default])
], MysqlService);
exports.default = MysqlService;
//# sourceMappingURL=mysql.service.js.map