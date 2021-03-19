import {controllersRoutes} from "./decorators/route.decorator";
import {HttpService} from "./services/http.service";
import {Service, Inject} from "./services/service";

@Inject()
export class Controller extends Service
{
  constructor(public http: HttpService)
  {
    super();
  }


  init()
  {
    this.onInit();
    this.initRoutes();
  }


  initRoutes()
  {
    const routes = controllersRoutes.get(this.constructor.prototype) || [];

    for (let route of routes)
    {
      this.http.route(route.path, [this, route.method]);
    }
  }
}
