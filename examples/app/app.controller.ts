import {LoggerService} from "../../src/index";
import {HttpService} from "../../src/index";
import {Controller, Inject, Route} from "../../src/index";


@Inject()
export default class AppController extends Controller
{
  constructor(public http: HttpService,
              public logger: LoggerService)
  {
    super(http);
  }


  @Route('/bar')
  bar(params: any)
  {
    const log = this.logger.action('AppController.bar');

    log.info('bar', params.name, params.telephone);

    return 'bar';
  }


  @Route('/foo')
  foo()
  {
    this.logger.action('AppController.foo').info('foo');

    return 'foo';
  }
}
