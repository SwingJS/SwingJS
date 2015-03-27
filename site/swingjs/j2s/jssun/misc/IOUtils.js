Clazz.declarePackage ("jssun.misc");
Clazz.load (null, "jssun.misc.IOUtils", ["java.io.EOFException", "java.util.Arrays"], function () {
c$ = Clazz.declareType (jssun.misc, "IOUtils");
c$.readFully = Clazz.defineMethod (c$, "readFully", 
function (is, length, readAll) {
var output =  Clazz.newByteArray (-1, []);
if (length == -1) length = 2147483647;
var pos = 0;
while (pos < length) {
var bytesToRead;
if (pos >= output.length) {
bytesToRead = Math.min (length - pos, output.length + 1024);
if (output.length < pos + bytesToRead) {
output = java.util.Arrays.copyOf (output, pos + bytesToRead);
}} else {
bytesToRead = output.length - pos;
}var cc = is.read (output, pos, bytesToRead);
if (cc < 0) {
if (readAll && length != 2147483647) {
throw  new java.io.EOFException ("Detect premature EOF");
} else {
if (output.length != pos) {
output = java.util.Arrays.copyOf (output, pos);
}break;
}}pos += cc;
}
return output;
}, "java.io.InputStream,~N,~B");
});
