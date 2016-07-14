Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (null, "javax.sound.sampled.AudioFormat", ["java.util.Collections", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.encoding = null;
this.sampleRate = 0;
this.sampleSizeInBits = 0;
this.channels = 0;
this.frameSize = 0;
this.frameRate = 0;
this.bigEndian = false;
this.$properties = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled, "AudioFormat");
Clazz.makeConstructor (c$, 
function (encoding, sampleRate, sampleSizeInBits, channels, frameSize, frameRate, bigEndian) {
this.encoding = encoding;
this.sampleRate = sampleRate;
this.sampleSizeInBits = sampleSizeInBits;
this.channels = channels;
this.frameSize = frameSize;
this.frameRate = frameRate;
this.bigEndian = bigEndian;
this.$properties = null;
}, "javax.sound.sampled.AudioFormat.Encoding,~N,~N,~N,~N,~N,~B");
Clazz.makeConstructor (c$, 
function (encoding, sampleRate, sampleSizeInBits, channels, frameSize, frameRate, bigEndian, properties) {
this.construct (encoding, sampleRate, sampleSizeInBits, channels, frameSize, frameRate, bigEndian);
this.$properties =  new java.util.HashMap (properties);
}, "javax.sound.sampled.AudioFormat.Encoding,~N,~N,~N,~N,~N,~B,java.util.Map");
Clazz.makeConstructor (c$, 
function (sampleRate, sampleSizeInBits, channels, signed, bigEndian) {
this.construct ((signed == true ? javax.sound.sampled.AudioFormat.Encoding.PCM_SIGNED : javax.sound.sampled.AudioFormat.Encoding.PCM_UNSIGNED), sampleRate, sampleSizeInBits, channels, (channels == -1 || sampleSizeInBits == -1) ? -1 : (Clazz.doubleToInt ((sampleSizeInBits + 7) / 8)) * channels, sampleRate, bigEndian);
}, "~N,~N,~N,~B,~B");
Clazz.defineMethod (c$, "getEncoding", 
function () {
return this.encoding;
});
Clazz.defineMethod (c$, "getSampleRate", 
function () {
return this.sampleRate;
});
Clazz.defineMethod (c$, "getSampleSizeInBits", 
function () {
return this.sampleSizeInBits;
});
Clazz.defineMethod (c$, "getChannels", 
function () {
return this.channels;
});
Clazz.defineMethod (c$, "getFrameSize", 
function () {
return this.frameSize;
});
Clazz.defineMethod (c$, "getFrameRate", 
function () {
return this.frameRate;
});
Clazz.defineMethod (c$, "isBigEndian", 
function () {
return this.bigEndian;
});
Clazz.defineMethod (c$, "properties", 
function () {
var ret;
if (this.$properties == null) {
ret =  new java.util.HashMap (0);
} else {
ret = (this.$properties.clone ());
}return java.util.Collections.unmodifiableMap (ret);
});
Clazz.defineMethod (c$, "getProperty", 
function (key) {
if (this.$properties == null) {
return null;
}return this.$properties.get (key);
}, "~S");
Clazz.defineMethod (c$, "matches", 
function (format) {
if (format.getEncoding ().equals (this.getEncoding ()) && (format.getChannels () == -1 || format.getChannels () == this.getChannels ()) && (format.getSampleRate () == -1 || format.getSampleRate () == this.getSampleRate ()) && (format.getSampleSizeInBits () == -1 || format.getSampleSizeInBits () == this.getSampleSizeInBits ()) && (format.getFrameRate () == -1 || format.getFrameRate () == this.getFrameRate ()) && (format.getFrameSize () == -1 || format.getFrameSize () == this.getFrameSize ()) && (this.getSampleSizeInBits () <= 8 || format.isBigEndian () == this.isBigEndian ())) {
return true;
}return false;
}, "javax.sound.sampled.AudioFormat");
Clazz.defineMethod (c$, "toString", 
function () {
var sEncoding = "";
if (this.getEncoding () != null) {
sEncoding = this.getEncoding ().toString () + " ";
}var sSampleRate;
if (this.getSampleRate () == -1) {
sSampleRate = "unknown sample rate, ";
} else {
sSampleRate = "" + this.getSampleRate () + " Hz, ";
}var sSampleSizeInBits;
if (this.getSampleSizeInBits () == -1) {
sSampleSizeInBits = "unknown bits per sample, ";
} else {
sSampleSizeInBits = "" + this.getSampleSizeInBits () + " bit, ";
}var sChannels;
if (this.getChannels () == 1) {
sChannels = "mono, ";
} else if (this.getChannels () == 2) {
sChannels = "stereo, ";
} else {
if (this.getChannels () == -1) {
sChannels = " unknown number of channels, ";
} else {
sChannels = "" + this.getChannels () + " channels, ";
}}var sFrameSize;
if (this.getFrameSize () == -1) {
sFrameSize = "unknown frame size, ";
} else {
sFrameSize = "" + this.getFrameSize () + " bytes/frame, ";
}var sFrameRate = "";
if (Math.abs (this.getSampleRate () - this.getFrameRate ()) > 0.00001) {
if (this.getFrameRate () == -1) {
sFrameRate = "unknown frame rate, ";
} else {
sFrameRate = this.getFrameRate () + " frames/second, ";
}}var sEndian = "";
if ((this.getEncoding ().equals (javax.sound.sampled.AudioFormat.Encoding.PCM_SIGNED) || this.getEncoding ().equals (javax.sound.sampled.AudioFormat.Encoding.PCM_UNSIGNED)) && ((this.getSampleSizeInBits () > 8) || (this.getSampleSizeInBits () == -1))) {
if (this.isBigEndian ()) {
sEndian = "big-endian";
} else {
sEndian = "little-endian";
}}return sEncoding + sSampleRate + sSampleSizeInBits + sChannels + sFrameSize + sFrameRate + sEndian;
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.AudioFormat, "Encoding");
Clazz.makeConstructor (c$, 
function (a) {
this.name = a;
}, "~S");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (this.toString () == null) {
return (a != null) && (a.toString () == null);
}if (Clazz.instanceOf (a, javax.sound.sampled.AudioFormat.Encoding)) {
return this.toString ().equals (a.toString ());
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.toString () == null) {
return 0;
}return this.toString ().hashCode ();
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.name;
});
c$.PCM_SIGNED = c$.prototype.PCM_SIGNED =  new javax.sound.sampled.AudioFormat.Encoding ("PCM_SIGNED");
c$.PCM_UNSIGNED = c$.prototype.PCM_UNSIGNED =  new javax.sound.sampled.AudioFormat.Encoding ("PCM_UNSIGNED");
c$.PCM_FLOAT = c$.prototype.PCM_FLOAT =  new javax.sound.sampled.AudioFormat.Encoding ("PCM_FLOAT");
c$.ULAW = c$.prototype.ULAW =  new javax.sound.sampled.AudioFormat.Encoding ("ULAW");
c$.ALAW = c$.prototype.ALAW =  new javax.sound.sampled.AudioFormat.Encoding ("ALAW");
c$ = Clazz.p0p ();
});
