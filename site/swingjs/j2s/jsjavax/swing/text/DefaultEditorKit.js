Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.EditorKit", "$.TextAction"], "jsjavax.swing.text.DefaultEditorKit", ["java.io.InputStreamReader", "$.OutputStreamWriter", "jsjava.awt.ComponentOrientation", "$.Point", "$.Rectangle", "jsjavax.swing.UIManager", "jsjavax.swing.text.BadLocationException", "$.DefaultCaret", "$.PlainDocument", "$.Position", "$.Segment", "$.Utilities"], function () {
c$ = Clazz.declareType (jsjavax.swing.text, "DefaultEditorKit", jsjavax.swing.text.EditorKit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit, []);
});
Clazz.overrideMethod (c$, "getContentType", 
function () {
return "text/plain";
});
Clazz.overrideMethod (c$, "getViewFactory", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getActions", 
function () {
return jsjavax.swing.text.DefaultEditorKit.defaultActions;
});
Clazz.overrideMethod (c$, "createCaret", 
function () {
return null;
});
Clazz.overrideMethod (c$, "createDefaultDocument", 
function () {
return  new jsjavax.swing.text.PlainDocument ();
});
Clazz.defineMethod (c$, "read", 
function ($in, doc, pos) {
this.read ( new java.io.InputStreamReader ($in), doc, pos);
}, "java.io.InputStream,jsjavax.swing.text.Document,~N");
Clazz.defineMethod (c$, "write", 
function (out, doc, pos, len) {
var osw =  new java.io.OutputStreamWriter (out);
this.write (osw, doc, pos, len);
osw.flush ();
}, "java.io.OutputStream,jsjavax.swing.text.Document,~N,~N");
Clazz.defineMethod (c$, "getInputAttributes", 
function () {
return null;
});
Clazz.defineMethod (c$, "read", 
function ($in, doc, pos) {
var buff =  Clazz.newCharArray (4096, '\0');
var nch;
var lastWasCR = false;
var isCRLF = false;
var isCR = false;
var last;
var wasEmpty = (doc.getLength () == 0);
var attr = this.getInputAttributes ();
while ((nch = $in.read (buff, 0, buff.length)) != -1) {
last = 0;
for (var counter = 0; counter < nch; counter++) {
switch (buff[counter]) {
case '\r':
if (lastWasCR) {
isCR = true;
if (counter == 0) {
doc.insertString (pos, "\n", attr);
pos++;
} else {
buff[counter - 1] = '\n';
}} else {
lastWasCR = true;
}break;
case '\n':
if (lastWasCR) {
if (counter > (last + 1)) {
doc.insertString (pos,  String.instantialize (buff, last, counter - last - 1), attr);
pos += (counter - last - 1);
}lastWasCR = false;
last = counter;
isCRLF = true;
}break;
default:
if (lastWasCR) {
isCR = true;
if (counter == 0) {
doc.insertString (pos, "\n", attr);
pos++;
} else {
buff[counter - 1] = '\n';
}lastWasCR = false;
}break;
}
}
if (last < nch) {
if (lastWasCR) {
if (last < (nch - 1)) {
doc.insertString (pos,  String.instantialize (buff, last, nch - last - 1), attr);
pos += (nch - last - 1);
}} else {
doc.insertString (pos,  String.instantialize (buff, last, nch - last), attr);
pos += (nch - last);
}}}
if (lastWasCR) {
doc.insertString (pos, "\n", attr);
isCR = true;
}if (wasEmpty) {
if (isCRLF) {
doc.putProperty ("__EndOfLine__", "\r\n");
} else if (isCR) {
doc.putProperty ("__EndOfLine__", "\r");
} else {
doc.putProperty ("__EndOfLine__", "\n");
}}}, "java.io.Reader,jsjavax.swing.text.Document,~N");
Clazz.defineMethod (c$, "write", 
function (out, doc, pos, len) {
if ((pos < 0) || ((pos + len) > doc.getLength ())) {
throw  new jsjavax.swing.text.BadLocationException ("DefaultEditorKit.write", pos);
}var data =  new jsjavax.swing.text.Segment ();
var nleft = len;
var offs = pos;
var endOfLineProperty = doc.getProperty ("__EndOfLine__");
if (endOfLineProperty == null) {
try {
endOfLineProperty = System.getProperty ("line.separator");
} catch (se) {
if (Clazz.exceptionOf (se, SecurityException)) {
} else {
throw se;
}
}
}var endOfLine;
if (Clazz.instanceOf (endOfLineProperty, String)) {
endOfLine = endOfLineProperty;
} else {
endOfLine = null;
}if (endOfLineProperty != null && !endOfLine.equals ("\n")) {
while (nleft > 0) {
var n = Math.min (nleft, 4096);
doc.getText (offs, n, data);
var last = data.offset;
var array = data.array;
var maxCounter = last + data.count;
for (var counter = last; counter < maxCounter; counter++) {
if (array[counter] == '\n') {
if (counter > last) {
out.write (array, last, counter - last);
}out.write (endOfLine);
last = counter + 1;
}}
if (maxCounter > last) {
out.write (array, last, maxCounter - last);
}offs += n;
nleft -= n;
}
} else {
while (nleft > 0) {
var n = Math.min (nleft, 4096);
doc.getText (offs, n, data);
out.write (data.array, data.offset, data.count);
offs += n;
nleft -= n;
}
}out.flush ();
}, "java.io.Writer,jsjavax.swing.text.Document,~N,~N");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "DefaultKeyTypedAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.DefaultKeyTypedAction, ["default-typed"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if ((b != null) && (a != null)) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
return;
}var c = a.getActionCommand ();
var d = a.getModifiers ();
if ((c != null) && (c.length > 0) && ((d & 8) == (d & 2))) {
var e = c.charAt (0);
if ((e.charCodeAt (0) >= 0x20) && (e.charCodeAt (0) != 0x7F)) {
b.replaceSelection (c);
}}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "InsertContentAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.InsertContentAction, ["insert-content"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if ((b != null) && (a != null)) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}var c = a.getActionCommand ();
if (c != null) {
b.replaceSelection (c);
} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "InsertBreakAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.InsertBreakAction, ["insert-break"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}b.replaceSelection ("\n");
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "InsertTabAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.InsertTabAction, ["insert-tab"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}b.replaceSelection ("\t");
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "DeletePrevCharAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.DeletePrevCharAction, ["delete-previous"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
var c = true;
if ((b != null) && (b.isEditable ())) {
try {
var d = b.getDocument ();
var e = b.getCaret ();
var f = e.getDot ();
var g = e.getMark ();
if (f != g) {
d.remove (Math.min (f, g), Math.abs (f - g));
c = false;
} else if (f > 0) {
var h = 1;
if (f > 1) {
var i = d.getText (f - 2, 2);
var j = i.charAt (0);
var k = i.charAt (1);
if (j >= '\uD800' && j <= '\uDBFF' && k >= '\uDC00' && k <= '\uDFFF') {
h = 2;
}}d.remove (f - h, h);
c = false;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
} else {
throw bl;
}
}
}if (c) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "DeleteNextCharAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.DeleteNextCharAction, ["delete-next"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
var c = true;
if ((b != null) && (b.isEditable ())) {
try {
var d = b.getDocument ();
var e = b.getCaret ();
var f = e.getDot ();
var g = e.getMark ();
if (f != g) {
d.remove (Math.min (f, g), Math.abs (f - g));
c = false;
} else if (f < d.getLength ()) {
var h = 1;
if (f < d.getLength () - 1) {
var i = d.getText (f, 2);
var j = i.charAt (0);
var k = i.charAt (1);
if (j >= '\uD800' && j <= '\uDBFF' && k >= '\uDC00' && k <= '\uDFFF') {
h = 2;
}}d.remove (f, h);
c = false;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
} else {
throw bl;
}
}
}if (c) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "ReadOnlyAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.ReadOnlyAction, ["set-read-only"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.setEditable (false);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "WritableAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.WritableAction, ["set-writable"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.setEditable (true);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "CutAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.CutAction, ["cut-to-clipboard"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.cut ();
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "CopyAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.CopyAction, ["copy-to-clipboard"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.copy ();
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "PasteAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.PasteAction, ["paste-from-clipboard"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.paste ();
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "BeepAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.BeepAction, ["beep"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
this.direction = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "VerticalPageAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.VerticalPageAction, [a]);
this.select = c;
this.direction = b;
}, "~S,~N,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getVisibleRect ();
var d =  new jsjava.awt.Rectangle (c);
var e = b.getCaretPosition ();
var f = this.direction * b.getScrollableBlockIncrement (c, 1, this.direction);
var g = c.y;
var h = b.getCaret ();
var i = h.getMagicCaretPosition ();
if (e != -1) {
try {
var j = b.modelToView (e);
var k = (i != null) ? i.x : j.x;
var l = j.height;
if (l > 0) {
f = Clazz.doubleToInt (f / l) * l;
}d.y = this.constrainY (b, g + f, c.height);
var m;
if (c.contains (j.x, j.y)) {
m = b.viewToModel ( new jsjava.awt.Point (k, this.constrainY (b, j.y + f, 0)));
} else {
if (this.direction == -1) {
m = b.viewToModel ( new jsjava.awt.Point (k, d.y));
} else {
m = b.viewToModel ( new jsjava.awt.Point (k, d.y + c.height));
}}m = this.constrainOffset (b, m);
if (m != e) {
this.adjustScrollIfNecessary (b, d, g, m);
if (this.select) {
b.moveCaretPosition (m);
} else {
b.setCaretPosition (m);
}}} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
} else {
d.y = this.constrainY (b, g + f, c.height);
}if (i != null) {
h.setMagicCaretPosition (i);
}b.scrollRectToVisible (d);
}}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "constrainY", 
($fz = function (a, b, c) {
if (b < 0) {
b = 0;
} else if (b + c > a.getHeight ()) {
b = Math.max (0, a.getHeight () - c);
}return b;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.JTextComponent,~N,~N");
Clazz.defineMethod (c$, "constrainOffset", 
($fz = function (a, b) {
var c = a.getDocument ();
if ((b != 0) && (b > c.getLength ())) {
b = c.getLength ();
}if (b < 0) {
b = 0;
}return b;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.JTextComponent,~N");
Clazz.defineMethod (c$, "adjustScrollIfNecessary", 
($fz = function (a, b, c, d) {
try {
var e = a.modelToView (d);
if (e.y < b.y || (e.y > (b.y + b.height)) || (e.y + e.height) > (b.y + b.height)) {
var f;
if (e.y < b.y) {
f = e.y;
} else {
f = e.y + e.height - b.height;
}if ((this.direction == -1 && f < c) || (this.direction == 1 && f > c)) {
b.y = f;
}}} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.JTextComponent,jsjava.awt.Rectangle,~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
this.left = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "PageAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.PageAction, [a]);
this.select = c;
this.left = b;
}, "~S,~B,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c;
var d =  new jsjava.awt.Rectangle ();
b.computeVisibleRect (d);
if (this.left) {
d.x = Math.max (0, d.x - d.width);
} else {
d.x += d.width;
}c = b.getCaretPosition ();
if (c != -1) {
if (this.left) {
c = b.viewToModel ( new jsjava.awt.Point (d.x, d.y));
} else {
c = b.viewToModel ( new jsjava.awt.Point (d.x + d.width - 1, d.y + d.height - 1));
}var e = b.getDocument ();
if ((c != 0) && (c > (e.getLength () - 1))) {
c = e.getLength () - 1;
} else if (c < 0) {
c = 0;
}if (this.select) b.moveCaretPosition (c);
 else b.setCaretPosition (c);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
this.direction = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "NextVisualPositionAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction, [a]);
this.select = b;
this.direction = c;
}, "~S,~B,~N");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getCaret ();
var d = (Clazz.instanceOf (c, jsjavax.swing.text.DefaultCaret)) ? c : null;
var e = c.getDot ();
var f =  new Array (1);
var g = c.getMagicCaretPosition ();
try {
if (g == null && (this.direction == 1 || this.direction == 5)) {
var h = (d != null) ? b.getUI ().modelToView (b, e, d.getDotBias ()) : b.modelToView (e);
g =  new jsjava.awt.Point (h.x, h.y);
}var h = b.getNavigationFilter ();
if (h != null) {
e = h.getNextVisualPositionFrom (b, e, (d != null) ? d.getDotBias () : jsjavax.swing.text.Position.Bias.Forward, this.direction, f);
} else {
e = b.getUI ().getNextVisualPositionFrom (b, e, (d != null) ? d.getDotBias () : jsjavax.swing.text.Position.Bias.Forward, this.direction, f);
}if (f[0] == null) {
f[0] = jsjavax.swing.text.Position.Bias.Forward;
}if (d != null) {
if (this.select) {
d.moveDot (e, f[0]);
} else {
d.setDot (e, f[0]);
}} else {
if (this.select) {
c.moveDot (e);
} else {
c.setDot (e);
}}if (g != null && (this.direction == 1 || this.direction == 5)) {
b.getCaret ().setMagicCaretPosition (g);
}} catch (ex) {
if (Clazz.exceptionOf (ex, jsjavax.swing.text.BadLocationException)) {
} else {
throw ex;
}
}
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "BeginWordAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.BeginWordAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
try {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getWordStart (b, c);
if (this.select) {
b.moveCaretPosition (d);
} else {
b.setCaretPosition (d);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
} else {
throw bl;
}
}
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "EndWordAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.EndWordAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
try {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getWordEnd (b, c);
if (this.select) {
b.moveCaretPosition (d);
} else {
b.setCaretPosition (d);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
} else {
throw bl;
}
}
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "PreviousWordAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.PreviousWordAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getCaretPosition ();
var d = false;
try {
var e = jsjavax.swing.text.Utilities.getParagraphElement (b, c);
c = jsjavax.swing.text.Utilities.getPreviousWord (b, c);
if (c < e.getStartOffset ()) {
c = jsjavax.swing.text.Utilities.getParagraphElement (b, c).getEndOffset () - 1;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
if (c != 0) {
c = 0;
} else {
d = true;
}} else {
throw bl;
}
}
if (!d) {
if (this.select) {
b.moveCaretPosition (c);
} else {
b.setCaretPosition (c);
}} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "NextWordAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.NextWordAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getCaretPosition ();
var d = false;
var e = c;
var f = jsjavax.swing.text.Utilities.getParagraphElement (b, c);
try {
c = jsjavax.swing.text.Utilities.getNextWord (b, c);
if (c >= f.getEndOffset () && e != f.getEndOffset () - 1) {
c = f.getEndOffset () - 1;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
var g = b.getDocument ().getLength ();
if (c != g) {
if (e != f.getEndOffset () - 1) {
c = f.getEndOffset () - 1;
} else {
c = g;
}} else {
d = true;
}} else {
throw bl;
}
}
if (!d) {
if (this.select) {
b.moveCaretPosition (c);
} else {
b.setCaretPosition (c);
}} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "BeginLineAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.BeginLineAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
try {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getRowStart (b, c);
if (this.select) {
b.moveCaretPosition (d);
} else {
b.setCaretPosition (d);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
} else {
throw bl;
}
}
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "EndLineAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.EndLineAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
try {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getRowEnd (b, c);
if (this.select) {
b.moveCaretPosition (d);
} else {
b.setCaretPosition (d);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
} else {
throw bl;
}
}
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "BeginParagraphAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.BeginParagraphAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getParagraphElement (b, c);
c = d.getStartOffset ();
if (this.select) {
b.moveCaretPosition (c);
} else {
b.setCaretPosition (c);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "EndParagraphAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.EndParagraphAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getCaretPosition ();
var d = jsjavax.swing.text.Utilities.getParagraphElement (b, c);
c = Math.min (b.getDocument ().getLength (), d.getEndOffset ());
if (this.select) {
b.moveCaretPosition (c);
} else {
b.setCaretPosition (c);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "BeginAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.BeginAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
if (this.select) {
b.moveCaretPosition (0);
} else {
b.setCaretPosition (0);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.select = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "EndAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.EndAction, [a]);
this.select = b;
}, "~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getDocument ();
var d = c.getLength ();
if (this.select) {
b.moveCaretPosition (d);
} else {
b.setCaretPosition (d);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.start = null;
this.end = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "SelectWordAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.SelectWordAction, ["select-word"]);
this.start =  new jsjavax.swing.text.DefaultEditorKit.BeginWordAction ("pigdog", false);
this.end =  new jsjavax.swing.text.DefaultEditorKit.EndWordAction ("pigdog", true);
});
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
this.start.actionPerformed (a);
this.end.actionPerformed (a);
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.start = null;
this.end = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "SelectLineAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.SelectLineAction, ["select-line"]);
this.start =  new jsjavax.swing.text.DefaultEditorKit.BeginLineAction ("pigdog", false);
this.end =  new jsjavax.swing.text.DefaultEditorKit.EndLineAction ("pigdog", true);
});
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
this.start.actionPerformed (a);
this.end.actionPerformed (a);
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.start = null;
this.end = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultEditorKit, "SelectParagraphAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.SelectParagraphAction, ["select-paragraph"]);
this.start =  new jsjavax.swing.text.DefaultEditorKit.BeginParagraphAction ("pigdog", false);
this.end =  new jsjavax.swing.text.DefaultEditorKit.EndParagraphAction ("pigdog", true);
});
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
this.start.actionPerformed (a);
this.end.actionPerformed (a);
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "SelectAllAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.SelectAllAction, ["select-all"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getDocument ();
b.setCaretPosition (0);
b.moveCaretPosition (c.getLength ());
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "UnselectAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.UnselectAction, ["unselect"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
b.setCaretPosition (b.getCaretPosition ());
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultEditorKit, "ToggleComponentOrientationAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultEditorKit.ToggleComponentOrientationAction, ["toggle-componentOrientation"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getTextComponent (a);
if (b != null) {
var c = b.getComponentOrientation ();
var d;
if (c === jsjava.awt.ComponentOrientation.RIGHT_TO_LEFT) d = jsjava.awt.ComponentOrientation.LEFT_TO_RIGHT;
 else d = jsjava.awt.ComponentOrientation.RIGHT_TO_LEFT;
b.setComponentOrientation (d);
b.repaint ();
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"EndOfLineStringProperty", "__EndOfLine__",
"insertContentAction", "insert-content",
"insertBreakAction", "insert-break",
"insertTabAction", "insert-tab",
"deletePrevCharAction", "delete-previous",
"deleteNextCharAction", "delete-next",
"deleteNextWordAction", "delete-next-word",
"deletePrevWordAction", "delete-previous-word",
"readOnlyAction", "set-read-only",
"writableAction", "set-writable",
"cutAction", "cut-to-clipboard",
"copyAction", "copy-to-clipboard",
"pasteAction", "paste-from-clipboard",
"beepAction", "beep",
"pageUpAction", "page-up",
"pageDownAction", "page-down",
"selectionPageUpAction", "selection-page-up",
"selectionPageDownAction", "selection-page-down",
"selectionPageLeftAction", "selection-page-left",
"selectionPageRightAction", "selection-page-right",
"forwardAction", "caret-forward",
"backwardAction", "caret-backward",
"selectionForwardAction", "selection-forward",
"selectionBackwardAction", "selection-backward",
"upAction", "caret-up",
"downAction", "caret-down",
"selectionUpAction", "selection-up",
"selectionDownAction", "selection-down",
"beginWordAction", "caret-begin-word",
"endWordAction", "caret-end-word",
"selectionBeginWordAction", "selection-begin-word",
"selectionEndWordAction", "selection-end-word",
"previousWordAction", "caret-previous-word",
"nextWordAction", "caret-next-word",
"selectionPreviousWordAction", "selection-previous-word",
"selectionNextWordAction", "selection-next-word",
"beginLineAction", "caret-begin-line",
"endLineAction", "caret-end-line",
"selectionBeginLineAction", "selection-begin-line",
"selectionEndLineAction", "selection-end-line",
"beginParagraphAction", "caret-begin-paragraph",
"endParagraphAction", "caret-end-paragraph",
"selectionBeginParagraphAction", "selection-begin-paragraph",
"selectionEndParagraphAction", "selection-end-paragraph",
"beginAction", "caret-begin",
"endAction", "caret-end",
"selectionBeginAction", "selection-begin",
"selectionEndAction", "selection-end",
"selectWordAction", "select-word",
"selectLineAction", "select-line",
"selectParagraphAction", "select-paragraph",
"selectAllAction", "select-all",
"unselectAction", "unselect",
"toggleComponentOrientationAction", "toggle-componentOrientation",
"defaultKeyTypedAction", "default-typed");
c$.defaultActions = c$.prototype.defaultActions =  Clazz.newArray (-1, [ new jsjavax.swing.text.DefaultEditorKit.InsertContentAction (),  new jsjavax.swing.text.DefaultEditorKit.DeletePrevCharAction (),  new jsjavax.swing.text.DefaultEditorKit.DeleteNextCharAction (),  new jsjavax.swing.text.DefaultEditorKit.ReadOnlyAction (),  new jsjavax.swing.text.DefaultEditorKit.WritableAction (),  new jsjavax.swing.text.DefaultEditorKit.CutAction (),  new jsjavax.swing.text.DefaultEditorKit.CopyAction (),  new jsjavax.swing.text.DefaultEditorKit.PasteAction (),  new jsjavax.swing.text.DefaultEditorKit.VerticalPageAction ("page-up", -1, false),  new jsjavax.swing.text.DefaultEditorKit.VerticalPageAction ("page-down", 1, false),  new jsjavax.swing.text.DefaultEditorKit.VerticalPageAction ("selection-page-up", -1, true),  new jsjavax.swing.text.DefaultEditorKit.VerticalPageAction ("selection-page-down", 1, true),  new jsjavax.swing.text.DefaultEditorKit.PageAction ("selection-page-left", true, true),  new jsjavax.swing.text.DefaultEditorKit.PageAction ("selection-page-right", false, true),  new jsjavax.swing.text.DefaultEditorKit.InsertBreakAction (),  new jsjavax.swing.text.DefaultEditorKit.BeepAction (),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("caret-forward", false, 3),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("caret-backward", false, 7),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("selection-forward", true, 3),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("selection-backward", true, 7),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("caret-up", false, 1),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("caret-down", false, 5),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("selection-up", true, 1),  new jsjavax.swing.text.DefaultEditorKit.NextVisualPositionAction ("selection-down", true, 5),  new jsjavax.swing.text.DefaultEditorKit.BeginWordAction ("caret-begin-word", false),  new jsjavax.swing.text.DefaultEditorKit.EndWordAction ("caret-end-word", false),  new jsjavax.swing.text.DefaultEditorKit.BeginWordAction ("selection-begin-word", true),  new jsjavax.swing.text.DefaultEditorKit.EndWordAction ("selection-end-word", true),  new jsjavax.swing.text.DefaultEditorKit.PreviousWordAction ("caret-previous-word", false),  new jsjavax.swing.text.DefaultEditorKit.NextWordAction ("caret-next-word", false),  new jsjavax.swing.text.DefaultEditorKit.PreviousWordAction ("selection-previous-word", true),  new jsjavax.swing.text.DefaultEditorKit.NextWordAction ("selection-next-word", true),  new jsjavax.swing.text.DefaultEditorKit.BeginLineAction ("caret-begin-line", false),  new jsjavax.swing.text.DefaultEditorKit.EndLineAction ("caret-end-line", false),  new jsjavax.swing.text.DefaultEditorKit.BeginLineAction ("selection-begin-line", true),  new jsjavax.swing.text.DefaultEditorKit.EndLineAction ("selection-end-line", true),  new jsjavax.swing.text.DefaultEditorKit.BeginParagraphAction ("caret-begin-paragraph", false),  new jsjavax.swing.text.DefaultEditorKit.EndParagraphAction ("caret-end-paragraph", false),  new jsjavax.swing.text.DefaultEditorKit.BeginParagraphAction ("selection-begin-paragraph", true),  new jsjavax.swing.text.DefaultEditorKit.EndParagraphAction ("selection-end-paragraph", true),  new jsjavax.swing.text.DefaultEditorKit.BeginAction ("caret-begin", false),  new jsjavax.swing.text.DefaultEditorKit.EndAction ("caret-end", false),  new jsjavax.swing.text.DefaultEditorKit.BeginAction ("selection-begin", true),  new jsjavax.swing.text.DefaultEditorKit.EndAction ("selection-end", true),  new jsjavax.swing.text.DefaultEditorKit.DefaultKeyTypedAction (),  new jsjavax.swing.text.DefaultEditorKit.InsertTabAction (),  new jsjavax.swing.text.DefaultEditorKit.SelectWordAction (),  new jsjavax.swing.text.DefaultEditorKit.SelectLineAction (),  new jsjavax.swing.text.DefaultEditorKit.SelectParagraphAction (),  new jsjavax.swing.text.DefaultEditorKit.SelectAllAction (),  new jsjavax.swing.text.DefaultEditorKit.UnselectAction (),  new jsjavax.swing.text.DefaultEditorKit.ToggleComponentOrientationAction ()]);
});
