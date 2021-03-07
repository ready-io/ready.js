import {Gauge} from "prom-client";
import {LoggerService} from "../../src/index";
import {HttpService} from "../../src/index";
import {Controller, Inject, Route} from "../../src/index";


@Inject()
export default class MetricsController extends Controller
{
  requestsPerMinute: Gauge<string>;


  constructor(public http: HttpService,
              public logger: LoggerService)
  {
    super(http);
  }


  onInit()
  {
    this.requestsPerMinute = new this.http.PromClient.Gauge({
      name: 'requests_per_minute',
      help: 'Number of requests per minute',
      labelNames: ['action'],
    });

    this.http.onMetricsCollected(() =>
    {
      this.requestsPerMinute.reset();
    });
  }


  @Route('/bar')
  bar()
  {
    this.logger.action('AppController.bar').info('bar');
    this.requestsPerMinute.inc({action: 'bar'});

    return 'bar';
  }


  @Route('/foo')
  foo()
  {
    this.logger.action('AppController.foo').info('foo');
    this.requestsPerMinute.inc({action: 'foo'});

    return 'foo';
  }
}
