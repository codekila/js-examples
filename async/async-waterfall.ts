
var async = require("async");

/*
    async.waterfall
 */

// simplest form
async.waterfall(
    [
        // step 1
        function(callback) {
            console.log("simple step 1");
            callback(null);
        },
        // step 2
        function(callback) {
            console.log("simple step 2");
            callback(null);
        },
        // step 3
        function(callback) {
            console.log("simple step 3");
            callback(null, "OK");
        }
    ],
    function(err, results) {
        if (err)
            console.error("simple Error:" + err.message);
        else {
            console.log("simple Done." + results);
        }
    }
);

// passing parameters to the next step
(function () {
    var iterations:number = 0;
    var str:string[] = ["arg1", "arg2", "arg3"];

    async.waterfall(
        [
            // step 1
            function(callback) {
                console.log("step 1");
                callback(null, str[iterations++]);
            },
            // step 2
            function(arg, callback) {
                console.log("step 2:" + arg);
                callback(null, str[iterations++]);
            },
            // step 3
            function(arg, callback) {
                console.log("step 3:" + arg);
                callback(null, str[iterations++]);
            }
        ],
        function(err, results) {
            if (err)
                console.error("Error:" + err.message);
            else {
                console.log("Done:" + results);
                console.log(iterations + " iterations");
            }
        }
    )
})();
