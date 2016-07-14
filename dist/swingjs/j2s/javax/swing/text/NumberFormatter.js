Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.InternationalFormatter", "java.text.NumberFormat"], "javax.swing.text.NumberFormatter", ["java.lang.Byte", "$.Character", "$.Double", "$.Float", "$.Long", "$.Number", "$.Short", "$.StringBuffer", "java.text.DecimalFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.specialChars = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "NumberFormatter", javax.swing.text.InternationalFormatter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.NumberFormatter, []);
this.setN (java.text.NumberFormat.getNumberInstance ());
});
Clazz.makeConstructor (c$, 
function (format) {
Clazz.superConstructor (this, javax.swing.text.NumberFormatter, []);
this.setN (format);
}, "java.text.NumberFormat");
Clazz.defineMethod (c$, "setN", 
 function (format) {
this.setFormat (format);
this.setAllowsInvalid (true);
this.setCommitsOnValidEdit (false);
this.setOverwriteMode (false);
}, "java.text.NumberFormat");
Clazz.defineMethod (c$, "setFormat", 
function (format) {
Clazz.superCall (this, javax.swing.text.NumberFormatter, "setFormat", [format]);
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
}}, "java.text.Format");
Clazz.overrideMethod (c$, "stringToValueParse", 
function (text, f) {
if (f == null) {
return text;
}var value = f.parseObject (text);
return this.convertValueToValueClass (value, this.getValueClass ());
}, "~S,java.text.Format");
Clazz.defineMethod (c$, "convertValueToValueClass", 
 function (value, valueClass) {
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
}, "~O,Class");
Clazz.defineMethod (c$, "getPositiveSign", 
 function () {
return '+';
});
Clazz.defineMethod (c$, "getMinusSign", 
 function () {
var dfs = this.getDecimalFormatSymbols ();
if (dfs != null) {
return dfs.getMinusSign ();
}return '-';
});
Clazz.defineMethod (c$, "getDecimalSeparator", 
 function () {
var dfs = this.getDecimalFormatSymbols ();
if (dfs != null) {
return dfs.getDecimalSeparator ();
}return '.';
});
Clazz.defineMethod (c$, "getDecimalFormatSymbols", 
 function () {
var f = this.getFormat ();
if (Clazz.instanceOf (f, java.text.DecimalFormat)) {
return (f).getDecimalFormatSymbols ();
}return null;
});
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
if (!Clazz.superCall (this, javax.swing.text.NumberFormatter, "isLiteral", [attrs])) {
if (attrs == null) {
return false;
}var size = attrs.size ();
if (attrs.get (java.text.NumberFormat.Field.GROUPING_SEPARATOR) != null) {
size--;
if (attrs.get (java.text.NumberFormat.Field.INTEGER) != null) {
size--;
}}if (attrs.get (java.text.NumberFormat.Field.EXPONENT_SYMBOL) != null) {
size--;
}if (attrs.get (java.text.NumberFormat.Field.PERCENT) != null) {
size--;
}if (attrs.get (java.text.NumberFormat.Field.PERMILLE) != null) {
size--;
}if (attrs.get (java.text.NumberFormat.Field.CURRENCY) != null) {
size--;
}if (attrs.get (java.text.NumberFormat.Field.SIGN) != null) {
size--;
}if (size == 0) {
return true;
}return false;
}return true;
}, "java.util.Map");
Clazz.defineMethod (c$, "isNavigatable", 
function (index) {
if (!Clazz.superCall (this, javax.swing.text.NumberFormatter, "isNavigatable", [index])) {
if (this.getBufferedChar (index) == this.getDecimalSeparator ()) {
return true;
}return false;
}return true;
}, "~N");
Clazz.defineMethod (c$, "getFieldFrom", 
 function (index, direction) {
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
if (Clazz.instanceOf (key, java.text.NumberFormat.Field)) {
return key;
}}
}index += direction;
}
}return null;
}, "~N,~N");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, string, attr) {
if (!this.getAllowsInvalid () && length == 0 && string != null && string.length == 1 && this.toggleSignIfNecessary (fb, offset, string.charAt (0))) {
return;
}Clazz.superCall (this, javax.swing.text.NumberFormatter, "replace", [fb, offset, length, string, attr]);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "toggleSignIfNecessary", 
 function (fb, offset, aChar) {
if (aChar == this.getMinusSign () || aChar == this.getPositiveSign ()) {
var field = this.getFieldFrom (offset, -1);
var newValue;
try {
if (field == null || (field !== java.text.NumberFormat.Field.EXPONENT && field !== java.text.NumberFormat.Field.EXPONENT_SYMBOL && field !== java.text.NumberFormat.Field.EXPONENT_SIGN)) {
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
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
this.invalidEdit ();
} else {
throw pe;
}
}
}return false;
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~S");
Clazz.defineMethod (c$, "toggleSign", 
 function (positive) {
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
var cons = valueClass.getConstructor ([String]);
if (cons != null) {
return cons.newInstance ([string]);
}} catch (ex) {
}
}}}return null;
}, "~B");
Clazz.defineMethod (c$, "toggleExponentSign", 
 function (offset, aChar) {
var string = this.getFormattedTextField ().getText ();
var replaceLength = 0;
var loc = this.getAttributeStart (java.text.NumberFormat.Field.EXPONENT_SIGN);
if (loc >= 0) {
replaceLength = 1;
offset = loc;
}if (aChar == this.getPositiveSign ()) {
string = this.getReplaceString (offset, replaceLength, null);
} else {
string = this.getReplaceString (offset, replaceLength,  String.instantialize ([aChar]));
}return this.stringToValue (string);
}, "~N,~S");
});
