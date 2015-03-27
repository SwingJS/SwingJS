Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.Format", "java.util.HashMap", "$.Hashtable"], "jsjava.text.NumberFormat", ["java.lang.Byte", "$.IllegalArgumentException", "$.Long", "$.Number", "$.Short", "$.StringBuffer", "$.UnsupportedOperationException", "java.util.Locale", "jsjava.text.DecimalFormatSymbols", "$.DontCareFieldPosition", "$.ParseException", "$.ParsePosition", "jssun.util.resources.LocaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.groupingUsed = true;
this.maxFractionDigits = 3;
this.parseIntegerOnly = false;
this.maximumIntegerDigits = 40;
this.minimumIntegerDigits = 1;
this.maximumFractionDigits = 3;
this.minimumFractionDigits = 0;
Clazz.instantialize (this, arguments);
}, jsjava.text, "NumberFormat", jsjava.text.Format);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjava.text.NumberFormat, []);
});
Clazz.defineMethod (c$, "format", 
function (number, toAppendTo, pos) {
if (Clazz.instanceOf (number, Long) || Clazz.instanceOf (number, Integer) || Clazz.instanceOf (number, Short) || Clazz.instanceOf (number, Byte)) {
return this.format ((number).longValue (), toAppendTo, pos);
} else if (Clazz.instanceOf (number, Number)) {
return this.format ((number).doubleValue (), toAppendTo, pos);
} else {
throw  new IllegalArgumentException ("Cannot format given Object as a Number");
}}, "~O,StringBuffer,jsjava.text.FieldPosition");
Clazz.defineMethod (c$, "parseObject", 
function (source, pos) {
return this.parse (source, pos);
}, "~S,jsjava.text.ParsePosition");
Clazz.defineMethod (c$, "format", 
function (number) {
return this.format (number,  new StringBuffer (), jsjava.text.DontCareFieldPosition.INSTANCE).toString ();
}, "~N");
Clazz.defineMethod (c$, "format", 
function (number) {
return this.format (number,  new StringBuffer (), jsjava.text.DontCareFieldPosition.INSTANCE).toString ();
}, "~N");
Clazz.defineMethod (c$, "parse", 
function (source) {
var parsePosition =  new jsjava.text.ParsePosition (0);
var result = this.parse (source, parsePosition);
if (parsePosition.index == 0) {
throw  new jsjava.text.ParseException ("Unparseable number: \"" + source + "\"", parsePosition.errorIndex);
}return result;
}, "~S");
Clazz.defineMethod (c$, "isParseIntegerOnly", 
function () {
return this.parseIntegerOnly;
});
Clazz.defineMethod (c$, "setParseIntegerOnly", 
function (value) {
this.parseIntegerOnly = value;
}, "~B");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 0);
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 0);
}, "java.util.Locale");
c$.getNumberInstance = Clazz.defineMethod (c$, "getNumberInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 0);
});
c$.getNumberInstance = Clazz.defineMethod (c$, "getNumberInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 0);
}, "java.util.Locale");
c$.getIntegerInstance = Clazz.defineMethod (c$, "getIntegerInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 4);
});
c$.getIntegerInstance = Clazz.defineMethod (c$, "getIntegerInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 4);
}, "java.util.Locale");
c$.getCurrencyInstance = Clazz.defineMethod (c$, "getCurrencyInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 1);
});
c$.getCurrencyInstance = Clazz.defineMethod (c$, "getCurrencyInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 1);
}, "java.util.Locale");
c$.getPercentInstance = Clazz.defineMethod (c$, "getPercentInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 2);
});
c$.getPercentInstance = Clazz.defineMethod (c$, "getPercentInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 2);
}, "java.util.Locale");
c$.getScientificInstance = Clazz.defineMethod (c$, "getScientificInstance", 
function () {
return jsjava.text.NumberFormat.getInstance (java.util.Locale.getDefault (), 3);
});
c$.getScientificInstance = Clazz.defineMethod (c$, "getScientificInstance", 
function (inLocale) {
return jsjava.text.NumberFormat.getInstance (inLocale, 3);
}, "java.util.Locale");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.maximumIntegerDigits * 37 + this.maxFractionDigits;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) {
return false;
}if (this === obj) {
return true;
}if (this.getClass () !== obj.getClass ()) {
return false;
}var other = obj;
return (this.maximumIntegerDigits == other.maximumIntegerDigits && this.minimumIntegerDigits == other.minimumIntegerDigits && this.maximumFractionDigits == other.maximumFractionDigits && this.minimumFractionDigits == other.minimumFractionDigits && this.groupingUsed == other.groupingUsed && this.parseIntegerOnly == other.parseIntegerOnly);
}, "~O");
Clazz.defineMethod (c$, "clone", 
function () {
var other = Clazz.superCall (this, jsjava.text.NumberFormat, "clone", []);
return other;
});
Clazz.defineMethod (c$, "isGroupingUsed", 
function () {
return this.groupingUsed;
});
Clazz.defineMethod (c$, "setGroupingUsed", 
function (newValue) {
this.groupingUsed = newValue;
}, "~B");
Clazz.defineMethod (c$, "getMaximumIntegerDigits", 
function () {
return this.maximumIntegerDigits;
});
Clazz.defineMethod (c$, "setMaximumIntegerDigits", 
function (newValue) {
this.maximumIntegerDigits = Math.max (0, newValue);
if (this.minimumIntegerDigits > this.maximumIntegerDigits) {
this.minimumIntegerDigits = this.maximumIntegerDigits;
}}, "~N");
Clazz.defineMethod (c$, "getMinimumIntegerDigits", 
function () {
return this.minimumIntegerDigits;
});
Clazz.defineMethod (c$, "setMinimumIntegerDigits", 
function (newValue) {
this.minimumIntegerDigits = Math.max (0, newValue);
if (this.minimumIntegerDigits > this.maximumIntegerDigits) {
this.maximumIntegerDigits = this.minimumIntegerDigits;
}}, "~N");
Clazz.defineMethod (c$, "getMaximumFractionDigits", 
function () {
return this.maximumFractionDigits;
});
Clazz.defineMethod (c$, "setMaximumFractionDigits", 
function (newValue) {
this.maximumFractionDigits = Math.max (0, newValue);
if (this.maximumFractionDigits < this.minimumFractionDigits) {
this.minimumFractionDigits = this.maximumFractionDigits;
}}, "~N");
Clazz.defineMethod (c$, "getMinimumFractionDigits", 
function () {
return this.minimumFractionDigits;
});
Clazz.defineMethod (c$, "setMinimumFractionDigits", 
function (newValue) {
this.minimumFractionDigits = Math.max (0, newValue);
if (this.maximumFractionDigits < this.minimumFractionDigits) {
this.maximumFractionDigits = this.minimumFractionDigits;
}}, "~N");
Clazz.defineMethod (c$, "getCurrency", 
function () {
throw  new UnsupportedOperationException ();
});
Clazz.defineMethod (c$, "setCurrency", 
function (currency) {
throw  new UnsupportedOperationException ();
}, "java.util.Currency");
Clazz.defineMethod (c$, "getRoundingMode", 
function () {
throw  new UnsupportedOperationException ();
});
Clazz.defineMethod (c$, "setRoundingMode", 
function (roundingMode) {
throw  new UnsupportedOperationException ();
}, "jsjava.math.RoundingMode");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
($fz = function (desiredLocale, choice) {
var numberPatterns = jsjava.text.NumberFormat.cachedLocaleData.get (desiredLocale);
if (numberPatterns == null) {
var resource = jssun.util.resources.LocaleData.getNumberFormatData (desiredLocale);
numberPatterns = resource.getStringArray ("NumberPatterns");
jsjava.text.NumberFormat.cachedLocaleData.put (desiredLocale, numberPatterns);
}var symbols = jsjava.text.DecimalFormatSymbols.getInstance (desiredLocale);
var entry = (choice == 4) ? 0 : choice;
var format =  new jsjava.text.DecimalFormat (numberPatterns[entry], symbols);
if (choice == 4) {
format.setMaximumFractionDigits (0);
format.setDecimalSeparatorAlwaysShown (false);
format.setParseIntegerOnly (true);
} else if (choice == 1) {
format.adjustForCurrencyDefaultFractionDigits ();
}return format;
}, $fz.isPrivate = true, $fz), "java.util.Locale,~N");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.text.NumberFormat, "Field", jsjava.text.Format.Field);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjava.text.NumberFormat.Field, [a]);
if (this.getClass () === jsjava.text.NumberFormat.Field) {
jsjava.text.NumberFormat.Field.$instanceMap.put (a, this);
}}, "~S");
c$.$instanceMap = c$.prototype.$instanceMap =  new java.util.HashMap (11);
c$.INTEGER = c$.prototype.INTEGER =  new jsjava.text.NumberFormat.Field ("integer");
c$.FRACTION = c$.prototype.FRACTION =  new jsjava.text.NumberFormat.Field ("fraction");
c$.EXPONENT = c$.prototype.EXPONENT =  new jsjava.text.NumberFormat.Field ("exponent");
c$.DECIMAL_SEPARATOR = c$.prototype.DECIMAL_SEPARATOR =  new jsjava.text.NumberFormat.Field ("decimal separator");
c$.SIGN = c$.prototype.SIGN =  new jsjava.text.NumberFormat.Field ("sign");
c$.GROUPING_SEPARATOR = c$.prototype.GROUPING_SEPARATOR =  new jsjava.text.NumberFormat.Field ("grouping separator");
c$.EXPONENT_SYMBOL = c$.prototype.EXPONENT_SYMBOL =  new jsjava.text.NumberFormat.Field ("exponent symbol");
c$.PERCENT = c$.prototype.PERCENT =  new jsjava.text.NumberFormat.Field ("percent");
c$.PERMILLE = c$.prototype.PERMILLE =  new jsjava.text.NumberFormat.Field ("per mille");
c$.CURRENCY = c$.prototype.CURRENCY =  new jsjava.text.NumberFormat.Field ("currency");
c$.EXPONENT_SIGN = c$.prototype.EXPONENT_SIGN =  new jsjava.text.NumberFormat.Field ("exponent sign");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"INTEGER_FIELD", 0,
"FRACTION_FIELD", 1);
c$.cachedLocaleData = c$.prototype.cachedLocaleData =  new java.util.Hashtable (3);
Clazz.defineStatics (c$,
"NUMBERSTYLE", 0,
"CURRENCYSTYLE", 1,
"PERCENTSTYLE", 2,
"SCIENTIFICSTYLE", 3,
"INTEGERSTYLE", 4,
"currentSerialVersion", 1);
});
