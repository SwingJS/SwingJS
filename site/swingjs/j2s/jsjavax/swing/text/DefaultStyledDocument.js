Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["java.lang.ref.WeakReference", "jsjavax.swing.event.ChangeListener", "jsjavax.swing.text.AbstractDocument", "$.StyledDocument", "jsjavax.swing.undo.AbstractUndoableEdit", "java.util.HashMap"], "jsjavax.swing.text.DefaultStyledDocument", ["java.lang.Boolean", "$.StringBuffer", "java.lang.ref.ReferenceQueue", "java.util.ArrayList", "$.Stack", "$.Vector", "jsjava.awt.font.TextAttribute", "jsjavax.swing.SwingUtilities", "jsjavax.swing.event.DocumentEvent", "$.DocumentListener", "$.UndoableEditEvent", "jsjavax.swing.text.AbstractDocument.AbstractElement", "jsjavax.swing.text.GapContent", "$.Segment", "$.SimpleAttributeSet", "$.StateInvariantError", "$.Style", "$.StyleContext", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buffer = null;
this.listeningStyles = null;
this.styleChangeListener = null;
this.styleContextChangeListener = null;
this.updateRunnable = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultStyledDocument.SectionElement")) {
jsjavax.swing.text.DefaultStyledDocument.$DefaultStyledDocument$SectionElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultStyledDocument.ElementBuffer")) {
jsjavax.swing.text.DefaultStyledDocument.$DefaultStyledDocument$ElementBuffer$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultStyledDocument.ChangeUpdateRunnable")) {
jsjavax.swing.text.DefaultStyledDocument.$DefaultStyledDocument$ChangeUpdateRunnable$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "DefaultStyledDocument", jsjavax.swing.text.AbstractDocument, jsjavax.swing.text.StyledDocument);
Clazz.makeConstructor (c$, 
function (c, styles) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultStyledDocument, [c, styles]);
this.listeningStyles =  new java.util.Vector ();
this.buffer = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultStyledDocument.ElementBuffer, this, null, this.createDefaultRoot ());
var defaultStyle = styles.getStyle ("default");
this.setLogicalStyle (0, defaultStyle);
}, "jsjavax.swing.text.AbstractDocument.Content,jsjavax.swing.text.StyleContext");
Clazz.makeConstructor (c$, 
function (styles) {
this.construct ( new jsjavax.swing.text.GapContent (4096), styles);
}, "jsjavax.swing.text.StyleContext");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new jsjavax.swing.text.GapContent (4096),  new jsjavax.swing.text.StyleContext ());
});
Clazz.overrideMethod (c$, "getDefaultRootElement", 
function () {
return this.buffer.getRootElement ();
});
Clazz.defineMethod (c$, "create", 
function (data) {
try {
if (this.getLength () != 0) {
this.remove (0, this.getLength ());
}this.writeLock ();
var c = this.getContent ();
var n = data.length;
var sb =  new StringBuffer ();
for (var i = 0; i < n; i++) {
var es = data[i];
if (es.getLength () > 0) {
sb.append (es.getArray (), es.getOffset (), es.getLength ());
}}
var cEdit = c.insertString (0, sb.toString ());
var length = sb.length ();
var evnt = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, 0, length, jsjavax.swing.event.DocumentEvent.EventType.INSERT);
evnt.addEdit (cEdit);
this.buffer.create (length, data, evnt);
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "insertUpdate", [evnt, null]);
evnt.end ();
this.fireInsertUpdate (evnt);
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, evnt));
} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.text.StateInvariantError ("problem initializing");
} else {
throw ble;
}
} finally {
this.writeUnlock ();
}
}, "~A");
Clazz.defineMethod (c$, "insert", 
function (offset, data) {
if (data == null || data.length == 0) {
return;
}try {
this.writeLock ();
var c = this.getContent ();
var n = data.length;
var sb =  new StringBuffer ();
for (var i = 0; i < n; i++) {
var es = data[i];
if (es.getLength () > 0) {
sb.append (es.getArray (), es.getOffset (), es.getLength ());
}}
if (sb.length () == 0) {
return;
}var cEdit = c.insertString (offset, sb.toString ());
var length = sb.length ();
var evnt = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, offset, length, jsjavax.swing.event.DocumentEvent.EventType.INSERT);
evnt.addEdit (cEdit);
this.buffer.insert (offset, length, data, evnt);
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "insertUpdate", [evnt, null]);
evnt.end ();
this.fireInsertUpdate (evnt);
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, evnt));
} finally {
this.writeUnlock ();
}
}, "~N,~A");
Clazz.overrideMethod (c$, "addStyle", 
function (nm, parent) {
var styles = this.getAttributeContext ();
return styles.addStyle (nm, parent);
}, "~S,jsjavax.swing.text.Style");
Clazz.overrideMethod (c$, "removeStyle", 
function (nm) {
var styles = this.getAttributeContext ();
styles.removeStyle (nm);
}, "~S");
Clazz.overrideMethod (c$, "getStyle", 
function (nm) {
var styles = this.getAttributeContext ();
return styles.getStyle (nm);
}, "~S");
Clazz.defineMethod (c$, "getStyleNames", 
function () {
return (this.getAttributeContext ()).getStyleNames ();
});
Clazz.overrideMethod (c$, "setLogicalStyle", 
function (pos, s) {
var paragraph = this.getParagraphElement (pos);
if ((paragraph != null) && (Clazz.instanceOf (paragraph, jsjavax.swing.text.AbstractDocument.AbstractElement))) {
try {
this.writeLock ();
var edit =  new jsjavax.swing.text.DefaultStyledDocument.StyleChangeUndoableEdit (paragraph, s);
(paragraph).setResolveParent (s);
var p0 = paragraph.getStartOffset ();
var p1 = paragraph.getEndOffset ();
var e = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, p0, p1 - p0, jsjavax.swing.event.DocumentEvent.EventType.CHANGE);
e.addEdit (edit);
e.end ();
this.fireChangedUpdate (e);
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, e));
} finally {
this.writeUnlock ();
}
}}, "~N,jsjavax.swing.text.Style");
Clazz.overrideMethod (c$, "getLogicalStyle", 
function (p) {
var s = null;
var paragraph = this.getParagraphElement (p);
if (paragraph != null) {
var a = paragraph.getAttributes ();
var parent = a.getResolveParent ();
if (Clazz.instanceOf (parent, jsjavax.swing.text.Style)) {
s = parent;
}}return s;
}, "~N");
Clazz.overrideMethod (c$, "setCharacterAttributes", 
function (offset, length, s, replace) {
if (length == 0) {
return;
}try {
this.writeLock ();
var changes = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, offset, length, jsjavax.swing.event.DocumentEvent.EventType.CHANGE);
this.buffer.change (offset, length, changes);
var sCopy = s.copyAttributes ();
var lastEnd = 2147483647;
for (var pos = offset; pos < (offset + length); pos = lastEnd) {
var run = this.getCharacterElement (pos);
lastEnd = run.getEndOffset ();
if (pos == lastEnd) {
break;
}var attr = run.getAttributes ();
changes.addEdit ( new jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit (run, sCopy, replace));
if (replace) {
attr.removeAttributes (attr);
}attr.addAttributes (s);
}
changes.end ();
this.fireChangedUpdate (changes);
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, changes));
} finally {
this.writeUnlock ();
}
}, "~N,~N,jsjavax.swing.text.AttributeSet,~B");
Clazz.overrideMethod (c$, "setParagraphAttributes", 
function (offset, length, s, replace) {
try {
this.writeLock ();
var changes = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, offset, length, jsjavax.swing.event.DocumentEvent.EventType.CHANGE);
var sCopy = s.copyAttributes ();
var section = this.getDefaultRootElement ();
var index0 = section.getElementIndex (offset);
var index1 = section.getElementIndex (offset + ((length > 0) ? length - 1 : 0));
var isI18N = Boolean.TRUE.equals (this.getProperty ("i18n"));
var hasRuns = false;
for (var i = index0; i <= index1; i++) {
var paragraph = section.getElement (i);
var attr = paragraph.getAttributes ();
changes.addEdit ( new jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit (paragraph, sCopy, replace));
if (replace) {
attr.removeAttributes (attr);
}attr.addAttributes (s);
if (isI18N && !hasRuns) {
hasRuns = (attr.getAttribute (jsjava.awt.font.TextAttribute.RUN_DIRECTION) != null);
}}
if (hasRuns) {
this.updateBidi (changes);
}changes.end ();
this.fireChangedUpdate (changes);
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, changes));
} finally {
this.writeUnlock ();
}
}, "~N,~N,jsjavax.swing.text.AttributeSet,~B");
Clazz.overrideMethod (c$, "getParagraphElement", 
function (pos) {
var e = null;
for (e = this.getDefaultRootElement (); !e.isLeaf (); ) {
var index = e.getElementIndex (pos);
e = e.getElement (index);
}
return e.getParentElement ();
}, "~N");
Clazz.overrideMethod (c$, "getCharacterElement", 
function (pos) {
var e = null;
for (e = this.getDefaultRootElement (); !e.isLeaf (); ) {
var index = e.getElementIndex (pos);
e = e.getElement (index);
}
return e;
}, "~N");
Clazz.defineMethod (c$, "insertUpdate", 
function (chng, attr) {
var offset = chng.getOffset ();
var length = chng.getLength ();
if (attr == null) {
attr = jsjavax.swing.text.SimpleAttributeSet.EMPTY;
}var paragraph = this.getParagraphElement (offset + length);
var pattr = paragraph.getAttributes ();
var pParagraph = this.getParagraphElement (offset);
var run = pParagraph.getElement (pParagraph.getElementIndex (offset));
var endOffset = offset + length;
var insertingAtBoundry = (run.getEndOffset () == endOffset);
var cattr = run.getAttributes ();
try {
var s =  new jsjavax.swing.text.Segment ();
var parseBuffer =  new java.util.Vector ();
var lastStartSpec = null;
var insertingAfterNewline = false;
var lastStartDirection = 6;
if (offset > 0) {
this.getText (offset - 1, 1, s);
if (s.array[s.offset] == '\n') {
insertingAfterNewline = true;
lastStartDirection = this.createSpecsForInsertAfterNewline (paragraph, pParagraph, pattr, parseBuffer, offset, endOffset);
for (var counter = parseBuffer.size () - 1; counter >= 0; counter--) {
var spec = parseBuffer.elementAt (counter);
if (spec.getType () == 1) {
lastStartSpec = spec;
break;
}}
}}if (!insertingAfterNewline) pattr = pParagraph.getAttributes ();
this.getText (offset, length, s);
var txt = s.array;
var n = s.offset + s.count;
var lastOffset = s.offset;
for (var i = s.offset; i < n; i++) {
if (txt[i] == '\n') {
var breakOffset = i + 1;
parseBuffer.addElement ( new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (attr, 3, breakOffset - lastOffset));
parseBuffer.addElement ( new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (null, 2));
lastStartSpec =  new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (pattr, 1);
parseBuffer.addElement (lastStartSpec);
lastOffset = breakOffset;
}}
if (lastOffset < n) {
parseBuffer.addElement ( new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (attr, 3, n - lastOffset));
}var first = parseBuffer.firstElement ();
var docLength = this.getLength ();
if (first.getType () == 3 && cattr.isEqual (attr)) {
first.setDirection (4);
}if (lastStartSpec != null) {
if (insertingAfterNewline) {
lastStartSpec.setDirection (lastStartDirection);
} else if (pParagraph.getEndOffset () != endOffset) {
lastStartSpec.setDirection (7);
} else {
var parent = pParagraph.getParentElement ();
var pParagraphIndex = parent.getElementIndex (offset);
if ((pParagraphIndex + 1) < parent.getElementCount () && !parent.getElement (pParagraphIndex + 1).isLeaf ()) {
lastStartSpec.setDirection (5);
}}}if (insertingAtBoundry && endOffset < docLength) {
var last = parseBuffer.lastElement ();
if (last.getType () == 3 && last.getDirection () != 4 && ((lastStartSpec == null && (paragraph === pParagraph || insertingAfterNewline)) || (lastStartSpec != null && lastStartSpec.getDirection () != 6))) {
var nextRun = paragraph.getElement (paragraph.getElementIndex (endOffset));
if (nextRun.isLeaf () && attr.isEqual (nextRun.getAttributes ())) {
last.setDirection (5);
}}} else if (!insertingAtBoundry && lastStartSpec != null && lastStartSpec.getDirection () == 7) {
var last = parseBuffer.lastElement ();
if (last.getType () == 3 && last.getDirection () != 4 && attr.isEqual (cattr)) {
last.setDirection (5);
}}if (jsjavax.swing.text.Utilities.isComposedTextAttributeDefined (attr)) {
(attr).addAttributes (cattr);
(attr).addAttribute ("$ename", "content");
}var spec =  new Array (parseBuffer.size ());
parseBuffer.copyInto (spec);
this.buffer.insert (offset, length, spec, chng);
} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
} else {
throw bl;
}
}
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "insertUpdate", [chng, attr]);
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "createSpecsForInsertAfterNewline", 
function (paragraph, pParagraph, pattr, parseBuffer, offset, endOffset) {
if (paragraph.getParentElement () === pParagraph.getParentElement ()) {
var spec =  new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (pattr, 2);
parseBuffer.addElement (spec);
spec =  new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (pattr, 1);
parseBuffer.addElement (spec);
if (pParagraph.getEndOffset () != endOffset) return 7;
var parent = pParagraph.getParentElement ();
if ((parent.getElementIndex (offset) + 1) < parent.getElementCount ()) return 5;
} else {
var leftParents =  new java.util.Vector ();
var rightParents =  new java.util.Vector ();
var e = pParagraph;
while (e != null) {
leftParents.addElement (e);
e = e.getParentElement ();
}
e = paragraph;
var leftIndex = -1;
while (e != null && (leftIndex = leftParents.indexOf (e)) == -1) {
rightParents.addElement (e);
e = e.getParentElement ();
}
if (e != null) {
for (var counter = 0; counter < leftIndex; counter++) {
parseBuffer.addElement ( new jsjavax.swing.text.DefaultStyledDocument.ElementSpec (null, 2));
}
var spec = null;
for (var counter = rightParents.size () - 1; counter >= 0; counter--) {
spec =  new jsjavax.swing.text.DefaultStyledDocument.ElementSpec ((rightParents.elementAt (counter)).getAttributes (), 1);
if (counter > 0) spec.setDirection (5);
parseBuffer.addElement (spec);
}
if (rightParents.size () > 0) return 5;
return 7;
}}return 6;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet,java.util.Vector,~N,~N");
Clazz.defineMethod (c$, "removeUpdate", 
function (chng) {
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "removeUpdate", [chng]);
this.buffer.remove (chng.getOffset (), chng.getLength (), chng);
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "createDefaultRoot", 
function () {
this.writeLock ();
var section = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultStyledDocument.SectionElement, this, null);
var paragraph = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BranchElement, this, null, section, null);
var brk = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.LeafElement, this, null, paragraph, null, 0, 1);
var buff =  new Array (1);
buff[0] = brk;
paragraph.replace (0, 0, buff);
buff[0] = paragraph;
section.replace (0, 0, buff);
this.writeUnlock ();
return section;
});
Clazz.overrideMethod (c$, "getForeground", 
function (attr) {
var styles = this.getAttributeContext ();
return styles.getForeground (attr);
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getBackground", 
function (attr) {
var styles = this.getAttributeContext ();
return styles.getBackground (attr);
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getFont", 
function (attr) {
var styles = this.getAttributeContext ();
return styles.getFont (attr);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "styleChanged", 
function (style) {
if (this.getLength () != 0) {
if (this.updateRunnable == null) {
this.updateRunnable = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultStyledDocument.ChangeUpdateRunnable, this, null);
}{
if (!this.updateRunnable.isPending) {
jsjavax.swing.SwingUtilities.invokeLater (this.updateRunnable);
this.updateRunnable.isPending = true;
}}}}, "jsjavax.swing.text.Style");
Clazz.overrideMethod (c$, "addDocumentListener", 
function (listener) {
{
var oldDLCount = this.listenerList.getListenerCount (jsjavax.swing.event.DocumentListener);
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "addDocumentListener", [listener]);
if (oldDLCount == 0) {
if (this.styleContextChangeListener == null) {
this.styleContextChangeListener = this.createStyleContextChangeListener ();
}if (this.styleContextChangeListener != null) {
var styles = this.getAttributeContext ();
var staleListeners = jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.getStaleListeners (this.styleContextChangeListener);
for (var l, $l = staleListeners.iterator (); $l.hasNext () && ((l = $l.next ()) || true);) {
styles.removeChangeListener (l);
}
styles.addChangeListener (this.styleContextChangeListener);
}this.updateStylesListeningTo ();
}}}, "jsjavax.swing.event.DocumentListener");
Clazz.overrideMethod (c$, "removeDocumentListener", 
function (listener) {
{
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument, "removeDocumentListener", [listener]);
if (this.listenerList.getListenerCount (jsjavax.swing.event.DocumentListener) == 0) {
for (var counter = this.listeningStyles.size () - 1; counter >= 0; counter--) {
(this.listeningStyles.elementAt (counter)).removeChangeListener (this.styleChangeListener);
}
this.listeningStyles.removeAllElements ();
if (this.styleContextChangeListener != null) {
var styles = this.getAttributeContext ();
styles.removeChangeListener (this.styleContextChangeListener);
}}}}, "jsjavax.swing.event.DocumentListener");
Clazz.defineMethod (c$, "createStyleChangeListener", 
function () {
return  new jsjavax.swing.text.DefaultStyledDocument.StyleChangeHandler (this);
});
Clazz.defineMethod (c$, "createStyleContextChangeListener", 
function () {
return  new jsjavax.swing.text.DefaultStyledDocument.StyleContextChangeHandler (this);
});
Clazz.defineMethod (c$, "updateStylesListeningTo", 
function () {
{
var styles = this.getAttributeContext ();
if (this.styleChangeListener == null) {
this.styleChangeListener = this.createStyleChangeListener ();
}if (this.styleChangeListener != null && styles != null) {
var styleNames = styles.getStyleNames ();
var v = this.listeningStyles.clone ();
this.listeningStyles.removeAllElements ();
var staleListeners = jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.getStaleListeners (this.styleChangeListener);
while (styleNames.hasMoreElements ()) {
var name = styleNames.nextElement ();
var aStyle = styles.getStyle (name);
var index = v.indexOf (aStyle);
this.listeningStyles.addElement (aStyle);
if (index == -1) {
for (var l, $l = staleListeners.iterator (); $l.hasNext () && ((l = $l.next ()) || true);) {
aStyle.removeChangeListener (l);
}
aStyle.addChangeListener (this.styleChangeListener);
} else {
v.removeElementAt (index);
}}
for (var counter = v.size () - 1; counter >= 0; counter--) {
var aStyle = v.elementAt (counter);
aStyle.removeChangeListener (this.styleChangeListener);
}
if (this.listeningStyles.size () == 0) {
this.styleChangeListener = null;
}}}});
c$.$DefaultStyledDocument$SectionElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "SectionElement", jsjavax.swing.text.AbstractDocument.BranchElement, null, Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BranchElement, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultStyledDocument.SectionElement, [null, null]);
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "section";
});
c$ = Clazz.p0p ();
};
c$.$DefaultStyledDocument$ElementBuffer$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.root = null;
this.pos = 0;
this.offset = 0;
this.length = 0;
this.endOffset = 0;
this.changes = null;
this.path = null;
this.insertOp = false;
this.recreateLeafs = false;
this.insertPath = null;
this.createdFracture = false;
this.fracturedParent = null;
this.fracturedChild = null;
this.offsetLastIndex = false;
this.offsetLastIndexOnReplace = false;
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultStyledDocument.ElementBuffer.ElemChanges")) {
jsjavax.swing.text.DefaultStyledDocument.ElementBuffer.$DefaultStyledDocument$ElementBuffer$ElemChanges$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "ElementBuffer");
Clazz.makeConstructor (c$, 
function (a) {
this.root = a;
this.changes =  new java.util.Vector ();
this.path =  new java.util.Stack ();
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "getRootElement", 
function () {
return this.root;
});
Clazz.defineMethod (c$, "insert", 
function (a, b, c, d) {
if (b == 0) {
return;
}this.insertOp = true;
this.beginEdits (a, b);
this.insertUpdate (c);
this.endEdits (d);
this.insertOp = false;
}, "~N,~N,~A,jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "create", 
function (a, b, c) {
this.insertOp = true;
this.beginEdits (this.offset, a);
var d = this.root;
var e = d.getElementIndex (0);
while (!d.isLeaf ()) {
var f = d.getElement (e);
this.push (d, e);
d = f;
e = d.getElementIndex (0);
}
var f = this.path.peek ();
var g = f.parent.getElement (f.index);
f.added.addElement (this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), this.b$["jsjavax.swing.text.DefaultStyledDocument"].getLength (), g.getEndOffset ()));
f.removed.addElement (g);
while (this.path.size () > 1) {
this.pop ();
}
var h = b.length;
var i = null;
if (h > 0 && b[0].getType () == 1) {
i = b[0].getAttributes ();
}if (i == null) {
i = jsjavax.swing.text.SimpleAttributeSet.EMPTY;
}var j = this.root.getAttributes ();
c.addEdit ( new jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit (this.root, i, true));
j.removeAttributes (j);
j.addAttributes (i);
for (var k = 1; k < h; k++) {
this.insertElement (b[k]);
}
while (this.path.size () != 0) {
this.pop ();
}
this.endEdits (c);
this.insertOp = false;
}, "~N,~A,jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "remove", 
function (a, b, c) {
this.beginEdits (a, b);
this.removeUpdate ();
this.endEdits (c);
}, "~N,~N,jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "change", 
function (a, b, c) {
this.beginEdits (a, b);
this.changeUpdate ();
this.endEdits (c);
}, "~N,~N,jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "insertUpdate", 
function (a) {
var b = this.root;
var c = b.getElementIndex (this.offset);
while (!b.isLeaf ()) {
var d = b.getElement (c);
this.push (b, (d.isLeaf () ? c : c + 1));
b = d;
c = b.getElementIndex (this.offset);
}
this.insertPath =  new Array (this.path.size ());
this.path.copyInto (this.insertPath);
this.createdFracture = false;
var d;
this.recreateLeafs = false;
if (a[0].getType () == 3) {
this.insertFirstContent (a);
this.pos += a[0].getLength ();
d = 1;
} else {
this.fractureDeepestLeaf (a);
d = 0;
}var e = a.length;
for (; d < e; d++) {
this.insertElement (a[d]);
}
if (!this.createdFracture) this.fracture (-1);
while (this.path.size () != 0) {
this.pop ();
}
if (this.offsetLastIndex && this.offsetLastIndexOnReplace) {
this.insertPath[this.insertPath.length - 1].index++;
}for (var f = this.insertPath.length - 1; f >= 0; f--) {
var g = this.insertPath[f];
if (g.parent === this.fracturedParent) g.added.addElement (this.fracturedChild);
if ((g.added.size () > 0 || g.removed.size () > 0) && !this.changes.contains (g)) {
this.changes.addElement (g);
}}
if (this.offset == 0 && this.fracturedParent != null && a[0].getType () == 2) {
var g = 0;
while (g < a.length && a[g].getType () == 2) {
g++;
}
var h = this.insertPath[this.insertPath.length - g - 1];
h.removed.insertElementAt (h.parent.getElement (--h.index), 0);
}}, "~A");
Clazz.defineMethod (c$, "removeUpdate", 
function () {
this.removeElements (this.root, this.offset, this.offset + this.length);
});
Clazz.defineMethod (c$, "changeUpdate", 
function () {
var a = this.split (this.offset, this.length);
if (!a) {
while (this.path.size () != 0) {
this.pop ();
}
this.split (this.offset + this.length, 0);
}while (this.path.size () != 0) {
this.pop ();
}
});
Clazz.defineMethod (c$, "split", 
function (a, b) {
var c = false;
var d = this.root;
var e = d.getElementIndex (a);
while (!d.isLeaf ()) {
this.push (d, e);
d = d.getElement (e);
e = d.getElementIndex (a);
}
var f = this.path.peek ();
var g = f.parent.getElement (f.index);
if (g.getStartOffset () < a && a < g.getEndOffset ()) {
var h = f.index;
var i = h;
if (((a + b) < f.parent.getEndOffset ()) && (b != 0)) {
i = f.parent.getElementIndex (a + b);
if (i == h) {
f.removed.addElement (g);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), g.getStartOffset (), a);
f.added.addElement (d);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), a, a + b);
f.added.addElement (d);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), a + b, g.getEndOffset ());
f.added.addElement (d);
return true;
} else {
g = f.parent.getElement (i);
if ((a + b) == g.getStartOffset ()) {
i = h;
}}c = true;
}this.pos = a;
g = f.parent.getElement (h);
f.removed.addElement (g);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), g.getStartOffset (), this.pos);
f.added.addElement (d);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), this.pos, g.getEndOffset ());
f.added.addElement (d);
for (var j = h + 1; j < i; j++) {
g = f.parent.getElement (j);
f.removed.addElement (g);
f.added.addElement (g);
}
if (i != h) {
g = f.parent.getElement (i);
this.pos = a + b;
f.removed.addElement (g);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), g.getStartOffset (), this.pos);
f.added.addElement (d);
d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (f.parent, g.getAttributes (), this.pos, g.getEndOffset ());
f.added.addElement (d);
}}return c;
}, "~N,~N");
Clazz.defineMethod (c$, "endEdits", 
function (a) {
var b = this.changes.size ();
for (var c = 0; c < b; c++) {
var d = this.changes.elementAt (c);
var e =  new Array (d.removed.size ());
d.removed.copyInto (e);
var f =  new Array (d.added.size ());
d.added.copyInto (f);
var g = d.index;
(d.parent).replace (g, e.length, f);
var h =  new jsjavax.swing.text.AbstractDocument.ElementEdit (d.parent, g, e, f);
a.addEdit (h);
}
this.changes.removeAllElements ();
this.path.removeAllElements ();
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "beginEdits", 
function (a, b) {
this.offset = a;
this.length = b;
this.endOffset = a + b;
this.pos = a;
if (this.changes == null) {
this.changes =  new java.util.Vector ();
} else {
this.changes.removeAllElements ();
}if (this.path == null) {
this.path =  new java.util.Stack ();
} else {
this.path.removeAllElements ();
}this.fracturedParent = null;
this.fracturedChild = null;
this.offsetLastIndex = this.offsetLastIndexOnReplace = false;
}, "~N,~N");
Clazz.defineMethod (c$, "push", 
function (a, b, c) {
var d = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultStyledDocument.ElementBuffer.ElemChanges, this, null, a, b, c);
this.path.push (d);
}, "jsjavax.swing.text.Element,~N,~B");
Clazz.defineMethod (c$, "push", 
function (a, b) {
this.push (a, b, false);
}, "jsjavax.swing.text.Element,~N");
Clazz.defineMethod (c$, "pop", 
function () {
var a = this.path.peek ();
this.path.pop ();
if ((a.added.size () > 0) || (a.removed.size () > 0)) {
this.changes.addElement (a);
} else if (!this.path.isEmpty ()) {
var b = a.parent;
if (b.getElementCount () == 0) {
a = this.path.peek ();
a.added.removeElement (b);
}}});
Clazz.defineMethod (c$, "advance", 
function (a) {
this.pos += a;
}, "~N");
Clazz.defineMethod (c$, "insertElement", 
function (a) {
var b = this.path.peek ();
switch (a.getType ()) {
case 1:
switch (a.getDirection ()) {
case 5:
var c = b.parent.getElement (b.index);
if (c.isLeaf ()) {
if ((b.index + 1) < b.parent.getElementCount ()) c = b.parent.getElement (b.index + 1);
 else throw  new jsjavax.swing.text.StateInvariantError ("Join next to leaf");
}this.push (c, 0, true);
break;
case 7:
if (!this.createdFracture) {
this.fracture (this.path.size () - 1);
}if (!b.isFracture) {
this.push (this.fracturedChild, 0, true);
} else this.push (b.parent.getElement (0), 0, true);
break;
default:
var d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (b.parent, a.getAttributes ());
b.added.addElement (d);
this.push (d, 0);
break;
}
break;
case 2:
this.pop ();
break;
case 3:
var e = a.getLength ();
if (a.getDirection () != 5) {
var f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (b.parent, a.getAttributes (), this.pos, this.pos + e);
b.added.addElement (f);
} else {
if (!b.isFracture) {
var f = null;
if (this.insertPath != null) {
for (var g = this.insertPath.length - 1; g >= 0; g--) {
if (this.insertPath[g] === b) {
if (g != (this.insertPath.length - 1)) f = b.parent.getElement (b.index);
break;
}}
}if (f == null) f = b.parent.getElement (b.index + 1);
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (b.parent, f.getAttributes (), this.pos, f.getEndOffset ());
b.added.addElement (g);
b.removed.addElement (f);
} else {
var f = b.parent.getElement (0);
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (b.parent, f.getAttributes (), this.pos, f.getEndOffset ());
b.added.addElement (g);
b.removed.addElement (f);
}}this.pos += e;
break;
}
}, "jsjavax.swing.text.DefaultStyledDocument.ElementSpec");
Clazz.defineMethod (c$, "removeElements", 
function (a, b, c) {
if (!a.isLeaf ()) {
var d = a.getElementIndex (b);
var e = a.getElementIndex (c);
this.push (a, d);
var f = this.path.peek ();
if (d == e) {
var g = a.getElement (d);
if (b <= g.getStartOffset () && c >= g.getEndOffset ()) {
f.removed.addElement (g);
} else if (this.removeElements (g, b, c)) {
f.removed.addElement (g);
}} else {
var g = a.getElement (d);
var h = a.getElement (e);
var i = (c < a.getEndOffset ());
if (i && this.canJoin (g, h)) {
for (var j = d; j <= e; j++) {
f.removed.addElement (a.getElement (j));
}
var k = this.join (a, g, h, b, c);
f.added.addElement (k);
} else {
var j = d + 1;
var k = e - 1;
if (g.getStartOffset () == b || (d == 0 && g.getStartOffset () > b && g.getEndOffset () <= c)) {
g = null;
j = d;
}if (!i) {
h = null;
k++;
} else if (h.getStartOffset () == c) {
h = null;
}if (j <= k) {
f.index = j;
}for (var l = j; l <= k; l++) {
f.removed.addElement (a.getElement (l));
}
if (g != null) {
if (this.removeElements (g, b, c)) {
f.removed.insertElementAt (g, 0);
f.index = d;
}}if (h != null) {
if (this.removeElements (h, b, c)) {
f.removed.addElement (h);
}}}}this.pop ();
if (a.getElementCount () == (f.removed.size () - f.added.size ())) {
return true;
}}return false;
}, "jsjavax.swing.text.Element,~N,~N");
Clazz.defineMethod (c$, "canJoin", 
function (a, b) {
if ((a == null) || (b == null)) {
return false;
}var c = a.isLeaf ();
var d = b.isLeaf ();
if (c != d) {
return false;
}if (c) {
return a.getAttributes ().isEqual (b.getAttributes ());
}var e = a.getName ();
var f = b.getName ();
if (e != null) {
return e.equals (f);
}if (f != null) {
return f.equals (e);
}return true;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "join", 
function (a, b, c, d, e) {
if (b.isLeaf () && c.isLeaf ()) {
return this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (a, b.getAttributes (), b.getStartOffset (), c.getEndOffset ());
} else if ((!b.isLeaf ()) && (!c.isLeaf ())) {
var f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (a, b.getAttributes ());
var g = b.getElementIndex (d);
var h = c.getElementIndex (e);
var i = b.getElement (g);
if (i.getStartOffset () >= d) {
i = null;
}var j = c.getElement (h);
if (j.getStartOffset () == e) {
j = null;
}var k =  new java.util.Vector ();
for (var l = 0; l < g; l++) {
k.addElement (this.clone (f, b.getElement (l)));
}
if (this.canJoin (i, j)) {
var m = this.join (f, i, j, d, e);
k.addElement (m);
} else {
if (i != null) {
k.addElement (this.cloneAsNecessary (f, i, d, e));
}if (j != null) {
k.addElement (this.cloneAsNecessary (f, j, d, e));
}}var m = c.getElementCount ();
for (var n = (j == null) ? h : h + 1; n < m; n++) {
k.addElement (this.clone (f, c.getElement (n)));
}
var o =  new Array (k.size ());
k.copyInto (o);
(f).replace (0, 0, o);
return f;
} else {
throw  new jsjavax.swing.text.StateInvariantError ("No support to join leaf element with non-leaf element");
}}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element,jsjavax.swing.text.Element,~N,~N");
Clazz.defineMethod (c$, "clone", 
function (a, b) {
if (b.isLeaf ()) {
return this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (a, b.getAttributes (), b.getStartOffset (), b.getEndOffset ());
}var c = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (a, b.getAttributes ());
var d = b.getElementCount ();
var e =  new Array (d);
for (var f = 0; f < d; f++) {
e[f] = this.clone (c, b.getElement (f));
}
(c).replace (0, 0, e);
return c;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "cloneAsNecessary", 
function (a, b, c, d) {
if (b.isLeaf ()) {
return this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (a, b.getAttributes (), b.getStartOffset (), b.getEndOffset ());
}var e = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (a, b.getAttributes ());
var f = b.getElementCount ();
var g =  new java.util.ArrayList (f);
for (var h = 0; h < f; h++) {
var i = b.getElement (h);
if (i.getStartOffset () < c || i.getEndOffset () > d) {
g.add (this.cloneAsNecessary (e, i, c, d));
}}
var i =  new Array (g.size ());
i = g.toArray (i);
(e).replace (0, 0, i);
return e;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element,~N,~N");
Clazz.defineMethod (c$, "fracture", 
function (a) {
var b = this.insertPath.length;
var c = -1;
var d = this.recreateLeafs;
var e = this.insertPath[b - 1];
var f = ((e.index + 1) < e.parent.getElementCount ());
var g = (d) ? b : -1;
var h = b - 1;
this.createdFracture = true;
for (var i = b - 2; i >= 0; i--) {
var j = this.insertPath[i];
if (j.added.size () > 0 || i == a) {
c = i;
if (!d && f) {
d = true;
if (g == -1) g = h + 1;
}}if (!f && j.index < j.parent.getElementCount ()) {
f = true;
h = i;
}}
if (d) {
if (c == -1) c = b - 1;
this.fractureFrom (this.insertPath, c, g);
}}, "~N");
Clazz.defineMethod (c$, "fractureFrom", 
function (a, b, c) {
var d = a[b];
var e;
var f;
var g = a.length;
if ((b + 1) == g) e = d.parent.getElement (d.index);
 else e = d.parent.getElement (d.index - 1);
if (e.isLeaf ()) {
f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (d.parent, e.getAttributes (), Math.max (this.endOffset, e.getStartOffset ()), e.getEndOffset ());
} else {
f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (d.parent, e.getAttributes ());
}this.fracturedParent = d.parent;
this.fracturedChild = f;
var h = f;
while (++b < c) {
var i = ((b + 1) == c);
var j = ((b + 1) == g);
d = a[b];
if (i) {
if (this.offsetLastIndex || !j) e = null;
 else e = d.parent.getElement (d.index);
} else {
e = d.parent.getElement (d.index - 1);
}if (e != null) {
if (e.isLeaf ()) {
f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (h, e.getAttributes (), Math.max (this.endOffset, e.getStartOffset ()), e.getEndOffset ());
} else {
f = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (h, e.getAttributes ());
}} else f = null;
var k = d.parent.getElementCount () - d.index;
var l;
var m;
var n = 1;
if (f == null) {
if (j) {
k--;
m = d.index + 1;
} else {
m = d.index;
}n = 0;
l =  new Array (k);
} else {
if (!i) {
k++;
m = d.index;
} else {
m = d.index + 1;
}l =  new Array (k);
l[0] = f;
}for (var o = n; o < k; o++) {
var p = d.parent.getElement (m++);
l[o] = this.recreateFracturedElement (h, p);
d.removed.addElement (p);
}
(h).replace (0, 0, l);
h = f;
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "recreateFracturedElement", 
function (a, b) {
if (b.isLeaf ()) {
return this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (a, b.getAttributes (), Math.max (b.getStartOffset (), this.endOffset), b.getEndOffset ());
}var c = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createBranchElement (a, b.getAttributes ());
var d = b.getElementCount ();
var e =  new Array (d);
for (var f = 0; f < d; f++) {
e[f] = this.recreateFracturedElement (c, b.getElement (f));
}
(c).replace (0, 0, e);
return c;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "fractureDeepestLeaf", 
function (a) {
var b = this.path.peek ();
var c = b.parent.getElement (b.index);
if (this.offset != 0) {
var d = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (b.parent, c.getAttributes (), c.getStartOffset (), this.offset);
b.added.addElement (d);
}b.removed.addElement (c);
if (c.getEndOffset () != this.endOffset) this.recreateLeafs = true;
 else this.offsetLastIndex = true;
}, "~A");
Clazz.defineMethod (c$, "insertFirstContent", 
function (a) {
var b = a[0];
var c = this.path.peek ();
var d = c.parent.getElement (c.index);
var e = this.offset + b.getLength ();
var f = (a.length == 1);
switch (b.getDirection ()) {
case 4:
if (d.getEndOffset () != e && !f) {
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, d.getAttributes (), d.getStartOffset (), e);
c.added.addElement (g);
c.removed.addElement (d);
if (d.getEndOffset () != this.endOffset) this.recreateLeafs = true;
 else this.offsetLastIndex = true;
} else {
this.offsetLastIndex = true;
this.offsetLastIndexOnReplace = true;
}break;
case 5:
if (this.offset != 0) {
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, d.getAttributes (), d.getStartOffset (), this.offset);
c.added.addElement (g);
var h = c.parent.getElement (c.index + 1);
if (f) g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, h.getAttributes (), this.offset, h.getEndOffset ());
 else g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, h.getAttributes (), this.offset, e);
c.added.addElement (g);
c.removed.addElement (d);
c.removed.addElement (h);
}break;
default:
if (d.getStartOffset () != this.offset) {
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, d.getAttributes (), d.getStartOffset (), this.offset);
c.added.addElement (g);
}c.removed.addElement (d);
var g = this.b$["jsjavax.swing.text.DefaultStyledDocument"].createLeafElement (c.parent, b.getAttributes (), this.offset, e);
c.added.addElement (g);
if (d.getEndOffset () != this.endOffset) {
this.recreateLeafs = true;
} else {
this.offsetLastIndex = true;
}break;
}
}, "~A");
c$.$DefaultStyledDocument$ElementBuffer$ElemChanges$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.parent = null;
this.index = 0;
this.added = null;
this.removed = null;
this.isFracture = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument.ElementBuffer, "ElemChanges");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.parent = a;
this.index = b;
this.isFracture = c;
this.added =  new java.util.Vector ();
this.removed =  new java.util.Vector ();
}, "jsjavax.swing.text.Element,~N,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return "added: " + this.added + "\nremoved: " + this.removed + "\n";
});
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$.$DefaultStyledDocument$ChangeUpdateRunnable$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.isPending = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "ChangeUpdateRunnable", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
{
this.isPending = false;
}try {
this.b$["jsjavax.swing.text.DefaultStyledDocument"].writeLock ();
var a = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, 0, this.b$["jsjavax.swing.text.DefaultStyledDocument"].getLength (), jsjavax.swing.event.DocumentEvent.EventType.CHANGE);
a.end ();
this.b$["jsjavax.swing.text.DefaultStyledDocument"].fireChangedUpdate (a);
} finally {
this.b$["jsjavax.swing.text.DefaultStyledDocument"].writeUnlock ();
}
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.attr = null;
this.len = 0;
this.type = 0;
this.direction = 0;
this.offs = 0;
this.data = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "ElementSpec");
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a, b, null, 0, 0);
}, "jsjavax.swing.text.AttributeSet,~N");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.construct (a, b, null, 0, c);
}, "jsjavax.swing.text.AttributeSet,~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.attr = a;
this.type = b;
this.data = c;
this.offs = d;
this.len = e;
this.direction = 6;
}, "jsjavax.swing.text.AttributeSet,~N,~A,~N,~N");
Clazz.defineMethod (c$, "setType", 
function (a) {
this.type = a;
}, "~N");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "setDirection", 
function (a) {
this.direction = a;
}, "~N");
Clazz.defineMethod (c$, "getDirection", 
function () {
return this.direction;
});
Clazz.defineMethod (c$, "getAttributes", 
function () {
return this.attr;
});
Clazz.defineMethod (c$, "getArray", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "getOffset", 
function () {
return this.offs;
});
Clazz.defineMethod (c$, "getLength", 
function () {
return this.len;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var a = "??";
var b = "??";
switch (this.type) {
case 1:
a = "StartTag";
break;
case 3:
a = "Content";
break;
case 2:
a = "EndTag";
break;
}
switch (this.direction) {
case 4:
b = "JoinPrevious";
break;
case 5:
b = "JoinNext";
break;
case 6:
b = "Originate";
break;
case 7:
b = "Fracture";
break;
}
return a + ":" + b + ":" + this.getLength ();
});
Clazz.defineStatics (c$,
"StartTagType", 1,
"EndTagType", 2,
"ContentType", 3,
"JoinPreviousDirection", 4,
"JoinNextDirection", 5,
"OriginateDirection", 6,
"JoinFractureDirection", 7);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.newAttributes = null;
this.copy = null;
this.isReplacing = false;
this.element = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "AttributeUndoableEdit", jsjavax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit);
this.element = a;
this.newAttributes = b;
this.isReplacing = c;
this.copy = a.getAttributes ().copyAttributes ();
}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet,~B");
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit, "redo", []);
var a = this.element.getAttributes ();
if (this.isReplacing) a.removeAttributes (a);
a.addAttributes (this.newAttributes);
});
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument.AttributeUndoableEdit, "undo", []);
var a = this.element.getAttributes ();
a.removeAttributes (a);
a.addAttributes (this.copy);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.element = null;
this.newStyle = null;
this.oldStyle = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "StyleChangeUndoableEdit", jsjavax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultStyledDocument.StyleChangeUndoableEdit);
this.element = a;
this.newStyle = b;
this.oldStyle = a.getResolveParent ();
}, "jsjavax.swing.text.AbstractDocument.AbstractElement,jsjavax.swing.text.Style");
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument.StyleChangeUndoableEdit, "redo", []);
this.element.setResolveParent (this.newStyle);
});
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.DefaultStyledDocument.StyleChangeUndoableEdit, "undo", []);
this.element.setResolveParent (this.oldStyle);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.DocReference")) {
jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.$DefaultStyledDocument$AbstractChangeHandler$DocReference$ ();
}
this.doc = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument, "AbstractChangeHandler", null, jsjavax.swing.event.ChangeListener);
Clazz.makeConstructor (c$, 
function (a) {
var b = this.getClass ();
var c;
{
c = jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.queueMap.get (b);
if (c == null) {
c =  new java.lang.ref.ReferenceQueue ();
jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.queueMap.put (b, c);
}}this.doc = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.DocReference, this, null, a, c);
}, "jsjavax.swing.text.DefaultStyledDocument");
c$.getStaleListeners = Clazz.defineMethod (c$, "getStaleListeners", 
function (a) {
var b =  new java.util.ArrayList ();
var c = jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler.queueMap.get (a.getClass ());
if (c != null) {
var d;
{
while ((d = c.poll ()) != null) {
b.add (d.getListener ());
}
}}return b;
}, "jsjavax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
var b = this.doc.get ();
if (b != null) {
this.fireStateChanged (b, a);
}}, "jsjavax.swing.event.ChangeEvent");
c$.$DefaultStyledDocument$AbstractChangeHandler$DocReference$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler, "DocReference", java.lang.ref.WeakReference);
Clazz.defineMethod (c$, "getListener", 
function () {
return this.b$["jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler"];
});
c$ = Clazz.p0p ();
};
c$.queueMap = c$.prototype.queueMap =  new java.util.HashMap ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultStyledDocument, "StyleChangeHandler", jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler);
Clazz.overrideMethod (c$, "fireStateChanged", 
function (a, b) {
var c = b.getSource ();
if (Clazz.instanceOf (c, jsjavax.swing.text.Style)) {
a.styleChanged (c);
} else {
a.styleChanged (null);
}}, "jsjavax.swing.text.DefaultStyledDocument,jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DefaultStyledDocument, "StyleContextChangeHandler", jsjavax.swing.text.DefaultStyledDocument.AbstractChangeHandler);
Clazz.overrideMethod (c$, "fireStateChanged", 
function (a, b) {
a.updateStylesListeningTo ();
}, "jsjavax.swing.text.DefaultStyledDocument,jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"BUFFER_SIZE_DEFAULT", 4096);
});
