Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (["java.io.InputStream"], "javax.sound.sampled.AudioInputStream", ["java.io.IOException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stream = null;
this.format = null;
this.frameLength = 0;
this.frameSize = 0;
this.framePos = 0;
this.markpos = 0;
this.pushBackBuffer = null;
this.pushBackLen = 0;
this.markPushBackBuffer = null;
this.markPushBackLen = 0;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled, "AudioInputStream", java.io.InputStream);
Clazz.makeConstructor (c$, 
function (stream, format, length) {
Clazz.superConstructor (this, javax.sound.sampled.AudioInputStream);
this.format = format;
this.frameLength = length;
this.frameSize = format.getFrameSize ();
if (this.frameSize == -1 || this.frameSize <= 0) {
this.frameSize = 1;
}this.stream = stream;
this.framePos = 0;
this.markpos = 0;
}, "java.io.InputStream,javax.sound.sampled.AudioFormat,~N");
Clazz.defineMethod (c$, "getFormat", 
function () {
return this.format;
});
Clazz.defineMethod (c$, "getFrameLength", 
function () {
return this.frameLength;
});
Clazz.defineMethod (c$, "read", 
function () {
if (this.frameSize != 1) {
throw  new java.io.IOException ("cannot read a single byte if frame size > 1");
}var data =  Clazz.newByteArray (1, 0);
var temp = this.read (data);
if (temp <= 0) {
return -1;
}return data[0] & 0xFF;
});
Clazz.defineMethod (c$, "read", 
function (b) {
return this.read (b, 0, b.length);
}, "~A");
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
if ((len % this.frameSize) != 0) {
len -= (len % this.frameSize);
if (len == 0) {
return 0;
}}if (this.frameLength != -1) {
if (this.framePos >= this.frameLength) {
return -1;
} else {
if ((Clazz.doubleToInt (len / this.frameSize)) > (this.frameLength - this.framePos)) {
len = (this.frameLength - this.framePos) * this.frameSize;
}}}var bytesRead = 0;
var thisOff = off;
if (this.pushBackLen > 0 && len >= this.pushBackLen) {
System.arraycopy (this.pushBackBuffer, 0, b, off, this.pushBackLen);
thisOff += this.pushBackLen;
len -= this.pushBackLen;
bytesRead += this.pushBackLen;
this.pushBackLen = 0;
}var thisBytesRead = this.stream.read (b, thisOff, len);
if (thisBytesRead == -1) {
return -1;
}if (thisBytesRead > 0) {
bytesRead += thisBytesRead;
}if (bytesRead > 0) {
this.pushBackLen = bytesRead % this.frameSize;
if (this.pushBackLen > 0) {
if (this.pushBackBuffer == null) {
this.pushBackBuffer =  Clazz.newByteArray (this.frameSize, 0);
}System.arraycopy (b, off + bytesRead - this.pushBackLen, this.pushBackBuffer, 0, this.pushBackLen);
bytesRead -= this.pushBackLen;
}this.framePos += Clazz.doubleToInt (bytesRead / this.frameSize);
}return bytesRead;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "skip", 
function (n) {
if ((n % this.frameSize) != 0) {
n -= (n % this.frameSize);
}if (this.frameLength != -1) {
if ((Clazz.doubleToInt (n / this.frameSize)) > (this.frameLength - this.framePos)) {
n = (this.frameLength - this.framePos) * this.frameSize;
}}var temp = this.stream.skip (n);
if (temp % this.frameSize != 0) {
throw  new java.io.IOException ("Could not skip an integer number of frames.");
}if (temp >= 0) {
this.framePos += Clazz.doubleToInt (temp / this.frameSize);
}return temp;
}, "~N");
Clazz.defineMethod (c$, "available", 
function () {
var temp = this.stream.available ();
if ((this.frameLength != -1) && ((Clazz.doubleToInt (temp / this.frameSize)) > (this.frameLength - this.framePos))) {
return (this.frameLength - this.framePos) * this.frameSize;
} else {
return temp;
}});
Clazz.defineMethod (c$, "close", 
function () {
this.stream.close ();
});
Clazz.defineMethod (c$, "mark", 
function (readlimit) {
this.stream.mark (readlimit);
if (this.markSupported ()) {
this.markpos = this.framePos;
this.markPushBackLen = this.pushBackLen;
if (this.markPushBackLen > 0) {
if (this.markPushBackBuffer == null) {
this.markPushBackBuffer =  Clazz.newByteArray (this.frameSize, 0);
}System.arraycopy (this.pushBackBuffer, 0, this.markPushBackBuffer, 0, this.markPushBackLen);
}}}, "~N");
Clazz.defineMethod (c$, "reset", 
function () {
this.stream.reset ();
this.framePos = this.markpos;
this.pushBackLen = this.markPushBackLen;
if (this.pushBackLen > 0) {
if (this.pushBackBuffer == null) {
this.pushBackBuffer =  Clazz.newByteArray (this.frameSize - 1, 0);
}System.arraycopy (this.markPushBackBuffer, 0, this.pushBackBuffer, 0, this.pushBackLen);
}});
Clazz.defineMethod (c$, "markSupported", 
function () {
return this.stream.markSupported ();
});
});
