Clazz.declarePackage ("jsjavax.swing.plaf");
Clazz.load (["jsjava.awt.Color", "jsjavax.swing.plaf.UIResource"], "jsjavax.swing.plaf.ColorUIResource", null, function () {
c$ = Clazz.declareType (jsjavax.swing.plaf, "ColorUIResource", jsjava.awt.Color, jsjavax.swing.plaf.UIResource);
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, jsjavax.swing.plaf.ColorUIResource, [c.getRGB (), (c.getRGB () & 0xFF000000) != 0xFF000000]);
}, "jsjava.awt.Color");
});
