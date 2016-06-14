Clazz.declarePackage ("javax.imageio");
Clazz.load (["java.io.IOException"], "javax.imageio.IIOException", null, function () {
c$ = Clazz.declareType (javax.imageio, "IIOException", java.io.IOException);
Clazz.makeConstructor (c$, 
function (message, cause) {
Clazz.superConstructor (this, javax.imageio.IIOException, [message]);
this.initCause (cause);
}, "~S,Throwable");
});
