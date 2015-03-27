Clazz.declarePackage ("jssun.misc");
Clazz.load (null, "jssun.misc.MetaIndex", ["java.io.BufferedReader", "$.File", "$.FileReader", "java.lang.IllegalArgumentException", "java.util.ArrayList", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contents = null;
this.isClassOnlyJar = false;
Clazz.instantialize (this, arguments);
}, jssun.misc, "MetaIndex");
c$.forJar = Clazz.defineMethod (c$, "forJar", 
function (jar) {
return jssun.misc.MetaIndex.getJarMap ().get (jar);
}, "java.io.File");
c$.registerDirectory = Clazz.defineMethod (c$, "registerDirectory", 
function (dir) {
var indexFile =  new java.io.File (dir, "meta-index");
if (indexFile.exists ()) {
try {
var reader =  new java.io.BufferedReader ( new java.io.FileReader (indexFile));
var line = null;
var curJarName = null;
var isCurJarContainClassOnly = false;
var contents =  new java.util.ArrayList ();
var map = jssun.misc.MetaIndex.getJarMap ();
dir = dir.getCanonicalFile ();
line = reader.readLine ();
if (line == null || !line.equals ("% VERSION 2")) {
reader.close ();
return;
}while ((line = reader.readLine ()) != null) {
switch (line.charAt (0)) {
case '!':
case '#':
case '@':
{
if ((curJarName != null) && (contents.size () > 0)) {
map.put ( new java.io.File (dir, curJarName),  new jssun.misc.MetaIndex (contents, isCurJarContainClassOnly));
contents.clear ();
}curJarName = line.substring (2);
if (line.charAt (0) == '!') {
isCurJarContainClassOnly = true;
} else if (isCurJarContainClassOnly) {
isCurJarContainClassOnly = false;
}break;
}case '%':
break;
default:
{
contents.add (line);
}}
}
if ((curJarName != null) && (contents.size () > 0)) {
map.put ( new java.io.File (dir, curJarName),  new jssun.misc.MetaIndex (contents, isCurJarContainClassOnly));
}reader.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}, "java.io.File");
Clazz.defineMethod (c$, "mayContain", 
function (entry) {
if (this.isClassOnlyJar && !entry.endsWith (".class")) {
return false;
}var conts = this.contents;
for (var i = 0; i < conts.length; i++) {
if (entry.startsWith (conts[i])) {
return true;
}}
return false;
}, "~S");
Clazz.makeConstructor (c$, 
($fz = function (entries, isClassOnlyJar) {
if (entries == null) {
throw  new IllegalArgumentException ();
}this.contents = entries.toArray ( new Array (0));
this.isClassOnlyJar = isClassOnlyJar;
}, $fz.isPrivate = true, $fz), "java.util.List,~B");
c$.getJarMap = Clazz.defineMethod (c$, "getJarMap", 
($fz = function () {
if (jssun.misc.MetaIndex.jarMap == null) {
{
if (jssun.misc.MetaIndex.jarMap == null) {
jssun.misc.MetaIndex.jarMap =  new java.util.HashMap ();
}}}return jssun.misc.MetaIndex.jarMap;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"jarMap", null);
});
