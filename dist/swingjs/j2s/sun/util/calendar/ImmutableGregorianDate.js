Clazz.declarePackage ("sun.util.calendar");
Clazz.load (["sun.util.calendar.BaseCalendar"], "sun.util.calendar.ImmutableGregorianDate", ["java.lang.NullPointerException", "$.UnsupportedOperationException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.date = null;
Clazz.instantialize (this, arguments);
}, sun.util.calendar, "ImmutableGregorianDate", sun.util.calendar.BaseCalendar.Date);
Clazz.makeConstructor (c$, 
function (date) {
Clazz.superConstructor (this, sun.util.calendar.ImmutableGregorianDate, []);
if (date == null) {
throw  new NullPointerException ();
}this.date = date;
}, "sun.util.calendar.BaseCalendar.Date");
Clazz.defineMethod (c$, "getEra", 
function () {
return this.date.getEra ();
});
Clazz.overrideMethod (c$, "setEra", 
function (era) {
this.unsupported ();
return this;
}, "sun.util.calendar.Era");
Clazz.defineMethod (c$, "getYear", 
function () {
return this.date.getYear ();
});
Clazz.overrideMethod (c$, "setYear", 
function (year) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addYear", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "isLeapYear", 
function () {
return this.date.isLeapYear ();
});
Clazz.overrideMethod (c$, "setLeapYear", 
function (leapYear) {
this.unsupported ();
}, "~B");
Clazz.defineMethod (c$, "getMonth", 
function () {
return this.date.getMonth ();
});
Clazz.overrideMethod (c$, "setMonth", 
function (month) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addMonth", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getDayOfMonth", 
function () {
return this.date.getDayOfMonth ();
});
Clazz.overrideMethod (c$, "setDayOfMonth", 
function (date) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addDayOfMonth", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getDayOfWeek", 
function () {
return this.date.getDayOfWeek ();
});
Clazz.defineMethod (c$, "getHours", 
function () {
return this.date.getHours ();
});
Clazz.overrideMethod (c$, "setHours", 
function (hours) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addHours", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getMinutes", 
function () {
return this.date.getMinutes ();
});
Clazz.overrideMethod (c$, "setMinutes", 
function (minutes) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addMinutes", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getSeconds", 
function () {
return this.date.getSeconds ();
});
Clazz.overrideMethod (c$, "setSeconds", 
function (seconds) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addSeconds", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getMillis", 
function () {
return this.date.getMillis ();
});
Clazz.overrideMethod (c$, "setMillis", 
function (millis) {
this.unsupported ();
return this;
}, "~N");
Clazz.overrideMethod (c$, "addMillis", 
function (n) {
this.unsupported ();
return this;
}, "~N");
Clazz.defineMethod (c$, "getTimeOfDay", 
function () {
return this.date.getTimeOfDay ();
});
Clazz.overrideMethod (c$, "setDate", 
function (year, month, dayOfMonth) {
this.unsupported ();
return this;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "addDate", 
function (year, month, dayOfMonth) {
this.unsupported ();
return this;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setTimeOfDay", 
function (hours, minutes, seconds, millis) {
this.unsupported ();
return this;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "addTimeOfDay", 
function (hours, minutes, seconds, millis) {
this.unsupported ();
return this;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setTimeOfDay", 
function (fraction) {
this.unsupported ();
}, "~N");
Clazz.defineMethod (c$, "isNormalized", 
function () {
return this.date.isNormalized ();
});
Clazz.defineMethod (c$, "isStandardTime", 
function () {
return this.date.isStandardTime ();
});
Clazz.overrideMethod (c$, "setStandardTime", 
function (standardTime) {
this.unsupported ();
}, "~B");
Clazz.defineMethod (c$, "isDaylightTime", 
function () {
return this.date.isDaylightTime ();
});
Clazz.overrideMethod (c$, "setLocale", 
function (loc) {
this.unsupported ();
}, "java.util.Locale");
Clazz.defineMethod (c$, "getZone", 
function () {
return this.date.getZone ();
});
Clazz.overrideMethod (c$, "setZone", 
function (zoneinfo) {
this.unsupported ();
return this;
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "isSameDate", 
function (date) {
return date.isSameDate (date);
}, "sun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (!(Clazz.instanceOf (obj, sun.util.calendar.ImmutableGregorianDate))) {
return false;
}return this.date.equals ((obj).date);
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.date.hashCode ();
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.date.toString ();
});
Clazz.overrideMethod (c$, "setDayOfWeek", 
function (dayOfWeek) {
this.unsupported ();
}, "~N");
Clazz.overrideMethod (c$, "setNormalized", 
function (normalized) {
this.unsupported ();
}, "~B");
Clazz.defineMethod (c$, "getZoneOffset", 
function () {
return this.date.getZoneOffset ();
});
Clazz.overrideMethod (c$, "setZoneOffset", 
function (offset) {
this.unsupported ();
}, "~N");
Clazz.defineMethod (c$, "getDaylightSaving", 
function () {
return this.date.getDaylightSaving ();
});
Clazz.overrideMethod (c$, "setDaylightSaving", 
function (daylightSaving) {
this.unsupported ();
}, "~N");
Clazz.defineMethod (c$, "getNormalizedYear", 
function () {
return this.date.getNormalizedYear ();
});
Clazz.overrideMethod (c$, "setNormalizedYear", 
function (normalizedYear) {
this.unsupported ();
}, "~N");
Clazz.defineMethod (c$, "unsupported", 
 function () {
throw  new UnsupportedOperationException ();
});
});
