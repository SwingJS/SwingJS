Clazz.declarePackage ("jssun.util.calendar");
Clazz.load (["jssun.util.calendar.BaseCalendar"], "jssun.util.calendar.Gregorian", null, function () {
c$ = Clazz.declareType (jssun.util.calendar, "Gregorian", jssun.util.calendar.BaseCalendar);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.util.calendar.Gregorian, []);
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "gregorian";
});
Clazz.defineMethod (c$, "getCalendarDate", 
function () {
return this.getCalendarDate (System.currentTimeMillis (), this.newCalendarDate ());
});
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis) {
return this.getCalendarDate (millis, this.newCalendarDate ());
}, "~N");
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis, date) {
return Clazz.superCall (this, jssun.util.calendar.Gregorian, "getCalendarDate", [millis, date]);
}, "~N,jssun.util.calendar.CalendarDate");
Clazz.defineMethod (c$, "getCalendarDate", 
function (millis, zone) {
return this.getCalendarDate (millis, this.newCalendarDate (zone));
}, "~N,java.util.TimeZone");
Clazz.defineMethod (c$, "newCalendarDate", 
function () {
return  new jssun.util.calendar.Gregorian.Date ();
});
Clazz.defineMethod (c$, "newCalendarDate", 
function (zone) {
return  new jssun.util.calendar.Gregorian.Date (zone);
}, "java.util.TimeZone");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (jssun.util.calendar.Gregorian, "Date", jssun.util.calendar.BaseCalendar.Date);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.util.calendar.Gregorian.Date);
{
}});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jssun.util.calendar.Gregorian.Date, [a]);
{
}}, "java.util.TimeZone");
Clazz.overrideMethod (c$, "getNormalizedYear", 
function () {
return this.getYear ();
});
Clazz.overrideMethod (c$, "setNormalizedYear", 
function (a) {
this.setYear (a);
}, "~N");
c$ = Clazz.p0p ();
});
