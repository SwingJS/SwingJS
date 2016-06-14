Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JPanel"], "swingjs.awt.Panel", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Panel", javax.swing.JPanel);
Clazz.defineMethod (c$, "setName", 
function (name) {
System.out.println ("Panel " + name);
Clazz.superCall (this, swingjs.awt.Panel, "setName", [name]);
}, "~S");
});
