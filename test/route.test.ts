import 'reflect-metadata'

// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically


class ParamNumber
{

}

function Route(_path: string)
{
  return (target: any, key: string, _descriptor: PropertyDescriptor) =>
  {
    const metadata = Reflect.getMetadata('design:paramtypes', target, key);
    console.log(metadata, _descriptor.value.toString());
  };
}

class FooController
{
  @Route('/foo')
  async foo(_one: ParamNumber = 1)
  {
  }
}

test('test route', () =>
{
});
