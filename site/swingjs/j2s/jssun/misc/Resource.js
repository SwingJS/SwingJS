Clazz.declarePackage ("jssun.misc");
Clazz.load (null, "jssun.misc.Resource", ["java.io.EOFException", "java.lang.Thread", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cis = null;
Clazz.instantialize (this, arguments);
}, jssun.misc, "Resource");
Clazz.defineMethod (c$, "cachedInputStream", 
($fz = function () {
if (this.cis == null) {
this.cis = this.getInputStream ();
}return this.cis;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getBytes", 
function () {
var b;
var $in = this.cachedInputStream ();
var isInterrupted = Thread.interrupted ();
var len;
for (; ; ) {
try {
len = this.getContentLength ();
break;
} catch (iioe) {
if (Clazz.exceptionOf (iioe, java.io.InterruptedIOException)) {
Thread.interrupted ();
isInterrupted = true;
} else {
throw iioe;
}
}
}
try {
b =  Clazz.newByteArray (0, 0);
if (len == -1) len = 2147483647;
var pos = 0;
while (pos < len) {
var bytesToRead;
if (pos >= b.length) {
bytesToRead = Math.min (len - pos, b.length + 1024);
if (b.length < pos + bytesToRead) {
b = java.util.Arrays.copyOf (b, pos + bytesToRead);
}} else {
bytesToRead = b.length - pos;
}var cc = 0;
try {
cc = $in.read (b, pos, bytesToRead);
} catch (iioe) {
if (Clazz.exceptionOf (iioe, java.io.InterruptedIOException)) {
Thread.interrupted ();
isInterrupted = true;
} else {
throw iioe;
}
}
if (cc < 0) {
if (len != 2147483647) {
throw  new java.io.EOFException ("Detect premature EOF");
} else {
if (b.length != pos) {
b = java.util.Arrays.copyOf (b, pos);
}break;
}}pos += cc;
}
} finally {
try {
$in.close ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.InterruptedIOException)) {
var iioe = e$$;
{
isInterrupted = true;
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var ignore = e$$;
{
}
} else {
throw e$$;
}
}
if (isInterrupted) {
Thread.currentThread ().interrupt ();
}}
return b;
});
});
