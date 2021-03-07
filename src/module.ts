import LoggerService from './services/logger.service';
import MonitorService from './services/monitor.service';
import ProviderService from './services/provider.service';


export default class Module
{
  protected unhandledRejection: boolean = false;
  protected exitOnError: boolean = false;
  protected servicesMap = new Map();
  logger: LoggerService;
  stopped = false;
  declare: Array<any> = [];
  declareDefault: Array<any> =
  [
    MonitorService,
    LoggerService,
  ];


  constructor()
  {
  }


  init()
  {
    this.handleShutdown();
    this.startServices();
    this.onInit();
  }


  onInit()
  {
  }


  parseUserDeclaration(userDeclaration: any)
  {
    if (!Array.isArray(userDeclaration))
    {
      userDeclaration = [userDeclaration];
    }

    return {Class: userDeclaration[0], configHandler: userDeclaration[1]};
  }


  getDeclarations()
  {
    const declarations = new Map();

    for (let userDeclaration of this.declareDefault)
    {
      let declaration = this.parseUserDeclaration(userDeclaration);

      declarations.set(declaration.Class.name, declaration);
    }

    for (let userDeclaration of this.declare)
    {
      let declaration = this.parseUserDeclaration(userDeclaration);

      declarations.set(declaration.Class.name, declaration);
    }

    return declarations;
  }


  startServices()
  {
    const providerService = new ProviderService;
    providerService.declarations = this.getDeclarations();

    for (let [className, declaration] of providerService.declarations)
    {
      const instance = providerService.instance(className);

      instance.init();
      this.servicesMap.set(declaration.Class, instance);
    }

    this.logger = this.service<LoggerService>(LoggerService);
  }


  service<T>(Class: any): T
  {
    return this.servicesMap.get(Class);
  }


  stop(reason = 'stop called')
  {
    if (this.stopped) return;

    this.stopped = true;
    this.stopServices();
    this.onStop(reason);
  }


  stopServices()
  {
    for (let service of this.servicesMap.values())
    {
      service.stop();
    }
  }


  handleShutdown()
  {
    process.on('unhandledRejection', e => { this.unhandledRejection = true; throw e; });
    process.on('uncaughtException',  e =>
    {
      this.onError(e);
      this.exitOnError = true;

      if (this.unhandledRejection) throw e;
    });

    process.on('exit', code =>
    {
      if (this.exitOnError) code = 1;

      this.stop(`exit code ${code}`);
      process.exit(code);
    });

    process.on('SIGTERM', () => { this.stop('SIGTERM'); process.exit(0); });
    process.on('SIGINT',  () => { this.stop('SIGINT');  process.exit(0); });
  }


  onStop(_reason?: string)
  {
  }


  onError(_error: any)
  {
  }
}
