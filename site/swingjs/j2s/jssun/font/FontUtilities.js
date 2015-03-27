Clazz.declarePackage ("jssun.font");
Clazz.load (null, "jssun.font.FontUtilities", ["java.io.BufferedReader", "$.File", "$.FileInputStream", "$.InputStreamReader", "java.lang.Float", "jsjava.security.AccessController", "$.PrivilegedAction"], function () {
c$ = Clazz.declareType (jssun.font, "FontUtilities");
c$.isComplexCharCode = Clazz.defineMethod (c$, "isComplexCharCode", 
function (code) {
if (code < 768 || code > 8303) {
return false;
} else if (code <= 0x036f) {
return true;
} else if (code < 0x0590) {
return false;
} else if (code <= 0x06ff) {
return true;
} else if (code < 0x0900) {
return false;
} else if (code <= 0x0e7f) {
return true;
} else if (code < 0x0f00) {
return false;
} else if (code <= 0x0fff) {
return true;
} else if (code < 0x1100) {
return false;
} else if (code < 0x11ff) {
return true;
} else if (code < 0x1780) {
return false;
} else if (code <= 0x17ff) {
return true;
} else if (code < 0x200c) {
return false;
} else if (code <= 0x200d) {
return true;
} else if (code >= 0x202a && code <= 0x202e) {
return true;
} else if (code >= 0x206a && code <= 0x206f) {
return true;
}return false;
}, "~N");
c$.isLogging = Clazz.defineMethod (c$, "isLogging", 
function () {
return jssun.font.FontUtilities.logging;
});
c$.debugFonts = Clazz.defineMethod (c$, "debugFonts", 
function () {
return jssun.font.FontUtilities.$debugFonts;
});
c$.fontSupportsDefaultEncoding = Clazz.defineMethod (c$, "fontSupportsDefaultEncoding", 
function (font) {
return false;
}, "jsjava.awt.Font");
c$.mapFcName = Clazz.defineMethod (c$, "mapFcName", 
function (name) {
for (var i = 0; i < jssun.font.FontUtilities.nameMap.length; i++) {
if (name.equals (jssun.font.FontUtilities.nameMap[i][0])) {
return jssun.font.FontUtilities.nameMap[i][1];
}}
return null;
}, "~S");
c$.$FontUtilities$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.font, "FontUtilities$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var osName = System.getProperty ("os.name", "unknownOS");
jssun.font.FontUtilities.isSolaris = osName.startsWith ("SunOS");
jssun.font.FontUtilities.isLinux = osName.startsWith ("Linux");
jssun.font.FontUtilities.isMacOSX = osName.contains ("OS X");
var t2kStr = System.getProperty ("jssun.java2d.font.scaler");
if (t2kStr != null) {
jssun.font.FontUtilities.useT2K = "t2k".equals (t2kStr);
} else {
jssun.font.FontUtilities.useT2K = false;
}if (jssun.font.FontUtilities.isSolaris) {
var version = System.getProperty ("os.version", "0.0");
jssun.font.FontUtilities.isSolaris8 = version.startsWith ("5.8");
jssun.font.FontUtilities.isSolaris9 = version.startsWith ("5.9");
var ver = Float.parseFloat (version);
if (ver > 5.10) {
var f =  new java.io.File ("/etc/release");
var line = null;
try {
var fis =  new java.io.FileInputStream (f);
var isr =  new java.io.InputStreamReader (fis, "ISO-8859-1");
var br =  new java.io.BufferedReader (isr);
line = br.readLine ();
fis.close ();
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
if (line != null && line.indexOf ("OpenSolaris") >= 0) {
jssun.font.FontUtilities.isOpenSolaris = true;
} else {
jssun.font.FontUtilities.isOpenSolaris = false;
}} else {
jssun.font.FontUtilities.isOpenSolaris = false;
}} else {
jssun.font.FontUtilities.isSolaris8 = false;
jssun.font.FontUtilities.isSolaris9 = false;
jssun.font.FontUtilities.isOpenSolaris = false;
}jssun.font.FontUtilities.isWindows = osName.startsWith ("Windows");
var jreLibDirName = System.getProperty ("java.home", "") + java.io.File.separator + "lib";
var jreFontDirName = jreLibDirName + java.io.File.separator + "fonts";
var lucidaFile =  new java.io.File (jreFontDirName + java.io.File.separator + "LucidaSansRegular.ttf");
jssun.font.FontUtilities.isOpenJDK = !lucidaFile.exists ();
var debugLevel = System.getProperty ("jssun.java2d.debugfonts");
if (debugLevel != null && !debugLevel.equals ("false")) {
jssun.font.FontUtilities.$debugFonts = true;
}if (jssun.font.FontUtilities.$debugFonts) {
}return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"isSolaris", false,
"isLinux", false,
"isMacOSX", false,
"isSolaris8", false,
"isSolaris9", false,
"isOpenSolaris", false,
"useT2K", false,
"isWindows", false,
"isOpenJDK", false,
"LUCIDA_FILE_NAME", "LucidaSansRegular.ttf",
"$debugFonts", false,
"logging", false);
{
jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jssun.font.FontUtilities$1") ? 0 : jssun.font.FontUtilities.$FontUtilities$1$ ()), Clazz.innerTypeInstance (jssun.font.FontUtilities$1, this, null)));
}Clazz.defineStatics (c$,
"MIN_LAYOUT_CHARCODE", 0x0300,
"MAX_LAYOUT_CHARCODE", 0x206F,
"nameMap",  Clazz.newArray (-1, [ Clazz.newArray (-1, ["sans", "sansserif"]),  Clazz.newArray (-1, ["sans-serif", "sansserif"]),  Clazz.newArray (-1, ["serif", "serif"]),  Clazz.newArray (-1, ["monospace", "monospaced"])]));
});
