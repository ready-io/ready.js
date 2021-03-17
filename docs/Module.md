# Module

*Class*

```typescript
import {Module} from "@ready.io/server";
```



### Concept

A module purpose is to group services, controllers and sub-modules. To define a module you can create a class that extends the class Module and return an array with the services, controllers and sub-modules in the declare method.



### Properties

**options**: Options

Object with the module options, they are util to pass options to the declared services/sub-modules



### Methods

*static* **config()** 

Used to set the module options when declare it in a parent module

**init()**

Initialize the module,  and all declared services, controllers and sub-modules, you only need to call it in the main file of the app

**declare()**

Is called on module initialization, the returned array are composed of what are called the "declarations" of the module, those are all the services, controllers and submodules that be part of the module, these will be initialized, and will be available for the dependency injection provider to interact each with the others

**onInit()**

Called when the module is initialized

**stop()**

Stop the module, services, controllers and sub-modules. It is auto fired on SIGTERM, SIGINT signals

**onStop(reason: string)**

Called when the module is stopped, 

**onError(error: Error)**

Called when an unhandled error is thrown 



### Examples

**Simple hello world module**

```typescript
export default class HelloModule extends Module
{
  declare()
  {
    return [
      HttpService.config(options =>
      {
        options.port = 3000;
      }),
      HelloController,
    ];
  }
}
```

**Module with options, and life-cycle handling**

```typescript
export class Options
{
  level: string = 'error';
}

export default class LoggerModule extends Module
{
	options = new Options();
  
  static config(handler: ConfigHandler<Options>)
  {
    return super.config(handler);
  }
  
  declare()
  {
    return [
      Logger.config(options =>
      {
        options.level = this.options.level;
      })
    ];
  }

  onInit()
  {
    this.logger.action('LoggerModule.onInit').info(' ⚡ ');
  }

  onStop(reason: string)
  {
    this.logger.action('LoggerModule.onStop').info(reason);
  }

  onError(error: Error)
  {
    this.logger.action('LoggerModule.onError').error(error.stack);
  }
}
```

**Explicit initializing a module**

```typescript
const hello = new HelloModule();
hello.init();
```

**Explicit stopping a module**

```typescript
hello.stop();
```

