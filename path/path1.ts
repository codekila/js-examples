var path = require("path");
var util = require("util");
var glob = require("glob");

// current path
console.log(path.resolve("."));

// the (static) path that this js file is located at
console.log(__dirname + " : " + __filename);

// check out argv[0] & argv[1] & ...
console.log(util.inspect(process.argv));

// return all files under a dir
(function(topDir:string, fileType:string) {
    var pathExp:string = path.resolve(topDir);
    console.log("Listing all files under " + pathExp + " matching " + fileType);
    glob(pathExp + "/**/" + fileType, {nodir: true}, function (err, files) {
        if (err) {
            console.log(err.message);
        }
        else {
            for (var i in files) {
                var idx:number = files[i].lastIndexOf("/");
                var fileName:string = files[i].slice(idx + 1);
                var pathName:string = files[i].slice(0, idx);
                console.log(pathName + " : " + fileName + ", ext=" + path.extname(fileName));
            }
        }
    });
})("../../", "*.ts");
