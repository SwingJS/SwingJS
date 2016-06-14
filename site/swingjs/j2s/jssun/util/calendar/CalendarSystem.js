Clazz.declarePackage ("jssun.util.calendar");
Clazz.load (null, "jssun.util.calendar.CalendarSystem", ["java.lang.RuntimeException", "$.StringBuilder", "java.util.HashMap", "swingjs.api.Interface"], function () {
c$ = Clazz.declareType (jssun.util.calendar, "CalendarSystem");
c$.initNames = Clazz.defineMethod (c$, "initNames", 
 function () {
var nameMap =  new java.util.HashMap ();
var clName =  new StringBuilder ();
for (var i = 0; i < jssun.util.calendar.CalendarSystem.namePairs.length; i += 2) {
clName.setLength (0);
var cl = clName.append ("sun.util.calendar.").append (jssun.util.calendar.CalendarSystem.namePairs[i + 1]).toString ();
nameMap.put (jssun.util.calendar.CalendarSystem.namePairs[i], cl);
}
{
if (!jssun.util.calendar.CalendarSystem.initialized) {
jssun.util.calendar.CalendarSystem.names = nameMap;
jssun.util.calendar.CalendarSystem.calendars =  new java.util.HashMap ();
jssun.util.calendar.CalendarSystem.initialized = true;
}}});
c$.getGregorianCalendar = Clazz.defineMethod (c$, "getGregorianCalendar", 
function () {
if (jssun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE == null) jssun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE = swingjs.api.Interface.getInstance ("jssun.util.calendar.Gregorian", false);
return jssun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE;
});
c$.forName = Clazz.defineMethod (c$, "forName", 
function (calendarName) {
if ("gregorian".equals (calendarName)) {
return jssun.util.calendar.CalendarSystem.GREGORIAN_INSTANCE;
}if (!jssun.util.calendar.CalendarSystem.initialized) {
jssun.util.calendar.CalendarSystem.initNames ();
}var cal = jssun.util.calendar.CalendarSystem.calendars.get (calendarName);
if (cal != null) {
return cal;
}var className = jssun.util.calendar.CalendarSystem.names.get (calendarName);
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
}var cs = jssun.util.calendar.CalendarSystem.calendars.put (calendarName, cal);
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
