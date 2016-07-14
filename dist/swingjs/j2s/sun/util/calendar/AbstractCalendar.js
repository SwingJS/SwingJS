Clazz.declarePackage ("sun.util.calendar");
Clazz.load (["sun.util.calendar.CalendarSystem"], "sun.util.calendar.AbstractCalendar", ["java.lang.IllegalArgumentException", "sun.util.calendar.CalendarUtils", "$.ZoneInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.eras = null;
Clazz.instantialize (this, arguments);
}, sun.util.calendar, "AbstractCalendar", sun.util.calendar.CalendarSystem);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.util.calendar.AbstractCalendar, []);
});
Clazz.overrideMethod (c$, "getEra", 
function (eraName) {
if (this.eras != null) {
for (var i = 0; i < this.eras.length; i++) {
if (this.eras[i].equals (eraName)) {
return this.eras[i];
}}
}return null;
}, "~S");
Clazz.overrideMethod (c$, "getEras", 
function () {
var e = null;
if (this.eras != null) {
e =  new Array (this.eras.length);
System.arraycopy (this.eras, 0, e, 0, this.eras.length);
}return e;
});
Clazz.overrideMethod (c$, "setEra", 
function (date, eraName) {
if (this.eras == null) {
return;
}for (var i = 0; i < this.eras.length; i++) {
var e = this.eras[i];
if (e != null && e.getName ().equals (eraName)) {
date.setEra (e);
return;
}}
throw  new IllegalArgumentException ("unknown era name: " + eraName);
}, "sun.util.calendar.CalendarDate,~S");
Clazz.defineMethod (c$, "setEras", 
function (eras) {
this.eras = eras;
}, "~A");
Clazz.defineMethod (c$, "getCalendarDate", 
function () {
return this.getCalendarDate (System.currentTimeMillis (), this.newCalendarDate ());
});
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis) {
return this.getCalendarDate (millis, this.newCalendarDate ());
}, "~N");
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis, zone) {
var date = this.newCalendarDate (zone);
return this.getCalendarDate (millis, date);
}, "~N,java.util.TimeZone");
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis, date) {
var ms = 0;
var zoneOffset = 0;
var saving = 0;
var days = 0;
var zi = date.getZone ();
if (zi != null) {
var offsets =  Clazz.newIntArray (2, 0);
if (Clazz.instanceOf (zi, sun.util.calendar.ZoneInfo)) {
zoneOffset = (zi).getOffsets (millis, offsets);
} else {
zoneOffset = zi.getOffset (millis);
offsets[0] = zi.getRawOffset ();
offsets[1] = zoneOffset - offsets[0];
}days = Clazz.doubleToInt (zoneOffset / 86400000);
ms = zoneOffset % 86400000;
saving = offsets[1];
}date.setZoneOffset (zoneOffset);
date.setDaylightSaving (saving);
days += Clazz.doubleToInt (millis / 86400000);
ms += (millis % 86400000);
if (ms >= 86400000) {
ms -= 86400000;
++days;
} else {
while (ms < 0) {
ms += 86400000;
--days;
}
}days += 719163;
this.getCalendarDateFromFixedDate (date, days);
this.setTimeOfDay (date, ms);
date.setLeapYear (this.isLeapYear (date));
date.setNormalized (true);
return date;
}, "~N,sun.util.calendar.CalendarDate");
Clazz.overrideMethod (c$, "getTime", 
function (date) {
var gd = this.getFixedDate (date);
var ms = (gd - 719163) * 86400000 + this.getTimeOfDay (date);
var zoneOffset = 0;
var zi = date.getZone ();
if (zi != null) {
if (date.isNormalized ()) {
return ms - date.getZoneOffset ();
}var offsets =  Clazz.newIntArray (2, 0);
if (date.isStandardTime ()) {
if (Clazz.instanceOf (zi, sun.util.calendar.ZoneInfo)) {
(zi).getOffsetsByStandard (ms, offsets);
zoneOffset = offsets[0];
} else {
zoneOffset = zi.getOffset (ms - zi.getRawOffset ());
}} else {
if (Clazz.instanceOf (zi, sun.util.calendar.ZoneInfo)) {
zoneOffset = (zi).getOffsetsByWall (ms, offsets);
} else {
zoneOffset = zi.getOffset (ms - zi.getRawOffset ());
}}}ms -= zoneOffset;
this.getCalendarDate (ms, date);
return ms;
}, "sun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getTimeOfDay", 
function (date) {
var fraction = date.getTimeOfDay ();
if (fraction != -9223372036854775808) {
return fraction;
}fraction = this.getTimeOfDayValue (date);
date.setTimeOfDay (fraction);
return fraction;
}, "sun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getTimeOfDayValue", 
function (date) {
var fraction = date.getHours ();
fraction *= 60;
fraction += date.getMinutes ();
fraction *= 60;
fraction += date.getSeconds ();
fraction *= 1000;
fraction += date.getMillis ();
return fraction;
}, "sun.util.calendar.CalendarDate");
Clazz.overrideMethod (c$, "setTimeOfDay", 
function (cdate, fraction) {
if (fraction < 0) {
throw  new IllegalArgumentException ();
}var normalizedState = cdate.isNormalized ();
var time = fraction;
var hours = Clazz.doubleToInt (time / 3600000);
time %= 3600000;
var minutes = Clazz.doubleToInt (time / 60000);
time %= 60000;
var seconds = Clazz.doubleToInt (time / 1000);
time %= 1000;
cdate.setHours (hours);
cdate.setMinutes (minutes);
cdate.setSeconds (seconds);
cdate.setMillis (time);
cdate.setTimeOfDay (fraction);
if (hours < 24 && normalizedState) {
cdate.setNormalized (normalizedState);
}return cdate;
}, "sun.util.calendar.CalendarDate,~N");
Clazz.overrideMethod (c$, "getWeekLength", 
function () {
return 7;
});
Clazz.overrideMethod (c$, "getNthDayOfWeek", 
function (nth, dayOfWeek, date) {
var ndate = date.clone ();
this.normalize (ndate);
var fd = this.getFixedDate (ndate);
var nfd;
if (nth > 0) {
nfd = 7 * nth + sun.util.calendar.AbstractCalendar.getDayOfWeekDateBefore (fd, dayOfWeek);
} else {
nfd = 7 * nth + sun.util.calendar.AbstractCalendar.getDayOfWeekDateAfter (fd, dayOfWeek);
}this.getCalendarDateFromFixedDate (ndate, nfd);
return ndate;
}, "~N,~N,sun.util.calendar.CalendarDate");
c$.getDayOfWeekDateBefore = Clazz.defineMethod (c$, "getDayOfWeekDateBefore", 
function (fixedDate, dayOfWeek) {
return sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate - 1, dayOfWeek);
}, "~N,~N");
c$.getDayOfWeekDateAfter = Clazz.defineMethod (c$, "getDayOfWeekDateAfter", 
function (fixedDate, dayOfWeek) {
return sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate + 7, dayOfWeek);
}, "~N,~N");
c$.getDayOfWeekDateOnOrBefore = Clazz.defineMethod (c$, "getDayOfWeekDateOnOrBefore", 
function (fixedDate, dayOfWeek) {
var fd = fixedDate - (dayOfWeek - 1);
if (fd >= 0) {
return fixedDate - (fd % 7);
}return fixedDate - sun.util.calendar.CalendarUtils.mod (fd, 7);
}, "~N,~N");
Clazz.defineMethod (c$, "validateTime", 
function (date) {
var t = date.getHours ();
if (t < 0 || t >= 24) {
return false;
}t = date.getMinutes ();
if (t < 0 || t >= 60) {
return false;
}t = date.getSeconds ();
if (t < 0 || t >= 60) {
return false;
}t = date.getMillis ();
if (t < 0 || t >= 1000) {
return false;
}return true;
}, "sun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "normalizeTime", 
function (date) {
var fraction = this.getTimeOfDay (date);
var days = 0;
if (fraction >= 86400000) {
days = Clazz.doubleToInt (fraction / 86400000);
fraction %= 86400000;
} else if (fraction < 0) {
days = sun.util.calendar.CalendarUtils.floorDivide (fraction, 86400000);
if (days != 0) {
fraction -= 86400000 * days;
}}if (days != 0) {
date.setTimeOfDay (fraction);
}date.setMillis ((fraction % 1000));
fraction = Clazz.doubleToInt (fraction / 1000);
date.setSeconds ((fraction % 60));
fraction = Clazz.doubleToInt (fraction / 60);
date.setMinutes ((fraction % 60));
date.setHours ((Clazz.doubleToInt (fraction / 60)));
return days;
}, "sun.util.calendar.CalendarDate");
Clazz.defineStatics (c$,
"SECOND_IN_MILLIS", 1000,
"MINUTE_IN_MILLIS", 60000,
"HOUR_IN_MILLIS", 3600000,
"DAY_IN_MILLIS", 86400000,
"EPOCH_OFFSET", 719163);
});
