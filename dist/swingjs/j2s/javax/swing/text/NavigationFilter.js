Clazz.declarePackage ("javax.swing.text");
c$ = Clazz.declareType (javax.swing.text, "NavigationFilter");
Clazz.defineMethod (c$, "setDot", 
function (fb, dot, bias) {
fb.setDot (dot, bias);
}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "moveDot", 
function (fb, dot, bias) {
fb.moveDot (dot, bias);
}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (text, pos, bias, direction, biasRet) {
return (text.getUI ()).getNextVisualPositionFrom (text, pos, bias, direction, biasRet);
}, "javax.swing.text.JTextComponent,~N,javax.swing.text.Position.Bias,~N,~A");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.NavigationFilter, "FilterBypass");
c$ = Clazz.p0p ();
