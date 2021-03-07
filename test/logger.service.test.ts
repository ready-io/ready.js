import LoggerService from '../src/services/logger.service';

test('test logger', () =>
{
  const logger = new LoggerService();
  logger.options.dir = 'logs';
  logger.options.level = 'info';
  logger.options.console = true;
  logger.init();

  const log = logger.action('test.log');

  log.info('test');

  logger.stop();
});
