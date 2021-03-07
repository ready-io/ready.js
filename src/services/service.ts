import 'reflect-metadata'
import {InjectDecorator} from '../decorators/inject.decorator';


export const Inject = InjectDecorator;


export default class Service
{
  protected options: any;


  constructor()
  {
  }


  static config(handler: any)
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
