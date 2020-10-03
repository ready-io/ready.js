import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import IO from 'socket.io';
import IORedis from 'socket.io-redis';
import got from 'got';
import LoggerService from './logger.service';
import PromClient from 'prom-client';
import {Subject} from 'rxjs';


export default class HttpService
{
  options: any;
  logger: any;
  express: any;
  server: any;
  deferred: any;
  io: any;
  prometheus: any;
  protected metricsCollected = new Subject();


  constructor(options: any, logger: LoggerService)
  {
    this.options  = options;
    this.logger   = logger;
    this.express  = express();
    this.server   = null;
    this.deferred = {};
    this.prometheus = PromClient;
  }


  start()
  {
    const log = this.logger.action('HttpService.start');

    // set up http server
    this.server = http.createServer(this.express);
    this.server.listen(this.options.port);

    // express configs
    this.express.use(bodyParser.json({ limit: '10mb' })); // support json encoded bodies
    this.express.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // support encoded bodies
    this.express.use((req: any, _res: any, next: any) =>                        // set params
    {
      req.parsed = {params: {}};

      for (var i in req.body)  { req.parsed.params[i] = req.body[i];  }
      for (var i in req.query) { req.parsed.params[i] = req.query[i]; }

      next();
    });

    this.route("/ping", (res: any) => { res.send('pong'); });

    this.route("/metrics", async (res: any, params: any) =>
    {
      try
      {
        res.set('Content-Type', this.prometheus.register.contentType);
        res.end(this.prometheus.register.metrics());

        const collect = typeof(params.collect) != 'undefined'? +params.collect: 1;

        if (collect)
        {
          this.metricsCollected.next();
        }
      }
      catch (ex)
      {
        res.status(500).end(ex);
      }
    });

    log.info("HTTP server started");

    if (this.options.sockets_server) this.startSocketsServer();
  }


  startSocketsServer()
  {
    const log     = this.logger.action('HttpService.startSocketsServer');
    const options = typeof(this.options.sockets_server) == 'object'? this.options.sockets_server: {};

    this.io = IO();
    this.io.attach(this.server);

    if (options.redis_host && options.redis_port)
    {
      this.io.adapter(IORedis({host: options.redis_host, port: options.redis_port}));
    }

    log.info("Sockets server started");
  }


  route(route: any, handler: any)
  {
    if (typeof(handler) == 'string')
    {
      this.express.use(route, express.static(handler));
      return;
    }

    if (Array.isArray(handler))
    {
      var callback = (req: any, res: any) =>
      {
        handler[0][handler[1]](res, req.parsed.params, req);
      }
    }
    else var callback = (req: any, res: any) => { handler(res, req.parsed.params, req); }

    this.express.route(route).get(callback).post(callback);
  }


  debounce(id: string, timeout: number, callback: () => {})
  {
    if (typeof(this.deferred[id]) != 'undefined') return;

    this.deferred[id] = setTimeout(() =>
    {
      delete this.deferred[id];
      callback();
    }, timeout);
  }


  get(url: string, params: any)
  {
    let params_str = ""

    params.token = this.options.token;

    if (params)
    {
      let params_arr = [];

      for (let name in params)
      {
        params_arr.push(`${name}=${params[name]}`);
      }

      params_str = params_arr.length? "?"+params_arr.join('&'): "";
    }

    const got_url = `http://${this.options.host}${url}${params_str}`;

    return got(got_url).json();
  }


  post(url: string, params: any)
  {
    params.token = this.options.token;

    url = `http://${this.options.host}${url}`;

    return got.post(url, {json: params}).json();
  }


  onMetricsCollected(callback: () => void)
  {
    this.metricsCollected.subscribe(callback);
  }
}
