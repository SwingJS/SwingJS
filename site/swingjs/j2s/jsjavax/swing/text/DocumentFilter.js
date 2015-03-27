Clazz.declarePackage ("jsjavax.swing.text");
c$ = Clazz.declareType (jsjavax.swing.text, "DocumentFilter");
Clazz.defineMethod (c$, "remove", 
function (fb, offset, length) {
fb.remove (offset, length);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N");
Clazz.defineMethod (c$, "insertString", 
function (fb, offset, string, attr) {
fb.insertString (offset, string, attr);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, text, attrs) {
fb.replace (offset, length, text, attrs);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.DocumentFilter, "FilterBypass");
c$ = Clazz.p0p ();
