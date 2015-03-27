Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.util.Hashtable", "$.Locale"], "jsjavax.swing.UIDefaults", ["java.lang.Boolean", "$.Error", "java.util.HashMap", "$.Vector", "jsjava.awt.Color", "$.Dimension", "$.Font", "$.Insets", "jsjavax.swing.Icon", "$.LookAndFeel", "$.SwingUtilities", "jsjavax.swing.border.Border", "jsjavax.swing.event.SwingPropertyChangeSupport"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeSupport = null;
this.resourceBundles = null;
this.defaultLocale = null;
this.resourceCache = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "UIDefaults", java.util.Hashtable);
Clazz.prepareFields (c$, function () {
this.defaultLocale = java.util.Locale.getDefault ();
});
Clazz.makeConstructor (c$, 
function () {
this.construct (700, .75);
});
Clazz.makeConstructor (c$, 
function (initialCapacity, loadFactor) {
Clazz.superConstructor (this, jsjavax.swing.UIDefaults, [initialCapacity, loadFactor]);
this.resourceCache =  new java.util.HashMap ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (keyValueList) {
Clazz.superConstructor (this, jsjavax.swing.UIDefaults, [Clazz.doubleToInt (keyValueList.length / 2)]);
for (var i = 0; i < keyValueList.length; i += 2) {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "put", [keyValueList[i], keyValueList[i + 1]]);
}
}, "~A");
Clazz.defineMethod (c$, "get", 
function (key) {
var value = this.getFromHashtable (key);
return (value != null) ? value : this.getFromResourceBundle (key, null);
}, "~O");
Clazz.defineMethod (c$, "getFromHashtable", 
($fz = function (key) {
var value = Clazz.superCall (this, jsjavax.swing.UIDefaults, "get", [key]);
if ((value !== jsjavax.swing.UIDefaults.PENDING) && !(Clazz.instanceOf (value, jsjavax.swing.UIDefaults.ActiveValue)) && !(Clazz.instanceOf (value, jsjavax.swing.UIDefaults.LazyValue))) {
return value;
}{
value = Clazz.superCall (this, jsjavax.swing.UIDefaults, "get", [key]);
if (value === jsjavax.swing.UIDefaults.PENDING) {
do {
try {
this.wait ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
value = Clazz.superCall (this, jsjavax.swing.UIDefaults, "get", [key]);
} while (value === jsjavax.swing.UIDefaults.PENDING);
return value;
} else if (Clazz.instanceOf (value, jsjavax.swing.UIDefaults.LazyValue)) {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "put", [key, jsjavax.swing.UIDefaults.PENDING]);
} else if (!(Clazz.instanceOf (value, jsjavax.swing.UIDefaults.ActiveValue))) {
return value;
}}if (Clazz.instanceOf (value, jsjavax.swing.UIDefaults.LazyValue)) {
try {
value = (value).createValue (this);
} finally {
{
if (value == null) {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "remove", [key]);
} else {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "put", [key, value]);
}}}
} else {
value = (value).createValue (this);
}return value;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "get", 
function (key, l) {
var value = this.getFromHashtable (key);
return (value != null) ? value : this.getFromResourceBundle (key, l);
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getFromResourceBundle", 
($fz = function (key, l) {
if (this.resourceBundles == null || this.resourceBundles.isEmpty () || !(Clazz.instanceOf (key, String))) {
return null;
}if (l == null) {
if (this.defaultLocale == null) return null;
 else l = this.defaultLocale;
}{
return this.getResourceCache (l).get (key);
}}, $fz.isPrivate = true, $fz), "~O,java.util.Locale");
Clazz.defineMethod (c$, "getResourceCache", 
($fz = function (l) {
return null;
}, $fz.isPrivate = true, $fz), "java.util.Locale");
Clazz.defineMethod (c$, "put", 
function (key, value) {
var oldValue = (value == null) ? Clazz.superCall (this, jsjavax.swing.UIDefaults, "remove", [key]) : Clazz.superCall (this, jsjavax.swing.UIDefaults, "put", [key, value]);
if (Clazz.instanceOf (key, String)) {
this.firePropertyChange (key, oldValue, value);
}return oldValue;
}, "~O,~O");
Clazz.defineMethod (c$, "putDefaults", 
function (keyValueList) {
for (var i = 0, max = keyValueList.length; i < max; i += 2) {
var value = keyValueList[i + 1];
if (value == null) {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "remove", [keyValueList[i]]);
} else {
Clazz.superCall (this, jsjavax.swing.UIDefaults, "put", [keyValueList[i], value]);
}}
this.firePropertyChange ("UIDefaults", null, null);
}, "~A");
Clazz.defineMethod (c$, "getFont", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjava.awt.Font)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getFont", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjava.awt.Font)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getColor", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjava.awt.Color)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getColor", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjava.awt.Color)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getIcon", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjavax.swing.Icon)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getIcon", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjavax.swing.Icon)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getBorder", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjavax.swing.border.Border)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getBorder", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjavax.swing.border.Border)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getString", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, String)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getString", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, String)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getInt", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, Integer)) ? (value).intValue () : 0;
}, "~O");
Clazz.defineMethod (c$, "getInt", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, Integer)) ? (value).intValue () : 0;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getBoolean", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, Boolean)) ? (value).booleanValue () : false;
}, "~O");
Clazz.defineMethod (c$, "getBoolean", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, Boolean)) ? (value).booleanValue () : false;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getInsets", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjava.awt.Insets)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getInsets", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjava.awt.Insets)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getDimension", 
function (key) {
var value = this.get (key);
return (Clazz.instanceOf (value, jsjava.awt.Dimension)) ? value : null;
}, "~O");
Clazz.defineMethod (c$, "getDimension", 
function (key, l) {
var value = this.get (key, l);
return (Clazz.instanceOf (value, jsjava.awt.Dimension)) ? value : null;
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "getUIClass", 
function (uiClassID, uiClassLoader) {
try {
var className = this.get (uiClassID);
if (className != null) {
var cls = this.get (className);
if (cls == null) {
if (uiClassLoader == null) {
cls = jsjavax.swing.SwingUtilities.loadSystemClass (className);
} else {
cls = uiClassLoader.loadClass (className);
}if (cls != null) {
this.put (className, cls);
}}return cls;
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.exceptionOf (e$$, ClassCastException)) {
var e = e$$;
{
return null;
}
} else {
throw e$$;
}
}
return null;
}, "~S,ClassLoader");
Clazz.defineMethod (c$, "getUIClass", 
function (uiClassID) {
return this.getUIClass (uiClassID, null);
}, "~S");
Clazz.defineMethod (c$, "getUIError", 
function (msg) {
System.err.println ("UIDefaults.getUI() failed: " + msg);
try {
throw  new Error ();
} catch (e) {
e.printStackTrace ();
}
}, "~S");
Clazz.defineMethod (c$, "getUI", 
function (target) {
return null;
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
this.changeSupport =  new jsjavax.swing.event.SwingPropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (listener);
}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (this.changeSupport != null) {
this.changeSupport.removePropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport != null) {
this.changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "addResourceBundle", 
function (bundleName) {
if (bundleName == null) {
return;
}if (this.resourceBundles == null) {
this.resourceBundles =  new java.util.Vector (5);
}if (!this.resourceBundles.contains (bundleName)) {
this.resourceBundles.add (bundleName);
this.resourceCache.clear ();
}}, "~S");
Clazz.defineMethod (c$, "removeResourceBundle", 
function (bundleName) {
if (this.resourceBundles != null) {
this.resourceBundles.remove (bundleName);
}this.resourceCache.clear ();
}, "~S");
Clazz.defineMethod (c$, "setDefaultLocale", 
function (l) {
this.defaultLocale = l;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getDefaultLocale", 
function () {
return this.defaultLocale;
});
Clazz.declareInterface (jsjavax.swing.UIDefaults, "LazyValue");
Clazz.declareInterface (jsjavax.swing.UIDefaults, "ActiveValue");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.UIDefaults, "ProxyLazyValue", null, jsjavax.swing.UIDefaults.LazyValue);
Clazz.overrideMethod (c$, "createValue", 
function (a) {
return null;
}, "jsjavax.swing.UIDefaults");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bindings = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.UIDefaults, "LazyInputMap", null, jsjavax.swing.UIDefaults.LazyValue);
Clazz.makeConstructor (c$, 
function (a) {
this.bindings = a;
}, "~A");
Clazz.overrideMethod (c$, "createValue", 
function (a) {
if (this.bindings != null) {
var b = jsjavax.swing.LookAndFeel.makeInputMap (this.bindings);
return b;
}return null;
}, "jsjavax.swing.UIDefaults");
c$ = Clazz.p0p ();
c$.PENDING = c$.prototype.PENDING =  String.instantialize ("Pending");
});
