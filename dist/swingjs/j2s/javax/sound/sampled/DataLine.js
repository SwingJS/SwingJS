Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (["javax.sound.sampled.Line", "java.lang.StringBuffer"], "javax.sound.sampled.DataLine", null, function () {
Clazz.declareInterface (javax.sound.sampled, "DataLine", javax.sound.sampled.Line);
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.formats = null;
this.minBufferSize = 0;
this.maxBufferSize = 0;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.DataLine, "Info", javax.sound.sampled.Line.Info);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, javax.sound.sampled.DataLine.Info, [a]);
if (b == null) {
this.formats =  new Array (0);
} else {
this.formats = b;
}this.minBufferSize = c;
this.maxBufferSize = d;
}, "Class,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, javax.sound.sampled.DataLine.Info, [a]);
if (b == null) {
this.formats =  new Array (0);
} else {
var d = [b];
this.formats = d;
}this.minBufferSize = c;
this.maxBufferSize = c;
}, "Class,javax.sound.sampled.AudioFormat,~N");
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a, b, -1);
}, "Class,javax.sound.sampled.AudioFormat");
Clazz.defineMethod (c$, "getFormats", 
function () {
var a =  new Array (this.formats.length);
System.arraycopy (this.formats, 0, a, 0, this.formats.length);
return a;
});
Clazz.defineMethod (c$, "isFormatSupported", 
function (a) {
for (var b = 0; b < this.formats.length; b++) {
if (a.matches (this.formats[b])) {
return true;
}}
return false;
}, "javax.sound.sampled.AudioFormat");
Clazz.defineMethod (c$, "getMinBufferSize", 
function () {
return this.minBufferSize;
});
Clazz.defineMethod (c$, "getMaxBufferSize", 
function () {
return this.maxBufferSize;
});
Clazz.defineMethod (c$, "matches", 
function (a) {
if (!(Clazz.superCall (this, javax.sound.sampled.DataLine.Info, "matches", [a]))) {
return false;
}var b = a;
if ((this.getMaxBufferSize () >= 0) && (b.getMaxBufferSize () >= 0)) {
if (this.getMaxBufferSize () > b.getMaxBufferSize ()) {
return false;
}}if ((this.getMinBufferSize () >= 0) && (b.getMinBufferSize () >= 0)) {
if (this.getMinBufferSize () < b.getMinBufferSize ()) {
return false;
}}var c = this.getFormats ();
if (c != null) {
for (var d = 0; d < c.length; d++) {
if (!(c[d] == null)) {
if (!(b.isFormatSupported (c[d]))) {
return false;
}}}
}return true;
}, "javax.sound.sampled.Line.Info");
Clazz.defineMethod (c$, "toString", 
function () {
var a =  new StringBuffer ();
if ((this.formats.length == 1) && (this.formats[0] != null)) {
a.append (" supporting format " + this.formats[0]);
} else if (this.getFormats ().length > 1) {
a.append (" supporting " + this.getFormats ().length + " audio formats");
}if ((this.minBufferSize != -1) && (this.maxBufferSize != -1)) {
a.append (", and buffers of " + this.minBufferSize + " to " + this.maxBufferSize + " bytes");
} else if ((this.minBufferSize != -1) && (this.minBufferSize > 0)) {
a.append (", and buffers of at least " + this.minBufferSize + " bytes");
} else if (this.maxBufferSize != -1) {
a.append (", and buffers of up to " + this.minBufferSize + " bytes");
}return  String.instantialize (Clazz.superCall (this, javax.sound.sampled.DataLine.Info, "toString", []) + a);
});
c$ = Clazz.p0p ();
});
