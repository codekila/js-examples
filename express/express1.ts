/*
    this example works with express 4.x, not 3.x
*/

var util = require('util');
var helpers = require('./helpers.js');

var morgan = require('morgan'),  // was express.logger
    responseTme = require('response-time'), // X-Response-Time header
    compression = require('compression'), // http compression
    serveStatic = require('serve-static'), // serve static files
    serveFavicon = require('serve-favicon'), // serve favicon.ico
    express = require('express'),
    app = express();

const staticDir:string = '/static';

// hookup middlewares
app.use(morgan('combined'))
    .use(responseTme())
    .use(compression())
    .use(staticDir, serveStatic(__dirname + staticDir, {'index':['index.html', 'index.htm']}))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(function(req, res, next){
        var now = new Date();
        console.log("Request time: " + now.toUTCString());
        next();
    });

// match this
app.get('/:dirName/:fileName.:extName', function(req, res) {
    res.write('hello express world!\n');
    res.end(util.inspect(req.params) + '\n');
});
// everything else goes to 404
app.get('*', helpers.send404);

app.listen(8080);
