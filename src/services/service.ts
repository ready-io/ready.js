import {InjectDecorator} from '../decorators/inject.decorator';


export const Inject = InjectDecorator;
export type ConfigHandler<T> = (options: T) => void;


@Inject()
export class Service
{
  protected options: any;


  static config(handler: ConfigHandler<any>)
  {
    return [this, handler];
  }


  init()
  {
    this.onInit();
  }


  onInit()
  {
  }


  stop()
  {
    this.onStop();
  }


  onStop()
  {
  }
}
