# Service

*Class*

```typescript
import {Service} from '@ready.io/server';
```



### Concept

A service is anything that is capable to perform some action, task or processing, is where the business logic  is made 



### Properties

**options**: Options

Object with the service options



### Methods

*static* **config()** 

Used to set the service options

**init()**

Initialize the service

**onInit()**

Called when the service is initialized

**stop()**

Force to stop the service

**onStop(reason: string)**

Called when the service is stopped



### Examples

**Basic service**

```typescript
import Service, {Inject} from '@ready.io/server';

@Inject()
export default class MonitorService extends Service
{
  getMemoryUsage()
  {
    return Math.round(process.memoryUsage().heapUsed/1024/1024*100)/100;
  }
}
```

