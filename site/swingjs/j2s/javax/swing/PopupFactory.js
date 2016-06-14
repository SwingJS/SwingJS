Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Panel", "javax.swing.Popup", "$.SwingHeavyWeight", "java.awt.BorderLayout"], "javax.swing.PopupFactory", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.ArrayList", "$.HashMap", "java.applet.Applet", "java.awt.Container", "$.Insets", "$.Rectangle", "$.Toolkit", "$.Window", "java.awt.event.WindowAdapter", "javax.swing.ClientPropertyKey", "$.JApplet", "$.JComponent", "$.JDialog", "$.JFrame", "$.JLayeredPane", "$.JPanel", "$.JPopupMenu", "$.JRootPane", "$.JSeparator", "$.JToolTip", "$.JWindow", "$.MenuElement", "$.RootPaneContainer", "$.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.popupType = 0;
Clazz.instantialize (this, arguments);
}, javax.swing, "PopupFactory");
c$.setSharedInstance = Clazz.defineMethod (c$, "setSharedInstance", 
function (factory) {
if (factory == null) {
throw  new IllegalArgumentException ("PopupFactory can not be null");
}javax.swing.SwingUtilities.appContextPut (javax.swing.PopupFactory.SharedInstanceKey, factory);
}, "javax.swing.PopupFactory");
c$.getSharedInstance = Clazz.defineMethod (c$, "getSharedInstance", 
function () {
var factory = javax.swing.SwingUtilities.appContextGet (javax.swing.PopupFactory.SharedInstanceKey);
if (factory == null) {
factory =  new javax.swing.PopupFactory ();
javax.swing.PopupFactory.setSharedInstance (factory);
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
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getPopupType", 
 function (owner, contents, ownerX, ownerY) {
var popupType = this.getPopupType ();
if (owner == null || this.invokerInHeavyWeightPopup (owner)) {
popupType = 2;
} else if (popupType == 0 && !(Clazz.instanceOf (contents, javax.swing.JToolTip)) && !(Clazz.instanceOf (contents, javax.swing.JPopupMenu))) {
popupType = 1;
}var c = owner;
while (c != null) {
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
if ((c).getClientProperty (javax.swing.ClientPropertyKey.PopupFactory_FORCE_HEAVYWEIGHT_POPUP) === Boolean.TRUE) {
popupType = 2;
break;
}}c = c.getParent ();
}
return popupType;
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getPopup", 
 function (owner, contents, ownerX, ownerY, popupType) {
switch (popupType) {
case 0:
return this.getLightWeightPopup (owner, contents, ownerX, ownerY);
case 1:
return this.getMediumWeightPopup (owner, contents, ownerX, ownerY);
case 2:
return this.getHeavyWeightPopup (owner, contents, ownerX, ownerY);
}
return null;
}, "java.awt.Component,java.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "getLightWeightPopup", 
 function (owner, contents, ownerX, ownerY) {
return javax.swing.PopupFactory.LightWeightPopup.getLightWeightPopup (owner, contents, ownerX, ownerY);
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getMediumWeightPopup", 
 function (owner, contents, ownerX, ownerY) {
return javax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopup (owner, contents, ownerX, ownerY);
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getHeavyWeightPopup", 
 function (owner, contents, ownerX, ownerY) {
return javax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopup (owner, contents, ownerX, ownerY);
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "invokerInHeavyWeightPopup", 
 function (i) {
if (i != null) {
var parent;
for (parent = i.getParent (); parent != null; parent = parent.getParent ()) {
if (javax.swing.Popup.isHeavyWeight (parent)) {
return true;
}}
}return false;
}, "java.awt.Component");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.PopupFactory, "HeavyWeightPopup", javax.swing.Popup);
c$.getHeavyWeightPopup = Clazz.defineMethod (c$, "getHeavyWeightPopup", 
function (a, b, c, d) {
var e = (a != null) ? javax.swing.SwingUtilities.getWindowAncestor (a) : null;
var f = null;
if (e != null) {
f = javax.swing.PopupFactory.HeavyWeightPopup.getRecycledHeavyWeightPopup (e);
}var g = false;
if (b != null && b.isFocusable ()) {
if (Clazz.instanceOf (b, javax.swing.JPopupMenu)) {
var h = b;
var i = h.getComponents ();
for (var j = 0; j < i.length; j++) {
if (!(Clazz.instanceOf (i[j], javax.swing.MenuElement)) && !(Clazz.instanceOf (i[j], javax.swing.JSeparator))) {
g = true;
break;
}}
}}if (f == null || (f.getComponent ()).getFocusableWindowState () != g) {
if (f != null) {
f._dispose ();
}f =  new javax.swing.PopupFactory.HeavyWeightPopup ();
}f.reset (a, b, c, d);
if (g) {
var h = f.getComponent ();
h.setFocusableWindowState (true);
h.setName ("###focusableSwingPopup###");
}return f;
}, "java.awt.Component,java.awt.Component,~N,~N");
c$.getRecycledHeavyWeightPopup = Clazz.defineMethod (c$, "getRecycledHeavyWeightPopup", 
 function (a) {
{
var b;
var c = javax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
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
}}, "java.awt.Window");
c$.getHeavyWeightPopupCache = Clazz.defineMethod (c$, "getHeavyWeightPopupCache", 
 function () {
{
var a = javax.swing.SwingUtilities.appContextGet (javax.swing.PopupFactory.HeavyWeightPopup.heavyWeightPopupCacheKey);
if (a == null) {
a =  new java.util.HashMap (2);
javax.swing.SwingUtilities.appContextPut (javax.swing.PopupFactory.HeavyWeightPopup.heavyWeightPopupCacheKey, a);
}return a;
}});
c$.recycleHeavyWeightPopup = Clazz.defineMethod (c$, "recycleHeavyWeightPopup", 
 function (a) {
{
var b;
var c = javax.swing.SwingUtilities.getWindowAncestor (a.getComponent ());
var d = javax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
if (javax.swing.Popup.isDefaultFrame (c) || !(c).isVisible ()) {
a._dispose ();
return;
} else if (d.containsKey (c)) {
b = d.get (c);
} else {
b =  new java.util.ArrayList ();
d.put (c, b);
var e = c;
e.addWindowListener (((Clazz.isClassDefined ("javax.swing.PopupFactory$HeavyWeightPopup$1") ? 0 : javax.swing.PopupFactory.HeavyWeightPopup.$PopupFactory$HeavyWeightPopup$1$ ()), Clazz.innerTypeInstance (javax.swing.PopupFactory$HeavyWeightPopup$1, this, Clazz.cloneFinals ("e", e))));
}if (b.size () < 5) {
b.add (a);
} else {
a._dispose ();
}}}, "javax.swing.PopupFactory.HeavyWeightPopup");
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, javax.swing.PopupFactory.HeavyWeightPopup, "hide", []);
javax.swing.PopupFactory.HeavyWeightPopup.recycleHeavyWeightPopup (this);
});
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "_dispose", 
function () {
Clazz.superCall (this, javax.swing.PopupFactory.HeavyWeightPopup, "dispose", []);
});
c$.$PopupFactory$HeavyWeightPopup$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "PopupFactory$HeavyWeightPopup$1", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosed", 
function (a) {
var b;
{
var c = javax.swing.PopupFactory.HeavyWeightPopup.getHeavyWeightPopupCache ();
b = c.remove (this.f$.e);
}if (b != null) {
for (var c = b.size () - 1; c >= 0; c--) {
(b.get (c))._dispose ();
}
}}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.heavyWeightPopupCacheKey = c$.prototype.heavyWeightPopupCacheKey =  new Clazz._O ();
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.owner = null;
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.PopupFactory, "ContainerPopup", javax.swing.Popup);
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
if ((Clazz.instanceOf (a, javax.swing.JFrame)) || (Clazz.instanceOf (a, javax.swing.JDialog)) || (Clazz.instanceOf (a, javax.swing.JWindow))) {
a = (a).getLayeredPane ();
}Clazz.superCall (this, javax.swing.PopupFactory.ContainerPopup, "reset", [a, b, c, d]);
this.x = c;
this.y = d;
this.owner = a;
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "overlappedByOwnedWindow", 
function () {
var a = this.getComponent ();
if (this.owner != null && a != null) {
var b = javax.swing.SwingUtilities.getWindowAncestor (this.owner);
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
if (Clazz.instanceOf (b, javax.swing.JFrame) || Clazz.instanceOf (b, javax.swing.JDialog) || Clazz.instanceOf (b, javax.swing.JWindow)) {
var e = b.getBounds ();
var f = b.getInsets ();
e.x += f.left;
e.y += f.top;
e.width -= (f.left + f.right);
e.height -= (f.top + f.bottom);
var g = b.getGraphicsConfiguration ();
var h = this.getContainerPopupArea (g);
return e.intersection (h).contains (this.x, this.y, c, d);
} else if (Clazz.instanceOf (b, javax.swing.JApplet)) {
var e = b.getBounds ();
var f = b.getLocationOnScreen ();
e.x = f.x;
e.y = f.y;
return e.contains (this.x, this.y, c, d);
} else if (Clazz.instanceOf (b, java.awt.Window) || Clazz.instanceOf (b, java.applet.Applet)) {
break;
}}
}return false;
});
Clazz.defineMethod (c$, "getContainerPopupArea", 
function (a) {
var b;
var c = java.awt.Toolkit.getDefaultToolkit ();
var d;
if (a != null) {
b = a.getBounds ();
d = c.getScreenInsets (a);
} else {
b =  new java.awt.Rectangle (c.getScreenSize ());
d =  new java.awt.Insets (0, 0, 0, 0);
}b.x += d.left;
b.y += d.top;
b.width -= (d.left + d.right);
b.height -= (d.top + d.bottom);
return b;
}, "java.awt.GraphicsConfiguration");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.PopupFactory, "LightWeightPopup", javax.swing.PopupFactory.ContainerPopup);
c$.getLightWeightPopup = Clazz.defineMethod (c$, "getLightWeightPopup", 
function (a, b, c, d) {
var e = null;
if (e == null) {
e =  new javax.swing.PopupFactory.LightWeightPopup ();
}e.reset (a, b, c, d);
if (!e.fitsOnScreen () || e.overlappedByOwnedWindow ()) {
e.hide ();
return null;
}return e;
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, javax.swing.PopupFactory.LightWeightPopup, "hide", []);
var a = this.getComponent ();
a.removeAll ();
});
Clazz.overrideMethod (c$, "show", 
function () {
var a = null;
if (this.owner != null) {
a = (Clazz.instanceOf (this.owner, java.awt.Container) ? this.owner : this.owner.getParent ());
}for (var b = a; b != null; b = b.getParent ()) {
if (Clazz.instanceOf (b, javax.swing.JRootPane)) {
a = (b).getLayeredPane ();
} else if (Clazz.instanceOf (b, java.awt.Window)) {
if (a == null) {
a = b;
}break;
} else if (Clazz.instanceOf (b, javax.swing.JApplet)) {
break;
}}
var c = javax.swing.SwingUtilities.convertScreenLocationToParent (a, this.x, this.y);
var d = this.getComponent ();
d.setLocation (c.x, c.y);
if (Clazz.instanceOf (a, javax.swing.JLayeredPane)) {
(a).add (d, javax.swing.JLayeredPane.POPUP_LAYER, 0);
} else {
a.add (d);
}});
Clazz.overrideMethod (c$, "createComponent", 
function (a) {
var b =  new javax.swing.JPanel ( new java.awt.BorderLayout (), true);
b.setOpaque (true);
return b;
}, "java.awt.Component");
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d) {
Clazz.superCall (this, javax.swing.PopupFactory.LightWeightPopup, "reset", [a, b, c, d]);
var e = this.getComponent ();
e.setOpaque (b.isOpaque ());
e.setLocation (c, d);
e.add (b, "Center");
b.invalidate ();
this.pack ();
}, "java.awt.Component,java.awt.Component,~N,~N");
c$.lightWeightPopupCacheKey = c$.prototype.lightWeightPopupCacheKey =  new Clazz._O ();
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.rootPane = null;
Clazz.instantialize (this, arguments);
}, javax.swing.PopupFactory, "MediumWeightPopup", javax.swing.PopupFactory.ContainerPopup);
c$.getMediumWeightPopup = Clazz.defineMethod (c$, "getMediumWeightPopup", 
function (a, b, c, d) {
var e = javax.swing.PopupFactory.MediumWeightPopup.getRecycledMediumWeightPopup ();
if (e == null) {
e =  new javax.swing.PopupFactory.MediumWeightPopup ();
}e.reset (a, b, c, d);
if (!e.fitsOnScreen () || e.overlappedByOwnedWindow ()) {
e.hide ();
return null;
}return e;
}, "java.awt.Component,java.awt.Component,~N,~N");
c$.getMediumWeightPopupCache = Clazz.defineMethod (c$, "getMediumWeightPopupCache", 
 function () {
var a = javax.swing.SwingUtilities.appContextGet (javax.swing.PopupFactory.MediumWeightPopup.mediumWeightPopupCacheKey);
if (a == null) {
a =  new java.util.ArrayList ();
javax.swing.SwingUtilities.appContextPut (javax.swing.PopupFactory.MediumWeightPopup.mediumWeightPopupCacheKey, a);
}return a;
});
c$.recycleMediumWeightPopup = Clazz.defineMethod (c$, "recycleMediumWeightPopup", 
 function (a) {
{
var b = javax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopupCache ();
if (b.size () < 5) {
b.add (a);
}}}, "javax.swing.PopupFactory.MediumWeightPopup");
c$.getRecycledMediumWeightPopup = Clazz.defineMethod (c$, "getRecycledMediumWeightPopup", 
 function () {
{
var a = javax.swing.PopupFactory.MediumWeightPopup.getMediumWeightPopupCache ();
var b;
if ((b = a.size ()) > 0) {
var c = a.get (0);
a.remove (0);
return c;
}return null;
}});
Clazz.defineMethod (c$, "hide", 
function () {
Clazz.superCall (this, javax.swing.PopupFactory.MediumWeightPopup, "hide", []);
this.rootPane.getContentPane ().removeAll ();
javax.swing.PopupFactory.MediumWeightPopup.recycleMediumWeightPopup (this);
});
Clazz.overrideMethod (c$, "show", 
function () {
var a = this.getComponent ();
var b = null;
if (this.owner != null) {
b = this.owner.getParent ();
}while (!(Clazz.instanceOf (b, java.awt.Window) || Clazz.instanceOf (b, java.applet.Applet)) && (b != null)) {
b = b.getParent ();
}
if (Clazz.instanceOf (b, javax.swing.RootPaneContainer)) {
b = (b).getLayeredPane ();
var c = javax.swing.SwingUtilities.convertScreenLocationToParent (b, this.x, this.y);
a.setVisible (false);
a.setLocation (c.x, c.y);
(b).add (a, javax.swing.JLayeredPane.POPUP_LAYER, 0);
} else {
var c = javax.swing.SwingUtilities.convertScreenLocationToParent (b, this.x, this.y);
a.setLocation (c.x, c.y);
a.setVisible (false);
b.add (a);
}a.setVisible (true);
});
Clazz.overrideMethod (c$, "createComponent", 
function (a) {
var b =  new javax.swing.PopupFactory.MediumWeightPopup.MediumWeightComponent ();
this.rootPane =  new javax.swing.JRootPane ("_Popup" + (++javax.swing.PopupFactory.popupCount), false);
this.rootPane.setOpaque (true);
b.add (this.rootPane, "Center");
return b;
}, "java.awt.Component");
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d) {
Clazz.superCall (this, javax.swing.PopupFactory.MediumWeightPopup, "reset", [a, b, c, d]);
var e = this.getComponent ();
e.setLocation (c, d);
this.rootPane.getContentPane ().add (b, "Center");
b.invalidate ();
e.validate ();
this.pack ();
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.PopupFactory.MediumWeightPopup, "MediumWeightComponent", java.awt.Panel, javax.swing.SwingHeavyWeight);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.PopupFactory.MediumWeightPopup.MediumWeightComponent, [ new java.awt.BorderLayout ()]);
});
c$ = Clazz.p0p ();
c$.mediumWeightPopupCacheKey = c$.prototype.mediumWeightPopupCacheKey =  new Clazz._O ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"popupCount", 0);
c$.SharedInstanceKey = c$.prototype.SharedInstanceKey =  new Clazz._O ();
Clazz.defineStatics (c$,
"MAX_CACHE_SIZE", 5,
"LIGHT_WEIGHT_POPUP", 0,
"MEDIUM_WEIGHT_POPUP", 1,
"HEAVY_WEIGHT_POPUP", 2);
});
