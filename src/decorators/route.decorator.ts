export const controllersRoutes = new Map();


export function Route(path: string)
{
  return function (target: any, propertyKey: string, _descriptor: PropertyDescriptor)
  {
    if (!controllersRoutes.has(target))
    {
      controllersRoutes.set(target, []);
    }

    controllersRoutes.get(target).push({path: path, method: propertyKey});
  };
}
