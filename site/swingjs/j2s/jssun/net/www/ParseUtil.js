Clazz.declarePackage ("jssun.net.www");
Clazz.load (null, "jssun.net.www.ParseUtil", ["java.io.File", "java.lang.Character", "java.net.URL", "java.util.BitSet"], function () {
c$ = Clazz.declareType (jssun.net.www, "ParseUtil");
c$.encodePath = Clazz.defineMethod (c$, "encodePath", 
function (path) {
return jssun.net.www.ParseUtil.encodePath (path, true);
}, "~S");
c$.encodePath = Clazz.defineMethod (c$, "encodePath", 
function (path, flag) {
var retCC =  Clazz.newCharArray (path.length * 2 + 16, '\0');
var retLen = 0;
var pathCC = path.toCharArray ();
var n = path.length;
for (var i = 0; i < n; i++) {
var c = pathCC[i];
if ((!flag && c == '/') || (flag && c == java.io.File.separatorChar)) retCC[retLen++] = '/';
 else {
if (c.charCodeAt (0) <= 0x007F) {
if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9') {
retCC[retLen++] = c;
} else if (jssun.net.www.ParseUtil.encodedInPath.get (c.charCodeAt (0))) retLen = jssun.net.www.ParseUtil.escape (retCC, c, retLen);
 else retCC[retLen++] = c;
} else if (c.charCodeAt (0) > 0x07FF) {
retLen = jssun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0xE0 | ((c.charCodeAt (0) >> 12) & 0x0F)), retLen);
retLen = jssun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 6) & 0x3F)), retLen);
retLen = jssun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 0) & 0x3F)), retLen);
} else {
retLen = jssun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0xC0 | ((c.charCodeAt (0) >> 6) & 0x1F)), retLen);
retLen = jssun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 0) & 0x3F)), retLen);
}}if (retLen + 9 > retCC.length) {
var newLen = retCC.length * 2 + 16;
if (newLen < 0) {
newLen = 2147483647;
}var buf =  Clazz.newCharArray (newLen, '\0');
System.arraycopy (retCC, 0, buf, 0, retLen);
retCC = buf;
}}
return  String.instantialize (retCC, 0, retLen);
}, "~S,~B");
c$.escape = Clazz.defineMethod (c$, "escape", 
 function (cc, c, index) {
cc[index++] = '%';
cc[index++] = Character.forDigit ((c.charCodeAt (0) >> 4) & 0xF, 16);
cc[index++] = Character.forDigit (c.charCodeAt (0) & 0xF, 16);
return index;
}, "~A,~S,~N");
c$.fileToEncodedURL = Clazz.defineMethod (c$, "fileToEncodedURL", 
function (file) {
var path = file.getAbsolutePath ();
path = jssun.net.www.ParseUtil.encodePath (path);
if (!path.startsWith ("/")) {
path = "/" + path;
}if (!path.endsWith ("/") && file.isDirectory ()) {
path = path + "/";
}return  new java.net.URL ("file", "", path);
}, "java.io.File");
Clazz.defineStatics (c$,
"encodedInPath", null);
{
jssun.net.www.ParseUtil.encodedInPath =  new java.util.BitSet (256);
jssun.net.www.ParseUtil.encodedInPath.set (61);
jssun.net.www.ParseUtil.encodedInPath.set (59);
jssun.net.www.ParseUtil.encodedInPath.set (63);
jssun.net.www.ParseUtil.encodedInPath.set (47);
jssun.net.www.ParseUtil.encodedInPath.set (35);
jssun.net.www.ParseUtil.encodedInPath.set (32);
jssun.net.www.ParseUtil.encodedInPath.set (60);
jssun.net.www.ParseUtil.encodedInPath.set (62);
jssun.net.www.ParseUtil.encodedInPath.set (37);
jssun.net.www.ParseUtil.encodedInPath.set (34);
jssun.net.www.ParseUtil.encodedInPath.set (123);
jssun.net.www.ParseUtil.encodedInPath.set (125);
jssun.net.www.ParseUtil.encodedInPath.set (124);
jssun.net.www.ParseUtil.encodedInPath.set (92);
jssun.net.www.ParseUtil.encodedInPath.set (94);
jssun.net.www.ParseUtil.encodedInPath.set (91);
jssun.net.www.ParseUtil.encodedInPath.set (93);
jssun.net.www.ParseUtil.encodedInPath.set (96);
for (var i = 0; i < 32; i++) jssun.net.www.ParseUtil.encodedInPath.set (i);

jssun.net.www.ParseUtil.encodedInPath.set (127);
}});
