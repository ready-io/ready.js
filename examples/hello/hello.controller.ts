import {Controller, Inject, Route} from "../../src/index";

@Inject()
export default class HelloController extends Controller
{
  @Route('/hello')
  hello()
  {
    return 'Hello world from Ready.io!';
  }
}
