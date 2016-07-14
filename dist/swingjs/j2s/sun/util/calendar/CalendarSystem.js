Clazz.declarePackage ("sun.util.calendar");
Clazz.load (null, "sun.util.calendar.CalendarSystem", ["java.lang.RuntimeException", "$.StringBuilder", "java.util.HashMap", "swingjs.api.Interface"], function () {
c$ = Clazz.declareType (sun.util.calendar, "CalendarSystem");
c$.initNames = Clazz.defineMethod (c$, "initNames", 
 function () {
var nameMap =  new java.util.HashMap ();
var clName =  new StringBuilder ();
for (var i = 0; i < sun.util.calendar.CalendarSystem.namePairs.length; i += 2) {
clName.setLength (0);
var cl = clName.append ("sun.util.calendar.").append (sun.util.calendar.CalendarSystem.namePairs[i + 1]).toString ();
nameMap.put (sun.util.calendar.CalendarSystem.namePairs[i], cl);
}
{
if (!sun.util.calendar.CalendarSystem.initialized) {
sun.util.calendar.CalendarSystem.names = nameMap;
sun.util.calendar.CalendarSystem.calendars =  new java.util.HashMap ();
sun.util.calendar.CalendarSystem.initialized = true;
}}});
c$.getGregorianCalendar = Clazz.defineMethod (c$, "getGregorianCalendar", 
function () {
if (sun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE == null) sun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE = swingjs.api.Interface.getInstance ("sun.util.calendar.Gregorian", false);
return sun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE;
});
c$.forName = Clazz.defineMethod (c$, "forName", 
function (calendarName) {
if ("gregorian".equals (calendarName)) {
return sun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE;
}if (!sun.util.calendar.CalendarSystem.initialized) {
sun.util.calendar.CalendarSystem.initNames ();
}var cal = sun.util.calendar.CalendarSystem.calendars.get (calendarName);
if (cal != null) {
return cal;
}var className = sun.util.calendar.CalendarSystem.names.get (calendarName);
if (className == null) {
return null;
}try {
var cl = Clazz._4Name (className);
cal = cl.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new RuntimeException ("internal error", e);
} else {
throw e;
}
}
if (cal == null) {
return null;
}var cs = sun.util.calendar.CalendarSystem.calendars.put (calendarName, cal);
return (cs == null) ? cal : cs;
}, "~S");
Clazz.defineStatics (c$,
"initialized", false,
"names", null,
"calendars", null,
"PACKAGE_NAME", "sun.util.calendar.",
"namePairs", ["gregorian", "Gregorian", "japanese", "LocalGregorianCalendar", "julian", "JulianCalendar"],
"GREGORIAN_INSTANCE", null);
});
