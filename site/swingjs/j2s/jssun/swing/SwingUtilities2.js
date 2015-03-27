Clazz.declarePackage ("jssun.swing");
Clazz.load (["java.lang.Enum", "jsjava.awt.font.FontRenderContext", "jssun.swing.StringUIClientPropertyKey"], "jssun.swing.SwingUtilities2", ["java.lang.Boolean", "$.NullPointerException", "$.StringBuffer", "java.util.concurrent.FutureTask", "jsjava.awt.Graphics2D", "$.RenderingHints", "jsjavax.swing.SwingUtilities", "$.UIManager", "jsjavax.swing.text.DefaultCaret", "$.JTextComponent", "jssun.awt.SunHints", "jssun.font.FontDesignMetrics"], function () {
c$ = Clazz.declareType (jssun.swing, "SwingUtilities2");
c$.isComplexLayout = Clazz.defineMethod (c$, "isComplexLayout", 
function (text, start, limit) {
return false;
}, "~A,~N,~N");
c$.drawTextAntialiased = Clazz.defineMethod (c$, "drawTextAntialiased", 
function (c) {
if (c != null) {
return c.getClientProperty (jssun.swing.SwingUtilities2.AA_TEXT_PROPERTY_KEY);
}return null;
}, "jsjavax.swing.JComponent");
c$.getLeftSideBearing = Clazz.defineMethod (c$, "getLeftSideBearing", 
function (c, fm, string) {
if ((string == null) || (string.length == 0)) {
return 0;
}return jssun.swing.SwingUtilities2.getLeftSideBearing (c, fm, string.charAt (0));
}, "jsjavax.swing.JComponent,jsjava.awt.FontMetrics,~S");
c$.getLeftSideBearing = Clazz.defineMethod (c$, "getLeftSideBearing", 
function (c, fm, firstChar) {
return 0;
}, "jsjavax.swing.JComponent,jsjava.awt.FontMetrics,~S");
c$.getRightSideBearing = Clazz.defineMethod (c$, "getRightSideBearing", 
function (c, fm, string) {
if ((string == null) || (string.length == 0)) {
return 0;
}return jssun.swing.SwingUtilities2.getRightSideBearing (c, fm, string.charAt (string.length - 1));
}, "jsjavax.swing.JComponent,jsjava.awt.FontMetrics,~S");
c$.getRightSideBearing = Clazz.defineMethod (c$, "getRightSideBearing", 
function (c, fm, lastChar) {
return 0;
}, "jsjavax.swing.JComponent,jsjava.awt.FontMetrics,~S");
c$.getFontMetrics = Clazz.defineMethod (c$, "getFontMetrics", 
function (c, g) {
return jssun.swing.SwingUtilities2.getFontMetrics (c, g, g.getFont ());
}, "jsjavax.swing.JComponent,jsjava.awt.Graphics");
c$.getFontMetrics = Clazz.defineMethod (c$, "getFontMetrics", 
function (c, g, font) {
if (c != null) {
return c.getFontMetrics (font);
}return null;
}, "jsjavax.swing.JComponent,jsjava.awt.Graphics,jsjava.awt.Font");
c$.stringWidth = Clazz.defineMethod (c$, "stringWidth", 
function (c, fm, string) {
if (string == null || string.equals ("")) {
return 0;
}return fm.stringWidth (string);
}, "jsjavax.swing.JComponent,jsjava.awt.FontMetrics,~S");
c$.drawString = Clazz.defineMethod (c$, "drawString", 
function (c, g, text, x, y) {
if (text == null || text.length <= 0) {
return;
}var info = jssun.swing.SwingUtilities2.drawTextAntialiased (c);
if (info != null && (Clazz.instanceOf (g, jsjava.awt.Graphics2D))) {
var g2 = g;
var oldContrast = null;
var oldAAValue = g2.getRenderingHint (jssun.awt.SunHints.KEY_TEXT_ANTIALIASING);
if (info.aaHint !== oldAAValue) {
g2.setRenderingHint (jssun.awt.SunHints.KEY_TEXT_ANTIALIASING, info.aaHint);
} else {
oldAAValue = null;
}if (info.lcdContrastHint != null) {
oldContrast = g2.getRenderingHint (jsjava.awt.RenderingHints.KEY_TEXT_LCD_CONTRAST);
if (info.lcdContrastHint.equals (oldContrast)) {
oldContrast = null;
} else {
g2.setRenderingHint (jsjava.awt.RenderingHints.KEY_TEXT_LCD_CONTRAST, info.lcdContrastHint);
}}g.drawString (text, x, y);
if (oldAAValue != null) {
g2.setRenderingHint (jssun.awt.SunHints.KEY_TEXT_ANTIALIASING, oldAAValue);
}if (oldContrast != null) {
g2.setRenderingHint (jsjava.awt.RenderingHints.KEY_TEXT_LCD_CONTRAST, oldContrast);
}} else {
g.drawString (text, x, y);
}}, "jsjavax.swing.JComponent,jsjava.awt.Graphics,~S,~N,~N");
c$.loc2IndexFileList = Clazz.defineMethod (c$, "loc2IndexFileList", 
function (list, point) {
var index = list.locationToIndex (point);
if (index != -1) {
var bySize = list.getClientProperty ("List.isFileList");
if (Clazz.instanceOf (bySize, Boolean) && (bySize).booleanValue () && !jssun.swing.SwingUtilities2.pointIsInActualBounds (list, index, point)) {
index = -1;
}}return index;
}, "jsjavax.swing.JList,jsjava.awt.Point");
c$.pointIsInActualBounds = Clazz.defineMethod (c$, "pointIsInActualBounds", 
($fz = function (list, index, point) {
var renderer = list.getCellRenderer ();
var dataModel = list.getModel ();
var value = dataModel.getElementAt (index);
var item = renderer.getListCellRendererComponent (list, value, index, false, false);
var itemSize = item.getPreferredSize ();
var cellBounds = list.getCellBounds (index, index);
if (!item.getComponentOrientation ().isLeftToRight ()) {
cellBounds.x += (cellBounds.width - itemSize.width);
}cellBounds.width = itemSize.width;
return cellBounds.contains (point);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JList,~N,jsjava.awt.Point");
c$.pointOutsidePrefSize = Clazz.defineMethod (c$, "pointOutsidePrefSize", 
function (table, row, column, p) {
if (table.convertColumnIndexToModel (column) != 0 || row == -1) {
return true;
}var tcr = table.getCellRenderer (row, column);
var value = table.getValueAt (row, column);
var cell = tcr.getTableCellRendererComponent (table, value, false, false, row, column);
var itemSize = cell.getPreferredSize ();
var cellBounds = table.getCellRect (row, column, false);
cellBounds.width = itemSize.width;
cellBounds.height = itemSize.height;
if (p.x > cellBounds.x + cellBounds.width || p.y > cellBounds.y + cellBounds.height) {
return true;
}return false;
}, "jsjavax.swing.JTable,~N,~N,jsjava.awt.Point");
c$.setLeadAnchorWithoutSelection = Clazz.defineMethod (c$, "setLeadAnchorWithoutSelection", 
function (model, lead, anchor) {
if (anchor == -1) {
anchor = lead;
}if (lead == -1) {
model.setAnchorSelectionIndex (-1);
model.setLeadSelectionIndex (-1);
} else {
if (model.isSelectedIndex (lead)) {
model.addSelectionInterval (lead, lead);
} else {
model.removeSelectionInterval (lead, lead);
}model.setAnchorSelectionIndex (anchor);
}}, "jsjavax.swing.ListSelectionModel,~N,~N");
c$.shouldIgnore = Clazz.defineMethod (c$, "shouldIgnore", 
function (me, c) {
return c == null || !c.isEnabled () || !jsjavax.swing.SwingUtilities.isLeftMouseButton (me) || me.isConsumed ();
}, "jsjava.awt.event.MouseEvent,jsjavax.swing.JComponent");
c$.adjustFocus = Clazz.defineMethod (c$, "adjustFocus", 
function (c) {
if (!c.hasFocus () && c.isRequestFocusEnabled ()) {
c.requestFocus ();
}}, "jsjavax.swing.JComponent");
c$.getGraphics2D = Clazz.defineMethod (c$, "getGraphics2D", 
function (g) {
if (Clazz.instanceOf (g, jsjava.awt.Graphics2D)) {
return g;
} else {
return null;
}}, "jsjava.awt.Graphics");
c$.getFontRenderContext = Clazz.defineMethod (c$, "getFontRenderContext", 
function (c) {
if (c == null) {
return jssun.swing.SwingUtilities2.DEFAULT_FRC;
} else {
return c.getFontMetrics (c.getFont ()).getFontRenderContext ();
}}, "jsjava.awt.Component");
c$.getFontMetrics = Clazz.defineMethod (c$, "getFontMetrics", 
function (c, font) {
var frc = jssun.swing.SwingUtilities2.DEFAULT_FRC;
return jssun.font.FontDesignMetrics.getMetrics (font, frc);
}, "jsjavax.swing.JComponent,jsjava.awt.Font");
c$.isPrinting = Clazz.defineMethod (c$, "isPrinting", 
function (g) {
return false;
}, "jsjava.awt.Graphics");
c$.useSelectedTextColor = Clazz.defineMethod (c$, "useSelectedTextColor", 
function (h, c) {
var painter = h.getPainter ();
var painterClass = painter.getClass ().getName ();
if (painterClass.indexOf ("javax.swing.text.DefaultHighlighter") != 0 && painterClass.indexOf ("com.sun.java.swing.plaf.windows.WindowsTextUI") != 0) {
return false;
}try {
var defPainter = painter;
if (defPainter.getColor () != null && !defPainter.getColor ().equals (c.getSelectionColor ())) {
return false;
}} catch (e) {
if (Clazz.exceptionOf (e, ClassCastException)) {
return false;
} else {
throw e;
}
}
return true;
}, "jsjavax.swing.text.Highlighter.Highlight,jsjavax.swing.text.JTextComponent");
c$.canAccessSystemClipboard = Clazz.defineMethod (c$, "canAccessSystemClipboard", 
function () {
var canAccess = false;
return canAccess;
});
c$.canCurrentEventAccessSystemClipboard = Clazz.defineMethod (c$, "canCurrentEventAccessSystemClipboard", 
function () {
return false;
});
c$.canEventAccessSystemClipboard = Clazz.defineMethod (c$, "canEventAccessSystemClipboard", 
function (e) {
return false;
}, "jsjava.awt.AWTEvent");
c$.displayPropertiesToCSS = Clazz.defineMethod (c$, "displayPropertiesToCSS", 
function (font, fg) {
var rule =  new StringBuffer ("body {");
if (font != null) {
rule.append (" font-family: ");
rule.append (font.getFamily ());
rule.append (" ; ");
rule.append (" font-size: ");
rule.append (font.getSize ());
rule.append ("pt ;");
if (font.isBold ()) {
rule.append (" font-weight: 700 ; ");
}if (font.isItalic ()) {
rule.append (" font-style: italic ; ");
}}if (fg != null) {
rule.append (" color: #");
if (fg.getRed () < 16) {
rule.append ('0');
}rule.append (Integer.toHexString (fg.getRed ()));
if (fg.getGreen () < 16) {
rule.append ('0');
}rule.append (Integer.toHexString (fg.getGreen ()));
if (fg.getBlue () < 16) {
rule.append ('0');
}rule.append (Integer.toHexString (fg.getBlue ()));
rule.append (" ; ");
}rule.append (" }");
return rule.toString ();
}, "jsjava.awt.Font,jsjava.awt.Color");
c$.makeIcon = Clazz.defineMethod (c$, "makeIcon", 
function (baseClass, rootClass, imageFile) {
return null;
}, "Class,Class,~S");
c$.isLocalDisplay = Clazz.defineMethod (c$, "isLocalDisplay", 
function () {
return true;
});
c$.getUIDefaultsInt = Clazz.defineMethod (c$, "getUIDefaultsInt", 
function (key) {
return jssun.swing.SwingUtilities2.getUIDefaultsInt (key, 0);
}, "~O");
c$.getUIDefaultsInt = Clazz.defineMethod (c$, "getUIDefaultsInt", 
function (key, l) {
return jssun.swing.SwingUtilities2.getUIDefaultsInt (key, l, 0);
}, "~O,java.util.Locale");
c$.getUIDefaultsInt = Clazz.defineMethod (c$, "getUIDefaultsInt", 
function (key, defaultValue) {
return jssun.swing.SwingUtilities2.getUIDefaultsInt (key, null, defaultValue);
}, "~O,~N");
c$.getUIDefaultsInt = Clazz.defineMethod (c$, "getUIDefaultsInt", 
function (key, l, defaultValue) {
var value = jsjavax.swing.UIManager.get (key, l);
if (Clazz.instanceOf (value, Integer)) {
return (value).intValue ();
}if (Clazz.instanceOf (value, String)) {
try {
return Integer.parseInt (value);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}return defaultValue;
}, "~O,java.util.Locale,~N");
c$.submit = Clazz.defineMethod (c$, "submit", 
function (task) {
if (task == null) {
throw  new NullPointerException ();
}var future =  new java.util.concurrent.FutureTask (task);
jssun.swing.SwingUtilities2.execute (future);
return future;
}, "java.util.concurrent.Callable");
c$.submit = Clazz.defineMethod (c$, "submit", 
function (task, result) {
if (task == null) {
throw  new NullPointerException ();
}var future =  new java.util.concurrent.FutureTask (task, result);
jssun.swing.SwingUtilities2.execute (future);
return future;
}, "Runnable,~O");
c$.execute = Clazz.defineMethod (c$, "execute", 
($fz = function (command) {
jsjavax.swing.SwingUtilities.invokeLater (command);
}, $fz.isPrivate = true, $fz), "Runnable");
c$.setSkipClickCount = Clazz.defineMethod (c$, "setSkipClickCount", 
function (comp, count) {
if (Clazz.instanceOf (comp, jsjavax.swing.text.JTextComponent) && Clazz.instanceOf ((comp).getCaret (), jsjavax.swing.text.DefaultCaret)) {
(comp).putClientProperty (jssun.swing.SwingUtilities2.SKIP_CLICK_COUNT, new Integer (count));
}}, "jsjava.awt.Component,~N");
c$.getAdjustedClickCount = Clazz.defineMethod (c$, "getAdjustedClickCount", 
function (comp, e) {
var cc = e.getClickCount ();
if (cc == 1) {
comp.putClientProperty (jssun.swing.SwingUtilities2.SKIP_CLICK_COUNT, null);
} else {
var sub = comp.getClientProperty (jssun.swing.SwingUtilities2.SKIP_CLICK_COUNT);
if (sub != null) {
return cc - (sub).intValue ();
}}return cc;
}, "jsjavax.swing.text.JTextComponent,jsjava.awt.event.MouseEvent");
c$.liesIn = Clazz.defineMethod (c$, "liesIn", 
($fz = function (rect, p, horizontal, ltr, three) {
var p0;
var pComp;
var length;
var forward;
if (horizontal) {
p0 = rect.x;
pComp = p.x;
length = rect.width;
forward = ltr;
} else {
p0 = rect.y;
pComp = p.y;
length = rect.height;
forward = true;
}if (three) {
var boundary = (length >= 30) ? 10 : Clazz.doubleToInt (length / 3);
if (pComp < p0 + boundary) {
return forward ? jssun.swing.SwingUtilities2.Section.LEADING : jssun.swing.SwingUtilities2.Section.TRAILING;
} else if (pComp >= p0 + length - boundary) {
return forward ? jssun.swing.SwingUtilities2.Section.TRAILING : jssun.swing.SwingUtilities2.Section.LEADING;
}return jssun.swing.SwingUtilities2.Section.MIDDLE;
} else {
var middle = p0 + Clazz.doubleToInt (length / 2);
if (forward) {
return pComp >= middle ? jssun.swing.SwingUtilities2.Section.TRAILING : jssun.swing.SwingUtilities2.Section.LEADING;
} else {
return pComp < middle ? jssun.swing.SwingUtilities2.Section.TRAILING : jssun.swing.SwingUtilities2.Section.LEADING;
}}}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,jsjava.awt.Point,~B,~B,~B");
c$.liesInHorizontal = Clazz.defineMethod (c$, "liesInHorizontal", 
function (rect, p, ltr, three) {
return jssun.swing.SwingUtilities2.liesIn (rect, p, true, ltr, three);
}, "jsjava.awt.Rectangle,jsjava.awt.Point,~B,~B");
c$.liesInVertical = Clazz.defineMethod (c$, "liesInVertical", 
function (rect, p, three) {
return jssun.swing.SwingUtilities2.liesIn (rect, p, false, false, three);
}, "jsjava.awt.Rectangle,jsjava.awt.Point,~B");
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.swing.SwingUtilities2, "Section", Enum);
Clazz.defineEnumConstant (c$, "LEADING", 0, []);
Clazz.defineEnumConstant (c$, "MIDDLE", 1, []);
Clazz.defineEnumConstant (c$, "TRAILING", 2, []);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.aaHint = null;
this.lcdContrastHint = null;
this.frc = null;
Clazz.instantialize (this, arguments);
}, jssun.swing.SwingUtilities2, "AATextInfo");
c$.getAATextInfo = Clazz.defineMethod (c$, "getAATextInfo", 
function (a) {
return null;
}, "~B");
c$ = Clazz.p0p ();
c$.LAF_STATE_KEY = c$.prototype.LAF_STATE_KEY =  new JavaObject ();
c$.DEFAULT_FRC = c$.prototype.DEFAULT_FRC =  new jsjava.awt.font.FontRenderContext (null, false, false);
c$.AA_TEXT_PROPERTY_KEY = c$.prototype.AA_TEXT_PROPERTY_KEY =  new JavaObject ();
c$.SKIP_CLICK_COUNT = c$.prototype.SKIP_CLICK_COUNT =  new JavaObject ();
c$.COMPONENT_UI_PROPERTY_KEY = c$.prototype.COMPONENT_UI_PROPERTY_KEY =  new JavaObject ();
c$.BASICMENUITEMUI_MAX_TEXT_OFFSET = c$.prototype.BASICMENUITEMUI_MAX_TEXT_OFFSET =  new jssun.swing.StringUIClientPropertyKey ("maxTextOffset");
});
