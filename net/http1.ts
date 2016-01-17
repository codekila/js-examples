
var http = require("http");
var url = require("url");
var process = require("process");
//var util = require("util");

var s = http.createServer(requestListner);
s.listen(8080);

function requestListner(req, res) {
    req.parsedURL = url.parse(req.url, true);

    //console.log(util.inspect(req.parsedURL));

    var coreURL = req.parsedURL.pathname;
    console.log("incoming request " + req.method + " from " + coreURL);

    res.writeHead(200, {"Content-Type": "application/json"});
    if (coreURL == '/' && req.parsedURL.query.hasOwnProperty('exit')) {
        res.end(JSON.stringify({error: null, exit: true}) + "\n");
        console.log("Exiting the http server...");
        process.exit(0);
    }
    else {
        res.end(JSON.stringify({error: null, continue: true}) + "\n");
    }
}