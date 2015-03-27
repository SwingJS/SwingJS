Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjava.beans.PropertyChangeListener", "jsjavax.swing.event.CaretListener", "jsjavax.swing.text.DefaultEditorKit", "$.TextAction", "$.ViewFactory"], "jsjavax.swing.text.StyledEditorKit", ["java.lang.IllegalArgumentException", "jsjava.awt.Color", "jsjavax.swing.JEditorPane", "$.UIManager", "jsjavax.swing.text.BoxView", "$.ComponentView", "$.DefaultStyledDocument", "$.Document", "$.IconView", "$.JTextComponent", "$.LabelView", "$.ParagraphView", "$.SimpleAttributeSet", "$.StyleConstants", "$.StyledDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentRun = null;
this.currentParagraph = null;
this.inputAttributes = null;
this.inputAttributeUpdater = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.StyledEditorKit.AttributeTracker")) {
jsjavax.swing.text.StyledEditorKit.$StyledEditorKit$AttributeTracker$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "StyledEditorKit", jsjavax.swing.text.DefaultEditorKit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit, []);
this.createInputAttributeUpdated ();
this.createInputAttributes ();
});
Clazz.overrideMethod (c$, "getInputAttributes", 
function () {
return this.inputAttributes;
});
Clazz.defineMethod (c$, "getCharacterAttributeRun", 
function () {
return this.currentRun;
});
Clazz.defineMethod (c$, "getActions", 
function () {
return jsjavax.swing.text.TextAction.augmentList (Clazz.superCall (this, jsjavax.swing.text.StyledEditorKit, "getActions", []), jsjavax.swing.text.StyledEditorKit.$defaultActions);
});
Clazz.overrideMethod (c$, "createDefaultDocument", 
function () {
return  new jsjavax.swing.text.DefaultStyledDocument ();
});
Clazz.overrideMethod (c$, "install", 
function (c) {
c.addCaretListener (this.inputAttributeUpdater);
c.addPropertyChangeListener (this.inputAttributeUpdater);
var caret = c.getCaret ();
if (caret != null) {
this.inputAttributeUpdater.updateInputAttributes (caret.getDot (), caret.getMark (), c);
}}, "jsjavax.swing.JEditorPane");
Clazz.overrideMethod (c$, "deinstall", 
function (c) {
c.removeCaretListener (this.inputAttributeUpdater);
c.removePropertyChangeListener (this.inputAttributeUpdater);
this.currentRun = null;
this.currentParagraph = null;
}, "jsjavax.swing.JEditorPane");
Clazz.overrideMethod (c$, "getViewFactory", 
function () {
return jsjavax.swing.text.StyledEditorKit.defaultFactory;
});
Clazz.defineMethod (c$, "clone", 
function () {
var o = Clazz.superCall (this, jsjavax.swing.text.StyledEditorKit, "clone", []);
o.currentRun = o.currentParagraph = null;
o.createInputAttributeUpdated ();
o.createInputAttributes ();
return o;
});
Clazz.defineMethod (c$, "createInputAttributes", 
($fz = function () {
this.inputAttributes = ((Clazz.isClassDefined ("jsjavax.swing.text.StyledEditorKit$1") ? 0 : jsjavax.swing.text.StyledEditorKit.$StyledEditorKit$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.text.StyledEditorKit$1, this, null));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createInputAttributeUpdated", 
($fz = function () {
this.inputAttributeUpdater = Clazz.innerTypeInstance (jsjavax.swing.text.StyledEditorKit.AttributeTracker, this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createInputAttributes", 
function (element, set) {
if (element.getAttributes ().getAttributeCount () > 0 || element.getEndOffset () - element.getStartOffset () > 1 || element.getEndOffset () < element.getDocument ().getLength ()) {
set.removeAttributes (set);
set.addAttributes (element.getAttributes ());
set.removeAttribute (jsjavax.swing.text.StyleConstants.ComponentAttribute);
set.removeAttribute (jsjavax.swing.text.StyleConstants.IconAttribute);
set.removeAttribute ("$ename");
set.removeAttribute (jsjavax.swing.text.StyleConstants.ComposedTextAttribute);
}}, "jsjavax.swing.text.Element,jsjavax.swing.text.MutableAttributeSet");
c$.$StyledEditorKit$AttributeTracker$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "AttributeTracker", null, [jsjavax.swing.event.CaretListener, jsjava.beans.PropertyChangeListener]);
Clazz.defineMethod (c$, "updateInputAttributes", 
function (a, b, c) {
var d = c.getDocument ();
if (!(Clazz.instanceOf (d, jsjavax.swing.text.StyledDocument))) {
return;
}var e = Math.min (a, b);
var f = d;
var g;
this.b$["jsjavax.swing.text.StyledEditorKit"].currentParagraph = f.getParagraphElement (e);
if (this.b$["jsjavax.swing.text.StyledEditorKit"].currentParagraph.getStartOffset () == e || a != b) {
g = f.getCharacterElement (e);
} else {
g = f.getCharacterElement (Math.max (e - 1, 0));
}if (g !== this.b$["jsjavax.swing.text.StyledEditorKit"].currentRun) {
this.b$["jsjavax.swing.text.StyledEditorKit"].currentRun = g;
this.b$["jsjavax.swing.text.StyledEditorKit"].createInputAttributes (this.b$["jsjavax.swing.text.StyledEditorKit"].currentRun, this.b$["jsjavax.swing.text.StyledEditorKit"].getInputAttributes ());
}}, "~N,~N,jsjavax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getNewValue ();
var c = a.getSource ();
if ((Clazz.instanceOf (c, jsjavax.swing.text.JTextComponent)) && (Clazz.instanceOf (b, jsjavax.swing.text.Document))) {
this.updateInputAttributes (0, 0, c);
}}, "jsjava.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "caretUpdate", 
function (a) {
this.updateInputAttributes (a.getDot (), a.getMark (), a.getSource ());
}, "jsjavax.swing.event.CaretEvent");
c$ = Clazz.p0p ();
};
c$.$StyledEditorKit$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.text, "StyledEditorKit$1", jsjavax.swing.text.SimpleAttributeSet);
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return (this.b$["jsjavax.swing.text.StyledEditorKit"].currentParagraph != null) ? this.b$["jsjavax.swing.text.StyledEditorKit"].currentParagraph.getAttributes () : null;
});
Clazz.overrideMethod (c$, "clone", 
function () {
return  new jsjavax.swing.text.SimpleAttributeSet (this);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyledEditorKit, "StyledViewFactory", null, jsjavax.swing.text.ViewFactory);
Clazz.overrideMethod (c$, "create", 
function (a) {
var b = a.getName ();
if (b != null) {
if (b.equals ("content")) {
return  new jsjavax.swing.text.LabelView (a);
} else if (b.equals ("paragraph")) {
return  new jsjavax.swing.text.ParagraphView (a);
} else if (b.equals ("section")) {
return  new jsjavax.swing.text.BoxView (a, 1);
} else if (b.equals ("component")) {
return  new jsjavax.swing.text.ComponentView (a);
} else if (b.equals ("icon")) {
return  new jsjavax.swing.text.IconView (a);
}}return  new jsjavax.swing.text.LabelView (a);
}, "jsjavax.swing.text.Element");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyledEditorKit, "StyledTextAction", jsjavax.swing.text.TextAction);
Clazz.defineMethod (c$, "getEditor", 
function (a) {
var b = this.getTextComponent (a);
if (Clazz.instanceOf (b, jsjavax.swing.JEditorPane)) {
return b;
}return null;
}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "getStyledDocument", 
function (a) {
var b = a.getDocument ();
if (Clazz.instanceOf (b, jsjavax.swing.text.StyledDocument)) {
return b;
}throw  new IllegalArgumentException ("document must be StyledDocument");
}, "jsjavax.swing.JEditorPane");
Clazz.defineMethod (c$, "getStyledEditorKit", 
function (a) {
var b = a.getEditorKit ();
if (Clazz.instanceOf (b, jsjavax.swing.text.StyledEditorKit)) {
return b;
}throw  new IllegalArgumentException ("EditorKit must be StyledEditorKit");
}, "jsjavax.swing.JEditorPane");
Clazz.defineMethod (c$, "setCharacterAttributes", 
function (a, b, c) {
var d = a.getSelectionStart ();
var e = a.getSelectionEnd ();
if (d != e) {
var f = this.getStyledDocument (a);
f.setCharacterAttributes (d, e - d, b, c);
}var f = this.getStyledEditorKit (a);
var g = f.getInputAttributes ();
if (c) {
g.removeAttributes (g);
}g.addAttributes (b);
}, "jsjavax.swing.JEditorPane,jsjavax.swing.text.AttributeSet,~B");
Clazz.defineMethod (c$, "setParagraphAttributes", 
function (a, b, c) {
var d = a.getSelectionStart ();
var e = a.getSelectionEnd ();
var f = this.getStyledDocument (a);
f.setParagraphAttributes (d, e - d, b, c);
}, "jsjavax.swing.JEditorPane,jsjavax.swing.text.AttributeSet,~B");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.family = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "FontFamilyAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.FontFamilyAction, [a]);
this.family = b;
}, "~S,~S");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.family;
if ((a != null) && (a.getSource () === b)) {
var d = a.getActionCommand ();
if (d != null) {
c = d;
}}if (c != null) {
var d =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setFontFamily (d, c);
this.setCharacterAttributes (b, d, false);
} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.size = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "FontSizeAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.FontSizeAction, [a]);
this.size = b;
}, "~S,~N");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.size;
if ((a != null) && (a.getSource () === b)) {
var d = a.getActionCommand ();
try {
c = Integer.parseInt (d, 10);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}if (c != 0) {
var d =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setFontSize (d, c);
this.setCharacterAttributes (b, d, false);
} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.fg = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "ForegroundAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.ForegroundAction, [a]);
this.fg = b;
}, "~S,jsjava.awt.Color");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.fg;
if ((a != null) && (a.getSource () === b)) {
var d = a.getActionCommand ();
try {
c = jsjava.awt.Color.decode (d);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}if (c != null) {
var d =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setForeground (d, c);
this.setCharacterAttributes (b, d, false);
} else {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.a = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "AlignmentAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.AlignmentAction, [a]);
this.a = b;
}, "~S,~N");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.a;
if ((a != null) && (a.getSource () === b)) {
var d = a.getActionCommand ();
try {
c = Integer.parseInt (d, 10);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}var d =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setAlignment (d, c);
this.setParagraphAttributes (b, d, false);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyledEditorKit, "BoldAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.BoldAction, ["font-bold"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (jsjavax.swing.text.StyleConstants.isBold (d)) ? false : true;
var f =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setBold (f, e);
this.setCharacterAttributes (b, f, false);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyledEditorKit, "ItalicAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.ItalicAction, ["font-italic"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (jsjavax.swing.text.StyleConstants.isItalic (d)) ? false : true;
var f =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setItalic (f, e);
this.setCharacterAttributes (b, f, false);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyledEditorKit, "UnderlineAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.UnderlineAction, ["font-underline"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (jsjavax.swing.text.StyleConstants.isUnderline (d)) ? false : true;
var f =  new jsjavax.swing.text.SimpleAttributeSet ();
jsjavax.swing.text.StyleConstants.setUnderline (f, e);
this.setCharacterAttributes (b, f, false);
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.tempSet = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StyledEditorKit, "StyledInsertBreakAction", jsjavax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.StyledEditorKit.StyledInsertBreakAction, ["insert-break"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}var c = this.getStyledEditorKit (b);
if (this.tempSet != null) {
this.tempSet.removeAttributes (this.tempSet);
} else {
this.tempSet =  new jsjavax.swing.text.SimpleAttributeSet ();
}this.tempSet.addAttributes (c.getInputAttributes ());
b.replaceSelection ("\n");
var d = c.getInputAttributes ();
d.removeAttributes (d);
d.addAttributes (this.tempSet);
this.tempSet.removeAttributes (this.tempSet);
} else {
var c = this.getTextComponent (a);
if (c != null) {
if ((!c.isEditable ()) || (!c.isEnabled ())) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}c.replaceSelection ("\n");
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
c$.defaultFactory = c$.prototype.defaultFactory =  new jsjavax.swing.text.StyledEditorKit.StyledViewFactory ();
c$.$defaultActions = c$.prototype.$defaultActions =  Clazz.newArray (-1, [ new jsjavax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-SansSerif", "SansSerif"),  new jsjavax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-Monospaced", "Monospaced"),  new jsjavax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-Serif", "Serif"),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-8", 8),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-10", 10),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-12", 12),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-14", 14),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-16", 16),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-18", 18),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-24", 24),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-36", 36),  new jsjavax.swing.text.StyledEditorKit.FontSizeAction ("font-size-48", 48),  new jsjavax.swing.text.StyledEditorKit.AlignmentAction ("left-justify", 0),  new jsjavax.swing.text.StyledEditorKit.AlignmentAction ("center-justify", 1),  new jsjavax.swing.text.StyledEditorKit.AlignmentAction ("right-justify", 2),  new jsjavax.swing.text.StyledEditorKit.BoldAction (),  new jsjavax.swing.text.StyledEditorKit.ItalicAction (),  new jsjavax.swing.text.StyledEditorKit.StyledInsertBreakAction (),  new jsjavax.swing.text.StyledEditorKit.UnderlineAction ()]);
});
