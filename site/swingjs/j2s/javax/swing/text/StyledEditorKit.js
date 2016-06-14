Clazz.declarePackage ("javax.swing.text");
Clazz.load (["java.beans.PropertyChangeListener", "javax.swing.event.CaretListener", "javax.swing.text.DefaultEditorKit", "$.TextAction", "$.ViewFactory"], "javax.swing.text.StyledEditorKit", ["java.lang.IllegalArgumentException", "java.awt.Color", "javax.swing.JEditorPane", "$.UIManager", "javax.swing.text.BoxView", "$.ComponentView", "$.Document", "$.IconView", "$.JTextComponent", "$.LabelView", "$.ParagraphView", "$.SimpleAttributeSet", "$.StyleConstants", "$.StyledDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentRun = null;
this.currentParagraph = null;
this.inputAttributes = null;
this.inputAttributeUpdater = null;
if (!Clazz.isClassDefined ("javax.swing.text.StyledEditorKit.AttributeTracker")) {
javax.swing.text.StyledEditorKit.$StyledEditorKit$AttributeTracker$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "StyledEditorKit", javax.swing.text.DefaultEditorKit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit, []);
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
return javax.swing.text.TextAction.augmentList (Clazz.superCall (this, javax.swing.text.StyledEditorKit, "getActions", []), javax.swing.text.StyledEditorKit.$defaultActions);
});
Clazz.overrideMethod (c$, "createDefaultDocument", 
function () {
return null;
});
Clazz.overrideMethod (c$, "install", 
function (c) {
c.addCaretListener (this.inputAttributeUpdater);
c.addPropertyChangeListener (this.inputAttributeUpdater);
var caret = c.getCaret ();
if (caret != null) {
this.inputAttributeUpdater.updateInputAttributes (caret.getDot (), caret.getMark (), c);
}}, "javax.swing.JEditorPane");
Clazz.overrideMethod (c$, "deinstall", 
function (c) {
c.removeCaretListener (this.inputAttributeUpdater);
c.removePropertyChangeListener (this.inputAttributeUpdater);
this.currentRun = null;
this.currentParagraph = null;
}, "javax.swing.JEditorPane");
Clazz.overrideMethod (c$, "getViewFactory", 
function () {
return javax.swing.text.StyledEditorKit.defaultFactory;
});
Clazz.defineMethod (c$, "clone", 
function () {
var o = Clazz.superCall (this, javax.swing.text.StyledEditorKit, "clone", []);
o.currentRun = o.currentParagraph = null;
o.createInputAttributeUpdated ();
o.createInputAttributes ();
return o;
});
Clazz.defineMethod (c$, "createInputAttributes", 
 function () {
this.inputAttributes = ((Clazz.isClassDefined ("javax.swing.text.StyledEditorKit$1") ? 0 : javax.swing.text.StyledEditorKit.$StyledEditorKit$1$ ()), Clazz.innerTypeInstance (javax.swing.text.StyledEditorKit$1, this, null));
});
Clazz.defineMethod (c$, "createInputAttributeUpdated", 
 function () {
this.inputAttributeUpdater = Clazz.innerTypeInstance (javax.swing.text.StyledEditorKit.AttributeTracker, this, null);
});
Clazz.defineMethod (c$, "createInputAttributes", 
function (element, set) {
if (element.getAttributes ().getAttributeCount () > 0 || element.getEndOffset () - element.getStartOffset () > 1 || element.getEndOffset () < element.getDocument ().getLength ()) {
set.removeAttributes (set);
set.addAttributes (element.getAttributes ());
set.removeAttribute (javax.swing.text.StyleConstants.ComponentAttribute);
set.removeAttribute (javax.swing.text.StyleConstants.IconAttribute);
set.removeAttribute ("$ename");
set.removeAttribute (javax.swing.text.StyleConstants.ComposedTextAttribute);
}}, "javax.swing.text.Element,javax.swing.text.MutableAttributeSet");
c$.$StyledEditorKit$AttributeTracker$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "AttributeTracker", null, [javax.swing.event.CaretListener, java.beans.PropertyChangeListener]);
Clazz.defineMethod (c$, "updateInputAttributes", 
function (a, b, c) {
var d = c.getDocument ();
if (!(Clazz.instanceOf (d, javax.swing.text.StyledDocument))) {
return;
}var e = Math.min (a, b);
var f = d;
var g;
this.b$["javax.swing.text.StyledEditorKit"].currentParagraph = f.getParagraphElement (e);
if (this.b$["javax.swing.text.StyledEditorKit"].currentParagraph.getStartOffset () == e || a != b) {
g = f.getCharacterElement (e);
} else {
g = f.getCharacterElement (Math.max (e - 1, 0));
}if (g !== this.b$["javax.swing.text.StyledEditorKit"].currentRun) {
this.b$["javax.swing.text.StyledEditorKit"].currentRun = g;
this.b$["javax.swing.text.StyledEditorKit"].createInputAttributes (this.b$["javax.swing.text.StyledEditorKit"].currentRun, this.b$["javax.swing.text.StyledEditorKit"].getInputAttributes ());
}}, "~N,~N,javax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getNewValue ();
var c = a.getSource ();
if ((Clazz.instanceOf (c, javax.swing.text.JTextComponent)) && (Clazz.instanceOf (b, javax.swing.text.Document))) {
this.updateInputAttributes (0, 0, c);
}}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "caretUpdate", 
function (a) {
this.updateInputAttributes (a.getDot (), a.getMark (), a.getSource ());
}, "javax.swing.event.CaretEvent");
c$ = Clazz.p0p ();
};
c$.$StyledEditorKit$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing.text, "StyledEditorKit$1", javax.swing.text.SimpleAttributeSet);
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return (this.b$["javax.swing.text.StyledEditorKit"].currentParagraph != null) ? this.b$["javax.swing.text.StyledEditorKit"].currentParagraph.getAttributes () : null;
});
Clazz.overrideMethod (c$, "clone", 
function () {
return  new javax.swing.text.SimpleAttributeSet (this);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyledEditorKit, "StyledViewFactory", null, javax.swing.text.ViewFactory);
Clazz.overrideMethod (c$, "create", 
function (a) {
var b = a.getName ();
if (b != null) {
if (b.equals ("content")) {
return  new javax.swing.text.LabelView (a);
} else if (b.equals ("paragraph")) {
return  new javax.swing.text.ParagraphView (a);
} else if (b.equals ("section")) {
return  new javax.swing.text.BoxView (a, 1);
} else if (b.equals ("component")) {
return  new javax.swing.text.ComponentView (a);
} else if (b.equals ("icon")) {
return  new javax.swing.text.IconView (a);
}}return  new javax.swing.text.LabelView (a);
}, "javax.swing.text.Element");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyledEditorKit, "StyledTextAction", javax.swing.text.TextAction);
Clazz.defineMethod (c$, "getEditor", 
function (a) {
var b = this.getTextComponent (a);
if (Clazz.instanceOf (b, javax.swing.JEditorPane)) {
return b;
}return null;
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "getStyledDocument", 
function (a) {
var b = a.getDocument ();
if (Clazz.instanceOf (b, javax.swing.text.StyledDocument)) {
return b;
}throw  new IllegalArgumentException ("document must be StyledDocument");
}, "javax.swing.JEditorPane");
Clazz.defineMethod (c$, "getStyledEditorKit", 
function (a) {
var b = a.getEditorKit ();
if (Clazz.instanceOf (b, javax.swing.text.StyledEditorKit)) {
return b;
}throw  new IllegalArgumentException ("EditorKit must be StyledEditorKit");
}, "javax.swing.JEditorPane");
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
}, "javax.swing.JEditorPane,javax.swing.text.AttributeSet,~B");
Clazz.defineMethod (c$, "setParagraphAttributes", 
function (a, b, c) {
var d = a.getSelectionStart ();
var e = a.getSelectionEnd ();
var f = this.getStyledDocument (a);
f.setParagraphAttributes (d, e - d, b, c);
}, "javax.swing.JEditorPane,javax.swing.text.AttributeSet,~B");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.family = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "FontFamilyAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.FontFamilyAction, [a]);
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
var d =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setFontFamily (d, c);
this.setCharacterAttributes (b, d, false);
} else {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.size = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "FontSizeAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.FontSizeAction, [a]);
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
var d =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setFontSize (d, c);
this.setCharacterAttributes (b, d, false);
} else {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.fg = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "ForegroundAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.ForegroundAction, [a]);
this.fg = b;
}, "~S,java.awt.Color");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.fg;
if ((a != null) && (a.getSource () === b)) {
var d = a.getActionCommand ();
try {
c = java.awt.Color.decode (d);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}if (c != null) {
var d =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setForeground (d, c);
this.setCharacterAttributes (b, d, false);
} else {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
}}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.a = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "AlignmentAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.AlignmentAction, [a]);
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
}var d =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setAlignment (d, c);
this.setParagraphAttributes (b, d, false);
}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyledEditorKit, "BoldAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.BoldAction, ["font-bold"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (javax.swing.text.StyleConstants.isBold (d)) ? false : true;
var f =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setBold (f, e);
this.setCharacterAttributes (b, f, false);
}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyledEditorKit, "ItalicAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.ItalicAction, ["font-italic"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (javax.swing.text.StyleConstants.isItalic (d)) ? false : true;
var f =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setItalic (f, e);
this.setCharacterAttributes (b, f, false);
}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyledEditorKit, "UnderlineAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.UnderlineAction, ["font-underline"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
var c = this.getStyledEditorKit (b);
var d = c.getInputAttributes ();
var e = (javax.swing.text.StyleConstants.isUnderline (d)) ? false : true;
var f =  new javax.swing.text.SimpleAttributeSet ();
javax.swing.text.StyleConstants.setUnderline (f, e);
this.setCharacterAttributes (b, f, false);
}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.tempSet = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.StyledEditorKit, "StyledInsertBreakAction", javax.swing.text.StyledEditorKit.StyledTextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.StyledEditorKit.StyledInsertBreakAction, ["insert-break"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getEditor (a);
if (b != null) {
if ((!b.isEditable ()) || (!b.isEnabled ())) {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}var c = this.getStyledEditorKit (b);
if (this.tempSet != null) {
this.tempSet.removeAttributes (this.tempSet);
} else {
this.tempSet =  new javax.swing.text.SimpleAttributeSet ();
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
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (b);
return;
}c.replaceSelection ("\n");
}}}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
c$.defaultFactory = c$.prototype.defaultFactory =  new javax.swing.text.StyledEditorKit.StyledViewFactory ();
c$.$defaultActions = c$.prototype.$defaultActions = [ new javax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-SansSerif", "SansSerif"),  new javax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-Monospaced", "Monospaced"),  new javax.swing.text.StyledEditorKit.FontFamilyAction ("font-family-Serif", "Serif"),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-8", 8),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-10", 10),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-12", 12),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-14", 14),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-16", 16),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-18", 18),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-24", 24),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-36", 36),  new javax.swing.text.StyledEditorKit.FontSizeAction ("font-size-48", 48),  new javax.swing.text.StyledEditorKit.AlignmentAction ("left-justify", 0),  new javax.swing.text.StyledEditorKit.AlignmentAction ("center-justify", 1),  new javax.swing.text.StyledEditorKit.AlignmentAction ("right-justify", 2),  new javax.swing.text.StyledEditorKit.BoldAction (),  new javax.swing.text.StyledEditorKit.ItalicAction (),  new javax.swing.text.StyledEditorKit.StyledInsertBreakAction (),  new javax.swing.text.StyledEditorKit.UnderlineAction ()];
});
