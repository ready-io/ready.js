"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_io_redis_1 = __importDefault(require("socket.io-redis"));
const got_1 = __importDefault(require("got"));
const prom_client_1 = __importDefault(require("prom-client"));
const rxjs_1 = require("rxjs");
class HttpService {
    constructor(options, logger) {
        this.metricsCollected = new rxjs_1.Subject();
        this.options = options;
        this.logger = logger;
        this.express = express_1.default();
        this.server = null;
        this.deferred = {};
        this.prometheus = prom_client_1.default;
    }
    start() {
        const log = this.logger.action('HttpService.start');
        // set up http server
        this.server = http_1.default.createServer(this.express);
        this.server.listen(this.options.port);
        // express configs
        this.express.use(body_parser_1.default.json({ limit: '10mb' })); // support json encoded bodies
        this.express.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb' })); // support encoded bodies
        this.express.use((req, _res, next) => // set params
         {
            req.parsed = { params: {} };
            for (var i in req.body) {
                req.parsed.params[i] = req.body[i];
            }
            for (var i in req.query) {
                req.parsed.params[i] = req.query[i];
            }
            next();
        });
        this.route("/ping", (res) => { res.send('pong'); });
        this.route("/metrics", (res, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.set('Content-Type', this.prometheus.register.contentType);
                res.end(this.prometheus.register.metrics());
                const collect = typeof (params.collect) != 'undefined' ? +params.collect : 1;
                if (collect) {
                    this.metricsCollected.next();
                }
            }
            catch (ex) {
                res.status(500).end(ex);
            }
        }));
        log.info("HTTP server started");
        if (this.options.sockets_server)
            this.startSocketsServer();
    }
    startSocketsServer() {
        const log = this.logger.action('HttpService.startSocketsServer');
        const options = typeof (this.options.sockets_server) == 'object' ? this.options.sockets_server : {};
        this.io = socket_io_1.default();
        this.io.attach(this.server);
        if (options.redis_host && options.redis_port) {
            this.io.adapter(socket_io_redis_1.default({ host: options.redis_host, port: options.redis_port }));
        }
        log.info("Sockets server started");
    }
    route(route, handler) {
        if (typeof (handler) == 'string') {
            this.express.use(route, express_1.default.static(handler));
            return;
        }
        if (Array.isArray(handler)) {
            var callback = (req, res) => {
                handler[0][handler[1]](res, req.parsed.params, req);
            };
        }
        else
            var callback = (req, res) => { handler(res, req.parsed.params, req); };
        this.express.route(route).get(callback).post(callback);
    }
    debounce(id, timeout, callback) {
        if (typeof (this.deferred[id]) != 'undefined')
            return;
        this.deferred[id] = setTimeout(() => {
            delete this.deferred[id];
            callback();
        }, timeout);
    }
    get(url, params) {
        let params_str = "";
        params.token = this.options.token;
        if (params) {
            let params_arr = [];
            for (let name in params) {
                params_arr.push(`${name}=${params[name]}`);
            }
            params_str = params_arr.length ? "?" + params_arr.join('&') : "";
        }
        const got_url = `http://${this.options.host}${url}${params_str}`;
        return got_1.default(got_url).json();
    }
    post(url, params) {
        params.token = this.options.token;
        url = `http://${this.options.host}${url}`;
        return got_1.default.post(url, { json: params }).json();
    }
    onMetricsCollected(callback) {
        this.metricsCollected.subscribe(callback);
    }
}
exports.default = HttpService;
//# sourceMappingURL=http.service.js.map