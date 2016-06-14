Clazz.declarePackage ("java.util");
Clazz.load (["java.util.HashMap"], "java.util.Locale", ["java.lang.InternalError", "$.NullPointerException", "$.StringBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.language = null;
this.country = null;
this.variant = null;
this.hashCodeValue = 0;
Clazz.instantialize (this, arguments);
}, java.util, "Locale", null, [Cloneable, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function (language, country, variant) {
this.language = language.intern ();
this.country = country.intern ();
this.variant = variant.intern ();
}, "~S,~S,~S");
Clazz.makeConstructor (c$, 
function (language, country) {
this.construct (language, country, "");
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (language) {
this.construct (language, "", "");
}, "~S");
Clazz.makeConstructor (c$, 
 function (language, country, flag) {
this.language = language;
this.country = country;
this.variant = "";
}, "~S,~S,~B");
c$.createSingleton = Clazz.defineMethod (c$, "createSingleton", 
 function (key, language, country) {
var locale =  new java.util.Locale (language, country, false);
java.util.Locale.cache.put (key, locale);
return locale;
}, "~S,~S,~S");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (language, country, variant) {
if (language == null || country == null || variant == null) {
throw  new NullPointerException ();
}var sb =  new StringBuilder ();
sb.append (language).append ('_').append (country).append ('_').append (variant);
var key = sb.toString ();
var locale = java.util.Locale.cache.get (key);
if (locale == null) {
locale =  new java.util.Locale (language, country, variant);
var l = java.util.Locale.cache.put (key, locale);
if (l != null) {
locale = l;
}}return locale;
}, "~S,~S,~S");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
if (java.util.Locale.defaultLocale == null) {
var language;
var country;
var variant;
language = "en";
country = "";
variant = "";
java.util.Locale.defaultLocale = java.util.Locale.getInstance (language, country, variant);
}return java.util.Locale.defaultLocale;
});
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (newLocale) {
if (newLocale == null) throw  new NullPointerException ("Can't set default locale to NULL");
java.util.Locale.defaultLocale = newLocale;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getLanguage", 
function () {
return this.language;
});
Clazz.defineMethod (c$, "getCountry", 
function () {
return this.country;
});
Clazz.defineMethod (c$, "getVariant", 
function () {
return this.variant;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var l = this.language.length != 0;
var c = this.country.length != 0;
var v = this.variant.length != 0;
var result =  new StringBuilder (this.language);
if (c || (l && v)) {
result.append ('_').append (this.country);
}if (v && (l || c)) {
result.append ('_').append (this.variant);
}return result.toString ();
});
Clazz.defineMethod (c$, "getDisplayLanguage", 
function () {
return this.getDisplayLanguage (java.util.Locale.getDefault ());
});
Clazz.defineMethod (c$, "getDisplayLanguage", 
function (inLocale) {
return this.getDisplayString (this.language, inLocale, 0);
}, "java.util.Locale");
Clazz.defineMethod (c$, "getDisplayCountry", 
function () {
return this.getDisplayCountry (java.util.Locale.getDefault ());
});
Clazz.defineMethod (c$, "getDisplayCountry", 
function (inLocale) {
return this.getDisplayString (this.country, inLocale, 1);
}, "java.util.Locale");
Clazz.defineMethod (c$, "getDisplayString", 
 function (code, inLocale, type) {
if (code.length == 0) {
return "";
}if (inLocale == null) {
throw  new NullPointerException ();
}return inLocale.toString ();
}, "~S,java.util.Locale,~N");
Clazz.defineMethod (c$, "getDisplayVariant", 
function () {
return this.getDisplayVariant (java.util.Locale.getDefault ());
});
Clazz.defineMethod (c$, "getDisplayVariant", 
function (inLocale) {
if (this.variant.length == 0) return "";
return this.variant;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getDisplayName", 
function () {
return this.getDisplayName (java.util.Locale.getDefault ());
});
Clazz.defineMethod (c$, "getDisplayName", 
function (inLocale) {
return inLocale.toString ();
}, "java.util.Locale");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var that = Clazz.superCall (this, java.util.Locale, "clone", []);
return that;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hc = this.hashCodeValue;
if (hc == 0) {
hc = (this.language.hashCode () << 8) ^ this.country.hashCode () ^ (this.variant.hashCode () << 4);
this.hashCodeValue = hc;
}return hc;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (!(Clazz.instanceOf (obj, java.util.Locale))) return false;
var other = obj;
return this.language === other.language && this.country === other.country && this.variant === other.variant;
}, "~O");
c$.cache = c$.prototype.cache =  new java.util.HashMap (32);
c$.ENGLISH = c$.prototype.ENGLISH = java.util.Locale.createSingleton ("en__", "en", "");
c$.ROOT = c$.prototype.ROOT = java.util.Locale.createSingleton ("__", "", "");
Clazz.defineStatics (c$,
"DISPLAY_LANGUAGE", 0,
"DISPLAY_COUNTRY", 1,
"defaultLocale", null);
});
