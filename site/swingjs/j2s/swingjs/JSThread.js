Clazz.declarePackage ("swingjs");
Clazz.load (["java.lang.Thread", "swingjs.api.JSFunction"], "swingjs.JSThread", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.isJS = false;
Clazz.instantialize (this, arguments);
}, swingjs, "JSThread", Thread, swingjs.api.JSFunction);
Clazz.makeConstructor (c$, 
function (group, name) {
Clazz.superConstructor (this, swingjs.JSThread, [group, name]);
{
this.isJS = true;
}}, "ThreadGroup,~S");
Clazz.overrideMethod (c$, "run", 
function () {
this.run1 (0);
});
Clazz.defineMethod (c$, "start", 
function () {
{
swingjs.JSToolkit.dispatch(this, 1, 0);
}});
Clazz.defineMethod (c$, "sleepAndReturn", 
function (delay, state) {
if (!this.isJS) {
Thread.sleep (delay);
return false;
}var me = this;
var r = ((Clazz.isClassDefined ("swingjs.JSThread$1") ? 0 : swingjs.JSThread.$JSThread$1$ ()), Clazz.innerTypeInstance (swingjs.JSThread$1, this, Clazz.cloneFinals ("me", me, "state", state)));
{
setTimeout(
function() {java.awt.Toolkit.getDefaultToolkit().getSystemEventQueue().postEvent(new java.awt.event.InvocationEvent(me, r))},
delay
);
}return true;
}, "~N,~N");
c$.$JSThread$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (swingjs, "JSThread$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.me.run1 (this.f$.state);
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"INIT", 0,
"LOOP", 1,
"DONE", 2);
});
