Clazz.declarePackage ("javax.swing.text");
Clazz.load (["java.awt.event.FocusListener", "$.MouseListener", "javax.swing.ActionMap", "$.InputMap", "$.JComponent", "$.Scrollable", "javax.swing.event.CaretEvent", "$.ChangeListener", "javax.swing.text.Keymap", "javax.swing.DropMode"], "javax.swing.text.JTextComponent", ["java.io.IOException", "java.lang.Boolean", "$.Character", "$.IllegalArgumentException", "java.util.HashMap", "$.Hashtable", "$.Vector", "java.awt.Point", "javax.swing.Action", "$.JViewport", "javax.swing.event.CaretListener", "javax.swing.text.DefaultEditorKit", "$.JSMinimalAbstractDocument", "sun.awt.AppContext", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.caret = null;
this.navigationFilter = null;
this.highlighter = null;
this.keymap = null;
this.caretEvent = null;
this.caretColor = null;
this.selectionColor = null;
this.selectedTextColor = null;
this.disabledTextColor = null;
this.editable = false;
this.margin = null;
this.focusAccelerator = '\0';
this.dragEnabled = false;
this.dropMode = null;
this.composedTextAttribute = null;
this.composedTextContent = null;
this.composedTextStart = null;
this.composedTextEnd = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "JTextComponent", javax.swing.JComponent, javax.swing.Scrollable);
Clazz.prepareFields (c$, function () {
this.dropMode = javax.swing.DropMode.USE_SELECTION;
});
Clazz.makeConstructor (c$, 
function () {
this.construct ("JSComponentUI");
});
Clazz.makeConstructor (c$, 
function (uid) {
Clazz.superConstructor (this, javax.swing.text.JTextComponent);
this.enableEvents (2056);
this.caretEvent =  new javax.swing.text.JTextComponent.MutableCaretEvent (this);
this.addMouseListener (this.caretEvent);
this.addFocusListener (this.caretEvent);
this.setEditable (true);
this.setDragEnabled (false);
this.setLayout (null);
this.uiClassID = uid;
this.updateUI ();
}, "~S");
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.text.JTextComponent, "updateUI", []);
this.invalidate ();
});
Clazz.defineMethod (c$, "addCaretListener", 
function (listener) {
this.listenerList.add (javax.swing.event.CaretListener, listener);
}, "javax.swing.event.CaretListener");
Clazz.defineMethod (c$, "removeCaretListener", 
function (listener) {
this.listenerList.remove (javax.swing.event.CaretListener, listener);
}, "javax.swing.event.CaretListener");
Clazz.defineMethod (c$, "getCaretListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.CaretListener);
});
Clazz.defineMethod (c$, "fireCaretUpdate", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.CaretListener) {
(listeners[i + 1]).caretUpdate (e);
}}
}, "javax.swing.event.CaretEvent");
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
var old = this.model;
try {
this.model = doc;
this.firePropertyChangeObject ("document", old, doc);
} finally {
}
this.revalidate ();
this.repaint ();
}, "javax.swing.text.Document");
Clazz.defineMethod (c$, "getDocument", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "getActions", 
function () {
if (this.getUI () == null) return null;
return (this.getUI ()).getEditorKit (this).getActions ();
});
Clazz.defineMethod (c$, "setMargin", 
function (m) {
var old = this.margin;
this.margin = m;
this.firePropertyChangeObject ("margin", old, m);
this.invalidate ();
}, "java.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
return this.margin;
});
Clazz.defineMethod (c$, "setNavigationFilter", 
function (filter) {
this.navigationFilter = filter;
}, "javax.swing.text.NavigationFilter");
Clazz.defineMethod (c$, "getNavigationFilter", 
function () {
return this.navigationFilter;
});
Clazz.defineMethod (c$, "getCaret", 
function () {
return this.caret;
});
Clazz.defineMethod (c$, "setCaret", 
function (c) {
if (this.caret != null) {
this.caret.removeChangeListener (this.caretEvent);
this.caret.deinstall (this);
}var old = this.caret;
this.caret = c;
if (this.caret != null) {
this.caret.install (this);
this.caret.addChangeListener (this.caretEvent);
}this.firePropertyChangeObject ("caret", old, this.caret);
}, "javax.swing.text.Caret");
Clazz.defineMethod (c$, "getHighlighter", 
function () {
return this.highlighter;
});
Clazz.defineMethod (c$, "setHighlighter", 
function (h) {
if (this.highlighter != null) {
this.highlighter.deinstall (this);
}var old = this.highlighter;
this.highlighter = h;
if (this.highlighter != null) {
this.highlighter.install (this);
}this.firePropertyChangeObject ("highlighter", old, h);
}, "javax.swing.text.Highlighter");
Clazz.defineMethod (c$, "setKeymap", 
function (map) {
var old = this.keymap;
this.keymap = map;
this.firePropertyChangeObject ("keymap", old, this.keymap);
this.updateInputMap (old, map);
}, "javax.swing.text.Keymap");
Clazz.defineMethod (c$, "setDragEnabled", 
function (b) {
this.dragEnabled = b;
}, "~B");
Clazz.defineMethod (c$, "getDragEnabled", 
function () {
return this.dragEnabled;
});
Clazz.defineMethod (c$, "setDropMode", 
function (dropMode) {
if (dropMode != null) {
switch (dropMode) {
case javax.swing.DropMode.USE_SELECTION:
case javax.swing.DropMode.INSERT:
this.dropMode = dropMode;
return;
}
}throw  new IllegalArgumentException (dropMode + ": Unsupported drop mode for text");
}, "javax.swing.DropMode");
Clazz.defineMethod (c$, "getDropMode", 
function () {
return this.dropMode;
});
Clazz.defineMethod (c$, "updateInputMap", 
function (oldKm, newKm) {
var km = this.getInputMap (0);
var last = km;
while (km != null && !(Clazz.instanceOf (km, javax.swing.text.JTextComponent.KeymapWrapper))) {
last = km;
km = km.getParent ();
}
if (km != null) {
if (newKm == null) {
if (last !== km) {
last.setParent (km.getParent ());
} else {
last.setParent (null);
}} else {
var newKM =  new javax.swing.text.JTextComponent.KeymapWrapper (newKm);
last.setParent (newKM);
if (last !== km) {
newKM.setParent (km.getParent ());
}}} else if (newKm != null) {
km = this.getInputMap (0);
if (km != null) {
var newKM =  new javax.swing.text.JTextComponent.KeymapWrapper (newKm);
newKM.setParent (km.getParent ());
km.setParent (newKM);
}}var am = this.getActionMap ();
var lastAM = am;
while (am != null && !(Clazz.instanceOf (am, javax.swing.text.JTextComponent.KeymapActionMap))) {
lastAM = am;
am = am.getParent ();
}
if (am != null) {
if (newKm == null) {
if (lastAM !== am) {
lastAM.setParent (am.getParent ());
} else {
lastAM.setParent (null);
}} else {
var newAM =  new javax.swing.text.JTextComponent.KeymapActionMap (newKm);
lastAM.setParent (newAM);
if (lastAM !== am) {
newAM.setParent (am.getParent ());
}}} else if (newKm != null) {
am = this.getActionMap ();
if (am != null) {
var newAM =  new javax.swing.text.JTextComponent.KeymapActionMap (newKm);
newAM.setParent (am.getParent ());
am.setParent (newAM);
}}}, "javax.swing.text.Keymap,javax.swing.text.Keymap");
Clazz.defineMethod (c$, "getKeymap", 
function () {
return this.keymap;
});
c$.addKeymap = Clazz.defineMethod (c$, "addKeymap", 
function (nm, parent) {
var map =  new javax.swing.text.JTextComponent.DefaultKeymap (nm, parent);
if (nm != null) {
javax.swing.text.JTextComponent.getKeymapTable ().put (nm, map);
}return map;
}, "~S,javax.swing.text.Keymap");
c$.removeKeymap = Clazz.defineMethod (c$, "removeKeymap", 
function (nm) {
return javax.swing.text.JTextComponent.getKeymapTable ().remove (nm);
}, "~S");
c$.getKeymap = Clazz.defineMethod (c$, "getKeymap", 
function (nm) {
return javax.swing.text.JTextComponent.getKeymapTable ().get (nm);
}, "~S");
c$.getKeymapTable = Clazz.defineMethod (c$, "getKeymapTable", 
 function () {
{
var appContext = sun.awt.AppContext.getAppContext ();
var keymapTable = appContext.get (javax.swing.text.JTextComponent.KEYMAP_TABLE);
if (keymapTable == null) {
keymapTable =  new java.util.HashMap (17);
appContext.put (javax.swing.text.JTextComponent.KEYMAP_TABLE, keymapTable);
var binding = javax.swing.text.JTextComponent.addKeymap ("default", null);
binding.setDefaultAction ( new javax.swing.text.DefaultEditorKit.DefaultKeyTypedAction ());
}return keymapTable;
}});
c$.loadKeymap = Clazz.defineMethod (c$, "loadKeymap", 
function (map, bindings, actions) {
var h =  new java.util.Hashtable ();
for (var i = 0; i < actions.length; i++) {
var a = actions[i];
var value = a.getValue ("Name");
h.put ((value != null ? value : ""), a);
}
for (var i = 0; i < bindings.length; i++) {
var a = h.get (bindings[i].actionName);
if (a != null) {
map.addActionForKeyStroke (bindings[i].key, a);
}}
}, "javax.swing.text.Keymap,~A,~A");
Clazz.defineMethod (c$, "getCaretColor", 
function () {
return this.caretColor;
});
Clazz.defineMethod (c$, "setCaretColor", 
function (c) {
var old = this.caretColor;
this.caretColor = c;
this.firePropertyChangeObject ("caretColor", old, this.caretColor);
}, "java.awt.Color");
Clazz.defineMethod (c$, "getSelectionColor", 
function () {
return this.selectionColor;
});
Clazz.defineMethod (c$, "setSelectionColor", 
function (c) {
var old = this.selectionColor;
this.selectionColor = c;
this.firePropertyChangeObject ("selectionColor", old, this.selectionColor);
}, "java.awt.Color");
Clazz.defineMethod (c$, "getSelectedTextColor", 
function () {
return this.selectedTextColor;
});
Clazz.defineMethod (c$, "setSelectedTextColor", 
function (c) {
var old = this.selectedTextColor;
this.selectedTextColor = c;
this.firePropertyChangeObject ("selectedTextColor", old, this.selectedTextColor);
}, "java.awt.Color");
Clazz.defineMethod (c$, "getDisabledTextColor", 
function () {
return this.disabledTextColor;
});
Clazz.defineMethod (c$, "setDisabledTextColor", 
function (c) {
var old = this.disabledTextColor;
this.disabledTextColor = c;
this.firePropertyChangeObject ("disabledTextColor", old, this.disabledTextColor);
}, "java.awt.Color");
Clazz.defineMethod (c$, "replaceSelection", 
function (content) {
var doc = this.getDocument ();
if (doc != null) {
try {
var composedTextSaved = this.saveComposedText (this.caret.getDot ());
var p0 = Math.min (this.caret.getDot (), this.caret.getMark ());
var p1 = Math.max (this.caret.getDot (), this.caret.getMark ());
if (Clazz.instanceOf (doc, javax.swing.text.JSMinimalAbstractDocument)) {
(doc).replace (p0, p1 - p0, content, null);
} else {
if (p0 != p1) {
doc.remove (p0, p1 - p0);
}if (content != null && content.length > 0) {
doc.insertString (p0, content, null);
}}if (composedTextSaved) {
this.restoreComposedText ();
}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
swingjs.JSToolkit.alert ("SWINGJS BAD LOCATION EXCEPTION (replace):" + e.getMessage () + swingjs.JSToolkit.getStackTrace (-10));
} else {
throw e;
}
}
}}, "~S");
Clazz.defineMethod (c$, "getText", 
function (offs, len) {
return this.getDocument ().getText (offs, len);
}, "~N,~N");
Clazz.defineMethod (c$, "modelToView", 
function (pos) {
return (this.getUI ()).modelToView (this, pos);
}, "~N");
Clazz.defineMethod (c$, "viewToModel", 
function (pt) {
return (this.getUI ()).viewToModel (this, pt);
}, "java.awt.Point");
Clazz.defineMethod (c$, "cut", 
function () {
});
Clazz.defineMethod (c$, "copy", 
function () {
});
Clazz.defineMethod (c$, "paste", 
function () {
});
Clazz.defineMethod (c$, "moveCaretPosition", 
function (pos) {
var doc = this.getDocument ();
if (doc != null) {
if (pos > doc.getLength () || pos < 0) {
throw  new IllegalArgumentException ("bad position: " + pos);
}this.caret.moveDot (pos);
}}, "~N");
Clazz.defineMethod (c$, "setFocusAccelerator", 
function (aKey) {
aKey = Character.toUpperCase (aKey);
var old = this.focusAccelerator;
this.focusAccelerator = aKey;
this.firePropertyChange ("focusAcceleratorKey", old, this.focusAccelerator);
this.firePropertyChange ("focusAccelerator", old, this.focusAccelerator);
}, "~S");
Clazz.defineMethod (c$, "getFocusAccelerator", 
function () {
return this.focusAccelerator;
});
Clazz.defineMethod (c$, "read", 
function ($in, desc) {
var kit = (this.getUI ()).getEditorKit (this);
var doc = kit.createDefaultDocument ();
if (desc != null) {
doc.putProperty ("stream", desc);
}try {
kit.read ($in, doc, 0);
this.setDocument (doc);
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "java.io.Reader,~O");
Clazz.defineMethod (c$, "write", 
function (out) {
var doc = this.getDocument ();
try {
(this.getUI ()).getEditorKit (this).write (out, doc, 0, doc.getLength ());
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "java.io.Writer");
Clazz.defineMethod (c$, "removeNotify", 
function () {
Clazz.superCall (this, javax.swing.text.JTextComponent, "removeNotify", []);
if (javax.swing.text.JTextComponent.getFocusedComponent () === this) {
sun.awt.AppContext.getAppContext ().remove (javax.swing.text.JTextComponent.FOCUSED_COMPONENT);
}});
Clazz.defineMethod (c$, "setCaretPosition", 
function (position) {
var doc = this.getDocument ();
if (doc != null) {
if (position > doc.getLength () || position < 0) {
throw  new IllegalArgumentException ("bad position: " + position);
}this.caret.setDot (position);
}}, "~N");
Clazz.defineMethod (c$, "getCaretPosition", 
function () {
return this.caret.getDot ();
});
Clazz.defineMethod (c$, "setText", 
function (t) {
try {
var doc = this.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.JSMinimalAbstractDocument)) {
(doc).replace (0, doc.getLength (), t, null);
} else {
doc.remove (0, doc.getLength ());
doc.insertString (0, t, null);
}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
swingjs.JSToolkit.alert ("SWINGJS BAD LOCATION EXCEPTION (setText):" + e.getMessage () + swingjs.JSToolkit.getStackTrace (-10));
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getText", 
function () {
var doc = this.getDocument ();
var txt;
try {
txt = doc.getText (0, doc.getLength ());
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
txt = null;
} else {
throw e;
}
}
return txt;
});
Clazz.defineMethod (c$, "getSelectedText", 
function () {
var txt = null;
var p0 = Math.min (this.caret.getDot (), this.caret.getMark ());
var p1 = Math.max (this.caret.getDot (), this.caret.getMark ());
if (p0 != p1) {
try {
var doc = this.getDocument ();
txt = doc.getText (p0, p1 - p0);
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new IllegalArgumentException (e.getMessage ());
} else {
throw e;
}
}
}return txt;
});
Clazz.defineMethod (c$, "isEditable", 
function () {
return this.editable;
});
Clazz.defineMethod (c$, "setEditable", 
function (b) {
if (b != this.editable) {
var oldVal = this.editable;
this.editable = b;
this.firePropertyChangeObject ("editable", Boolean.$valueOf (oldVal), Boolean.$valueOf (this.editable));
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getSelectionStart", 
function () {
var start = Math.min (this.caret.getDot (), this.caret.getMark ());
return start;
});
Clazz.defineMethod (c$, "setSelectionStart", 
function (selectionStart) {
this.select (selectionStart, this.getSelectionEnd ());
}, "~N");
Clazz.defineMethod (c$, "getSelectionEnd", 
function () {
var end = Math.max (this.caret.getDot (), this.caret.getMark ());
return end;
});
Clazz.defineMethod (c$, "setSelectionEnd", 
function (selectionEnd) {
this.select (this.getSelectionStart (), selectionEnd);
}, "~N");
Clazz.defineMethod (c$, "select", 
function (selectionStart, selectionEnd) {
var docLength = this.getDocument ().getLength ();
if (selectionStart < 0) {
selectionStart = 0;
}if (selectionStart > docLength) {
selectionStart = docLength;
}if (selectionEnd > docLength) {
selectionEnd = docLength;
}if (selectionEnd < selectionStart) {
selectionEnd = selectionStart;
}this.setCaretPosition (selectionStart);
this.moveCaretPosition (selectionEnd);
}, "~N,~N");
Clazz.defineMethod (c$, "selectAll", 
function () {
var doc = this.getDocument ();
if (doc != null) {
this.setCaretPosition (0);
this.moveCaretPosition (doc.getLength ());
}});
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
var retValue = Clazz.superCall (this, javax.swing.text.JTextComponent, "getToolTipText", [event]);
if (retValue == null) {
var ui = (this.getUI ());
if (ui != null) {
retValue = ui.getToolTipText (this,  new java.awt.Point (event.getX (), event.getY ()));
}}return retValue;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "getPreferredScrollableViewportSize", 
function () {
return this.getPreferredSize ();
});
Clazz.overrideMethod (c$, "getScrollableUnitIncrement", 
function (visibleRect, orientation, direction) {
switch (orientation) {
case 1:
return Clazz.doubleToInt (visibleRect.height / 10);
case 0:
return Clazz.doubleToInt (visibleRect.width / 10);
default:
throw  new IllegalArgumentException ("Invalid orientation: " + orientation);
}
}, "java.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableBlockIncrement", 
function (visibleRect, orientation, direction) {
switch (orientation) {
case 1:
return visibleRect.height;
case 0:
return visibleRect.width;
default:
throw  new IllegalArgumentException ("Invalid orientation: " + orientation);
}
}, "java.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableTracksViewportWidth", 
function () {
if (Clazz.instanceOf (this.getParent (), javax.swing.JViewport)) {
return ((this.getParent ()).getWidth () > this.getPreferredSize ().width);
}return false;
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportHeight", 
function () {
if (Clazz.instanceOf (this.getParent (), javax.swing.JViewport)) {
return ((this.getParent ()).getHeight () > this.getPreferredSize ().height);
}return false;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var editableString = (this.editable ? "true" : "false");
var caretColorString = (this.caretColor != null ? this.caretColor.toString () : "");
var selectionColorString = (this.selectionColor != null ? this.selectionColor.toString () : "");
var selectedTextColorString = (this.selectedTextColor != null ? this.selectedTextColor.toString () : "");
var disabledTextColorString = (this.disabledTextColor != null ? this.disabledTextColor.toString () : "");
var marginString = (this.margin != null ? this.margin.toString () : "");
return Clazz.superCall (this, javax.swing.text.JTextComponent, "paramString", []) + ",caretColor=" + caretColorString + ",disabledTextColor=" + disabledTextColorString + ",editable=" + editableString + ",margin=" + marginString + ",selectedTextColor=" + selectedTextColorString + ",selectionColor=" + selectionColorString;
});
c$.getFocusedComponent = Clazz.defineMethod (c$, "getFocusedComponent", 
function () {
return sun.awt.AppContext.getAppContext ().get (javax.swing.text.JTextComponent.FOCUSED_COMPONENT);
});
Clazz.defineMethod (c$, "addInputMethodListener", 
function (l) {
Clazz.superCall (this, javax.swing.text.JTextComponent, "addInputMethodListener", [l]);
if (l != null) {
}}, "java.awt.event.InputMethodListener");
Clazz.defineMethod (c$, "saveComposedText", 
 function (pos) {
if (this.composedTextExists ()) {
var start = this.composedTextStart.getOffset ();
var len = this.composedTextEnd.getOffset () - this.composedTextStart.getOffset ();
if (pos >= start && pos <= start + len) {
try {
this.getDocument ().remove (start, len);
return true;
} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
}}return false;
}, "~N");
Clazz.defineMethod (c$, "restoreComposedText", 
 function () {
var doc = this.getDocument ();
try {
doc.insertString (this.caret.getDot (), this.composedTextContent, this.composedTextAttribute);
this.composedTextStart = doc.createPosition (this.caret.getDot () - this.composedTextContent.length);
this.composedTextEnd = doc.createPosition (this.caret.getDot ());
} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
} else {
throw ble;
}
}
});
Clazz.defineMethod (c$, "composedTextExists", 
function () {
return (this.composedTextStart != null);
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.actionName = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.JTextComponent, "KeyBinding");
Clazz.makeConstructor (c$, 
function (a, b) {
this.key = a;
this.actionName = b;
}, "javax.swing.KeyStroke,~S");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.nm = null;
this.parent = null;
this.bindings = null;
this.defaultAction = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.JTextComponent, "DefaultKeymap", null, javax.swing.text.Keymap);
Clazz.makeConstructor (c$, 
function (a, b) {
this.nm = a;
this.parent = b;
this.bindings =  new java.util.Hashtable ();
}, "~S,javax.swing.text.Keymap");
Clazz.defineMethod (c$, "getDefaultAction", 
function () {
if (this.defaultAction != null) {
return this.defaultAction;
}return (this.parent != null) ? this.parent.getDefaultAction () : null;
});
Clazz.overrideMethod (c$, "setDefaultAction", 
function (a) {
this.defaultAction = a;
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "getName", 
function () {
return this.nm;
});
Clazz.defineMethod (c$, "getAction", 
function (a) {
var b = this.bindings.get (a);
if ((b == null) && (this.parent != null)) {
b = this.parent.getAction (a);
}return b;
}, "javax.swing.KeyStroke");
Clazz.overrideMethod (c$, "getBoundKeyStrokes", 
function () {
var a =  new Array (this.bindings.size ());
var b = 0;
for (var c = this.bindings.keys (); c.hasMoreElements (); ) {
a[b++] = c.nextElement ();
}
return a;
});
Clazz.overrideMethod (c$, "getBoundActions", 
function () {
var a =  new Array (this.bindings.size ());
var b = 0;
for (var c = this.bindings.elements (); c.hasMoreElements (); ) {
a[b++] = c.nextElement ();
}
return a;
});
Clazz.defineMethod (c$, "getKeyStrokesForAction", 
function (a) {
if (a == null) {
return null;
}var b = null;
var c = null;
for (var d = this.bindings.keys (); d.hasMoreElements (); ) {
var e = d.nextElement ();
if (this.bindings.get (e) === a) {
if (c == null) {
c =  new java.util.Vector ();
}c.addElement (e);
}}
if (this.parent != null) {
var e = this.parent.getKeyStrokesForAction (a);
if (e != null) {
var f = 0;
for (var g = e.length - 1; g >= 0; g--) {
if (this.isLocallyDefined (e[g])) {
e[g] = null;
f++;
}}
if (f > 0 && f < e.length) {
if (c == null) {
c =  new java.util.Vector ();
}for (var h = e.length - 1; h >= 0; h--) {
if (e[h] != null) {
c.addElement (e[h]);
}}
} else if (f == 0) {
if (c == null) {
b = e;
} else {
b =  new Array (c.size () + e.length);
c.copyInto (b);
System.arraycopy (e, 0, b, c.size (), e.length);
c = null;
}}}}if (c != null) {
b =  new Array (c.size ());
c.copyInto (b);
}return b;
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "isLocallyDefined", 
function (a) {
return this.bindings.containsKey (a);
}, "javax.swing.KeyStroke");
Clazz.overrideMethod (c$, "addActionForKeyStroke", 
function (a, b) {
this.bindings.put (a, b);
}, "javax.swing.KeyStroke,javax.swing.Action");
Clazz.overrideMethod (c$, "removeKeyStrokeBinding", 
function (a) {
this.bindings.remove (a);
}, "javax.swing.KeyStroke");
Clazz.overrideMethod (c$, "removeBindings", 
function () {
this.bindings.clear ();
});
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "setResolveParent", 
function (a) {
this.parent = a;
}, "javax.swing.text.Keymap");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Keymap[" + this.nm + "]" + this.bindings;
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.keymap = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.JTextComponent, "KeymapWrapper", javax.swing.InputMap);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.text.JTextComponent.KeymapWrapper, []);
this.keymap = a;
}, "javax.swing.text.Keymap");
Clazz.defineMethod (c$, "keys", 
function () {
var a = Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapWrapper, "keys", []);
var b = this.keymap.getBoundKeyStrokes ();
var c = (a == null) ? 0 : a.length;
var d = (b == null) ? 0 : b.length;
if (c == 0) {
return b;
}if (d == 0) {
return a;
}var e =  new Array (c + d);
System.arraycopy (a, 0, e, 0, c);
System.arraycopy (b, 0, e, c, d);
return e;
});
Clazz.defineMethod (c$, "size", 
function () {
var a = this.keymap.getBoundKeyStrokes ();
var b = (a == null) ? 0 : a.length;
return Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapWrapper, "size", []) + b;
});
Clazz.defineMethod (c$, "get", 
function (a) {
var b = this.keymap.getAction (a);
if (b == null) {
b = Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapWrapper, "get", [a]);
if (b == null && a.getKeyChar () != '\uffff' && this.keymap.getDefaultAction () != null) {
b = javax.swing.text.JTextComponent.KeymapWrapper.DefaultActionKey;
}}return b;
}, "javax.swing.KeyStroke");
c$.DefaultActionKey = c$.prototype.DefaultActionKey =  new Clazz._O ();
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.keymap = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.JTextComponent, "KeymapActionMap", javax.swing.ActionMap);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.text.JTextComponent.KeymapActionMap, []);
this.keymap = a;
}, "javax.swing.text.Keymap");
Clazz.defineMethod (c$, "keys", 
function () {
var a = Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapActionMap, "keys", []);
var b = this.keymap.getBoundActions ();
var c = (a == null) ? 0 : a.length;
var d = (b == null) ? 0 : b.length;
var e = (this.keymap.getDefaultAction () != null);
if (e) {
d++;
}if (c == 0) {
if (e) {
var f =  new Array (d);
if (d > 1) {
System.arraycopy (b, 0, f, 0, d - 1);
}f[d - 1] = javax.swing.text.JTextComponent.KeymapWrapper.DefaultActionKey;
return f;
}return b;
}if (d == 0) {
return a;
}var f =  new Array (c + d);
System.arraycopy (a, 0, f, 0, c);
if (e) {
if (d > 1) {
System.arraycopy (b, 0, f, c, d - 1);
}f[c + d - 1] = javax.swing.text.JTextComponent.KeymapWrapper.DefaultActionKey;
} else {
System.arraycopy (b, 0, f, c, d);
}return f;
});
Clazz.defineMethod (c$, "size", 
function () {
var a = this.keymap.getBoundActions ();
var b = (a == null) ? 0 : a.length;
if (this.keymap.getDefaultAction () != null) {
b++;
}return Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapActionMap, "size", []) + b;
});
Clazz.defineMethod (c$, "get", 
function (a) {
var b = Clazz.superCall (this, javax.swing.text.JTextComponent.KeymapActionMap, "get", [a]);
if (b == null) {
if (a === javax.swing.text.JTextComponent.KeymapWrapper.DefaultActionKey) {
b = this.keymap.getDefaultAction ();
} else if (Clazz.instanceOf (a, javax.swing.Action)) {
b = a;
}}return b;
}, "~O");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.dragActive = false;
this.dot = 0;
this.mark = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.JTextComponent, "MutableCaretEvent", javax.swing.event.CaretEvent, [javax.swing.event.ChangeListener, java.awt.event.FocusListener, java.awt.event.MouseListener]);
Clazz.defineMethod (c$, "fire", 
function () {
var a = this.getSource ();
if (a != null) {
var b = a.getCaret ();
if (b != null) {
this.dot = b.getDot ();
this.mark = b.getMark ();
a.fireCaretUpdate (this);
}}});
Clazz.overrideMethod (c$, "toString", 
function () {
return "dot=" + this.dot + "," + "mark=" + this.mark;
});
Clazz.overrideMethod (c$, "getDot", 
function () {
return this.dot;
});
Clazz.overrideMethod (c$, "getMark", 
function () {
return this.mark;
});
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
if (!this.dragActive) {
this.fire ();
}}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "focusGained", 
function (a) {
sun.awt.AppContext.getAppContext ().put (javax.swing.text.JTextComponent.FOCUSED_COMPONENT, a.getSource ());
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (a) {
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (a) {
this.dragActive = true;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (a) {
this.dragActive = false;
this.fire ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (a) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (a) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (a) {
}, "java.awt.event.MouseEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"FOCUS_ACCELERATOR_KEY", "focusAcceleratorKey");
c$.KEYMAP_TABLE = c$.prototype.KEYMAP_TABLE =  new Clazz._O ();
c$.FOCUSED_COMPONENT = c$.prototype.FOCUSED_COMPONENT =  new Clazz._O ();
Clazz.defineStatics (c$,
"DEFAULT_KEYMAP", "default");
});
