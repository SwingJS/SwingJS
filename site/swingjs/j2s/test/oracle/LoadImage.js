Clazz.declarePackage ("test.oracle");
Clazz.load (["javax.swing.JApplet"], "test.oracle.LoadImage", ["java.net.URL", "javax.imageio.ImageIO"], function () {
c$ = Clazz.decorateAsClass (function () {
this.img = null;
Clazz.instantialize (this, arguments);
}, test.oracle, "LoadImage", javax.swing.JApplet);
Clazz.overrideMethod (c$, "init", 
function () {
try {
var url = this.pathTo ("examples/strawberry.jpg");
System.out.println ("image loading from " + url);
this.img = javax.imageio.ImageIO.read (url);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.out.println (e);
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "pathTo", 
 function (file) {
var path = this.getDocumentBase ().toString ();
var pt = path.indexOf ("/bin/");
if (pt > 0) path = path.substring (0, pt) + "/html/" + path.substring (pt + 5);
path = path.substring (0, path.lastIndexOf ("/") + 1) + file;
if (path.startsWith ("/")) path = "file://" + path;
return  new java.net.URL (path);
}, "~S");
Clazz.overrideMethod (c$, "paint", 
function (g) {
g.drawImage (this.img, 50, 50, null);
}, "java.awt.Graphics");
});
