Clazz.declarePackage ("jsjavax.swing.text");
c$ = Clazz.declareType (jsjavax.swing.text, "EditorKit", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clone", 
function () {
var o;
try {
o = Clazz.superCall (this, jsjavax.swing.text.EditorKit, "clone", []);
} catch (cnse) {
if (Clazz.exceptionOf (cnse, CloneNotSupportedException)) {
o = null;
} else {
throw cnse;
}
}
return o;
});
Clazz.defineMethod (c$, "install", 
function (c) {
}, "jsjavax.swing.JEditorPane");
Clazz.defineMethod (c$, "deinstall", 
function (c) {
}, "jsjavax.swing.JEditorPane");
