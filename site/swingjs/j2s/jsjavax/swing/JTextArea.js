Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.text.JTextComponent"], "jsjavax.swing.JTextArea", ["java.lang.IllegalArgumentException", "jsjava.awt.Dimension", "jsjavax.swing.JComponent", "$.LookAndFeel", "jsjavax.swing.text.AbstractDocument", "$.BadLocationException", "$.PlainDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rows = 0;
this.columns = 0;
this.columnWidth = 0;
this.rowHeight = 0;
this.wrap = false;
this.word = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JTextArea", jsjavax.swing.text.JTextComponent);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, 0, 0);
});
Clazz.makeConstructor (c$, 
function (text) {
this.construct (null, text, 0, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (rows, columns) {
this.construct (null, null, rows, columns);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (text, rows, columns) {
this.construct (null, text, rows, columns);
}, "~S,~N,~N");
Clazz.makeConstructor (c$, 
function (doc) {
this.construct (doc, null, 0, 0);
}, "jsjavax.swing.text.Document");
Clazz.makeConstructor (c$, 
function (doc, text, rows, columns) {
Clazz.superConstructor (this, jsjavax.swing.JTextArea);
this.rows = rows;
this.columns = columns;
if (doc == null) {
doc = this.createDefaultModel ();
}this.setDocument (doc);
if (text != null) {
this.setText (text);
this.select (0, 0);
}if (rows < 0) {
throw  new IllegalArgumentException ("rows: " + rows);
}if (columns < 0) {
throw  new IllegalArgumentException ("columns: " + columns);
}jsjavax.swing.LookAndFeel.installProperty (this, "focusTraversalKeysForward", jsjavax.swing.JComponent.getManagingFocusForwardTraversalKeys ());
jsjavax.swing.LookAndFeel.installProperty (this, "focusTraversalKeysBackward", jsjavax.swing.JComponent.getManagingFocusBackwardTraversalKeys ());
}, "jsjavax.swing.text.Document,~S,~N,~N");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "TextAreaUI";
});
Clazz.defineMethod (c$, "createDefaultModel", 
function () {
return  new jsjavax.swing.text.PlainDocument ();
});
Clazz.defineMethod (c$, "setTabSize", 
function (size) {
var doc = this.getDocument ();
if (doc != null) {
var old = this.getTabSize ();
doc.putProperty ("tabSize",  new Integer (size));
this.firePropertyChange ("tabSize", old, size);
}}, "~N");
Clazz.defineMethod (c$, "getTabSize", 
function () {
var size = 8;
var doc = this.getDocument ();
if (doc != null) {
var i = doc.getProperty ("tabSize");
if (i != null) {
size = i.intValue ();
}}return size;
});
Clazz.defineMethod (c$, "setLineWrap", 
function (wrap) {
var old = this.wrap;
this.wrap = wrap;
this.firePropertyChange ("lineWrap", old, wrap);
}, "~B");
Clazz.defineMethod (c$, "getLineWrap", 
function () {
return this.wrap;
});
Clazz.defineMethod (c$, "setWrapStyleWord", 
function (word) {
var old = this.word;
this.word = word;
this.firePropertyChange ("wrapStyleWord", old, word);
}, "~B");
Clazz.defineMethod (c$, "getWrapStyleWord", 
function () {
return this.word;
});
Clazz.defineMethod (c$, "getLineOfOffset", 
function (offset) {
var doc = this.getDocument ();
if (offset < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Can't translate offset to line", -1);
} else if (offset > doc.getLength ()) {
throw  new jsjavax.swing.text.BadLocationException ("Can't translate offset to line", doc.getLength () + 1);
} else {
var map = this.getDocument ().getDefaultRootElement ();
return map.getElementIndex (offset);
}}, "~N");
Clazz.defineMethod (c$, "getLineCount", 
function () {
var map = this.getDocument ().getDefaultRootElement ();
return map.getElementCount ();
});
Clazz.defineMethod (c$, "getLineStartOffset", 
function (line) {
var lineCount = this.getLineCount ();
if (line < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Negative line", -1);
} else if (line >= lineCount) {
throw  new jsjavax.swing.text.BadLocationException ("No such line", this.getDocument ().getLength () + 1);
} else {
var map = this.getDocument ().getDefaultRootElement ();
var lineElem = map.getElement (line);
return lineElem.getStartOffset ();
}}, "~N");
Clazz.defineMethod (c$, "getLineEndOffset", 
function (line) {
var lineCount = this.getLineCount ();
if (line < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Negative line", -1);
} else if (line >= lineCount) {
throw  new jsjavax.swing.text.BadLocationException ("No such line", this.getDocument ().getLength () + 1);
} else {
var map = this.getDocument ().getDefaultRootElement ();
var lineElem = map.getElement (line);
var endOffset = lineElem.getEndOffset ();
return ((line == lineCount - 1) ? (endOffset - 1) : endOffset);
}}, "~N");
Clazz.defineMethod (c$, "insert", 
function (str, pos) {
var doc = this.getDocument ();
if (doc != null) {
try {
doc.insertString (pos, str, null);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
throw  new IllegalArgumentException (e.getMessage ());
} else {
throw e;
}
}
}}, "~S,~N");
Clazz.defineMethod (c$, "append", 
function (str) {
var doc = this.getDocument ();
if (doc != null) {
try {
doc.insertString (doc.getLength (), str, null);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
}}, "~S");
Clazz.defineMethod (c$, "replaceRange", 
function (str, start, end) {
if (end < start) {
throw  new IllegalArgumentException ("end before start");
}var doc = this.getDocument ();
if (doc != null) {
try {
if (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument)) {
(doc).replace (start, end - start, str, null);
} else {
doc.remove (start, end - start);
doc.insertString (start, str, null);
}} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
throw  new IllegalArgumentException (e.getMessage ());
} else {
throw e;
}
}
}}, "~S,~N,~N");
Clazz.defineMethod (c$, "getRows", 
function () {
return this.rows;
});
Clazz.defineMethod (c$, "setRows", 
function (rows) {
var oldVal = this.rows;
if (rows < 0) {
throw  new IllegalArgumentException ("rows less than zero.");
}if (rows != oldVal) {
this.rows = rows;
this.invalidate ();
}}, "~N");
Clazz.defineMethod (c$, "getRowHeight", 
function () {
if (this.rowHeight == 0) {
var metrics = this.getFontMetrics (this.getFont ());
this.rowHeight = metrics.getHeight ();
}return this.rowHeight;
});
Clazz.defineMethod (c$, "getColumns", 
function () {
return this.columns;
});
Clazz.defineMethod (c$, "setColumns", 
function (columns) {
var oldVal = this.columns;
if (columns < 0) {
throw  new IllegalArgumentException ("columns less than zero.");
}if (columns != oldVal) {
this.columns = columns;
this.invalidate ();
}}, "~N");
Clazz.defineMethod (c$, "getColumnWidth", 
function () {
if (this.columnWidth == 0) {
var metrics = this.getFontMetrics (this.getFont ());
this.columnWidth = metrics.charWidth ('m');
}return this.columnWidth;
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
var d = Clazz.superCall (this, jsjavax.swing.JTextArea, "getPreferredSize", []);
d = (d == null) ?  new jsjava.awt.Dimension (400, 400) : d;
var insets = this.getInsets ();
if (this.columns != 0) {
d.width = Math.max (d.width, this.columns * this.getColumnWidth () + insets.left + insets.right);
}if (this.rows != 0) {
d.height = Math.max (d.height, this.rows * this.getRowHeight () + insets.top + insets.bottom);
}return d;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
Clazz.superCall (this, jsjavax.swing.JTextArea, "setFont", [f]);
this.rowHeight = 0;
this.columnWidth = 0;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "paramString", 
function () {
var wrapString = (this.wrap ? "true" : "false");
var wordString = (this.word ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JTextArea, "paramString", []) + ",colums=" + this.columns + ",columWidth=" + this.columnWidth + ",rows=" + this.rows + ",rowHeight=" + this.rowHeight + ",word=" + wordString + ",wrap=" + wrapString;
});
Clazz.defineMethod (c$, "getScrollableTracksViewportWidth", 
function () {
return (this.wrap) ? true : Clazz.superCall (this, jsjavax.swing.JTextArea, "getScrollableTracksViewportWidth", []);
});
Clazz.defineMethod (c$, "getPreferredScrollableViewportSize", 
function () {
var size = Clazz.superCall (this, jsjavax.swing.JTextArea, "getPreferredScrollableViewportSize", []);
size = (size == null) ?  new jsjava.awt.Dimension (400, 400) : size;
var insets = this.getInsets ();
size.width = (this.columns == 0) ? size.width : this.columns * this.getColumnWidth () + insets.left + insets.right;
size.height = (this.rows == 0) ? size.height : this.rows * this.getRowHeight () + insets.top + insets.bottom;
return size;
});
Clazz.overrideMethod (c$, "getScrollableUnitIncrement", 
function (visibleRect, orientation, direction) {
switch (orientation) {
case 1:
return this.getRowHeight ();
case 0:
return this.getColumnWidth ();
default:
throw  new IllegalArgumentException ("Invalid orientation: " + orientation);
}
}, "jsjava.awt.Rectangle,~N,~N");
Clazz.defineStatics (c$,
"$uiClassID", "TextAreaUI");
});
