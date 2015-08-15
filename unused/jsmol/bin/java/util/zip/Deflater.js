Clazz.declarePackage ("java.util.zip");
Clazz.load (["com.jcraft.jzlib.Deflater"], "java.util.zip.Deflater", null, function () {
c$ = Clazz.declareType (java.util.zip, "Deflater", com.jcraft.jzlib.Deflater);
Clazz.makeConstructor (c$, 
function (compressionLevel) {
if (compressionLevel != 2147483647) this.init (compressionLevel, 0, false);
}, "~N");
Clazz.defineStatics (c$,
"DEFAULT_COMPRESSION", -1);
});
