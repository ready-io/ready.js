import ProviderService from '../services/provider.service';

export function DeclareDecorator(declarations: Array<any>)
{
  return (constructor: any) =>
  {
    const moduleDeclarations = new Map();

    for (let declaration of declarations)
    {
      if (!Array.isArray(declaration))
      {
        declaration = [declaration];
      }

      let Class   = declaration[0];
      let configHandler = declaration[1];

      moduleDeclarations.set(Class.name, {Class: Class, configHandler: configHandler});
    }

    ProviderService.moduleDeclarations.set(constructor.name, moduleDeclarations);
  }
}
