import Service from "./service";
export default class MonitorService extends Service {
    /**
     * It returns the memory usage in MB
     */
    getMemoryUsage(): number;
}
