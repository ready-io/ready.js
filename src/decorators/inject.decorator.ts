import 'reflect-metadata'


export const injectDefinitions = new Map<Function, any>();


export function InjectDecorator(options = {singleton: true})
{
  return (constructor: Function) =>
  {
    const types = Reflect.getMetadata('design:paramtypes', constructor) || [];
    const paramTypes: Array<Function> = [];

    for (let type of types)
    {
      if (typeof(type) !== 'function')
      {
        throw new Error(`Unknown type of parameter for the constructor ${constructor.name}`);
      }

      paramTypes.push(type);
    }

    injectDefinitions.set(constructor, {paramTypes, options});
  };
}
