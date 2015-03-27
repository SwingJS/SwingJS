Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.InternationalFormatter"], "jsjavax.swing.text.NumberFormatter", ["java.lang.Byte", "$.Character", "$.Double", "$.Float", "$.Long", "$.Number", "$.Short", "$.StringBuffer", "jsjava.text.DecimalFormat", "$.NumberFormat", "jsjava.text.NumberFormat.Field"], function () {
c$ = Clazz.decorateAsClass (function () {
this.specialChars = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "NumberFormatter", jsjavax.swing.text.InternationalFormatter);
Clazz.makeConstructor (c$, 
function () {
this.construct (jsjava.text.NumberFormat.getNumberInstance ());
});
Clazz.makeConstructor (c$, 
function (format) {
Clazz.superConstructor (this, jsjavax.swing.text.NumberFormatter, [format]);
this.setFormat (format);
this.setAllowsInvalid (true);
this.setCommitsOnValidEdit (false);
this.setOverwriteMode (false);
}, "jsjava.text.NumberFormat");
Clazz.defineMethod (c$, "setFormat", 
function (format) {
Clazz.superCall (this, jsjavax.swing.text.NumberFormatter, "setFormat", [format]);
var dfs = this.getDecimalFormatSymbols ();
if (dfs != null) {
var sb =  new StringBuffer ();
sb.append (dfs.getCurrencySymbol ());
sb.append (dfs.getDecimalSeparator ());
sb.append (dfs.getGroupingSeparator ());
sb.append (dfs.getInfinity ());
sb.append (dfs.getInternationalCurrencySymbol ());
sb.append (dfs.getMinusSign ());
sb.append (dfs.getMonetaryDecimalSeparator ());
sb.append (dfs.getNaN ());
sb.append (dfs.getPercent ());
sb.append ('+');
this.specialChars = sb.toString ();
} else {
this.specialChars = "";
}}, "jsjava.text.Format");
Clazz.defineMethod (c$, "stringToValue", 
function (text, f) {
if (f == null) {
return text;
}var value = f.parseObject (text);
return this.convertValueToValueClass (value, this.getValueClass ());
}, "~S,jsjava.text.Format");
Clazz.defineMethod (c$, "convertValueToValueClass", 
($fz = function (value, valueClass) {
if (valueClass != null && (Clazz.instanceOf (value, Number))) {
if (valueClass === Integer) {
return  new Integer ((value).intValue ());
} else if (valueClass === Long) {
return  new Long ((value).longValue ());
} else if (valueClass === Float) {
return  new Float ((value).floatValue ());
} else if (valueClass === Double) {
return  new Double ((value).doubleValue ());
} else if (valueClass === Byte) {
return  new Byte ((value).byteValue ());
} else if (valueClass === Short) {
return  new Short ((value).shortValue ());
}}return value;
}, $fz.isPrivate = true, $fz), "~O,Class");
Clazz.defineMethod (c$, "getPositiveSign", 
($fz = function () {
return '+';
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMinusSign", 
($fz = function () {
var dfs = this.getDecimalFormatSymbols ();
if (dfs != null) {
return dfs.getMinusSign ();
}return '-';
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDecimalSeparator", 
($fz = function () {
var dfs = this.getDecimalFormatSymbols ();
if (dfs != null) {
return dfs.getDecimalSeparator ();
}return '.';
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDecimalFormatSymbols", 
($fz = function () {
var f = this.getFormat ();
if (Clazz.instanceOf (f, jsjava.text.DecimalFormat)) {
return (f).getDecimalFormatSymbols ();
}return null;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "isLegalInsertText", 
function (text) {
if (this.getAllowsInvalid ()) {
return true;
}for (var counter = text.length - 1; counter >= 0; counter--) {
var aChar = text.charAt (counter);
if (!Character.isDigit (aChar) && this.specialChars.indexOf (aChar) == -1) {
return false;
}}
return true;
}, "~S");
Clazz.defineMethod (c$, "isLiteral", 
function (attrs) {
if (!Clazz.superCall (this, jsjavax.swing.text.NumberFormatter, "isLiteral", [attrs])) {
if (attrs == null) {
return false;
}var size = attrs.size ();
if (attrs.get (jsjava.text.NumberFormat.Field.GROUPING_SEPARATOR) != null) {
size--;
if (attrs.get (jsjava.text.NumberFormat.Field.INTEGER) != null) {
size--;
}}if (attrs.get (jsjava.text.NumberFormat.Field.EXPONENT_SYMBOL) != null) {
size--;
}if (attrs.get (jsjava.text.NumberFormat.Field.PERCENT) != null) {
size--;
}if (attrs.get (jsjava.text.NumberFormat.Field.PERMILLE) != null) {
size--;
}if (attrs.get (jsjava.text.NumberFormat.Field.CURRENCY) != null) {
size--;
}if (attrs.get (jsjava.text.NumberFormat.Field.SIGN) != null) {
size--;
}if (size == 0) {
return true;
}return false;
}return true;
}, "java.util.Map");
Clazz.defineMethod (c$, "isNavigatable", 
function (index) {
if (!Clazz.superCall (this, jsjavax.swing.text.NumberFormatter, "isNavigatable", [index])) {
if (this.getBufferedChar (index) == this.getDecimalSeparator ()) {
return true;
}return false;
}return true;
}, "~N");
Clazz.defineMethod (c$, "getFieldFrom", 
($fz = function (index, direction) {
if (this.isValidMask ()) {
var max = this.getFormattedTextField ().getDocument ().getLength ();
var iterator = this.getIterator ();
if (index >= max) {
index += direction;
}while (index >= 0 && index < max) {
iterator.setIndex (index);
var attrs = iterator.getAttributes ();
if (attrs != null && attrs.size () > 0) {
var keys = attrs.keySet ().iterator ();
while (keys.hasNext ()) {
var key = keys.next ();
if (Clazz.instanceOf (key, jsjava.text.NumberFormat.Field)) {
return key;
}}
}index += direction;
}
}return null;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, string, attr) {
if (!this.getAllowsInvalid () && length == 0 && string != null && string.length == 1 && this.toggleSignIfNecessary (fb, offset, string.charAt (0))) {
return;
}Clazz.superCall (this, jsjavax.swing.text.NumberFormatter, "replace", [fb, offset, length, string, attr]);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "toggleSignIfNecessary", 
($fz = function (fb, offset, aChar) {
if (aChar == this.getMinusSign () || aChar == this.getPositiveSign ()) {
var field = this.getFieldFrom (offset, -1);
var newValue;
try {
if (field == null || (field !== jsjava.text.NumberFormat.Field.EXPONENT && field !== jsjava.text.NumberFormat.Field.EXPONENT_SYMBOL && field !== jsjava.text.NumberFormat.Field.EXPONENT_SIGN)) {
newValue = this.toggleSign ((aChar == this.getPositiveSign ()));
} else {
newValue = this.toggleExponentSign (offset, aChar);
}if (newValue != null && this.isValidValue (newValue, false)) {
var lc = this.getLiteralCountTo (offset);
var string = this.valueToString (newValue);
fb.remove (0, fb.getDocument ().getLength ());
fb.insertString (0, string, null);
this.updateValue (newValue);
this.repositionCursor (this.getLiteralCountTo (offset) - lc + offset, 1);
return true;
}} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
this.invalidEdit ();
} else {
throw pe;
}
}
}return false;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~S");
Clazz.defineMethod (c$, "toggleSign", 
($fz = function (positive) {
var value = this.stringToValue (this.getFormattedTextField ().getText ());
if (value != null) {
var string = value.toString ();
if (string != null && string.length > 0) {
if (positive) {
if (string.charAt (0) == '-') {
string = string.substring (1);
}} else {
if (string.charAt (0) == '+') {
string = string.substring (1);
}if (string.length > 0 && string.charAt (0) != '-') {
string = "-" + string;
}}if (string != null) {
var valueClass = this.getValueClass ();
if (valueClass == null) {
valueClass = value.getClass ();
}try {
var cons = valueClass.getConstructor ( Clazz.newArray (-1, [String]));
if (cons != null) {
return cons.newInstance ( Clazz.newArray (-1, [string]));
}} catch (ex) {
}
}}}return null;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "toggleExponentSign", 
($fz = function (offset, aChar) {
var string = this.getFormattedTextField ().getText ();
var replaceLength = 0;
var loc = this.getAttributeStart (jsjava.text.NumberFormat.Field.EXPONENT_SIGN);
if (loc >= 0) {
replaceLength = 1;
offset = loc;
}if (aChar == this.getPositiveSign ()) {
string = this.getReplaceString (offset, replaceLength, null);
} else {
string = this.getReplaceString (offset, replaceLength,  String.instantialize ( Clazz.newCharArray (-1, [aChar])));
}return this.stringToValue (string);
}, $fz.isPrivate = true, $fz), "~N,~S");
});
