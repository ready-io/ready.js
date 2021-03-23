# v0.1.1

### Fixes:

- Declarations of submodules are not available to parent modules
- Singletons are not initialized in the order declared
- logger not found on Module.onStop() after remove the singletons instances
- Log errors on uncaughtException

# v0.1.0

### New:

- First draft of the framework, implement Module, Service, Controller, @Inject with ProviderService and @Route with HttpService

- Support submodules

- Configurable modules

- Routes default error response when throw Error

- Parse route handler return

- Implement MysqlService

- Implement LoggerModule

- The Logger auto encodes message to JSON if it is a object

- The Logger accepts more than one message argument

- Request parameters
- Docs



