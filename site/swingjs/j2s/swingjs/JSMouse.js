Clazz.declarePackage ("swingjs");
Clazz.load (null, "swingjs.JSMouse", ["JU.V3", "java.awt.Toolkit", "java.awt.event.MouseEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ap = null;
this.isMouseDown = false;
this.wheeling = false;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
Clazz.instantialize (this, arguments);
}, swingjs, "JSMouse");
Clazz.makeConstructor (c$, 
function (ap) {
this.ap = ap;
}, "swingjs.JSAppletPanel");
Clazz.defineMethod (c$, "processEvent", 
function (id, x, y, modifiers, time) {
if (id != -1) modifiers = swingjs.JSMouse.applyLeftMouse (modifiers);
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
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "processTwoPointGesture", 
function (touches) {
if (touches[0].length < 2) return;
var t1 = touches[0];
var t2 = touches[1];
var t1first = t1[0];
var t1last = t1[t2.length - 1];
var x1first = t1first[0];
var x1last = t1last[0];
var dx1 = x1last - x1first;
var y1first = t1first[1];
var y1last = t1last[1];
var dy1 = y1last - y1first;
var v1 = JU.V3.new3 (dx1, dy1, 0);
var d1 = v1.length ();
var t2first = t2[0];
var t2last = t2[t2.length - 1];
var x2first = t2first[0];
var x2last = t2last[0];
var dx2 = x2last - x2first;
var y2first = t2first[1];
var y2last = t2last[1];
var dy2 = y2last - y2first;
var v2 = JU.V3.new3 (dx2, dy2, 0);
var d2 = v2.length ();
if (d1 < 1 || d2 < 1) return;
v1.normalize ();
v2.normalize ();
var cos12 = (v1.dot (v2));
if (cos12 > 0.8) {
var deltaX = Clazz.floatToInt (x1last - t1[t1.length - 2][0]);
var deltaY = Clazz.floatToInt (y1last - t1[t1.length - 2][1]);
this.translateXYBy (deltaX, deltaY);
} else if (cos12 < -0.8) {
v1 = JU.V3.new3 (x2first - x1first, y2first - y1first, 0);
v2 = JU.V3.new3 (x2last - x1last, y2last - y1last, 0);
var dx = v2.length () - v1.length ();
this.wheeled (System.currentTimeMillis (), dx < 0 ? -1 : 1, 32);
}}, "~A");
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
var source = this.ap.applet;
var e =  new java.awt.event.MouseEvent (source, id, time, modifiers, x, y, x, y, count, popupTrigger, button);
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
