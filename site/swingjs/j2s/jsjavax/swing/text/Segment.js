Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjava.text.CharacterIterator"], "jsjavax.swing.text.Segment", ["java.lang.IllegalArgumentException", "$.StringIndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.array = null;
this.offset = 0;
this.count = 0;
this.partialReturn = false;
this.pos = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "Segment", null, [Cloneable, jsjava.text.CharacterIterator, CharSequence]);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, 0, 0);
});
Clazz.makeConstructor (c$, 
function (array, offset, count) {
this.array = array;
this.offset = offset;
this.count = count;
this.partialReturn = false;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "setPartialReturn", 
function (p) {
this.partialReturn = p;
}, "~B");
Clazz.defineMethod (c$, "isPartialReturn", 
function () {
return this.partialReturn;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.array != null) {
return  String.instantialize (this.array, this.offset, this.count);
}return  String.instantialize ();
});
Clazz.overrideMethod (c$, "first", 
function () {
this.pos = this.offset;
if (this.count != 0) {
return this.array[this.pos];
}return '\uffff';
});
Clazz.overrideMethod (c$, "last", 
function () {
this.pos = this.offset + this.count;
if (this.count != 0) {
this.pos -= 1;
return this.array[this.pos];
}return '\uffff';
});
Clazz.overrideMethod (c$, "current", 
function () {
if (this.count != 0 && this.pos < this.offset + this.count) {
return this.array[this.pos];
}return '\uffff';
});
Clazz.overrideMethod (c$, "next", 
function () {
this.pos += 1;
var end = this.offset + this.count;
if (this.pos >= end) {
this.pos = end;
return '\uffff';
}return this.current ();
});
Clazz.overrideMethod (c$, "previous", 
function () {
if (this.pos == this.offset) {
return '\uffff';
}this.pos -= 1;
return this.current ();
});
Clazz.overrideMethod (c$, "setIndex", 
function (position) {
var end = this.offset + this.count;
if ((position < this.offset) || (position > end)) {
throw  new IllegalArgumentException ("bad position: " + position);
}this.pos = position;
if ((this.pos != end) && (this.count != 0)) {
return this.array[this.pos];
}return '\uffff';
}, "~N");
Clazz.overrideMethod (c$, "getBeginIndex", 
function () {
return this.offset;
});
Clazz.overrideMethod (c$, "getEndIndex", 
function () {
return this.offset + this.count;
});
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.pos;
});
Clazz.overrideMethod (c$, "charAt", 
function (index) {
if (index < 0 || index >= this.count) {
throw  new StringIndexOutOfBoundsException (index);
}return this.array[this.offset + index];
}, "~N");
Clazz.overrideMethod (c$, "length", 
function () {
return this.count;
});
Clazz.overrideMethod (c$, "subSequence", 
function (start, end) {
if (start < 0) {
throw  new StringIndexOutOfBoundsException (start);
}if (end > this.count) {
throw  new StringIndexOutOfBoundsException (end);
}if (start > end) {
throw  new StringIndexOutOfBoundsException (end - start);
}var segment =  new jsjavax.swing.text.Segment ();
segment.array = this.array;
segment.offset = this.offset + start;
segment.count = end - start;
return segment;
}, "~N,~N");
Clazz.overrideMethod (c$, "clone", 
function () {
var o;
try {
o = Clazz.superCall (this, jsjavax.swing.text.Segment, "clone", []);
} catch (cnse) {
if (Clazz.exceptionOf (cnse, CloneNotSupportedException)) {
o = null;
} else {
throw cnse;
}
}
return o;
});
});
