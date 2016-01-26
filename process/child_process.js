/// <reference path="../typings/tsd.d.ts" />

const cp = require('child_process');
const util = require('util');

const cmd = cp.spawn('ls', ['-al', '/usr']);

// listen to cmd output
cmd.stdout.on('data', (data) => {
    "use strict";
   console.log('result>\n' + data);
});
cmd.stderr.on('data', (data) => {
    "use strict";
    console.log('err>\n' + data);
});
cmd.on('close', () => {
    "use strict";
    console.log('done!');
});

// send and listen to child process
const child = cp.fork(__dirname + '/child_process2.js');

child.on('message', (msg) => {
    "use strict";
    console.log('recv from child: ' + util.inspect(msg));
});

child.send({key1: 'parent1', key2: 'parent2'});
