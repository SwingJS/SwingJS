Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.event.DocumentEvent", "jsjavax.swing.text.Document", "$.DocumentFilter", "$.Element", "$.MutableAttributeSet", "jsjavax.swing.tree.TreeNode", "jsjavax.swing.undo.AbstractUndoableEdit", "$.CompoundEdit", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.text.AbstractDocument", ["java.lang.Boolean", "$.Error", "$.IllegalStateException", "$.Thread", "java.util.Hashtable", "$.Vector", "jsjava.awt.font.TextAttribute", "jsjava.security.AccessController", "$.PrivilegedAction", "jsjavax.swing.UIManager", "jsjavax.swing.event.DocumentEvent.ElementChange", "jsjavax.swing.event.DocumentListener", "$.UndoableEditEvent", "$.UndoableEditListener", "jsjavax.swing.text.BadLocationException", "$.SegmentCache", "$.SimpleAttributeSet", "$.StateInvariantError", "$.StyleConstants", "$.StyleContext", "$.Utilities", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.decorateAsClass (function () {
this.numReaders = 0;
this.currWriter = null;
this.numWriters = 0;
this.notifyingListeners = false;
this.documentProperties = null;
this.listenerList = null;
this.data = null;
this.context = null;
this.bidiRoot = null;
this.documentFilter = null;
this.filterBypass = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.AbstractElement")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$AbstractElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.BranchElement")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$BranchElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.LeafElement")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$LeafElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.BidiRootElement")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$BidiRootElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.BidiElement")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$BidiElement$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$DefaultDocumentEvent$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.UndoRedoDocumentEvent")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$UndoRedoDocumentEvent$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument.DefaultFilterBypass")) {
jsjavax.swing.text.AbstractDocument.$AbstractDocument$DefaultFilterBypass$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "AbstractDocument", null, jsjavax.swing.text.Document);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function (data) {
this.construct (data, jsjavax.swing.text.StyleContext.getDefaultStyleContext ());
}, "jsjavax.swing.text.AbstractDocument.Content");
Clazz.makeConstructor (c$, 
function (data, context) {
this.data = data;
this.context = context;
this.bidiRoot = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiRootElement, this, null);
if (jsjavax.swing.text.AbstractDocument.defaultI18NProperty == null) {
var o = jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jsjavax.swing.text.AbstractDocument$1") ? 0 : jsjavax.swing.text.AbstractDocument.$AbstractDocument$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument$1, this, null)));
if (o != null) {
jsjavax.swing.text.AbstractDocument.defaultI18NProperty = Boolean.$valueOf (o);
} else {
jsjavax.swing.text.AbstractDocument.defaultI18NProperty = Boolean.FALSE;
}}this.putProperty ("i18n", jsjavax.swing.text.AbstractDocument.defaultI18NProperty);
this.writeLock ();
try {
var p =  new Array (1);
p[0] = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, 0, 1, 0);
this.bidiRoot.replace (0, 0, p);
} finally {
this.writeUnlock ();
}
}, "jsjavax.swing.text.AbstractDocument.Content,jsjavax.swing.text.AbstractDocument.AttributeContext");
Clazz.defineMethod (c$, "getDocumentProperties", 
function () {
if (this.documentProperties == null) {
this.documentProperties =  new java.util.Hashtable (2);
}return this.documentProperties;
});
Clazz.defineMethod (c$, "setDocumentProperties", 
function (x) {
this.documentProperties = x;
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "fireInsertUpdate", 
function (e) {
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.DocumentListener) {
(listeners[i + 1]).insertUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "jsjavax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "fireChangedUpdate", 
function (e) {
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.DocumentListener) {
(listeners[i + 1]).changedUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "jsjavax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "fireRemoveUpdate", 
function (e) {
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.DocumentListener) {
(listeners[i + 1]).removeUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "jsjavax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "fireUndoableEditUpdate", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.UndoableEditListener) {
(listeners[i + 1]).undoableEditHappened (e);
}}
}, "jsjavax.swing.event.UndoableEditEvent");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.defineMethod (c$, "getAsynchronousLoadPriority", 
function () {
var loadPriority = this.getProperty ("load priority");
if (loadPriority != null) {
return loadPriority.intValue ();
}return -1;
});
Clazz.defineMethod (c$, "setAsynchronousLoadPriority", 
function (p) {
var loadPriority = (p >= 0) ?  new Integer (p) : null;
this.putProperty ("load priority", loadPriority);
}, "~N");
Clazz.defineMethod (c$, "setDocumentFilter", 
function (filter) {
this.documentFilter = filter;
}, "jsjavax.swing.text.DocumentFilter");
Clazz.defineMethod (c$, "getDocumentFilter", 
function () {
return this.documentFilter;
});
Clazz.overrideMethod (c$, "render", 
function (r) {
this.readLock ();
try {
r.run ();
} finally {
this.readUnlock ();
}
}, "Runnable");
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.data.length () - 1;
});
Clazz.overrideMethod (c$, "addDocumentListener", 
function (listener) {
this.listenerList.add (jsjavax.swing.event.DocumentListener, listener);
}, "jsjavax.swing.event.DocumentListener");
Clazz.overrideMethod (c$, "removeDocumentListener", 
function (listener) {
this.listenerList.remove (jsjavax.swing.event.DocumentListener, listener);
}, "jsjavax.swing.event.DocumentListener");
Clazz.defineMethod (c$, "getDocumentListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.DocumentListener);
});
Clazz.overrideMethod (c$, "addUndoableEditListener", 
function (listener) {
this.listenerList.add (jsjavax.swing.event.UndoableEditListener, listener);
}, "jsjavax.swing.event.UndoableEditListener");
Clazz.overrideMethod (c$, "removeUndoableEditListener", 
function (listener) {
this.listenerList.remove (jsjavax.swing.event.UndoableEditListener, listener);
}, "jsjavax.swing.event.UndoableEditListener");
Clazz.defineMethod (c$, "getUndoableEditListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.UndoableEditListener);
});
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
return this.getDocumentProperties ().get (key);
}, "~O");
Clazz.overrideMethod (c$, "putProperty", 
function (key, value) {
if (value != null) {
this.getDocumentProperties ().put (key, value);
} else {
this.getDocumentProperties ().remove (key);
}if (key === jsjava.awt.font.TextAttribute.RUN_DIRECTION && Boolean.TRUE.equals (this.getProperty ("i18n"))) {
this.writeLock ();
try {
var e = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, 0, this.getLength (), jsjavax.swing.event.DocumentEvent.EventType.INSERT);
this.updateBidi (e);
} finally {
this.writeUnlock ();
}
}}, "~O,~O");
Clazz.overrideMethod (c$, "remove", 
function (offs, len) {
var filter = this.getDocumentFilter ();
this.writeLock ();
try {
if (filter != null) {
filter.remove (this.getFilterBypass (), offs, len);
} else {
this.handleRemove (offs, len);
}} finally {
this.writeUnlock ();
}
}, "~N,~N");
Clazz.defineMethod (c$, "handleRemove", 
function (offs, len) {
if (len > 0) {
if (offs < 0 || (offs + len) > this.getLength ()) {
throw  new jsjavax.swing.text.BadLocationException ("Invalid remove", this.getLength () + 1);
}var chng = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, offs, len, jsjavax.swing.event.DocumentEvent.EventType.REMOVE);
var isComposedTextElement = false;
isComposedTextElement = jsjavax.swing.text.Utilities.isComposedTextElement (this, offs);
this.removeUpdate (chng);
var u = this.data.remove (offs, len);
if (u != null) {
chng.addEdit (u);
}this.postRemoveUpdate (chng);
chng.end ();
this.fireRemoveUpdate (chng);
if ((u != null) && !isComposedTextElement) {
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, chng));
}}}, "~N,~N");
Clazz.defineMethod (c$, "replace", 
function (offset, length, text, attrs) {
if (length == 0 && (text == null || text.length == 0)) {
return;
}var filter = this.getDocumentFilter ();
this.writeLock ();
try {
if (filter != null) {
filter.replace (this.getFilterBypass (), offset, length, text, attrs);
} else {
if (length > 0) {
this.remove (offset, length);
}if (text != null && text.length > 0) {
this.insertString (offset, text, attrs);
}}} finally {
this.writeUnlock ();
}
}, "~N,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "insertString", 
function (offs, str, a) {
if ((str == null) || (str.length == 0)) {
return;
}var filter = this.getDocumentFilter ();
this.writeLock ();
try {
if (filter != null) {
filter.insertString (this.getFilterBypass (), offs, str, a);
} else {
this.handleInsertString (offs, str, a);
}} finally {
this.writeUnlock ();
}
}, "~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "handleInsertString", 
function (offs, str, a) {
if ((str == null) || (str.length == 0)) {
return;
}var u = this.data.insertString (offs, str);
var e = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, this, null, offs, str.length, jsjavax.swing.event.DocumentEvent.EventType.INSERT);
if (u != null) {
e.addEdit (u);
}if (this.getProperty ("i18n").equals (Boolean.FALSE)) {
var d = this.getProperty (jsjava.awt.font.TextAttribute.RUN_DIRECTION);
if ((d != null) && (d.equals (jsjava.awt.font.TextAttribute.RUN_DIRECTION_RTL))) {
this.putProperty ("i18n", Boolean.TRUE);
} else {
var chars = str.toCharArray ();
if (jssun.swing.SwingUtilities2.isComplexLayout (chars, 0, chars.length)) {
this.putProperty ("i18n", Boolean.TRUE);
}}}this.insertUpdate (e, a);
e.end ();
this.fireInsertUpdate (e);
if (u != null && (a == null || !a.isDefined (jsjavax.swing.text.StyleConstants.ComposedTextAttribute))) {
this.fireUndoableEditUpdate ( new jsjavax.swing.event.UndoableEditEvent (this, e));
}}, "~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getText", 
function (offset, length) {
if (length < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Length must be positive", length);
}var str = this.data.getString (offset, length);
return str;
}, "~N,~N");
Clazz.defineMethod (c$, "getText", 
function (offset, length, txt) {
if (length < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Length must be positive", length);
}this.data.getChars (offset, length, txt);
}, "~N,~N,jsjavax.swing.text.Segment");
Clazz.overrideMethod (c$, "createPosition", 
function (offs) {
return this.data.createPosition (offs);
}, "~N");
Clazz.overrideMethod (c$, "getStartPosition", 
function () {
var p;
try {
p = this.createPosition (0);
} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
p = null;
} else {
throw bl;
}
}
return p;
});
Clazz.overrideMethod (c$, "getEndPosition", 
function () {
var p;
try {
p = this.createPosition (this.data.length ());
} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
p = null;
} else {
throw bl;
}
}
return p;
});
Clazz.overrideMethod (c$, "getRootElements", 
function () {
var elems =  new Array (2);
elems[0] = this.getDefaultRootElement ();
elems[1] = this.getBidiRootElement ();
return elems;
});
Clazz.defineMethod (c$, "getFilterBypass", 
($fz = function () {
if (this.filterBypass == null) {
this.filterBypass = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.DefaultFilterBypass, this, null);
}return this.filterBypass;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getBidiRootElement", 
function () {
return this.bidiRoot;
});
Clazz.defineMethod (c$, "isLeftToRight", 
function (p0, p1) {
if (!this.getProperty ("i18n").equals (Boolean.TRUE)) {
return true;
}var bidiRoot = this.getBidiRootElement ();
var index = bidiRoot.getElementIndex (p0);
var bidiElem = bidiRoot.getElement (index);
if (bidiElem.getEndOffset () >= p1) {
var bidiAttrs = bidiElem.getAttributes ();
return ((jsjavax.swing.text.StyleConstants.getBidiLevel (bidiAttrs) % 2) == 0);
}return true;
}, "~N,~N");
Clazz.defineMethod (c$, "getAttributeContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "insertUpdate", 
function (chng, attr) {
if (this.getProperty ("i18n").equals (Boolean.TRUE)) this.updateBidi (chng);
if (chng.type === jsjavax.swing.event.DocumentEvent.EventType.INSERT && chng.getLength () > 0 && !Boolean.TRUE.equals (this.getProperty (jsjavax.swing.text.AbstractDocument.MultiByteProperty))) {
var segment = jsjavax.swing.text.SegmentCache.getSharedSegment ();
try {
this.getText (chng.getOffset (), chng.getLength (), segment);
segment.first ();
do {
if ((segment.current ()).charCodeAt (0) > 255) {
this.putProperty (jsjavax.swing.text.AbstractDocument.MultiByteProperty, Boolean.TRUE);
break;
}} while (segment.next () != '\uffff');
} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
jsjavax.swing.text.SegmentCache.releaseSharedSegment (segment);
}}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "removeUpdate", 
function (chng) {
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "postRemoveUpdate", 
function (chng) {
if (this.getProperty ("i18n").equals (Boolean.TRUE)) this.updateBidi (chng);
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "updateBidi", 
function (chng) {
var firstPStart;
var lastPEnd;
if (chng.type === jsjavax.swing.event.DocumentEvent.EventType.INSERT || chng.type === jsjavax.swing.event.DocumentEvent.EventType.CHANGE) {
var chngStart = chng.getOffset ();
var chngEnd = chngStart + chng.getLength ();
firstPStart = this.getParagraphElement (chngStart).getStartOffset ();
lastPEnd = this.getParagraphElement (chngEnd).getEndOffset ();
} else if (chng.type === jsjavax.swing.event.DocumentEvent.EventType.REMOVE) {
var paragraph = this.getParagraphElement (chng.getOffset ());
firstPStart = paragraph.getStartOffset ();
lastPEnd = paragraph.getEndOffset ();
} else {
throw  new Error ("Internal error: unknown event type.");
}var levels = this.calculateBidiLevels (firstPStart, lastPEnd);
var newElements =  new java.util.Vector ();
var firstSpanStart = firstPStart;
var removeFromIndex = 0;
if (firstSpanStart > 0) {
var prevElemIndex = this.bidiRoot.getElementIndex (firstPStart - 1);
removeFromIndex = prevElemIndex;
var prevElem = this.bidiRoot.getElement (prevElemIndex);
var prevLevel = jsjavax.swing.text.StyleConstants.getBidiLevel (prevElem.getAttributes ());
if (prevLevel == levels[0]) {
firstSpanStart = prevElem.getStartOffset ();
} else if (prevElem.getEndOffset () > firstPStart) {
newElements.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, prevElem.getStartOffset (), firstPStart, prevLevel));
} else {
removeFromIndex++;
}}var firstSpanEnd = 0;
while ((firstSpanEnd < levels.length) && (levels[firstSpanEnd] == levels[0])) firstSpanEnd++;

var lastSpanEnd = lastPEnd;
var newNextElem = null;
var removeToIndex = this.bidiRoot.getElementCount () - 1;
if (lastSpanEnd <= this.getLength ()) {
var nextElemIndex = this.bidiRoot.getElementIndex (lastPEnd);
removeToIndex = nextElemIndex;
var nextElem = this.bidiRoot.getElement (nextElemIndex);
var nextLevel = jsjavax.swing.text.StyleConstants.getBidiLevel (nextElem.getAttributes ());
if (nextLevel == levels[levels.length - 1]) {
lastSpanEnd = nextElem.getEndOffset ();
} else if (nextElem.getStartOffset () < lastPEnd) {
newNextElem = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, lastPEnd, nextElem.getEndOffset (), nextLevel);
} else {
removeToIndex--;
}}var lastSpanStart = levels.length;
while ((lastSpanStart > firstSpanEnd) && (levels[lastSpanStart - 1] == levels[levels.length - 1])) lastSpanStart--;

if ((firstSpanEnd == lastSpanStart) && (levels[0] == levels[levels.length - 1])) {
newElements.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, firstSpanStart, lastSpanEnd, levels[0]));
} else {
newElements.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, firstSpanStart, firstSpanEnd + firstPStart, levels[0]));
for (var i = firstSpanEnd; i < lastSpanStart; ) {
var j;
for (j = i; (j < levels.length) && (levels[j] == levels[i]); j++) ;
newElements.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, firstPStart + i, firstPStart + j, levels[i]));
i = j;
}
newElements.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BidiElement, this, null, this.bidiRoot, lastSpanStart + firstPStart, lastSpanEnd, levels[levels.length - 1]));
}if (newNextElem != null) newElements.addElement (newNextElem);
var removedElemCount = 0;
if (this.bidiRoot.getElementCount () > 0) {
removedElemCount = removeToIndex - removeFromIndex + 1;
}var removedElems =  new Array (removedElemCount);
for (var i = 0; i < removedElemCount; i++) {
removedElems[i] = this.bidiRoot.getElement (removeFromIndex + i);
}
var addedElems =  new Array (newElements.size ());
newElements.copyInto (addedElems);
var ee =  new jsjavax.swing.text.AbstractDocument.ElementEdit (this.bidiRoot, removeFromIndex, removedElems, addedElems);
chng.addEdit (ee);
this.bidiRoot.replace (removeFromIndex, removedElems.length, addedElems);
}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "calculateBidiLevels", 
($fz = function (firstPStart, lastPEnd) {
var levels =  Clazz.newByteArray (lastPEnd - firstPStart, 0);
var levelsEnd = 0;
for (var o = firstPStart; o < lastPEnd; ) {
var p = this.getParagraphElement (o);
var pStart = p.getStartOffset ();
var pEnd = p.getEndOffset ();
var seg = jsjavax.swing.text.SegmentCache.getSharedSegment ();
try {
this.getText (pStart, pEnd - pStart, seg);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
throw  new Error ("Internal error: " + e.toString ());
} else {
throw e;
}
}
o = p.getEndOffset ();
jsjavax.swing.text.SegmentCache.releaseSharedSegment (seg);
}
if (levelsEnd != levels.length) throw  new Error ("levelsEnd assertion failed.");
return levels;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getContent", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "createLeafElement", 
function (parent, a, p0, p1) {
return Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.LeafElement, this, null, parent, a, p0, p1);
}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet,~N,~N");
Clazz.defineMethod (c$, "createBranchElement", 
function (parent, a) {
return Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BranchElement, this, null, parent, a);
}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getCurrentWriter", 
function () {
return this.currWriter;
});
Clazz.defineMethod (c$, "writeLock", 
function () {
try {
while ((this.numReaders > 0) || (this.currWriter != null)) {
if (Thread.currentThread () === this.currWriter) {
if (this.notifyingListeners) {
throw  new IllegalStateException ("Attempt to mutate in notification");
}this.numWriters++;
return;
}this.wait ();
}
this.currWriter = Thread.currentThread ();
this.numWriters = 1;
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
throw  new Error ("Interrupted attempt to aquire write lock");
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "writeUnlock", 
function () {
if (--this.numWriters <= 0) {
this.numWriters = 0;
this.currWriter = null;
}});
Clazz.defineMethod (c$, "readLock", 
function () {
try {
while (this.currWriter != null) {
if (this.currWriter === Thread.currentThread ()) {
return;
}this.wait ();
}
this.numReaders += 1;
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
throw  new Error ("Interrupted attempt to aquire read lock");
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "readUnlock", 
function () {
if (this.currWriter === Thread.currentThread ()) {
return;
}if (this.numReaders <= 0) {
throw  new jsjavax.swing.text.StateInvariantError ("document lock failure");
}this.numReaders -= 1;
this.notify ();
});
c$.$AbstractDocument$AbstractElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.parent = null;
this.attributes = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "AbstractElement", null, [jsjavax.swing.text.Element, jsjavax.swing.text.MutableAttributeSet, jsjavax.swing.tree.TreeNode]);
Clazz.makeConstructor (c$, 
function (a, b) {
this.parent = a;
this.attributes = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ().getEmptySet ();
if (b != null) {
this.addAttributes (b);
}}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getAttributeCount", 
function () {
return this.attributes.getAttributeCount ();
});
Clazz.defineMethod (c$, "isDefined", 
function (a) {
return this.attributes.isDefined (a);
}, "~O");
Clazz.defineMethod (c$, "isEqual", 
function (a) {
return this.attributes.isEqual (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "copyAttributes", 
function () {
return this.attributes.copyAttributes ();
});
Clazz.defineMethod (c$, "getAttribute", 
function (a) {
var b = this.attributes.getAttribute (a);
if (b == null) {
var c = (this.parent != null) ? this.parent.getAttributes () : null;
if (c != null) {
b = c.getAttribute (a);
}}return b;
}, "~O");
Clazz.defineMethod (c$, "getAttributeNames", 
function () {
return this.attributes.getAttributeNames ();
});
Clazz.defineMethod (c$, "containsAttribute", 
function (a, b) {
return this.attributes.containsAttribute (a, b);
}, "~O,~O");
Clazz.defineMethod (c$, "containsAttributes", 
function (a) {
return this.attributes.containsAttributes (a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "getResolveParent", 
function () {
var a = this.attributes.getResolveParent ();
if ((a == null) && (this.parent != null)) {
a = this.parent.getAttributes ();
}return a;
});
Clazz.overrideMethod (c$, "addAttribute", 
function (a, b) {
this.checkForIllegalCast ();
var c = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
this.attributes = c.addAttribute (this.attributes, a, b);
}, "~O,~O");
Clazz.overrideMethod (c$, "addAttributes", 
function (a) {
this.checkForIllegalCast ();
var b = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
this.attributes = b.addAttributes (this.attributes, a);
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "removeAttribute", 
function (a) {
this.checkForIllegalCast ();
var b = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
this.attributes = b.removeAttribute (this.attributes, a);
}, "~O");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
this.checkForIllegalCast ();
var b = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
this.attributes = b.removeAttributes (this.attributes, a);
}, "java.util.Enumeration");
Clazz.defineMethod (c$, "removeAttributes", 
function (a) {
this.checkForIllegalCast ();
var b = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
if (a === this) {
this.attributes = b.getEmptySet ();
} else {
this.attributes = b.removeAttributes (this.attributes, a);
}}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "setResolveParent", 
function (a) {
this.checkForIllegalCast ();
var b = this.b$["jsjavax.swing.text.AbstractDocument"].getAttributeContext ();
if (a != null) {
this.attributes = b.addAttribute (this.attributes, jsjavax.swing.text.StyleConstants.ResolveAttribute, a);
} else {
this.attributes = b.removeAttribute (this.attributes, jsjavax.swing.text.StyleConstants.ResolveAttribute);
}}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "checkForIllegalCast", 
($fz = function () {
var a = this.b$["jsjavax.swing.text.AbstractDocument"].getCurrentWriter ();
if ((a == null) || (a !== Thread.currentThread ())) {
throw  new jsjavax.swing.text.StateInvariantError ("Illegal cast to MutableAttributeSet");
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.b$["jsjavax.swing.text.AbstractDocument"];
});
Clazz.overrideMethod (c$, "getParentElement", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getAttributes", 
function () {
return this;
});
Clazz.overrideMethod (c$, "getName", 
function () {
if (this.attributes.isDefined ("$ename")) {
return this.attributes.getAttribute ("$ename");
}return null;
});
Clazz.overrideMethod (c$, "getChildAt", 
function (a) {
return this.getElement (a);
}, "~N");
Clazz.overrideMethod (c$, "getChildCount", 
function () {
return this.getElementCount ();
});
Clazz.overrideMethod (c$, "getParent", 
function () {
return this.getParentElement ();
});
Clazz.overrideMethod (c$, "getIndex", 
function (a) {
for (var b = this.getChildCount () - 1; b >= 0; b--) if (this.getChildAt (b) === a) return b;

return -1;
}, "jsjavax.swing.tree.TreeNode");
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$BranchElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$children = null;
this.nchildren = 0;
this.lastIndex = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "BranchElement", jsjavax.swing.text.AbstractDocument.AbstractElement, null, Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.AbstractElement, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.BranchElement, [a, b]);
this.$children =  new Array (1);
this.nchildren = 0;
this.lastIndex = -1;
}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "positionToElement", 
function (a) {
var b = this.getElementIndex (a);
var c = this.$children[b];
var d = c.getStartOffset ();
var e = c.getEndOffset ();
if ((a >= d) && (a < e)) {
return c;
}return null;
}, "~N");
Clazz.defineMethod (c$, "replace", 
function (a, b, c) {
var d = c.length - b;
var e = a + b;
var f = this.nchildren - e;
var g = e + d;
if ((this.nchildren + d) >= this.$children.length) {
var h = Math.max (2 * this.$children.length, this.nchildren + d);
var i =  new Array (h);
System.arraycopy (this.$children, 0, i, 0, a);
System.arraycopy (c, 0, i, a, c.length);
System.arraycopy (this.$children, e, i, g, f);
this.$children = i;
} else {
System.arraycopy (this.$children, e, this.$children, g, f);
System.arraycopy (c, 0, this.$children, a, c.length);
}this.nchildren = this.nchildren + d;
}, "~N,~N,~A");
Clazz.overrideMethod (c$, "toString", 
function () {
return "BranchElement(" + this.getName () + ") " + this.getStartOffset () + "," + this.getEndOffset () + "\n";
});
Clazz.defineMethod (c$, "getName", 
function () {
var a = Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.BranchElement, "getName", []);
if (a == null) {
a = "paragraph";
}return a;
});
Clazz.defineMethod (c$, "getStartOffset", 
function () {
return this.$children[0].getStartOffset ();
});
Clazz.overrideMethod (c$, "getEndOffset", 
function () {
var a = (this.nchildren > 0) ? this.$children[this.nchildren - 1] : this.$children[0];
return a.getEndOffset ();
});
Clazz.overrideMethod (c$, "getElement", 
function (a) {
if (a < this.nchildren) {
return this.$children[a];
}return null;
}, "~N");
Clazz.overrideMethod (c$, "getElementCount", 
function () {
return this.nchildren;
});
Clazz.overrideMethod (c$, "getElementIndex", 
function (a) {
var b;
var c = 0;
var d = this.nchildren - 1;
var e = 0;
var f = this.getStartOffset ();
var g;
if (this.nchildren == 0) {
return 0;
}if (a >= this.getEndOffset ()) {
return this.nchildren - 1;
}if ((this.lastIndex >= c) && (this.lastIndex <= d)) {
var h = this.$children[this.lastIndex];
f = h.getStartOffset ();
g = h.getEndOffset ();
if ((a >= f) && (a < g)) {
return this.lastIndex;
}if (a < f) {
d = this.lastIndex;
} else {
c = this.lastIndex;
}}while (c <= d) {
e = c + (Clazz.doubleToInt ((d - c) / 2));
var h = this.$children[e];
f = h.getStartOffset ();
g = h.getEndOffset ();
if ((a >= f) && (a < g)) {
b = e;
this.lastIndex = b;
return b;
} else if (a < f) {
d = e - 1;
} else {
c = e + 1;
}}
if (a < f) {
b = e;
} else {
b = e + 1;
}this.lastIndex = b;
return b;
}, "~N");
Clazz.overrideMethod (c$, "isLeaf", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getAllowsChildren", 
function () {
return true;
});
Clazz.overrideMethod (c$, "children", 
function () {
if (this.nchildren == 0) return null;
var a =  new java.util.Vector (this.nchildren);
for (var b = 0; b < this.nchildren; b++) a.addElement (this.$children[b]);

return a.elements ();
});
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$LeafElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.p0 = null;
this.p1 = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "LeafElement", jsjavax.swing.text.AbstractDocument.AbstractElement, null, Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.AbstractElement, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.LeafElement, [a, b]);
try {
this.p0 = this.b$["jsjavax.swing.text.AbstractDocument"].createPosition (c);
this.p1 = this.b$["jsjavax.swing.text.AbstractDocument"].createPosition (d);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
this.p0 = null;
this.p1 = null;
throw  new jsjavax.swing.text.StateInvariantError ("Can't create Position references");
} else {
throw e;
}
}
}, "jsjavax.swing.text.Element,jsjavax.swing.text.AttributeSet,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "LeafElement(" + this.getName () + ") " + this.p0 + "," + this.p1 + "\n";
});
Clazz.overrideMethod (c$, "getStartOffset", 
function () {
return this.p0.getOffset ();
});
Clazz.overrideMethod (c$, "getEndOffset", 
function () {
return this.p1.getOffset ();
});
Clazz.defineMethod (c$, "getName", 
function () {
var a = Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.LeafElement, "getName", []);
if (a == null) {
a = "content";
}return a;
});
Clazz.overrideMethod (c$, "getElementIndex", 
function (a) {
return -1;
}, "~N");
Clazz.overrideMethod (c$, "getElement", 
function (a) {
return null;
}, "~N");
Clazz.overrideMethod (c$, "getElementCount", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "isLeaf", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getAllowsChildren", 
function () {
return false;
});
Clazz.overrideMethod (c$, "children", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$BidiRootElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "BidiRootElement", jsjavax.swing.text.AbstractDocument.BranchElement, null, Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.BranchElement, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.BidiRootElement, [null, null]);
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "bidi root";
});
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$BidiElement$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "BidiElement", jsjavax.swing.text.AbstractDocument.LeafElement, null, Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.LeafElement, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.BidiElement, [a,  new jsjavax.swing.text.SimpleAttributeSet (), b, c]);
this.addAttribute (jsjavax.swing.text.StyleConstants.BidiLevel,  new Integer (d));
}, "jsjavax.swing.text.Element,~N,~N,~N");
Clazz.overrideMethod (c$, "getName", 
function () {
return "bidi level";
});
Clazz.defineMethod (c$, "getLevel", 
function () {
var a = this.getAttribute (jsjavax.swing.text.StyleConstants.BidiLevel);
if (a != null) {
return a.intValue ();
}return 0;
});
Clazz.defineMethod (c$, "isLeftToRight", 
function () {
return ((this.getLevel () % 2) == 0);
});
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$DefaultDocumentEvent$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.length = 0;
this.changeLookup = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "DefaultDocumentEvent", jsjavax.swing.undo.CompoundEdit, jsjavax.swing.event.DocumentEvent);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent);
this.offset = a;
this.length = b;
this.type = c;
}, "~N,~N,jsjavax.swing.event.DocumentEvent.EventType");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.edits.toString ();
});
Clazz.defineMethod (c$, "addEdit", 
function (a) {
if ((this.changeLookup == null) && (this.edits.size () > 10)) {
this.changeLookup =  new java.util.Hashtable ();
var b = this.edits.size ();
for (var c = 0; c < b; c++) {
var d = this.edits.elementAt (c);
if (Clazz.instanceOf (d, jsjavax.swing.event.DocumentEvent.ElementChange)) {
var e = d;
this.changeLookup.put (e.getElement (), e);
}}
}if ((this.changeLookup != null) && (Clazz.instanceOf (a, jsjavax.swing.event.DocumentEvent.ElementChange))) {
var b = a;
this.changeLookup.put (b.getElement (), b);
}return Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, "addEdit", [a]);
}, "jsjavax.swing.undo.UndoableEdit");
Clazz.defineMethod (c$, "redo", 
function () {
this.b$["jsjavax.swing.text.AbstractDocument"].writeLock ();
try {
Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, "redo", []);
var a = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.UndoRedoDocumentEvent, this, null, this, false);
if (this.type === jsjavax.swing.event.DocumentEvent.EventType.INSERT) {
this.b$["jsjavax.swing.text.AbstractDocument"].fireInsertUpdate (a);
} else if (this.type === jsjavax.swing.event.DocumentEvent.EventType.REMOVE) {
this.b$["jsjavax.swing.text.AbstractDocument"].fireRemoveUpdate (a);
} else {
this.b$["jsjavax.swing.text.AbstractDocument"].fireChangedUpdate (a);
}} finally {
this.b$["jsjavax.swing.text.AbstractDocument"].writeUnlock ();
}
});
Clazz.defineMethod (c$, "undo", 
function () {
this.b$["jsjavax.swing.text.AbstractDocument"].writeLock ();
try {
Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent, "undo", []);
var a = Clazz.innerTypeInstance (jsjavax.swing.text.AbstractDocument.UndoRedoDocumentEvent, this, null, this, true);
if (this.type === jsjavax.swing.event.DocumentEvent.EventType.REMOVE) {
this.b$["jsjavax.swing.text.AbstractDocument"].fireInsertUpdate (a);
} else if (this.type === jsjavax.swing.event.DocumentEvent.EventType.INSERT) {
this.b$["jsjavax.swing.text.AbstractDocument"].fireRemoveUpdate (a);
} else {
this.b$["jsjavax.swing.text.AbstractDocument"].fireChangedUpdate (a);
}} finally {
this.b$["jsjavax.swing.text.AbstractDocument"].writeUnlock ();
}
});
Clazz.overrideMethod (c$, "isSignificant", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getPresentationName", 
function () {
var a = this.getType ();
if (a === jsjavax.swing.event.DocumentEvent.EventType.INSERT) return jsjavax.swing.UIManager.getString ("AbstractDocument.additionText");
if (a === jsjavax.swing.event.DocumentEvent.EventType.REMOVE) return jsjavax.swing.UIManager.getString ("AbstractDocument.deletionText");
return jsjavax.swing.UIManager.getString ("AbstractDocument.styleChangeText");
});
Clazz.overrideMethod (c$, "getUndoPresentationName", 
function () {
return jsjavax.swing.UIManager.getString ("AbstractDocument.undoText") + " " + this.getPresentationName ();
});
Clazz.overrideMethod (c$, "getRedoPresentationName", 
function () {
return jsjavax.swing.UIManager.getString ("AbstractDocument.redoText") + " " + this.getPresentationName ();
});
Clazz.overrideMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.offset;
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.length;
});
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.b$["jsjavax.swing.text.AbstractDocument"];
});
Clazz.overrideMethod (c$, "getChange", 
function (a) {
if (this.changeLookup != null) {
return this.changeLookup.get (a);
}var b = this.edits.size ();
for (var c = 0; c < b; c++) {
var d = this.edits.elementAt (c);
if (Clazz.instanceOf (d, jsjavax.swing.event.DocumentEvent.ElementChange)) {
var e = d;
if (a.equals (e.getElement ())) {
return e;
}}}
return null;
}, "jsjavax.swing.text.Element");
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$UndoRedoDocumentEvent$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.src = null;
this.isUndo = false;
this.type = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "UndoRedoDocumentEvent", null, jsjavax.swing.event.DocumentEvent);
Clazz.makeConstructor (c$, 
function (a, b) {
this.src = a;
this.isUndo = b;
if (b) {
if (a.getType ().equals (jsjavax.swing.event.DocumentEvent.EventType.INSERT)) {
this.type = jsjavax.swing.event.DocumentEvent.EventType.REMOVE;
} else if (a.getType ().equals (jsjavax.swing.event.DocumentEvent.EventType.REMOVE)) {
this.type = jsjavax.swing.event.DocumentEvent.EventType.INSERT;
} else {
this.type = a.getType ();
}} else {
this.type = a.getType ();
}}, "jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent,~B");
Clazz.defineMethod (c$, "getSource", 
function () {
return this.src;
});
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.src.getOffset ();
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.src.getLength ();
});
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.src.getDocument ();
});
Clazz.overrideMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "getChange", 
function (a) {
return this.src.getChange (a);
}, "jsjavax.swing.text.Element");
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$DefaultFilterBypass$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "DefaultFilterBypass", jsjavax.swing.text.DocumentFilter.FilterBypass);
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.b$["jsjavax.swing.text.AbstractDocument"];
});
Clazz.overrideMethod (c$, "remove", 
function (a, b) {
this.b$["jsjavax.swing.text.AbstractDocument"].handleRemove (a, b);
}, "~N,~N");
Clazz.overrideMethod (c$, "insertString", 
function (a, b, c) {
this.b$["jsjavax.swing.text.AbstractDocument"].handleInsertString (a, b, c);
}, "~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "replace", 
function (a, b, c, d) {
this.b$["jsjavax.swing.text.AbstractDocument"].handleRemove (a, b);
this.b$["jsjavax.swing.text.AbstractDocument"].handleInsertString (a, c, d);
}, "~N,~N,~S,jsjavax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
c$.$AbstractDocument$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.text, "AbstractDocument$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return System.getProperty ("i18n");
});
c$ = Clazz.p0p ();
};
Clazz.declareInterface (jsjavax.swing.text.AbstractDocument, "Content");
Clazz.declareInterface (jsjavax.swing.text.AbstractDocument, "AttributeContext");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.e = null;
this.index = 0;
this.removed = null;
this.added = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AbstractDocument, "ElementEdit", jsjavax.swing.undo.AbstractUndoableEdit, jsjavax.swing.event.DocumentEvent.ElementChange);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, jsjavax.swing.text.AbstractDocument.ElementEdit);
this.e = a;
this.index = b;
this.removed = c;
this.added = d;
}, "jsjavax.swing.text.Element,~N,~A,~A");
Clazz.overrideMethod (c$, "getElement", 
function () {
return this.e;
});
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.overrideMethod (c$, "getChildrenRemoved", 
function () {
return this.removed;
});
Clazz.overrideMethod (c$, "getChildrenAdded", 
function () {
return this.added;
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.ElementEdit, "redo", []);
var a = this.removed;
this.removed = this.added;
this.added = a;
(this.e).replace (this.index, this.removed.length, this.added);
});
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.AbstractDocument.ElementEdit, "undo", []);
(this.e).replace (this.index, this.added.length, this.removed);
var a = this.removed;
this.removed = this.added;
this.added = a;
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"defaultI18NProperty", null,
"BAD_LOCK_STATE", "document lock failure",
"BAD_LOCATION", "document location failure",
"ParagraphElementName", "paragraph",
"ContentElementName", "content",
"SectionElementName", "section",
"BidiElementName", "bidi level",
"ElementNameAttribute", "$ename",
"I18NProperty", "i18n",
"MultiByteProperty", "multiByte",
"AsyncLoadPriority", "load priority");
});
