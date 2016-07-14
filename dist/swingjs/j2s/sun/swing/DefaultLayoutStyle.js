Clazz.declarePackage ("sun.swing");
Clazz.load (["javax.swing.LayoutStyle"], "sun.swing.DefaultLayoutStyle", ["java.lang.IllegalArgumentException", "$.NullPointerException", "javax.swing.Icon", "$.JCheckBox", "$.JLabel", "$.JRadioButton", "$.UIManager", "javax.swing.plaf.UIResource"], function () {
c$ = Clazz.declareType (sun.swing, "DefaultLayoutStyle", javax.swing.LayoutStyle);
c$.getInstance = Clazz.overrideMethod (c$, "getInstance", 
function () {
return sun.swing.DefaultLayoutStyle.INSTANCE;
});
Clazz.overrideMethod (c$, "getPreferredGap", 
function (component1, component2, type, position, parent) {
if (component1 == null || component2 == null || type == null) {
throw  new NullPointerException ();
}this.checkPosition (position);
if (type === javax.swing.LayoutStyle.ComponentPlacement.INDENT && (position == 3 || position == 7)) {
var indent = this.getIndent (component1, position);
if (indent > 0) {
return indent;
}}return (type === javax.swing.LayoutStyle.ComponentPlacement.UNRELATED) ? 12 : 6;
}, "javax.swing.JComponent,javax.swing.JComponent,javax.swing.LayoutStyle.ComponentPlacement,~N,java.awt.Container");
Clazz.overrideMethod (c$, "getContainerGap", 
function (component, position, parent) {
if (component == null) {
throw  new NullPointerException ();
}this.checkPosition (position);
return 6;
}, "javax.swing.JComponent,~N,java.awt.Container");
Clazz.defineMethod (c$, "isLabelAndNonlabel", 
function (c1, c2, position) {
if (position == 3 || position == 7) {
var c1Label = (Clazz.instanceOf (c1, javax.swing.JLabel));
var c2Label = (Clazz.instanceOf (c2, javax.swing.JLabel));
return ((c1Label || c2Label) && (c1Label != c2Label));
}return false;
}, "javax.swing.JComponent,javax.swing.JComponent,~N");
Clazz.defineMethod (c$, "getButtonGap", 
function (source, target, position, offset) {
offset -= this.getButtonGap (source, position);
if (offset > 0) {
offset -= this.getButtonGap (target, this.flipDirection (position));
}if (offset < 0) {
return 0;
}return offset;
}, "javax.swing.JComponent,javax.swing.JComponent,~N,~N");
Clazz.defineMethod (c$, "getButtonGap", 
function (source, position, offset) {
offset -= this.getButtonGap (source, position);
return Math.max (offset, 0);
}, "javax.swing.JComponent,~N,~N");
Clazz.defineMethod (c$, "getButtonGap", 
function (c, position) {
var classID = c.getUIClassID ();
if ((classID === "CheckBoxUI" || classID === "RadioButtonUI") && !(c).isBorderPainted ()) {
var border = c.getBorder ();
if (Clazz.instanceOf (border, javax.swing.plaf.UIResource)) {
return this.getInset (c, position);
}}return 0;
}, "javax.swing.JComponent,~N");
Clazz.defineMethod (c$, "checkPosition", 
 function (position) {
if (position != 1 && position != 5 && position != 7 && position != 3) {
throw  new IllegalArgumentException ();
}}, "~N");
Clazz.defineMethod (c$, "flipDirection", 
function (position) {
switch (position) {
case 1:
return 5;
case 5:
return 1;
case 3:
return 7;
case 7:
return 3;
}
return 0;
}, "~N");
Clazz.defineMethod (c$, "getIndent", 
function (c, position) {
var classID = c.getUIClassID ();
if (classID === "CheckBoxUI" || classID === "RadioButtonUI") {
var button = c;
var insets = c.getInsets ();
var icon = this.getIcon (button);
var gap = button.getIconTextGap ();
if (this.isLeftAligned (button, position)) {
return insets.left + icon.getIconWidth () + gap;
} else if (this.isRightAligned (button, position)) {
return insets.right + icon.getIconWidth () + gap;
}}return 0;
}, "javax.swing.JComponent,~N");
Clazz.defineMethod (c$, "getIcon", 
 function (button) {
var icon = button.getIcon ();
if (icon != null) {
return icon;
}var key = null;
if (Clazz.instanceOf (button, javax.swing.JCheckBox)) {
key = "CheckBox.icon";
} else if (Clazz.instanceOf (button, javax.swing.JRadioButton)) {
key = "RadioButton.icon";
}if (key != null) {
var oIcon = javax.swing.UIManager.get (key);
if (Clazz.instanceOf (oIcon, javax.swing.Icon)) {
return oIcon;
}}return null;
}, "javax.swing.AbstractButton");
Clazz.defineMethod (c$, "isLeftAligned", 
 function (button, position) {
if (position == 7) {
var ltr = button.getComponentOrientation ().isLeftToRight ();
var hAlign = button.getHorizontalAlignment ();
return ((ltr && (hAlign == 2 || hAlign == 10)) || (!ltr && (hAlign == 11)));
}return false;
}, "javax.swing.AbstractButton,~N");
Clazz.defineMethod (c$, "isRightAligned", 
 function (button, position) {
if (position == 3) {
var ltr = button.getComponentOrientation ().isLeftToRight ();
var hAlign = button.getHorizontalAlignment ();
return ((ltr && (hAlign == 4 || hAlign == 11)) || (!ltr && (hAlign == 10)));
}return false;
}, "javax.swing.AbstractButton,~N");
Clazz.defineMethod (c$, "getInset", 
 function (c, position) {
return this.getInset (c.getInsets (), position);
}, "javax.swing.JComponent,~N");
Clazz.defineMethod (c$, "getInset", 
 function (insets, position) {
if (insets == null) {
return 0;
}switch (position) {
case 1:
return insets.top;
case 5:
return insets.bottom;
case 3:
return insets.right;
case 7:
return insets.left;
}
return 0;
}, "java.awt.Insets,~N");
c$.INSTANCE = c$.prototype.INSTANCE =  new sun.swing.DefaultLayoutStyle ();
});
