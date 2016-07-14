Clazz.declarePackage ("sun.util.calendar");
Clazz.load (null, "sun.util.calendar.Era", ["java.lang.StringBuilder", "sun.util.calendar.CalendarSystem", "$.ImmutableGregorianDate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.abbr = null;
this.since = 0;
this.sinceDate = null;
this.localTime = false;
this.hash = 0;
Clazz.instantialize (this, arguments);
}, sun.util.calendar, "Era");
Clazz.makeConstructor (c$, 
function (name, abbr, since, localTime) {
this.name = name;
this.abbr = abbr;
this.since = since;
this.localTime = localTime;
var gcal = sun.util.calendar.CalendarSystem.getGregorianCalendar ();
var d = gcal.newCalendarDate (null);
gcal.getCalendarDate (since, d);
this.sinceDate =  new sun.util.calendar.ImmutableGregorianDate (d);
}, "~S,~S,~N,~B");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getDisplayName", 
function (locale) {
return this.name;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getAbbreviation", 
function () {
return this.abbr;
});
Clazz.defineMethod (c$, "getDiaplayAbbreviation", 
function (locale) {
return this.abbr;
}, "java.util.Locale");
Clazz.defineMethod (c$, "getSince", 
function (zone) {
if (zone == null || !this.localTime) {
return this.since;
}var offset = zone.getOffset (this.since);
return this.since - offset;
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "getSinceDate", 
function () {
return this.sinceDate;
});
Clazz.defineMethod (c$, "isLocalTime", 
function () {
return this.localTime;
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, sun.util.calendar.Era))) {
return false;
}var that = o;
return this.name.equals (that.name) && this.abbr.equals (that.abbr) && this.since == that.since && this.localTime == that.localTime;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.hash == 0) {
this.hash = this.name.hashCode () ^ this.abbr.hashCode () ^ this.since ^ (this.since >> 32) ^ (this.localTime ? 1 : 0);
}return this.hash;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var sb =  new StringBuilder ();
sb.append ('[');
sb.append (this.getName ()).append (" (");
sb.append (this.getAbbreviation ()).append (')');
sb.append (" since ").append (this.getSinceDate ());
if (this.localTime) {
sb.setLength (sb.length () - 1);
sb.append (" local time");
}sb.append (']');
return sb.toString ();
});
});
