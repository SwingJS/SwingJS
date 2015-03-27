Clazz.declarePackage ("jsjavax.swing");
c$ = Clazz.decorateAsClass (function () {
this.a = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "SizeSequence");
Clazz.makeConstructor (c$, 
function () {
this.a = jsjavax.swing.SizeSequence.emptyArray;
});
Clazz.makeConstructor (c$, 
function (numEntries) {
this.construct (numEntries, 0);
}, "~N");
Clazz.makeConstructor (c$, 
function (numEntries, value) {
this.construct ();
this.insertEntries (0, numEntries, value);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (sizes) {
this.construct ();
this.setSizes (sizes);
}, "~A");
Clazz.defineMethod (c$, "setSizes", 
function (length, size) {
if (this.a.length != length) {
this.a =  Clazz.newIntArray (length, 0);
}this.setSizes (0, length, size);
}, "~N,~N");
Clazz.defineMethod (c$, "setSizes", 
($fz = function (from, to, size) {
if (to <= from) {
return 0;
}var m = Clazz.doubleToInt ((from + to) / 2);
this.a[m] = size + this.setSizes (from, m, size);
return this.a[m] + this.setSizes (m + 1, to, size);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "setSizes", 
function (sizes) {
if (this.a.length != sizes.length) {
this.a =  Clazz.newIntArray (sizes.length, 0);
}this.setSizes (0, this.a.length, sizes);
}, "~A");
Clazz.defineMethod (c$, "setSizes", 
($fz = function (from, to, sizes) {
if (to <= from) {
return 0;
}var m = Clazz.doubleToInt ((from + to) / 2);
this.a[m] = sizes[m] + this.setSizes (from, m, sizes);
return this.a[m] + this.setSizes (m + 1, to, sizes);
}, $fz.isPrivate = true, $fz), "~N,~N,~A");
Clazz.defineMethod (c$, "getSizes", 
function () {
var n = this.a.length;
var sizes =  Clazz.newIntArray (n, 0);
this.getSizes (0, n, sizes);
return sizes;
});
Clazz.defineMethod (c$, "getSizes", 
($fz = function (from, to, sizes) {
if (to <= from) {
return 0;
}var m = Clazz.doubleToInt ((from + to) / 2);
sizes[m] = this.a[m] - this.getSizes (from, m, sizes);
return this.a[m] + this.getSizes (m + 1, to, sizes);
}, $fz.isPrivate = true, $fz), "~N,~N,~A");
Clazz.defineMethod (c$, "getPosition", 
function (index) {
return this.getPosition (0, this.a.length, index);
}, "~N");
Clazz.defineMethod (c$, "getPosition", 
($fz = function (from, to, index) {
if (to <= from) {
return 0;
}var m = Clazz.doubleToInt ((from + to) / 2);
if (index <= m) {
return this.getPosition (from, m, index);
} else {
return this.a[m] + this.getPosition (m + 1, to, index);
}}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "getIndex", 
function (position) {
return this.getIndex (0, this.a.length, position);
}, "~N");
Clazz.defineMethod (c$, "getIndex", 
($fz = function (from, to, position) {
if (to <= from) {
return from;
}var m = Clazz.doubleToInt ((from + to) / 2);
var pivot = this.a[m];
if (position < pivot) {
return this.getIndex (from, m, position);
} else {
return this.getIndex (m + 1, to, position - pivot);
}}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "getSize", 
function (index) {
return this.getPosition (index + 1) - this.getPosition (index);
}, "~N");
Clazz.defineMethod (c$, "setSize", 
function (index, size) {
this.changeSize (0, this.a.length, index, size - this.getSize (index));
}, "~N,~N");
Clazz.defineMethod (c$, "changeSize", 
($fz = function (from, to, index, delta) {
if (to <= from) {
return;
}var m = Clazz.doubleToInt ((from + to) / 2);
if (index <= m) {
this.a[m] += delta;
this.changeSize (from, m, index, delta);
} else {
this.changeSize (m + 1, to, index, delta);
}}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "insertEntries", 
function (start, length, value) {
var sizes = this.getSizes ();
var end = start + length;
var n = this.a.length + length;
this.a =  Clazz.newIntArray (n, 0);
for (var i = 0; i < start; i++) {
this.a[i] = sizes[i];
}
for (var i = start; i < end; i++) {
this.a[i] = value;
}
for (var i = end; i < n; i++) {
this.a[i] = sizes[i - length];
}
this.setSizes (this.a);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "removeEntries", 
function (start, length) {
var sizes = this.getSizes ();
var end = start + length;
var n = this.a.length - length;
this.a =  Clazz.newIntArray (n, 0);
for (var i = 0; i < start; i++) {
this.a[i] = sizes[i];
}
for (var i = start; i < n; i++) {
this.a[i] = sizes[i + length];
}
this.setSizes (this.a);
}, "~N,~N");
Clazz.defineStatics (c$,
"emptyArray",  Clazz.newIntArray (0, 0));
