"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestParams = void 0;
class RequestParams {
    constructor(rawParams) {
        this.rawParams = rawParams;
    }
    require(name, type) {
        if (typeof (this.rawParams[name]) === 'undefined') {
            throw new Error(`Param '${name}' is required`);
        }
        return this.rawParams[name];
    }
    optional(name, type) {
        if (typeof (this.rawParams[name]) === 'undefined') {
            return null;
        }
        return this.rawParams[name];
    }
}
exports.RequestParams = RequestParams;
//# sourceMappingURL=request-params.js.map