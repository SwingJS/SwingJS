Clazz.declarePackage ("javajs.util");
Clazz.load (["java.io.OutputStream"], "javajs.util.OC", ["java.io.BufferedWriter", "$.ByteArrayOutputStream", "$.OutputStreamWriter", "javajs.util.Base64", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bytePoster = null;
this.fileName = null;
this.bw = null;
this.isLocalFile = false;
this.byteCount = 0;
this.isCanceled = false;
this.closed = false;
this.os = null;
this.sb = null;
this.type = null;
this.$isBase64 = false;
this.os0 = null;
this.bytes = null;
Clazz.instantialize (this, arguments);
}, javajs.util, "OC", java.io.OutputStream);
Clazz.defineMethod (c$, "setParams", 
function (bytePoster, fileName, asWriter, os) {
this.bytePoster = bytePoster;
this.fileName = fileName;
this.$isBase64 = ";base64,".equals (fileName);
if (this.$isBase64) {
fileName = null;
this.os0 = os;
os = null;
}this.os = os;
this.isLocalFile = (fileName != null && !javajs.util.OC.isRemote (fileName));
if (asWriter && !this.$isBase64 && os != null) this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (os));
return this;
}, "javajs.api.BytePoster,~S,~B,java.io.OutputStream");
Clazz.defineMethod (c$, "setBytes", 
function (b) {
this.bytes = b;
return this;
}, "~A");
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz.defineMethod (c$, "getName", 
function () {
return (this.fileName == null ? null : this.fileName.substring (this.fileName.lastIndexOf ("/") + 1));
});
Clazz.defineMethod (c$, "getByteCount", 
function () {
return this.byteCount;
});
Clazz.defineMethod (c$, "setType", 
function (type) {
this.type = type;
}, "~S");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "append", 
function (s) {
try {
if (this.bw != null) {
this.bw.write (s);
} else if (this.os == null) {
if (this.sb == null) this.sb =  new javajs.util.SB ();
this.sb.append (s);
} else {
var b = s.getBytes ();
this.os.write (b, 0, b.length);
this.byteCount += b.length;
return this;
}} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += s.length;
return this;
}, "~S");
Clazz.defineMethod (c$, "reset", 
function () {
this.sb = null;
this.initOS ();
});
Clazz.defineMethod (c$, "initOS", 
($fz = function () {
if (this.sb != null) {
var s = this.sb.toString ();
this.reset ();
this.append (s);
return;
}try {
{
this.os = null;
}if (this.os == null) this.os =  new java.io.ByteArrayOutputStream ();
if (this.bw != null) {
this.bw.close ();
this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (this.os));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
this.byteCount = 0;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "write", 
function (buf, i, len) {
if (this.os == null) this.initOS ();
try {
this.os.write (buf, i, len);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += len;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
if (this.os == null) this.initOS ();
{
this.os.writeByteAsInt(b);
}this.byteCount++;
}, "~N");
Clazz.defineMethod (c$, "cancel", 
function () {
this.isCanceled = true;
this.closeChannel ();
});
Clazz.defineMethod (c$, "closeChannel", 
function () {
if (this.closed) return null;
try {
if (this.bw != null) {
this.bw.flush ();
this.bw.close ();
} else if (this.os != null) {
this.os.flush ();
this.os.close ();
}if (this.os0 != null && this.isCanceled) {
this.os0.flush ();
this.os0.close ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.isCanceled) {
this.closed = true;
return null;
}if (this.fileName == null) {
if (this.$isBase64) {
var s = this.getBase64 ();
if (this.os0 != null) {
this.os = this.os0;
this.append (s);
}this.sb =  new javajs.util.SB ();
this.sb.append (s);
this.$isBase64 = false;
return this.closeChannel ();
}return (this.sb == null ? null : this.sb.toString ());
}this.closed = true;
{
var data = (this.sb == null ? this.toByteArray() :
this.sb.toString()); if (typeof this.fileName == "function") {
this.fileName(data); } else { Jmol._doAjax(this.fileName,
null, data); }
}return null;
});
Clazz.defineMethod (c$, "isBase64", 
function () {
return this.$isBase64;
});
Clazz.defineMethod (c$, "getBase64", 
function () {
return javajs.util.Base64.getBase64 (this.toByteArray ()).toString ();
});
Clazz.defineMethod (c$, "toByteArray", 
function () {
return (this.bytes != null ? this.bytes : Clazz.instanceOf (this.os, java.io.ByteArrayOutputStream) ? (this.os).toByteArray () : null);
});
Clazz.defineMethod (c$, "close", 
function () {
this.closeChannel ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.bw != null) try {
this.bw.flush ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.sb != null) return this.closeChannel ();
return this.byteCount + " bytes";
});
Clazz.defineMethod (c$, "postByteArray", 
($fz = function () {
var bytes = (this.sb == null ? this.toByteArray () : this.sb.toString ().getBytes ());
return this.bytePoster.postByteArray (this.fileName, bytes);
}, $fz.isPrivate = true, $fz));
c$.isRemote = Clazz.defineMethod (c$, "isRemote", 
function (fileName) {
if (fileName == null) return false;
var itype = javajs.util.OC.urlTypeIndex (fileName);
return (itype >= 0 && itype != 4);
}, "~S");
c$.isLocal = Clazz.defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = javajs.util.OC.urlTypeIndex (fileName);
return (itype < 0 || itype == 4);
}, "~S");
c$.urlTypeIndex = Clazz.defineMethod (c$, "urlTypeIndex", 
function (name) {
if (name == null) return -2;
for (var i = 0; i < javajs.util.OC.urlPrefixes.length; ++i) {
if (name.startsWith (javajs.util.OC.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
Clazz.defineStatics (c$,
"urlPrefixes",  Clazz.newArray (-1, ["http:", "https:", "sftp:", "ftp:", "file:"]),
"URL_LOCAL", 4);
});
