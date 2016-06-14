Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.AttributeSet"], "javax.swing.text.StyleConstants", ["java.lang.Boolean", "$.Float", "java.awt.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.representation = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "StyleConstants");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.representation;
});
c$.getBidiLevel = Clazz.defineMethod (c$, "getBidiLevel", 
function (a) {
var o = a.getAttribute (javax.swing.text.StyleConstants.BidiLevel);
if (o != null) {
return o.intValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setBidiLevel = Clazz.defineMethod (c$, "setBidiLevel", 
function (a, o) {
a.addAttribute (javax.swing.text.StyleConstants.BidiLevel,  new Integer (o));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getComponent = Clazz.defineMethod (c$, "getComponent", 
function (a) {
return a.getAttribute (javax.swing.text.StyleConstants.ComponentAttribute);
}, "javax.swing.text.AttributeSet");
c$.setComponent = Clazz.defineMethod (c$, "setComponent", 
function (a, c) {
a.addAttribute ("$ename", "component");
a.addAttribute (javax.swing.text.StyleConstants.ComponentAttribute, c);
}, "javax.swing.text.MutableAttributeSet,java.awt.Component");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (a) {
return a.getAttribute (javax.swing.text.StyleConstants.IconAttribute);
}, "javax.swing.text.AttributeSet");
c$.setIcon = Clazz.defineMethod (c$, "setIcon", 
function (a, c) {
a.addAttribute ("$ename", "icon");
a.addAttribute (javax.swing.text.StyleConstants.IconAttribute, c);
}, "javax.swing.text.MutableAttributeSet,javax.swing.Icon");
c$.getFontFamily = Clazz.defineMethod (c$, "getFontFamily", 
function (a) {
var family = a.getAttribute (javax.swing.text.StyleConstants.FontFamily);
if (family == null) {
family = "Monospaced";
}return family;
}, "javax.swing.text.AttributeSet");
c$.setFontFamily = Clazz.defineMethod (c$, "setFontFamily", 
function (a, fam) {
a.addAttribute (javax.swing.text.StyleConstants.FontFamily, fam);
}, "javax.swing.text.MutableAttributeSet,~S");
c$.getFontSize = Clazz.defineMethod (c$, "getFontSize", 
function (a) {
var size = a.getAttribute (javax.swing.text.StyleConstants.FontSize);
if (size != null) {
return size.intValue ();
}return 12;
}, "javax.swing.text.AttributeSet");
c$.setFontSize = Clazz.defineMethod (c$, "setFontSize", 
function (a, s) {
a.addAttribute (javax.swing.text.StyleConstants.FontSize,  new Integer (s));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.isBold = Clazz.defineMethod (c$, "isBold", 
function (a) {
var bold = a.getAttribute (javax.swing.text.StyleConstants.Bold);
if (bold != null) {
return bold.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.setBold = Clazz.defineMethod (c$, "setBold", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.Bold, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.isItalic = Clazz.defineMethod (c$, "isItalic", 
function (a) {
var italic = a.getAttribute (javax.swing.text.StyleConstants.Italic);
if (italic != null) {
return italic.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.setItalic = Clazz.defineMethod (c$, "setItalic", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.Italic, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.isUnderline = Clazz.defineMethod (c$, "isUnderline", 
function (a) {
var underline = a.getAttribute (javax.swing.text.StyleConstants.Underline);
if (underline != null) {
return underline.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.isStrikeThrough = Clazz.defineMethod (c$, "isStrikeThrough", 
function (a) {
var strike = a.getAttribute (javax.swing.text.StyleConstants.StrikeThrough);
if (strike != null) {
return strike.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.isSuperscript = Clazz.defineMethod (c$, "isSuperscript", 
function (a) {
var superscript = a.getAttribute (javax.swing.text.StyleConstants.Superscript);
if (superscript != null) {
return superscript.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.isSubscript = Clazz.defineMethod (c$, "isSubscript", 
function (a) {
var subscript = a.getAttribute (javax.swing.text.StyleConstants.Subscript);
if (subscript != null) {
return subscript.booleanValue ();
}return false;
}, "javax.swing.text.AttributeSet");
c$.setUnderline = Clazz.defineMethod (c$, "setUnderline", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.Underline, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.setStrikeThrough = Clazz.defineMethod (c$, "setStrikeThrough", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.StrikeThrough, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.setSuperscript = Clazz.defineMethod (c$, "setSuperscript", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.Superscript, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.setSubscript = Clazz.defineMethod (c$, "setSubscript", 
function (a, b) {
a.addAttribute (javax.swing.text.StyleConstants.Subscript, Boolean.$valueOf (b));
}, "javax.swing.text.MutableAttributeSet,~B");
c$.getForeground = Clazz.defineMethod (c$, "getForeground", 
function (a) {
var fg = a.getAttribute (javax.swing.text.StyleConstants.Foreground);
if (fg == null) {
fg = java.awt.Color.black;
}return fg;
}, "javax.swing.text.AttributeSet");
c$.setForeground = Clazz.defineMethod (c$, "setForeground", 
function (a, fg) {
a.addAttribute (javax.swing.text.StyleConstants.Foreground, fg);
}, "javax.swing.text.MutableAttributeSet,java.awt.Color");
c$.getBackground = Clazz.defineMethod (c$, "getBackground", 
function (a) {
var fg = a.getAttribute (javax.swing.text.StyleConstants.Background);
if (fg == null) {
fg = java.awt.Color.black;
}return fg;
}, "javax.swing.text.AttributeSet");
c$.setBackground = Clazz.defineMethod (c$, "setBackground", 
function (a, fg) {
a.addAttribute (javax.swing.text.StyleConstants.Background, fg);
}, "javax.swing.text.MutableAttributeSet,java.awt.Color");
c$.getFirstLineIndent = Clazz.defineMethod (c$, "getFirstLineIndent", 
function (a) {
var indent = a.getAttribute (javax.swing.text.StyleConstants.FirstLineIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setFirstLineIndent = Clazz.defineMethod (c$, "setFirstLineIndent", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.FirstLineIndent,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getRightIndent = Clazz.defineMethod (c$, "getRightIndent", 
function (a) {
var indent = a.getAttribute (javax.swing.text.StyleConstants.RightIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setRightIndent = Clazz.defineMethod (c$, "setRightIndent", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.RightIndent,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getLeftIndent = Clazz.defineMethod (c$, "getLeftIndent", 
function (a) {
var indent = a.getAttribute (javax.swing.text.StyleConstants.LeftIndent);
if (indent != null) {
return indent.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setLeftIndent = Clazz.defineMethod (c$, "setLeftIndent", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.LeftIndent,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getLineSpacing = Clazz.defineMethod (c$, "getLineSpacing", 
function (a) {
var space = a.getAttribute (javax.swing.text.StyleConstants.LineSpacing);
if (space != null) {
return space.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setLineSpacing = Clazz.defineMethod (c$, "setLineSpacing", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.LineSpacing,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getSpaceAbove = Clazz.defineMethod (c$, "getSpaceAbove", 
function (a) {
var space = a.getAttribute (javax.swing.text.StyleConstants.SpaceAbove);
if (space != null) {
return space.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setSpaceAbove = Clazz.defineMethod (c$, "setSpaceAbove", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.SpaceAbove,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getSpaceBelow = Clazz.defineMethod (c$, "getSpaceBelow", 
function (a) {
var space = a.getAttribute (javax.swing.text.StyleConstants.SpaceBelow);
if (space != null) {
return space.floatValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setSpaceBelow = Clazz.defineMethod (c$, "setSpaceBelow", 
function (a, i) {
a.addAttribute (javax.swing.text.StyleConstants.SpaceBelow,  new Float (i));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getAlignment = Clazz.defineMethod (c$, "getAlignment", 
function (a) {
var align = a.getAttribute (javax.swing.text.StyleConstants.Alignment);
if (align != null) {
return align.intValue ();
}return 0;
}, "javax.swing.text.AttributeSet");
c$.setAlignment = Clazz.defineMethod (c$, "setAlignment", 
function (a, align) {
a.addAttribute (javax.swing.text.StyleConstants.Alignment,  new Integer (align));
}, "javax.swing.text.MutableAttributeSet,~N");
c$.getTabSet = Clazz.defineMethod (c$, "getTabSet", 
function (a) {
var tabs = a.getAttribute (javax.swing.text.StyleConstants.TabSet);
return tabs;
}, "javax.swing.text.AttributeSet");
c$.setTabSet = Clazz.defineMethod (c$, "setTabSet", 
function (a, tabs) {
a.addAttribute (javax.swing.text.StyleConstants.TabSet, tabs);
}, "javax.swing.text.MutableAttributeSet,javax.swing.text.TabSet");
Clazz.makeConstructor (c$, 
function (representation) {
this.representation = representation;
}, "~S");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyleConstants, "ParagraphConstants", javax.swing.text.StyleConstants, javax.swing.text.AttributeSet.ParagraphAttribute);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyleConstants, "CharacterConstants", javax.swing.text.StyleConstants, javax.swing.text.AttributeSet.CharacterAttribute);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyleConstants, "ColorConstants", javax.swing.text.StyleConstants, [javax.swing.text.AttributeSet.ColorAttribute, javax.swing.text.AttributeSet.CharacterAttribute]);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.StyleConstants, "FontConstants", javax.swing.text.StyleConstants, [javax.swing.text.AttributeSet.FontAttribute, javax.swing.text.AttributeSet.CharacterAttribute]);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"ComponentElementName", "component",
"IconElementName", "icon");
c$.NameAttribute = c$.prototype.NameAttribute =  new javax.swing.text.StyleConstants ("name");
c$.ResolveAttribute = c$.prototype.ResolveAttribute =  new javax.swing.text.StyleConstants ("resolver");
c$.ModelAttribute = c$.prototype.ModelAttribute =  new javax.swing.text.StyleConstants ("model");
c$.BidiLevel = c$.prototype.BidiLevel =  new javax.swing.text.StyleConstants.CharacterConstants ("bidiLevel");
c$.FontFamily = c$.prototype.FontFamily =  new javax.swing.text.StyleConstants.FontConstants ("family");
c$.Family = c$.prototype.Family = javax.swing.text.StyleConstants.FontFamily;
c$.FontSize = c$.prototype.FontSize =  new javax.swing.text.StyleConstants.FontConstants ("size");
c$.Size = c$.prototype.Size = javax.swing.text.StyleConstants.FontSize;
c$.Bold = c$.prototype.Bold =  new javax.swing.text.StyleConstants.FontConstants ("bold");
c$.Italic = c$.prototype.Italic =  new javax.swing.text.StyleConstants.FontConstants ("italic");
c$.Underline = c$.prototype.Underline =  new javax.swing.text.StyleConstants.CharacterConstants ("underline");
c$.StrikeThrough = c$.prototype.StrikeThrough =  new javax.swing.text.StyleConstants.CharacterConstants ("strikethrough");
c$.Superscript = c$.prototype.Superscript =  new javax.swing.text.StyleConstants.CharacterConstants ("superscript");
c$.Subscript = c$.prototype.Subscript =  new javax.swing.text.StyleConstants.CharacterConstants ("subscript");
c$.Foreground = c$.prototype.Foreground =  new javax.swing.text.StyleConstants.ColorConstants ("foreground");
c$.Background = c$.prototype.Background =  new javax.swing.text.StyleConstants.ColorConstants ("background");
c$.ComponentAttribute = c$.prototype.ComponentAttribute =  new javax.swing.text.StyleConstants.CharacterConstants ("component");
c$.IconAttribute = c$.prototype.IconAttribute =  new javax.swing.text.StyleConstants.CharacterConstants ("icon");
c$.ComposedTextAttribute = c$.prototype.ComposedTextAttribute =  new javax.swing.text.StyleConstants ("composed text");
c$.FirstLineIndent = c$.prototype.FirstLineIndent =  new javax.swing.text.StyleConstants.ParagraphConstants ("FirstLineIndent");
c$.LeftIndent = c$.prototype.LeftIndent =  new javax.swing.text.StyleConstants.ParagraphConstants ("LeftIndent");
c$.RightIndent = c$.prototype.RightIndent =  new javax.swing.text.StyleConstants.ParagraphConstants ("RightIndent");
c$.LineSpacing = c$.prototype.LineSpacing =  new javax.swing.text.StyleConstants.ParagraphConstants ("LineSpacing");
c$.SpaceAbove = c$.prototype.SpaceAbove =  new javax.swing.text.StyleConstants.ParagraphConstants ("SpaceAbove");
c$.SpaceBelow = c$.prototype.SpaceBelow =  new javax.swing.text.StyleConstants.ParagraphConstants ("SpaceBelow");
c$.Alignment = c$.prototype.Alignment =  new javax.swing.text.StyleConstants.ParagraphConstants ("Alignment");
c$.TabSet = c$.prototype.TabSet =  new javax.swing.text.StyleConstants.ParagraphConstants ("TabSet");
c$.Orientation = c$.prototype.Orientation =  new javax.swing.text.StyleConstants.ParagraphConstants ("Orientation");
Clazz.defineStatics (c$,
"ALIGN_LEFT", 0,
"ALIGN_CENTER", 1,
"ALIGN_RIGHT", 2,
"ALIGN_JUSTIFIED", 3);
c$.keys = c$.prototype.keys = [javax.swing.text.StyleConstants.NameAttribute, javax.swing.text.StyleConstants.ResolveAttribute, javax.swing.text.StyleConstants.BidiLevel, javax.swing.text.StyleConstants.FontFamily, javax.swing.text.StyleConstants.FontSize, javax.swing.text.StyleConstants.Bold, javax.swing.text.StyleConstants.Italic, javax.swing.text.StyleConstants.Underline, javax.swing.text.StyleConstants.StrikeThrough, javax.swing.text.StyleConstants.Superscript, javax.swing.text.StyleConstants.Subscript, javax.swing.text.StyleConstants.Foreground, javax.swing.text.StyleConstants.Background, javax.swing.text.StyleConstants.ComponentAttribute, javax.swing.text.StyleConstants.IconAttribute, javax.swing.text.StyleConstants.FirstLineIndent, javax.swing.text.StyleConstants.LeftIndent, javax.swing.text.StyleConstants.RightIndent, javax.swing.text.StyleConstants.LineSpacing, javax.swing.text.StyleConstants.SpaceAbove, javax.swing.text.StyleConstants.SpaceBelow, javax.swing.text.StyleConstants.Alignment, javax.swing.text.StyleConstants.TabSet, javax.swing.text.StyleConstants.Orientation, javax.swing.text.StyleConstants.ModelAttribute, javax.swing.text.StyleConstants.ComposedTextAttribute];
});
