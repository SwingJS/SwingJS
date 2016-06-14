Clazz.declarePackage ("javax.swing.text");
Clazz.load (["java.awt.Rectangle", "java.awt.event.ActionListener", "$.FocusListener", "$.MouseListener", "$.MouseMotionListener", "java.beans.PropertyChangeListener", "javax.swing.event.DocumentListener", "javax.swing.text.Caret", "$.NavigationFilter", "javax.swing.event.EventListenerList"], "javax.swing.text.DefaultCaret", ["java.lang.Boolean", "$.IllegalArgumentException", "java.awt.Point", "java.awt.event.ActionEvent", "javax.swing.SwingUtilities", "javax.swing.event.ChangeEvent", "$.ChangeListener", "javax.swing.text.AbstractDocument", "javax.swing.text.AbstractDocument.UndoRedoDocumentEvent", "javax.swing.text.DefaultEditorKit", "$.DefaultHighlighter", "$.Document", "$.Position", "$.Segment", "$.StateInvariantError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
this.changeEvent = null;
this.component = null;
this.updatePolicy = 0;
this.visible = false;
this.active = false;
this.dot = 0;
this.mark = 0;
this.selectionTag = null;
this.selectionVisible = false;
this.magicCaretPosition = null;
this.dotBias = null;
this.markBias = null;
this.dotLTR = false;
this.markLTR = false;
this.handler = null;
this.flagXPoints = null;
this.flagYPoints = null;
this.filterBypass = null;
this.ownsSelection = false;
this.forceCaretPositionChange = false;
this.shouldHandleRelease = false;
this.selectedWordEvent = null;
this.caretWidth = -1;
this.aspectRatio = -1;
if (!Clazz.isClassDefined ("javax.swing.text.DefaultCaret.SafeScroller")) {
javax.swing.text.DefaultCaret.$DefaultCaret$SafeScroller$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.DefaultCaret.Handler")) {
javax.swing.text.DefaultCaret.$DefaultCaret$Handler$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.DefaultCaret.DefaultFilterBypass")) {
javax.swing.text.DefaultCaret.$DefaultCaret$DefaultFilterBypass$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "DefaultCaret", java.awt.Rectangle, [javax.swing.text.Caret, java.awt.event.FocusListener, java.awt.event.MouseListener, java.awt.event.MouseMotionListener]);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
this.handler = Clazz.innerTypeInstance (javax.swing.text.DefaultCaret.Handler, this, null);
this.flagXPoints =  Clazz.newIntArray (3, 0);
this.flagYPoints =  Clazz.newIntArray (3, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.DefaultCaret, []);
});
Clazz.defineMethod (c$, "setUpdatePolicy", 
function (policy) {
this.updatePolicy = policy;
}, "~N");
Clazz.defineMethod (c$, "getUpdatePolicy", 
function () {
return this.updatePolicy;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.defineMethod (c$, "repaint", 
function () {
if (this.component != null) {
this.component.repaint (this.x, this.y, this.width, this.height);
}});
Clazz.defineMethod (c$, "damage", 
function (r) {
if (r != null) {
var damageWidth = this.getCaretWidth (r.height);
this.x = r.x - 4 - (damageWidth >> 1);
this.y = r.y;
this.width = 9 + damageWidth;
this.height = r.height;
this.repaint ();
}}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "adjustVisibility", 
function (nloc) {
if (this.component == null) {
return;
}if (javax.swing.SwingUtilities.isEventDispatchThread ()) {
this.component.scrollRectToVisible (nloc);
} else {
javax.swing.SwingUtilities.invokeLater (Clazz.innerTypeInstance (javax.swing.text.DefaultCaret.SafeScroller, this, null, nloc));
}}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getSelectionPainter", 
function () {
return javax.swing.text.DefaultHighlighter.DefaultPainter;
});
Clazz.defineMethod (c$, "positionCaret", 
function (e) {
var pt =  new java.awt.Point (e.getX (), e.getY ());
var biasRet =  new Array (1);
var pos = this.component.getUI ().viewToModel (this.component, pt, biasRet);
if (biasRet[0] == null) biasRet[0] = javax.swing.text.Position.Bias.Forward;
if (pos >= 0) {
this.setDot (pos, biasRet[0]);
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "moveCaret", 
function (e) {
var pt =  new java.awt.Point (e.getX (), e.getY ());
var biasRet =  new Array (1);
var pos = this.component.getUI ().viewToModel (this.component, pt, biasRet);
if (biasRet[0] == null) biasRet[0] = javax.swing.text.Position.Bias.Forward;
if (pos >= 0) {
this.moveDot (pos, biasRet[0]);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
if (this.component.isEnabled ()) {
if (this.component.isEditable ()) {
this.setVisible (true);
}this.setSelectionVisible (true);
}}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
this.setVisible (false);
this.setSelectionVisible (this.ownsSelection || e.isTemporary ());
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
var nclicks = e.getClickCount ();
if (!e.isConsumed ()) {
if (javax.swing.SwingUtilities.isLeftMouseButton (e)) {
if (nclicks == 1) {
this.selectedWordEvent = null;
}} else if (javax.swing.SwingUtilities.isMiddleMouseButton (e)) {
}}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if (javax.swing.SwingUtilities.isLeftMouseButton (e)) {
if (e.isConsumed ()) {
this.shouldHandleRelease = true;
} else {
this.shouldHandleRelease = false;
this.adjustCaretAndFocus (e);
}}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "adjustCaretAndFocus", 
function (e) {
this.adjustCaret (e);
this.adjustFocus (false);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "adjustCaret", 
 function (e) {
if ((e.getModifiers () & 1) != 0 && this.getDot () != -1) {
this.moveCaret (e);
} else {
this.positionCaret (e);
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "adjustFocus", 
 function (inWindow) {
if ((this.component != null) && this.component.isEnabled () && this.component.isRequestFocusEnabled ()) {
if (inWindow) {
this.component.requestFocusInWindow ();
} else {
this.component.requestFocus ();
}}}, "~B");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (!e.isConsumed () && this.shouldHandleRelease && javax.swing.SwingUtilities.isLeftMouseButton (e)) {
this.adjustCaretAndFocus (e);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
if ((!e.isConsumed ()) && javax.swing.SwingUtilities.isLeftMouseButton (e)) {
this.moveCaret (e);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "paint", 
function (g) {
if (this.isVisible ()) {
try {
var mapper = this.component.getUI ();
var r = mapper.modelToView (this.component, this.dot, this.dotBias);
if ((r == null) || ((r.width == 0) && (r.height == 0))) {
return;
}if (this.width > 0 && this.height > 0 && !this._contains (r.x, r.y, r.width, r.height)) {
var clip = g.getClipBounds ();
if (clip != null && !clip.contains (this)) {
this.repaint ();
}this.damage (r);
}g.setColor (this.component.getCaretColor ());
var paintWidth = this.getCaretWidth (r.height);
r.x -= paintWidth >> 1;
g.fillRect (r.x, r.y, paintWidth, r.height);
var doc = this.component.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.AbstractDocument)) {
var bidi = (doc).getBidiRootElement ();
if ((bidi != null) && (bidi.getElementCount () > 1)) {
this.flagXPoints[0] = r.x + ((this.dotLTR) ? paintWidth : 0);
this.flagYPoints[0] = r.y;
this.flagXPoints[1] = this.flagXPoints[0];
this.flagYPoints[1] = this.flagYPoints[0] + 4;
this.flagXPoints[2] = this.flagXPoints[0] + ((this.dotLTR) ? 4 : -4);
this.flagYPoints[2] = this.flagYPoints[0];
g.fillPolygon (this.flagXPoints, this.flagYPoints, 3);
}}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
}}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "install", 
function (c) {
this.component = c;
var doc = c.getDocument ();
this.dot = this.mark = 0;
this.dotLTR = this.markLTR = true;
this.dotBias = this.markBias = javax.swing.text.Position.Bias.Forward;
if (doc != null) {
doc.addDocumentListener (this.handler);
}c.addPropertyChangeListener (this.handler);
c.addFocusListener (this);
c.addMouseListener (this);
c.addMouseMotionListener (this);
if (this.component.hasFocus ()) {
this.focusGained (null);
}var ratio = c.getClientProperty ("caretAspectRatio");
if (ratio != null) {
this.aspectRatio = ratio.floatValue ();
} else {
this.aspectRatio = -1;
}var width = c.getClientProperty ("caretWidth");
if (width != null) {
this.caretWidth = width.intValue ();
} else {
this.caretWidth = -1;
}}, "javax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "deinstall", 
function (c) {
c.removeMouseListener (this);
c.removeMouseMotionListener (this);
c.removeFocusListener (this);
c.removePropertyChangeListener (this.handler);
var doc = c.getDocument ();
if (doc != null) {
doc.removeDocumentListener (this.handler);
}{
this.component = null;
}}, "javax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.overrideMethod (c$, "setSelectionVisible", 
function (vis) {
if (vis != this.selectionVisible) {
this.selectionVisible = vis;
if (this.selectionVisible) {
var h = this.component.getHighlighter ();
if ((this.dot != this.mark) && (h != null) && (this.selectionTag == null)) {
var p0 = Math.min (this.dot, this.mark);
var p1 = Math.max (this.dot, this.mark);
var p = this.getSelectionPainter ();
try {
this.selectionTag = h.addHighlight (p0, p1, p);
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
this.selectionTag = null;
} else {
throw bl;
}
}
}} else {
if (this.selectionTag != null) {
var h = this.component.getHighlighter ();
h.removeHighlight (this.selectionTag);
this.selectionTag = null;
}}}}, "~B");
Clazz.overrideMethod (c$, "isSelectionVisible", 
function () {
return this.selectionVisible;
});
Clazz.defineMethod (c$, "isActive", 
function () {
return this.active;
});
Clazz.overrideMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.overrideMethod (c$, "setVisible", 
function (e) {
if (this.component != null) {
this.active = e;
var mapper = this.component.getUI ();
if (this.visible != e) {
this.visible = e;
try {
var loc = mapper.modelToView (this.component, this.dot, this.dotBias);
this.damage (loc);
} catch (badloc) {
if (Clazz.exceptionOf (badloc, javax.swing.text.BadLocationException)) {
} else {
throw badloc;
}
}
}}}, "~B");
Clazz.overrideMethod (c$, "setBlinkRate", 
function (rate) {
}, "~N");
Clazz.overrideMethod (c$, "getBlinkRate", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getDot", 
function () {
return this.dot;
});
Clazz.overrideMethod (c$, "getMark", 
function () {
return this.mark;
});
Clazz.defineMethod (c$, "setDot", 
function (dot) {
this.setDot (dot, javax.swing.text.Position.Bias.Forward);
}, "~N");
Clazz.defineMethod (c$, "moveDot", 
function (dot) {
this.moveDot (dot, javax.swing.text.Position.Bias.Forward);
}, "~N");
Clazz.defineMethod (c$, "moveDot", 
function (dot, dotBias) {
if (dotBias == null) {
throw  new IllegalArgumentException ("null bias");
}if (!this.component.isEnabled ()) {
this.setDot (dot, dotBias);
return;
}if (dot != this.dot) {
var filter = this.component.getNavigationFilter ();
if (filter != null) {
filter.moveDot (this.getFilterBypass (), dot, dotBias);
} else {
this.handleMoveDot (dot, dotBias);
}}}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "handleMoveDot", 
function (dot, dotBias) {
this.changeCaretPosition (dot, dotBias);
if (this.selectionVisible) {
var h = this.component.getHighlighter ();
if (h != null) {
var p0 = Math.min (dot, this.mark);
var p1 = Math.max (dot, this.mark);
if (p0 == p1) {
if (this.selectionTag != null) {
h.removeHighlight (this.selectionTag);
this.selectionTag = null;
}} else {
try {
if (this.selectionTag != null) {
h.changeHighlight (this.selectionTag, p0, p1);
} else {
var p = this.getSelectionPainter ();
this.selectionTag = h.addHighlight (p0, p1, p);
}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new javax.swing.text.StateInvariantError ("Bad caret position");
} else {
throw e;
}
}
}}}}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "setDot", 
function (dot, dotBias) {
if (dotBias == null) {
throw  new IllegalArgumentException ("null bias");
}var filter = this.component.getNavigationFilter ();
if (filter != null) {
filter.setDot (this.getFilterBypass (), dot, dotBias);
} else {
this.handleSetDot (dot, dotBias);
}}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "handleSetDot", 
function (dot, dotBias) {
var doc = this.component.getDocument ();
if (doc != null) {
dot = Math.min (dot, doc.getLength ());
}dot = Math.max (dot, 0);
if (dot == 0) dotBias = javax.swing.text.Position.Bias.Forward;
this.mark = dot;
if (this.dot != dot || this.dotBias !== dotBias || this.selectionTag != null || this.forceCaretPositionChange) {
this.changeCaretPosition (dot, dotBias);
}this.markBias = this.dotBias;
this.markLTR = this.dotLTR;
var h = this.component.getHighlighter ();
if ((h != null) && (this.selectionTag != null)) {
h.removeHighlight (this.selectionTag);
this.selectionTag = null;
}}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getDotBias", 
function () {
return this.dotBias;
});
Clazz.defineMethod (c$, "getMarkBias", 
function () {
return this.markBias;
});
Clazz.defineMethod (c$, "isDotLeftToRight", 
function () {
return this.dotLTR;
});
Clazz.defineMethod (c$, "isMarkLeftToRight", 
function () {
return this.markLTR;
});
Clazz.defineMethod (c$, "isPositionLTR", 
function (position, bias) {
var doc = this.component.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.AbstractDocument)) {
if (bias === javax.swing.text.Position.Bias.Backward && --position < 0) position = 0;
return (doc).isLeftToRight (position, position);
}return true;
}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "guessBiasForOffset", 
function (offset, lastBias, lastLTR) {
if (lastLTR != this.isPositionLTR (offset, lastBias)) {
lastBias = javax.swing.text.Position.Bias.Backward;
} else if (lastBias !== javax.swing.text.Position.Bias.Backward && lastLTR != this.isPositionLTR (offset, javax.swing.text.Position.Bias.Backward)) {
lastBias = javax.swing.text.Position.Bias.Backward;
}if (lastBias === javax.swing.text.Position.Bias.Backward && offset > 0) {
try {
var s =  new javax.swing.text.Segment ();
this.component.getDocument ().getText (offset - 1, 1, s);
if (s.count > 0 && s.array[s.offset] == '\n') {
lastBias = javax.swing.text.Position.Bias.Forward;
}} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
}return lastBias;
}, "~N,javax.swing.text.Position.Bias,~B");
Clazz.defineMethod (c$, "changeCaretPosition", 
function (dot, dotBias) {
this.repaint ();
this.dot = dot;
this.dotBias = dotBias;
this.dotLTR = this.isPositionLTR (dot, dotBias);
this.fireStateChanged ();
this.updateSystemSelection ();
this.setMagicCaretPosition (null);
var callRepaintNewCaret = ((Clazz.isClassDefined ("javax.swing.text.DefaultCaret$1") ? 0 : javax.swing.text.DefaultCaret.$DefaultCaret$1$ ()), Clazz.innerTypeInstance (javax.swing.text.DefaultCaret$1, this, null));
javax.swing.SwingUtilities.invokeLater (callRepaintNewCaret);
}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "repaintNewCaret", 
function () {
if (this.component != null) {
var mapper = this.component.getUI ();
var doc = this.component.getDocument ();
if ((mapper != null) && (doc != null)) {
var newLoc;
try {
newLoc = mapper.modelToView (this.component, this.dot, this.dotBias);
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
newLoc = null;
} else {
throw e;
}
}
if (newLoc != null) {
this.adjustVisibility (newLoc);
if (this.getMagicCaretPosition () == null) {
this.setMagicCaretPosition ( new java.awt.Point (newLoc.x, newLoc.y));
}}this.damage (newLoc);
}}});
Clazz.defineMethod (c$, "updateSystemSelection", 
 function () {
});
Clazz.defineMethod (c$, "ensureValidPosition", 
 function () {
var length = this.component.getDocument ().getLength ();
if (this.dot > length || this.mark > length) {
this.handleSetDot (length, javax.swing.text.Position.Bias.Forward);
}});
Clazz.overrideMethod (c$, "setMagicCaretPosition", 
function (p) {
this.magicCaretPosition = p;
}, "java.awt.Point");
Clazz.overrideMethod (c$, "getMagicCaretPosition", 
function () {
return this.magicCaretPosition;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
return (this === obj);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "Dot=(" + this.dot + ", " + this.dotBias + ")";
s += " Mark=(" + this.mark + ", " + this.markBias + ")";
return s;
});
Clazz.defineMethod (c$, "getFilterBypass", 
 function () {
if (this.filterBypass == null) {
this.filterBypass = Clazz.innerTypeInstance (javax.swing.text.DefaultCaret.DefaultFilterBypass, this, null);
}return this.filterBypass;
});
Clazz.defineMethod (c$, "_contains", 
 function (X, Y, W, H) {
var w = this.width;
var h = this.height;
if ((w | h | W | H) < 0) {
return false;
}var x = this.x;
var y = this.y;
if (X < x || Y < y) {
return false;
}if (W > 0) {
w += x;
W += X;
if (W <= X) {
if (w >= x || W > w) return false;
} else {
if (w >= x && W > w) return false;
}} else if ((x + w) < X) {
return false;
}if (H > 0) {
h += y;
H += Y;
if (H <= Y) {
if (h >= y || H > h) return false;
} else {
if (h >= y && H > h) return false;
}} else if ((y + h) < Y) {
return false;
}return true;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getCaretWidth", 
function (height) {
if (this.aspectRatio > -1) {
return Clazz.floatToInt (this.aspectRatio * height) + 1;
}if (this.caretWidth > -1) {
return this.caretWidth;
}return 1;
}, "~N");
c$.$DefaultCaret$SafeScroller$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultCaret, "SafeScroller", null, Runnable);
Clazz.makeConstructor (c$, 
function (a) {
this.r = a;
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["javax.swing.text.DefaultCaret"].component != null) {
this.b$["javax.swing.text.DefaultCaret"].component.scrollRectToVisible (this.r);
}});
c$ = Clazz.p0p ();
};
c$.$DefaultCaret$Handler$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultCaret, "Handler", null, [java.beans.PropertyChangeListener, javax.swing.event.DocumentListener, java.awt.event.ActionListener]);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
if (this.b$["javax.swing.text.DefaultCaret"].width == 0 || this.b$["javax.swing.text.DefaultCaret"].height == 0) {
if (this.b$["javax.swing.text.DefaultCaret"].component != null) {
var b = this.b$["javax.swing.text.DefaultCaret"].component.getUI ();
try {
var c = b.modelToView (this.b$["javax.swing.text.DefaultCaret"].component, this.b$["javax.swing.text.DefaultCaret"].dot, this.b$["javax.swing.text.DefaultCaret"].dotBias);
if (c != null && c.width != 0 && c.height != 0) {
this.b$["javax.swing.text.DefaultCaret"].damage (c);
}} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
}}this.b$["javax.swing.text.DefaultCaret"].visible = !this.b$["javax.swing.text.DefaultCaret"].visible;
this.b$["javax.swing.text.DefaultCaret"].repaint ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "insertUpdate", 
function (a) {
if (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 1 || (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 0 && !javax.swing.SwingUtilities.isEventDispatchThread ())) {
if ((a.getOffset () <= this.b$["javax.swing.text.DefaultCaret"].dot || a.getOffset () <= this.b$["javax.swing.text.DefaultCaret"].mark) && this.b$["javax.swing.text.DefaultCaret"].selectionTag != null) {
try {
this.b$["javax.swing.text.DefaultCaret"].component.getHighlighter ().changeHighlight (this.b$["javax.swing.text.DefaultCaret"].selectionTag, Math.min (this.b$["javax.swing.text.DefaultCaret"].dot, this.b$["javax.swing.text.DefaultCaret"].mark), Math.max (this.b$["javax.swing.text.DefaultCaret"].dot, this.b$["javax.swing.text.DefaultCaret"].mark));
} catch (e1) {
if (Clazz.exceptionOf (e1, javax.swing.text.BadLocationException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}return;
}var b = 0;
var c = a.getOffset ();
var d = a.getLength ();
var e = this.b$["javax.swing.text.DefaultCaret"].dot;
var f = 0;
if (Clazz.instanceOf (a, javax.swing.text.AbstractDocument.UndoRedoDocumentEvent)) {
this.b$["javax.swing.text.DefaultCaret"].setDot (c + d);
return;
}if (e >= c) {
e += d;
f |= 1;
}var g = this.b$["javax.swing.text.DefaultCaret"].mark;
if (g >= c) {
g += d;
f |= 2;
}if (f != 0) {
var h = this.b$["javax.swing.text.DefaultCaret"].dotBias;
if (this.b$["javax.swing.text.DefaultCaret"].dot == c) {
var i = this.b$["javax.swing.text.DefaultCaret"].component.getDocument ();
var j;
try {
var k =  new javax.swing.text.Segment ();
i.getText (e - 1, 1, k);
j = (k.count > 0 && k.array[k.offset] == '\n');
} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
j = false;
} else {
throw ble;
}
}
if (j) {
h = javax.swing.text.Position.Bias.Forward;
} else {
h = javax.swing.text.Position.Bias.Backward;
}}if (g == e) {
this.b$["javax.swing.text.DefaultCaret"].setDot (e, h);
this.b$["javax.swing.text.DefaultCaret"].ensureValidPosition ();
} else {
this.b$["javax.swing.text.DefaultCaret"].setDot (g, this.b$["javax.swing.text.DefaultCaret"].markBias);
if (this.b$["javax.swing.text.DefaultCaret"].getDot () == g) {
this.b$["javax.swing.text.DefaultCaret"].moveDot (e, h);
}this.b$["javax.swing.text.DefaultCaret"].ensureValidPosition ();
}}}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "removeUpdate", 
function (a) {
if (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 1 || (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 0 && !javax.swing.SwingUtilities.isEventDispatchThread ())) {
var b = this.b$["javax.swing.text.DefaultCaret"].component.getDocument ().getLength ();
this.b$["javax.swing.text.DefaultCaret"].dot = Math.min (this.b$["javax.swing.text.DefaultCaret"].dot, b);
this.b$["javax.swing.text.DefaultCaret"].mark = Math.min (this.b$["javax.swing.text.DefaultCaret"].mark, b);
if ((a.getOffset () < this.b$["javax.swing.text.DefaultCaret"].dot || a.getOffset () < this.b$["javax.swing.text.DefaultCaret"].mark) && this.b$["javax.swing.text.DefaultCaret"].selectionTag != null) {
try {
this.b$["javax.swing.text.DefaultCaret"].component.getHighlighter ().changeHighlight (this.b$["javax.swing.text.DefaultCaret"].selectionTag, Math.min (this.b$["javax.swing.text.DefaultCaret"].dot, this.b$["javax.swing.text.DefaultCaret"].mark), Math.max (this.b$["javax.swing.text.DefaultCaret"].dot, this.b$["javax.swing.text.DefaultCaret"].mark));
} catch (e1) {
if (Clazz.exceptionOf (e1, javax.swing.text.BadLocationException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}return;
}var b = a.getOffset ();
var c = b + a.getLength ();
var d = 0;
var e = this.b$["javax.swing.text.DefaultCaret"].dot;
var f = false;
var g = this.b$["javax.swing.text.DefaultCaret"].mark;
var h = false;
if (Clazz.instanceOf (a, javax.swing.text.AbstractDocument.UndoRedoDocumentEvent)) {
this.b$["javax.swing.text.DefaultCaret"].setDot (b);
return;
}if (e >= c) {
e -= (c - b);
if (e == c) {
f = true;
}} else if (e >= b) {
e = b;
f = true;
}if (g >= c) {
g -= (c - b);
if (g == c) {
h = true;
}} else if (g >= b) {
g = b;
h = true;
}if (g == e) {
this.b$["javax.swing.text.DefaultCaret"].forceCaretPositionChange = true;
try {
this.b$["javax.swing.text.DefaultCaret"].setDot (e, this.b$["javax.swing.text.DefaultCaret"].guessBiasForOffset (e, this.b$["javax.swing.text.DefaultCaret"].dotBias, this.b$["javax.swing.text.DefaultCaret"].dotLTR));
} finally {
this.b$["javax.swing.text.DefaultCaret"].forceCaretPositionChange = false;
}
this.b$["javax.swing.text.DefaultCaret"].ensureValidPosition ();
} else {
var i = this.b$["javax.swing.text.DefaultCaret"].dotBias;
var j = this.b$["javax.swing.text.DefaultCaret"].markBias;
if (f) {
i = this.b$["javax.swing.text.DefaultCaret"].guessBiasForOffset (e, i, this.b$["javax.swing.text.DefaultCaret"].dotLTR);
}if (h) {
j = this.b$["javax.swing.text.DefaultCaret"].guessBiasForOffset (this.b$["javax.swing.text.DefaultCaret"].mark, j, this.b$["javax.swing.text.DefaultCaret"].markLTR);
}this.b$["javax.swing.text.DefaultCaret"].setDot (g, j);
if (this.b$["javax.swing.text.DefaultCaret"].getDot () == g) {
this.b$["javax.swing.text.DefaultCaret"].moveDot (e, i);
}this.b$["javax.swing.text.DefaultCaret"].ensureValidPosition ();
}}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "changedUpdate", 
function (a) {
if (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 1 || (this.b$["javax.swing.text.DefaultCaret"].getUpdatePolicy () == 0 && !javax.swing.SwingUtilities.isEventDispatchThread ())) {
return;
}if (Clazz.instanceOf (a, javax.swing.text.AbstractDocument.UndoRedoDocumentEvent)) {
this.b$["javax.swing.text.DefaultCaret"].setDot (a.getOffset () + a.getLength ());
}}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getOldValue ();
var c = a.getNewValue ();
if ((Clazz.instanceOf (b, javax.swing.text.Document)) || (Clazz.instanceOf (c, javax.swing.text.Document))) {
this.b$["javax.swing.text.DefaultCaret"].setDot (0);
if (b != null) {
(b).removeDocumentListener (this);
}if (c != null) {
(c).addDocumentListener (this);
}} else if ("enabled".equals (a.getPropertyName ())) {
var d = a.getNewValue ();
if (this.b$["javax.swing.text.DefaultCaret"].component.isFocusOwner ()) {
if (d === Boolean.TRUE) {
if (this.b$["javax.swing.text.DefaultCaret"].component.isEditable ()) {
this.b$["javax.swing.text.DefaultCaret"].setVisible (true);
}this.b$["javax.swing.text.DefaultCaret"].setSelectionVisible (true);
} else {
this.b$["javax.swing.text.DefaultCaret"].setVisible (false);
this.b$["javax.swing.text.DefaultCaret"].setSelectionVisible (false);
}}} else if ("caretWidth".equals (a.getPropertyName ())) {
var d = a.getNewValue ();
if (d != null) {
this.b$["javax.swing.text.DefaultCaret"].caretWidth = d.intValue ();
} else {
this.b$["javax.swing.text.DefaultCaret"].caretWidth = -1;
}this.b$["javax.swing.text.DefaultCaret"].repaint ();
} else if ("caretAspectRatio".equals (a.getPropertyName ())) {
var d = a.getNewValue ();
if (d != null) {
this.b$["javax.swing.text.DefaultCaret"].aspectRatio = d.floatValue ();
} else {
this.b$["javax.swing.text.DefaultCaret"].aspectRatio = -1;
}this.b$["javax.swing.text.DefaultCaret"].repaint ();
}}, "java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$.$DefaultCaret$DefaultFilterBypass$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultCaret, "DefaultFilterBypass", javax.swing.text.NavigationFilter.FilterBypass);
Clazz.overrideMethod (c$, "getCaret", 
function () {
return this.b$["javax.swing.text.DefaultCaret"];
});
Clazz.overrideMethod (c$, "setDot", 
function (a, b) {
this.b$["javax.swing.text.DefaultCaret"].handleSetDot (a, b);
}, "~N,javax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "moveDot", 
function (a, b) {
this.b$["javax.swing.text.DefaultCaret"].handleMoveDot (a, b);
}, "~N,javax.swing.text.Position.Bias");
c$ = Clazz.p0p ();
};
c$.$DefaultCaret$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing.text, "DefaultCaret$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["javax.swing.text.DefaultCaret"].repaintNewCaret ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"UPDATE_WHEN_ON_EDT", 0,
"NEVER_UPDATE", 1,
"ALWAYS_UPDATE", 2,
"$selectWord", null,
"selectLine", null);
});
