Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JEditorPane"], "jsjavax.swing.JTextPane", ["java.lang.IllegalArgumentException", "jsjavax.swing.UIManager", "jsjavax.swing.text.AbstractDocument", "$.StyleConstants", "$.StyledDocument", "$.StyledEditorKit"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JTextPane", jsjavax.swing.JEditorPane);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JTextPane);
var editorKit = this.createDefaultEditorKit ();
var contentType = editorKit.getContentType ();
if (contentType != null && jsjavax.swing.JEditorPane.getEditorKitClassNameForContentType (contentType) === jsjavax.swing.JEditorPane.defaultEditorKitMap.get (contentType)) {
this.setEditorKitForContentType (contentType, editorKit);
}this.setEditorKit (editorKit);
});
Clazz.makeConstructor (c$, 
function (doc) {
this.construct ();
this.setStyledDocument (doc);
}, "jsjavax.swing.text.StyledDocument");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "TextPaneUI";
});
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (Clazz.instanceOf (doc, jsjavax.swing.text.StyledDocument)) {
Clazz.superCall (this, jsjavax.swing.JTextPane, "setDocument", [doc]);
} else {
throw  new IllegalArgumentException ("Model must be StyledDocument");
}}, "jsjavax.swing.text.Document");
Clazz.defineMethod (c$, "setStyledDocument", 
function (doc) {
Clazz.superCall (this, jsjavax.swing.JTextPane, "setDocument", [doc]);
}, "jsjavax.swing.text.StyledDocument");
Clazz.defineMethod (c$, "getStyledDocument", 
function () {
return this.getDocument ();
});
Clazz.defineMethod (c$, "replaceSelection", 
function (content) {
this.replaceSelection (content, true);
}, "~S");
Clazz.defineMethod (c$, "replaceSelection", 
($fz = function (content, checkEditable) {
if (checkEditable && !this.isEditable ()) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
return;
}var doc = this.getStyledDocument ();
if (doc != null) {
try {
var caret = this.getCaret ();
var p0 = Math.min (caret.getDot (), caret.getMark ());
var p1 = Math.max (caret.getDot (), caret.getMark ());
var attr = this.getInputAttributes ().copyAttributes ();
if (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument)) {
(doc).replace (p0, p1 - p0, content, attr);
} else {
if (p0 != p1) {
doc.remove (p0, p1 - p0);
}if (content != null && content.length > 0) {
doc.insertString (p0, content, attr);
}}} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
} else {
throw e;
}
}
}}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "insertComponent", 
function (c) {
var inputAttributes = this.getInputAttributes ();
inputAttributes.removeAttributes (inputAttributes);
jsjavax.swing.text.StyleConstants.setComponent (inputAttributes, c);
this.replaceSelection (" ", false);
inputAttributes.removeAttributes (inputAttributes);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "insertIcon", 
function (g) {
var inputAttributes = this.getInputAttributes ();
inputAttributes.removeAttributes (inputAttributes);
jsjavax.swing.text.StyleConstants.setIcon (inputAttributes, g);
this.replaceSelection (" ", false);
inputAttributes.removeAttributes (inputAttributes);
}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "addStyle", 
function (nm, parent) {
var doc = this.getStyledDocument ();
return doc.addStyle (nm, parent);
}, "~S,jsjavax.swing.text.Style");
Clazz.defineMethod (c$, "removeStyle", 
function (nm) {
var doc = this.getStyledDocument ();
doc.removeStyle (nm);
}, "~S");
Clazz.defineMethod (c$, "getStyle", 
function (nm) {
var doc = this.getStyledDocument ();
return doc.getStyle (nm);
}, "~S");
Clazz.defineMethod (c$, "setLogicalStyle", 
function (s) {
var doc = this.getStyledDocument ();
doc.setLogicalStyle (this.getCaretPosition (), s);
}, "jsjavax.swing.text.Style");
Clazz.defineMethod (c$, "getLogicalStyle", 
function () {
var doc = this.getStyledDocument ();
return doc.getLogicalStyle (this.getCaretPosition ());
});
Clazz.defineMethod (c$, "getCharacterAttributes", 
function () {
var doc = this.getStyledDocument ();
var run = doc.getCharacterElement (this.getCaretPosition ());
if (run != null) {
return run.getAttributes ();
}return null;
});
Clazz.defineMethod (c$, "setCharacterAttributes", 
function (attr, replace) {
var p0 = this.getSelectionStart ();
var p1 = this.getSelectionEnd ();
if (p0 != p1) {
var doc = this.getStyledDocument ();
doc.setCharacterAttributes (p0, p1 - p0, attr, replace);
} else {
var inputAttributes = this.getInputAttributes ();
if (replace) {
inputAttributes.removeAttributes (inputAttributes);
}inputAttributes.addAttributes (attr);
}}, "jsjavax.swing.text.AttributeSet,~B");
Clazz.defineMethod (c$, "getParagraphAttributes", 
function () {
var doc = this.getStyledDocument ();
var paragraph = doc.getParagraphElement (this.getCaretPosition ());
if (paragraph != null) {
return paragraph.getAttributes ();
}return null;
});
Clazz.defineMethod (c$, "setParagraphAttributes", 
function (attr, replace) {
var p0 = this.getSelectionStart ();
var p1 = this.getSelectionEnd ();
var doc = this.getStyledDocument ();
doc.setParagraphAttributes (p0, p1 - p0, attr, replace);
}, "jsjavax.swing.text.AttributeSet,~B");
Clazz.defineMethod (c$, "getInputAttributes", 
function () {
return this.getStyledEditorKit ().getInputAttributes ();
});
Clazz.defineMethod (c$, "getStyledEditorKit", 
function () {
return this.getEditorKit ();
});
Clazz.overrideMethod (c$, "createDefaultEditorKit", 
function () {
return  new jsjavax.swing.text.StyledEditorKit ();
});
Clazz.defineMethod (c$, "setEditorKit", 
function (kit) {
if (Clazz.instanceOf (kit, jsjavax.swing.text.StyledEditorKit)) {
Clazz.superCall (this, jsjavax.swing.JTextPane, "setEditorKit", [kit]);
} else {
throw  new IllegalArgumentException ("Must be StyledEditorKit");
}}, "jsjavax.swing.text.EditorKit");
Clazz.defineStatics (c$,
"$$uiClassID", "TextPaneUI");
});
