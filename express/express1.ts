var express = require('express');
var app = express();

var util = require('util');
var helpers = require('./helpers.js');

// match this
app.get('/:dirName/:fileName.:extName', function(req, res) {
    res.write('hello express world!\n');
    res.end(util.inspect(req.params) + '\n');
});
// everything else goes to 404
app.get('*', helpers.send404);

app.listen(8080);
