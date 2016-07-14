Clazz.declarePackage ("sun.util.calendar");
Clazz.load (null, "sun.util.calendar.CalendarDate", ["java.lang.InternalError", "$.StringBuilder", "java.util.TimeZone", "sun.util.calendar.CalendarUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.era = null;
this.year = 0;
this.month = 0;
this.dayOfMonth = 0;
this.dayOfWeek = -2147483648;
this.leapYear = false;
this.hours = 0;
this.minutes = 0;
this.seconds = 0;
this.millis = 0;
this.fraction = 0;
this.normalized = false;
this.zoneinfo = null;
this.zoneOffset = 0;
this.daylightSaving = 0;
this.forceStandardTime = false;
this.locale = null;
Clazz.instantialize (this, arguments);
}, sun.util.calendar, "CalendarDate", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.construct (java.util.TimeZone.getDefault ());
});
Clazz.makeConstructor (c$, 
function (zone) {
this.zoneinfo = zone;
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "getEra", 
function () {
return this.era;
});
Clazz.defineMethod (c$, "setEra", 
function (era) {
if (this.era === era) {
return this;
}this.era = era;
this.normalized = false;
return this;
}, "sun.util.calendar.Era");
Clazz.defineMethod (c$, "getYear", 
function () {
return this.year;
});
Clazz.defineMethod (c$, "setYear", 
function (year) {
if (this.year != year) {
this.year = year;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addYear", 
function (n) {
if (n != 0) {
this.year += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "isLeapYear", 
function () {
return this.leapYear;
});
Clazz.defineMethod (c$, "setLeapYear", 
function (leapYear) {
this.leapYear = leapYear;
}, "~B");
Clazz.defineMethod (c$, "getMonth", 
function () {
return this.month;
});
Clazz.defineMethod (c$, "setMonth", 
function (month) {
if (this.month != month) {
this.month = month;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addMonth", 
function (n) {
if (n != 0) {
this.month += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getDayOfMonth", 
function () {
return this.dayOfMonth;
});
Clazz.defineMethod (c$, "setDayOfMonth", 
function (date) {
if (this.dayOfMonth != date) {
this.dayOfMonth = date;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addDayOfMonth", 
function (n) {
if (n != 0) {
this.dayOfMonth += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getDayOfWeek", 
function () {
if (!this.isNormalized ()) {
this.dayOfWeek = -2147483648;
}return this.dayOfWeek;
});
Clazz.defineMethod (c$, "getHours", 
function () {
return this.hours;
});
Clazz.defineMethod (c$, "setHours", 
function (hours) {
if (this.hours != hours) {
this.hours = hours;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addHours", 
function (n) {
if (n != 0) {
this.hours += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getMinutes", 
function () {
return this.minutes;
});
Clazz.defineMethod (c$, "setMinutes", 
function (minutes) {
if (this.minutes != minutes) {
this.minutes = minutes;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addMinutes", 
function (n) {
if (n != 0) {
this.minutes += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getSeconds", 
function () {
return this.seconds;
});
Clazz.defineMethod (c$, "setSeconds", 
function (seconds) {
if (this.seconds != seconds) {
this.seconds = seconds;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addSeconds", 
function (n) {
if (n != 0) {
this.seconds += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getMillis", 
function () {
return this.millis;
});
Clazz.defineMethod (c$, "setMillis", 
function (millis) {
if (this.millis != millis) {
this.millis = millis;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "addMillis", 
function (n) {
if (n != 0) {
this.millis += n;
this.normalized = false;
}return this;
}, "~N");
Clazz.defineMethod (c$, "getTimeOfDay", 
function () {
if (!this.isNormalized ()) {
return this.fraction = -9223372036854775808;
}return this.fraction;
});
Clazz.defineMethod (c$, "setDate", 
function (year, month, dayOfMonth) {
this.setYear (year);
this.setMonth (month);
this.setDayOfMonth (dayOfMonth);
return this;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addDate", 
function (year, month, dayOfMonth) {
this.addYear (year);
this.addMonth (month);
this.addDayOfMonth (dayOfMonth);
return this;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setTimeOfDay", 
function (hours, minutes, seconds, millis) {
this.setHours (hours);
this.setMinutes (minutes);
this.setSeconds (seconds);
this.setMillis (millis);
return this;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "addTimeOfDay", 
function (hours, minutes, seconds, millis) {
this.addHours (hours);
this.addMinutes (minutes);
this.addSeconds (seconds);
this.addMillis (millis);
return this;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setTimeOfDay", 
function (fraction) {
this.fraction = fraction;
}, "~N");
Clazz.defineMethod (c$, "isNormalized", 
function () {
return this.normalized;
});
Clazz.defineMethod (c$, "isStandardTime", 
function () {
return this.forceStandardTime;
});
Clazz.defineMethod (c$, "setStandardTime", 
function (standardTime) {
this.forceStandardTime = standardTime;
}, "~B");
Clazz.defineMethod (c$, "isDaylightTime", 
function () {
if (this.isStandardTime ()) {
return false;
}return this.daylightSaving != 0;
});
Clazz.defineMethod (c$, "setLocale", 
function (loc) {
this.locale = loc;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getZone", 
function () {
return this.zoneinfo;
});
Clazz.defineMethod (c$, "setZone", 
function (zoneinfo) {
this.zoneinfo = zoneinfo;
return this;
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "isSameDate", 
function (date) {
return this.getDayOfWeek () == date.getDayOfWeek () && this.getMonth () == date.getMonth () && this.getYear () == date.getYear () && this.getEra () === date.getEra ();
}, "sun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, sun.util.calendar.CalendarDate))) {
return false;
}var that = obj;
if (this.isNormalized () != that.isNormalized ()) {
return false;
}var hasZone = this.zoneinfo != null;
var thatHasZone = that.zoneinfo != null;
if (hasZone != thatHasZone) {
return false;
}if (hasZone && !this.zoneinfo.equals (that.zoneinfo)) {
return false;
}return (this.getEra () === that.getEra () && this.year == that.year && this.month == that.month && this.dayOfMonth == that.dayOfMonth && this.hours == that.hours && this.minutes == that.minutes && this.seconds == that.seconds && this.millis == that.millis && this.zoneOffset == that.zoneOffset);
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
var hash = (((((this.year - 1970) * 12) + (this.month - 1)) * 30) + this.dayOfMonth) * 24;
hash = ((((((hash + this.hours) * 60) + this.minutes) * 60) + this.seconds) * 1000) + this.millis;
hash -= this.zoneOffset;
var normalized = this.isNormalized () ? 1 : 0;
var era = 0;
var e = this.getEra ();
if (e != null) {
era = e.hashCode ();
}var zone = this.zoneinfo != null ? this.zoneinfo.hashCode () : 0;
return hash * (hash >> 32) ^ era ^ normalized ^ zone;
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, sun.util.calendar.CalendarDate, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "toString", 
function () {
var sb =  new StringBuilder ();
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.year, 4).append ('-');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.month, 2).append ('-');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.dayOfMonth, 2).append ('T');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.hours, 2).append (':');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.minutes, 2).append (':');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.seconds, 2).append ('.');
sun.util.calendar.CalendarUtils.sprintf0d (sb, this.millis, 3);
if (this.zoneOffset == 0) {
sb.append ('Z');
} else if (this.zoneOffset != -2147483648) {
var offset;
var sign;
if (this.zoneOffset > 0) {
offset = this.zoneOffset;
sign = '+';
} else {
offset = -this.zoneOffset;
sign = '-';
}offset = Clazz.doubleToInt (offset / 60000);
sb.append (sign);
sun.util.calendar.CalendarUtils.sprintf0d (sb, Clazz.doubleToInt (offset / 60), 2);
sun.util.calendar.CalendarUtils.sprintf0d (sb, offset % 60, 2);
} else {
sb.append (" local time");
}return sb.toString ();
});
Clazz.defineMethod (c$, "setDayOfWeek", 
function (dayOfWeek) {
this.dayOfWeek = dayOfWeek;
}, "~N");
Clazz.defineMethod (c$, "setNormalized", 
function (normalized) {
this.normalized = normalized;
}, "~B");
Clazz.defineMethod (c$, "getZoneOffset", 
function () {
return this.zoneOffset;
});
Clazz.defineMethod (c$, "setZoneOffset", 
function (offset) {
this.zoneOffset = offset;
}, "~N");
Clazz.defineMethod (c$, "getDaylightSaving", 
function () {
return this.daylightSaving;
});
Clazz.defineMethod (c$, "setDaylightSaving", 
function (daylightSaving) {
this.daylightSaving = daylightSaving;
}, "~N");
Clazz.defineStatics (c$,
"FIELD_UNDEFINED", -2147483648,
"TIME_UNDEFINED", -9223372036854775808);
});
