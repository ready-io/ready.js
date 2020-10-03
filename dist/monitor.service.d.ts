export default class MonitorService {
    logger: any;
    constructor(logger: any);
    start(): void;
    getMemoryUsage(): number;
}
