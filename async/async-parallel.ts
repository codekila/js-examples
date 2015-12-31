
var async = require("async");

// simplest form
async.parallel([
        function(callback) {
            console.log("action 1");
            callback(null, "R1");
        },
        function(callback) {
            console.log("action 2");
            callback(null, "R2");
        },
        function(callback) {
            console.log("action 3");
            callback(null, "R3");
        }
    ],
    function(err, results) {
        if (err)
            console.error("Error:" + err.message);
        else {
            console.log("Done:" + results);
        }
    }
);

// example with a timer
(function(tmo1:number, tmo2:number, tmo3:number) {
    async.parallel([
        function(callback) {
            setTimeout(function() {
                console.log("action 1 done.");
                callback(null, "R1");
            }, tmo1);
        },
        function(callback) {
            setTimeout(function() {
                console.log("action 2 done.");
                callback(null, "R2");
            }, tmo2);
        },
        function(callback) {
            setTimeout(function() {
                console.log("action 3 done.");
                callback(null, "R3");
            }, tmo3);
        }
        ],
        function(err, results) {
            if (err)
                console.error("Error:" + err.message);
            else {
                // order of results is not affected by time of completion
                console.log("All done:" + results);
            }
        }
    );
})(500, 200, 300);
