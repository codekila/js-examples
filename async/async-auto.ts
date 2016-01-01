var async = require("async");
var util = require("util");

// simplest form
async.auto({
        // step1 & step2 will be executed in parallel
        step1: function(callback) {
            console.log("action 1");
            callback(null, "R1");
        },
        step2: function(callback) {
            console.log("action 2");
            callback(null, "R2");
        },
        // step3 will not be executed until step1 & step2 are done
        step3: ["step1", "step2", function(callback) {
            console.log("action 3");
            callback(null, "R3");
        }],
        // step4 will be executed only when step3 is done
        step4: ["step3", function(callback) {
            console.log("action 4");
            callback(null, "R4");
        }],
    },
    function(err, results) {
        if (err)
            console.error("Error:" + err.message);
        else {
            // the result array is in the order of completion
            console.log("Done:" + util.inspect(results));
        }
    }
);

// example with a timer
(function(tmo1:number, tmo2:number, tmo3:number, tmo4:number) {
    async.auto({
            // step1 & step2 will be executed in parallel
            step1: function(callback) {
                setTimeout(function() {
                    console.log("action 1 done.");
                    callback(null, "R1");
                }, tmo1);
            },
            step2: function(callback) {
                setTimeout(function() {
                    console.log("action 2 done.");
                    callback(null, "R2");
                }, tmo2);
            },
            // step3 will not be executed until step1 & step2 are done
            step3: ["step1", "step2", function(callback) {
                setTimeout(function() {
                    console.log("action 3 done.");
                    callback(null, "R3");
                }, tmo3);
            }],
            // step4 will be executed only when step3 is done
            step4: ["step3", function(callback) {
                setTimeout(function() {
                    console.log("action 4 done.");
                    callback(null, "R4");
                }, tmo4);
            }],
        },
        function(err, results) {
            if (err)
                console.error("Error:" + err.message);
            else {
                // the result array is in the order of completion
                console.log("Done:" + util.inspect(results));
            }
        }
    );
})(1000, 500, 300, 100);

