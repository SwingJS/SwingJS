Clazz.declarePackage ("javax.swing.text");
c$ = Clazz.declareType (javax.swing.text, "DocumentFilter");
Clazz.defineMethod (c$, "remove", 
function (fb, offset, length) {
fb.remove (offset, length);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N");
Clazz.defineMethod (c$, "insertString", 
function (fb, offset, string, attr) {
fb.insertString (offset, string, attr);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~S,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, text, attrs) {
fb.replace (offset, length, text, attrs);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.DocumentFilter, "FilterBypass");
c$ = Clazz.p0p ();
