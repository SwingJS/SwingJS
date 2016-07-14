Clazz.declarePackage ("javax.swing");
Clazz.load (["java.lang.Enum"], "javax.swing.RowFilter", ["java.lang.IllegalArgumentException", "$.Number", "java.util.ArrayList", "$.Date", "java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (javax.swing, "RowFilter");
c$.checkIndices = Clazz.defineMethod (c$, "checkIndices", 
 function (columns) {
for (var i = columns.length - 1; i >= 0; i--) {
if (columns[i] < 0) {
throw  new IllegalArgumentException ("Index must be >= 0");
}}
}, "~A");
c$.regexFilter = Clazz.defineMethod (c$, "regexFilter", 
function (regex, indices) {
return  new javax.swing.RowFilter.RegexFilter (java.util.regex.Pattern.compile (regex), indices);
}, "~S,~A");
c$.dateFilter = Clazz.defineMethod (c$, "dateFilter", 
function (type, date, indices) {
return  new javax.swing.RowFilter.DateFilter (type, date.getTime (), indices);
}, "javax.swing.RowFilter.ComparisonType,java.util.Date,~A");
c$.numberFilter = Clazz.defineMethod (c$, "numberFilter", 
function (type, number, indices) {
return  new javax.swing.RowFilter.NumberFilter (type, number, indices);
}, "javax.swing.RowFilter.ComparisonType,Number,~A");
c$.orFilter = Clazz.defineMethod (c$, "orFilter", 
function (filters) {
return  new javax.swing.RowFilter.OrFilter (filters);
}, "Iterable");
c$.andFilter = Clazz.defineMethod (c$, "andFilter", 
function (filters) {
return  new javax.swing.RowFilter.AndFilter (filters);
}, "Iterable");
c$.notFilter = Clazz.defineMethod (c$, "notFilter", 
function (filter) {
return  new javax.swing.RowFilter.NotFilter (filter);
}, "javax.swing.RowFilter");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.RowFilter, "ComparisonType", Enum);
Clazz.defineEnumConstant (c$, "BEFORE", 0, []);
Clazz.defineEnumConstant (c$, "AFTER", 1, []);
Clazz.defineEnumConstant (c$, "EQUAL", 2, []);
Clazz.defineEnumConstant (c$, "NOT_EQUAL", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.RowFilter, "Entry");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getStringValue", 
function (a) {
var b = this.getValue (a);
return (b == null) ? "" : b.toString ();
}, "~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.columns = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "GeneralFilter", javax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.RowFilter.GeneralFilter, []);
javax.swing.RowFilter.checkIndices (a);
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
}, "javax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.matcher = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "RegexFilter", javax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.RowFilter.RegexFilter, [b]);
if (a == null) {
throw  new IllegalArgumentException ("Pattern must be non-null");
}this.matcher = a.matcher ("");
}, "java.util.regex.Pattern,~A");
Clazz.defineMethod (c$, "include", 
function (a, b) {
this.matcher.reset (a.getStringValue (b));
return this.matcher.find ();
}, "javax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.date = 0;
this.type = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "DateFilter", javax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, javax.swing.RowFilter.DateFilter, [c]);
if (a == null) {
throw  new IllegalArgumentException ("type must be non-null");
}this.type = a;
this.date = b;
}, "javax.swing.RowFilter.ComparisonType,~N,~A");
Clazz.defineMethod (c$, "include", 
function (a, b) {
var c = a.getValue (b);
if (Clazz.instanceOf (c, java.util.Date)) {
var d = (c).getTime ();
switch (this.type) {
case javax.swing.RowFilter.ComparisonType.BEFORE:
return (d < this.date);
case javax.swing.RowFilter.ComparisonType.AFTER:
return (d > this.date);
case javax.swing.RowFilter.ComparisonType.EQUAL:
return (d == this.date);
case javax.swing.RowFilter.ComparisonType.NOT_EQUAL:
return (d != this.date);
default:
break;
}
}return false;
}, "javax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.isComparable = false;
this.number = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "NumberFilter", javax.swing.RowFilter.GeneralFilter);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, javax.swing.RowFilter.NumberFilter, [c]);
if (a == null || b == null) {
throw  new IllegalArgumentException ("type and number must be non-null");
}this.type = a;
this.number = b;
this.isComparable = (Clazz.instanceOf (b, Comparable));
}, "javax.swing.RowFilter.ComparisonType,Number,~A");
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
case javax.swing.RowFilter.ComparisonType.BEFORE:
return (e > 0);
case javax.swing.RowFilter.ComparisonType.AFTER:
return (e < 0);
case javax.swing.RowFilter.ComparisonType.EQUAL:
return (e == 0);
case javax.swing.RowFilter.ComparisonType.NOT_EQUAL:
return (e != 0);
default:
break;
}
}return false;
}, "javax.swing.RowFilter.Entry,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.filters = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "OrFilter", javax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.RowFilter.OrFilter, []);
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
}, "javax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.RowFilter, "AndFilter", javax.swing.RowFilter.OrFilter);
Clazz.overrideMethod (c$, "include", 
function (a) {
for (var filter, $filter = this.filters.iterator (); $filter.hasNext () && ((filter = $filter.next ()) || true);) {
if (!filter.include (a)) {
return false;
}}
return true;
}, "javax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.filter = null;
Clazz.instantialize (this, arguments);
}, javax.swing.RowFilter, "NotFilter", javax.swing.RowFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.RowFilter.NotFilter, []);
if (a == null) {
throw  new IllegalArgumentException ("filter must be non-null");
}this.filter = a;
}, "javax.swing.RowFilter");
Clazz.defineMethod (c$, "include", 
function (a) {
return !this.filter.include (a);
}, "javax.swing.RowFilter.Entry");
c$ = Clazz.p0p ();
});
