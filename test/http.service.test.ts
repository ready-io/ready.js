import HttpService from '../src/http.service';
import LoggerService from '../src/logger.service';

test('test http service', () =>
{
  const logger = new LoggerService();
  logger.options.dir = 'logs';
  logger.options.level = 'info';
  logger.options.console = true;
  logger.init();

  const http = new HttpService(logger);
  http.options.socketsServer.enabled = true;
  http.init();
  http.stop();
});
