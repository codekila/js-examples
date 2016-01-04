/*
    file copy using streams
 */

var async = require("async");
var fs = require("fs");

// copy 1
function fileCopy1(from:string, to:string, cb) {
    var bytesWritten = 0;
    var streamRead = fs.createReadStream(from);
    var streamWrite = fs.createWriteStream(to);

    streamRead.on("error", callback);
    streamWrite.on("error", callback);

    streamRead.on("data", function(data) {
        bytesWritten += data.length;
        streamWrite.write(data);
    });
    streamRead.on("close", function() {
        streamWrite.close();
        cb(null, bytesWritten);
        return;
    });

    function callback(err) {
        cb(err);
        return;
    }
}

// copy 2: with pipe
function fileCopy2(from:string, to:string, cb) {
    var bytesWritten = 0;
    var streamRead = fs.createReadStream(from);
    var streamWrite = fs.createWriteStream(to);

    streamRead.on("error", callback);
    streamWrite.on("error", callback);

    streamRead.pipe(streamWrite);

    streamRead.on("close", function() {
        streamWrite.close();
        cb(null, bytesWritten);
        return;
    });

    function callback(err) {
        cb(err);
        return;
    }
}

fileCopy2("file1.txt", "file2.txt", function(err, bytes){
    if (err) {
        console.log("error copying: " + err.message);
    }
    else {
        console.log("Copy done, " + bytes + " bytes copied.");
    }
});
