/*
    learning about Buffer and byte length of the utf8 string
 */

var txt:string = "傳統123";
var txtLen:number = Buffer.byteLength(txt,"utf8");

var buf = new Buffer(txtLen*10);

buf.fill(txt);
console.log("txt = " + txt + ", len= " + txt.length);

console.log("buffer length = " + buf.length);
console.log("buf = " + buf);

var str:string =  buf.toString("utf8",0, txtLen);

console.log("buf = " + str + ", len = " + str.length);