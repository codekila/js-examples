/*
    basic authentication
 */

/// <reference path="../typings/tsd.d.ts" />

let util = require('util');
let helpers = require('./helpers');
let BasicAuth = require('../class/httpBasicAuth');

let bAuth = new BasicAuth('code','kila');

let morgan = require('morgan'),  // was express.logger
    favicon = require('serve-favicon'),
    express = require('express'),
    app = express();

app.use(morgan('combined'))
    .use(favicon(__dirname + '/favicon.ico'));

app.get('/', bAuth.doBasicAuth, function (req, res){
    res.end('<p>You have passed the authentication</p>');
});

app.listen(8080);

