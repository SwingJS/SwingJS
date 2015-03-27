Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.AttributeSet"], "jsjavax.swing.text.StyleConstants", ["java.lang.Boolean", "$.Float", "jsjava.awt.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.representation = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "StyleConstants");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.representation;
});
c$.getBidiLevel = Clazz.defineMethod (c$, "getBidiLevel", 
function (a) {
var o = a.getAttribute (jsjavax.swing.text.StyleConstants.BidiLevel);
if (o != null) {
return o.intValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setBidiLevel = Clazz.defineMethod (c$, "setBidiLevel", 
function (a, o) {
a.addAttribute (jsjavax.swing.text.StyleConstants.BidiLevel,  new Integer (o));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getComponent = Clazz.defineMethod (c$, "getComponent", 
function (a) {
return a.getAttribute (jsjavax.swing.text.StyleConstants.ComponentAttribute);
}, "jsjavax.swing.text.AttributeSet");
c$.setComponent = Clazz.defineMethod (c$, "setComponent", 
function (a, c) {
a.addAttribute ("$ename", "component");
a.addAttribute (jsjavax.swing.text.StyleConstants.ComponentAttribute, c);
}, "jsjavax.swing.text.MutableAttributeSet,jsjava.awt.Component");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (a) {
return a.getAttribute (jsjavax.swing.text.StyleConstants.IconAttribute);
}, "jsjavax.swing.text.AttributeSet");
c$.setIcon = Clazz.defineMethod (c$, "setIcon", 
function (a, c) {
a.addAttribute ("$ename", "icon");
a.addAttribute (jsjavax.swing.text.StyleConstants.IconAttribute, c);
}, "jsjavax.swing.text.MutableAttributeSet,jsjavax.swing.Icon");
c$.getFontFamily = Clazz.defineMethod (c$, "getFontFamily", 
function (a) {
var family = a.getAttribute (jsjavax.swing.text.StyleConstants.FontFamily);
if (family == null) {
family = "Monospaced";
}return family;
}, "jsjavax.swing.text.AttributeSet");
c$.setFontFamily = Clazz.defineMethod (c$, "setFontFamily", 
function (a, fam) {
a.addAttribute (jsjavax.swing.text.StyleConstants.FontFamily, fam);
}, "jsjavax.swing.text.MutableAttributeSet,~S");
c$.getFontSize = Clazz.defineMethod (c$, "getFontSize", 
function (a) {
var size = a.getAttribute (jsjavax.swing.text.StyleConstants.FontSize);
if (size != null) {
return size.intValue ();
}return 12;
}, "jsjavax.swing.text.AttributeSet");
c$.setFontSize = Clazz.defineMethod (c$, "setFontSize", 
function (a, s) {
a.addAttribute (jsjavax.swing.text.StyleConstants.FontSize,  new Integer (s));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.isBold = Clazz.defineMethod (c$, "isBold", 
function (a) {
var bold = a.getAttribute (jsjavax.swing.text.StyleConstants.Bold);
if (bold != null) {
return bold.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.setBold = Clazz.defineMethod (c$, "setBold", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Bold, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.isItalic = Clazz.defineMethod (c$, "isItalic", 
function (a) {
var italic = a.getAttribute (jsjavax.swing.text.StyleConstants.Italic);
if (italic != null) {
return italic.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.setItalic = Clazz.defineMethod (c$, "setItalic", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Italic, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.isUnderline = Clazz.defineMethod (c$, "isUnderline", 
function (a) {
var underline = a.getAttribute (jsjavax.swing.text.StyleConstants.Underline);
if (underline != null) {
return underline.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.isStrikeThrough = Clazz.defineMethod (c$, "isStrikeThrough", 
function (a) {
var strike = a.getAttribute (jsjavax.swing.text.StyleConstants.StrikeThrough);
if (strike != null) {
return strike.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.isSuperscript = Clazz.defineMethod (c$, "isSuperscript", 
function (a) {
var superscript = a.getAttribute (jsjavax.swing.text.StyleConstants.Superscript);
if (superscript != null) {
return superscript.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.isSubscript = Clazz.defineMethod (c$, "isSubscript", 
function (a) {
var subscript = a.getAttribute (jsjavax.swing.text.StyleConstants.Subscript);
if (subscript != null) {
return subscript.booleanValue ();
}return false;
}, "jsjavax.swing.text.AttributeSet");
c$.setUnderline = Clazz.defineMethod (c$, "setUnderline", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Underline, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.setStrikeThrough = Clazz.defineMethod (c$, "setStrikeThrough", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.StrikeThrough, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.setSuperscript = Clazz.defineMethod (c$, "setSuperscript", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Superscript, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.setSubscript = Clazz.defineMethod (c$, "setSubscript", 
function (a, b) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Subscript, Boolean.$valueOf (b));
}, "jsjavax.swing.text.MutableAttributeSet,~B");
c$.getForeground = Clazz.defineMethod (c$, "getForeground", 
function (a) {
var fg = a.getAttribute (jsjavax.swing.text.StyleConstants.Foreground);
if (fg == null) {
fg = jsjava.awt.Color.black;
}return fg;
}, "jsjavax.swing.text.AttributeSet");
c$.setForeground = Clazz.defineMethod (c$, "setForeground", 
function (a, fg) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Foreground, fg);
}, "jsjavax.swing.text.MutableAttributeSet,jsjava.awt.Color");
c$.getBackground = Clazz.defineMethod (c$, "getBackground", 
function (a) {
var fg = a.getAttribute (jsjavax.swing.text.StyleConstants.Background);
if (fg == null) {
fg = jsjava.awt.Color.black;
}return fg;
}, "jsjavax.swing.text.AttributeSet");
c$.setBackground = Clazz.defineMethod (c$, "setBackground", 
function (a, fg) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Background, fg);
}, "jsjavax.swing.text.MutableAttributeSet,jsjava.awt.Color");
c$.getFirstLineIndent = Clazz.defineMethod (c$, "getFirstLineIndent", 
function (a) {
var indent = a.getAttribute (jsjavax.swing.text.StyleConstants.FirstLineIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setFirstLineIndent = Clazz.defineMethod (c$, "setFirstLineIndent", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.FirstLineIndent,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getRightIndent = Clazz.defineMethod (c$, "getRightIndent", 
function (a) {
var indent = a.getAttribute (jsjavax.swing.text.StyleConstants.RightIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setRightIndent = Clazz.defineMethod (c$, "setRightIndent", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.RightIndent,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getLeftIndent = Clazz.defineMethod (c$, "getLeftIndent", 
function (a) {
var indent = a.getAttribute (jsjavax.swing.text.StyleConstants.LeftIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setLeftIndent = Clazz.defineMethod (c$, "setLeftIndent", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.LeftIndent,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getLineSpacing = Clazz.defineMethod (c$, "getLineSpacing", 
function (a) {
var space = a.getAttribute (jsjavax.swing.text.StyleConstants.LineSpacing);
if (space != null) {
return space.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setLineSpacing = Clazz.defineMethod (c$, "setLineSpacing", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.LineSpacing,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getSpaceAbove = Clazz.defineMethod (c$, "getSpaceAbove", 
function (a) {
var space = a.getAttribute (jsjavax.swing.text.StyleConstants.SpaceAbove);
if (space != null) {
return space.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setSpaceAbove = Clazz.defineMethod (c$, "setSpaceAbove", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.SpaceAbove,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getSpaceBelow = Clazz.defineMethod (c$, "getSpaceBelow", 
function (a) {
var space = a.getAttribute (jsjavax.swing.text.StyleConstants.SpaceBelow);
if (space != null) {
return space.floatValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setSpaceBelow = Clazz.defineMethod (c$, "setSpaceBelow", 
function (a, i) {
a.addAttribute (jsjavax.swing.text.StyleConstants.SpaceBelow,  new Float (i));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getAlignment = Clazz.defineMethod (c$, "getAlignment", 
function (a) {
var align = a.getAttribute (jsjavax.swing.text.StyleConstants.Alignment);
if (align != null) {
return align.intValue ();
}return 0;
}, "jsjavax.swing.text.AttributeSet");
c$.setAlignment = Clazz.defineMethod (c$, "setAlignment", 
function (a, align) {
a.addAttribute (jsjavax.swing.text.StyleConstants.Alignment,  new Integer (align));
}, "jsjavax.swing.text.MutableAttributeSet,~N");
c$.getTabSet = Clazz.defineMethod (c$, "getTabSet", 
function (a) {
var tabs = a.getAttribute (jsjavax.swing.text.StyleConstants.TabSet);
return tabs;
}, "jsjavax.swing.text.AttributeSet");
c$.setTabSet = Clazz.defineMethod (c$, "setTabSet", 
function (a, tabs) {
a.addAttribute (jsjavax.swing.text.StyleConstants.TabSet, tabs);
}, "jsjavax.swing.text.MutableAttributeSet,jsjavax.swing.text.TabSet");
Clazz.makeConstructor (c$, 
function (representation) {
this.representation = representation;
}, "~S");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyleConstants, "ParagraphConstants", jsjavax.swing.text.StyleConstants, jsjavax.swing.text.AttributeSet.ParagraphAttribute);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyleConstants, "CharacterConstants", jsjavax.swing.text.StyleConstants, jsjavax.swing.text.AttributeSet.CharacterAttribute);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyleConstants, "ColorConstants", jsjavax.swing.text.StyleConstants, [jsjavax.swing.text.AttributeSet.ColorAttribute, jsjavax.swing.text.AttributeSet.CharacterAttribute]);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.StyleConstants, "FontConstants", jsjavax.swing.text.StyleConstants, [jsjavax.swing.text.AttributeSet.FontAttribute, jsjavax.swing.text.AttributeSet.CharacterAttribute]);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"ComponentElementName", "component",
"IconElementName", "icon");
c$.NameAttribute = c$.prototype.NameAttribute =  new jsjavax.swing.text.StyleConstants ("name");
c$.ResolveAttribute = c$.prototype.ResolveAttribute =  new jsjavax.swing.text.StyleConstants ("resolver");
c$.ModelAttribute = c$.prototype.ModelAttribute =  new jsjavax.swing.text.StyleConstants ("model");
c$.BidiLevel = c$.prototype.BidiLevel =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("bidiLevel");
c$.FontFamily = c$.prototype.FontFamily =  new jsjavax.swing.text.StyleConstants.FontConstants ("family");
c$.Family = c$.prototype.Family = jsjavax.swing.text.StyleConstants.FontFamily;
c$.FontSize = c$.prototype.FontSize =  new jsjavax.swing.text.StyleConstants.FontConstants ("size");
c$.Size = c$.prototype.Size = jsjavax.swing.text.StyleConstants.FontSize;
c$.Bold = c$.prototype.Bold =  new jsjavax.swing.text.StyleConstants.FontConstants ("bold");
c$.Italic = c$.prototype.Italic =  new jsjavax.swing.text.StyleConstants.FontConstants ("italic");
c$.Underline = c$.prototype.Underline =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("underline");
c$.StrikeThrough = c$.prototype.StrikeThrough =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("strikethrough");
c$.Superscript = c$.prototype.Superscript =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("superscript");
c$.Subscript = c$.prototype.Subscript =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("subscript");
c$.Foreground = c$.prototype.Foreground =  new jsjavax.swing.text.StyleConstants.ColorConstants ("foreground");
c$.Background = c$.prototype.Background =  new jsjavax.swing.text.StyleConstants.ColorConstants ("background");
c$.ComponentAttribute = c$.prototype.ComponentAttribute =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("component");
c$.IconAttribute = c$.prototype.IconAttribute =  new jsjavax.swing.text.StyleConstants.CharacterConstants ("icon");
c$.ComposedTextAttribute = c$.prototype.ComposedTextAttribute =  new jsjavax.swing.text.StyleConstants ("composed text");
c$.FirstLineIndent = c$.prototype.FirstLineIndent =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("FirstLineIndent");
c$.LeftIndent = c$.prototype.LeftIndent =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("LeftIndent");
c$.RightIndent = c$.prototype.RightIndent =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("RightIndent");
c$.LineSpacing = c$.prototype.LineSpacing =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("LineSpacing");
c$.SpaceAbove = c$.prototype.SpaceAbove =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("SpaceAbove");
c$.SpaceBelow = c$.prototype.SpaceBelow =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("SpaceBelow");
c$.Alignment = c$.prototype.Alignment =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("Alignment");
c$.TabSet = c$.prototype.TabSet =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("TabSet");
c$.Orientation = c$.prototype.Orientation =  new jsjavax.swing.text.StyleConstants.ParagraphConstants ("Orientation");
Clazz.defineStatics (c$,
"ALIGN_LEFT", 0,
"ALIGN_CENTER", 1,
"ALIGN_RIGHT", 2,
"ALIGN_JUSTIFIED", 3);
c$.keys = c$.prototype.keys =  Clazz.newArray (-1, [jsjavax.swing.text.StyleConstants.NameAttribute, jsjavax.swing.text.StyleConstants.ResolveAttribute, jsjavax.swing.text.StyleConstants.BidiLevel, jsjavax.swing.text.StyleConstants.FontFamily, jsjavax.swing.text.StyleConstants.FontSize, jsjavax.swing.text.StyleConstants.Bold, jsjavax.swing.text.StyleConstants.Italic, jsjavax.swing.text.StyleConstants.Underline, jsjavax.swing.text.StyleConstants.StrikeThrough, jsjavax.swing.text.StyleConstants.Superscript, jsjavax.swing.text.StyleConstants.Subscript, jsjavax.swing.text.StyleConstants.Foreground, jsjavax.swing.text.StyleConstants.Background, jsjavax.swing.text.StyleConstants.ComponentAttribute, jsjavax.swing.text.StyleConstants.IconAttribute, jsjavax.swing.text.StyleConstants.FirstLineIndent, jsjavax.swing.text.StyleConstants.LeftIndent, jsjavax.swing.text.StyleConstants.RightIndent, jsjavax.swing.text.StyleConstants.LineSpacing, jsjavax.swing.text.StyleConstants.SpaceAbove, jsjavax.swing.text.StyleConstants.SpaceBelow, jsjavax.swing.text.StyleConstants.Alignment, jsjavax.swing.text.StyleConstants.TabSet, jsjavax.swing.text.StyleConstants.Orientation, jsjavax.swing.text.StyleConstants.ModelAttribute, jsjavax.swing.text.StyleConstants.ComposedTextAttribute]);
});
