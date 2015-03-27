Clazz.declarePackage ("jsjava.awt");
Clazz.load (null, "jsjava.awt.GraphicsEnvironment", ["java.lang.Error"], function () {
c$ = Clazz.declareType (jsjava.awt, "GraphicsEnvironment");
Clazz.makeConstructor (c$, 
function () {
});
c$.getLocalGraphicsEnvironment = Clazz.defineMethod (c$, "getLocalGraphicsEnvironment", 
function () {
if (jsjava.awt.GraphicsEnvironment.localEnv == null) {
var nm = null;
{
nm = "swingjs.JSGraphicsEnvironment";
}try {
jsjava.awt.GraphicsEnvironment.localEnv = Class.forName (nm).newInstance ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
throw  new Error ("Could not find class: " + nm);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e = e$$;
{
throw  new Error ("Could not instantiate Graphics Environment: " + nm);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e = e$$;
{
throw  new Error ("Could not access Graphics Environment: " + nm);
}
} else {
throw e$$;
}
}
}return jsjava.awt.GraphicsEnvironment.localEnv;
});
c$.isHeadless = Clazz.defineMethod (c$, "isHeadless", 
function () {
return false;
});
c$.getHeadlessProperty = Clazz.defineMethod (c$, "getHeadlessProperty", 
($fz = function () {
return false;
}, $fz.isPrivate = true, $fz));
c$.checkHeadless = Clazz.defineMethod (c$, "checkHeadless", 
function () {
});
Clazz.defineMethod (c$, "isHeadlessInstance", 
function () {
return jsjava.awt.GraphicsEnvironment.getHeadlessProperty ();
});
Clazz.defineMethod (c$, "registerFont", 
function (font) {
return true;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "preferLocaleFonts", 
function () {
});
Clazz.defineMethod (c$, "preferProportionalFonts", 
function () {
});
Clazz.defineMethod (c$, "getCenterPoint", 
function () {
return null;
});
Clazz.defineStatics (c$,
"localEnv", null);
});
