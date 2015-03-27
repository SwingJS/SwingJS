Clazz.load (["jsjava.applet.AppletStub"], "jsContext", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.app = null;
Clazz.instantialize (this, arguments);
}, null, "jsContext", null, jsjava.applet.AppletStub);
Clazz.makeConstructor (c$, 
function (app) {
this.app = app;
}, "jsjavax.swing.JApplet");
Clazz.overrideMethod (c$, "isActive", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getDocumentBase", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getCodeBase", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getParameter", 
function (name) {
System.out.println ("get parameter: " + name);
if ("width".equals (name)) return "300";
if ("height".equals (name)) return "300";
return null;
}, "~S");
Clazz.overrideMethod (c$, "getAppletContext", 
function () {
return null;
});
Clazz.overrideMethod (c$, "appletResize", 
function (width, height) {
System.out.println ("resize applet to " + width + " " + height);
}, "~N,~N");
});
