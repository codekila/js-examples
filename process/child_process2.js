/// <reference path="../typings/tsd.d.ts" />

const process = require('process');
const util = require('util');
const _ = require('lodash');

process.on('message', (msg) => {
    "use strict";
    let obj = {};

    console.log('recv from parent: ' + util.inspect(msg));

    _.extend(obj, msg, {key3: 'child1', key4: 'child2'});

    console.log('sending back ' + util.inspect(obj));
    process.send(obj);
});

process.on('SIGTERM', () => {
    console.log('child is going down...');
    process.exit(0);
});
