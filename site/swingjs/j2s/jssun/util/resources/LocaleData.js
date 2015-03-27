Clazz.declarePackage ("jssun.util.resources");
Clazz.load (["java.util.ResourceBundle"], "jssun.util.resources.LocaleData", ["java.lang.NullPointerException", "java.security.AccessController", "$.PrivilegedAction", "java.util.Locale", "$.StringTokenizer"], function () {
c$ = Clazz.declareType (jssun.util.resources, "LocaleData");
c$.getAvailableLocales = Clazz.defineMethod (c$, "getAvailableLocales", 
function () {
return jssun.util.resources.LocaleData.AvailableLocales.localeList.clone ();
});
c$.getCalendarData = Clazz.defineMethod (c$, "getCalendarData", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.util.resources.CalendarData", locale);
}, "java.util.Locale");
c$.getCurrencyNames = Clazz.defineMethod (c$, "getCurrencyNames", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.util.resources.CurrencyNames", locale);
}, "java.util.Locale");
c$.getLocaleNames = Clazz.defineMethod (c$, "getLocaleNames", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.util.resources.LocaleNames", locale);
}, "java.util.Locale");
c$.getTimeZoneNames = Clazz.defineMethod (c$, "getTimeZoneNames", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.util.resources.TimeZoneNames", locale);
}, "java.util.Locale");
c$.getCollationData = Clazz.defineMethod (c$, "getCollationData", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.text.resources.CollationData", locale);
}, "java.util.Locale");
c$.getDateFormatData = Clazz.defineMethod (c$, "getDateFormatData", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.text.resources.FormatData", locale);
}, "java.util.Locale");
c$.getNumberFormatData = Clazz.defineMethod (c$, "getNumberFormatData", 
function (locale) {
return jssun.util.resources.LocaleData.getBundle ("sun.text.resources.FormatData", locale);
}, "java.util.Locale");
c$.getBundle = Clazz.defineMethod (c$, "getBundle", 
($fz = function (baseName, locale) {
return java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jssun.util.resources.LocaleData$1") ? 0 : jssun.util.resources.LocaleData.$LocaleData$1$ ()), Clazz.innerTypeInstance (jssun.util.resources.LocaleData$1, this, Clazz.cloneFinals ("baseName", baseName, "locale", locale))));
}, $fz.isPrivate = true, $fz), "~S,java.util.Locale");
c$.createLocaleList = Clazz.defineMethod (c$, "createLocaleList", 
($fz = function () {
var supportedLocaleString = jssun.util.resources.LocaleData.SwingJSSupportedLocales;
if (supportedLocaleString.length == 0) {
return null;
}var barIndex = supportedLocaleString.indexOf ("|");
var localeStringTokenizer = null;
localeStringTokenizer =  new java.util.StringTokenizer (supportedLocaleString.substring (0, barIndex));
var locales =  new Array (localeStringTokenizer.countTokens ());
for (var i = 0; i < locales.length; i++) {
var currentToken = localeStringTokenizer.nextToken ();
var p2 = 0;
var p1 = currentToken.indexOf ('_');
var language = "";
var country = "";
var variant = "";
if (p1 == -1) {
language = currentToken;
} else {
language = currentToken.substring (0, p1);
p2 = currentToken.indexOf ('_', p1 + 1);
if (p2 == -1) {
country = currentToken.substring (p1 + 1);
} else {
country = currentToken.substring (p1 + 1, p2);
if (p2 < currentToken.length) {
variant = currentToken.substring (p2 + 1);
}}}locales[i] =  new java.util.Locale (language, country, variant);
}
return locales;
}, $fz.isPrivate = true, $fz));
c$.$LocaleData$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.util.resources, "LocaleData$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return java.util.ResourceBundle.getBundle (this.f$.baseName, this.f$.locale, jssun.util.resources.LocaleData.LocaleDataResourceBundleControl.getRBControlInstance ());
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.util.resources.LocaleData, "AvailableLocales");
c$.localeList = c$.prototype.localeList = jssun.util.resources.LocaleData.createLocaleList ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.util.resources.LocaleData, "LocaleDataResourceBundleControl", java.util.ResourceBundle.Control);
c$.getRBControlInstance = Clazz.defineMethod (c$, "getRBControlInstance", 
function () {
return jssun.util.resources.LocaleData.LocaleDataResourceBundleControl.rbControlInstance;
});
Clazz.defineMethod (c$, "getCandidateLocales", 
function (a, b) {
var c = Clazz.superCall (this, jssun.util.resources.LocaleData.LocaleDataResourceBundleControl, "getCandidateLocales", [a, b]);
var d = jssun.util.resources.LocaleData.SwingJSSupportedLocales;
if (d.length == 0) {
return c;
}for (var e = c.iterator (); e.hasNext (); ) {
var f = e.next ().toString ();
if (f.length != 0 && d.indexOf (" " + f + " ") == -1) {
e.remove ();
}}
return c;
}, "~S,java.util.Locale");
Clazz.overrideMethod (c$, "getFallbackLocale", 
function (a, b) {
if (a == null || b == null) {
throw  new NullPointerException ();
}return null;
}, "~S,java.util.Locale");
c$.rbControlInstance = c$.prototype.rbControlInstance =  new jssun.util.resources.LocaleData.LocaleDataResourceBundleControl ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"SwingJSSupportedLocales", "en|");
});
