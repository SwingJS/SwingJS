Clazz.declarePackage ("javajs.util");
Clazz.load (["java.net.URLConnection"], "javajs.util.AjaxURLConnection", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bytesOut = null;
this.postOut = "";
Clazz.instantialize (this, arguments);
}, javajs.util, "AjaxURLConnection", java.net.URLConnection);
Clazz.defineMethod (c$, "doAjax", 
($fz = function () {
{
return Jmol._doAjax(this.url, this.postOut, this.bytesOut);
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "connect", 
function () {
});
Clazz.defineMethod (c$, "outputBytes", 
function (bytes) {
this.bytesOut = bytes;
}, "~A");
Clazz.defineMethod (c$, "outputString", 
function (post) {
this.postOut = post;
}, "~S");
Clazz.defineMethod (c$, "getContents", 
function () {
return this.doAjax ();
});
});
