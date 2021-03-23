import {Service} from './services/service';
import {ProviderService} from './services/provider.service';
import {injectDefinitions} from './decorators/inject.decorator';


export class EmptyModule extends Service
{
  unhandledRejection: boolean = false;
  exitOnError: boolean = false;
  provider = new ProviderService();
  stopped = false;
  userDeclarations: Array<any> = [];
  declareDefault: Array<any> = [];
  static injectDefinitions = injectDefinitions;


  async init()
  {
    this.setUserDeclarations();
    this.handleShutdown();
    await this.initSingletons();
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

    return {
      Class: userDeclaration[0],
      configHandler: userDeclaration[1],
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


  async initSingletons()
  {
    this.provider.declarations = this.getDeclarations();
    this.provider.init();

    for (let [Class] of this.provider.declarations)
    {
      const instance = this.provider.add(Class);

      if (instance)
      {
        await instance.init();
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
    for (let [Class] of this.provider.declarations)
    {
      this.provider.remove(Class);
    }
  }


  handleShutdown()
  {
    process.on('unhandledRejection', e => { this.unhandledRejection = true; throw e; });
    process.on('uncaughtException',  e =>
    {
      console.log(e);
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
