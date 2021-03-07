import 'reflect-metadata'
import ProviderService from '../services/provider.service';

export function InjectDecorator()
{
  return (constructor: Function) =>
  {
    const types = Reflect.getMetadata('design:paramtypes', constructor) || [];
    const paramTypes: Array<string> = [];

    for (let type of types)
    {
      paramTypes.push(type.name);
    }

    ProviderService.injectDefinitions.set(constructor.name, paramTypes);
  };
}
