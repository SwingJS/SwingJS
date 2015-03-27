Clazz.declarePackage ("jssun.awt");
Clazz.load (["java.lang.Enum", "jsjava.awt.event.FocusEvent"], "jssun.awt.CausedFocusEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.cause = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "CausedFocusEvent", jsjava.awt.event.FocusEvent);
Clazz.defineMethod (c$, "getCause", 
function () {
return this.cause;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "jsjava.awt.FocusEvent[" + Clazz.superCall (this, jssun.awt.CausedFocusEvent, "paramString", []) + ",cause=" + this.cause + "] on " + this.getSource ();
});
Clazz.makeConstructor (c$, 
function (source, id, temporary, opposite, cause) {
Clazz.superConstructor (this, jssun.awt.CausedFocusEvent, [source, id, temporary, opposite]);
if (cause == null) {
cause = jssun.awt.CausedFocusEvent.Cause.UNKNOWN;
}this.cause = cause;
}, "jsjava.awt.Component,~N,~B,jsjava.awt.Component,jssun.awt.CausedFocusEvent.Cause");
c$.retarget = Clazz.defineMethod (c$, "retarget", 
function (e, newSource) {
if (e == null) return null;
return  new jssun.awt.CausedFocusEvent (newSource, e.getID (), e.isTemporary (), e.getOppositeComponent (), (Clazz.instanceOf (e, jssun.awt.CausedFocusEvent)) ? (e).getCause () : jssun.awt.CausedFocusEvent.Cause.RETARGETED);
}, "jsjava.awt.event.FocusEvent,jsjava.awt.Component");
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.awt.CausedFocusEvent, "Cause", Enum);
Clazz.defineEnumConstant (c$, "UNKNOWN", 0, []);
Clazz.defineEnumConstant (c$, "MOUSE_EVENT", 1, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL", 2, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_UP", 3, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_DOWN", 4, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_FORWARD", 5, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_BACKWARD", 6, []);
Clazz.defineEnumConstant (c$, "MANUAL_REQUEST", 7, []);
Clazz.defineEnumConstant (c$, "AUTOMATIC_TRAVERSE", 8, []);
Clazz.defineEnumConstant (c$, "ROLLBACK", 9, []);
Clazz.defineEnumConstant (c$, "NATIVE_SYSTEM", 10, []);
Clazz.defineEnumConstant (c$, "ACTIVATION", 11, []);
Clazz.defineEnumConstant (c$, "CLEAR_GLOBAL_FOCUS_OWNER", 12, []);
Clazz.defineEnumConstant (c$, "RETARGETED", 13, []);
c$ = Clazz.p0p ();
});
