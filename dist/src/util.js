"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.mapToObj = exports.untilNotNull = exports.untilTrue = exports.untilNotEquals = exports.untilEquals = exports.untilCondition = exports.sleep = exports.HOURS = exports.HOUR = exports.MINUTES = exports.MINUTE = exports.SECONDS = exports.SECOND = void 0;
exports.SECOND = 1000;
exports.SECONDS = exports.SECOND;
exports.MINUTE = 60 * exports.SECOND;
exports.MINUTES = exports.MINUTE;
exports.HOUR = 60 * exports.MINUTE;
exports.HOURS = exports.HOUR;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function untilCondition(fun, timeout = 5000) {
    return new Promise((resolve, reject) => {
        if (fun()) {
            resolve(true);
            return;
        }
        let intervalId;
        let timeoutId;
        intervalId = setInterval(() => {
            if (fun()) {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
                resolve(true);
            }
        }, 200);
        if (timeout) {
            timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                reject(new Error('waiting until a condition is fulfilled, timeout reached'));
            }, timeout);
        }
    });
}
exports.untilCondition = untilCondition;
function untilEquals(value, fun, timeout = 5000) {
    return untilCondition(() => fun() === value, timeout);
}
exports.untilEquals = untilEquals;
function untilNotEquals(value, fun, timeout = 5000) {
    return untilCondition(() => fun() !== value, timeout);
}
exports.untilNotEquals = untilNotEquals;
function untilTrue(fun, timeout = 5000) {
    return untilEquals(true, fun, timeout);
}
exports.untilTrue = untilTrue;
function untilNotNull(fun, timeout = 5000) {
    return untilNotEquals(null, fun, timeout);
}
exports.untilNotNull = untilNotNull;
function mapToObj(input) {
    if (input instanceof Map) {
        let obj = {};
        input.forEach(function (value, key) {
            obj[key] = mapToObj(value);
        });
        return obj;
    }
    if (isObject(input)) {
        let obj = {};
        for (let key in input) {
            let value = input[key];
            obj[key] = mapToObj(value);
        }
        return obj;
    }
    if (Array.isArray(input)) {
        let array = [];
        for (let key in input) {
            let value = input[key];
            array.push(mapToObj(value));
        }
        return array;
    }
    return input;
}
exports.mapToObj = mapToObj;
function isObject(o) {
    return o instanceof Object && o.constructor === Object;
}
exports.isObject = isObject;
//# sourceMappingURL=util.js.map