import {injectDefinitions} from './decorators/inject.decorator';
import {Service} from './services/service';
import {ProviderService} from './services/provider.service';


export class EmptyModule extends Service
{
  unhandledRejection: boolean = false;
  exitOnError: boolean = false;
  provider = new ProviderService();
  stopped = false;
  userDeclarations: Array<any> = [];
  declareDefault: Array<any> = [];


  init()
  {
    this.setUserDeclarations();
    this.handleShutdown();
    this.initSingletons();
    this.onInit();
  }


  onInit()
  {
  }


  setUserDeclarations()
  {
    this.userDeclarations = this.declare();
  }


  declare(): Array<any>
  {
    return [];
  }


  parseUserDeclaration(userDeclaration: any)
  {
    if (!Array.isArray(userDeclaration))
    {
      userDeclaration = [userDeclaration];
    }

    const Class     = userDeclaration[0];
    const injectDef = injectDefinitions.get(Class);
    const singleton = injectDef.options.singleton

    return {
      Class: userDeclaration[0],
      configHandler: userDeclaration[1],
      singleton: singleton,
    };
  }


  getDeclarations()
  {
    const declarations = new Map();

    for (let userDeclaration of this.declareDefault)
    {
      let declaration = this.parseUserDeclaration(userDeclaration);

      declarations.set(declaration.Class, declaration);
    }

    for (let userDeclaration of this.userDeclarations)
    {
      let declaration = this.parseUserDeclaration(userDeclaration);

      declarations.set(declaration.Class, declaration);
    }

    return declarations;
  }


  initSingletons()
  {
    this.provider.declarations = this.getDeclarations();
    this.provider.init();

    for (let [Class, declaration] of this.provider.declarations)
    {
      if (declaration.singleton)
      {
        this.provider.get(Class);
      }
    }
  }


  stop(reason = 'stop called')
  {
    if (this.stopped) return;

    this.stopped = true;
    this.stopSingletons();
    this.onStop(reason);
  }


  stopSingletons()
  {
    for (let [Class, declaration] of this.provider.declarations)
    {
      if (declaration.singleton)
      {
        this.provider.remove(Class);
      }
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
