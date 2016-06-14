Clazz.declarePackage ("swingjs");
Clazz.load (["javax.swing.text.DocumentFilter", "$.Element", "$.JSMinimalAbstractDocument"], "swingjs.JSAbstractDocument", ["java.lang.IllegalStateException", "java.util.HashMap", "JU.AU", "javax.swing.event.DocumentEvent", "$.DocumentListener", "$.EventListenerList", "javax.swing.text.BadLocationException", "swingjs.JSDocumentEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.props = null;
this.root = null;
this.positions = null;
this.listenerList = null;
this.notifyingListeners = false;
this.filterBypass = null;
this.me = null;
this.sb = null;
this.tempChar = null;
this.filter = null;
if (!Clazz.isClassDefined ("swingjs.JSAbstractDocument.DefaultFilterBypass")) {
swingjs.JSAbstractDocument.$JSAbstractDocument$DefaultFilterBypass$ ();
}
if (!Clazz.isClassDefined ("swingjs.JSAbstractDocument.JSElement")) {
swingjs.JSAbstractDocument.$JSAbstractDocument$JSElement$ ();
}
Clazz.instantialize (this, arguments);
}, swingjs, "JSAbstractDocument", null, javax.swing.text.JSMinimalAbstractDocument);
Clazz.makeConstructor (c$, 
function () {
this.me = this;
this.props =  new java.util.HashMap ();
});
Clazz.overrideMethod (c$, "getRootElements", 
function () {
return [this.root, null];
});
Clazz.defineMethod (c$, "checkLoc", 
function (start, end) {
if (start < 0 || end > this.getLength ()) throw  new javax.swing.text.BadLocationException ("JSAbstractDocument: out of range", (start < 0 ? start : end));
}, "~N,~N");
Clazz.defineMethod (c$, "fixPositions", 
function (offset, length, isInsert) {
if (this.positions == null || this.positions.isEmpty ()) return;
if (isInsert) {
for (var i, $i = this.positions.keySet ().iterator (); $i.hasNext () && ((i = $i.next ()) || true);) {
var pos = i.intValue ();
if (pos > offset) this.positions.get (i).pos += length;
}
return;
}for (var i, $i = this.positions.keySet ().iterator (); $i.hasNext () && ((i = $i.next ()) || true);) {
var pos = i.intValue ();
if (pos <= offset) continue;
if (pos >= offset + length) this.positions.get (i).pos -= length;
 else this.positions.get (i).pos = offset;
}
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getFilterBypass", 
 function () {
if (this.filterBypass == null) {
this.filterBypass = Clazz.innerTypeInstance (swingjs.JSAbstractDocument.DefaultFilterBypass, this, null);
}return this.filterBypass;
});
Clazz.overrideMethod (c$, "remove", 
function (offs, len) {
var filter = this.getDocumentFilter ();
if (filter == null) this.handleRemove (offs, len);
 else filter.remove (this.getFilterBypass (), offs, len);
}, "~N,~N");
Clazz.overrideMethod (c$, "insertString", 
function (offset, str, a) {
var filter = this.getDocumentFilter ();
if (filter == null) this.handleInsertString (offset, str, a);
 else filter.insertString (this.getFilterBypass (), offset, str, a);
}, "~N,~S,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "replace", 
function (offset, length, text, attrs) {
if (length == 0 && (text == null || text.length == 0)) return;
var filter = this.getDocumentFilter ();
if (filter != null) {
filter.replace (this.getFilterBypass (), offset, length, text, attrs);
} else {
if (length > 0) this.remove (offset, length);
if (text != null && text.length > 0) this.insertString (offset, text, attrs);
}}, "~N,~N,~S,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "taint", 
 function () {
this.tempChar = null;
});
Clazz.defineMethod (c$, "setLines", 
 function () {
this.root = Clazz.innerTypeInstance (swingjs.JSAbstractDocument.JSElement, this, null);
var s = this.sb.toString ();
if (s.lastIndexOf ('\n') != s.length - 1) s += "\n";
var ilast = 0;
for (var i = 0; i < s.length; i++) {
if (s.charAt (i) != '\n') continue;
var e = Clazz.innerTypeInstance (swingjs.JSAbstractDocument.JSElement, this, null);
e.start = ilast;
e.end = i;
ilast = i + 1;
this.root.addChild (e);
}
});
Clazz.defineMethod (c$, "handleInsertString", 
function (offs, str, a) {
if ((str == null) || (str.length == 0)) {
return;
}this.checkLoc (offs, offs);
this.taint ();
this.sb.insert (offs, str);
this.fixPositions (offs, str.length, true);
if (str.indexOf ('\n') >= 0) this.setLines ();
var e =  new swingjs.JSDocumentEvent (this, offs, str.length, javax.swing.event.DocumentEvent.EventType.INSERT);
this.fireInsertUpdate (e);
}, "~N,~S,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "handleRemove", 
function (offs, len) {
this.checkLoc (offs, offs + len);
this.taint ();
var str = this.sb.substring2 (offs, offs + len);
this.sb.replace (offs, offs + len, "");
this.fixPositions (offs, offs + len, false);
if (str.indexOf ('\n') >= 0) this.setLines ();
if (len > 0) {
var chng =  new swingjs.JSDocumentEvent (this, offs, len, javax.swing.event.DocumentEvent.EventType.REMOVE);
this.fireRemoveUpdate (chng);
}}, "~N,~N");
Clazz.defineMethod (c$, "fireInsertUpdate", 
function (e) {
if (this.listenerList == null) return;
this.checkAlreadyNotifying ();
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.DocumentListener) {
(listeners[i + 1]).insertUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "javax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "fireChangedUpdate", 
function (e) {
if (this.listenerList == null) return;
this.checkAlreadyNotifying ();
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.DocumentListener) {
(listeners[i + 1]).changedUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "javax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "fireRemoveUpdate", 
function (e) {
if (this.listenerList == null) return;
this.checkAlreadyNotifying ();
this.notifyingListeners = true;
try {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.DocumentListener) {
(listeners[i + 1]).removeUpdate (e);
}}
} finally {
this.notifyingListeners = false;
}
}, "javax.swing.event.DocumentEvent");
Clazz.defineMethod (c$, "checkAlreadyNotifying", 
 function () {
if (this.notifyingListeners) throw  new IllegalStateException ("One of the document listeners modifed the document. This is not allowed.");
});
Clazz.overrideMethod (c$, "addDocumentListener", 
function (listener) {
if (this.listenerList == null) this.listenerList =  new javax.swing.event.EventListenerList ();
this.listenerList.add (javax.swing.event.DocumentListener, listener);
}, "javax.swing.event.DocumentListener");
Clazz.overrideMethod (c$, "removeDocumentListener", 
function (listener) {
if (this.listenerList != null) this.listenerList.remove (javax.swing.event.DocumentListener, listener);
}, "javax.swing.event.DocumentListener");
Clazz.overrideMethod (c$, "addUndoableEditListener", 
function (listener) {
}, "javax.swing.event.UndoableEditListener");
Clazz.overrideMethod (c$, "removeUndoableEditListener", 
function (listener) {
}, "javax.swing.event.UndoableEditListener");
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
return this.props.get (key);
}, "~O");
Clazz.overrideMethod (c$, "putProperty", 
function (key, value) {
this.props.put (key, value);
}, "~O,~O");
Clazz.overrideMethod (c$, "getAsynchronousLoadPriority", 
function () {
return -1;
});
Clazz.overrideMethod (c$, "setDocumentFilter", 
function (filter) {
this.filter = filter;
}, "javax.swing.text.DocumentFilter");
Clazz.defineMethod (c$, "getDocumentFilter", 
function () {
return this.filter;
});
c$.$JSAbstractDocument$DefaultFilterBypass$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, swingjs.JSAbstractDocument, "DefaultFilterBypass", javax.swing.text.DocumentFilter.FilterBypass);
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.b$["swingjs.JSAbstractDocument"].me;
});
Clazz.overrideMethod (c$, "remove", 
function (a, b) {
this.b$["swingjs.JSAbstractDocument"].handleRemove (a, b);
}, "~N,~N");
Clazz.overrideMethod (c$, "insertString", 
function (a, b, c) {
this.b$["swingjs.JSAbstractDocument"].handleInsertString (a, b, c);
}, "~N,~S,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "replace", 
function (a, b, c, d) {
this.b$["swingjs.JSAbstractDocument"].handleRemove (a, b);
this.b$["swingjs.JSAbstractDocument"].handleInsertString (a, c, d);
}, "~N,~N,~S,javax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
c$.$JSAbstractDocument$JSElement$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.parent = null;
this.attributeSet = null;
this.start = 0;
this.end = 0;
this.nchildren = 0;
this.children = null;
this.lastIndex = 0;
Clazz.instantialize (this, arguments);
}, swingjs.JSAbstractDocument, "JSElement", null, javax.swing.text.Element);
Clazz.makeConstructor (c$, 
function () {
this.children = null;
this.nchildren = 0;
this.lastIndex = -1;
});
Clazz.defineMethod (c$, "addChild", 
function (a) {
if (this.children == null) this.children =  new Array (10);
 else if (this.nchildren == this.children.length) this.children = JU.AU.doubleLength (this.children);
this.children[this.nchildren++] = a;
}, "swingjs.JSAbstractDocument.JSElement");
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.b$["swingjs.JSAbstractDocument"].me;
});
Clazz.overrideMethod (c$, "getParentElement", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.getName ();
});
Clazz.overrideMethod (c$, "getAttributes", 
function () {
return this.attributeSet;
});
Clazz.defineMethod (c$, "getStartOffset", 
function () {
return this.start;
});
Clazz.defineMethod (c$, "getEndOffset", 
function () {
return this.end;
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
var h = this.children[this.lastIndex];
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
var h = this.children[e];
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
Clazz.overrideMethod (c$, "getElementCount", 
function () {
return this.nchildren;
});
Clazz.overrideMethod (c$, "getElement", 
function (a) {
return (a >= this.nchildren ? null : this.children[a]);
}, "~N");
Clazz.overrideMethod (c$, "isLeaf", 
function () {
return (this.parent != null);
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"ParagraphElementName", "paragraph",
"ContentElementName", "content");
});
