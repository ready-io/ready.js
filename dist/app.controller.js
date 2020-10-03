"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppController {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        this.requestsPerMinute = new this.http.prometheus.Gauge({
            name: 'requests_per_minute',
            help: 'Number of requests per minute',
            labelNames: ['action'],
        });
        this.http.onMetricsCollected(() => {
            this.requestsPerMinute.reset();
        });
    }
    init() {
        this.http.route('/hello', [this, 'hello']);
        this.http.route('/foo', [this, 'foo']);
    }
    hello(res) {
        this.requestsPerMinute.inc({ action: 'hello' });
        res.send('hello');
    }
    foo(res) {
        this.requestsPerMinute.inc({ action: 'foo' });
        res.send('foo');
    }
}
exports.default = AppController;
//# sourceMappingURL=app.controller.js.map