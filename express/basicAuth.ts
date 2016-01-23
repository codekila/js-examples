/*
    basic authentication
 */

var util = require('util');
var helpers = require('./helpers');
var BasicAuth = require('../class/httpBasicAuth');

var bAuth = new BasicAuth('code','kila');

var morgan = require('morgan'),  // was express.logger
    favicon = require('serve-favicon'),
    express = require('express'),
    app = express();

app.use(morgan('combined'))
    .use(favicon(__dirname + '/favicon.ico'));

app.get('/', bAuth.doBasicAuth, function (req, res){
    res.end('<p>You have passed the authentication</p>');
});

app.listen(8080);

