Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.InputEvent"], "jsjava.awt.event.MouseEvent", ["java.lang.IllegalArgumentException", "$.StringBuilder", "jsjava.awt.Point", "$.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.xAbs = 0;
this.yAbs = 0;
this.clickCount = 0;
this.button = 0;
this.popupTrigger = false;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "MouseEvent", jsjava.awt.event.InputEvent);
Clazz.defineMethod (c$, "getLocationOnScreen", 
function () {
return  new jsjava.awt.Point (this.xAbs, this.yAbs);
});
Clazz.defineMethod (c$, "getXOnScreen", 
function () {
return this.xAbs;
});
Clazz.defineMethod (c$, "getYOnScreen", 
function () {
return this.yAbs;
});
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger, button) {
this.construct (source, id, when, modifiers, x, y, 0, 0, clickCount, popupTrigger, button);
var eventLocationOnScreen =  new jsjava.awt.Point (0, 0);
try {
eventLocationOnScreen = source.getLocationOnScreen ();
this.xAbs = eventLocationOnScreen.x + x;
this.yAbs = eventLocationOnScreen.y + y;
} catch (e) {
if (Clazz.exceptionOf (e, jsjava.awt.IllegalComponentStateException)) {
this.xAbs = 0;
this.yAbs = 0;
} else {
throw e;
}
}
}, "jsjava.awt.Component,~N,~N,~N,~N,~N,~N,~B,~N");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger) {
this.construct (source, id, when, modifiers, x, y, clickCount, popupTrigger, 0);
}, "jsjava.awt.Component,~N,~N,~N,~N,~N,~N,~B");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, button) {
Clazz.superConstructor (this, jsjava.awt.event.MouseEvent, [source, id, when, modifiers]);
this.x = x;
this.y = y;
this.xAbs = xAbs;
this.yAbs = yAbs;
this.clickCount = clickCount;
this.popupTrigger = popupTrigger;
if (button < 0 || button > 3) {
throw  new IllegalArgumentException ("Invalid button value");
}this.button = button;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0 || button != 0)) {
this.setOldModifiers ();
}}, "jsjava.awt.Component,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "getPoint", 
function () {
var x;
var y;
{
x = this.x;
y = this.y;
}return  new jsjava.awt.Point (x, y);
});
Clazz.defineMethod (c$, "translatePoint", 
function (x, y) {
this.x += x;
this.y += y;
}, "~N,~N");
Clazz.defineMethod (c$, "getClickCount", 
function () {
return this.clickCount;
});
Clazz.defineMethod (c$, "getButton", 
function () {
return this.button;
});
Clazz.defineMethod (c$, "isPopupTrigger", 
function () {
return this.popupTrigger;
});
c$.getMouseModifiersText = Clazz.defineMethod (c$, "getMouseModifiersText", 
function (modifiers) {
var buf =  new StringBuilder ();
if ((modifiers & 8) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.alt", "Alt"));
buf.append ("+");
}if ((modifiers & 4) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.meta", "Meta"));
buf.append ("+");
}if ((modifiers & 2) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.control", "Ctrl"));
buf.append ("+");
}if ((modifiers & 1) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.shift", "Shift"));
buf.append ("+");
}if ((modifiers & 32) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.altGraph", "Alt Graph"));
buf.append ("+");
}if ((modifiers & 16) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.button1", "Button1"));
buf.append ("+");
}if ((modifiers & 8) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.button2", "Button2"));
buf.append ("+");
}if ((modifiers & 4) != 0) {
buf.append (jsjava.awt.Toolkit.getProperty ("AWT.button3", "Button3"));
buf.append ("+");
}if (buf.length () > 0) {
buf.setLength (buf.length () - 1);
}return buf.toString ();
}, "~N");
Clazz.overrideMethod (c$, "paramString", 
function () {
var str =  new StringBuilder (80);
switch (this.id) {
case 501:
str.append ("MOUSE_PRESSED");
break;
case 502:
str.append ("MOUSE_RELEASED");
break;
case 500:
str.append ("MOUSE_CLICKED");
break;
case 504:
str.append ("MOUSE_ENTERED");
break;
case 505:
str.append ("MOUSE_EXITED");
break;
case 503:
str.append ("MOUSE_MOVED");
break;
case 506:
str.append ("MOUSE_DRAGGED");
break;
case 507:
str.append ("MOUSE_WHEEL");
break;
default:
str.append ("unknown type");
}
str.append (",(").append (this.x).append (",").append (this.y).append (")");
str.append (",absolute(").append (this.xAbs).append (",").append (this.yAbs).append (")");
str.append (",button=").append (this.getButton ());
if (this.getModifiers () != 0) {
str.append (",modifiers=").append (jsjava.awt.event.MouseEvent.getMouseModifiersText (this.modifiers));
}if (this.getModifiersEx () != 0) {
str.append (",extModifiers=").append (jsjava.awt.event.InputEvent.getModifiersExText (this.modifiers));
}str.append (",clickCount=").append (this.clickCount);
return str.toString ();
});
Clazz.defineMethod (c$, "setNewModifiers", 
($fz = function () {
if ((this.modifiers & 16) != 0) {
this.modifiers |= 1024;
}if ((this.modifiers & 8) != 0) {
this.modifiers |= 2048;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 4096;
}if (this.id == 501 || this.id == 502 || this.id == 500) {
if ((this.modifiers & 16) != 0) {
this.button = 1;
this.modifiers &= -13;
if (this.id != 501) {
this.modifiers &= -1025;
}} else if ((this.modifiers & 8) != 0) {
this.button = 2;
this.modifiers &= -21;
if (this.id != 501) {
this.modifiers &= -2049;
}} else if ((this.modifiers & 4) != 0) {
this.button = 3;
this.modifiers &= -25;
if (this.id != 501) {
this.modifiers &= -4097;
}}}if ((this.modifiers & 8) != 0) {
this.modifiers |= 512;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 256;
}if ((this.modifiers & 1) != 0) {
this.modifiers |= 64;
}if ((this.modifiers & 2) != 0) {
this.modifiers |= 128;
}if ((this.modifiers & 32) != 0) {
this.modifiers |= 8192;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setOldModifiers", 
($fz = function () {
if (this.id == 501 || this.id == 502 || this.id == 500) {
switch (this.button) {
case 1:
this.modifiers |= 16;
break;
case 2:
this.modifiers |= 8;
break;
case 3:
this.modifiers |= 4;
break;
}
} else {
if ((this.modifiers & 1024) != 0) {
this.modifiers |= 16;
}if ((this.modifiers & 2048) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 4096) != 0) {
this.modifiers |= 4;
}}if ((this.modifiers & 512) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 256) != 0) {
this.modifiers |= 4;
}if ((this.modifiers & 64) != 0) {
this.modifiers |= 1;
}if ((this.modifiers & 128) != 0) {
this.modifiers |= 2;
}if ((this.modifiers & 8192) != 0) {
this.modifiers |= 32;
}}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"MOUSE_FIRST", 500,
"MOUSE_LAST", 507,
"MOUSE_CLICKED", 500,
"MOUSE_PRESSED", 501,
"MOUSE_RELEASED", 502,
"MOUSE_MOVED", 503,
"MOUSE_ENTERED", 504,
"MOUSE_EXITED", 505,
"MOUSE_DRAGGED", 506,
"MOUSE_WHEEL", 507,
"NOBUTTON", 0,
"BUTTON1", 1,
"BUTTON2", 2,
"BUTTON3", 3);
});
