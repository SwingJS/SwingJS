Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.AbstractAction", "jsjavax.swing.text.DefaultFormatter"], "jsjavax.swing.text.InternationalFormatter", ["java.lang.StringBuffer", "java.util.ArrayList", "$.BitSet", "jsjava.text.AttributedCharacterIterator.Attribute"], function () {
c$ = Clazz.decorateAsClass (function () {
this.format = null;
this.max = null;
this.min = null;
this.literalMask = null;
this.iterator = null;
this.validMask = false;
this.string = null;
this.ignoreDocumentMutate = false;
if (!Clazz.isClassDefined ("jsjavax.swing.text.InternationalFormatter.IncrementAction")) {
jsjavax.swing.text.InternationalFormatter.$InternationalFormatter$IncrementAction$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "InternationalFormatter", jsjavax.swing.text.DefaultFormatter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.InternationalFormatter, []);
this.setOverwriteMode (false);
});
Clazz.makeConstructor (c$, 
function (format) {
this.construct ();
this.setFormat (format);
}, "jsjava.text.Format");
Clazz.defineMethod (c$, "setFormat", 
function (format) {
this.format = format;
}, "jsjava.text.Format");
Clazz.defineMethod (c$, "getFormat", 
function () {
return this.format;
});
Clazz.defineMethod (c$, "setMinimum", 
function (minimum) {
if (this.getValueClass () == null && minimum != null) {
this.setValueClass (minimum.getClass ());
}this.min = minimum;
}, "Comparable");
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.min;
});
Clazz.defineMethod (c$, "setMaximum", 
function (max) {
if (this.getValueClass () == null && max != null) {
this.setValueClass (max.getClass ());
}this.max = max;
}, "Comparable");
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.max;
});
Clazz.defineMethod (c$, "install", 
function (ftf) {
Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "install", [ftf]);
this.updateMaskIfNecessary ();
this.positionCursorAtInitialLocation ();
}, "jsjavax.swing.JFormattedTextField");
Clazz.overrideMethod (c$, "valueToString", 
function (value) {
if (value == null) {
return "";
}var f = this.getFormat ();
if (f == null) {
return value.toString ();
}return f.format (value);
}, "~O");
Clazz.overrideMethod (c$, "stringToValue", 
function (text) {
var value = null;
return value;
}, "~S");
Clazz.defineMethod (c$, "getFields", 
function (offset) {
if (this.getAllowsInvalid ()) {
this.updateMask ();
}var attrs = this.getAttributes (offset);
if (attrs != null && attrs.size () > 0) {
var al =  new java.util.ArrayList ();
al.addAll (attrs.keySet ());
return al.toArray (jsjavax.swing.text.InternationalFormatter.EMPTY_FIELD_ARRAY);
}return jsjavax.swing.text.InternationalFormatter.EMPTY_FIELD_ARRAY;
}, "~N");
Clazz.defineMethod (c$, "clone", 
function () {
var formatter = Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "clone", []);
formatter.literalMask = null;
formatter.iterator = null;
formatter.validMask = false;
formatter.string = null;
return formatter;
});
Clazz.overrideMethod (c$, "getActions", 
function () {
if (this.getSupportsIncrement ()) {
return  Clazz.newArray (-1, [Clazz.innerTypeInstance (jsjavax.swing.text.InternationalFormatter.IncrementAction, this, null, "increment", 1), Clazz.innerTypeInstance (jsjavax.swing.text.InternationalFormatter.IncrementAction, this, null, "decrement", -1)]);
}return null;
});
Clazz.defineMethod (c$, "isValidValue", 
function (value, wantsCCE) {
var min = this.getMinimum ();
try {
if (min != null && min.compareTo (value) > 0) {
return false;
}} catch (cce) {
if (Clazz.exceptionOf (cce, ClassCastException)) {
if (wantsCCE) {
throw cce;
}return false;
} else {
throw cce;
}
}
var max = this.getMaximum ();
try {
if (max != null && max.compareTo (value) < 0) {
return false;
}} catch (cce) {
if (Clazz.exceptionOf (cce, ClassCastException)) {
if (wantsCCE) {
throw cce;
}return false;
} else {
throw cce;
}
}
return true;
}, "~O,~B");
Clazz.defineMethod (c$, "getAttributes", 
function (index) {
if (this.isValidMask ()) {
var iterator = this.getIterator ();
if (index >= 0 && index <= iterator.getEndIndex ()) {
iterator.setIndex (index);
return iterator.getAttributes ();
}}return null;
}, "~N");
Clazz.defineMethod (c$, "getAttributeStart", 
function (id) {
if (this.isValidMask ()) {
var iterator = this.getIterator ();
iterator.first ();
while (iterator.current () != '\uffff') {
if (iterator.getAttribute (id) != null) {
return iterator.getIndex ();
}iterator.next ();
}
}return -1;
}, "jsjava.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getIterator", 
function () {
return this.iterator;
});
Clazz.defineMethod (c$, "updateMaskIfNecessary", 
function () {
if (!this.getAllowsInvalid () && (this.getFormat () != null)) {
if (!this.isValidMask ()) {
this.updateMask ();
} else {
var newString = this.getFormattedTextField ().getText ();
if (!newString.equals (this.string)) {
this.updateMask ();
}}}});
Clazz.defineMethod (c$, "updateMask", 
function () {
if (this.getFormat () != null) {
var doc = this.getFormattedTextField ().getDocument ();
this.validMask = false;
if (doc != null) {
try {
this.string = doc.getText (0, doc.getLength ());
} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
this.string = null;
} else {
throw ble;
}
}
if (this.string != null) {
try {
var value = this.stringToValue (this.string);
var iterator = this.getFormat ().formatToCharacterIterator (value);
this.updateMask (iterator);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, jsjava.text.ParseException)) {
var pe = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, IllegalArgumentException)) {
var iae = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, NullPointerException)) {
var npe = e$$;
{
}
} else {
throw e$$;
}
}
}}}});
Clazz.defineMethod (c$, "getLiteralCountTo", 
function (index) {
var lCount = 0;
for (var counter = 0; counter < index; counter++) {
if (this.isLiteral (counter)) {
lCount++;
}}
return lCount;
}, "~N");
Clazz.defineMethod (c$, "isLiteral", 
function (index) {
if (this.isValidMask () && index < this.string.length) {
return this.literalMask.get (index);
}return false;
}, "~N");
Clazz.defineMethod (c$, "getLiteral", 
function (index) {
if (this.isValidMask () && this.string != null && index < this.string.length) {
return this.string.charAt (index);
}return String.fromCharCode (0);
}, "~N");
Clazz.overrideMethod (c$, "isNavigatable", 
function (offset) {
return !this.isLiteral (offset);
}, "~N");
Clazz.defineMethod (c$, "updateValue", 
function (value) {
Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "updateValue", [value]);
this.updateMaskIfNecessary ();
}, "~O");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, text, attrs) {
if (this.ignoreDocumentMutate) {
fb.replace (offset, length, text, attrs);
return;
}Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "replace", [fb, offset, length, text, attrs]);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getNextNonliteralIndex", 
($fz = function (index, direction) {
var max = this.getFormattedTextField ().getDocument ().getLength ();
while (index >= 0 && index < max) {
if (this.isLiteral (index)) {
index += direction;
} else {
return index;
}}
return (direction == -1) ? 0 : max;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "canReplace", 
function (rh) {
if (!this.getAllowsInvalid ()) {
var text = rh.text;
var tl = (text != null) ? text.length : 0;
if (tl == 0 && rh.length == 1 && this.getFormattedTextField ().getSelectionStart () != rh.offset) {
rh.offset = this.getNextNonliteralIndex (rh.offset, -1);
}if (this.getOverwriteMode ()) {
var replace = null;
for (var counter = 0, textIndex = 0, max = Math.max (tl, rh.length); counter < max; counter++) {
if (this.isLiteral (rh.offset + counter)) {
if (replace != null) {
replace.append (this.getLiteral (rh.offset + counter));
}if (textIndex < tl && text.charAt (textIndex) == this.getLiteral (rh.offset + counter)) {
textIndex++;
} else if (textIndex == 0) {
rh.offset++;
rh.length--;
counter--;
max--;
} else if (replace == null) {
replace =  new StringBuffer (max);
replace.append (text.substring (0, textIndex));
replace.append (this.getLiteral (rh.offset + counter));
}} else if (textIndex < tl) {
if (replace != null) {
replace.append (text.charAt (textIndex));
}textIndex++;
} else {
if (replace == null) {
replace =  new StringBuffer (max);
if (textIndex > 0) {
replace.append (text.substring (0, textIndex));
}}if (replace != null) {
replace.append (' ');
}}}
if (replace != null) {
rh.text = replace.toString ();
}} else if (tl > 0) {
rh.offset = this.getNextNonliteralIndex (rh.offset, 1);
} else {
rh.offset = this.getNextNonliteralIndex (rh.offset, -1);
}(rh).endOffset = rh.offset;
(rh).endTextLength = (rh.text != null) ? rh.text.length : 0;
} else {
(rh).endOffset = rh.offset;
(rh).endTextLength = (rh.text != null) ? rh.text.length : 0;
}var can = Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "canReplace", [rh]);
if (can && !this.getAllowsInvalid ()) {
(rh).resetFromValue (this);
}return can;
}, "jsjavax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "replace", 
function (rh) {
var start = -1;
var direction = 1;
var literalCount = -1;
if (rh.length > 0 && (rh.text == null || rh.text.length == 0) && (this.getFormattedTextField ().getSelectionStart () != rh.offset || rh.length > 1)) {
direction = -1;
}if (!this.getAllowsInvalid ()) {
if ((rh.text == null || rh.text.length == 0) && rh.length > 0) {
start = this.getFormattedTextField ().getSelectionStart ();
} else {
start = rh.offset;
}literalCount = this.getLiteralCountTo (start);
}if (Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "replace", [rh])) {
if (start != -1) {
var end = (rh).endOffset;
end += (rh).endTextLength;
this.repositionCursor (literalCount, end, direction);
} else {
start = (rh).endOffset;
if (direction == 1) {
start += (rh).endTextLength;
}this.repositionCursor (start, direction);
}return true;
}return false;
}, "jsjavax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "repositionCursor", 
($fz = function (startLiteralCount, end, direction) {
var endLiteralCount = this.getLiteralCountTo (end);
if (endLiteralCount != end) {
end -= startLiteralCount;
for (var counter = 0; counter < end; counter++) {
if (this.isLiteral (counter)) {
end++;
}}
}this.repositionCursor (end, 1);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "getBufferedChar", 
function (index) {
if (this.isValidMask ()) {
if (this.string != null && index < this.string.length) {
return this.string.charAt (index);
}}return String.fromCharCode (0);
}, "~N");
Clazz.defineMethod (c$, "isValidMask", 
function () {
return this.validMask;
});
Clazz.defineMethod (c$, "isLiteral", 
function (attributes) {
return ((attributes == null) || attributes.size () == 0);
}, "java.util.Map");
Clazz.defineMethod (c$, "updateMask", 
($fz = function (iterator) {
if (iterator != null) {
this.validMask = true;
this.iterator = iterator;
if (this.literalMask == null) {
this.literalMask =  new java.util.BitSet ();
} else {
for (var counter = this.literalMask.length () - 1; counter >= 0; counter--) {
this.literalMask.clear (counter);
}
}iterator.first ();
while (iterator.current () != '\uffff') {
var attributes = iterator.getAttributes ();
var set = this.isLiteral (attributes);
var start = iterator.getIndex ();
var end = iterator.getRunLimit ();
while (start < end) {
if (set) {
this.literalMask.set (start);
} else {
this.literalMask.clear (start);
}start++;
}
iterator.setIndex (start);
}
}}, $fz.isPrivate = true, $fz), "jsjava.text.AttributedCharacterIterator");
Clazz.defineMethod (c$, "canIncrement", 
function (field, cursorPosition) {
return (field != null);
}, "~O,~N");
Clazz.defineMethod (c$, "selectField", 
function (f, count) {
var iterator = this.getIterator ();
if (iterator != null && (Clazz.instanceOf (f, jsjava.text.AttributedCharacterIterator.Attribute))) {
var field = f;
iterator.first ();
while (iterator.current () != '\uffff') {
while (iterator.getAttribute (field) == null && iterator.next () != '\uffff') ;
if (iterator.current () != '\uffff') {
var limit = iterator.getRunLimit (field);
if (--count <= 0) {
this.getFormattedTextField ().select (iterator.getIndex (), limit);
break;
}iterator.setIndex (limit);
iterator.next ();
}}
}}, "~O,~N");
Clazz.defineMethod (c$, "getAdjustField", 
function (start, attributes) {
return null;
}, "~N,java.util.Map");
Clazz.defineMethod (c$, "getFieldTypeCountTo", 
($fz = function (f, start) {
var iterator = this.getIterator ();
var count = 0;
if (iterator != null && (Clazz.instanceOf (f, jsjava.text.AttributedCharacterIterator.Attribute))) {
var field = f;
var index = 0;
iterator.first ();
while (iterator.getIndex () < start) {
while (iterator.getAttribute (field) == null && iterator.next () != '\uffff') ;
if (iterator.current () != '\uffff') {
iterator.setIndex (iterator.getRunLimit (field));
iterator.next ();
count++;
} else {
break;
}}
}return count;
}, $fz.isPrivate = true, $fz), "~O,~N");
Clazz.defineMethod (c$, "adjustValue", 
function (value, attributes, field, direction) {
return null;
}, "~O,java.util.Map,~O,~N");
Clazz.defineMethod (c$, "getSupportsIncrement", 
function () {
return false;
});
Clazz.defineMethod (c$, "resetValue", 
function (value) {
var doc = this.getFormattedTextField ().getDocument ();
var string = this.valueToString (value);
try {
this.ignoreDocumentMutate = true;
doc.remove (0, doc.getLength ());
doc.insertString (0, string, null);
} finally {
this.ignoreDocumentMutate = false;
}
this.updateValue (value);
}, "~O");
Clazz.defineMethod (c$, "getReplaceHolder", 
function (fb, offset, length, text, attrs) {
if (this.replaceHolder == null) {
this.replaceHolder =  new jsjavax.swing.text.InternationalFormatter.ExtendedReplaceHolder ();
}return Clazz.superCall (this, jsjavax.swing.text.InternationalFormatter, "getReplaceHolder", [fb, offset, length, text, attrs]);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,jsjavax.swing.text.AttributeSet");
c$.$InternationalFormatter$IncrementAction$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.direction = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.InternationalFormatter, "IncrementAction", jsjavax.swing.AbstractAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.InternationalFormatter.IncrementAction, [a]);
this.direction = b;
}, "~S,~N");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
if (this.b$["jsjavax.swing.text.InternationalFormatter"].getFormattedTextField ().isEditable ()) {
if (this.b$["jsjavax.swing.text.InternationalFormatter"].getAllowsInvalid ()) {
this.b$["jsjavax.swing.text.InternationalFormatter"].updateMask ();
}var b = false;
if (this.b$["jsjavax.swing.text.InternationalFormatter"].isValidMask ()) {
var c = this.b$["jsjavax.swing.text.InternationalFormatter"].getFormattedTextField ().getSelectionStart ();
if (c != -1) {
var d = this.b$["jsjavax.swing.text.InternationalFormatter"].getIterator ();
d.setIndex (c);
var e = d.getAttributes ();
var f = this.b$["jsjavax.swing.text.InternationalFormatter"].getAdjustField (c, e);
if (this.b$["jsjavax.swing.text.InternationalFormatter"].canIncrement (f, c)) {
try {
var g = this.b$["jsjavax.swing.text.InternationalFormatter"].stringToValue (this.b$["jsjavax.swing.text.InternationalFormatter"].getFormattedTextField ().getText ());
var h = this.b$["jsjavax.swing.text.InternationalFormatter"].getFieldTypeCountTo (f, c);
g = this.b$["jsjavax.swing.text.InternationalFormatter"].adjustValue (g, e, f, this.direction);
if (g != null && this.b$["jsjavax.swing.text.InternationalFormatter"].isValidValue (g, false)) {
this.b$["jsjavax.swing.text.InternationalFormatter"].resetValue (g);
this.b$["jsjavax.swing.text.InternationalFormatter"].updateMask ();
if (this.b$["jsjavax.swing.text.InternationalFormatter"].isValidMask ()) {
this.b$["jsjavax.swing.text.InternationalFormatter"].selectField (f, h);
}b = true;
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, jsjava.text.ParseException)) {
var pe = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, jsjavax.swing.text.BadLocationException)) {
var ble = e$$;
{
}
} else {
throw e$$;
}
}
}}}if (!b) {
this.b$["jsjavax.swing.text.InternationalFormatter"].invalidEdit ();
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.endOffset = 0;
this.endTextLength = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.InternationalFormatter, "ExtendedReplaceHolder", jsjavax.swing.text.DefaultFormatter.ReplaceHolder);
Clazz.defineMethod (c$, "resetFromValue", 
function (a) {
this.offset = 0;
try {
this.text = a.valueToString (this.value);
} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
this.text = "";
} else {
throw pe;
}
}
this.length = this.fb.getDocument ().getLength ();
}, "jsjavax.swing.text.InternationalFormatter");
c$ = Clazz.p0p ();
c$.EMPTY_FIELD_ARRAY = c$.prototype.EMPTY_FIELD_ARRAY =  new Array (0);
});
