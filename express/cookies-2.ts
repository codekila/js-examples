/*
    sessions - page view
*/

var util = require('util');
var parseurl = require('parseurl');
var helpers = require('./helpers.js');

var morgan = require('morgan'),  // was express.logger
    session = require('express-session'),
    express = require('express'),
    app = express();

app.use(morgan('combined'))
    .use(session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000 //ms, 60s
        }
    }))
    .use(function (req, res, next) {
        var views = req.session.views;

        if (!views) {
            views = req.session.views = {};
        }
        // get the url pathname
        var pathname = parseurl(req).pathname;
        // count the views
        views[pathname] = (views[pathname] || 0) + 1;

        next();
    });

app.get('/*', function(req, res){
    var pathname = parseurl(req).pathname;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>sessionID=' + req.sessionID + '</p>');
    res.write('<p>' + util.inspect(req.session) + '</p>');
    res.end('<p>Page(' + pathname + ') viewed ' + req.session.views[pathname] + ' time(s), expires in ' + req.session.cookie.maxAge/1000 + ' second(s)</p>');
});

// everything else goes to 404
app.get('*', helpers.send404);

app.listen(8080);
