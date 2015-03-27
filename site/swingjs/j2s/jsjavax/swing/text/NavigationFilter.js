Clazz.declarePackage ("jsjavax.swing.text");
c$ = Clazz.declareType (jsjavax.swing.text, "NavigationFilter");
Clazz.defineMethod (c$, "setDot", 
function (fb, dot, bias) {
fb.setDot (dot, bias);
}, "jsjavax.swing.text.NavigationFilter.FilterBypass,~N,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "moveDot", 
function (fb, dot, bias) {
fb.moveDot (dot, bias);
}, "jsjavax.swing.text.NavigationFilter.FilterBypass,~N,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (text, pos, bias, direction, biasRet) {
return text.getUI ().getNextVisualPositionFrom (text, pos, bias, direction, biasRet);
}, "jsjavax.swing.text.JTextComponent,~N,jsjavax.swing.text.Position.Bias,~N,~A");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.NavigationFilter, "FilterBypass");
c$ = Clazz.p0p ();
