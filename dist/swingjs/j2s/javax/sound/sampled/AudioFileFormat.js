Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (null, "javax.sound.sampled.AudioFileFormat", ["java.lang.StringBuffer", "java.util.Collections", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.byteLength = 0;
this.format = null;
this.frameLength = 0;
this.$properties = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled, "AudioFileFormat");
Clazz.makeConstructor (c$, 
function (type, byteLength, format, frameLength) {
this.type = type;
this.byteLength = byteLength;
this.format = format;
this.frameLength = frameLength;
this.$properties = null;
}, "javax.sound.sampled.AudioFileFormat.Type,~N,javax.sound.sampled.AudioFormat,~N");
Clazz.makeConstructor (c$, 
function (type, format, frameLength) {
this.construct (type, -1, format, frameLength);
}, "javax.sound.sampled.AudioFileFormat.Type,javax.sound.sampled.AudioFormat,~N");
Clazz.makeConstructor (c$, 
function (type, format, frameLength, properties) {
this.construct (type, -1, format, frameLength);
this.$properties =  new java.util.HashMap (properties);
}, "javax.sound.sampled.AudioFileFormat.Type,javax.sound.sampled.AudioFormat,~N,java.util.Map");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getByteLength", 
function () {
return this.byteLength;
});
Clazz.defineMethod (c$, "getFormat", 
function () {
return this.format;
});
Clazz.defineMethod (c$, "getFrameLength", 
function () {
return this.frameLength;
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
Clazz.defineMethod (c$, "toString", 
function () {
var buf =  new StringBuffer ();
if (this.type != null) {
buf.append (this.type.toString () + " (." + this.type.getExtension () + ") file");
} else {
buf.append ("unknown file format");
}if (this.byteLength != -1) {
buf.append (", byte length: " + this.byteLength);
}buf.append (", data format: " + this.format);
if (this.frameLength != -1) {
buf.append (", frame length: " + this.frameLength);
}return  String.instantialize (buf);
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.extension = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.AudioFileFormat, "Type");
Clazz.makeConstructor (c$, 
function (a, b) {
this.name = a;
this.extension = b;
}, "~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (this.toString () == null) {
return (a != null) && (a.toString () == null);
}if (Clazz.instanceOf (a, javax.sound.sampled.AudioFileFormat.Type)) {
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
Clazz.defineMethod (c$, "getExtension", 
function () {
return this.extension;
});
c$.WAVE = c$.prototype.WAVE =  new javax.sound.sampled.AudioFileFormat.Type ("WAVE", "wav");
c$.AU = c$.prototype.AU =  new javax.sound.sampled.AudioFileFormat.Type ("AU", "au");
c$.AIFF = c$.prototype.AIFF =  new javax.sound.sampled.AudioFileFormat.Type ("AIFF", "aif");
c$.AIFC = c$.prototype.AIFC =  new javax.sound.sampled.AudioFileFormat.Type ("AIFF-C", "aifc");
c$.SND = c$.prototype.SND =  new javax.sound.sampled.AudioFileFormat.Type ("SND", "snd");
c$ = Clazz.p0p ();
});
