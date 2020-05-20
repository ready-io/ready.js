const express    = require('express');
const http       = require('http');
const bodyParser = require('body-parser');
const IO         = require('socket.io');
const IORedis    = require('socket.io-redis');
const got        = require('got');


class HttpService
{
  constructor(options, logger)
  {
    this.options  = options;
    this.logger   = logger;
    this.express  = express();
    this.server   = null;
    this.deferred = {};
  }


  start()
  {
    const log = this.logger.action('HttpService.start');

    // set up http server
    this.server = http.createServer(this.express);
    this.server.listen(this.options.port);

    // express configs
    this.express.use(bodyParser.json());                         // support json encoded bodies
    this.express.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    this.express.use((req, _res, next) =>                        // set params
    {
      req.parsed = {params: {}};

      for (var i in req.body)  { req.parsed.params[i] = req.body[i];  }
      for (var i in req.query) { req.parsed.params[i] = req.query[i]; }

      next();
    });

    this.route("/ping", (res) => { res.send('pong'); });

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


  route(route, handler)
  {
    if (typeof(handler) == 'string')
    {
      this.express.use(route, express.static(handler));
      return;
    }

    if (Array.isArray(handler))
    {
      var callback = (req, res) =>
      {
        handler[0][handler[1]](res, req.parsed.params, req);
      }
    }
    else var callback = (req, res) => { handler(res, req.parsed.params, req); }

    this.express.route(route).get(callback).post(callback);
  }


  debounce(id, timeout, callback)
  {
    if (typeof(this.deferred[id]) != 'undefined') return;

    this.deferred[id] = setTimeout(() =>
    {
      delete this.deferred[id];
      callback();
    }, timeout);
  }


  get(url, params)
  {
    let params_str = [];

    params.token = this.options.token;

    if (params)
    {
      for (let name in params)
      {
        params_str.push(`${name}=${params[name]}`);
      }

      params_str = params_str.length? "?"+params_str.join('&'): "";
    }

    const got_url = `http://${this.options.host}${url}${params_str}`;

    return got(got_url).json();
  }


  post(url, params)
  {
    params.token = this.options.token;

    url = `http://${this.options.host}${url}`;

    return got.post(url, {json: params}).json();
  }

}

module.exports = HttpService;
