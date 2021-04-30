"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
class ParamNumber {
}
function Route(_path) {
    return (target, key, _descriptor) => {
        const metadata = Reflect.getMetadata('design:paramtypes', target, key);
        console.log(metadata, _descriptor.value.toString());
    };
}
class FooController {
    foo(_one = 1) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
__decorate([
    Route('/foo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ParamNumber]),
    __metadata("design:returntype", Promise)
], FooController.prototype, "foo", null);
test('test route', () => {
});
//# sourceMappingURL=route.test.js.map