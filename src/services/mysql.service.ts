import mysql, {Connection} from 'mysql';
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
}


@Inject()
export class MysqlService extends Service
{
  options = new MysqlServiceOptions();
  connection: Connection;


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

    log.info('Connecting to mysql');

    this.connection = mysql.createConnection({
      host: this.options.host,
      user: this.options.user,
      password: this.options.password,
      database: this.options.database,
    });

    this.connection.connect((error: Error) =>
    {
      if (error)
      {
        log.error(`Cannot connect to mysql ${error.stack}`);
        this.reconnect()
        return;
      }

      log.info('Connected to mysql');
    });

    this.connection.on('error', (error: Error) => { this.handleError(error); });
  }


  handleError(error: any)
  {
    const log = this.logger.action('MysqlService.handleError');

    if (error.code === 'PROTOCOL_CONNECTION_LOST')
    {
      log.error(`Mysql connection lost ${error.stack}`);
      this.reconnect()
    }
  }


  reconnect()
  {
    setTimeout(() => { this.connect() }, RECONNECTION_TIME);
  }


  query(sql: string, values: Array<any> = [])
  {
    return new Promise((resolve, reject) =>
    {
      this.connection.query(sql, values, (error: Error, results: Array<any>, _fields: any) =>
      {
        if (error)
        {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }


  insert(table: string, row: any)
  {
    return new Promise((resolve, reject) =>
    {
      this.connection.query('INSERT INTO ?? SET ?', [table, row],
        function (error: Error, results: any, _fields: any)
      {
        if (error)
        {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }


  update(table: string, primary_key: string, key: string|number, row: any)
  {
    return new Promise((resolve, reject) =>
    {
      this.connection.query('UPDATE ?? SET ? WHERE ??=?', [table, row, primary_key, key],
        function (error: Error, results: any, _fields: any)
      {
        if (error)
        {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }
}
