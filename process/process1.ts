var process = require("process");
var util = require("util");
const readline = require("readline");

console.log("ENV = " + util.inspect(process.env));
console.log("argv =" + util.inspect(process.argv));
console.log("config =" + util.inspect(process.config));

// onExit
process.on("exit", function(code){
    console.log("exiting the node process with code " + code);
});

// SIGINT
process.on("SIGINT", function() {
    console.log("SIGINT");
});

// readline
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's your favorite?", function(ans) {
    console.log("You answered " + ans);

    rl.close();
});
