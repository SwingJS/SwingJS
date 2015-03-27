Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent", "$.SwingConstants"], "jsjavax.swing.JLabel", ["java.lang.IllegalArgumentException", "jsjavax.swing.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mnemonic = '\0';
this.mnemonicIndex = -1;
this.text = "";
this.defaultIcon = null;
this.disabledIcon = null;
this.disabledIconSet = false;
this.verticalAlignment = 0;
this.horizontalAlignment = 10;
this.verticalTextPosition = 0;
this.horizontalTextPosition = 11;
this.iconTextGap = 4;
this.labelFor = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JLabel", jsjavax.swing.JComponent, jsjavax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function (text, icon, horizontalAlignment) {
Clazz.superConstructor (this, jsjavax.swing.JLabel, []);
this.setText (text);
this.setIcon (icon);
this.setHorizontalAlignment (horizontalAlignment);
this.updateUI ();
this.setAlignmentX (0.0);
}, "~S,jsjavax.swing.Icon,~N");
Clazz.makeConstructor (c$, 
function (text, horizontalAlignment) {
this.construct (text, null, horizontalAlignment);
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null, 10);
}, "~S");
Clazz.makeConstructor (c$, 
function (image, horizontalAlignment) {
this.construct (null, image, horizontalAlignment);
}, "jsjavax.swing.Icon,~N");
Clazz.makeConstructor (c$, 
function (image) {
this.construct (null, image, 0);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function () {
this.construct ("", null, 10);
});
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
Clazz.superCall (this, jsjavax.swing.JLabel, "setUI", [ui]);
if (!this.disabledIconSet && this.disabledIcon != null) {
this.setDisabledIcon (null);
}}, "jsjavax.swing.plaf.LabelUI");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "LabelUI";
});
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "setText", 
function (text) {
var oldValue = this.text;
this.text = text;
this.firePropertyChange ("text", oldValue, text);
this.setDisplayedMnemonicIndex (jsjavax.swing.SwingUtilities.findDisplayedMnemonicIndex (text, this.getDisplayedMnemonic ()));
if (text == null || oldValue == null || !text.equals (oldValue)) {
this.revalidate ();
this.repaint ();
}}, "~S");
Clazz.defineMethod (c$, "getIcon", 
function () {
return this.defaultIcon;
});
Clazz.defineMethod (c$, "setIcon", 
function (icon) {
var oldValue = this.defaultIcon;
this.defaultIcon = icon;
if ((this.defaultIcon !== oldValue) && !this.disabledIconSet) {
this.disabledIcon = null;
}this.firePropertyChange ("icon", oldValue, this.defaultIcon);
if (this.defaultIcon !== oldValue) {
if ((this.defaultIcon == null) || (oldValue == null) || (this.defaultIcon.getIconWidth () != oldValue.getIconWidth ()) || (this.defaultIcon.getIconHeight () != oldValue.getIconHeight ())) {
this.revalidate ();
}this.repaint ();
}}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "getDisabledIcon", 
function () {
if (!this.disabledIconSet && this.disabledIcon == null && this.defaultIcon != null) {
this.disabledIcon = jsjavax.swing.UIManager.getLookAndFeel ().getDisabledIcon (this, this.defaultIcon);
if (this.disabledIcon != null) {
this.firePropertyChange ("disabledIcon", null, this.disabledIcon);
}}return this.disabledIcon;
});
Clazz.defineMethod (c$, "setDisabledIcon", 
function (disabledIcon) {
var oldValue = this.disabledIcon;
this.disabledIcon = disabledIcon;
this.disabledIconSet = (disabledIcon != null);
this.firePropertyChange ("disabledIcon", oldValue, disabledIcon);
if (disabledIcon !== oldValue) {
if (disabledIcon == null || oldValue == null || disabledIcon.getIconWidth () != oldValue.getIconWidth () || disabledIcon.getIconHeight () != oldValue.getIconHeight ()) {
this.revalidate ();
}if (!this.isEnabled ()) {
this.repaint ();
}}}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "setDisplayedMnemonic", 
function (key) {
var oldKey = this.mnemonic;
this.mnemonic = key;
this.firePropertyChange ("displayedMnemonic", oldKey, this.mnemonic);
this.setDisplayedMnemonicIndex (jsjavax.swing.SwingUtilities.findDisplayedMnemonicIndex (this.getText (), this.mnemonic));
if (key != oldKey) {
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "setDisplayedMnemonic", 
function (aChar) {
var vk = (aChar).charCodeAt (0);
if (vk >= 97 && vk <= 122) vk -= (32);
this.setDisplayedMnemonic (vk);
}, "~S");
Clazz.defineMethod (c$, "getDisplayedMnemonic", 
function () {
return this.mnemonic;
});
Clazz.defineMethod (c$, "setDisplayedMnemonicIndex", 
function (index) {
var oldValue = this.mnemonicIndex;
if (index == -1) {
this.mnemonicIndex = -1;
} else {
var text = this.getText ();
var textLength = (text == null) ? 0 : text.length;
if (index < -1 || index >= textLength) {
throw  new IllegalArgumentException ("index == " + index);
}}this.mnemonicIndex = index;
this.firePropertyChange ("displayedMnemonicIndex", oldValue, index);
if (index != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return this.mnemonicIndex;
});
Clazz.defineMethod (c$, "checkHorizontalKey", 
function (key, message) {
if ((key == 2) || (key == 0) || (key == 4) || (key == 10) || (key == 11)) {
return key;
} else {
throw  new IllegalArgumentException (message);
}}, "~N,~S");
Clazz.defineMethod (c$, "checkVerticalKey", 
function (key, message) {
if ((key == 1) || (key == 0) || (key == 3)) {
return key;
} else {
throw  new IllegalArgumentException (message);
}}, "~N,~S");
Clazz.defineMethod (c$, "getIconTextGap", 
function () {
return this.iconTextGap;
});
Clazz.defineMethod (c$, "setIconTextGap", 
function (iconTextGap) {
var oldValue = this.iconTextGap;
this.iconTextGap = iconTextGap;
this.firePropertyChange ("iconTextGap", oldValue, iconTextGap);
if (iconTextGap != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getVerticalAlignment", 
function () {
return this.verticalAlignment;
});
Clazz.defineMethod (c$, "setVerticalAlignment", 
function (alignment) {
if (alignment == this.verticalAlignment) return;
var oldValue = this.verticalAlignment;
this.verticalAlignment = this.checkVerticalKey (alignment, "verticalAlignment");
this.firePropertyChange ("verticalAlignment", oldValue, this.verticalAlignment);
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getHorizontalAlignment", 
function () {
return this.horizontalAlignment;
});
Clazz.defineMethod (c$, "setHorizontalAlignment", 
function (alignment) {
if (alignment == this.horizontalAlignment) return;
var oldValue = this.horizontalAlignment;
this.horizontalAlignment = this.checkHorizontalKey (alignment, "horizontalAlignment");
this.firePropertyChange ("horizontalAlignment", oldValue, this.horizontalAlignment);
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getVerticalTextPosition", 
function () {
return this.verticalTextPosition;
});
Clazz.defineMethod (c$, "setVerticalTextPosition", 
function (textPosition) {
if (textPosition == this.verticalTextPosition) return;
var old = this.verticalTextPosition;
this.verticalTextPosition = this.checkVerticalKey (textPosition, "verticalTextPosition");
this.firePropertyChange ("verticalTextPosition", old, this.verticalTextPosition);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getHorizontalTextPosition", 
function () {
return this.horizontalTextPosition;
});
Clazz.defineMethod (c$, "setHorizontalTextPosition", 
function (textPosition) {
var old = this.horizontalTextPosition;
this.horizontalTextPosition = this.checkHorizontalKey (textPosition, "horizontalTextPosition");
this.firePropertyChange ("horizontalTextPosition", old, this.horizontalTextPosition);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "imageUpdate", 
function (img, infoflags, x, y, w, h) {
if (!this.isShowing () || !jsjavax.swing.SwingUtilities.doesIconReferenceImage (this.getIcon (), img) && !jsjavax.swing.SwingUtilities.doesIconReferenceImage (this.disabledIcon, img)) {
return false;
}return Clazz.superCall (this, jsjavax.swing.JLabel, "imageUpdate", [img, infoflags, x, y, w, h]);
}, "jsjava.awt.Image,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var textString = (this.text != null ? this.text : "");
var defaultIconString = ((this.defaultIcon != null) && (this.defaultIcon !== this) ? this.defaultIcon.toString () : "");
var disabledIconString = ((this.disabledIcon != null) && (this.disabledIcon !== this) ? this.disabledIcon.toString () : "");
var labelForString = (this.labelFor != null ? this.labelFor.toString () : "");
var verticalAlignmentString;
if (this.verticalAlignment == 1) {
verticalAlignmentString = "TOP";
} else if (this.verticalAlignment == 0) {
verticalAlignmentString = "CENTER";
} else if (this.verticalAlignment == 3) {
verticalAlignmentString = "BOTTOM";
} else verticalAlignmentString = "";
var horizontalAlignmentString;
if (this.horizontalAlignment == 2) {
horizontalAlignmentString = "LEFT";
} else if (this.horizontalAlignment == 0) {
horizontalAlignmentString = "CENTER";
} else if (this.horizontalAlignment == 4) {
horizontalAlignmentString = "RIGHT";
} else if (this.horizontalAlignment == 10) {
horizontalAlignmentString = "LEADING";
} else if (this.horizontalAlignment == 11) {
horizontalAlignmentString = "TRAILING";
} else horizontalAlignmentString = "";
var verticalTextPositionString;
if (this.verticalTextPosition == 1) {
verticalTextPositionString = "TOP";
} else if (this.verticalTextPosition == 0) {
verticalTextPositionString = "CENTER";
} else if (this.verticalTextPosition == 3) {
verticalTextPositionString = "BOTTOM";
} else verticalTextPositionString = "";
var horizontalTextPositionString;
if (this.horizontalTextPosition == 2) {
horizontalTextPositionString = "LEFT";
} else if (this.horizontalTextPosition == 0) {
horizontalTextPositionString = "CENTER";
} else if (this.horizontalTextPosition == 4) {
horizontalTextPositionString = "RIGHT";
} else if (this.horizontalTextPosition == 10) {
horizontalTextPositionString = "LEADING";
} else if (this.horizontalTextPosition == 11) {
horizontalTextPositionString = "TRAILING";
} else horizontalTextPositionString = "";
return Clazz.superCall (this, jsjavax.swing.JLabel, "paramString", []) + ",defaultIcon=" + defaultIconString + ",disabledIcon=" + disabledIconString + ",horizontalAlignment=" + horizontalAlignmentString + ",horizontalTextPosition=" + horizontalTextPositionString + ",iconTextGap=" + this.iconTextGap + ",labelFor=" + labelForString + ",text=" + textString + ",verticalAlignment=" + verticalAlignmentString + ",verticalTextPosition=" + verticalTextPositionString;
});
Clazz.defineMethod (c$, "getLabelFor", 
function () {
return this.labelFor;
});
Clazz.defineMethod (c$, "setLabelFor", 
function (c) {
var oldC = this.labelFor;
this.labelFor = c;
this.firePropertyChange ("labelFor", oldC, c);
if (Clazz.instanceOf (oldC, jsjavax.swing.JComponent)) {
(oldC).putClientProperty ("labeledBy", null);
}if (Clazz.instanceOf (c, jsjavax.swing.JComponent)) {
(c).putClientProperty ("labeledBy", this);
}}, "jsjava.awt.Component");
Clazz.defineStatics (c$,
"$uiClassID", "LabelUI",
"LABELED_BY_PROPERTY", "labeledBy");
});
