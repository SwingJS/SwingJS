Clazz.declarePackage ("javajs.util");
Clazz.load (["java.net.URLStreamHandler"], "javajs.util.AjaxURLStreamHandler", ["javajs.util.AjaxURLConnection", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.protocol = null;
Clazz.instantialize (this, arguments);
}, javajs.util, "AjaxURLStreamHandler", java.net.URLStreamHandler);
Clazz.makeConstructor (c$, 
function (protocol) {
Clazz.superConstructor (this, javajs.util.AjaxURLStreamHandler, []);
this.protocol = protocol;
}, "~S");
Clazz.overrideMethod (c$, "openConnection", 
function (url) {
return  new javajs.util.AjaxURLConnection (url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "toExternalForm", 
function (u) {
var result =  new javajs.util.SB ();
result.append (u.getProtocol ());
result.append (":");
if (u.getAuthority () != null && u.getAuthority ().length > 0) {
result.append ("//");
result.append (u.getAuthority ());
}if (u.getPath () != null) {
result.append (u.getPath ());
}if (u.getQuery () != null) {
result.append ("?");
result.append (u.getQuery ());
}if (u.getRef () != null) {
result.append ("#");
result.append (u.getRef ());
}return result.toString ();
}, "java.net.URL");
});
