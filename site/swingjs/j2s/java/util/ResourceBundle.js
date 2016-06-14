Clazz.declarePackage ("java.util");
Clazz.load (["java.util.Arrays", "$.Collections", "$.HashMap"], "java.util.ResourceBundle", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "java.lang.ClassNotFoundException", "$.IllegalArgumentException", "$.InternalError", "$.InterruptedException", "$.NullPointerException", "$.StringBuilder", "$.Thread", "java.util.ArrayList", "$.HashSet", "java.util.Locale", "$.MissingResourceException", "swingjs.JSToolkit", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.locale = null;
this.expired = false;
this.$keySet = null;
Clazz.instantialize (this, arguments);
}, java.util, "ResourceBundle");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getString", 
function (key) {
return this.getObject (key);
}, "~S");
Clazz.defineMethod (c$, "getStringArray", 
function (key) {
return this.getObject (key);
}, "~S");
Clazz.defineMethod (c$, "getObject", 
function (key) {
var obj = this.handleGetObject (key);
if (obj == null) {
if (this.parent != null) {
obj = this.parent.getObject (key);
}if (obj == null) throw  new java.util.MissingResourceException ("Can't find resource for bundle " + this.getClass ().getName () + ", key " + key, this.getClass ().getName (), key);
}return obj;
}, "~S");
Clazz.defineMethod (c$, "getLocale", 
function () {
return this.locale;
});
Clazz.defineMethod (c$, "setParent", 
function (parent) {
this.parent = parent;
}, "java.util.ResourceBundle");
c$.getBundle = Clazz.defineMethod (c$, "getBundle", 
function (baseName, targetLocale, loader, control) {
var n = 4;
{
n = arguments.length;
}switch (n) {
case 2:
if ((Clazz.instanceOf (targetLocale, java.util.ResourceBundle.Control))) {
control = targetLocale;
targetLocale = null;
}break;
case 3:
if ((Clazz.instanceOf (loader, java.util.ResourceBundle.Control))) {
control = loader;
loader = null;
}break;
}
if (targetLocale == null) targetLocale = java.util.Locale.getDefault ();
if (control == null) control = java.util.ResourceBundle.Control.getControl (java.util.ResourceBundle.Control.FORMAT_PROPERTIES);
return java.util.ResourceBundle.getBundleImpl (baseName, targetLocale, loader, control);
}, "~S,~O,~O,java.util.ResourceBundle.Control");
c$.getBundleImpl = Clazz.defineMethod (c$, "getBundleImpl", 
 function (baseName, locale, loader, control) {
if (control == null) {
throw  new NullPointerException ("ResourceBundle locale or control is null");
}var cacheKey =  new java.util.ResourceBundle.CacheKey (baseName, locale, loader);
var bundle = null;
var bundleRef = java.util.ResourceBundle.cacheList.get (cacheKey);
if (bundleRef != null) {
bundle = bundleRef;
bundleRef = null;
}if (java.util.ResourceBundle.isValidBundle (bundle)) {
return bundle;
}var formats = control.getFormats (baseName);
var baseBundle = null;
for (var targetLocale = locale; targetLocale != null; targetLocale = control.getFallbackLocale (baseName, targetLocale)) {
var candidateLocales = control.getCandidateLocales (baseName, targetLocale);
bundle = java.util.ResourceBundle.findBundle (cacheKey, candidateLocales, formats, 0, control, baseBundle);
if (java.util.ResourceBundle.isValidBundle (bundle)) {
var isBaseBundle = java.util.Locale.ROOT.equals (bundle.locale);
if (!isBaseBundle || bundle.locale.equals (locale) || (candidateLocales.size () == 1 && bundle.locale.equals (candidateLocales.get (0)))) {
break;
}if (isBaseBundle && baseBundle == null) {
baseBundle = bundle;
}}}
if (bundle == null) {
if (baseBundle == null) {
java.util.ResourceBundle.throwMissingResourceException (baseName, locale, cacheKey.getCause ());
}bundle = baseBundle;
}return bundle;
}, "~S,java.util.Locale,~O,java.util.ResourceBundle.Control");
c$.findBundle = Clazz.defineMethod (c$, "findBundle", 
 function (cacheKey, candidateLocales, formats, index, control, baseBundle) {
var targetLocale = candidateLocales.get (index);
var parent = null;
if (index != candidateLocales.size () - 1) {
parent = java.util.ResourceBundle.findBundle (cacheKey, candidateLocales, formats, index + 1, control, baseBundle);
} else if (baseBundle != null && java.util.Locale.ROOT.equals (targetLocale)) {
return baseBundle;
}var expiredBundle = false;
cacheKey.setLocale (targetLocale);
var bundle = java.util.ResourceBundle.findBundleInCache (cacheKey, control);
if (java.util.ResourceBundle.isValidBundle (bundle)) {
expiredBundle = bundle.expired;
if (!expiredBundle) {
if (bundle.parent === parent) {
return bundle;
}var bundleRef = java.util.ResourceBundle.cacheList.get (cacheKey);
if (bundleRef != null && bundleRef === bundle) {
java.util.ResourceBundle.cacheList.remove (cacheKey);
}}}if (bundle !== java.util.ResourceBundle.NONEXISTENT_BUNDLE) {
var constKey = cacheKey.clone ();
try {
try {
bundle = java.util.ResourceBundle.loadBundle (cacheKey, formats, control, expiredBundle);
if (bundle != null) {
if (bundle.parent == null) {
bundle.setParent (parent);
}bundle.locale = targetLocale;
bundle = java.util.ResourceBundle.putBundleInCache (cacheKey, bundle, control);
return bundle;
}java.util.ResourceBundle.putBundleInCache (cacheKey, java.util.ResourceBundle.NONEXISTENT_BUNDLE, control);
} finally {
}
} finally {
if (Clazz.instanceOf (constKey.getCause (), InterruptedException)) {
Thread.currentThread ().interrupt ();
}}
}return parent;
}, "java.util.ResourceBundle.CacheKey,java.util.List,java.util.List,~N,java.util.ResourceBundle.Control,java.util.ResourceBundle");
c$.loadBundle = Clazz.defineMethod (c$, "loadBundle", 
 function (cacheKey, formats, control, reload) {
var targetLocale = cacheKey.getLocale ();
var bundle = null;
var size = formats.size ();
for (var i = 0; i < size; i++) {
var format = formats.get (i);
try {
bundle = control.newBundle (cacheKey.getName (), targetLocale, format, null, reload);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, LinkageError)) {
var error = e$$;
{
cacheKey.setCause (error);
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var cause = e$$;
{
cacheKey.setCause (cause);
}
} else {
throw e$$;
}
}
if (bundle != null) {
cacheKey.setFormat (format);
bundle.locale = targetLocale;
bundle.expired = false;
break;
}}
return bundle;
}, "java.util.ResourceBundle.CacheKey,java.util.List,java.util.ResourceBundle.Control,~B");
c$.isValidBundle = Clazz.defineMethod (c$, "isValidBundle", 
 function (bundle) {
return bundle != null && bundle !== java.util.ResourceBundle.NONEXISTENT_BUNDLE;
}, "java.util.ResourceBundle");
c$.throwMissingResourceException = Clazz.defineMethod (c$, "throwMissingResourceException", 
 function (baseName, locale, cause) {
if (Clazz.instanceOf (cause, java.util.MissingResourceException)) {
cause = null;
}throw  new java.util.MissingResourceException ("Can't find bundle for base name " + baseName + ", locale " + locale, baseName + "_" + locale, "", cause);
}, "~S,java.util.Locale,Throwable");
c$.findBundleInCache = Clazz.defineMethod (c$, "findBundleInCache", 
 function (cacheKey, control) {
var bundleRef = java.util.ResourceBundle.cacheList.get (cacheKey);
if (bundleRef == null) {
return null;
}var bundle = bundleRef;
return bundle;
}, "java.util.ResourceBundle.CacheKey,java.util.ResourceBundle.Control");
c$.putBundleInCache = Clazz.defineMethod (c$, "putBundleInCache", 
 function (cacheKey, bundle, control) {
var key = cacheKey.clone ();
java.util.ResourceBundle.cacheList.put (key, bundle);
return bundle;
}, "java.util.ResourceBundle.CacheKey,java.util.ResourceBundle,java.util.ResourceBundle.Control");
c$.clearCache = Clazz.defineMethod (c$, "clearCache", 
function () {
java.util.ResourceBundle.cacheList.clear ();
});
Clazz.defineMethod (c$, "containsKey", 
function (key) {
if (key == null) {
throw  new NullPointerException ();
}for (var rb = this; rb != null; rb = rb.parent) {
if (rb.handleKeySet ().contains (key)) {
return true;
}}
return false;
}, "~S");
Clazz.defineMethod (c$, "keySet", 
function () {
var keys =  new java.util.HashSet ();
for (var rb = this; rb != null; rb = rb.parent) {
keys.addAll (rb.handleKeySet ());
}
return keys;
});
Clazz.defineMethod (c$, "handleKeySet", 
function () {
if (this.$keySet == null) {
{
if (this.$keySet == null) {
var keys =  new java.util.HashSet ();
var enumKeys = this.getKeys ();
while (enumKeys.hasMoreElements ()) {
var key = enumKeys.nextElement ();
if (this.handleGetObject (key) != null) {
keys.add (key);
}}
this.$keySet = keys;
}}}return this.$keySet;
});
c$.$ResourceBundle$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (java.util, "ResourceBundle$1", java.util.ResourceBundle);
Clazz.defineMethod (c$, "getKeys", 
function () {
return null;
});
Clazz.defineMethod (c$, "handleGetObject", 
function (key) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return "NONEXISTENT_BUNDLE";
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.locale = null;
this.format = null;
this.cause = null;
this.hashCodeCache = 0;
Clazz.instantialize (this, arguments);
}, java.util.ResourceBundle, "CacheKey", null, Cloneable);
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.name = a;
this.locale = b;
if (this.name != null) this.calculateHashCode ();
}, "~S,java.util.Locale,~O");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getLocale", 
function () {
return this.locale;
});
Clazz.defineMethod (c$, "setLocale", 
function (a) {
if (!this.locale.equals (a)) {
this.locale = a;
this.calculateHashCode ();
}return this;
}, "java.util.Locale");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (this === a) {
return true;
}try {
var b = a;
if (this.hashCodeCache != b.hashCodeCache) {
return false;
}if (!this.name.equals (b.name)) {
return false;
}if (!this.locale.equals (b.locale)) {
return false;
}return true;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, NullPointerException)) {
var e = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, ClassCastException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.hashCodeCache;
});
Clazz.defineMethod (c$, "calculateHashCode", 
 function () {
this.hashCodeCache = this.name.hashCode () << 3;
this.hashCodeCache ^= this.locale.hashCode ();
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
var a = Clazz.superCall (this, java.util.ResourceBundle.CacheKey, "clone", []);
a.cause = null;
return a;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "setFormat", 
function (a) {
this.format = a;
}, "~S");
Clazz.defineMethod (c$, "setCause", 
 function (a) {
if (this.cause == null) {
this.cause = a;
} else {
if (Clazz.instanceOf (this.cause, ClassNotFoundException)) {
this.cause = a;
}}}, "Throwable");
Clazz.defineMethod (c$, "getCause", 
 function () {
return this.cause;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var a = this.locale.toString ();
if (a.length == 0) {
if (this.locale.getVariant ().length != 0) {
a = "__" + this.locale.getVariant ();
} else {
a = "\"\"";
}}return "CacheKey[" + this.name + ", lc=" + a + "(format=" + this.format + ")]";
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (java.util.ResourceBundle, "Control");
Clazz.makeConstructor (c$, 
function () {
});
c$.getControl = Clazz.defineMethod (c$, "getControl", 
function (a) {
if (a.equals (java.util.ResourceBundle.Control.FORMAT_PROPERTIES)) {
return java.util.ResourceBundle.SingleFormatControl.PROPERTIES_ONLY;
}if (a.equals (java.util.ResourceBundle.Control.FORMAT_CLASS)) {
return java.util.ResourceBundle.SingleFormatControl.CLASS_ONLY;
}if (a.equals (java.util.ResourceBundle.Control.FORMAT_DEFAULT)) {
return java.util.ResourceBundle.Control.INSTANCE;
}throw  new IllegalArgumentException ();
}, "java.util.List");
c$.getNoFallbackControl = Clazz.defineMethod (c$, "getNoFallbackControl", 
function (a) {
if (a.equals (java.util.ResourceBundle.Control.FORMAT_DEFAULT)) {
return java.util.ResourceBundle.NoFallbackControl.NO_FALLBACK;
}if (a.equals (java.util.ResourceBundle.Control.FORMAT_PROPERTIES)) {
return java.util.ResourceBundle.NoFallbackControl.PROPERTIES_ONLY_NO_FALLBACK;
}if (a.equals (java.util.ResourceBundle.Control.FORMAT_CLASS)) {
return java.util.ResourceBundle.NoFallbackControl.CLASS_ONLY_NO_FALLBACK;
}throw  new IllegalArgumentException ();
}, "java.util.List");
Clazz.defineMethod (c$, "getFormats", 
function (a) {
if (a == null) {
throw  new NullPointerException ();
}return java.util.ResourceBundle.Control.FORMAT_DEFAULT;
}, "~S");
Clazz.defineMethod (c$, "getCandidateLocales", 
function (a, b) {
if (a == null) {
throw  new NullPointerException ();
}var c = b.getLanguage ();
var d = b.getCountry ();
var e = b.getVariant ();
var f =  new java.util.ArrayList (4);
if (e.length > 0) {
f.add (b);
}if (d.length > 0) {
f.add ((f.size () == 0) ? b : java.util.Locale.getInstance (c, d, ""));
}if (c.length > 0) {
f.add ((f.size () == 0) ? b : java.util.Locale.getInstance (c, "", ""));
}f.add (java.util.Locale.ROOT);
return f;
}, "~S,java.util.Locale");
Clazz.defineMethod (c$, "getFallbackLocale", 
function (a, b) {
if (a == null) {
throw  new NullPointerException ();
}var c = java.util.Locale.getDefault ();
return b.equals (c) ? null : c;
}, "~S,java.util.Locale");
Clazz.defineMethod (c$, "newBundle", 
function (a, b, c, d, e) {
var f = this.toBundleName (a, b);
var g = null;
if (c.equals ("java.class")) {
g = swingjs.api.Interface.getInstance (f, false);
} else if (c.equals ("java.properties")) {
var h = this.toResourceName0 (f, "properties");
if (h == null) {
return null;
}var i = swingjs.JSToolkit.getJavaResource (h, false);
var j = null;
j = (i == null ? null :  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (i.getBytes ())));
if (j != null) {
try {
g = this.newPropertyBundle (j);
} finally {
j.close ();
}
}} else {
throw  new IllegalArgumentException ("unknown format: " + c);
}return g;
}, "~S,java.util.Locale,~S,~O,~B");
Clazz.defineMethod (c$, "newPropertyBundle", 
 function (a) {
return (swingjs.api.Interface.getInstance ("java.util.PropertyResourceBundle", false)).setStream (a);
}, "java.io.InputStream");
Clazz.defineMethod (c$, "getTimeToLive", 
function (a, b) {
if (a == null || b == null) {
throw  new NullPointerException ();
}return -2;
}, "~S,java.util.Locale");
Clazz.defineMethod (c$, "toBundleName", 
function (a, b) {
if (b === java.util.Locale.ROOT) {
return a;
}var c = b.getLanguage ();
var d = b.getCountry ();
var e = b.getVariant ();
if (c === "" && d === "" && e === "") {
return a;
}var f =  new StringBuilder (a);
f.append ('_');
if (e !== "") {
f.append (c).append ('_').append (d).append ('_').append (e);
} else if (d !== "") {
f.append (c).append ('_').append (d);
} else {
f.append (c);
}return f.toString ();
}, "~S,java.util.Locale");
Clazz.defineMethod (c$, "toResourceName", 
function (a, b) {
var c =  new StringBuilder (a.length + 1 + b.length);
c.append (a.$replace ('.', '/')).append ('.').append (b);
return c.toString ();
}, "~S,~S");
Clazz.defineMethod (c$, "toResourceName0", 
 function (a, b) {
if (a.contains ("://")) {
return null;
} else {
return this.toResourceName (a, b);
}}, "~S,~S");
c$.FORMAT_DEFAULT = c$.prototype.FORMAT_DEFAULT = java.util.Collections.unmodifiableList (java.util.Arrays.asList (["java.class", "java.properties"]));
c$.FORMAT_CLASS = c$.prototype.FORMAT_CLASS = java.util.Collections.unmodifiableList (java.util.Arrays.asList (["java.class"]));
c$.FORMAT_PROPERTIES = c$.prototype.FORMAT_PROPERTIES = java.util.Collections.unmodifiableList (java.util.Arrays.asList (["java.properties"]));
Clazz.defineStatics (c$,
"TTL_DONT_CACHE", -1,
"TTL_NO_EXPIRATION_CONTROL", -2);
c$.INSTANCE = c$.prototype.INSTANCE =  new java.util.ResourceBundle.Control ();
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.formats = null;
Clazz.instantialize (this, arguments);
}, java.util.ResourceBundle, "SingleFormatControl", java.util.ResourceBundle.Control);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.util.ResourceBundle.SingleFormatControl, []);
this.formats = a;
}, "java.util.List");
Clazz.overrideMethod (c$, "getFormats", 
function (a) {
if (a == null) {
throw  new NullPointerException ();
}return this.formats;
}, "~S");
c$.PROPERTIES_ONLY = c$.prototype.PROPERTIES_ONLY =  new java.util.ResourceBundle.SingleFormatControl (java.util.ResourceBundle.Control.FORMAT_PROPERTIES);
c$.CLASS_ONLY = c$.prototype.CLASS_ONLY =  new java.util.ResourceBundle.SingleFormatControl (java.util.ResourceBundle.Control.FORMAT_CLASS);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (java.util.ResourceBundle, "NoFallbackControl", java.util.ResourceBundle.SingleFormatControl);
Clazz.overrideMethod (c$, "getFallbackLocale", 
function (a, b) {
if (a == null || b == null) {
throw  new NullPointerException ();
}return null;
}, "~S,java.util.Locale");
c$.NO_FALLBACK = c$.prototype.NO_FALLBACK =  new java.util.ResourceBundle.NoFallbackControl (java.util.ResourceBundle.Control.FORMAT_DEFAULT);
c$.PROPERTIES_ONLY_NO_FALLBACK = c$.prototype.PROPERTIES_ONLY_NO_FALLBACK =  new java.util.ResourceBundle.NoFallbackControl (java.util.ResourceBundle.Control.FORMAT_PROPERTIES);
c$.CLASS_ONLY_NO_FALLBACK = c$.prototype.CLASS_ONLY_NO_FALLBACK =  new java.util.ResourceBundle.NoFallbackControl (java.util.ResourceBundle.Control.FORMAT_CLASS);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"INITIAL_CACHE_SIZE", 32);
c$.NONEXISTENT_BUNDLE = c$.prototype.NONEXISTENT_BUNDLE = ((Clazz.isClassDefined ("java.util.ResourceBundle$1") ? 0 : java.util.ResourceBundle.$ResourceBundle$1$ ()), Clazz.innerTypeInstance (java.util.ResourceBundle$1, this, null));
c$.cacheList = c$.prototype.cacheList =  new java.util.HashMap (32);
});
