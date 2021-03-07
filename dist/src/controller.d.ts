import HttpService from "./services/http.service";
import Service from "./services/service";
export default class Controller extends Service {
    http: HttpService;
    constructor(http: HttpService);
    init(): void;
    initRoutes(): void;
}
