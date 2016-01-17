const process = require("process");
const util = require("util");
const readline = require("readline");
const fs = require("fs");

// onExit
process.on("exit", function(code){
    console.log("exiting the node process with code " + code);
});

// readline
var rl = readline.createInterface({
    input: fs.createReadStream(process.argv[1]),
    output: process.stdout
});

var lineNo = 0;
rl.on("line", function(line){
   console.log("Line " + ++lineNo + ": " + line);
});

rl.on("close", function(){
    console.log("------");
    console.log("Total " + lineNo + " lines");
    process.exit(0);
});

// SIGINT
rl.on("SIGINT", function() {
    console.log("SIGINT");
    rl.pause();
});
