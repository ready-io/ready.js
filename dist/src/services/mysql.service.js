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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlService = exports.MysqlServiceOptions = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("../util");
const logger_service_1 = require("../logger/logger.service");
const service_1 = require("./service");
const RECONNECTION_TIME = 5 * util_1.SECONDS;
class MysqlServiceOptions {
    constructor() {
        this.port = 3306;
    }
}
exports.MysqlServiceOptions = MysqlServiceOptions;
let MysqlService = class MysqlService extends service_1.Service {
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
        log.info('Connecting to MySQL');
        clearInterval(this.pingInterval);
        if (this.connection) {
            this.connection.destroy();
        }
        this.connection = mysql_1.default.createConnection({
            host: this.options.host,
            user: this.options.user,
            password: this.options.password,
            database: this.options.database,
            port: this.options.port,
        });
        this.connection.connect((error) => {
            if (error) {
                log.error(`Cannot connect to MySQL ${error.stack}`);
                this.reconnect();
                return;
            }
            this.startPingInterval();
            log.info('Connected to MySQL');
        });
        this.connection.on('error', (error) => { this.handleError(error); });
    }
    handleError(error) {
        const log = this.logger.action('MysqlService.handleError');
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            log.error(`MySQL connection lost ${error.stack}`);
        }
        else {
            log.error(error.stack);
        }
        if (error.fatal) {
            this.reconnect();
        }
    }
    reconnect() {
        setTimeout(() => { this.connect(); }, RECONNECTION_TIME);
    }
    startPingInterval() {
        this.pingInterval = setInterval(() => {
            this.connection.ping((error) => {
                const log = this.logger.action('MysqlService.ping');
                log.silly('ping');
                if (error) {
                    this.handleError(error);
                }
            });
        }, 60 * util_1.SECONDS);
    }
    query(sql, values = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results, _fields) => {
                if (error) {
                    this.handleError(error);
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    insert(table, row) {
        return this.query('INSERT INTO ?? SET ?', [table, row]);
    }
    update(table, primary_key, key, row) {
        return this.query('UPDATE ?? SET ? WHERE ??=?', [table, row, primary_key, key]);
    }
};
MysqlService = __decorate([
    service_1.Inject(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], MysqlService);
exports.MysqlService = MysqlService;
//# sourceMappingURL=mysql.service.js.map