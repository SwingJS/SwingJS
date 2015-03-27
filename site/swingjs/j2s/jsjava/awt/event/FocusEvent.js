Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.ComponentEvent"], "jsjava.awt.event.FocusEvent", ["jssun.awt.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.temporary = false;
this.opposite = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "FocusEvent", jsjava.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, temporary, opposite) {
Clazz.superConstructor (this, jsjava.awt.event.FocusEvent, [source, id]);
this.temporary = temporary;
this.opposite = opposite;
}, "jsjava.awt.Component,~N,~B,jsjava.awt.Component");
Clazz.makeConstructor (c$, 
function (source, id, temporary) {
this.construct (source, id, temporary, null);
}, "jsjava.awt.Component,~N,~B");
Clazz.makeConstructor (c$, 
function (source, id) {
this.construct (source, id, false);
}, "jsjava.awt.Component,~N");
Clazz.defineMethod (c$, "isTemporary", 
function () {
return this.temporary;
});
Clazz.defineMethod (c$, "getOppositeComponent", 
function () {
if (this.opposite == null) {
return null;
}return (jssun.awt.SunToolkit.targetToAppContext (this.opposite) === jssun.awt.AppContext.getAppContext ()) ? this.opposite : null;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 1004:
typeStr = "FOCUS_GAINED";
break;
case 1005:
typeStr = "FOCUS_LOST";
break;
default:
typeStr = "unknown type";
}
return typeStr + (this.temporary ? ",temporary" : ",permanent") + ",opposite=" + this.getOppositeComponent ();
});
Clazz.defineStatics (c$,
"FOCUS_FIRST", 1004,
"FOCUS_LAST", 1005,
"FOCUS_GAINED", 1004,
"FOCUS_LOST", 1005);
});
