Clazz.declarePackage ("swingjs");
Clazz.load (["javax.sound.sampled.SourceDataLine"], "swingjs.JSAudioLine", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.info = null;
this.bOpen = false;
this.ctx = null;
this.audioBuffer = null;
this.startTime = 0;
Clazz.instantialize (this, arguments);
}, swingjs, "JSAudioLine", null, javax.sound.sampled.SourceDataLine);
Clazz.makeConstructor (c$, 
function (info) {
this.info = info;
}, "javax.sound.sampled.Line.Info");
Clazz.defineMethod (c$, "open", 
function () {
this.open (null, -1);
});
Clazz.defineMethod (c$, "open", 
function (format) {
this.open (format, -1);
}, "javax.sound.sampled.AudioFormat");
Clazz.defineMethod (c$, "open", 
function (format, bufferSizeBytes) {
{
window.AudioContext = window.AudioContext || window.webkitAudioContext;
this.ctx = new AudioContext();
}if (format != null && bufferSizeBytes != -1) {
this.info.getFormats ()[0] = format;
var nFrames = Clazz.doubleToInt (bufferSizeBytes / (Clazz.doubleToInt (format.getSampleSizeInBits () / 8) * format.getChannels ()));
this.audioBuffer = this.ctx.createBuffer (format.getChannels (), nFrames, Clazz.floatToInt (format.getSampleRate ()));
}this.startTime = 0;
this.bOpen = true;
}, "javax.sound.sampled.AudioFormat,~N");
Clazz.overrideMethod (c$, "getLineInfo", 
function () {
return this.info;
});
Clazz.overrideMethod (c$, "isOpen", 
function () {
return this.bOpen;
});
Clazz.overrideMethod (c$, "close", 
function () {
{
if (this.ctx)
this.ctx.close();
this.ctx = null;
}this.bOpen = false;
});
Clazz.overrideMethod (c$, "start", 
function () {
});
Clazz.overrideMethod (c$, "stop", 
function () {
});
Clazz.overrideMethod (c$, "drain", 
function () {
});
Clazz.overrideMethod (c$, "flush", 
function () {
this.startTime = 0;
});
Clazz.overrideMethod (c$, "isRunning", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isActive", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getFormat", 
function () {
return this.info.getFormats ()[0];
});
Clazz.overrideMethod (c$, "getBufferSize", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "available", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getFramePosition", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getLongFramePosition", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getMicrosecondPosition", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getLevel", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getControls", 
function () {
return null;
});
Clazz.overrideMethod (c$, "isControlSupported", 
function (control) {
return false;
}, "javax.sound.sampled.Control.Type");
Clazz.overrideMethod (c$, "getControl", 
function (control) {
return null;
}, "javax.sound.sampled.Control.Type");
Clazz.overrideMethod (c$, "addLineListener", 
function (listener) {
}, "javax.sound.sampled.LineListener");
Clazz.overrideMethod (c$, "removeLineListener", 
function (listener) {
}, "javax.sound.sampled.LineListener");
Clazz.overrideMethod (c$, "write", 
function (b, off, len) {
var data = null;
var ab = this.audioBuffer;
{
data = ab.getChannelData(0);
}var af = this.getFormat ();
var bytesPerSample = Clazz.doubleToInt (af.getSampleSizeInBits () / 8);
var isBig = af.isBigEndian ();
for (var i = 0, pt = 0; i < len; i++, pt++) {
switch (bytesPerSample) {
case 1:
data[pt] = b[i] / 128;
break;
case 2:
var bi1 = b[i];
var bi2 = b[++i];
data[pt] = (isBig ? bi1 * 256 + bi2 + (bi2 < 0 ? 256 : 0) : bi2 * 256 + bi1 + (bi1 < 0 ? 256 : 0)) * 1 / 0x10000;
}
}
{
var source = this.ctx.createBufferSource();
if (this.starTime == 0)
this.ctx.currentTime = 0;
if (this.startTime < this.ctx.currentTime)
this.startTime = this.ctx.currentTime;
source.buffer = ab;
source.connect(this.ctx.destination);
source.start(this.startTime);
this.startTime += ab.duration;
}return len;
}, "~A,~N,~N");
});
