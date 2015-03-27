Clazz.declarePackage ("jsjava.awt");
Clazz.load (["java.util.EventObject", "jsjava.security.AccessController"], "jsjava.awt.AWTEvent", ["java.lang.SecurityException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bdata = null;
this.id = 0;
this.consumed = false;
this.acc = null;
this.focusManagerIsDispatching = false;
this.isPosted = false;
this.isSystemGenerated = false;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "AWTEvent", java.util.EventObject);
Clazz.prepareFields (c$, function () {
this.acc = jsjava.security.AccessController.getContext ();
});
Clazz.defineMethod (c$, "getAccessControlContext", 
function () {
if (this.acc == null) {
throw  new SecurityException ("AWTEvent is missing AccessControlContext");
}return this.acc;
});
Clazz.makeConstructor (c$, 
function (event) {
this.construct (event.target, event.id);
}, "jsjava.awt.Event");
Clazz.makeConstructor (c$, 
function (source, id) {
Clazz.superConstructor (this, jsjava.awt.AWTEvent, [source]);
this.id = id;
switch (id) {
case 1001:
case 701:
case 601:
case 900:
this.consumed = true;
break;
default:
}
}, "~O,~N");
Clazz.defineMethod (c$, "setSource", 
function (newSource) {
if (this.source === newSource) {
return;
}var comp = null;
this.source = newSource;
}, "~O");
Clazz.defineMethod (c$, "getID", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var srcName = null;
srcName = (this.source).getName ();
return this.getClass ().getName () + "[" + this.paramString () + "] on " + (srcName != null ? srcName : this.source);
});
Clazz.defineMethod (c$, "paramString", 
function () {
return "";
});
Clazz.defineMethod (c$, "consume", 
function () {
switch (this.id) {
case 401:
case 402:
case 501:
case 502:
case 503:
case 506:
case 504:
case 505:
case 507:
case 1100:
case 1101:
this.consumed = true;
break;
default:
}
});
Clazz.defineMethod (c$, "isConsumed", 
function () {
return this.consumed;
});
Clazz.defineMethod (c$, "copyPrivateDataInto", 
function (that) {
that.bdata = this.bdata;
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatched", 
function () {
});
Clazz.defineStatics (c$,
"COMPONENT_EVENT_MASK", 0x01,
"CONTAINER_EVENT_MASK", 0x02,
"FOCUS_EVENT_MASK", 0x04,
"KEY_EVENT_MASK", 0x08,
"MOUSE_EVENT_MASK", 0x10,
"MOUSE_MOTION_EVENT_MASK", 0x20,
"WINDOW_EVENT_MASK", 0x40,
"ACTION_EVENT_MASK", 0x80,
"ADJUSTMENT_EVENT_MASK", 0x100,
"ITEM_EVENT_MASK", 0x200,
"TEXT_EVENT_MASK", 0x400,
"INPUT_METHOD_EVENT_MASK", 0x800,
"INPUT_METHODS_ENABLED_MASK", 0x1000,
"PAINT_EVENT_MASK", 0x2000,
"INVOCATION_EVENT_MASK", 0x4000,
"HIERARCHY_EVENT_MASK", 0x8000,
"HIERARCHY_BOUNDS_EVENT_MASK", 0x10000,
"MOUSE_WHEEL_EVENT_MASK", 0x20000,
"WINDOW_STATE_EVENT_MASK", 0x40000,
"WINDOW_FOCUS_EVENT_MASK", 0x80000,
"RESERVED_ID_MAX", 1999);
});
