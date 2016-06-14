Clazz.declarePackage ("javax.swing.text");
c$ = Clazz.declareType (javax.swing.text, "EditorKit", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clone", 
function () {
var o;
try {
o = Clazz.superCall (this, javax.swing.text.EditorKit, "clone", []);
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
}, "javax.swing.JEditorPane");
Clazz.defineMethod (c$, "deinstall", 
function (c) {
}, "javax.swing.JEditorPane");
