# Inject

*Decorator*

```typescript
import {Inject} from '@ready.io/server';
```



### Concept

The @Inject decorator should be used if you want to

- Declare a service in a module
- Have a service or controller with dependency injection handled by the module provider



### Arguments

**options**: {singleton: true}

By default all services with the @Inject decorator are created as a singleton, so they are unique and are always running until the module stop them. If you want a service that does not need to live forever or if is required to spawn multiple instances of it, pass the `singleton: false` option and then create the services with the module provider.



### Examples

**Declare a service in a module**

```typescript
import {Service, Inject} from "@ready.io/server";

@Inject()
export default class MonitorService extends Service
{
  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}
```

with the decorator in place now the service can added to the module declarations

```typescript
declare()
{
  return [
    ...
    MonitorService,
  ];
}
```

**Automatic dependency injection**

If in the module the are services declared...

```typescript
declare()
{
  return [
    HttpService,
    LoggerService,
  ];
}
```

they will be auto injected in the service or controller that depend on them

```typescript
@Inject()
export default class AppController extends Controller
{
  constructor(public http: HttpService,
              public logger: LoggerService)
  {
    super(http);
  }
```

**Service non-singleton**

```typescript
@Inject({singleton: false})
export default class ActionLogger extends Service
{
  constructor(protected logger: Logger,
              protected monitor: MonitorService)
  {
    super();
  }

  error(...message: any)
  {
    this.log('error', ...message);
  }
}
```

the service should be declared in the module as well as singleton services, this to have auto injection of the  dependencies

```typescript
declare()
{
  return [
    // ...
    ActionLogger,
  ];
}
```

now to create a instance of the non-singleton service use the ProviderService of the module

```typescript
@Inject()
export default class LoggerService extends Service
{
  constructor(protected provider: ProviderService)
  {
    super();
  }

  action()
  {
    return this.provider.get<ActionLogger>(ActionLogger);
  }
// ...
```

