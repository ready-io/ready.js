"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CHECK_MEMORY_INTERVAL = 1000 * 60; // ms
class MonitorService {
    constructor(logger) {
        this.logger = logger;
    }
    start() {
    }
    getMemoryUsage() {
        return Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
    }
}
exports.default = MonitorService;
module.exports = MonitorService;
//# sourceMappingURL=monitor.service.js.map