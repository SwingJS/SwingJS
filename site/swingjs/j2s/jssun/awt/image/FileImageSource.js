Clazz.declarePackage ("jssun.awt.image");
c$ = Clazz.decorateAsClass (function () {
this.imagefile = null;
Clazz.instantialize (this, arguments);
}, jssun.awt.image, "FileImageSource");
Clazz.makeConstructor (c$, 
function (filename) {
var security = System.getSecurityManager ();
if (security != null) {
security.checkRead (filename);
}this.imagefile = filename;
}, "~S");
Clazz.defineMethod (c$, "checkSecurity", 
function (context, quiet) {
return true;
}, "~O,~B");
