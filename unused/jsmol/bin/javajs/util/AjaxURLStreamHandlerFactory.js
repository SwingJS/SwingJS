Clazz.declarePackage ("javajs.util");
Clazz.load (["java.net.URLStreamHandlerFactory", "java.util.Hashtable"], "javajs.util.AjaxURLStreamHandlerFactory", ["javajs.util.AjaxURLStreamHandler"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htFactories = null;
Clazz.instantialize (this, arguments);
}, javajs.util, "AjaxURLStreamHandlerFactory", null, java.net.URLStreamHandlerFactory);
Clazz.prepareFields (c$, function () {
this.htFactories =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "createURLStreamHandler", 
function (protocol) {
var fac = this.htFactories.get (protocol);
if (fac == null) this.htFactories.put (protocol, fac =  new javajs.util.AjaxURLStreamHandler (protocol));
return (fac.protocol == null ? null : fac);
}, "~S");
});
