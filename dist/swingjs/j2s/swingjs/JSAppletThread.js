Clazz.declarePackage ("swingjs");
Clazz.load (["swingjs.JSThread"], "swingjs.JSAppletThread", ["javax.swing.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.appletViewer = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSAppletThread", swingjs.JSThread);
Clazz.makeConstructor (c$, 
function (ap, group, name) {
Clazz.superConstructor (this, swingjs.JSAppletThread, [group, name]);
this.appletViewer = ap;
}, "swingjs.JSAppletViewer,ThreadGroup,~S");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
mode = this.appletViewer.run1 (mode);
if (mode != 2) this.dispatchAndReturn (null, mode);
}, "~N");
Clazz.defineMethod (c$, "dispatchAndReturn", 
function (r, mode) {
var m = mode;
javax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("swingjs.JSAppletThread$1") ? 0 : swingjs.JSAppletThread.$JSAppletThread$1$ ()), Clazz.innerTypeInstance (swingjs.JSAppletThread$1, this, Clazz.cloneFinals ("m", m))));
}, "Runnable,~N");
Clazz.overrideMethod (c$, "myInit", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
return false;
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
return false;
});
Clazz.overrideMethod (c$, "whenDone", 
function () {
});
Clazz.overrideMethod (c$, "getDelayMillis", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "onException", 
function (e) {
}, "Exception");
Clazz.overrideMethod (c$, "doFinally", 
function () {
});
c$.$JSAppletThread$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (swingjs, "JSAppletThread$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["swingjs.JSAppletThread"].run1 (this.f$.m);
});
c$ = Clazz.p0p ();
};
});
