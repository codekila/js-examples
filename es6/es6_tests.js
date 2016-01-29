"use strict";

require("babel-polyfill"); // needed for destructuring to work properly (in XXX-compiled.js)

// destructuring test
let [a,b] = [1, 2];
let [,d] = [3, 4];
console.log('destructuring = ' + a + b + d);

// for of, with fat arrow test
for (let v of [1,2,3,4,5]) {
    setTimeout(() => {
        console.log(v);
        }, 500 - v*10);
}

// generator test
let f = (function* () {
    console.log('111');
    yield 111;

    console.log('222');
    yield 222;

    console.log('333');
})();

f.next();
f.next();
f.next();



