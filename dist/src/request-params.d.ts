export declare class RequestParams {
    rawParams: any;
    constructor(rawParams: any);
    require(name: string, type: string): any;
    optional(name: string, type: string): any;
}
