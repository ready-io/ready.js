import Module from '../src/module';


test('start/stop module', () =>
{
  const mod = new Module();
  mod.init();
  mod.stop();
});
