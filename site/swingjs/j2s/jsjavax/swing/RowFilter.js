Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.lang.Enum"], "jsjavax.swing.RowFilter", ["java.lang.IllegalArgumentException", "$.Number", "java.util.ArrayList", "$.Date", "java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (jsjavax.swing, "RowFilter");
c$.checkIndices = Clazz.defineMethod (c$, "checkIndices", 
($fz = function (columns) {
for (var i = columns.length - 1; i >= 0; i--) {
if (columns[i] < 0) {
throw  new IllegalArgumentException ("Index must be >= 0");
}}
}, $fz.isPrivate = true, $fz), "~A");
c$.regexFilter = Clazz.defineMethod (c$, "regexFilter", 
function (regex, indices) {
return  new jsjavax.swing.RowFilter.RegexFilter (java.util.regex.Pattern.compile (regex), indices);
}, "~S,~A");
c$.dateFilter = Clazz.defineMethod (c$, "dateFilter", 
function (type, date, indices) {
return  new jsjavax.swing.RowFilter.DateFilter (type, date.getTime (), indices);
}, "jsjavax.swing.RowFilter.ComparisonType,java.util.Date,~A");
c$.numberFilter = Clazz.defineMethod (c$, "numberFilter", 
function (type, number, indices) {
return  new jsjavax.swing.RowFilter.NumberFilter (type, number, indices);
}, "jsjavax.swing.RowFilter.ComparisonType,Number,~A");
c$.orFilter = Clazz.defineMethod (c$, "orFilter", 
function (filters) {
return  new jsjavax.swing.RowFilter.OrFilter (filters);
}, "Iterable");
c$.andFilter = Clazz.defineMethod (c$, "andFilter", 
function (filters) {
return  new jsjavax.swing.RowFilter.AndFilter (filters);
}, "Iterable");
c$.notFilter = Clazz.defineMethod (c$, "notFilter", 
function (filter) {
return  new jsjavax.swing.RowFilter.NotFilter (filter);
}, "jsjavax.swing.RowFilter");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.RowFilter, "ComparisonType", Enum);
Clazz.defineEnumConstant (c$, "BEFORE", 0, []);
Clazz.defineEnumConstant (c$, "AFTER", 1, []);
Clazz.defineEnumConstant (c$, "EQUAL", 2, []);
Clazz.defineEnumConstant (c$, "NOT_EQUAL", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.RowFilter, "Entry");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getStringValue", 
function (a) {
var b = this.getValue (a);
return (b == null) ? "" : b.toString ();
}, "~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.columns = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "GeneralFilter", jsjavax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.GeneralFilter, []);
jsjavax.swing.RowFilter.checkIndices (a);
this.columns = a;
}, "~A");
Clazz.defineMethod (c$, "include", 
function (a) {
var b = a.getValueCount ();
if (this.columns.length > 0) {
for (var c = this.columns.length - 1; c >= 0; c--) {
var d = this.columns[c];
if (d < b) {
if (this.include (a, d)) {
return true;
}}}
} else {
while (--b >= 0) {
if (this.include (a, b)) {
return true;
}}
}return false;
}, "jsjavax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.matcher = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "RegexFilter", jsjavax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.RegexFilter, [b]);
if (a == null) {
throw  new IllegalArgumentException ("Pattern must be non-null");
}this.matcher = a.matcher ("");
}, "java.util.regex.Pattern,~A");
Clazz.defineMethod (c$, "include", 
function (a, b) {
this.matcher.reset (a.getStringValue (b));
return this.matcher.find ();
}, "jsjavax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.date = 0;
this.type = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "DateFilter", jsjavax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.DateFilter, [c]);
if (a == null) {
throw  new IllegalArgumentException ("type must be non-null");
}this.type = a;
this.date = b;
}, "jsjavax.swing.RowFilter.ComparisonType,~N,~A");
Clazz.defineMethod (c$, "include", 
function (a, b) {
var c = a.getValue (b);
if (Clazz.instanceOf (c, java.util.Date)) {
var d = (c).getTime ();
switch (this.type) {
case jsjavax.swing.RowFilter.ComparisonType.BEFORE:
return (d < this.date);
case jsjavax.swing.RowFilter.ComparisonType.AFTER:
return (d > this.date);
case jsjavax.swing.RowFilter.ComparisonType.EQUAL:
return (d == this.date);
case jsjavax.swing.RowFilter.ComparisonType.NOT_EQUAL:
return (d != this.date);
default:
break;
}
}return false;
}, "jsjavax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.isComparable = false;
this.number = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "NumberFilter", jsjavax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.NumberFilter, [c]);
if (a == null || b == null) {
throw  new IllegalArgumentException ("type and number must be non-null");
}this.type = a;
this.number = b;
this.isComparable = (Clazz.instanceOf (b, Comparable));
}, "jsjavax.swing.RowFilter.ComparisonType,Number,~A");
Clazz.defineMethod (c$, "include", 
function (a, b) {
var c = a.getValue (b);
if (Clazz.instanceOf (c, Number)) {
var d = true;
var e;
var f = c.getClass ();
if (this.number.getClass () === f && this.isComparable) {
e = (this.number).compareTo (c);
} else {
e = this.longCompare (c);
}switch (this.type) {
case jsjavax.swing.RowFilter.ComparisonType.BEFORE:
return (e > 0);
case jsjavax.swing.RowFilter.ComparisonType.AFTER:
return (e < 0);
case jsjavax.swing.RowFilter.ComparisonType.EQUAL:
return (e == 0);
case jsjavax.swing.RowFilter.ComparisonType.NOT_EQUAL:
return (e != 0);
default:
break;
}
}return false;
}, "jsjavax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.filters = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "OrFilter", jsjavax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.OrFilter, []);
this.filters =  new java.util.ArrayList ();
for (var filter, $filter = a.iterator (); $filter.hasNext () && ((filter = $filter.next ()) || true);) {
if (filter == null) {
throw  new IllegalArgumentException ("Filter must be non-null");
}this.filters.add (filter);
}
}, "Iterable");
Clazz.defineMethod (c$, "include", 
function (a) {
for (var filter, $filter = this.filters.iterator (); $filter.hasNext () && ((filter = $filter.next ()) || true);) {
if (filter.include (a)) {
return true;
}}
return false;
}, "jsjavax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.RowFilter, "AndFilter", jsjavax.swing.RowFilter.OrFilter);
Clazz.overrideMethod (c$, "include", 
function (a) {
for (var filter, $filter = this.filters.iterator (); $filter.hasNext () && ((filter = $filter.next ()) || true);) {
if (!filter.include (a)) {
return false;
}}
return true;
}, "jsjavax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.filter = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowFilter, "NotFilter", jsjavax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.RowFilter.NotFilter, []);
if (a == null) {
throw  new IllegalArgumentException ("filter must be non-null");
}this.filter = a;
}, "jsjavax.swing.RowFilter");
Clazz.defineMethod (c$, "include", 
function (a) {
return !this.filter.include (a);
}, "jsjavax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
});
