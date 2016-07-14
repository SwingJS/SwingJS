Clazz.declarePackage ("sun.net.www");
Clazz.load (null, "sun.net.www.ParseUtil", ["java.io.File", "java.lang.Character", "java.net.URL", "java.util.BitSet"], function () {
c$ = Clazz.declareType (sun.net.www, "ParseUtil");
c$.encodePath = Clazz.defineMethod (c$, "encodePath", 
function (path) {
return sun.net.www.ParseUtil.encodePath (path, true);
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
} else if (sun.net.www.ParseUtil.encodedInPath.get (c.charCodeAt (0))) retLen = sun.net.www.ParseUtil.escape (retCC, c, retLen);
 else retCC[retLen++] = c;
} else if (c.charCodeAt (0) > 0x07FF) {
retLen = sun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0xE0 | ((c.charCodeAt (0) >> 12) & 0x0F)), retLen);
retLen = sun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 6) & 0x3F)), retLen);
retLen = sun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 0) & 0x3F)), retLen);
} else {
retLen = sun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0xC0 | ((c.charCodeAt (0) >> 6) & 0x1F)), retLen);
retLen = sun.net.www.ParseUtil.escape (retCC, String.fromCharCode (0x80 | ((c.charCodeAt (0) >> 0) & 0x3F)), retLen);
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
path = sun.net.www.ParseUtil.encodePath (path);
if (!path.startsWith ("/")) {
path = "/" + path;
}if (!path.endsWith ("/") && file.isDirectory ()) {
path = path + "/";
}return  new java.net.URL ("file", "", path);
}, "java.io.File");
Clazz.defineStatics (c$,
"encodedInPath", null);
{
sun.net.www.ParseUtil.encodedInPath =  new java.util.BitSet (256);
sun.net.www.ParseUtil.encodedInPath.set (61);
sun.net.www.ParseUtil.encodedInPath.set (59);
sun.net.www.ParseUtil.encodedInPath.set (63);
sun.net.www.ParseUtil.encodedInPath.set (47);
sun.net.www.ParseUtil.encodedInPath.set (35);
sun.net.www.ParseUtil.encodedInPath.set (32);
sun.net.www.ParseUtil.encodedInPath.set (60);
sun.net.www.ParseUtil.encodedInPath.set (62);
sun.net.www.ParseUtil.encodedInPath.set (37);
sun.net.www.ParseUtil.encodedInPath.set (34);
sun.net.www.ParseUtil.encodedInPath.set (123);
sun.net.www.ParseUtil.encodedInPath.set (125);
sun.net.www.ParseUtil.encodedInPath.set (124);
sun.net.www.ParseUtil.encodedInPath.set (92);
sun.net.www.ParseUtil.encodedInPath.set (94);
sun.net.www.ParseUtil.encodedInPath.set (91);
sun.net.www.ParseUtil.encodedInPath.set (93);
sun.net.www.ParseUtil.encodedInPath.set (96);
for (var i = 0; i < 32; i++) sun.net.www.ParseUtil.encodedInPath.set (i);

sun.net.www.ParseUtil.encodedInPath.set (127);
}});
