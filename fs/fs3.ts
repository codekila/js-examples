/*
    file copy using streams
 */

var async = require("async");
var fs = require("fs");

// copy 1: with .on("data")
function fileCopy1(from:string, to:string, cb) {
    var bytesWritten = 0;
    var streamRead = fs.createReadStream(from);
    var streamWrite = fs.createWriteStream(to);

    streamRead.on("error", cb);
    streamWrite.on("error", cb);

    streamRead.on("data", function(chunk) {
        console.log("writting " + chunk.length + " bytes, " + bytesWritten + " written");
        bytesWritten += chunk.length;

        streamWrite.write(chunk);
    });
    streamRead.on("close", function() {
        streamWrite.close();
        cb(null, bytesWritten);
    });
}

// copy 2: with .pipe
function fileCopy2(from:string, to:string, cb) {
    var streamRead = fs.createReadStream(from);
    var streamWrite = fs.createWriteStream(to);

    streamRead.on("error", cb);
    streamWrite.on("error", cb);

    streamRead.pipe(streamWrite);

    streamRead.on("close", function() {
        streamWrite.close();
        cb(null); // unable to provide the file size
    });
}

fileCopy2("file1.txt", "file2.txt", function(err, bytes){
    if (err) {
        console.log("error copying: " + err.message);
    }
    else {
        console.log("Copy done, " + bytes + " bytes copied.");
    }
});

