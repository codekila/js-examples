/*
    file copy using

    fs.readFile & fs.writeFile
 */

var async = require("async");
var fs = require("fs");

(function (from:string, to:string, cb) {
    async.auto({
        fRead: function(callback) {
            fs.readFile(from, function (err, data) {
                if (err) {
                    cb(err);
                }
                else {
                    callback(null, data);
                }
            });
        },
        fWrite: ["fRead", function(callback, results){
            fs.writeFile(to, results.fRead, function (err) {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, results.fRead.length);
                }
            });
        }]
    });
})("file1.txt", "file2.txt", function(err, bytes){
    if (err) {
        console.log("error copying: " + err.message);
    }
    else {
        console.log("Copy done, " + bytes + " bytes copied.");
    }
});
