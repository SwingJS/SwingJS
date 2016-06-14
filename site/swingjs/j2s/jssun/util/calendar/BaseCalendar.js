Clazz.declarePackage ("jssun.util.calendar");
Clazz.load (["jssun.util.calendar.AbstractCalendar", "$.CalendarDate"], "jssun.util.calendar.BaseCalendar", ["java.lang.IllegalArgumentException", "jssun.util.calendar.CalendarUtils"], function () {
c$ = Clazz.declareType (jssun.util.calendar, "BaseCalendar", jssun.util.calendar.AbstractCalendar);
Clazz.overrideMethod (c$, "validate", 
function (date) {
var bdate = date;
if (bdate.isNormalized ()) {
return true;
}var month = bdate.getMonth ();
if (month < 1 || month > 12) {
return false;
}var d = bdate.getDayOfMonth ();
if (d <= 0 || d > this.getMonthLength (bdate.getNormalizedYear (), month)) {
return false;
}var dow = bdate.getDayOfWeek ();
if (dow != jssun.util.calendar.CalendarDate.FIELD_UNDEFINED && dow != this.getDayOfWeek (bdate)) {
return false;
}if (!this.validateTime (date)) {
return false;
}bdate.setNormalized (true);
return true;
}, "jssun.util.calendar.CalendarDate");
Clazz.overrideMethod (c$, "normalize", 
function (date) {
if (date.isNormalized ()) {
return true;
}var bdate = date;
var zi = bdate.getZone ();
if (zi != null) {
this.getTime (date);
return true;
}var days = this.normalizeTime (bdate);
this.normalizeMonth (bdate);
var d = bdate.getDayOfMonth () + days;
var m = bdate.getMonth ();
var y = bdate.getNormalizedYear ();
var ml = this.getMonthLength (y, m);
if (!(d > 0 && d <= ml)) {
if (d <= 0 && d > -28) {
ml = this.getMonthLength (y, --m);
d += ml;
bdate.setDayOfMonth (d);
if (m == 0) {
m = 12;
bdate.setNormalizedYear (y - 1);
}bdate.setMonth (m);
} else if (d > ml && d < (ml + 28)) {
d -= ml;
++m;
bdate.setDayOfMonth (d);
if (m > 12) {
bdate.setNormalizedYear (y + 1);
m = 1;
}bdate.setMonth (m);
} else {
var fixedDate = d + this.getFixedDate (y, m, 1, bdate) - 1;
this.getCalendarDateFromFixedDate (bdate, fixedDate);
}} else {
bdate.setDayOfWeek (this.getDayOfWeek (bdate));
}date.setLeapYear (this.isLeapYear (bdate.getNormalizedYear ()));
date.setZoneOffset (0);
date.setDaylightSaving (0);
bdate.setNormalized (true);
return true;
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "normalizeMonth", 
function (date) {
var bdate = date;
var year = bdate.getNormalizedYear ();
var month = bdate.getMonth ();
if (month <= 0) {
var xm = 1 - month;
year -= ((Clazz.doubleToInt (xm / 12)) + 1);
month = 13 - (xm % 12);
bdate.setNormalizedYear (year);
bdate.setMonth (month);
} else if (month > 12) {
year += (Clazz.doubleToInt ((month - 1) / 12));
month = ((month - 1)) % 12 + 1;
bdate.setNormalizedYear (year);
bdate.setMonth (month);
}}, "jssun.util.calendar.CalendarDate");
Clazz.overrideMethod (c$, "getYearLength", 
function (date) {
return this.isLeapYear ((date).getNormalizedYear ()) ? 366 : 365;
}, "jssun.util.calendar.CalendarDate");
Clazz.overrideMethod (c$, "getYearLengthInMonths", 
function (date) {
return 12;
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getMonthLength", 
function (date) {
var gdate = date;
var month = gdate.getMonth ();
if (month < 1 || month > 12) {
throw  new IllegalArgumentException ("Illegal month value: " + month);
}return this.getMonthLength (gdate.getNormalizedYear (), month);
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getMonthLength", 
 function (year, month) {
var days = jssun.util.calendar.BaseCalendar.DAYS_IN_MONTH[month];
if (month == 2 && this.isLeapYear (year)) {
days++;
}return days;
}, "~N,~N");
Clazz.defineMethod (c$, "getDayOfYear", 
function (date) {
return this.getDayOfYear ((date).getNormalizedYear (), date.getMonth (), date.getDayOfMonth ());
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getDayOfYear", 
function (year, month, dayOfMonth) {
return dayOfMonth + (this.isLeapYear (year) ? jssun.util.calendar.BaseCalendar.ACCUMULATED_DAYS_IN_MONTH_LEAP[month] : jssun.util.calendar.BaseCalendar.ACCUMULATED_DAYS_IN_MONTH[month]);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getFixedDate", 
function (date) {
if (!date.isNormalized ()) {
this.normalizeMonth (date);
}return this.getFixedDate ((date).getNormalizedYear (), date.getMonth (), date.getDayOfMonth (), date);
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getFixedDate", 
function (year, month, dayOfMonth, cache) {
var isJan1 = month == 1 && dayOfMonth == 1;
if (cache != null && cache.hit (year)) {
if (isJan1) {
return cache.getCachedJan1 ();
}return cache.getCachedJan1 () + this.getDayOfYear (year, month, dayOfMonth) - 1;
}var n = year - 1970;
if (n >= 0 && n < jssun.util.calendar.BaseCalendar.FIXED_DATES.length) {
var jan1 = jssun.util.calendar.BaseCalendar.FIXED_DATES[n];
if (cache != null) {
cache.setCache (year, jan1, this.isLeapYear (year) ? 366 : 365);
}return isJan1 ? jan1 : jan1 + this.getDayOfYear (year, month, dayOfMonth) - 1;
}var prevyear = year - 1;
var days = dayOfMonth;
if (prevyear >= 0) {
days += (365 * prevyear) + (Clazz.doubleToInt (prevyear / 4)) - (Clazz.doubleToInt (prevyear / 100)) + (Clazz.doubleToInt (prevyear / 400)) + (Clazz.doubleToInt ((367 * month - 362) / 12));
} else {
days += (365 * prevyear) + jssun.util.calendar.CalendarUtils.floorDivide (prevyear, 4) - jssun.util.calendar.CalendarUtils.floorDivide (prevyear, 100) + jssun.util.calendar.CalendarUtils.floorDivide (prevyear, 400) + jssun.util.calendar.CalendarUtils.floorDivide ((367 * month - 362), 12);
}if (month > 2) {
days -= this.isLeapYear (year) ? 1 : 2;
}if (cache != null && isJan1) {
cache.setCache (year, days, this.isLeapYear (year) ? 366 : 365);
}return days;
}, "~N,~N,~N,jssun.util.calendar.BaseCalendar.Date");
Clazz.overrideMethod (c$, "getCalendarDateFromFixedDate", 
function (date, fixedDate) {
var gdate = date;
var year;
var jan1;
var isLeap;
if (gdate.hit (fixedDate)) {
year = gdate.getCachedYear ();
jan1 = gdate.getCachedJan1 ();
isLeap = this.isLeapYear (year);
} else {
year = this.getGregorianYearFromFixedDate (fixedDate);
jan1 = this.getFixedDate (year, 1, 1, null);
isLeap = this.isLeapYear (year);
gdate.setCache (year, jan1, isLeap ? 366 : 365);
}var priorDays = (fixedDate - jan1);
var mar1 = jan1 + 31 + 28;
if (isLeap) {
++mar1;
}if (fixedDate >= mar1) {
priorDays += isLeap ? 1 : 2;
}var month = 12 * priorDays + 373;
if (month > 0) {
month = Clazz.doubleToInt (month / 367);
} else {
month = jssun.util.calendar.CalendarUtils.floorDivide (month, 367);
}var month1 = jan1 + jssun.util.calendar.BaseCalendar.ACCUMULATED_DAYS_IN_MONTH[month];
if (isLeap && month >= 3) {
++month1;
}var dayOfMonth = (fixedDate - month1) + 1;
var dayOfWeek = jssun.util.calendar.BaseCalendar.getDayOfWeekFromFixedDate (fixedDate);
gdate.setNormalizedYear (year);
gdate.setMonth (month);
gdate.setDayOfMonth (dayOfMonth);
gdate.setDayOfWeek (dayOfWeek);
gdate.setLeapYear (isLeap);
gdate.setNormalized (true);
}, "jssun.util.calendar.CalendarDate,~N");
Clazz.defineMethod (c$, "getDayOfWeek", 
function (date) {
var fixedDate = this.getFixedDate (date);
return jssun.util.calendar.BaseCalendar.getDayOfWeekFromFixedDate (fixedDate);
}, "jssun.util.calendar.CalendarDate");
c$.getDayOfWeekFromFixedDate = Clazz.defineMethod (c$, "getDayOfWeekFromFixedDate", 
function (fixedDate) {
if (fixedDate >= 0) {
return (fixedDate % 7) + 1;
}return jssun.util.calendar.CalendarUtils.mod (fixedDate, 7) + 1;
}, "~N");
Clazz.defineMethod (c$, "getYearFromFixedDate", 
function (fixedDate) {
return this.getGregorianYearFromFixedDate (fixedDate);
}, "~N");
Clazz.defineMethod (c$, "getGregorianYearFromFixedDate", 
function (fixedDate) {
var d0;
var d1;
var d2;
var d3;
var d4;
var n400;
var n100;
var n4;
var n1;
var year;
if (fixedDate > 0) {
d0 = fixedDate - 1;
n400 = (Clazz.doubleToInt (d0 / 146097));
d1 = (d0 % 146097);
n100 = Clazz.doubleToInt (d1 / 36524);
d2 = d1 % 36524;
n4 = Clazz.doubleToInt (d2 / 1461);
d3 = d2 % 1461;
n1 = Clazz.doubleToInt (d3 / 365);
d4 = (d3 % 365) + 1;
} else {
d0 = fixedDate - 1;
n400 = jssun.util.calendar.CalendarUtils.floorDivide (d0, 146097);
d1 = jssun.util.calendar.CalendarUtils.mod (d0, 146097);
n100 = jssun.util.calendar.CalendarUtils.floorDivide (d1, 36524);
d2 = jssun.util.calendar.CalendarUtils.mod (d1, 36524);
n4 = jssun.util.calendar.CalendarUtils.floorDivide (d2, 1461);
d3 = jssun.util.calendar.CalendarUtils.mod (d2, 1461);
n1 = jssun.util.calendar.CalendarUtils.floorDivide (d3, 365);
d4 = jssun.util.calendar.CalendarUtils.mod (d3, 365) + 1;
}year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
if (!(n100 == 4 || n1 == 4)) {
++year;
}return year;
}, "~N");
Clazz.defineMethod (c$, "isLeapYear", 
function (date) {
return this.isLeapYear ((date).getNormalizedYear ());
}, "jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "isLeapYear", 
function (normalizedYear) {
return jssun.util.calendar.CalendarUtils.isGregorianLeapYear (normalizedYear);
}, "~N");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.cachedYear = 2004;
this.cachedFixedDateJan1 = 731581;
this.cachedFixedDateNextJan1 = 0;
Clazz.instantialize (this, arguments);
}, jssun.util.calendar.BaseCalendar, "Date", jssun.util.calendar.CalendarDate);
Clazz.prepareFields (c$, function () {
this.cachedFixedDateNextJan1 = this.cachedFixedDateJan1 + 366;
});
Clazz.defineMethod (c$, "setNormalizedDate", 
function (a, b, c) {
this.setNormalizedYear (a);
this.setMonth (b).setDayOfMonth (c);
return this;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "hit", 
function (a) {
return a == this.cachedYear;
}, "~N");
Clazz.defineMethod (c$, "hit", 
function (a) {
return (a >= this.cachedFixedDateJan1 && a < this.cachedFixedDateNextJan1);
}, "~N");
Clazz.defineMethod (c$, "getCachedYear", 
function () {
return this.cachedYear;
});
Clazz.defineMethod (c$, "getCachedJan1", 
function () {
return this.cachedFixedDateJan1;
});
Clazz.defineMethod (c$, "setCache", 
function (a, b, c) {
this.cachedYear = a;
this.cachedFixedDateJan1 = b;
this.cachedFixedDateNextJan1 = b + c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"JANUARY", 1,
"FEBRUARY", 2,
"MARCH", 3,
"APRIL", 4,
"MAY", 5,
"JUNE", 6,
"JULY", 7,
"AUGUST", 8,
"SEPTEMBER", 9,
"OCTOBER", 10,
"NOVEMBER", 11,
"DECEMBER", 12,
"SUNDAY", 1,
"MONDAY", 2,
"TUESDAY", 3,
"WEDNESDAY", 4,
"THURSDAY", 5,
"FRIDAY", 6,
"SATURDAY", 7,
"BASE_YEAR", 1970,
"FIXED_DATES", [719163, 719528, 719893, 720259, 720624, 720989, 721354, 721720, 722085, 722450, 722815, 723181, 723546, 723911, 724276, 724642, 725007, 725372, 725737, 726103, 726468, 726833, 727198, 727564, 727929, 728294, 728659, 729025, 729390, 729755, 730120, 730486, 730851, 731216, 731581, 731947, 732312, 732677, 733042, 733408, 733773, 734138, 734503, 734869, 735234, 735599, 735964, 736330, 736695, 737060, 737425, 737791, 738156, 738521, 738886, 739252, 739617, 739982, 740347, 740713, 741078, 741443, 741808, 742174, 742539, 742904, 743269, 743635, 744000, 744365],
"DAYS_IN_MONTH", [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
"ACCUMULATED_DAYS_IN_MONTH", [-30, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
"ACCUMULATED_DAYS_IN_MONTH_LEAP", [-30, 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]);
});
