/*
    a tiny helper module for http server
 */

exports.version = '0.1.0';

// send back with a failure code
function sendFailure(res, code:number, msg:string) {
    res.writeHead(code, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify({error: code, message: msg})+'\n');
}
exports.sendFailure = sendFailure;

// 404
exports.send404 = function (req, res) {
    console.log('404: ' + req.url);
    sendFailure(res, 404, 'Not Found');
}
