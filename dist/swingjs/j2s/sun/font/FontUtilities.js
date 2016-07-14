Clazz.declarePackage ("sun.font");
Clazz.load (null, "sun.font.FontUtilities", ["java.io.BufferedReader", "$.File", "$.FileInputStream", "$.InputStreamReader", "java.lang.Float"], function () {
c$ = Clazz.declareType (sun.font, "FontUtilities");
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
return sun.font.FontUtilities.logging;
});
c$.debugFonts = Clazz.defineMethod (c$, "debugFonts", 
function () {
return sun.font.FontUtilities.$debugFonts;
});
c$.fontSupportsDefaultEncoding = Clazz.defineMethod (c$, "fontSupportsDefaultEncoding", 
function (font) {
return false;
}, "java.awt.Font");
c$.mapFcName = Clazz.defineMethod (c$, "mapFcName", 
function (name) {
for (var i = 0; i < sun.font.FontUtilities.nameMap.length; i++) {
if (name.equals (sun.font.FontUtilities.nameMap[i][0])) {
return sun.font.FontUtilities.nameMap[i][1];
}}
return null;
}, "~S");
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
var osName = System.getProperty ("os.name", "unknownOS");
sun.font.FontUtilities.isSolaris = osName.startsWith ("SunOS");
sun.font.FontUtilities.isLinux = osName.startsWith ("Linux");
sun.font.FontUtilities.isMacOSX = osName.contains ("OS X");
var t2kStr = System.getProperty ("sun.java2d.font.scaler");
if (t2kStr != null) {
sun.font.FontUtilities.useT2K = "t2k".equals (t2kStr);
} else {
sun.font.FontUtilities.useT2K = false;
}if (sun.font.FontUtilities.isSolaris) {
var version = System.getProperty ("os.version", "0.0");
sun.font.FontUtilities.isSolaris8 = version.startsWith ("5.8");
sun.font.FontUtilities.isSolaris9 = version.startsWith ("5.9");
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
sun.font.FontUtilities.isOpenSolaris = true;
} else {
sun.font.FontUtilities.isOpenSolaris = false;
}} else {
sun.font.FontUtilities.isOpenSolaris = false;
}} else {
sun.font.FontUtilities.isSolaris8 = false;
sun.font.FontUtilities.isSolaris9 = false;
sun.font.FontUtilities.isOpenSolaris = false;
}sun.font.FontUtilities.isWindows = osName.startsWith ("Windows");
var jreLibDirName = System.getProperty ("java.home", "") + java.io.File.separator + "lib";
var jreFontDirName = jreLibDirName + java.io.File.separator + "fonts";
var lucidaFile =  new java.io.File (jreFontDirName + java.io.File.separator + "LucidaSansRegular.ttf");
sun.font.FontUtilities.isOpenJDK = !lucidaFile.exists ();
var debugLevel = System.getProperty ("sun.java2d.debugfonts");
if (debugLevel != null && !debugLevel.equals ("false")) {
sun.font.FontUtilities.$debugFonts = true;
}if (sun.font.FontUtilities.$debugFonts) {
}}Clazz.defineStatics (c$,
"MIN_LAYOUT_CHARCODE", 0x0300,
"MAX_LAYOUT_CHARCODE", 0x206F,
"nameMap", [["sans", "sansserif"], ["sans-serif", "sansserif"], ["serif", "serif"], ["monospace", "monospaced"]]);
});
