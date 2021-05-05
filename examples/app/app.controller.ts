import {LoggerService, MysqlService} from "../../src/index";
import {HttpService} from "../../src/index";
import {Controller, Inject, Route} from "../../src/index";


@Inject()
export default class AppController extends Controller
{
  constructor(public http: HttpService,
              public logger: LoggerService,
              public mysql: MysqlService)
  {
    super(http);
  }


  @Route('/bar')
  async bar(params: any)
  {
    const log = this.logger.action('AppController.bar');

    log.info('bar', params.name, params.telephone);

    const results = await this.mysql.query('SELECT 1+2 as test');

    return `${results[0].test}`;
  }


  @Route('/foo')
  foo()
  {
    this.logger.action('AppController.foo').info('foo');

    return 'foo';
  }
}
