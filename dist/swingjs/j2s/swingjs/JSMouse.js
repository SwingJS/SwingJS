Clazz.declarePackage ("swingjs");
Clazz.load (null, "swingjs.JSMouse", ["java.awt.Toolkit", "java.awt.event.MouseEvent", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.jqevent = null;
this.mouse2 = null;
this.isMouseDown = false;
this.wheeling = false;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
Clazz.instantialize (this, arguments);
}, swingjs, "JSMouse");
Clazz.makeConstructor (c$, 
function (v) {
this.viewer = v;
}, "swingjs.JSFrameViewer");
Clazz.defineMethod (c$, "processEvent", 
function (id, x, y, modifiers, time, jqevent) {
this.jqevent = jqevent;
if (id != -1 && id != 503) modifiers = swingjs.JSMouse.applyLeftMouse (modifiers);
switch (id) {
case -1:
this.wheeled (time, x, modifiers);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.pressed (time, x, y, modifiers, false);
break;
case 506:
this.dragged (time, x, y, modifiers);
break;
case 504:
this.entry (time, x, y, false);
break;
case 505:
this.entry (time, x, y, true);
break;
case 503:
this.moved (time, x, y, modifiers);
break;
case 502:
this.released (time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.clicked (time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "processTwoPointGesture", 
function (touches) {
this.getMouse2 ().processTwoPointGesture (touches);
}, "~A");
Clazz.defineMethod (c$, "getMouse2", 
 function () {
return (this.mouse2 == null ? (this.mouse2 = swingjs.JSToolkit.getInstance ("swingjs.JSMouse2")).set (this) : this.mouse2);
});
Clazz.defineMethod (c$, "translateXYBy", 
function (deltaX, deltaY) {
}, "~N,~N");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
this.clicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
this.entry (e.getWhen (), e.getX (), e.getY (), false);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
this.entry (e.getWhen (), e.getX (), e.getY (), true);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
this.pressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
this.released (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
this.moved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.wheeled (e.getWhen (), e.getWheelRotation (), e.getModifiers ());
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "entry", 
 function (time, x, y, isExit) {
this.wheeling = false;
this.mouseEnterExit (time, x, y, isExit);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "clicked", 
 function (time, x, y, modifiers, clickCount) {
this.mouseAction (500, time, x, y, 1, modifiers);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "moved", 
 function (time, x, y, modifiers) {
if (this.isMouseDown) this.mouseAction (506, time, x, y, 0, swingjs.JSMouse.applyLeftMouse (modifiers));
 else this.mouseAction (503, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "wheeled", 
function (time, rotation, modifiers) {
this.wheeling = true;
this.mouseAction (507, time, 0, rotation, 0, modifiers & -29 | 32);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "pressed", 
 function (time, x, y, modifiers, isPopupTrigger) {
this.isMouseDown = true;
this.wheeling = false;
this.mouseAction (501, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "released", 
 function (time, x, y, modifiers) {
this.isMouseDown = false;
this.wheeling = false;
this.mouseAction (502, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "dragged", 
 function (time, x, y, modifiers) {
if (this.wheeling) return;
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.mouseAction (506, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz.defineMethod (c$, "applyLeftMouse", 
 function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, "~N");
Clazz.defineMethod (c$, "getButton", 
 function (modifiers) {
switch (modifiers & 28) {
case 16:
return 1;
case 8:
return 2;
case 4:
return 3;
default:
return 0;
}
}, "~N");
Clazz.defineMethod (c$, "mouseEnterExit", 
 function (time, x, y, isExit) {
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "mouseAction", 
 function (id, time, x, y, count, modifiers) {
var popupTrigger = false;
var button = this.getButton (modifiers);
var source = this.viewer.top;
var e =  new java.awt.event.MouseEvent (source, id, time, modifiers, x, y, x, y, count, popupTrigger, button);
var bdata =  Clazz.newByteArray (0, 0);
var jqevent = this.jqevent;
{
bdata.jqevent = this.jqevent;
}e.setBData (e, bdata);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineStatics (c$,
"MOUSE_LEFT", 16,
"MOUSE_MIDDLE", 8,
"MOUSE_RIGHT", 4,
"MOUSE_WHEEL", 32,
"MAC_COMMAND", 20,
"BUTTON_MASK", 28);
});
