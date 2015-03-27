Clazz.declarePackage ("jsjavax.swing.text");
c$ = Clazz.decorateAsClass (function () {
this.array = null;
this.g0 = 0;
this.g1 = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "GapVector");
Clazz.makeConstructor (c$, 
function () {
this.construct (10);
});
Clazz.makeConstructor (c$, 
function (initialLength) {
this.array = this.allocateArray (initialLength);
this.g0 = 0;
this.g1 = initialLength;
}, "~N");
Clazz.defineMethod (c$, "getArray", 
function () {
return this.array;
});
Clazz.defineMethod (c$, "getGapStart", 
function () {
return this.g0;
});
Clazz.defineMethod (c$, "getGapEnd", 
function () {
return this.g1;
});
Clazz.defineMethod (c$, "replace", 
function (position, rmSize, addItems, addSize) {
var addOffset = 0;
if (addSize == 0) {
this.close (position, rmSize);
return;
} else if (rmSize > addSize) {
this.close (position + addSize, rmSize - addSize);
} else {
var endSize = addSize - rmSize;
var end = this.open (position + rmSize, endSize);
System.arraycopy (addItems, rmSize, this.array, end, endSize);
addSize = rmSize;
}System.arraycopy (addItems, addOffset, this.array, position, addSize);
}, "~N,~N,~O,~N");
Clazz.defineMethod (c$, "close", 
function (position, nItems) {
if (nItems == 0) return;
var end = position + nItems;
var new_gs = (this.g1 - this.g0) + nItems;
if (end <= this.g0) {
if (this.g0 != end) {
this.shiftGap (end);
}this.shiftGapStartDown (this.g0 - nItems);
} else if (position >= this.g0) {
if (this.g0 != position) {
this.shiftGap (position);
}this.shiftGapEndUp (this.g0 + new_gs);
} else {
this.shiftGapStartDown (position);
this.shiftGapEndUp (this.g0 + new_gs);
}}, "~N,~N");
Clazz.defineMethod (c$, "open", 
function (position, nItems) {
var gapSize = this.g1 - this.g0;
if (nItems == 0) {
if (position > this.g0) position += gapSize;
return position;
}this.shiftGap (position);
if (nItems >= gapSize) {
this.shiftEnd (this.getArrayLength () - gapSize + nItems);
gapSize = this.g1 - this.g0;
}this.g0 = this.g0 + nItems;
return position;
}, "~N,~N");
Clazz.defineMethod (c$, "resize", 
function (nsize) {
var narray = this.allocateArray (nsize);
System.arraycopy (this.array, 0, narray, 0, Math.min (nsize, this.getArrayLength ()));
this.array = narray;
}, "~N");
Clazz.defineMethod (c$, "shiftEnd", 
function (newSize) {
var oldSize = this.getArrayLength ();
var oldGapEnd = this.g1;
var upperSize = oldSize - oldGapEnd;
var arrayLength = this.getNewArraySize (newSize);
var newGapEnd = arrayLength - upperSize;
this.resize (arrayLength);
this.g1 = newGapEnd;
if (upperSize != 0) {
System.arraycopy (this.array, oldGapEnd, this.array, newGapEnd, upperSize);
}}, "~N");
Clazz.defineMethod (c$, "getNewArraySize", 
function (reqSize) {
return (reqSize + 1) * 2;
}, "~N");
Clazz.defineMethod (c$, "shiftGap", 
function (newGapStart) {
if (newGapStart == this.g0) {
return;
}var oldGapStart = this.g0;
var dg = newGapStart - oldGapStart;
var oldGapEnd = this.g1;
var newGapEnd = oldGapEnd + dg;
var gapSize = oldGapEnd - oldGapStart;
this.g0 = newGapStart;
this.g1 = newGapEnd;
if (dg > 0) {
System.arraycopy (this.array, oldGapEnd, this.array, oldGapStart, dg);
} else if (dg < 0) {
System.arraycopy (this.array, newGapStart, this.array, newGapEnd, -dg);
}}, "~N");
Clazz.defineMethod (c$, "shiftGapStartDown", 
function (newGapStart) {
this.g0 = newGapStart;
}, "~N");
Clazz.defineMethod (c$, "shiftGapEndUp", 
function (newGapEnd) {
this.g1 = newGapEnd;
}, "~N");
