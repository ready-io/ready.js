<img src="logo.png" alt="logo" />

# Ready.io - server.js
*Framework for agile development*

### Motivation

For some time I have had the idea of start this project mainly because I can and have the time to do it, but also because I have felt led to it. In my day to day as a web developer, I want to have a solid and general structure in all my projects, follow well-defined patterns and best practices, and have a base that has everything I need to can focus only in the applications logic forgetting all the trivial. Ready.io will be made for help with this, and I hope it also can help anyone else.

### Disclaimer

I am giving the first steps so there is not much to see here yet. I have a lot of ideas and things to learn and I have to decide what implement first, I also could decide to totally change anything from a version to another, so all can be very unstable for now.

### Install

```bash
npm i @ready.io/server
```

### Links

- [Documentation](docs)
- [Examples](examples)
- [Changelog](CHANGELOG.md)

### Getting started

The three main components of an app made with ready.io are *Modules*, *Services* and *Controllers*.

- **Modules:** serve to group *Services*, *Controllers* and also other *Modules* (called sub-modules).
- **Services:** are all the units that potentially can perform any kind of action, process or logic.
- **Controllers:**  serve as the middle-ware for all communications between the app and anything outside.

By the *Services* definition you can note that *Controllers* and *Modules* are also a kind of *Services*, as them both have some logic.

**Hands on the code**

Lets create a hello world app, first setup your workspace (or just clone [app.js](https://github.com/ready-io/app.js) ): create a folder, install ready.io, and configure typescript (see [tsconfig.json](tsconfig.json)). When you are done, add the next files:

src/hello.ts

```typescript
import HelloModule from './hello.module';

const hello = new HelloModule();
hello.init();
```

src/hello.module.ts

```typescript
import {Module} from "@ready.io/server";
import {HttpService} from "@ready.io/server";
import HelloController from "./hello.controller";

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

src/controller.ts

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

The hello.ts is the entry of the app, as you can see it creates a HelloModule an initialize it, the module declares that is composed of a HttpService running on port 3000 and a HelloController, the controller has a handler for the route /hello.

So, when you start the app, an HTTP server will be up on the port 3000, you can open the URL http://localhost:3000/hello in the browser and see the message "Hello world from Ready.io!" that is returned by the HelloController route handler.

**As simple as it**

Each controller expects a HttpService to work with the @Route decorator to set the handlers, the module has a provider service that auto inject the dependencies like this, so you don't have to care about that.

Check the [documentation](docs) and the [examples](examples) to learn more and see all can be done with ready.io!

### License

Copyright &copy; 2020-present [Santiago](https://github.com/hrcarsan), licensed under the [MIT License](LICENSE).
