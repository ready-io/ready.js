# Controller

*Class*

```typescript
import {Controller} from '@ready.io/server';
```



### Concept

The controllers in the APP are the interface between all the the APP logic and anything outside, services, APIs, resources, clients, etc. This is why the controllers are used with the @Route decorator to handle all the  HTTP requests



### Properties

N/A



### Methods

**onInit()**

Called when the controller is initialized



### Examples

Simple controller with a route /hello handled

```typescript
import {Controller, Inject, Route} from "@ready.io/server";

@Inject()
export default class HelloController extends Controller
{
  @Route('/hello')
  hello()
  {
    return 'Hello world from Ready.io!';
  }
}
```

