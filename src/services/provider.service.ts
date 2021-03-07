export default class ProviderService
{
  static injectDefinitions = new Map<string, Array<string>>();
  static moduleDeclarations = new Map<string, Map<string, any>>();

  instances = new Map();
  declarations = new Map();


  instance(className: string)
  {
    if (!className)
    {
      throw new Error('Class_name empty');
    }

    if (this.instances.has(className))
    {
      return this.instances.get(className);
    }

    const dependenciesClasses = ProviderService.getDependenciesClasses(className);

    if (dependenciesClasses.includes(className))
    {
      throw new Error(`Circular dependency found in ${className}`);
    }

    let paramTypes = ProviderService.injectDefinitions.get(className);
    let params     = [];

    for (let paramType of paramTypes)
    {
      params.push(this.instance(paramType));
    }

    const classDeclarations = this.declarations.get(className);
    const Class = classDeclarations.Class;
    const configHandler = classDeclarations.configHandler;

    const instance: any = new Class(...params);

    if (configHandler)
    {
      configHandler(instance.options);
    }

    this.instances.set(className, instance)

    return instance;
  }


  static getDependenciesClasses(className: string, dependencies = new Map(), level = 0)
  {
    if (dependencies.has(className)) return;

    dependencies.set(className, []);

    let paramTypes = this.injectDefinitions.get(className);

    for (let paramType of paramTypes)
    {
      dependencies.get(className).push(paramType);

      this.getDependenciesClasses(paramType, dependencies, level+1);
    }

    if (level > 0) return;

    const dependenciesClasses: Array<string> = [];

    for (let [_, deps] of dependencies)
    {
      dependenciesClasses.push(...deps);
    }

    return dependenciesClasses;
  }
}

