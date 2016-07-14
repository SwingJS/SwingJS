Clazz.declarePackage ("sun.util.calendar");
c$ = Clazz.declareType (sun.util.calendar, "CalendarUtils");
c$.isGregorianLeapYear = Clazz.defineMethod (c$, "isGregorianLeapYear", 
function (gregorianYear) {
return (((gregorianYear % 4) == 0) && (((gregorianYear % 100) != 0) || ((gregorianYear % 400) == 0)));
}, "~N");
c$.isJulianLeapYear = Clazz.defineMethod (c$, "isJulianLeapYear", 
function (normalizedJulianYear) {
return (normalizedJulianYear % 4) == 0;
}, "~N");
c$.floorDivide = Clazz.defineMethod (c$, "floorDivide", 
function (n, d) {
return ((n >= 0) ? (Clazz.doubleToInt (n / d)) : ((Clazz.doubleToInt ((n + 1) / d)) - 1));
}, "~N,~N");
c$.floorDivide = Clazz.defineMethod (c$, "floorDivide", 
function (n, d) {
return ((n >= 0) ? (Clazz.doubleToInt (n / d)) : ((Clazz.doubleToInt ((n + 1) / d)) - 1));
}, "~N,~N");
c$.floorDivide = Clazz.defineMethod (c$, "floorDivide", 
function (n, d, r) {
if (n >= 0) {
r[0] = n % d;
return Clazz.doubleToInt (n / d);
}var q = (Clazz.doubleToInt ((n + 1) / d)) - 1;
r[0] = n - (q * d);
return q;
}, "~N,~N,~A");
c$.mod = Clazz.defineMethod (c$, "mod", 
function (x, y) {
return (x - y * sun.util.calendar.CalendarUtils.floorDivide (x, y));
}, "~N,~N");
c$.mod = Clazz.defineMethod (c$, "mod", 
function (x, y) {
return (x - y * sun.util.calendar.CalendarUtils.floorDivide (x, y));
}, "~N,~N");
c$.amod = Clazz.defineMethod (c$, "amod", 
function (x, y) {
var z = sun.util.calendar.CalendarUtils.mod (x, y);
return (z == 0) ? y : z;
}, "~N,~N");
c$.amod = Clazz.defineMethod (c$, "amod", 
function (x, y) {
var z = sun.util.calendar.CalendarUtils.mod (x, y);
return (z == 0) ? y : z;
}, "~N,~N");
c$.sprintf0d = Clazz.defineMethod (c$, "sprintf0d", 
function (sb, value, width) {
var d = value;
if (d < 0) {
sb.append ('-');
d = -d;
--width;
}var n = 10;
for (var i = 2; i < width; i++) {
n *= 10;
}
for (var i = 1; i < width && d < n; i++) {
sb.append ('0');
n = Clazz.doubleToInt (n / 10);
}
sb.append ("" + d);
return sb;
}, "StringBuilder,~N,~N");
c$.sprintf0d = Clazz.defineMethod (c$, "sprintf0d", 
function (sb, value, width) {
var d = value;
if (d < 0) {
sb.append ('-');
d = -d;
--width;
}var n = 10;
for (var i = 2; i < width; i++) {
n *= 10;
}
for (var i = 1; i < width && d < n; i++) {
sb.append ('0');
n = Clazz.doubleToInt (n / 10);
}
sb.append ("" + d);
return sb;
}, "StringBuffer,~N,~N");
