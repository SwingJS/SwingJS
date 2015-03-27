Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.AbstractBorder", "jsjava.awt.Point"], "jsjavax.swing.border.TitledBorder", ["java.lang.IllegalArgumentException", "$.NullPointerException", "jsjava.awt.Component", "$.Dimension", "$.Font", "$.Insets", "$.Rectangle", "jsjavax.swing.JComponent", "$.UIManager", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.decorateAsClass (function () {
this.title = null;
this.border = null;
this.titlePosition = 0;
this.titleJustification = 0;
this.titleFont = null;
this.titleColor = null;
this.textLoc = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.border, "TitledBorder", jsjavax.swing.border.AbstractBorder);
Clazz.prepareFields (c$, function () {
this.textLoc =  new jsjava.awt.Point ();
});
Clazz.makeConstructor (c$, 
function (title) {
this.construct (null, title, 4, 0, null, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (border) {
this.construct (border, "", 4, 0, null, null);
}, "jsjavax.swing.border.Border");
Clazz.makeConstructor (c$, 
function (border, title) {
this.construct (border, title, 4, 0, null, null);
}, "jsjavax.swing.border.Border,~S");
Clazz.makeConstructor (c$, 
function (border, title, titleJustification, titlePosition) {
this.construct (border, title, titleJustification, titlePosition, null, null);
}, "jsjavax.swing.border.Border,~S,~N,~N");
Clazz.makeConstructor (c$, 
function (border, title, titleJustification, titlePosition, titleFont) {
this.construct (border, title, titleJustification, titlePosition, titleFont, null);
}, "jsjavax.swing.border.Border,~S,~N,~N,jsjava.awt.Font");
Clazz.makeConstructor (c$, 
function (border, title, titleJustification, titlePosition, titleFont, titleColor) {
Clazz.superConstructor (this, jsjavax.swing.border.TitledBorder, []);
this.title = title;
this.border = border;
this.titleFont = titleFont;
this.titleColor = titleColor;
this.setTitleJustification (titleJustification);
this.setTitlePosition (titlePosition);
}, "jsjavax.swing.border.Border,~S,~N,~N,jsjava.awt.Font,jsjava.awt.Color");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
var border = this.getBorder ();
if (this.getTitle () == null || this.getTitle ().equals ("")) {
if (border != null) {
border.paintBorder (c, g, x, y, width, height);
}return;
}var grooveRect =  new jsjava.awt.Rectangle (x + 2, y + 2, width - (4), height - (4));
var font = g.getFont ();
var color = g.getColor ();
g.setFont (this.getFont (c));
var jc = (Clazz.instanceOf (c, jsjavax.swing.JComponent)) ? c : null;
var fm = jssun.swing.SwingUtilities2.getFontMetrics (jc, g);
var fontHeight = fm.getHeight ();
var descent = fm.getDescent ();
var ascent = fm.getAscent ();
var diff;
var stringWidth = jssun.swing.SwingUtilities2.stringWidth (jc, fm, this.getTitle ());
var insets;
if (border != null) {
insets = border.getBorderInsets (c);
} else {
insets =  new jsjava.awt.Insets (0, 0, 0, 0);
}var titlePos = this.getTitlePosition ();
switch (titlePos) {
case 1:
diff = ascent + descent + (Math.max (2, 4) - 2);
grooveRect.y += diff;
grooveRect.height -= diff;
this.textLoc.y = grooveRect.y - (descent + 2);
break;
case 2:
case 0:
diff = Math.max (0, ((Clazz.doubleToInt (ascent / 2)) + 2) - 2);
grooveRect.y += diff;
grooveRect.height -= diff;
this.textLoc.y = (grooveRect.y - descent) + Clazz.doubleToInt ((insets.top + ascent + descent) / 2);
break;
case 3:
this.textLoc.y = grooveRect.y + insets.top + ascent + 2;
break;
case 4:
this.textLoc.y = (grooveRect.y + grooveRect.height) - (insets.bottom + descent + 2);
break;
case 5:
grooveRect.height -= Clazz.doubleToInt (fontHeight / 2);
this.textLoc.y = ((grooveRect.y + grooveRect.height) - descent) + Clazz.doubleToInt (((ascent + descent) - insets.bottom) / 2);
break;
case 6:
grooveRect.height -= fontHeight;
this.textLoc.y = grooveRect.y + grooveRect.height + ascent + 2;
break;
}
var justification = this.getTitleJustification ();
if (jsjavax.swing.border.AbstractBorder.isLeftToRight (c)) {
if (justification == 4 || justification == 0) {
justification = 1;
} else if (justification == 5) {
justification = 3;
}} else {
if (justification == 4 || justification == 0) {
justification = 3;
} else if (justification == 5) {
justification = 1;
}}switch (justification) {
case 1:
this.textLoc.x = grooveRect.x + 5 + insets.left;
break;
case 3:
this.textLoc.x = (grooveRect.x + grooveRect.width) - (stringWidth + 5 + insets.right);
break;
case 2:
this.textLoc.x = grooveRect.x + (Clazz.doubleToInt ((grooveRect.width - stringWidth) / 2));
break;
}
if (border != null) {
if (((titlePos == 2 || titlePos == 0) && (grooveRect.y > this.textLoc.y - ascent)) || (titlePos == 5 && (grooveRect.y + grooveRect.height < this.textLoc.y + descent))) {
var clipRect =  new jsjava.awt.Rectangle ();
var saveClip = g.getClipBounds ();
clipRect.setBounds (saveClip);
if (jsjavax.swing.border.TitledBorder.computeIntersection (clipRect, x, y, this.textLoc.x - 1 - x, height)) {
g.setClip (clipRect);
border.paintBorder (c, g, grooveRect.x, grooveRect.y, grooveRect.width, grooveRect.height);
}clipRect.setBounds (saveClip);
if (jsjavax.swing.border.TitledBorder.computeIntersection (clipRect, this.textLoc.x + stringWidth + 1, y, x + width - (this.textLoc.x + stringWidth + 1), height)) {
g.setClip (clipRect);
border.paintBorder (c, g, grooveRect.x, grooveRect.y, grooveRect.width, grooveRect.height);
}if (titlePos == 2 || titlePos == 0) {
clipRect.setBounds (saveClip);
if (jsjavax.swing.border.TitledBorder.computeIntersection (clipRect, this.textLoc.x - 1, this.textLoc.y + descent, stringWidth + 2, y + height - this.textLoc.y - descent)) {
g.setClip (clipRect);
border.paintBorder (c, g, grooveRect.x, grooveRect.y, grooveRect.width, grooveRect.height);
}} else {
clipRect.setBounds (saveClip);
if (jsjavax.swing.border.TitledBorder.computeIntersection (clipRect, this.textLoc.x - 1, y, stringWidth + 2, this.textLoc.y - ascent - y)) {
g.setClip (clipRect);
border.paintBorder (c, g, grooveRect.x, grooveRect.y, grooveRect.width, grooveRect.height);
}}g.setClip (saveClip);
} else {
border.paintBorder (c, g, grooveRect.x, grooveRect.y, grooveRect.width, grooveRect.height);
}}g.setColor (this.getTitleColor ());
jssun.swing.SwingUtilities2.drawString (jc, g, this.getTitle (), this.textLoc.x, this.textLoc.y);
g.setFont (font);
g.setColor (color);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets (c,  new jsjava.awt.Insets (0, 0, 0, 0));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
var fm;
var descent = 0;
var ascent = 16;
var height = 16;
var border = this.getBorder ();
if (border != null) {
if (Clazz.instanceOf (border, jsjavax.swing.border.AbstractBorder)) {
(border).getBorderInsets (c, insets);
} else {
var i = border.getBorderInsets (c);
insets.top = i.top;
insets.right = i.right;
insets.bottom = i.bottom;
insets.left = i.left;
}} else {
insets.left = insets.top = insets.right = insets.bottom = 0;
}insets.left += 4;
insets.right += 4;
insets.top += 4;
insets.bottom += 4;
if (c == null || this.getTitle () == null || this.getTitle ().equals ("")) {
return insets;
}var font = this.getFont (c);
fm = c.getFontMetrics (font);
if (fm != null) {
descent = fm.getDescent ();
ascent = fm.getAscent ();
height = fm.getHeight ();
}switch (this.getTitlePosition ()) {
case 1:
insets.top += ascent + descent + (Math.max (2, 4) - 2);
break;
case 2:
case 0:
insets.top += ascent + descent;
break;
case 3:
insets.top += ascent + descent + 2;
break;
case 4:
insets.bottom += ascent + descent + 2;
break;
case 5:
insets.bottom += ascent + descent;
break;
case 6:
insets.bottom += height;
break;
}
return insets;
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "getBorder", 
function () {
var b = this.border;
if (b == null) b = jsjavax.swing.UIManager.getBorder ("TitledBorder.border");
return b;
});
Clazz.defineMethod (c$, "getTitlePosition", 
function () {
if (this.titlePosition == 0) {
var value = jsjavax.swing.UIManager.get ("TitledBorder.position");
if (Clazz.instanceOf (value, String)) {
var s = value;
if ("ABOVE_TOP".equalsIgnoreCase (s)) {
return 1;
} else if ("TOP".equalsIgnoreCase (s)) {
return 2;
} else if ("BELOW_TOP".equalsIgnoreCase (s)) {
return 3;
} else if ("ABOVE_BOTTOM".equalsIgnoreCase (s)) {
return 4;
} else if ("BOTTOM".equalsIgnoreCase (s)) {
return 5;
} else if ("BELOW_BOTTOM".equalsIgnoreCase (s)) {
return 6;
}} else if (Clazz.instanceOf (value, Integer)) {
var i = (value).intValue ();
if (i >= 0 && i <= 6) {
return i;
}}}return this.titlePosition;
});
Clazz.defineMethod (c$, "getTitleJustification", 
function () {
return this.titleJustification;
});
Clazz.defineMethod (c$, "getTitleFont", 
function () {
var f = this.titleFont;
if (f == null) f = jsjavax.swing.UIManager.getFont ("TitledBorder.font");
return f;
});
Clazz.defineMethod (c$, "getTitleColor", 
function () {
var c = this.titleColor;
if (c == null) c = jsjavax.swing.UIManager.getColor ("TitledBorder.titleColor");
return c;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.defineMethod (c$, "setBorder", 
function (border) {
this.border = border;
}, "jsjavax.swing.border.Border");
Clazz.defineMethod (c$, "setTitlePosition", 
function (titlePosition) {
switch (titlePosition) {
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 0:
this.titlePosition = titlePosition;
break;
default:
throw  new IllegalArgumentException (titlePosition + " is not a valid title position.");
}
}, "~N");
Clazz.defineMethod (c$, "setTitleJustification", 
function (titleJustification) {
switch (titleJustification) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
this.titleJustification = titleJustification;
break;
default:
throw  new IllegalArgumentException (titleJustification + " is not a valid title justification.");
}
}, "~N");
Clazz.defineMethod (c$, "setTitleFont", 
function (titleFont) {
this.titleFont = titleFont;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "setTitleColor", 
function (titleColor) {
this.titleColor = titleColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getMinimumSize", 
function (c) {
var insets = this.getBorderInsets (c);
var minSize =  new jsjava.awt.Dimension (insets.right + insets.left, insets.top + insets.bottom);
var font = this.getFont (c);
var fm = c.getFontMetrics (font);
var jc = (Clazz.instanceOf (c, jsjavax.swing.JComponent)) ? c : null;
switch (this.getTitlePosition ()) {
case 1:
case 6:
minSize.width = Math.max (jssun.swing.SwingUtilities2.stringWidth (jc, fm, this.getTitle ()), minSize.width);
break;
case 3:
case 4:
case 2:
case 5:
case 0:
default:
minSize.width += jssun.swing.SwingUtilities2.stringWidth (jc, fm, this.getTitle ());
}
return minSize;
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "getBaseline", 
function (c, width, height) {
if (c == null) {
throw  new NullPointerException ("Must supply non-null component");
}if (height < 0) {
throw  new IllegalArgumentException ("Height must be >= 0");
}var title = this.getTitle ();
if (title != null && !"".equals (title)) {
var font = this.getFont (c);
var border2 = this.getBorder ();
var borderInsets;
if (border2 != null) {
borderInsets = border2.getBorderInsets (c);
} else {
borderInsets =  new jsjava.awt.Insets (0, 0, 0, 0);
}var fm = c.getFontMetrics (font);
var fontHeight = fm.getHeight ();
var descent = fm.getDescent ();
var ascent = fm.getAscent ();
var y = 2;
var h = height - 4;
var diff;
switch (this.getTitlePosition ()) {
case 1:
diff = ascent + descent + (Math.max (2, 4) - 2);
return y + diff - (descent + 2);
case 2:
case 0:
diff = Math.max (0, ((Clazz.doubleToInt (ascent / 2)) + 2) - 2);
return (y + diff - descent) + Clazz.doubleToInt ((borderInsets.top + ascent + descent) / 2);
case 3:
return y + borderInsets.top + ascent + 2;
case 4:
return (y + h) - (borderInsets.bottom + descent + 2);
case 5:
h -= Clazz.doubleToInt (fontHeight / 2);
return ((y + h) - descent) + Clazz.doubleToInt (((ascent + descent) - borderInsets.bottom) / 2);
case 6:
h -= fontHeight;
return y + h + ascent + 2;
}
}return -1;
}, "jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function (c) {
Clazz.superCall (this, jsjavax.swing.border.TitledBorder, "getBaselineResizeBehavior", [c]);
switch (this.getTitlePosition ()) {
case 1:
case 2:
case 0:
case 3:
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
case 4:
case 5:
case 6:
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT;
}
return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getFont", 
function (c) {
var font;
if ((font = this.getTitleFont ()) != null) {
return font;
} else if (c != null && (font = c.getFont ()) != null) {
return font;
}return  new jsjava.awt.Font ("Dialog", 0, 12);
}, "jsjava.awt.Component");
c$.computeIntersection = Clazz.defineMethod (c$, "computeIntersection", 
($fz = function (dest, rx, ry, rw, rh) {
var x1 = Math.max (rx, dest.x);
var x2 = Math.min (rx + rw, dest.x + dest.width);
var y1 = Math.max (ry, dest.y);
var y2 = Math.min (ry + rh, dest.y + dest.height);
dest.x = x1;
dest.y = y1;
dest.width = x2 - x1;
dest.height = y2 - y1;
if (dest.width <= 0 || dest.height <= 0) {
return false;
}return true;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,~N,~N,~N,~N");
Clazz.defineStatics (c$,
"DEFAULT_POSITION", 0,
"ABOVE_TOP", 1,
"TOP", 2,
"BELOW_TOP", 3,
"ABOVE_BOTTOM", 4,
"BOTTOM", 5,
"BELOW_BOTTOM", 6,
"DEFAULT_JUSTIFICATION", 0,
"LEFT", 1,
"CENTER", 2,
"RIGHT", 3,
"LEADING", 4,
"TRAILING", 5,
"EDGE_SPACING", 2,
"TEXT_SPACING", 2,
"TEXT_INSET_H", 5);
});
