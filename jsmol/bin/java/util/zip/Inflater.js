Clazz.declarePackage ("java.util.zip");
Clazz.load (["com.jcraft.jzlib.Inflater"], "java.util.zip.Inflater", null, function () {
c$ = Clazz.declareType (java.util.zip, "Inflater", com.jcraft.jzlib.Inflater);
Clazz.defineMethod (c$, "initialize", 
function (nowrap) {
return this.init (0, nowrap);
}, "~B");
});
