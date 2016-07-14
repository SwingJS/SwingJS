Clazz.declarePackage ("sun.util.calendar");
Clazz.load (["java.util.TimeZone", "sun.util.calendar.CalendarSystem"], "sun.util.calendar.ZoneInfo", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.Date", "java.util.SimpleTimeZone"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rawOffset = 0;
this.rawOffsetDiff = 0;
this.checksum = 0;
this.dstSavings = 0;
this.transitions = null;
this.offsets = null;
this.simpleTimeZoneParams = null;
this.willGMTOffsetChange = false;
this.dirty = false;
this.lastRule = null;
Clazz.instantialize (this, arguments);
}, sun.util.calendar, "ZoneInfo", java.util.TimeZone);
Clazz.defineMethod (c$, "setRawOffsetReally", 
function (offset) {
this.rawOffset = offset;
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.util.calendar.ZoneInfo, []);
});
Clazz.makeConstructor (c$, 
function (ID, rawOffset) {
this.construct (ID, rawOffset, 0, 0, null, null, null, false);
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (ID, rawOffset, dstSavings, checksum, transitions, offsets, simpleTimeZoneParams, willGMTOffsetChange) {
Clazz.superConstructor (this, sun.util.calendar.ZoneInfo, []);
this.setID (ID);
this.rawOffset = rawOffset;
this.dstSavings = dstSavings;
this.checksum = checksum;
this.transitions = transitions;
this.offsets = offsets;
this.simpleTimeZoneParams = simpleTimeZoneParams;
this.willGMTOffsetChange = willGMTOffsetChange;
}, "~S,~N,~N,~N,~A,~A,~A,~B");
Clazz.defineMethod (c$, "getOffset", 
function (date) {
return this.getOffsets (date, null, 0);
}, "~N");
Clazz.defineMethod (c$, "getOffsets", 
function (utc, offsets) {
return this.getOffsets (utc, offsets, 0);
}, "~N,~A");
Clazz.defineMethod (c$, "getOffsetsByStandard", 
function (standard, offsets) {
return this.getOffsets (standard, offsets, 1);
}, "~N,~A");
Clazz.defineMethod (c$, "getOffsetsByWall", 
function (wall, offsets) {
return this.getOffsets (wall, offsets, 2);
}, "~N,~A");
Clazz.defineMethod (c$, "getOffsets", 
 function (date, offsets, type) {
if (this.transitions == null) {
var offset = this.getLastRawOffset ();
if (offsets != null) {
offsets[0] = offset;
offsets[1] = 0;
}return offset;
}date -= this.rawOffsetDiff;
var index = this.getTransitionIndex (date, type);
if (index < 0) {
var offset = this.getLastRawOffset ();
if (offsets != null) {
offsets[0] = offset;
offsets[1] = 0;
}return offset;
}if (index < this.transitions.length) {
var val = this.transitions[index];
var offset = this.offsets[(val & 15)] + this.rawOffsetDiff;
if (offsets != null) {
var dst = ((val >>> 4) & 0xf);
var save = (dst == 0) ? 0 : this.offsets[dst];
offsets[0] = offset - save;
offsets[1] = save;
}return offset;
}var tz = this.getLastRule ();
if (tz != null) {
var rawoffset = tz.getRawOffset ();
var msec = date;
if (type != 0) {
msec -= this.rawOffset;
}var dstoffset = tz.inDaylightTime ( new java.util.Date (msec)) ? tz.getDSTSavings () : 0;
if (offsets != null) {
offsets[0] = rawoffset;
offsets[1] = dstoffset;
}return rawoffset + dstoffset;
}var offset = this.getLastRawOffset ();
if (offsets != null) {
offsets[0] = offset;
offsets[1] = 0;
}return offset;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getTransitionIndex", 
 function (date, type) {
var low = 0;
var high = this.transitions.length - 1;
while (low <= high) {
var mid = Clazz.doubleToInt ((low + high) / 2);
var val = this.transitions[mid];
var midVal = val >> 12;
if (type != 0) {
midVal += this.offsets[(val & 15)];
}if (type == 1) {
var dstIndex = ((val >>> 4) & 0xf);
if (dstIndex != 0) {
midVal -= this.offsets[dstIndex];
}}if (midVal < date) {
low = mid + 1;
} else if (midVal > date) {
high = mid - 1;
} else {
return mid;
}}
if (low >= this.transitions.length) {
return low;
}return low - 1;
}, "~N,~N");
Clazz.defineMethod (c$, "getOffset", 
function (era, year, month, day, dayOfWeek, milliseconds) {
if (milliseconds < 0 || milliseconds >= 86400000) {
throw  new IllegalArgumentException ();
}if (era == 0) {
year = 1 - year;
} else if (era != 1) {
throw  new IllegalArgumentException ();
}var date = sun.util.calendar.ZoneInfo.gcal.newCalendarDate (null);
date.setDate (year, month + 1, day);
if (sun.util.calendar.ZoneInfo.gcal.validate (date) == false) {
throw  new IllegalArgumentException ();
}if (dayOfWeek < 1 || dayOfWeek > 7) {
throw  new IllegalArgumentException ();
}if (this.transitions == null) {
return this.getLastRawOffset ();
}var dateInMillis = sun.util.calendar.ZoneInfo.gcal.getTime (date) + milliseconds;
dateInMillis -= this.rawOffset;
return this.getOffsets (dateInMillis, null, 0);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "setRawOffset", 
function (offsetMillis) {
if (offsetMillis == this.rawOffset + this.rawOffsetDiff) {
return;
}this.rawOffsetDiff = offsetMillis - this.rawOffset;
if (this.lastRule != null) {
this.lastRule.setRawOffset (offsetMillis);
}this.dirty = true;
}, "~N");
Clazz.defineMethod (c$, "getRawOffset", 
function () {
if (!this.willGMTOffsetChange) {
return this.rawOffset + this.rawOffsetDiff;
}var offsets =  Clazz.newIntArray (2, 0);
this.getOffsets (System.currentTimeMillis (), offsets, 0);
return offsets[0];
});
Clazz.defineMethod (c$, "isDirty", 
function () {
return this.dirty;
});
Clazz.defineMethod (c$, "getLastRawOffset", 
 function () {
return this.rawOffset + this.rawOffsetDiff;
});
Clazz.defineMethod (c$, "useDaylightTime", 
function () {
return (this.simpleTimeZoneParams != null);
});
Clazz.overrideMethod (c$, "inDaylightTime", 
function (date) {
if (date == null) {
throw  new NullPointerException ();
}if (this.transitions == null) {
return false;
}var utc = date.getTime () - this.rawOffsetDiff;
var index = this.getTransitionIndex (utc, 0);
if (index < 0) {
return false;
}if (index < this.transitions.length) {
return (this.transitions[index] & 240) != 0;
}var tz = this.getLastRule ();
if (tz != null) {
return tz.inDaylightTime (date);
}return false;
}, "java.util.Date");
Clazz.overrideMethod (c$, "getDSTSavings", 
function () {
return this.dstSavings;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[id=\"" + this.getID () + "\"" + ",offset=" + this.getLastRawOffset () + ",dstSavings=" + this.dstSavings + ",useDaylight=" + this.useDaylightTime () + ",transitions=" + ((this.transitions != null) ? this.transitions.length : 0) + ",lastRule=" + (this.lastRule == null ? this.getLastRuleInstance () : this.lastRule) + "]";
});
Clazz.defineMethod (c$, "getLastRule", 
 function () {
if (this.lastRule == null) {
this.lastRule = this.getLastRuleInstance ();
}return this.lastRule;
});
Clazz.defineMethod (c$, "getLastRuleInstance", 
function () {
if (this.simpleTimeZoneParams == null) {
return null;
}if (this.simpleTimeZoneParams.length == 10) {
return  new java.util.SimpleTimeZone (this.getLastRawOffset (), this.getID (), this.simpleTimeZoneParams[0], this.simpleTimeZoneParams[1], this.simpleTimeZoneParams[2], this.simpleTimeZoneParams[3], this.simpleTimeZoneParams[4], this.simpleTimeZoneParams[5], this.simpleTimeZoneParams[6], this.simpleTimeZoneParams[7], this.simpleTimeZoneParams[8], this.simpleTimeZoneParams[9], this.dstSavings);
}return  new java.util.SimpleTimeZone (this.getLastRawOffset (), this.getID (), this.simpleTimeZoneParams[0], this.simpleTimeZoneParams[1], this.simpleTimeZoneParams[2], this.simpleTimeZoneParams[3], this.simpleTimeZoneParams[4], this.simpleTimeZoneParams[5], this.simpleTimeZoneParams[6], this.simpleTimeZoneParams[7], this.dstSavings);
});
Clazz.defineMethod (c$, "clone", 
function () {
var zi = Clazz.superCall (this, sun.util.calendar.ZoneInfo, "clone", []);
zi.lastRule = null;
return zi;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.getLastRawOffset () ^ this.checksum;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (!(Clazz.instanceOf (obj, sun.util.calendar.ZoneInfo))) {
return false;
}var that = obj;
return (this.getID ().equals (that.getID ()) && (this.getLastRawOffset () == that.getLastRawOffset ()) && (this.checksum == that.checksum));
}, "~O");
Clazz.overrideMethod (c$, "hasSameRules", 
function (other) {
if (this === other) {
return true;
}if (other == null) {
return false;
}if (!(Clazz.instanceOf (other, sun.util.calendar.ZoneInfo))) {
if (this.getRawOffset () != other.getRawOffset ()) {
return false;
}if ((this.transitions == null) && (this.useDaylightTime () == false) && (other.useDaylightTime () == false)) {
return true;
}return false;
}if (this.getLastRawOffset () != (other).getLastRawOffset ()) {
return false;
}return (this.checksum == (other).checksum);
}, "java.util.TimeZone");
c$.getAliasTable = Clazz.defineMethod (c$, "getAliasTable", 
function () {
var aliases = null;
var cache = sun.util.calendar.ZoneInfo.aliasTable;
if (cache != null) {
aliases = cache;
if (aliases != null) {
return aliases;
}}return aliases;
});
Clazz.defineStatics (c$,
"UTC_TIME", 0,
"STANDARD_TIME", 1,
"WALL_TIME", 2,
"OFFSET_MASK", 0x0f,
"DST_MASK", 0xf0,
"DST_NSHIFT", 4,
"TRANSITION_NSHIFT", 12);
c$.gcal = c$.prototype.gcal = sun.util.calendar.CalendarSystem.getGregorianCalendar ();
Clazz.defineStatics (c$,
"aliasTable", null);
});
