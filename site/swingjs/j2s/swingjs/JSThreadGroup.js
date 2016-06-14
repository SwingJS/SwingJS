Clazz.declarePackage ("swingjs");
Clazz.load (["java.lang.ThreadGroup"], "swingjs.JSThreadGroup", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.html5Applet = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSThreadGroup", ThreadGroup);
Clazz.defineMethod (c$, "setHtmlApplet", 
function (html5Applet) {
this.html5Applet = html5Applet;
}, "swingjs.api.HTML5Applet");
Clazz.defineMethod (c$, "getHtmlApplet", 
function () {
return this.html5Applet;
});
});
