Clazz.declarePackage ("javax.imageio.stream");
Clazz.load (["java.io.ByteArrayInputStream"], "javax.imageio.stream.ImageInputStream", null, function () {
c$ = Clazz.declareType (javax.imageio.stream, "ImageInputStream", java.io.ByteArrayInputStream);
Clazz.defineMethod (c$, "getBuf", 
function () {
return this.buf;
});
});
