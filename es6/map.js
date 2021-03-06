/// <reference path="../typings/tsd.d.ts" />

'use strict';

require("babel-polyfill"); // needed for destructuring to work properly (in XXX-compiled.js)

const util = require('util');
const fs = require('fs');
const _ = require('lodash');

fs.readFile(__dirname + '/../LICENSE', (err, data) => {
    if (err) {
        console.log(err.message);
    }
    else {
        let words = _.words(data);
        let map = new Map();

        for (let word of words) {
            let count = map.get(word);
            if (count==undefined) {
                map.set(word, 1);
            }
            else {
                map.set(word, count+1);
            }
        }

        console.log('map size = ' + map.size);


        // somehow destructuring doesn't work
        let maxWord = '';
        let maxCount = 0;
        for (let [key, value] of map.entries()) {
            //console.log('destructuring: ' + key + ' : ' + value + ' times');
            if (value > maxCount) {
                maxCount = value;
                maxWord = key;
            }
        }

        /*
        let maxWord = '';
        let maxCount = 0;
        map.forEach((value, key) => {
            //console.log(key + ' : ' + value + ' times');
            if (value > maxCount) {
                maxCount = value;
                maxWord = key;
            }
        });
        */

        console.log('\'' + maxWord + '\' is counted the most(' + maxCount + ') times');
    }
});
