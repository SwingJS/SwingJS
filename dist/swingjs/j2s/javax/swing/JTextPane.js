Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JEditorPane"], "javax.swing.JTextPane", ["java.lang.IllegalArgumentException", "javax.swing.UIManager", "javax.swing.text.JSMinimalAbstractDocument", "$.StyleConstants", "$.StyledDocument", "$.StyledEditorKit"], function () {
c$ = Clazz.declareType (javax.swing, "JTextPane", javax.swing.JEditorPane);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTextPane, [null, null, "TextPaneUI"]);
var editorKit = this.createDefaultEditorKit ();
var contentType = editorKit.getContentType ();
if (contentType != null && javax.swing.JEditorPane.getEditorKitClassNameForContentType (contentType) === javax.swing.JEditorPane.defaultEditorKitMap.get (contentType)) {
this.setEditorKitForContentType (contentType, editorKit);
}this.setEditorKit (editorKit);
});
Clazz.makeConstructor (c$, 
function (doc) {
this.construct ();
this.setStyledDocument (doc);
}, "javax.swing.text.StyledDocument");
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (Clazz.instanceOf (doc, javax.swing.text.StyledDocument)) {
Clazz.superCall (this, javax.swing.JTextPane, "setDocument", [doc]);
} else {
throw  new IllegalArgumentException ("Model must be StyledDocument");
}}, "javax.swing.text.Document");
Clazz.defineMethod (c$, "setStyledDocument", 
function (doc) {
Clazz.superCall (this, javax.swing.JTextPane, "setDocument", [doc]);
}, "javax.swing.text.StyledDocument");
Clazz.defineMethod (c$, "getStyledDocument", 
function () {
return this.getDocument ();
});
Clazz.defineMethod (c$, "replaceSelection", 
function (content) {
this.replaceSelection (content, true);
}, "~S");
Clazz.defineMethod (c$, "replaceSelection", 
 function (content, checkEditable) {
if (checkEditable && !this.isEditable ()) {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
return;
}var doc = this.getStyledDocument ();
if (doc != null) {
try {
var caret = this.getCaret ();
var p0 = Math.min (caret.getDot (), caret.getMark ());
var p1 = Math.max (caret.getDot (), caret.getMark ());
var attr = this.getInputAttributes ().copyAttributes ();
if (Clazz.instanceOf (doc, javax.swing.text.JSMinimalAbstractDocument)) {
(doc).replace (p0, p1 - p0, content, attr);
} else {
if (p0 != p1) {
doc.remove (p0, p1 - p0);
}if (content != null && content.length > 0) {
doc.insertString (p0, content, attr);
}}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
javax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
} else {
throw e;
}
}
}}, "~S,~B");
Clazz.defineMethod (c$, "insertComponent", 
function (c) {
var inputAttributes = this.getInputAttributes ();
inputAttributes.removeAttributes (inputAttributes);
javax.swing.text.StyleConstants.setComponent (inputAttributes, c);
this.replaceSelection (" ", false);
inputAttributes.removeAttributes (inputAttributes);
}, "java.awt.Component");
Clazz.defineMethod (c$, "insertIcon", 
function (g) {
var inputAttributes = this.getInputAttributes ();
inputAttributes.removeAttributes (inputAttributes);
javax.swing.text.StyleConstants.setIcon (inputAttributes, g);
this.replaceSelection (" ", false);
inputAttributes.removeAttributes (inputAttributes);
}, "javax.swing.Icon");
Clazz.defineMethod (c$, "addStyle", 
function (nm, parent) {
var doc = this.getStyledDocument ();
return doc.addStyle (nm, parent);
}, "~S,javax.swing.text.Style");
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
}, "javax.swing.text.Style");
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
}}, "javax.swing.text.AttributeSet,~B");
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
}, "javax.swing.text.AttributeSet,~B");
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
return  new javax.swing.text.StyledEditorKit ();
});
Clazz.defineMethod (c$, "setEditorKit", 
function (kit) {
if (Clazz.instanceOf (kit, javax.swing.text.StyledEditorKit)) {
Clazz.superCall (this, javax.swing.JTextPane, "setEditorKit", [kit]);
} else {
throw  new IllegalArgumentException ("Must be StyledEditorKit");
}}, "javax.swing.text.EditorKit");
});
