var path = require("path");
var util = require("util");
var glob = require("glob");

// current path
console.log(path.resolve("."));

// the path that this js file is located at
console.log(__dirname);

// check out argv[0] & argv[1] & ...
console.log(util.inspect(process.argv));

// return all files under a dir
var pathExp = path.resolve("../../") + "/**";
glob(pathExp, {nodir: true}, function(err, files) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log(files);
    }
});
