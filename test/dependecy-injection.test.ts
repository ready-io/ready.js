import 'reflect-metadata'

class B {

}

@Module()
class A
{
  foo: number;
  bar: number;

  constructor(a?: string, b?: B)
  {

  }
}

function Module()
{
  return function (constructor: Function)
  {
    const types = Reflect.getMetadata('design:paramtypes', constructor);

    console.log(constructor.arguments);
    //console.log(types[0].name);
    //console.log(types[1].name);
  }
}

test('test DI', () =>
{
  //const types = Reflect.getMetadata('design:paramtypes', A);
  //console.log(types[0].name);
  //console.log(types[1].name);

  //const types = Reflect.getMetadata('custom:annotation', A);
  //console.log(types);

  //new A();
  //console.log(A);
});
