import { HttpService } from "./services/http.service";
import { Service } from "./services/service";
export declare class Controller extends Service {
    http: HttpService;
    constructor(http: HttpService);
    init(): void;
    initRoutes(): void;
}
