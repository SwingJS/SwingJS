Clazz.declarePackage ("javajs.util");
Clazz.load (["java.net.URLConnection"], "javajs.util.AjaxURLConnection", ["javajs.util.AU", "$.Rdr", "$.SB"], function () {
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
Clazz.overrideMethod (c$, "getInputStream", 
function () {
var is = null;
var o = this.doAjax ();
if (javajs.util.AU.isAB (o)) is = javajs.util.Rdr.getBIS (o);
 else if (Clazz.instanceOf (o, javajs.util.SB)) is = javajs.util.Rdr.getBIS (javajs.util.Rdr.getBytesFromSB (o));
 else if (Clazz.instanceOf (o, String)) is = javajs.util.Rdr.getBIS ((o).getBytes ());
return is;
});
Clazz.defineMethod (c$, "getContents", 
function () {
return this.doAjax ();
});
});
