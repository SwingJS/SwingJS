Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Panel", "jsjavax.swing.Popup", "$.SwingHeavyWeight", "jsjava.awt.BorderLayout"], "jsjavax.swing.PopupFactory", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.ArrayList", "$.HashMap", "jsjava.applet.Applet", "jsjava.awt.Container", "$.Insets", "$.Rectangle", "$.Toolkit", "$.Window", "jsjava.awt.event.WindowAdapter", "jsjavax.swing.ClientPropertyKey", "$.JApplet", "$.JComponent", "$.JDialog", "$.JFrame", "$.JLayeredPane", "$.JPanel", "$.JPopupMenu", "$.JRootPane", "$.JSeparator", "$.JToolTip", "$.JWindow", "$.MenuElement", "jsjavax.swing.Popup.DefaultFrame", "$.HeavyWeightWindow", "jsjavax.swing.RootPaneContainer", "$.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.popupType = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "PopupFactory");
c$.setSharedInstance = Clazz.defineMethod (c$, "setSharedInstance", 
function (factory) {
if (factory == null) {
throw  new IllegalArgumentException ("PopupFactory can not be null");
}jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.PopupFactory.SharedInstanceKey, factory);
}, "jsjavax.swing.PopupFactory");
c$.getSharedInstance = Clazz.defineMethod (c$, "getSharedInstance", 
function () {
var factory = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.PopupFactory.SharedInstanceKey);
if (factory == null) {
factory =  new jsjavax.swing.PopupFactory ();
jsjavax.swing.PopupFactory.setSharedInstance (factory);
}return factory;
});
Clazz.defineMethod (c$, "setPopupType", 
function (type) {
this.popupType = type;
}, "~N");
Clazz.defineMethod (c$, "getPopupType", 
function () {
return this.popupType;
});
Clazz.defineMethod (c$, "getPopup", 
function (owner, contents, x, y) {
if (contents == null) {
throw  new IllegalArgumentException ("Popup.getPopup must be passed non-null contents");
}var popupType = this.getPopupType (owner, contents, x, y);
var popup = this.getPopup (owner, contents, x, y, popupType);
if (popup == null) {
popup = this.getPopup (owner, contents, x, y, 2);
}return popup;
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getPopupType", 
($fz = function (owner, contents, ownerX, ownerY) {
var popupType = this.getPopupType ();
if (owner == null || this.invokerInHeavyWeightPopup (owner)) {
popupType = 2;
} else if (popupType == 0 && !(Clazz.instanceOf (contents, jsjavax.swing.JToolTip)) && !(Clazz.instanceOf (contents, jsjavax.swing.JPopupMenu))) {
popupType = 1;
}var c = owner;
while (c != null) {
if (Clazz.instanceOf (c, jsjavax.swing.JComponent)) {
if ((c).getClientProperty (jsjavax.swing.ClientPropertyKey.PopupFactory_FORCE_HEAVYWEIGHT_POPUP) === Boolean.TRUE) {
popupType = 2;
break;
}}c = c.getParent ();
}
return popupType;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getPopup", 
($fz = function (owner, contents, ownerX, ownerY, popupType) {
switch (popupType) {
case 0:
return this.getLightWeightPopup (owner, contents, ownerX, ownerY);
case 1:
return this.getMediumWeightPopup (owner, contents, ownerX, ownerY);
case 2:
return this.getHeavyWeightPopup (owner, contents, ownerX, ownerY);
}
return null;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "getLightWeightPopup", 
($fz = function (owner, contents, ownerX, ownerY) {
return jsjavax.swing.PopupFactory.LightWeightPopup.getLightWeightPopup (owner, contents, ownerX, ownerY);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getMediumWeightPopup", 
($fz = function (owner, contents, ownerX, ownerY) {
return jsjavax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopup (owner, contents, ownerX, ownerY);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getHeavyWeightPopup", 
($fz = function (owner, contents, ownerX, ownerY) {
return jsjavax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopup (owner, contents, ownerX, ownerY);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "invokerInHeavyWeightPopup", 
($fz = function (i) {
if (i != null) {
var parent;
for (parent = i.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, jsjavax.swing.Popup.HeavyWeightWindow)) {
return true;
}}
}return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.PopupFactory, "HeavyWeightPopup", jsjavax.swing.Popup);
c$.getHeavyWeightPopup = Clazz.defineMethod (c$, "getHeavyWeightPopup", 
function (a, b, c, d) {
var e = (a != null) ? jsjavax.swing.SwingUtilities.getWindowAncestor (a) : null;
var f = null;
if (e != null) {
f = jsjavax.swing.PopupFactory.HeavyWeightPopup.getRecycledHeavyWeightPopup (e);
}var g = false;
if (b != null && b.isFocusable ()) {
if (Clazz.instanceOf (b, jsjavax.swing.JPopupMenu)) {
var h = b;
var i = h.getComponents ();
for (var j = 0; j < i.length; j++) {
if (!(Clazz.instanceOf (i[j], jsjavax.swing.MenuElement)) && !(Clazz.instanceOf (i[j], jsjavax.swing.JSeparator))) {
g = true;
break;
}}
}}if (f == null || (f.getComponent ()).getFocusableWindowState () != g) {
if (f != null) {
f._dispose ();
}f =  new jsjavax.swing.PopupFactory.HeavyWeightPopup ();
}f.reset (a, b, c, d);
if (g) {
var h = f.getComponent ();
h.setFocusableWindowState (true);
h.setName ("###focusableSwingPopup###");
}return f;
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
c$.getRecycledHeavyWeightPopup = Clazz.defineMethod (c$, "getRecycledHeavyWeightPopup", 
($fz = function (a) {
{
var b;
var c = jsjavax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
if (c.containsKey (a)) {
b = c.get (a);
} else {
return null;
}var d;
if ((d = b.size ()) > 0) {
var e = b.get (0);
b.remove (0);
return e;
}return null;
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Window");
c$.getHeavyWeightPopupCache = Clazz.defineMethod (c$, "getHeavyWeightPopupCache", 
($fz = function () {
{
var a = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.PopupFactory.HeavyWeightPopup.heavyWeightPopupCacheKey);
if (a == null) {
a =  new java.util.HashMap (2);
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.PopupFactory.HeavyWeightPopup.heavyWeightPopupCacheKey, a);
}return a;
}}, $fz.isPrivate = true, $fz));
c$.recycleHeavyWeightPopup = Clazz.defineMethod (c$, "recycleHeavyWeightPopup", 
($fz = function (a) {
{
var b;
var c = jsjavax.swing.SwingUtilities.getWindowAncestor (a.getComponent ());
var d = jsjavax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
if (Clazz.instanceOf (c, jsjavax.swing.Popup.DefaultFrame) || !(c).isVisible ()) {
a._dispose ();
return;
} else if (d.containsKey (c)) {
b = d.get (c);
} else {
b =  new java.util.ArrayList ();
d.put (c, b);
var e = c;
e.addWindowListener (((Clazz.isClassDefined ("jsjavax.swing.PopupFactory$HeavyWeightPopup$1") ? 0 : jsjavax.swing.PopupFactory.HeavyWeightPopup.$PopupFactory$HeavyWeightPopup$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.PopupFactory$HeavyWeightPopup$1, this, Clazz.cloneFinals ("e", e))));
}if (b.size () < 5) {
b.add (a);
} else {
a._dispose ();
}}}, $fz.isPrivate = true, $fz), "jsjavax.swing.PopupFactory.HeavyWeightPopup");
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, jsjavax.swing.PopupFactory.HeavyWeightPopup, "hide", []);
jsjavax.swing.PopupFactory.HeavyWeightPopup.recycleHeavyWeightPopup (this);
});
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "_dispose", 
function () {
Clazz.superCall (this, jsjavax.swing.PopupFactory.HeavyWeightPopup, "dispose", []);
});
c$.$PopupFactory$HeavyWeightPopup$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "PopupFactory$HeavyWeightPopup$1", jsjava.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosed", 
function (a) {
var b;
{
var c = jsjavax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
b = c.remove (this.f$.e);
}if (b != null) {
for (var c = b.size () - 1; c >= 0; c--) {
(b.get (c))._dispose ();
}
}}, "jsjava.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.heavyWeightPopupCacheKey = c$.prototype.heavyWeightPopupCacheKey =  new JavaObject ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.owner = null;
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.PopupFactory, "ContainerPopup", jsjavax.swing.Popup);
Clazz.overrideMethod (c$, "hide", 
function () {
var a = this.getComponent ();
if (a != null) {
var b = a.getParent ();
if (b != null) {
var c = a.getBounds ();
b.remove (a);
b.repaint (c.x, c.y, c.width, c.height);
}}this.owner = null;
});
Clazz.overrideMethod (c$, "pack", 
function () {
var a = this.getComponent ();
if (a != null) {
a.setSize (a.getPreferredSize ());
}});
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d) {
if ((Clazz.instanceOf (a, jsjavax.swing.JFrame)) || (Clazz.instanceOf (a, jsjavax.swing.JDialog)) || (Clazz.instanceOf (a, jsjavax.swing.JWindow))) {
a = (a).getLayeredPane ();
}Clazz.superCall (this, jsjavax.swing.PopupFactory.ContainerPopup, "reset", [a, b, c, d]);
this.x = c;
this.y = d;
this.owner = a;
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "overlappedByOwnedWindow", 
function () {
var a = this.getComponent ();
if (this.owner != null && a != null) {
var b = jsjavax.swing.SwingUtilities.getWindowAncestor (this.owner);
if (b == null) {
return false;
}var c = b.getOwnedWindows ();
if (c != null) {
var d = a.getBounds ();
for (var e = 0; e < c.length; e++) {
var f = c[e];
if (f.isVisible () && d.intersects (f.getBounds ())) {
return true;
}}
}}return false;
});
Clazz.defineMethod (c$, "fitsOnScreen", 
function () {
var a = this.getComponent ();
if (this.owner != null && a != null) {
var b;
var c = a.getWidth ();
var d = a.getHeight ();
for (b = this.owner.getParent (); b != null; b = b.getParent ()) {
if (Clazz.instanceOf (b, jsjavax.swing.JFrame) || Clazz.instanceOf (b, jsjavax.swing.JDialog) || Clazz.instanceOf (b, jsjavax.swing.JWindow)) {
var e = b.getBounds ();
var f = b.getInsets ();
e.x += f.left;
e.y += f.top;
e.width -= (f.left + f.right);
e.height -= (f.top + f.bottom);
var g = b.getGraphicsConfiguration ();
var h = this.getContainerPopupArea (g);
return e.intersection (h).contains (this.x, this.y, c, d);
} else if (Clazz.instanceOf (b, jsjavax.swing.JApplet)) {
var e = b.getBounds ();
var f = b.getLocationOnScreen ();
e.x = f.x;
e.y = f.y;
return e.contains (this.x, this.y, c, d);
} else if (Clazz.instanceOf (b, jsjava.awt.Window) || Clazz.instanceOf (b, jsjava.applet.Applet)) {
break;
}}
}return false;
});
Clazz.defineMethod (c$, "getContainerPopupArea", 
function (a) {
var b;
var c = jsjava.awt.Toolkit.getDefaultToolkit ();
var d;
if (a != null) {
b = a.getBounds ();
d = c.getScreenInsets (a);
} else {
b =  new jsjava.awt.Rectangle (c.getScreenSize ());
d =  new jsjava.awt.Insets (0, 0, 0, 0);
}b.x += d.left;
b.y += d.top;
b.width -= (d.left + d.right);
b.height -= (d.top + d.bottom);
return b;
}, "jsjava.awt.GraphicsConfiguration");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.PopupFactory, "LightWeightPopup", jsjavax.swing.PopupFactory.ContainerPopup);
c$.getLightWeightPopup = Clazz.defineMethod (c$, "getLightWeightPopup", 
function (a, b, c, d) {
var e = null;
if (e == null) {
e =  new jsjavax.swing.PopupFactory.LightWeightPopup ();
}e.reset (a, b, c, d);
if (!e.fitsOnScreen () || e.overlappedByOwnedWindow ()) {
e.hide ();
return null;
}return e;
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, jsjavax.swing.PopupFactory.LightWeightPopup, "hide", []);
var a = this.getComponent ();
a.removeAll ();
});
Clazz.overrideMethod (c$, "show", 
function () {
var a = null;
if (this.owner != null) {
a = (Clazz.instanceOf (this.owner, jsjava.awt.Container) ? this.owner : this.owner.getParent ());
}for (var b = a; b != null; b = b.getParent ()) {
if (Clazz.instanceOf (b, jsjavax.swing.JRootPane)) {
a = (b).getLayeredPane ();
} else if (Clazz.instanceOf (b, jsjava.awt.Window)) {
if (a == null) {
a = b;
}break;
} else if (Clazz.instanceOf (b, jsjavax.swing.JApplet)) {
break;
}}
var c = jsjavax.swing.SwingUtilities.convertScreenLocationToParent (a, this.x, this.y);
var d = this.getComponent ();
d.setLocation (c.x, c.y);
if (Clazz.instanceOf (a, jsjavax.swing.JLayeredPane)) {
(a).add (d, jsjavax.swing.JLayeredPane.POPUP_LAYER, 0);
} else {
a.add (d);
}});
Clazz.overrideMethod (c$, "createComponent", 
function (a) {
var b =  new jsjavax.swing.JPanel ( new jsjava.awt.BorderLayout (), true);
b.setOpaque (true);
return b;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d) {
Clazz.superCall (this, jsjavax.swing.PopupFactory.LightWeightPopup, "reset", [a, b, c, d]);
var e = this.getComponent ();
e.setOpaque (b.isOpaque ());
e.setLocation (c, d);
e.add (b, "Center");
b.invalidate ();
this.pack ();
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
c$.lightWeightPopupCacheKey = c$.prototype.lightWeightPopupCacheKey =  new JavaObject ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.rootPane = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.PopupFactory, "MediumWeightPopup", jsjavax.swing.PopupFactory.ContainerPopup);
c$.getMediumWeightPopup = Clazz.defineMethod (c$, "getMediumWeightPopup", 
function (a, b, c, d) {
var e = jsjavax.swing.PopupFactory.MediumWeightPopup.getRecycledMediumWeightPopup ();
if (e == null) {
e =  new jsjavax.swing.PopupFactory.MediumWeightPopup ();
}e.reset (a, b, c, d);
if (!e.fitsOnScreen () || e.overlappedByOwnedWindow ()) {
e.hide ();
return null;
}return e;
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
c$.getMediumWeightPopupCache = Clazz.defineMethod (c$, "getMediumWeightPopupCache", 
($fz = function () {
var a = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.PopupFactory.MediumWeightPopup.mediumWeightPopupCacheKey);
if (a == null) {
a =  new java.util.ArrayList ();
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.PopupFactory.MediumWeightPopup.mediumWeightPopupCacheKey, a);
}return a;
}, $fz.isPrivate = true, $fz));
c$.recycleMediumWeightPopup = Clazz.defineMethod (c$, "recycleMediumWeightPopup", 
($fz = function (a) {
{
var b = jsjavax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopupCache ();
if (b.size () < 5) {
b.add (a);
}}}, $fz.isPrivate = true, $fz), "jsjavax.swing.PopupFactory.MediumWeightPopup");
c$.getRecycledMediumWeightPopup = Clazz.defineMethod (c$, "getRecycledMediumWeightPopup", 
($fz = function () {
{
var a = jsjavax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopupCache ();
var b;
if ((b = a.size ()) > 0) {
var c = a.get (0);
a.remove (0);
return c;
}return null;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, jsjavax.swing.PopupFactory.MediumWeightPopup, "hide", []);
this.rootPane.getContentPane ().removeAll ();
jsjavax.swing.PopupFactory.MediumWeightPopup.recycleMediumWeightPopup (this);
});
Clazz.overrideMethod (c$, "show", 
function () {
var a = this.getComponent ();
var b = null;
if (this.owner != null) {
b = this.owner.getParent ();
}while (!(Clazz.instanceOf (b, jsjava.awt.Window) || Clazz.instanceOf (b, jsjava.applet.Applet)) && (b != null)) {
b = b.getParent ();
}
if (Clazz.instanceOf (b, jsjavax.swing.RootPaneContainer)) {
b = (b).getLayeredPane ();
var c = jsjavax.swing.SwingUtilities.convertScreenLocationToParent (b, this.x, this.y);
a.setVisible (false);
a.setLocation (c.x, c.y);
(b).add (a, jsjavax.swing.JLayeredPane.POPUP_LAYER, 0);
} else {
var c = jsjavax.swing.SwingUtilities.convertScreenLocationToParent (b, this.x, this.y);
a.setLocation (c.x, c.y);
a.setVisible (false);
b.add (a);
}a.setVisible (true);
});
Clazz.overrideMethod (c$, "createComponent", 
function (a) {
var b =  new jsjavax.swing.PopupFactory.MediumWeightPopup.MediumWeightComponent ();
this.rootPane =  new jsjavax.swing.JRootPane ();
this.rootPane.setOpaque (true);
b.add (this.rootPane, "Center");
return b;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d) {
Clazz.superCall (this, jsjavax.swing.PopupFactory.MediumWeightPopup, "reset", [a, b, c, d]);
var e = this.getComponent ();
e.setLocation (c, d);
this.rootPane.getContentPane ().add (b, "Center");
b.invalidate ();
e.validate ();
this.pack ();
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.PopupFactory.MediumWeightPopup, "MediumWeightComponent", jsjava.awt.Panel, jsjavax.swing.SwingHeavyWeight);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.PopupFactory.MediumWeightPopup.MediumWeightComponent, [ new jsjava.awt.BorderLayout ()]);
});
c$ = Clazz.p0p ();
c$.mediumWeightPopupCacheKey = c$.prototype.mediumWeightPopupCacheKey =  new JavaObject ();
c$ = Clazz.p0p ();
c$.SharedInstanceKey = c$.prototype.SharedInstanceKey =  new JavaObject ();
Clazz.defineStatics (c$,
"MAX_CACHE_SIZE", 5,
"LIGHT_WEIGHT_POPUP", 0,
"MEDIUM_WEIGHT_POPUP", 1,
"HEAVY_WEIGHT_POPUP", 2);
});
