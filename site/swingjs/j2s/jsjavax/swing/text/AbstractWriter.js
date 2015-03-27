Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (null, "jsjavax.swing.text.AbstractWriter", ["java.lang.Character", "jsjavax.swing.text.ElementIterator", "$.Segment"], function () {
c$ = Clazz.decorateAsClass (function () {
this.it = null;
this.out = null;
this.indentLevel = 0;
this.indentSpace = 2;
this.doc = null;
this.maxLineLength = 100;
this.currLength = 0;
this.startOffset = 0;
this.endOffset = 0;
this.offsetIndent = 0;
this.lineSeparator = null;
this.canWrapLines = false;
this.$isLineEmpty = false;
this.indentChars = null;
this.tempChars = null;
this.newlineChars = null;
this.segment = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "AbstractWriter");
Clazz.makeConstructor (c$, 
function (w, doc) {
this.construct (w, doc, 0, doc.getLength ());
}, "java.io.Writer,jsjavax.swing.text.Document");
Clazz.makeConstructor (c$, 
function (w, doc, pos, len) {
this.doc = doc;
this.it =  new jsjavax.swing.text.ElementIterator (doc.getDefaultRootElement ());
this.out = w;
this.startOffset = pos;
this.endOffset = pos + len;
var docNewline = doc.getProperty ("__EndOfLine__");
if (Clazz.instanceOf (docNewline, String)) {
this.setLineSeparator (docNewline);
} else {
var newline = null;
try {
newline = System.getProperty ("line.separator");
} catch (se) {
if (Clazz.exceptionOf (se, SecurityException)) {
} else {
throw se;
}
}
if (newline == null) {
newline = "\n";
}this.setLineSeparator (newline);
}this.canWrapLines = true;
}, "java.io.Writer,jsjavax.swing.text.Document,~N,~N");
Clazz.makeConstructor (c$, 
function (w, root) {
this.construct (w, root, 0, root.getEndOffset ());
}, "java.io.Writer,jsjavax.swing.text.Element");
Clazz.makeConstructor (c$, 
function (w, root, pos, len) {
this.doc = root.getDocument ();
this.it =  new jsjavax.swing.text.ElementIterator (root);
this.out = w;
this.startOffset = pos;
this.endOffset = pos + len;
this.canWrapLines = true;
}, "java.io.Writer,jsjavax.swing.text.Element,~N,~N");
Clazz.defineMethod (c$, "getStartOffset", 
function () {
return this.startOffset;
});
Clazz.defineMethod (c$, "getEndOffset", 
function () {
return this.endOffset;
});
Clazz.defineMethod (c$, "getElementIterator", 
function () {
return this.it;
});
Clazz.defineMethod (c$, "getWriter", 
function () {
return this.out;
});
Clazz.defineMethod (c$, "getDocument", 
function () {
return this.doc;
});
Clazz.defineMethod (c$, "inRange", 
function (next) {
var startOffset = this.getStartOffset ();
var endOffset = this.getEndOffset ();
if ((next.getStartOffset () >= startOffset && next.getStartOffset () < endOffset) || (startOffset >= next.getStartOffset () && startOffset < next.getEndOffset ())) {
return true;
}return false;
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "getText", 
function (elem) {
return this.doc.getText (elem.getStartOffset (), elem.getEndOffset () - elem.getStartOffset ());
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "text", 
function (elem) {
var start = Math.max (this.getStartOffset (), elem.getStartOffset ());
var end = Math.min (this.getEndOffset (), elem.getEndOffset ());
if (start < end) {
if (this.segment == null) {
this.segment =  new jsjavax.swing.text.Segment ();
}this.getDocument ().getText (start, end - start, this.segment);
if (this.segment.count > 0) {
this.write (this.segment.array, this.segment.offset, this.segment.count);
}}}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "setLineLength", 
function (l) {
this.maxLineLength = l;
}, "~N");
Clazz.defineMethod (c$, "getLineLength", 
function () {
return this.maxLineLength;
});
Clazz.defineMethod (c$, "setCurrentLineLength", 
function (length) {
this.currLength = length;
this.$isLineEmpty = (this.currLength == 0);
}, "~N");
Clazz.defineMethod (c$, "getCurrentLineLength", 
function () {
return this.currLength;
});
Clazz.defineMethod (c$, "isLineEmpty", 
function () {
return this.$isLineEmpty;
});
Clazz.defineMethod (c$, "setCanWrapLines", 
function (newValue) {
this.canWrapLines = newValue;
}, "~B");
Clazz.defineMethod (c$, "getCanWrapLines", 
function () {
return this.canWrapLines;
});
Clazz.defineMethod (c$, "setIndentSpace", 
function (space) {
this.indentSpace = space;
}, "~N");
Clazz.defineMethod (c$, "getIndentSpace", 
function () {
return this.indentSpace;
});
Clazz.defineMethod (c$, "setLineSeparator", 
function (value) {
this.lineSeparator = value;
}, "~S");
Clazz.defineMethod (c$, "getLineSeparator", 
function () {
return this.lineSeparator;
});
Clazz.defineMethod (c$, "incrIndent", 
function () {
if (this.offsetIndent > 0) {
this.offsetIndent++;
} else {
if (++this.indentLevel * this.getIndentSpace () >= this.getLineLength ()) {
this.offsetIndent++;
--this.indentLevel;
}}});
Clazz.defineMethod (c$, "decrIndent", 
function () {
if (this.offsetIndent > 0) {
--this.offsetIndent;
} else {
this.indentLevel--;
}});
Clazz.defineMethod (c$, "getIndentLevel", 
function () {
return this.indentLevel;
});
Clazz.defineMethod (c$, "indent", 
function () {
var max = this.getIndentLevel () * this.getIndentSpace ();
if (this.indentChars == null || max > this.indentChars.length) {
this.indentChars =  Clazz.newCharArray (max, '\0');
for (var counter = 0; counter < max; counter++) {
this.indentChars[counter] = ' ';
}
}var length = this.getCurrentLineLength ();
var wasEmpty = this.isLineEmpty ();
this.output (this.indentChars, 0, max);
if (wasEmpty && length == 0) {
this.$isLineEmpty = true;
}});
Clazz.defineMethod (c$, "write", 
function (ch) {
if (this.tempChars == null) {
this.tempChars =  Clazz.newCharArray (128, '\0');
}this.tempChars[0] = ch;
this.write (this.tempChars, 0, 1);
}, "~S");
Clazz.defineMethod (c$, "write", 
function (content) {
if (content == null) {
return;
}var size = content.length;
if (this.tempChars == null || this.tempChars.length < size) {
this.tempChars =  Clazz.newCharArray (size, '\0');
}content.getChars (0, size, this.tempChars, 0);
this.write (this.tempChars, 0, size);
}, "~S");
Clazz.defineMethod (c$, "writeLineSeparator", 
function () {
var newline = this.getLineSeparator ();
var length = newline.length;
if (this.newlineChars == null || this.newlineChars.length < length) {
this.newlineChars =  Clazz.newCharArray (length, '\0');
}newline.getChars (0, length, this.newlineChars, 0);
this.output (this.newlineChars, 0, length);
this.setCurrentLineLength (0);
});
Clazz.defineMethod (c$, "write", 
function (chars, startIndex, length) {
if (!this.getCanWrapLines ()) {
var lastIndex = startIndex;
var endIndex = startIndex + length;
var newlineIndex = this.indexOf (chars, '\u000a', startIndex, endIndex);
while (newlineIndex != -1) {
if (newlineIndex > lastIndex) {
this.output (chars, lastIndex, newlineIndex - lastIndex);
}this.writeLineSeparator ();
lastIndex = newlineIndex + 1;
newlineIndex = this.indexOf (chars, '\n', lastIndex, endIndex);
}
if (lastIndex < endIndex) {
this.output (chars, lastIndex, endIndex - lastIndex);
}} else {
var lastIndex = startIndex;
var endIndex = startIndex + length;
var lineLength = this.getCurrentLineLength ();
var maxLength = this.getLineLength ();
while (lastIndex < endIndex) {
var newlineIndex = this.indexOf (chars, '\u000a', lastIndex, endIndex);
var needsNewline = false;
var forceNewLine = false;
lineLength = this.getCurrentLineLength ();
if (newlineIndex != -1 && (lineLength + (newlineIndex - lastIndex)) < maxLength) {
if (newlineIndex > lastIndex) {
this.output (chars, lastIndex, newlineIndex - lastIndex);
}lastIndex = newlineIndex + 1;
forceNewLine = true;
} else if (newlineIndex == -1 && (lineLength + (endIndex - lastIndex)) < maxLength) {
if (endIndex > lastIndex) {
this.output (chars, lastIndex, endIndex - lastIndex);
}lastIndex = endIndex;
} else {
var breakPoint = -1;
var maxBreak = Math.min (endIndex - lastIndex, maxLength - lineLength - 1);
var counter = 0;
while (counter < maxBreak) {
if (Character.isWhitespace (chars[counter + lastIndex])) {
breakPoint = counter;
}counter++;
}
if (breakPoint != -1) {
breakPoint += lastIndex + 1;
this.output (chars, lastIndex, breakPoint - lastIndex);
lastIndex = breakPoint;
needsNewline = true;
} else {
counter = Math.max (0, maxBreak);
maxBreak = endIndex - lastIndex;
while (counter < maxBreak) {
if (Character.isWhitespace (chars[counter + lastIndex])) {
breakPoint = counter;
break;
}counter++;
}
if (breakPoint == -1) {
this.output (chars, lastIndex, endIndex - lastIndex);
breakPoint = endIndex;
} else {
breakPoint += lastIndex;
if (chars[breakPoint] == '\u000a') {
this.output (chars, lastIndex, breakPoint++ - lastIndex);
forceNewLine = true;
} else {
this.output (chars, lastIndex, ++breakPoint - lastIndex);
needsNewline = true;
}}lastIndex = breakPoint;
}}if (forceNewLine || needsNewline || lastIndex < endIndex) {
this.writeLineSeparator ();
if (lastIndex < endIndex || !forceNewLine) {
this.indent ();
}}}
}}, "~A,~N,~N");
Clazz.defineMethod (c$, "writeAttributes", 
function (attr) {
var names = attr.getAttributeNames ();
while (names.hasMoreElements ()) {
var name = names.nextElement ();
this.write (" " + name + "=" + attr.getAttribute (name));
}
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "output", 
function (content, start, length) {
this.getWriter ().write (content, start, length);
this.setCurrentLineLength (this.getCurrentLineLength () + length);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "indexOf", 
($fz = function (chars, sChar, startIndex, endIndex) {
while (startIndex < endIndex) {
if (chars[startIndex] == sChar) {
return startIndex;
}startIndex++;
}
return -1;
}, $fz.isPrivate = true, $fz), "~A,~S,~N,~N");
Clazz.defineStatics (c$,
"NEWLINE", '\n');
});
