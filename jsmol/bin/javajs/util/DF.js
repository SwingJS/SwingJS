Clazz.declarePackage ("javajs.util");
Clazz.load (["java.lang.Boolean"], "javajs.util.DF", ["java.lang.Double", "$.Float", "javajs.util.PT", "$.SB"], function () {
c$ = Clazz.declareType (javajs.util, "DF");
c$.setUseNumberLocalization = Clazz.defineMethod (c$, "setUseNumberLocalization", 
function (TF) {
javajs.util.DF.useNumberLocalization[0] = (TF ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
c$.formatDecimalDbl = Clazz.defineMethod (c$, "formatDecimalDbl", 
function (value, decimalDigits) {
if (decimalDigits == 2147483647 || value == -Infinity || value == Infinity || Double.isNaN (value)) return "" + value;
return javajs.util.DF.formatDecimal (value, decimalDigits);
}, "~N,~N");
c$.formatDecimal = Clazz.defineMethod (c$, "formatDecimal", 
function (value, decimalDigits) {
if (decimalDigits == 2147483647 || value == -Infinity || value == Infinity || Float.isNaN (value)) return "" + value;
var n;
if (decimalDigits < 0) {
decimalDigits = -decimalDigits;
if (decimalDigits > javajs.util.DF.formattingStrings.length) decimalDigits = javajs.util.DF.formattingStrings.length;
if (value == 0) return javajs.util.DF.formattingStrings[decimalDigits] + "E+0";
n = 0;
var d;
if (Math.abs (value) < 1) {
n = 10;
d = value * 1e-10;
} else {
n = -10;
d = value * 1e10;
}var s = ("" + d).toUpperCase ();
var i = s.indexOf ("E");
n = javajs.util.PT.parseInt (s.substring (i + 1)) + n;
return (i < 0 ? "" + value : javajs.util.DF.formatDecimal (javajs.util.PT.parseFloat (s.substring (0, i)), decimalDigits - 1) + "E" + (n >= 0 ? "+" : "") + n);
}if (decimalDigits >= javajs.util.DF.formattingStrings.length) decimalDigits = javajs.util.DF.formattingStrings.length - 1;
var s1 = ("" + value).toUpperCase ();
var pt = s1.indexOf (".");
if (pt < 0) return s1 + javajs.util.DF.formattingStrings[decimalDigits].substring (1);
var isNeg = s1.startsWith ("-");
if (isNeg) {
s1 = s1.substring (1);
pt--;
}var pt1 = s1.indexOf ("E-");
if (pt1 > 0) {
n = javajs.util.PT.parseInt (s1.substring (pt1 + 1));
s1 = "0." + "0000000000000000000000000000000000000000".substring (0, -n - 1) + s1.substring (0, 1) + s1.substring (2, pt1);
pt = 1;
}pt1 = s1.indexOf ("E");
if (pt1 > 0) {
n = javajs.util.PT.parseInt (s1.substring (pt1 + 1));
s1 = s1.substring (0, 1) + s1.substring (2, pt1) + "0000000000000000000000000000000000000000";
s1 = s1.substring (0, n + 1) + "." + s1.substring (n + 1);
pt = s1.indexOf (".");
}var len = s1.length;
var pt2 = decimalDigits + pt + 1;
if (pt2 < len && s1.charAt (pt2) >= '5') {
return javajs.util.DF.formatDecimal (value + (isNeg ? -1 : 1) * javajs.util.DF.formatAdds[decimalDigits], decimalDigits);
}var sb = javajs.util.SB.newS (s1.substring (0, (decimalDigits == 0 ? pt : ++pt)));
for (var i = 0; i < decimalDigits; i++, pt++) {
if (pt < len) sb.appendC (s1.charAt (pt));
 else sb.appendC ('0');
}
s1 = (isNeg ? "-" : "") + sb;
return (Boolean.TRUE.equals (javajs.util.DF.useNumberLocalization[0]) ? s1 : s1.$replace (',', '.'));
}, "~N,~N");
c$.formatDecimalTrimmed = Clazz.defineMethod (c$, "formatDecimalTrimmed", 
function (x, precision) {
var str = javajs.util.DF.formatDecimalDbl (x, precision);
var m = str.length - 1;
var zero = '0';
while (m >= 0 && str.charAt (m) == zero) m--;

return str.substring (0, m + 1);
}, "~N,~N");
Clazz.defineStatics (c$,
"formattingStrings",  Clazz.newArray (-1, ["0", "0.0", "0.00", "0.000", "0.0000", "0.00000", "0.000000", "0.0000000", "0.00000000", "0.000000000"]),
"zeros", "0000000000000000000000000000000000000000",
"formatAdds",  Clazz.newFloatArray (-1, [0.5, 0.05, 0.005, 0.0005, 0.00005, 0.000005, 0.0000005, 0.00000005, 0.000000005, 0.0000000005]));
c$.useNumberLocalization = c$.prototype.useNumberLocalization =  Clazz.newArray (-1, [Boolean.TRUE]);
});
