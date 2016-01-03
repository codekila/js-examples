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
    var fdFrom, fdTo;

    async.auto({
            // open from for read
            openFrom: function (callback) {
                console.log("opening "+from);
                fs.open(from, 'r', function(err, f){
                    if (err) {
                        callback(err);
                    }
                    else {
                        fdFrom = f;
                        callback(null, fdFrom);
                    }
                });
            },
            // open to for write
            openTo: function (callback) {
                console.log("opening "+to);
                fs.open(to, 'w', function(err, f){
                    if (err) {
                        callback(err);
                    }
                    else {
                        fdTo = f;
                        callback(null, fdTo);
                    }
                });
            },
            copy: ["openFrom", "openTo", function (callback) {
                fs.fstat(fdFrom, function(err, stat){
                    if (!stat.isFile()) {
                        callback(new Error("Not a file"));
                    } else {
                        console.log("start copying " + stat.size + " bytes");
                        var buf = Buffer(stat.size); // bad for large files

                        fs.read(fdFrom, buf, 0, stat.size, null, function (err, bytesRead, b){
                            console.log(bytesRead + " bytes read.");
                            if (err) {
                                callback(err);
                            }
                            else {
                                // write into the new file
                                console.log("start writing...");
                                fs.write(fdTo, buf, 0, bytesRead, function (err, bytesWritten, b) {
                                    console.log(bytesWritten + " bytes written.");
                                    if (err) {
                                        callback(err);
                                    }
                                    else {
                                        callback(null, bytesWritten);
                                    }
                                });
                            }
                        });
                    }
                });
            }]
        },
        function (err, results) {
            if (err) {
                console.error("Error:" + err.message);
            }
            // close both
            else if (fdFrom) {
                fs.close(fdFrom, function(err) {
                    if (err)
                        cb(err);
                    else if (fdTo) {
                        fs.close(fdTo, function (err) {
                            if (err)
                                cb(err);
                            else {
                                console.log("Done." + util.inspect(results));
                                cb(null, results.copy);
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
