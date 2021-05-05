import mysql, {Connection, MysqlError} from 'mysql';
import {SECONDS} from '../util';
import {LoggerService} from '../logger/logger.service';
import {Service, ConfigHandler, Inject} from './service';


const RECONNECTION_TIME = 5*SECONDS;


export class MysqlServiceOptions
{
  host: string;
  user: string;
  password: string;
  database: string;
  port: number = 3306;
}


@Inject()
export class MysqlService extends Service
{
  options = new MysqlServiceOptions();
  connection: Connection;
  pingInterval: NodeJS.Timeout;


  constructor(public logger: LoggerService)
  {
    super();
  }


  static config(handler: ConfigHandler<MysqlServiceOptions>)
  {
    return super.config(handler);
  }


  onInit()
  {
    this.connect();
  }


  connect()
  {
    const log = this.logger.action('MysqlService.connect');

    log.info('Connecting to MySQL');

    clearInterval(this.pingInterval);

    if (this.connection)
    {
      this.connection.destroy();
    }

    this.connection = mysql.createConnection({
      host: this.options.host,
      user: this.options.user,
      password: this.options.password,
      database: this.options.database,
      port: this.options.port,
    });

    this.connection.connect((error: Error) =>
    {
      if (error)
      {
        log.error(`Cannot connect to MySQL ${error.stack}`);
        this.reconnect()
        return;
      }

      this.startPingInterval();
      log.info('Connected to MySQL');
    });

    this.connection.on('error', (error: MysqlError) => { this.handleError(error); });
  }


  handleError(error: MysqlError)
  {
    const log = this.logger.action('MysqlService.handleError');

    if (error.code === 'PROTOCOL_CONNECTION_LOST')
    {
      log.error(`MySQL connection lost ${error.stack}`);
    }
    else
    {
      log.error(error.stack);
    }

    if (error.fatal)
    {
      this.reconnect();
    }
  }


  reconnect()
  {
    setTimeout(() => { this.connect() }, RECONNECTION_TIME);
  }


  startPingInterval()
  {
    this.pingInterval = setInterval(() =>
    {
      this.connection.ping((error) =>
      {
        const log = this.logger.action('MysqlService.ping');

        log.silly('ping');

        if (error)
        {
          this.handleError(error);
        }
      });
    }, 60*SECONDS);
  }


  query(sql: string, values: Array<any> = []): Promise<Array<any>>
  {
    return new Promise((resolve, reject) =>
    {
      this.connection.query(sql, values, (error: MysqlError, results: Array<any>, _fields: any) =>
      {
        if (error)
        {
          this.handleError(error);
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }


  insert(table: string, row: any)
  {
    return this.query('INSERT INTO ?? SET ?', [table, row]);
  }


  update(table: string, primary_key: string, key: string|number, row: any)
  {
    return this.query('UPDATE ?? SET ? WHERE ??=?', [table, row, primary_key, key]);
  }
}
