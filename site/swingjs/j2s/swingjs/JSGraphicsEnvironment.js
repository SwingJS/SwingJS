Clazz.declarePackage ("swingjs");
Clazz.load (["jsjava.awt.GraphicsEnvironment"], "swingjs.JSGraphicsEnvironment", null, function () {
c$ = Clazz.declareType (swingjs, "JSGraphicsEnvironment", jsjava.awt.GraphicsEnvironment);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSGraphicsEnvironment, []);
System.out.println ("JSGraphicsEnvironment initialized");
});
Clazz.overrideMethod (c$, "createGraphics", 
function (img) {
return null;
}, "jsjava.awt.image.BufferedImage");
Clazz.overrideMethod (c$, "getAllFonts", 
function () {
return null;
});
Clazz.defineMethod (c$, "getAvailableFontFamilyNames", 
function () {
return null;
});
Clazz.defineMethod (c$, "getAvailableFontFamilyNames", 
function (l) {
return null;
}, "java.util.Locale");
});
