# Route

*Decorator*

```typescript
import {Route} from '@ready.io/server';
```



### Concept

The @Route decorator can be used to mark a controller method as a handler of an HTTP request



### Arguments

**path**: string

The path of the route



### Examples

**Route with params**

/edit?name=ready&telephone=123456

```typescript
@Inject()
export default class AppController extends Controller
{
  @Route('/edit')
  edit(params: any)
  {
    console.log(params.name, params.telephone);

    return 'ok';
  }
}
```

