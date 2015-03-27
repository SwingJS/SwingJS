Clazz.declarePackage ("jsjava.text");
Clazz.load (["java.util.Hashtable"], "jsjava.text.DecimalFormatSymbols", ["java.lang.InternalError", "$.NullPointerException", "java.util.Currency", "$.Locale", "jssun.util.resources.LocaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.zeroDigit = '\0';
this.groupingSeparator = '\0';
this.decimalSeparator = '\0';
this.perMill = '\0';
this.percent = '\0';
this.digit = '\0';
this.patternSeparator = '\0';
this.infinity = null;
this.NaN = null;
this.minusSign = '\0';
this.currencySymbol = null;
this.intlCurrencySymbol = null;
this.monetarySeparator = '\0';
this.exponential = '\0';
this.exponentialSeparator = null;
this.locale = null;
this.currency = null;
this.serialVersionOnStream = 3;
Clazz.instantialize (this, arguments);
}, jsjava.text, "DecimalFormatSymbols", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.initialize (java.util.Locale.getDefault ());
});
Clazz.makeConstructor (c$, 
function (locale) {
this.initialize (locale);
}, "java.util.Locale");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jsjava.text.DecimalFormatSymbols.getInstance (java.util.Locale.getDefault ());
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (locale) {
return  new jsjava.text.DecimalFormatSymbols (locale);
}, "java.util.Locale");
Clazz.defineMethod (c$, "getZeroDigit", 
function () {
return this.zeroDigit;
});
Clazz.defineMethod (c$, "setZeroDigit", 
function (zeroDigit) {
this.zeroDigit = zeroDigit;
}, "~S");
Clazz.defineMethod (c$, "getGroupingSeparator", 
function () {
return this.groupingSeparator;
});
Clazz.defineMethod (c$, "setGroupingSeparator", 
function (groupingSeparator) {
this.groupingSeparator = groupingSeparator;
}, "~S");
Clazz.defineMethod (c$, "getDecimalSeparator", 
function () {
return this.decimalSeparator;
});
Clazz.defineMethod (c$, "setDecimalSeparator", 
function (decimalSeparator) {
this.decimalSeparator = decimalSeparator;
}, "~S");
Clazz.defineMethod (c$, "getPerMill", 
function () {
return this.perMill;
});
Clazz.defineMethod (c$, "setPerMill", 
function (perMill) {
this.perMill = perMill;
}, "~S");
Clazz.defineMethod (c$, "getPercent", 
function () {
return this.percent;
});
Clazz.defineMethod (c$, "setPercent", 
function (percent) {
this.percent = percent;
}, "~S");
Clazz.defineMethod (c$, "getDigit", 
function () {
return this.digit;
});
Clazz.defineMethod (c$, "setDigit", 
function (digit) {
this.digit = digit;
}, "~S");
Clazz.defineMethod (c$, "getPatternSeparator", 
function () {
return this.patternSeparator;
});
Clazz.defineMethod (c$, "setPatternSeparator", 
function (patternSeparator) {
this.patternSeparator = patternSeparator;
}, "~S");
Clazz.defineMethod (c$, "getInfinity", 
function () {
return this.infinity;
});
Clazz.defineMethod (c$, "setInfinity", 
function (infinity) {
this.infinity = infinity;
}, "~S");
Clazz.defineMethod (c$, "getNaN", 
function () {
return this.NaN;
});
Clazz.defineMethod (c$, "setNaN", 
function (NaN) {
this.NaN = NaN;
}, "~S");
Clazz.defineMethod (c$, "getMinusSign", 
function () {
return this.minusSign;
});
Clazz.defineMethod (c$, "setMinusSign", 
function (minusSign) {
this.minusSign = minusSign;
}, "~S");
Clazz.defineMethod (c$, "getCurrencySymbol", 
function () {
return this.currencySymbol;
});
Clazz.defineMethod (c$, "setCurrencySymbol", 
function (currency) {
this.currencySymbol = currency;
}, "~S");
Clazz.defineMethod (c$, "getInternationalCurrencySymbol", 
function () {
return this.intlCurrencySymbol;
});
Clazz.defineMethod (c$, "setInternationalCurrencySymbol", 
function (currencyCode) {
this.intlCurrencySymbol = currencyCode;
this.currency = null;
if (currencyCode != null) {
try {
this.currency = java.util.Currency.getInstance (currencyCode);
this.currencySymbol = this.currency.getSymbol ();
} catch (e) {
if (Clazz.exceptionOf (e, IllegalArgumentException)) {
} else {
throw e;
}
}
}}, "~S");
Clazz.defineMethod (c$, "getCurrency", 
function () {
return this.currency;
});
Clazz.defineMethod (c$, "setCurrency", 
function (currency) {
if (currency == null) {
throw  new NullPointerException ();
}this.currency = currency;
this.intlCurrencySymbol = currency.getCurrencyCode ();
this.currencySymbol = currency.getSymbol (this.locale);
}, "java.util.Currency");
Clazz.defineMethod (c$, "getMonetaryDecimalSeparator", 
function () {
return this.monetarySeparator;
});
Clazz.defineMethod (c$, "setMonetaryDecimalSeparator", 
function (sep) {
this.monetarySeparator = sep;
}, "~S");
Clazz.defineMethod (c$, "getExponentialSymbol", 
function () {
return this.exponential;
});
Clazz.defineMethod (c$, "getExponentSeparator", 
function () {
return this.exponentialSeparator;
});
Clazz.defineMethod (c$, "setExponentialSymbol", 
function (exp) {
this.exponential = exp;
}, "~S");
Clazz.defineMethod (c$, "setExponentSeparator", 
function (exp) {
if (exp == null) {
throw  new NullPointerException ();
}this.exponentialSeparator = exp;
}, "~S");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, jsjava.text.DecimalFormatSymbols, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) return false;
if (this === obj) return true;
if (this.getClass () !== obj.getClass ()) return false;
var other = obj;
return (this.zeroDigit == other.zeroDigit && this.groupingSeparator == other.groupingSeparator && this.decimalSeparator == other.decimalSeparator && this.percent == other.percent && this.perMill == other.perMill && this.digit == other.digit && this.minusSign == other.minusSign && this.patternSeparator == other.patternSeparator && this.infinity.equals (other.infinity) && this.NaN.equals (other.NaN) && this.currencySymbol.equals (other.currencySymbol) && this.intlCurrencySymbol.equals (other.intlCurrencySymbol) && this.currency === other.currency && this.monetarySeparator == other.monetarySeparator && this.exponentialSeparator.equals (other.exponentialSeparator) && this.locale.equals (other.locale));
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var result = (this.zeroDigit).charCodeAt (0);
result = result * 37 + this.groupingSeparator.charCodeAt (0);
result = result * 37 + this.decimalSeparator.charCodeAt (0);
return result;
});
Clazz.defineMethod (c$, "initialize", 
($fz = function (locale) {
this.locale = locale;
var needCacheUpdate = false;
var data = jsjava.text.DecimalFormatSymbols.cachedLocaleData.get (locale);
if (data == null) {
data =  new Array (3);
var rb = jssun.util.resources.LocaleData.getNumberFormatData (locale);
data[0] = rb.getStringArray ("NumberElements");
needCacheUpdate = true;
}var numberElements = data[0];
this.decimalSeparator = numberElements[0].charAt (0);
this.groupingSeparator = numberElements[1].charAt (0);
this.patternSeparator = numberElements[2].charAt (0);
this.percent = numberElements[3].charAt (0);
this.zeroDigit = numberElements[4].charAt (0);
this.digit = numberElements[5].charAt (0);
this.minusSign = numberElements[6].charAt (0);
this.exponential = numberElements[7].charAt (0);
this.exponentialSeparator = numberElements[7];
this.perMill = numberElements[8].charAt (0);
this.infinity = numberElements[9];
this.NaN = numberElements[10];
if (!"".equals (locale.getCountry ())) {
try {
this.currency = java.util.Currency.getInstance (locale);
} catch (e) {
if (Clazz.exceptionOf (e, IllegalArgumentException)) {
} else {
throw e;
}
}
}if (this.currency != null) {
this.intlCurrencySymbol = this.currency.getCurrencyCode ();
if (data[1] != null && data[1] === this.intlCurrencySymbol) {
this.currencySymbol = data[2];
} else {
this.currencySymbol = this.currency.getSymbol (locale);
data[1] = this.intlCurrencySymbol;
data[2] = this.currencySymbol;
needCacheUpdate = true;
}} else {
this.intlCurrencySymbol = "XXX";
try {
this.currency = java.util.Currency.getInstance (this.intlCurrencySymbol);
} catch (e) {
if (Clazz.exceptionOf (e, IllegalArgumentException)) {
} else {
throw e;
}
}
this.currencySymbol = "\u00A4";
}this.monetarySeparator = this.decimalSeparator;
if (needCacheUpdate) {
jsjava.text.DecimalFormatSymbols.cachedLocaleData.put (locale, data);
}}, $fz.isPrivate = true, $fz), "java.util.Locale");
Clazz.defineStatics (c$,
"currentSerialVersion", 3);
c$.cachedLocaleData = c$.prototype.cachedLocaleData =  new java.util.Hashtable (3);
});
