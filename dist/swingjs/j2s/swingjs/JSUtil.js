Clazz.declarePackage ("swingjs");
c$ = Clazz.declareType (swingjs, "JSUtil");
c$.split = Clazz.defineMethod (c$, "split", 
function (text, run) {
if (text.length == 0) return  new Array (0);
var n = 1;
var i = text.indexOf (run);
var lines;
var runLen = run.length;
if (i < 0 || runLen == 0) {
lines =  new Array (1);
lines[0] = text;
return lines;
}var len = text.length - runLen;
for (; i >= 0 && i < len; n++) i = text.indexOf (run, i + runLen);

lines =  new Array (n);
i = 0;
var ipt = 0;
var pt = 0;
for (; (ipt = text.indexOf (run, i)) >= 0 && pt + 1 < n; ) {
lines[pt++] = text.substring (i, ipt);
i = ipt + runLen;
}
if (text.indexOf (run, len) != len) len += runLen;
lines[pt] = text.substring (i, len);
return lines;
}, "~S,~S");
