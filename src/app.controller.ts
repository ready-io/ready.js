import LoggerService from './logger.service';
import HttpService from './http.service';

export default class AppController
{
  requestsPerMinute: any;


  constructor(public http: HttpService,
              public logger: LoggerService)
  {
    this.requestsPerMinute = new this.http.prometheus.Gauge({
      name: 'requests_per_minute',
      help: 'Number of requests per minute',
      labelNames: ['action'],
    });

    this.http.onMetricsCollected(() =>
    {
      this.requestsPerMinute.reset();
    });
  }


  init()
  {
    this.http.route('/hello', [this, 'hello']);
    this.http.route('/foo', [this, 'foo']);
  }


  hello(res: any)
  {
    this.requestsPerMinute.inc({action: 'hello'});
    res.send('hello');
  }


  foo(res: any)
  {
    this.requestsPerMinute.inc({action: 'foo'});
    res.send('foo');
  }
}
