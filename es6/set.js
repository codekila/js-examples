/// <reference path="../typings/tsd.d.ts" />

'use strict';

const util = require('util');
const fs = require('fs');
const _ = require('lodash');

fs.readFile(__dirname + '/../LICENSE', (err, data) => {
    if (err) {
        console.log(err.message);
    }
    else {
        let words = _.words(data);
        let uniqueWords = new Set(words); // set stores unique values

        console.log(words.length + ' words in total, with ' + uniqueWords.size + ' unique words');

        // some basic set operations
        uniqueWords.has('LICENSE');
        uniqueWords.add('codekila');
        uniqueWords.delete('limitations');

        //uniqueWords.forEach(value => console.log(value));
        let count = 0;
        for (let value of uniqueWords) {
            console.log(++count + '/' + uniqueWords.size + ':' + value);
        }
    }
});
