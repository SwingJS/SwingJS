Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.StyleConstants"], "jsjavax.swing.text.AttributeSet", null, function () {
c$ = Clazz.declareInterface (jsjavax.swing.text, "AttributeSet");
Clazz.declareInterface (jsjavax.swing.text.AttributeSet, "FontAttribute");
Clazz.declareInterface (jsjavax.swing.text.AttributeSet, "ColorAttribute");
Clazz.declareInterface (jsjavax.swing.text.AttributeSet, "CharacterAttribute");
Clazz.declareInterface (jsjavax.swing.text.AttributeSet, "ParagraphAttribute");
c$.NameAttribute = c$.prototype.NameAttribute = jsjavax.swing.text.StyleConstants.NameAttribute;
c$.ResolveAttribute = c$.prototype.ResolveAttribute = jsjavax.swing.text.StyleConstants.ResolveAttribute;
});
