/*
    cookies

 */

var util = require('util');
var helpers = require('./helpers.js');

var morgan = require('morgan'),  // was express.logger
    cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express();

var initial:boolean = true;

// hookup middlewares
app.use(morgan('combined'))
    .use(cookieParser());

app.get('/*', function(req, res){
    // set cookies header first
    res.cookie('name', 'codekila');
    if (initial) {
        // reset cookies for server cold start
        initial = false;
        res.cookie('age', 1);
    }
    else {
        // age++
        var age:number = parseInt(req.cookies.age) || 0;
        res.cookie('age', ++age);
    }
    // write body next
    res.end('cookies=' + util.inspect(req.cookies) + '\n');
});

// everything else goes to 404
app.get('*', helpers.send404);

app.listen(8080);
