export class RequestParams
{
  constructor(public rawParams: any)
  {
  }


  require(name: string, type: string)
  {
    if (typeof(this.rawParams[name]) === 'undefined')
    {
      throw new Error(`Param '${name}' is required`);
    }

    return this.rawParams[name];
  }


  optional(name: string, type: string)
  {
    if (typeof(this.rawParams[name]) === 'undefined')
    {
      return null;
    }

    return this.rawParams[name];
  }
}
