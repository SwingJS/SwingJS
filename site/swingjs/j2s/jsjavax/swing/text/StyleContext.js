Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["java.util.Enumeration", "jsjavax.swing.text.AbstractDocument", "$.AttributeSet", "$.Style", "java.util.Collections", "$.Hashtable", "$.Vector", "$.WeakHashMap", "jsjavax.swing.event.EventListenerList", "jsjavax.swing.text.SimpleAttributeSet"], "jsjavax.swing.text.StyleContext", ["java.lang.ref.WeakReference", "java.util.NoSuchElementException", "jsjava.awt.Font", "$.Toolkit", "jsjavax.swing.SwingUtilities", "jsjavax.swing.event.ChangeEvent", "$.ChangeListener", "jsjavax.swing.text.MutableAttributeSet", "$.StyleConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.styles = null;
this.fontSearch = null;
this.fontTable = null;
this.attributesPool = null;
this.search = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.StyleContext.SmallAttributeSet")) {
jsjavax.swing.text.StyleContext.$StyleContext$SmallAttributeSet$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StyleContext.KeyEnumeration")) {
jsjavax.swing.text.StyleContext.$StyleContext$KeyEnumeration$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StyleContext.KeyBuilder")) {
jsjavax.swing.text.StyleContext.$StyleContext$KeyBuilder$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StyleContext.NamedStyle")) {
jsjavax.swing.text.StyleContext.$StyleContext$NamedStyle$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "StyleContext", null, jsjavax.swing.text.AbstractDocument.AttributeContext);
Clazz.prepareFields (c$, function () {
this.fontSearch =  new jsjavax.swing.text.StyleContext.FontKey (null, 0, 0);
this.fontTable =  new java.util.Hashtable ();
this.attributesPool = java.util.Collections.synchronizedMap ( new java.util.WeakHashMap ());
this.search =  new jsjavax.swing.text.SimpleAttributeSet ();
});
c$.getDefaultStyleContext = Clazz.defineMethod (c$, "getDefaultStyleContext", 
function () {
if (jsjavax.swing.text.StyleContext.defaultContext == null) {
jsjavax.swing.text.StyleContext.defaultContext =  new jsjavax.swing.text.StyleContext ();
}return jsjavax.swing.text.StyleContext.defaultContext;
});
Clazz.makeConstructor (c$, 
function () {
this.styles = Clazz.innerTypeInstance (jsjavax.swing.text.StyleContext.NamedStyle, this, null, null);
this.addStyle ("default", null);
});
Clazz.defineMethod (c$, "addStyle", 
function (nm, parent) {
var style = Clazz.innerTypeInstance (jsjavax.swing.text.StyleContext.NamedStyle, this, null, nm, parent);
if (nm != null) {
this.styles.addAttribute (nm, style);
}return style;
}, "~S,jsjavax.swing.text.Style");
Clazz.defineMethod (c$, "removeStyle", 
function (nm) {
this.styles.removeAttribute (nm);
}, "~S");
Clazz.defineMethod (c$, "getStyle", 
function (nm) {
return this.styles.getAttribute (nm);
}, "~S");
Clazz.defineMethod (c$, "getStyleNames", 
function () {
return this.styles.getAttributeNames ();
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.styles.addChangeListener (l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.styles.removeChangeListener (l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return (this.styles).getChangeListeners ();
});
Clazz.defineMethod (c$, "getFont", 
function (attr) {
var style = 0;
if (jsjavax.swing.text.StyleConstants.isBold (attr)) {
style |= 1;
}if (jsjavax.swing.text.StyleConstants.isItalic (attr)) {
style |= 2;
}var family = jsjavax.swing.text.StyleConstants.getFontFamily (attr);
var size = jsjavax.swing.text.StyleConstants.getFontSize (attr);
if (jsjavax.swing.text.StyleConstants.isSuperscript (attr) || jsjavax.swing.text.StyleConstants.isSubscript (attr)) {
size -= 2;
}return this.getFont (family, style, size);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getForeground", 
function (attr) {
return jsjavax.swing.text.StyleConstants.getForeground (attr);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getBackground", 
function (attr) {
return jsjavax.swing.text.StyleConstants.getBackground (attr);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getFont", 
function (family, style, size) {
this.fontSearch.setValue (family, style, size);
var f = this.fontTable.get (this.fontSearch);
if (f == null) {
var defaultStyle = this.getStyle ("default");
if (defaultStyle != null) {
var FONT_ATTRIBUTE_KEY = "FONT_ATTRIBUTE_KEY";
var defaultFont = defaultStyle.getAttribute ("FONT_ATTRIBUTE_KEY");
if (defaultFont != null && defaultFont.getFamily ().equalsIgnoreCase (family)) {
f = defaultFont.deriveFont (style, size);
}}if (f == null) {
f =  new jsjava.awt.Font (family, style, size);
}var key =  new jsjavax.swing.text.StyleContext.FontKey (family, style, size);
this.fontTable.put (key, f);
}return f;
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getFontMetrics", 
function (f) {
return jsjava.awt.Toolkit.getDefaultToolkit ().getFontMetrics (f);
}, "jsjava.awt.Font");
Clazz.overrideMethod (c$, "addAttribute", 
function (old, name, value) {
if ((old.getAttributeCount () + 1) <= this.getCompressionThreshold ()) {
this.search.removeAttributes (this.search);
this.search.addAttributes (old);
this.search.addAttribute (name, value);
this.reclaim (old);
return this.getImmutableUniqueSet ();
}var ma = this.getMutableAttributeSet (old);
ma.addAttribute (name, value);
return ma;
}, "jsjavax.swing.text.AttributeSet,~O,~O");
Clazz.overrideMethod (c$, "addAttributes", 
function (old, attr) {
if ((old.getAttributeCount () + attr.getAttributeCount ()) <= this.getCompressionThreshold ()) {
this.search.removeAttributes (this.search);
this.search.addAttributes (old);
this.search.addAttributes (attr);
this.reclaim (old);
return this.getImmutableUniqueSet ();
}var ma = this.getMutableAttributeSet (old);
ma.addAttributes (attr);
return ma;
}, "jsjavax.swing.text.AttributeSet,jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "removeAttribute", 
function (old, name) {
if ((old.getAttributeCount () - 1) <= this.getCompressionThreshold ()) {
this.search.removeAttributes (this.search);
this.search.addAttributes (old);
this.search.removeAttribute (name);
this.reclaim (old);
return this.getImmutableUniqueSet ();
}var ma = this.getMutableAttributeSet (old);
ma.removeAttribute (name);
return ma;
}, "jsjavax.swing.text.AttributeSet,~O");
Clazz.defineMethod (c$, "removeAttributes", 
function (old, names) {
if (old.getAttributeCount () <= this.getCompressionThreshold ()) {
this.search.removeAttributes (this.search);
this.search.addAttributes (old);
this.search.removeAttributes (names);
this.reclaim (old);
return this.getImmutableUniqueSet ();
}var ma = this.getMutableAttributeSet (old);
ma.removeAttributes (names);
return ma;
}, "jsjavax.swing.text.AttributeSet,java.util.Enumeration");
Clazz.defineMethod (c$, "removeAttributes", 
function (old, attrs) {
if (old.getAttributeCount () <= this.getCompressionThreshold ()) {
this.search.removeAttributes (this.search);
this.search.addAttributes (old);
this.search.removeAttributes (attrs);
this.reclaim (old);
return this.getImmutableUniqueSet ();
}var ma = this.getMutableAttributeSet (old);
ma.removeAttributes (attrs);
return ma;
}, "jsjavax.swing.text.AttributeSet,jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getEmptySet", 
function () {
return jsjavax.swing.text.SimpleAttributeSet.EMPTY;
});
Clazz.overrideMethod (c$, "reclaim", 
function (a) {
if (jsjavax.swing.SwingUtilities.isEventDispatchThread ()) {
this.attributesPool.size ();
}}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getCompressionThreshold", 
function () {
return 9;
});
Clazz.defineMethod (c$, "createSmallAttributeSet", 
function (a) {
return Clazz.innerTypeInstance (jsjavax.swing.text.StyleContext.SmallAttributeSet, this, null, a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "createLargeAttributeSet", 
function (a) {
return  new jsjavax.swing.text.SimpleAttributeSet (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "removeUnusedSets", 
function () {
this.attributesPool.size ();
});
Clazz.defineMethod (c$, "getImmutableUniqueSet", 
function () {
var key = this.createSmallAttributeSet (this.search);
var reference = this.attributesPool.get (key);
var a;
if (reference == null || (a = reference.get ()) == null) {
a = key;
this.attributesPool.put (a,  new java.lang.ref.WeakReference (a));
}return a;
});
Clazz.defineMethod (c$, "getMutableAttributeSet", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.MutableAttributeSet) && a !== jsjavax.swing.text.SimpleAttributeSet.EMPTY) {
return a;
}return this.createLargeAttributeSet (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "toString", 
function () {
this.removeUnusedSets ();
var s = "";
var iterator = this.attributesPool.keySet ().iterator ();
while (iterator.hasNext ()) {
var set = iterator.next ();
s = s + set + "\n";
}
return s;
});
c$.registerStaticAttributeKey = Clazz.defineMethod (c$, "registerStaticAttributeKey", 
function (key) {
var ioFmt = key.getClass ().getName () + "." + key.toString ();
if (jsjavax.swing.text.StyleContext.freezeKeyMap == null) {
jsjavax.swing.text.StyleContext.freezeKeyMap =  new java.util.Hashtable ();
jsjavax.swing.text.StyleContext.thawKeyMap =  new java.util.Hashtable ();
}jsjavax.swing.text.StyleContext.freezeKeyMap.put (key, ioFmt);
jsjavax.swing.text.StyleContext.thawKeyMap.put (ioFmt, key);
}, "~O");
c$.getStaticAttribute = Clazz.defineMethod (c$, "getStaticAttribute", 
function (key) {
if (jsjavax.swing.text.StyleContext.thawKeyMap == null || key == null) {
return null;
}return jsjavax.swing.text.StyleContext.thawKeyMap.get (key);
}, "~O");
c$.getStaticAttributeKey = Clazz.defineMethod (c$, "getStaticAttributeKey", 
function (key) {
return key.getClass ().getName () + "." + key.toString ();
}, "~O");
c$.$StyleContext$SmallAttributeSet$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.attributes = null;
this.resolveParent = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyleContext, "SmallAttributeSet", null, jsjavax.swing.text.AttributeSet);
Clazz.makeConstructor (c$, 
function (a) {
this.attributes = a;
this.updateResolveParent ();
}, "~A");
Clazz.makeConstructor (c$, 
function (a) {
var b = a.getAttributeCount ();
var c =  new Array (2 * b);
var d = a.getAttributeNames ();
var e = 0;
while (d.hasMoreElements ()) {
c[e] = d.nextElement ();
c[e + 1] = a.getAttribute (c[e]);
e += 2;
}
this.attributes = c;
this.updateResolveParent ();
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "updateResolveParent", 
($fz = function () {
this.resolveParent = null;
var a = this.attributes;
for (var b = 0; b < a.length; b += 2) {
if (a[b] === jsjavax.swing.text.StyleConstants.ResolveAttribute) {
this.resolveParent = a[b + 1];
break;
}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getLocalAttribute", 
function (a) {
if (a === jsjavax.swing.text.StyleConstants.ResolveAttribute) {
return this.resolveParent;
}var b = this.attributes;
for (var c = 0; c < b.length; c += 2) {
if (a.equals (b[c])) {
return b[c + 1];
}}
return null;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var a = "{";
var b = this.attributes;
for (var c = 0; c < b.length; c += 2) {
if (Clazz.instanceOf (b[c + 1], jsjavax.swing.text.AttributeSet)) {
a = a + b[c] + "=" + "AttributeSet" + ",";
} else {
a = a + b[c] + "=" + b[c + 1] + ",";
}}
a = a + "}";
return a;
});
Clazz.defineMethod (c$, "hashCode", 
function () {
var a = 0;
var b = this.attributes;
for (var c = 1; c < b.length; c += 2) {
a ^= b[c].hashCode ();
}
return a;
});
Clazz.defineMethod (c$, "equals", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.AttributeSet)) {
var b = a;
return ((this.getAttributeCount () == b.getAttributeCount ()) && this.containsAttributes (b));
}return false;
}, "~O");
Clazz.overrideMethod (c$, "clone", 
function () {
return this;
});
Clazz.defineMethod (c$, "getAttributeCount", 
function () {
return Clazz.doubleToInt (this.attributes.length / 2);
});
Clazz.overrideMethod (c$, "isDefined", 
function (a) {
var b = this.attributes;
var c = b.length;
for (var d = 0; d < c; d += 2) {
if (a.equals (b[d])) {
return true;
}}
return false;
}, "~O");
Clazz.overrideMethod (c$, "isEqual", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.StyleContext.SmallAttributeSet)) {
return a === this;
}return ((this.getAttributeCount () == a.getAttributeCount ()) && this.containsAttributes (a));
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "copyAttributes", 
function () {
return this;
});
Clazz.defineMethod (c$, "getAttribute", 
function (a) {
var b = this.getLocalAttribute (a);
if (b == null) {
var c = this.getResolveParent ();
if (c != null) b = c.getAttribute (a);
}return b;
}, "~O");
Clazz.defineMethod (c$, "getAttributeNames", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.text.StyleContext.KeyEnumeration, this, null, this.attributes);
});
Clazz.overrideMethod (c$, "containsAttribute", 
function (a, b) {
return b.equals (this.getAttribute (a));
}, "~O,~O");
Clazz.overrideMethod (c$, "containsAttributes", 
function (a) {
var b = true;
var c = a.getAttributeNames ();
while (b && c.hasMoreElements ()) {
var d = c.nextElement ();
b = a.getAttribute (d).equals (this.getAttribute (d));
}
return b;
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return this.resolveParent;
});
c$ = Clazz.p0p ();
};
c$.$StyleContext$KeyEnumeration$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.attr = null;
this.i = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyleContext, "KeyEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a) {
this.attr = a;
this.i = 0;
}, "~A");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.i < this.attr.length;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (this.i < this.attr.length) {
var a = this.attr[this.i];
this.i += 2;
return a;
}throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
};
c$.$StyleContext$KeyBuilder$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.keys = null;
this.data = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyleContext, "KeyBuilder");
Clazz.prepareFields (c$, function () {
this.keys =  new java.util.Vector ();
this.data =  new java.util.Vector ();
});
Clazz.defineMethod (c$, "initialize", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.StyleContext.SmallAttributeSet)) {
this.initialize ((a).attributes);
} else {
this.keys.removeAllElements ();
this.data.removeAllElements ();
var b = a.getAttributeNames ();
while (b.hasMoreElements ()) {
var c = b.nextElement ();
this.addAttribute (c, a.getAttribute (c));
}
}}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "initialize", 
($fz = function (a) {
this.keys.removeAllElements ();
this.data.removeAllElements ();
var b = a.length;
for (var c = 0; c < b; c += 2) {
this.keys.addElement (a[c]);
this.data.addElement (a[c + 1]);
}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "createTable", 
function () {
var a = this.keys.size ();
var b =  new Array (2 * a);
for (var c = 0; c < a; c++) {
var d = 2 * c;
b[d] = this.keys.elementAt (c);
b[d + 1] = this.data.elementAt (c);
}
return b;
});
Clazz.defineMethod (c$, "getCount", 
function () {
return this.keys.size ();
});
Clazz.defineMethod (c$, "addAttribute", 
function (a, b) {
this.keys.addElement (a);
this.data.addElement (b);
}, "~O,~O");
Clazz.defineMethod (c$, "addAttributes", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.StyleContext.SmallAttributeSet)) {
var b = (a).attributes;
var c = b.length;
for (var d = 0; d < c; d += 2) {
this.addAttribute (b[d], b[d + 1]);
}
} else {
var b = a.getAttributeNames ();
while (b.hasMoreElements ()) {
var c = b.nextElement ();
this.addAttribute (c, a.getAttribute (c));
}
}}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "removeAttribute", 
function (a) {
var b = this.keys.size ();
for (var c = 0; c < b; c++) {
if (this.keys.elementAt (c).equals (a)) {
this.keys.removeElementAt (c);
this.data.removeElementAt (c);
return;
}}
}, "~O");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
while (a.hasMoreElements ()) {
var b = a.nextElement ();
this.removeAttribute (b);
}
}, "java.util.Enumeration");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
var b = a.getAttributeNames ();
while (b.hasMoreElements ()) {
var c = b.nextElement ();
var d = a.getAttribute (c);
this.removeSearchAttribute (c, d);
}
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "removeSearchAttribute", 
($fz = function (a, b) {
var c = this.keys.size ();
for (var d = 0; d < c; d++) {
if (this.keys.elementAt (d).equals (a)) {
if (this.data.elementAt (d).equals (b)) {
this.keys.removeElementAt (d);
this.data.removeElementAt (d);
}return;
}}
}, $fz.isPrivate = true, $fz), "~O,~O");
c$ = Clazz.p0p ();
};
c$.$StyleContext$NamedStyle$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.listenerList = null;
this.changeEvent = null;
this.attributes = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyleContext, "NamedStyle", null, jsjavax.swing.text.Style);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.attributes = this.b$["jsjavax.swing.text.StyleContext"].getEmptySet ();
if (a != null) {
this.setName (a);
}if (b != null) {
this.setResolveParent (b);
}}, "~S,jsjavax.swing.text.Style");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (null, a);
}, "jsjavax.swing.text.Style");
Clazz.makeConstructor (c$, 
function () {
this.attributes = this.b$["jsjavax.swing.text.StyleContext"].getEmptySet ();
});
Clazz.defineMethod (c$, "toString", 
function () {
return "NamedStyle:" + this.getName () + " " + this.attributes;
});
Clazz.overrideMethod (c$, "getName", 
function () {
if (this.isDefined (jsjavax.swing.text.StyleConstants.NameAttribute)) {
return this.getAttribute (jsjavax.swing.text.StyleConstants.NameAttribute).toString ();
}return null;
});
Clazz.defineMethod (c$, "setName", 
function (a) {
if (a != null) {
this.addAttribute (jsjavax.swing.text.StyleConstants.NameAttribute, a);
}}, "~S");
Clazz.overrideMethod (c$, "addChangeListener", 
function (a) {
this.listenerList.add (jsjavax.swing.event.ChangeListener, a);
}, "jsjavax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (a) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, a);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var a = this.listenerList.getListenerList ();
for (var b = a.length - 2; b >= 0; b -= 2) {
if (a[b] === jsjavax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(a[b + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getListeners", 
function (a) {
return this.listenerList.getListeners (a);
}, "Class");
Clazz.defineMethod (c$, "getAttributeCount", 
function () {
return this.attributes.getAttributeCount ();
});
Clazz.defineMethod (c$, "isDefined", 
function (a) {
return this.attributes.isDefined (a);
}, "~O");
Clazz.defineMethod (c$, "isEqual", 
function (a) {
return this.attributes.isEqual (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "copyAttributes", 
function () {
var a = Clazz.innerTypeInstance (jsjavax.swing.text.StyleContext.NamedStyle, this, null);
a.attributes = this.attributes.copyAttributes ();
return a;
});
Clazz.defineMethod (c$, "getAttribute", 
function (a) {
return this.attributes.getAttribute (a);
}, "~O");
Clazz.defineMethod (c$, "getAttributeNames", 
function () {
return this.attributes.getAttributeNames ();
});
Clazz.defineMethod (c$, "containsAttribute", 
function (a, b) {
return this.attributes.containsAttribute (a, b);
}, "~O,~O");
Clazz.defineMethod (c$, "containsAttributes", 
function (a) {
return this.attributes.containsAttributes (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getResolveParent", 
function () {
return this.attributes.getResolveParent ();
});
Clazz.overrideMethod (c$, "addAttribute", 
function (a, b) {
var c = this.b$["jsjavax.swing.text.StyleContext"];
this.attributes = c.addAttribute (this.attributes, a, b);
this.fireStateChanged ();
}, "~O,~O");
Clazz.overrideMethod (c$, "addAttributes", 
function (a) {
var b = this.b$["jsjavax.swing.text.StyleContext"];
this.attributes = b.addAttributes (this.attributes, a);
this.fireStateChanged ();
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "removeAttribute", 
function (a) {
var b = this.b$["jsjavax.swing.text.StyleContext"];
this.attributes = b.removeAttribute (this.attributes, a);
this.fireStateChanged ();
}, "~O");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
var b = this.b$["jsjavax.swing.text.StyleContext"];
this.attributes = b.removeAttributes (this.attributes, a);
this.fireStateChanged ();
}, "java.util.Enumeration");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
var b = this.b$["jsjavax.swing.text.StyleContext"];
if (a === this) {
this.attributes = b.getEmptySet ();
} else {
this.attributes = b.removeAttributes (this.attributes, a);
}this.fireStateChanged ();
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "setResolveParent", 
function (a) {
if (a != null) {
this.addAttribute (jsjavax.swing.text.StyleConstants.ResolveAttribute, a);
} else {
this.removeAttribute (jsjavax.swing.text.StyleConstants.ResolveAttribute);
}}, "jsjavax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.family = null;
this.style = 0;
this.size = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyleContext, "FontKey");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.setValue (a, b, c);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "setValue", 
function (a, b, c) {
this.family = (a != null) ? a.intern () : null;
this.style = b;
this.size = c;
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var a = (this.family != null) ? this.family.hashCode () : 0;
return a ^ this.style ^ this.size;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (Clazz.instanceOf (a, jsjavax.swing.text.StyleContext.FontKey)) {
var b = a;
return (this.size == b.size) && (this.style == b.style) && (this.family === b.family);
}return false;
}, "~O");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"defaultContext", null,
"DEFAULT_STYLE", "default",
"freezeKeyMap", null,
"thawKeyMap", null,
"THRESHOLD", 9);
{
try {
var n = jsjavax.swing.text.StyleConstants.keys.length;
for (var i = 0; i < n; i++) {
jsjavax.swing.text.StyleContext.registerStaticAttributeKey (jsjavax.swing.text.StyleConstants.keys[i]);
}
} catch (e) {
e.printStackTrace ();
}
}});
