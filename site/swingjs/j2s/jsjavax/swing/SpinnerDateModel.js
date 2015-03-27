Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.AbstractSpinnerModel"], "jsjavax.swing.SpinnerDateModel", ["java.lang.IllegalArgumentException", "java.util.Calendar", "$.Date"], function () {
c$ = Clazz.decorateAsClass (function () {
this.start = null;
this.end = null;
this.value = null;
this.calendarField = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "SpinnerDateModel", jsjavax.swing.AbstractSpinnerModel);
Clazz.defineMethod (c$, "calendarFieldOK", 
($fz = function (calendarField) {
switch (calendarField) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
case 8:
case 9:
case 10:
case 11:
case 12:
case 13:
case 14:
return true;
default:
return false;
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.makeConstructor (c$, 
function (value, start, end, calendarField) {
Clazz.superConstructor (this, jsjavax.swing.SpinnerDateModel, []);
if (value == null) {
throw  new IllegalArgumentException ("value is null");
}if (!this.calendarFieldOK (calendarField)) {
throw  new IllegalArgumentException ("invalid calendarField");
}if (!(((start == null) || (start.compareTo (value) <= 0)) && ((end == null) || (end.compareTo (value) >= 0)))) {
throw  new IllegalArgumentException ("(start <= value <= end) is false");
}this.value = java.util.Calendar.getInstance ();
this.start = start;
this.end = end;
this.calendarField = calendarField;
this.value.setTime (value);
}, "java.util.Date,Comparable,Comparable,~N");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new java.util.Date (), null, null, 5);
});
Clazz.defineMethod (c$, "setStart", 
function (start) {
if ((start == null) ? (this.start != null) : !start.equals (this.start)) {
this.start = start;
this.fireStateChanged ();
}}, "Comparable");
Clazz.defineMethod (c$, "getStart", 
function () {
return this.start;
});
Clazz.defineMethod (c$, "setEnd", 
function (end) {
if ((end == null) ? (this.end != null) : !end.equals (this.end)) {
this.end = end;
this.fireStateChanged ();
}}, "Comparable");
Clazz.defineMethod (c$, "getEnd", 
function () {
return this.end;
});
Clazz.defineMethod (c$, "setCalendarField", 
function (calendarField) {
if (!this.calendarFieldOK (calendarField)) {
throw  new IllegalArgumentException ("invalid calendarField");
}if (calendarField != this.calendarField) {
this.calendarField = calendarField;
this.fireStateChanged ();
}}, "~N");
Clazz.defineMethod (c$, "getCalendarField", 
function () {
return this.calendarField;
});
Clazz.overrideMethod (c$, "getNextValue", 
function () {
var cal = java.util.Calendar.getInstance ();
cal.setTime (this.value.getTime ());
cal.add (this.calendarField, 1);
var next = cal.getTime ();
return ((this.end == null) || (this.end.compareTo (next) >= 0)) ? next : null;
});
Clazz.overrideMethod (c$, "getPreviousValue", 
function () {
var cal = java.util.Calendar.getInstance ();
cal.setTime (this.value.getTime ());
cal.add (this.calendarField, -1);
var prev = cal.getTime ();
return ((this.start == null) || (this.start.compareTo (prev) <= 0)) ? prev : null;
});
Clazz.defineMethod (c$, "getDate", 
function () {
return this.value.getTime ();
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value.getTime ();
});
Clazz.overrideMethod (c$, "setValue", 
function (value) {
if ((value == null) || !(Clazz.instanceOf (value, java.util.Date))) {
throw  new IllegalArgumentException ("illegal value");
}if (!value.equals (this.value.getTime ())) {
this.value.setTime (value);
this.fireStateChanged ();
}}, "~O");
});
