Clazz.declarePackage ("jssun.applet");
Clazz.load (["java.util.EventObject"], "jssun.applet.AppletEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.arg = null;
this.id = 0;
Clazz.instantialize (this, arguments);
}, jssun.applet, "AppletEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, id, argument) {
Clazz.superConstructor (this, jssun.applet.AppletEvent, [source]);
this.arg = argument;
this.id = id;
}, "~O,~N,~O");
Clazz.defineMethod (c$, "getID", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getArgument", 
function () {
return this.arg;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var str = this.getClass ().getName () + "[source=" + this.source + " + id=" + this.id;
if (this.arg != null) {
str += " + arg=" + this.arg;
}str += " ]";
return str;
});
});
