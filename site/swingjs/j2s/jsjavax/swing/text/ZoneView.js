Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.AsyncBoxView", "$.BoxView"], "jsjavax.swing.text.ZoneView", ["java.lang.IllegalArgumentException", "java.util.Vector", "jsjavax.swing.text.Position", "$.StateInvariantError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxZoneSize = 8192;
this.maxZonesLoaded = 3;
this.loadedZones = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.ZoneView.Zone")) {
jsjavax.swing.text.ZoneView.$ZoneView$Zone$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "ZoneView", jsjavax.swing.text.BoxView);
Clazz.makeConstructor (c$, 
function (elem, axis) {
Clazz.superConstructor (this, jsjavax.swing.text.ZoneView, [elem, axis]);
this.loadedZones =  new java.util.Vector ();
}, "jsjavax.swing.text.Element,~N");
Clazz.defineMethod (c$, "getMaximumZoneSize", 
function () {
return this.maxZoneSize;
});
Clazz.defineMethod (c$, "setMaximumZoneSize", 
function (size) {
this.maxZoneSize = size;
}, "~N");
Clazz.defineMethod (c$, "getMaxZonesLoaded", 
function () {
return this.maxZonesLoaded;
});
Clazz.defineMethod (c$, "setMaxZonesLoaded", 
function (mzl) {
if (mzl < 1) {
throw  new IllegalArgumentException ("ZoneView.setMaxZonesLoaded must be greater than 0.");
}this.maxZonesLoaded = mzl;
this.unloadOldZones ();
}, "~N");
Clazz.defineMethod (c$, "zoneWasLoaded", 
function (zone) {
this.loadedZones.addElement (zone);
this.unloadOldZones ();
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "unloadOldZones", 
function () {
while (this.loadedZones.size () > this.getMaxZonesLoaded ()) {
var zone = this.loadedZones.elementAt (0);
this.loadedZones.removeElementAt (0);
this.unloadZone (zone);
}
});
Clazz.defineMethod (c$, "unloadZone", 
function (zone) {
zone.removeAll ();
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "isZoneLoaded", 
function (zone) {
return (zone.getViewCount () > 0);
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "createZone", 
function (p0, p1) {
var doc = this.getDocument ();
var zone = null;
try {
zone = Clazz.innerTypeInstance (jsjavax.swing.text.ZoneView.Zone, this, null, this.getElement (), doc.createPosition (p0), doc.createPosition (p1));
} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.text.StateInvariantError (ble.getMessage ());
} else {
throw ble;
}
}
return zone;
}, "~N,~N");
Clazz.overrideMethod (c$, "loadChildren", 
function (f) {
var offs0 = this.getStartOffset ();
var offs1 = this.getEndOffset ();
this.append (this.createZone (offs0, offs1));
this.handleInsert (offs0, offs1 - offs0);
}, "jsjavax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "getViewIndexAtPosition", 
function (pos) {
var n = this.getViewCount ();
if (pos == this.getEndOffset ()) {
return n - 1;
}for (var i = 0; i < n; i++) {
var v = this.getView (i);
if (pos >= v.getStartOffset () && pos < v.getEndOffset ()) {
return i;
}}
return -1;
}, "~N");
Clazz.defineMethod (c$, "handleInsert", 
function (pos, length) {
var index = this.getViewIndex (pos, jsjavax.swing.text.Position.Bias.Forward);
var v = this.getView (index);
var offs0 = v.getStartOffset ();
var offs1 = v.getEndOffset ();
if ((offs1 - offs0) > this.maxZoneSize) {
this.splitZone (index, offs0, offs1);
}}, "~N,~N");
Clazz.defineMethod (c$, "handleRemove", 
function (pos, length) {
}, "~N,~N");
Clazz.defineMethod (c$, "splitZone", 
function (index, offs0, offs1) {
var zones =  new java.util.Vector ();
var offs = offs0;
do {
offs0 = offs;
offs = Math.min (this.getDesiredZoneEnd (offs0), offs1);
zones.addElement (this.createZone (offs0, offs));
} while (offs < offs1);
var newZones =  new Array (zones.size ());
zones.copyInto (newZones);
this.replace (index, 1, newZones);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getDesiredZoneEnd", 
function (pos) {
var elem = this.getElement ();
var index = elem.getElementIndex (pos + (Clazz.doubleToInt (this.maxZoneSize / 2)));
var child = elem.getElement (index);
var offs0 = child.getStartOffset ();
var offs1 = child.getEndOffset ();
if ((offs1 - pos) > this.maxZoneSize) {
if (offs0 > pos) {
return offs0;
}}return offs1;
}, "~N");
Clazz.overrideMethod (c$, "updateChildren", 
function (ec, e, f) {
return false;
}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "insertUpdate", 
function (changes, a, f) {
this.handleInsert (changes.getOffset (), changes.getLength ());
Clazz.superCall (this, jsjavax.swing.text.ZoneView, "insertUpdate", [changes, a, f]);
}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (changes, a, f) {
this.handleRemove (changes.getOffset (), changes.getLength ());
Clazz.superCall (this, jsjavax.swing.text.ZoneView, "removeUpdate", [changes, a, f]);
}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
c$.$ZoneView$Zone$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.start = null;
this.end = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.ZoneView, "Zone", jsjavax.swing.text.AsyncBoxView);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.ZoneView.Zone, [a, this.b$["jsjavax.swing.text.ZoneView"].getAxis ()]);
this.start = b;
this.end = c;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Position,jsjavax.swing.text.Position");
Clazz.defineMethod (c$, "load", 
function () {
if (!this.isLoaded ()) {
this.setEstimatedMajorSpan (true);
var a = this.getElement ();
var b = this.getViewFactory ();
var c = a.getElementIndex (this.getStartOffset ());
var d = a.getElementIndex (this.getEndOffset ());
var e =  new Array (d - c + 1);
for (var f = c; f <= d; f++) {
e[f - c] = b.create (a.getElement (f));
}
this.replace (0, 0, e);
this.b$["jsjavax.swing.text.ZoneView"].zoneWasLoaded (this);
}});
Clazz.defineMethod (c$, "unload", 
function () {
this.setEstimatedMajorSpan (true);
this.removeAll ();
});
Clazz.defineMethod (c$, "isLoaded", 
function () {
return (this.getViewCount () != 0);
});
Clazz.overrideMethod (c$, "loadChildren", 
function (a) {
this.setEstimatedMajorSpan (true);
var b = this.getElement ();
var c = b.getElementIndex (this.getStartOffset ());
var d = b.getElementIndex (this.getEndOffset ());
var e = d - c;
var f = a.create (b.getElement (c));
f.setParent (this);
var g = f.getPreferredSpan (0);
var h = f.getPreferredSpan (1);
if (this.getMajorAxis () == 0) {
g *= e;
} else {
h += e;
}this.setSize (g, h);
}, "jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "flushRequirementChanges", 
function () {
if (this.isLoaded ()) {
Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "flushRequirementChanges", []);
}});
Clazz.defineMethod (c$, "getViewIndex", 
function (a, b) {
var c = (b === jsjavax.swing.text.Position.Bias.Backward);
a = (c) ? Math.max (0, a - 1) : a;
var d = this.getElement ();
var e = d.getElementIndex (a);
var f = d.getElementIndex (this.getStartOffset ());
return e - f;
}, "~N,jsjavax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "updateChildren", 
function (a, b, c) {
var d = a.getChildrenRemoved ();
var e = a.getChildrenAdded ();
var f = this.getElement ();
var g = f.getElementIndex (this.getStartOffset ());
var h = f.getElementIndex (this.getEndOffset () - 1);
var i = a.getIndex ();
if ((i >= g) && (i <= h)) {
var j = i - g;
var k = Math.min (h - g + 1, e.length);
var l = Math.min (h - g + 1, d.length);
var m =  new Array (k);
for (var n = 0; n < k; n++) {
m[n] = c.create (e[n]);
}
this.replace (j, l, m);
}return true;
}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getAttributes", 
function () {
return this.b$["jsjavax.swing.text.ZoneView"].getAttributes ();
});
Clazz.defineMethod (c$, "paint", 
function (a, b) {
this.load ();
Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "paint", [a, b]);
}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.defineMethod (c$, "viewToModel", 
function (a, b, c, d) {
this.load ();
return Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "viewToModel", [a, b, c, d]);
}, "~N,~N,jsjava.awt.Shape,~A");
Clazz.defineMethod (c$, "modelToView", 
function (a, b, c) {
this.load ();
return Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "modelToView", [a, b, c]);
}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "getStartOffset", 
function () {
return this.start.getOffset ();
});
Clazz.overrideMethod (c$, "getEndOffset", 
function () {
return this.end.getOffset ();
});
Clazz.defineMethod (c$, "insertUpdate", 
function (a, b, c) {
if (this.isLoaded ()) {
Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "insertUpdate", [a, b, c]);
}}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (a, b, c) {
if (this.isLoaded ()) {
Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "removeUpdate", [a, b, c]);
}}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "changedUpdate", 
function (a, b, c) {
if (this.isLoaded ()) {
Clazz.superCall (this, jsjavax.swing.text.ZoneView.Zone, "changedUpdate", [a, b, c]);
}}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
c$ = Clazz.p0p ();
};
});
