/*

sample program learning how to write class and class inheritance

 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animal = (function () {
    function Animal(a, w) {
        if (a === void 0) { a = 0; }
        if (w === void 0) { w = 0; }
        this.age = a;
        this.weight = w;
    }
    Animal.prototype.grow = function (a) {
        this.age += a;
        this.weight += a * 2;
    };
    /*
    constructor(a?:number, w?:number) {
        this.age = (isUndefined(a)? 0:a);
        this.weight = (isUndefined(w)? 0:w);
    }
    */
    Animal.prototype.say = function () {
        console.log('I\'m an animal! I\'m ' + this.age + ' years old and ' + this.weight + ' kg~');
    };
    return Animal;
})();
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(a, w, l) {
        if (a === void 0) { a = 0; }
        if (w === void 0) { w = 0; }
        if (l === void 0) { l = 0; }
        this.length = l >= 0 ? l : 0;
        _super.call(this, a, w);
    }
    Fish.prototype.say = function () {
        console.log('I\'m fish, and I can swim! I\'m ' + this.length + ' feet long!');
        _super.prototype.say.call(this);
    };
    return Fish;
})(Animal);
//
var a = new Animal();
var f = new Fish(1, 2, 100);
// try some instance types
console.log(a instanceof Animal);
console.log(f instanceof Animal);
console.log(f instanceof Fish);
console.log(f instanceof Object);
//
console.log(a.age, a.weight);
a.grow(2);
console.log(a.age, a.weight);
console.log(f.age, f.weight);
f.grow(2);
console.log(f.age, f.weight);
f.say();
//# sourceMappingURL=app1.js.map