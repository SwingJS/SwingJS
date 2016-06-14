Clazz.declarePackage ("swingjs.awt");
c$ = Clazz.declareType (swingjs.awt, "Util");
c$.drawString = Clazz.defineMethod (c$, "drawString", 
function (g, text, x, y) {
{
g.drawStringUnique(text, x, y);
}}, "java.awt.Graphics,~S,~N,~N");
