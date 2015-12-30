/*

sample program learning how to write class and class inheritance

 */

class Animal {
    age: number;
    weight: number;

    grow(a: number) {
        this.age += a;
        this.weight += a * 2;
    }

    /*
    constructor(a?:number, w?:number) {
        this.age = (isUndefined(a)? 0:a);
        this.weight = (isUndefined(w)? 0:w);
    }
    */

    say() {
        console.log('I\'m an animal! I\'m ' + this.age + ' years old and ' + this.weight + ' kg~');
    }

    constructor(a = 0, w = 0) {
        this.age = a;
        this.weight = w;
    }
}

class Fish extends Animal {
    length: number;

    say() {
        console.log('I\'m fish, and I can swim! I\'m ' + this.length + ' feet long!');
        super.say();
    }

    constructor(a=0, w=0, l=0) {
        this.length = l>=0?l:0;
        super(a,w);
    }
}

//
var a = new Animal();
var f = new Fish(1,2, 100);

// try some instance types
console.log(a instanceof Animal);
console.log(f instanceof Animal);
console.log(f instanceof Fish);
console.log(f instanceof Object);
console.log(a instanceof Fish);

//
console.log(a.age, a.weight);
a.grow(2);
console.log(a.age, a.weight);

console.log(f.age, f.weight);
f.grow(2);
console.log(f.age, f.weight);
f.say();
