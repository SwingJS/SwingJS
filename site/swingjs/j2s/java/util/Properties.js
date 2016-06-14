Clazz.declarePackage ("java.util");
Clazz.load (["java.util.Hashtable"], "java.util.Properties", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaults = null;
if (!Clazz.isClassDefined ("java.util.Properties.LineReader")) {
java.util.Properties.$Properties$LineReader$ ();
}
Clazz.instantialize (this, arguments);
}, java.util, "Properties", java.util.Hashtable);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (defaults) {
Clazz.superConstructor (this, java.util.Properties, []);
this.defaults = defaults;
}, "java.util.Properties");
Clazz.defineMethod (c$, "setProperty", 
function (key, value) {
return this.put (key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "load", 
function (reader) {
this.load0 (Clazz.innerTypeInstance (java.util.Properties.LineReader, this, null, reader));
}, "java.io.Reader");
Clazz.defineMethod (c$, "load", 
function (inStream) {
this.load0 (Clazz.innerTypeInstance (java.util.Properties.LineReader, this, null, inStream));
}, "java.io.InputStream");
Clazz.defineMethod (c$, "load0", 
 function (lr) {
var convtBuf =  Clazz.newCharArray (1024, '\0');
var limit;
var keyLen;
var valueStart;
var c;
var hasSep;
var precedingBackslash;
while ((limit = lr.readLine ()) >= 0) {
c = String.fromCharCode ( 0);
keyLen = 0;
valueStart = limit;
hasSep = false;
precedingBackslash = false;
while (keyLen < limit) {
c = lr.lineBuf[keyLen];
if ((c == '=' || c == ':') && !precedingBackslash) {
valueStart = keyLen + 1;
hasSep = true;
break;
} else if ((c == ' ' || c == '\t' || c == '\f') && !precedingBackslash) {
valueStart = keyLen + 1;
break;
}if (c == '\\') {
precedingBackslash = !precedingBackslash;
} else {
precedingBackslash = false;
}keyLen++;
}
while (valueStart < limit) {
c = lr.lineBuf[valueStart];
if (c != ' ' && c != '\t' && c != '\f') {
if (!hasSep && (c == '=' || c == ':')) {
hasSep = true;
} else {
break;
}}valueStart++;
}
var key = this.loadConvert (lr.lineBuf, 0, keyLen, convtBuf);
var value = this.loadConvert (lr.lineBuf, valueStart, limit - valueStart, convtBuf);
this.put (key, value);
}
}, "java.util.Properties.LineReader");
Clazz.defineMethod (c$, "loadConvert", 
 function ($in, off, len, convtBuf) {
if (convtBuf.length < len) {
var newLen = len * 2;
if (newLen < 0) {
newLen = 2147483647;
}convtBuf =  Clazz.newCharArray (newLen, '\0');
}var aChar;
var out = convtBuf;
var outLen = 0;
var end = off + len;
while (off < end) {
aChar = $in[off++];
if (aChar == '\\') {
aChar = $in[off++];
if (aChar == 'u') {
var value = 0;
for (var i = 0; i < 4; i++) {
aChar = $in[off++];
switch (aChar) {
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
value = (value << 4) + aChar.charCodeAt (0) - 48;
break;
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
value = (value << 4) + 10 + aChar.charCodeAt (0) - 97;
break;
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
value = (value << 4) + 10 + aChar.charCodeAt (0) - 65;
break;
default:
throw  new IllegalArgumentException ("Malformed \\uxxxx encoding.");
}
}
out[outLen++] = String.fromCharCode (value);
} else {
if (aChar == 't') aChar = '\t';
 else if (aChar == 'r') aChar = '\r';
 else if (aChar == 'n') aChar = '\n';
 else if (aChar == 'f') aChar = '\f';
out[outLen++] = aChar;
}} else {
out[outLen++] = aChar;
}}
return  String.instantialize (out, 0, outLen);
}, "~A,~N,~N,~A");
Clazz.defineMethod (c$, "getProperty", 
function (key) {
var oval = Clazz.superCall (this, java.util.Properties, "get", [key]);
var sval = (Clazz.instanceOf (oval, String)) ? oval : null;
return ((sval == null) && (this.defaults != null)) ? this.defaults.getProperty (key) : sval;
}, "~S");
Clazz.defineMethod (c$, "getProperty", 
function (key, defaultValue) {
var val = this.getProperty (key);
return (val == null) ? defaultValue : val;
}, "~S,~S");
Clazz.defineMethod (c$, "propertyNames", 
function () {
var h =  new java.util.Hashtable ();
this.enumerate (h);
return h.keys ();
});
Clazz.defineMethod (c$, "stringPropertyNames", 
function () {
var h =  new java.util.Hashtable ();
this.enumerateStringProperties (h);
return h.keySet ();
});
Clazz.defineMethod (c$, "enumerate", 
 function (h) {
if (this.defaults != null) {
this.defaults.enumerate (h);
}for (var e = this.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
h.put (key, this.get (key));
}
}, "java.util.Hashtable");
Clazz.defineMethod (c$, "enumerateStringProperties", 
 function (h) {
if (this.defaults != null) {
this.defaults.enumerateStringProperties (h);
}for (var e = this.keys (); e.hasMoreElements (); ) {
var k = e.nextElement ();
var v = this.get (k);
if (Clazz.instanceOf (k, String) && Clazz.instanceOf (v, String)) {
h.put (k, v);
}}
}, "java.util.Hashtable");
c$.$Properties$LineReader$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.inByteBuf = null;
this.inCharBuf = null;
this.lineBuf = null;
this.inLimit = 0;
this.inOff = 0;
this.inStream = null;
this.reader = null;
Clazz.instantialize (this, arguments);
}, java.util.Properties, "LineReader");
Clazz.prepareFields (c$, function () {
this.lineBuf =  Clazz.newCharArray (1024, '\0');
});
Clazz.makeConstructor (c$, 
function (a) {
this.inStream = a;
this.inByteBuf =  Clazz.newByteArray (8192, 0);
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function (a) {
this.reader = a;
this.inCharBuf =  Clazz.newCharArray (8192, '\0');
}, "java.io.Reader");
Clazz.defineMethod (c$, "readLine", 
function () {
var a = 0;
var b = String.fromCharCode (0);
var c = true;
var d = false;
var e = true;
var f = false;
var g = false;
var h = false;
while (true) {
if (this.inOff >= this.inLimit) {
this.inLimit = (this.inStream == null) ? this.reader.read (this.inCharBuf) : this.inStream.read (this.inByteBuf);
this.inOff = 0;
if (this.inLimit <= 0) {
if (a == 0 || d) {
return -1;
}return a;
}}if (this.inStream != null) {
b = String.fromCharCode (0xff & this.inByteBuf[this.inOff++]);
} else {
b = this.inCharBuf[this.inOff++];
}if (h) {
h = false;
if (b == '\n') {
continue;
}}if (c) {
if (b == ' ' || b == '\t' || b == '\f') {
continue;
}if (!f && (b == '\r' || b == '\n')) {
continue;
}c = false;
f = false;
}if (e) {
e = false;
if (b == '#' || b == '!') {
d = true;
continue;
}}if (b != '\n' && b != '\r') {
this.lineBuf[a++] = b;
if (a == this.lineBuf.length) {
var i = this.lineBuf.length * 2;
{
}var j =  Clazz.newCharArray (i, '\0');
System.arraycopy (this.lineBuf, 0, j, 0, this.lineBuf.length);
this.lineBuf = j;
}if (b == '\\') {
g = !g;
} else {
g = false;
}} else {
if (d || a == 0) {
d = false;
e = true;
c = true;
a = 0;
continue;
}if (this.inOff >= this.inLimit) {
this.inLimit = (this.inStream == null) ? this.reader.read (this.inCharBuf) : this.inStream.read (this.inByteBuf);
this.inOff = 0;
if (this.inLimit <= 0) {
return a;
}}if (g) {
a -= 1;
c = true;
f = true;
g = false;
if (b == '\r') {
h = true;
}} else {
return a;
}}}
});
c$ = Clazz.p0p ();
};
});
