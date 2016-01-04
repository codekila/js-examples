/*

    file copy in the most old-school and lousy way:

    fs.open from, to
    fs.read from
    fs.write to
    fs.close from, to

 */

var async = require("async");
var fs = require("fs");
var util = require("util");

function copyFile(from:string, to:string, cb) {
    var buf:Buffer;

    async.auto({
            // open from for read
            openFrom: function (callback) {
                console.log("opening "+from);
                fs.open(from, 'r', function(err, f){
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, f);
                    }
                });
            },
            // open to for write
            openTo: function (callback) {
                console.log("opening " + to);
                fs.open(to, 'w', function(err, f){
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, f);
                    }
                });
            },
            copyRead: ["openFrom", "openTo", function (callback, results) {
                fs.fstat(results.openFrom, function (err, stat) {
                    if (!stat.isFile()) {
                        callback(new Error("Not a file"));
                    } else {
                        console.log("start copying " + stat.size + " bytes");
                        buf = Buffer(stat.size); // bad for large files

                        fs.read(results.openFrom, buf, 0, stat.size, null, function (err, bytesRead, b) {
                            console.log(bytesRead + " bytes read.");
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(null, bytesRead);
                            }
                        });
                    }
                })
            }],
            copyWrite: ["copyRead", function(callback, results) {
                // write into the new file
                console.log("start writing " + results.copyRead + " bytes");
                fs.write(results.openTo, buf, 0, results.copyRead, function (err, bytesWritten, b) {
                    console.log(bytesWritten + " bytes written.");
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, bytesWritten);
                    }
                });
            }]
        },
        function (err, results) {
            if (err) {
                console.error("Error:" + err.message);
            }
            // close both
            else if (results.openFrom) {
                fs.close(results.openFrom, function(err) {
                    if (err)
                        cb(err);
                    else if (results.openTo) {
                        fs.close(results.openTo, function (err) {
                            if (err)
                                cb(err);
                            else {
                                console.log("Done." + util.inspect(results));
                                cb(null, results.copyWrite);
                            }
                        });
                    }
                });
            }
        }
    );
}

copyFile("file1.txt", "file2.txt", function(err, bytes){
    if (!err) {
        console.log("Copy done, " + bytes + " bytes copied.");
    }
});
