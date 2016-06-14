Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["javax.swing.plaf.ComponentUI", "swingjs.plaf.JSEventHandler"], "swingjs.plaf.JSComponentUI", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.awt.Color", "$.Component", "$.Dimension", "$.Point", "$.Toolkit", "java.awt.event.FocusEvent", "swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.c = null;
this.outerNode = null;
this.domNode = null;
this.enableNode = null;
this.textNode = null;
this.valueNode = null;
this.scrollNode = null;
this.focusNode = null;
this.components = null;
this.num = 0;
this.isTainted = true;
this.x = 0;
this.y = 0;
this.preferredSize = null;
this.isContainer = false;
this.parent = null;
this.currentText = null;
this.scrollerNode = null;
this.classID = null;
this.document = null;
this.body = null;
this.needPreferred = false;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSComponentUI", javax.swing.plaf.ComponentUI, swingjs.plaf.JSEventHandler);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSComponentUI, []);
this.setDoc ();
});
Clazz.defineMethod (c$, "setDoc", 
function () {
{
this.document = document;
this.body = document.body;
}});
Clazz.overrideMethod (c$, "installUI", 
function (c) {
}, "javax.swing.JComponent");
Clazz.overrideMethod (c$, "uninstallUI", 
function (c) {
this.uninstallJSUI ();
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "$", 
function (node) {
return swingjs.JSToolkit.getJQuery ().$ (node);
}, "swingjs.api.DOMNode");
Clazz.defineMethod (c$, "setTainted", 
function () {
this.isTainted = true;
});
Clazz.defineMethod (c$, "set", 
function (target) {
this.c = target;
this.newID ();
if (this.needPreferred) this.getPreferredSize (this.c);
this.installJSUI ();
return this;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "newID", 
function () {
this.classID = this.c.getUIClassID ();
if (this.id == null) {
this.num = ++swingjs.plaf.JSComponentUI.incr;
this.id = this.c.getHTMLName (this.classID) + "_" + this.num;
}});
Clazz.defineMethod (c$, "setCssFont", 
function (obj, font) {
if (font != null) {
var istyle = font.getStyle ();
var name = font.getFamily ();
if (name === "Dialog") name = "Arial";
swingjs.api.DOMNode.setStyles (obj, ["font-family", name, "font-size", font.getSize () + "px", "font-style", ((istyle & 2) == 0 ? "normal" : "italic"), "font-weight", ((istyle & 1) == 0 ? "normal" : "bold")]);
}if (this.c.isBackgroundSet ()) this.setBackground (this.c.getBackground ());
this.setForeground (this.c.getForeground ());
return obj;
}, "swingjs.api.DOMNode,java.awt.Font");
Clazz.defineMethod (c$, "createDOMObject", 
function (key, id, attr) {
var obj = swingjs.api.DOMNode.createElement (key, id);
for (var i = 0; i < attr.length; ) swingjs.api.DOMNode.setAttr (obj, attr[i++], attr[i++]);

if (!this.c.isEnabled ()) this.setEnabled (false);
return obj;
}, "~S,~S,~A");
Clazz.defineMethod (c$, "wrap", 
function (type, id, elements) {
return this.append (this.createDOMObject (type, id + type, []), elements);
}, "~S,~S,~A");
Clazz.defineMethod (c$, "append", 
function (obj, elements) {
for (var i = 0; i < elements.length; i++) {
obj.appendChild (elements[i]);
}
return obj;
}, "swingjs.api.DOMNode,~A");
Clazz.defineMethod (c$, "debugDump", 
function (d) {
System.out.println (swingjs.api.DOMNode.getAttr (d, "outerHTML"));
}, "swingjs.api.DOMNode");
c$.vCenter = Clazz.defineMethod (c$, "vCenter", 
function (obj, offset) {
swingjs.api.DOMNode.setStyles (obj, ["top", "50%", "transform", "translateY(" + offset + "%)"]);
}, "swingjs.api.DOMNode,~N");
Clazz.defineMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
return this.setHTMLSize1 (obj, addCSS, true);
}, "swingjs.api.DOMNode,~B");
Clazz.defineMethod (c$, "setHTMLSize1", 
function (node, addCSS, usePreferred) {
if (node == null) return null;
var h;
var w;
var w0 = null;
var h0 = null;
var parentNode = null;
if (this.scrollerNode != null) {
w = this.scrollerNode.c.getWidth ();
h = this.scrollerNode.c.getHeight ();
} else if (usePreferred && this.preferredSize != null) {
w = this.preferredSize.width;
h = this.preferredSize.height;
} else {
parentNode = swingjs.api.DOMNode.remove (node);
{
w0 = node.style.width;
h0 = node.style.height;
}swingjs.api.DOMNode.setStyles (node, ["position", null, "width", null, "height", null]);
var div;
if (swingjs.api.DOMNode.getAttr (node, "tagName") === "DIV") div = node;
 else div = this.wrap ("div", this.id + "_temp", [node]);
swingjs.api.DOMNode.setPositionAbsolute (div);
this.body.appendChild (div);
w = Clazz.doubleToInt (Math.ceil (this.$ (div).width () + 0.5));
h = Clazz.doubleToInt (Math.ceil (this.$ (div).height () + 0.5));
this.body.removeChild (div);
}var size = this.getCSSDimension (this.width = w, this.height = h);
if (addCSS) {
swingjs.api.DOMNode.setPositionAbsolute (node);
swingjs.api.DOMNode.setSize (node, size.width, size.height);
} else {
swingjs.api.DOMNode.setStyles (node, ["position", null]);
if (w0 != null) swingjs.api.DOMNode.setStyles (node, ["width", w0, "height", h0]);
}if (parentNode != null) parentNode.appendChild (node);
return size;
}, "swingjs.api.DOMNode,~B,~B");
Clazz.defineMethod (c$, "getCSSDimension", 
function (w, h) {
return  new java.awt.Dimension (w, h);
}, "~N,~N");
Clazz.defineMethod (c$, "setHTMLElement", 
function () {
return this.setHTMLElementCUI ();
});
Clazz.defineMethod (c$, "setHTMLElementCUI", 
function () {
if (!this.isTainted) return this.outerNode;
this.domNode = this.getDOMObject ();
if (this.outerNode == null) this.outerNode = this.wrap ("div", this.id, [this.domNode]);
swingjs.api.DOMNode.setPositionAbsolute (this.outerNode);
swingjs.api.DOMNode.setStyles (this.outerNode, ["left", (this.x = this.c.getX ()) + "px", "top", (this.y = this.c.getY ()) + "px"]);
if (this.isContainer) {
System.out.println ("JSComponentUI container " + this.id + " " + this.c.getBounds ());
swingjs.api.DOMNode.setSize (this.outerNode, this.width = this.c.getWidth (), this.height = this.c.getHeight ());
var children = (this.components == null ? this.c.getComponents () : this.components);
for (var i = children.length; --i >= 0; ) {
var ui = swingjs.JSToolkit.getUI (children[i], false);
if (ui == null) {
continue;
}if (ui.getOuterNode () == null) {
System.out.println ("JSCUI could not add " + ui.c.getName () + " to " + this.c.getName ());
} else {
this.outerNode.appendChild (ui.outerNode);
}ui.parent = this;
}
}this.isTainted = false;
return this.outerNode;
});
Clazz.defineMethod (c$, "getPreferredSize", 
function (c) {
var d = this.setHTMLSize (this.getDOMObject (), false);
return d;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "paint", 
function (g, c) {
if (c.isOpaque ()) {
g.setColor (c.getBackground ());
g.fillRect (0, 0, c.getWidth (), c.getHeight ());
}}, "java.awt.Graphics,javax.swing.JComponent");
Clazz.overrideMethod (c$, "update", 
function (g, c) {
var testing = false;
if (testing) {
g.setColor (java.awt.Color.red);
g.drawRect (0, 0, c.getWidth (), c.getHeight ());
System.out.println ("drawing " + c.getWidth () + " " + c.getHeight ());
}this.setHTMLElement ();
this.paint (g, c);
}, "java.awt.Graphics,javax.swing.JComponent");
Clazz.defineMethod (c$, "getMinimumSize", 
function (c) {
return this.getPreferredSize (c);
}, "javax.swing.JComponent");
Clazz.overrideMethod (c$, "getMaximumSize", 
function (c) {
return null;
}, "javax.swing.JComponent");
Clazz.overrideMethod (c$, "contains", 
function (c, x, y) {
return c.inside (x, y);
}, "javax.swing.JComponent,~N,~N");
c$.createUI = Clazz.overrideMethod (c$, "createUI", 
function (c) {
return null;
}, "javax.swing.JComponent");
Clazz.overrideMethod (c$, "getBaseline", 
function (c, width, height) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "javax.swing.JComponent,~N,~N");
Clazz.overrideMethod (c$, "getBaselineResizeBehavior", 
function (c) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}return java.awt.Component.BaselineResizeBehavior.OTHER;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getJSTextValue", 
function () {
return swingjs.api.DOMNode.getAttr (this.domNode, this.valueNode == null ? "innerHTML" : "value");
});
Clazz.defineMethod (c$, "notifyPropertyChanged", 
function (prop) {
this.notifyPropChangeCUI (prop);
}, "~S");
Clazz.defineMethod (c$, "notifyPropChangeCUI", 
function (prop) {
var obj = null;
var val = null;
var isStyle = false;
if (prop === "preferredSize") {
this.preferredSize = this.c.getPreferredSize ();
this.getPreferredSize ();
return;
}if (prop === "text") {
val = (this.c).getText ();
if (val.equals (this.currentText)) return;
this.currentText = val;
if (this.textNode != null) {
prop = "innerHTML";
obj = this.textNode;
} else if (this.valueNode != null) {
prop = "value";
obj = this.valueNode;
}}if (obj == null) {
System.out.println ("JSComponentUI: unrecognized prop: " + prop);
} else {
System.out.println ("JSComponentUI: setting " + this.id + " " + prop);
if (isStyle) swingjs.api.DOMNode.setStyles (obj, [prop, val]);
 else this.setProp (obj, prop, val);
}}, "~S");
Clazz.defineMethod (c$, "getOuterNode", 
function () {
return (this.outerNode == null ? this.setHTMLElement () : this.outerNode);
});
Clazz.defineMethod (c$, "setProp", 
function (obj, prop, val) {
return swingjs.api.DOMNode.setAttr (obj, prop, val);
}, "swingjs.api.DOMNode,~S,~S");
Clazz.overrideMethod (c$, "isObscured", 
function () {
swingjs.JSToolkit.notImplemented ("");
return false;
});
Clazz.overrideMethod (c$, "canDetermineObscurity", 
function () {
swingjs.JSToolkit.notImplemented ("");
return false;
});
Clazz.overrideMethod (c$, "setVisible", 
function (b) {
swingjs.api.DOMNode.setStyles (this.getOuterNode (), ["display", b ? "block" : "none"]);
}, "~B");
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
if (this.enableNode != null) swingjs.api.DOMNode.setAttr (this.enableNode, "disabled", (b ? null : "TRUE"));
}, "~B");
Clazz.defineMethod (c$, "paint", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "repaint", 
function (tm, x, y, width, height) {
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "print", 
function (g) {
swingjs.JSToolkit.notImplemented ("");
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setBounds", 
function (x, y, width, height, op) {
switch (op) {
case 2:
case 3:
case 4:
if (this.scrollerNode != null) {
width = Math.min (width, this.scrollerNode.c.getWidth ());
height = Math.min (height, this.scrollerNode.c.getHeight ());
}this.width = width;
this.height = height;
System.out.println (this.id + " setBounds " + x + " " + y + " " + width + " " + height + " op=" + op);
if (this.domNode != null) swingjs.api.DOMNode.setSize (this.domNode, width, height);
break;
}
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "handleEvent", 
function (e) {
swingjs.JSToolkit.notImplemented ("");
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "coalescePaintEvent", 
function (e) {
swingjs.JSToolkit.notImplemented ("");
}, "java.awt.event.PaintEvent");
Clazz.overrideMethod (c$, "getLocationOnScreen", 
function () {
var offset = this.$ (this.outerNode).offset ();
return  new java.awt.Point (offset.left, offset.top);
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
return this.getPreferredSize (this.c);
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
swingjs.JSToolkit.notImplemented ("");
return this.getPreferredSize (this.c);
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return java.awt.Toolkit.getDefaultToolkit ().getColorModel ();
});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return java.awt.Toolkit.getDefaultToolkit ();
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return this.c.getFontMetrics (font);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "dispose", 
function () {
swingjs.JSToolkit.notImplemented ("");
});
Clazz.overrideMethod (c$, "setForeground", 
function (color) {
if (this.domNode != null) swingjs.api.DOMNode.setStyles (this.domNode, ["color", swingjs.JSToolkit.getCSSColor (color == null ? java.awt.Color.black : color)]);
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setBackground", 
function (color) {
if (this.domNode != null) swingjs.api.DOMNode.setStyles (this.domNode, ["background-color", swingjs.JSToolkit.getCSSColor (color == null ? java.awt.Color.white : color)]);
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setFont", 
function (f) {
if (this.domNode != null) this.setCssFont (this.domNode, f);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "updateCursorImmediately", 
function () {
swingjs.JSToolkit.notImplemented ("");
});
Clazz.overrideMethod (c$, "requestFocus", 
function (lightweightChild, temporary, focusedWindowChangeAllowed, time, cause) {
if (this.focusNode == null) return false;
this.$ (this.focusNode).focus ();
if (this.textNode != null) this.$ (this.textNode).select ();
return true;
}, "java.awt.Component,~B,~B,~N,jssun.awt.CausedFocusEvent.Cause");
Clazz.overrideMethod (c$, "isFocusable", 
function () {
return (this.focusNode != null);
});
Clazz.defineMethod (c$, "createImage", 
function (producer) {
swingjs.JSToolkit.notImplemented ("");
return null;
}, "java.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (width, height) {
swingjs.JSToolkit.notImplemented ("");
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "createVolatileImage", 
function (width, height) {
swingjs.JSToolkit.notImplemented ("");
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "prepareImage", 
function (img, w, h, o) {
swingjs.JSToolkit.notImplemented ("");
return false;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "checkImage", 
function (img, w, h, o) {
swingjs.JSToolkit.notImplemented ("");
return 0;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getGraphicsConfiguration", 
function () {
swingjs.JSToolkit.notImplemented ("");
return null;
});
Clazz.overrideMethod (c$, "handlesWheelScrolling", 
function () {
swingjs.JSToolkit.notImplemented ("");
return false;
});
Clazz.overrideMethod (c$, "getBackBuffer", 
function () {
swingjs.JSToolkit.notImplemented ("");
return null;
});
Clazz.overrideMethod (c$, "destroyBuffers", 
function () {
swingjs.JSToolkit.notImplemented ("");
});
Clazz.overrideMethod (c$, "reparent", 
function (newContainer) {
swingjs.JSToolkit.notImplemented ("");
}, "java.awt.peer.ContainerPeer");
Clazz.overrideMethod (c$, "isReparentSupported", 
function () {
swingjs.JSToolkit.notImplemented ("");
return false;
});
Clazz.overrideMethod (c$, "layout", 
function () {
swingjs.JSToolkit.notImplemented ("");
});
Clazz.overrideMethod (c$, "getBounds", 
function () {
swingjs.JSToolkit.notImplemented ("");
return null;
});
Clazz.defineMethod (c$, "hasFocus", 
function () {
return this.focusNode != null && this.focusNode === swingjs.api.DOMNode.getAttr (this.document, "activeElement");
});
Clazz.defineMethod (c$, "notifyFocus", 
function (focusGained) {
java.awt.Toolkit.getEventQueue ().postEvent ( new java.awt.event.FocusEvent (this.c, focusGained ? 1004 : 1005));
}, "~B");
Clazz.defineMethod (c$, "setFocusable", 
function () {
var node = this.$ (this.focusNode);
var me = this;
{
node.focus(function() {me.notifyFocus(true)});
node.blur(function() {me.notifyFocus(false)});
}});
Clazz.defineMethod (c$, "bindKeys", 
function (domNode) {
var f = null;
var me = this;
{
f = function(event) { me.handleJSEvent(me.domNode, 401, event)
}
}this.$ (domNode).bind ("keydown keypress keyup", f);
}, "swingjs.api.DOMNode");
Clazz.defineMethod (c$, "bindMouse", 
function (node) {
swingjs.api.DOMNode.setAttr (node, "data-UI", this);
}, "swingjs.api.DOMNode");
Clazz.overrideMethod (c$, "handleJSEvent", 
function (target, eventType, jQueryEvent) {
return true;
}, "~O,~N,~O");
Clazz.defineStatics (c$,
"incr", 0);
});
