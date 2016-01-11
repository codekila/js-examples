
http = require("http");

var s = http.createServer(requestListner);
s.listen(8080);


function requestListner(req, res) {
    console.log("incoming request " + req.method + " from " + req.url);

    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify( { error: null, bbb: 123 }) + "\n");
}