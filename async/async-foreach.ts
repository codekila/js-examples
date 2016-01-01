
var async = require("async");
var util = require("util");

var arr:string[] = [
    "hello",
    "world",
    "-",
    "this",
    "is",
    "me",
    "fantastic",
    "and",
    "happy",
    "new",
    "year"
];

// async.forEach runs in parallel
var f1 = function(cb) {
    async.forEach(
        arr,
        function(element:string, callback) {
            setTimeout(function () {
                console.log("action: " + element.toUpperCase());
                callback(null);
            }, element.length*100);
        },
        function(err) {
            if (err)
                console.error("Error:" + err.message);
            else {
                console.log("Done.");
                cb(null, "R1");
            }
        }
    );
};

// async.forEachSeries runs in series
var f2 = function(cb) {
    async.forEachSeries(
        arr,
        function(element:string, callback) {
            setTimeout(function () {
                console.log("action: " + element.toUpperCase());
                callback(null);
            }, element.length*100);
        },
        function(err) {
            if (err)
                console.error("Error:" + err.message);
            else {
                console.log("Done.");
                cb(null, "R2");
            }
        }
    );
};

// making sure we run f1 first then f2.

/*
// traditional way, w/o results
f1(function() {
    f2(function () {
        console.log("All done.");
    });
});
*/

// async way, with collected results
async.series({
        func1: function (cb) {
            f1(cb);
        },
        func2: function (cb) {
            f2(cb);
        },
    },
    function(err, results) {
        if (err)
            console.error("Error:" + err.message);
        else {
            console.log("All Done: " + util.inspect(results));
        }
    }
);