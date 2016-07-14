Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (null, "org.xml.sax.helpers.NewInstance", ["java.lang.Thread", "$.UnknownError"], function () {
c$ = Clazz.declareType (org.xml.sax.helpers, "NewInstance");
c$.newInstance = Clazz.defineMethod (c$, "newInstance", 
function (classLoader, className) {
var driverClass;
if (classLoader == null) {
driverClass = Clazz._4Name (className);
} else {
driverClass = classLoader.loadClass (className);
}return driverClass.newInstance ();
}, "ClassLoader,~S");
c$.getClassLoader = Clazz.defineMethod (c$, "getClassLoader", 
function () {
var m = null;
try {
m = Thread.getMethod ("getContextClassLoader", null);
} catch (e) {
if (Clazz.exceptionOf (e, NoSuchMethodException)) {
return org.xml.sax.helpers.NewInstance.getClassLoader ();
} else {
throw e;
}
}
try {
return m.invoke (Thread.currentThread (), null);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e = e$$;
{
throw  new UnknownError (e.getMessage ());
}
} else if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
throw  new UnknownError (e.getMessage ());
}
} else {
throw e$$;
}
}
});
});
