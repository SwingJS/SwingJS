Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.ComponentEvent"], "jsjava.awt.event.PaintEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.updateRect = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "PaintEvent", jsjava.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, updateRect) {
Clazz.superConstructor (this, jsjava.awt.event.PaintEvent, [source, id]);
this.updateRect = updateRect;
}, "jsjava.awt.Component,~N,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "getUpdateRect", 
function () {
return this.updateRect;
});
Clazz.defineMethod (c$, "setUpdateRect", 
function (updateRect) {
this.updateRect = updateRect;
}, "jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 800:
typeStr = "PAINT";
break;
case 801:
typeStr = "UPDATE";
break;
default:
typeStr = "unknown type";
}
return typeStr + ",updateRect=" + (this.updateRect != null ? this.updateRect.toString () : "null");
});
Clazz.defineStatics (c$,
"PAINT_FIRST", 800,
"PAINT_LAST", 801,
"PAINT", 800,
"UPDATE", 801);
});
