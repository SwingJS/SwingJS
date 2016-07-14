Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.ItemSelectable", "java.awt.event.ActionListener", "$.ItemListener", "javax.swing.ActionPropertyChangeListener", "$.JComponent", "$.SwingConstants", "javax.swing.event.ChangeListener"], "javax.swing.AbstractButton", ["java.lang.Boolean", "$.IllegalArgumentException", "java.awt.event.ActionEvent", "$.ItemEvent", "javax.swing.AbstractAction", "$.DefaultButtonModel", "$.OverlayLayout", "$.SwingUtilities", "$.UIManager", "javax.swing.event.ChangeEvent", "javax.swing.plaf.UIResource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.text = "";
this.margin = null;
this.defaultMargin = null;
this.defaultIcon = null;
this.pressedIcon = null;
this.disabledIcon = null;
this.selectedIcon = null;
this.disabledSelectedIcon = null;
this.rolloverIcon = null;
this.rolloverSelectedIcon = null;
this.$paintBorder = true;
this.paintFocus = true;
this.rolloverEnabled = false;
this.contentAreaFilled = true;
this.verticalAlignment = 0;
this.horizontalAlignment = 0;
this.verticalTextPosition = 0;
this.horizontalTextPosition = 11;
this.iconTextGap = 4;
this.mnemonic = 0;
this.mnemonicIndex = -1;
this.multiClickThreshhold = 0;
this.borderPaintedSet = false;
this.rolloverEnabledSet = false;
this.iconTextGapSet = false;
this.contentAreaFilledSet = false;
this.$setLayout = false;
this.defaultCapable = true;
this.handler = null;
this.changeListener = null;
this.actionListener = null;
this.itemListener = null;
this.changeEvent = null;
this.hideActionText = false;
this.$action = null;
this.actionPropertyChangeListener = null;
if (!Clazz.isClassDefined ("javax.swing.AbstractButton.ButtonChangeListener")) {
javax.swing.AbstractButton.$AbstractButton$ButtonChangeListener$ ();
}
if (!Clazz.isClassDefined ("javax.swing.AbstractButton.Handler")) {
javax.swing.AbstractButton.$AbstractButton$Handler$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "AbstractButton", javax.swing.JComponent, [java.awt.ItemSelectable, javax.swing.SwingConstants]);
Clazz.defineMethod (c$, "setHideActionText", 
function (hideActionText) {
if (hideActionText != this.hideActionText) {
this.hideActionText = hideActionText;
if (this.getAction () != null) {
this.setTextFromAction (this.getAction (), false);
}this.firePropertyChangeBool ("hideActionText", !hideActionText, hideActionText);
}}, "~B");
Clazz.defineMethod (c$, "getHideActionText", 
function () {
return this.hideActionText;
});
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "setText", 
function (text) {
var oldValue = this.text;
this.text = text;
this.firePropertyChangeObject ("text", oldValue, text);
this.updateDisplayedMnemonicIndex (text, this.getMnemonic ());
if (text == null || oldValue == null || !text.equals (oldValue)) {
this.revalidate ();
this.repaint ();
}}, "~S");
Clazz.defineMethod (c$, "isSelected", 
function () {
return this.model.isSelected ();
});
Clazz.defineMethod (c$, "setSelected", 
function (b) {
this.model.setSelected (b);
}, "~B");
Clazz.defineMethod (c$, "doClick", 
function () {
this.doClick (68);
});
Clazz.defineMethod (c$, "doClick", 
function (pressTime) {
this.model.setArmed (true);
this.model.setPressed (true);
this.model.setPressed (false);
this.model.setArmed (false);
}, "~N");
Clazz.defineMethod (c$, "setMargin", 
function (m) {
if (Clazz.instanceOf (m, javax.swing.plaf.UIResource)) {
this.defaultMargin = m;
} else if (Clazz.instanceOf (this.margin, javax.swing.plaf.UIResource)) {
this.defaultMargin = this.margin;
}if (m == null && this.defaultMargin != null) {
m = this.defaultMargin;
}var old = this.margin;
this.margin = m;
this.firePropertyChangeObject ("margin", old, m);
if (old == null || !old.equals (m)) {
this.revalidate ();
this.repaint ();
}}, "java.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
return (this.margin == null) ? null : this.margin.clone ();
});
Clazz.defineMethod (c$, "getIcon", 
function () {
return this.defaultIcon;
});
Clazz.defineMethod (c$, "setIcon", 
function (defaultIcon) {
var oldValue = this.defaultIcon;
this.defaultIcon = defaultIcon;
if (defaultIcon !== oldValue && (Clazz.instanceOf (this.disabledIcon, javax.swing.plaf.UIResource))) {
this.disabledIcon = null;
}this.firePropertyChangeObject ("icon", oldValue, defaultIcon);
if (defaultIcon !== oldValue) {
if (defaultIcon == null || oldValue == null || defaultIcon.getIconWidth () != oldValue.getIconWidth () || defaultIcon.getIconHeight () != oldValue.getIconHeight ()) {
this.revalidate ();
}this.repaint ();
}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getPressedIcon", 
function () {
return this.pressedIcon;
});
Clazz.defineMethod (c$, "setPressedIcon", 
function (pressedIcon) {
var oldValue = this.pressedIcon;
this.pressedIcon = pressedIcon;
this.firePropertyChangeObject ("pressedIcon", oldValue, pressedIcon);
if (pressedIcon !== oldValue) {
if (this.getModel ().isPressed ()) {
this.repaint ();
}}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getSelectedIcon", 
function () {
return this.selectedIcon;
});
Clazz.defineMethod (c$, "setSelectedIcon", 
function (selectedIcon) {
var oldValue = this.selectedIcon;
this.selectedIcon = selectedIcon;
if (selectedIcon !== oldValue && Clazz.instanceOf (this.disabledSelectedIcon, javax.swing.plaf.UIResource)) {
this.disabledSelectedIcon = null;
}this.firePropertyChangeObject ("selectedIcon", oldValue, selectedIcon);
if (selectedIcon !== oldValue) {
if (this.isSelected ()) {
this.repaint ();
}}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getRolloverIcon", 
function () {
return this.rolloverIcon;
});
Clazz.defineMethod (c$, "setRolloverIcon", 
function (rolloverIcon) {
var oldValue = this.rolloverIcon;
this.rolloverIcon = rolloverIcon;
this.firePropertyChangeObject ("rolloverIcon", oldValue, rolloverIcon);
this.setRolloverEnabled (true);
if (rolloverIcon !== oldValue) {
this.repaint ();
}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getRolloverSelectedIcon", 
function () {
return this.rolloverSelectedIcon;
});
Clazz.defineMethod (c$, "setRolloverSelectedIcon", 
function (rolloverSelectedIcon) {
var oldValue = this.rolloverSelectedIcon;
this.rolloverSelectedIcon = rolloverSelectedIcon;
this.firePropertyChangeObject ("rolloverSelectedIcon", oldValue, rolloverSelectedIcon);
this.setRolloverEnabled (true);
if (rolloverSelectedIcon !== oldValue) {
if (this.isSelected ()) {
this.repaint ();
}}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getDisabledIcon", 
function () {
if (this.disabledIcon == null) {
this.disabledIcon = javax.swing.UIManager.getLookAndFeel ().getDisabledIcon (this, this.getIcon ());
if (this.disabledIcon != null) {
this.firePropertyChangeObject ("disabledIcon", null, this.disabledIcon);
}}return this.disabledIcon;
});
Clazz.defineMethod (c$, "setDisabledIcon", 
function (disabledIcon) {
var oldValue = this.disabledIcon;
this.disabledIcon = disabledIcon;
this.firePropertyChangeObject ("disabledIcon", oldValue, disabledIcon);
if (disabledIcon !== oldValue) {
if (!this.isEnabled ()) {
this.repaint ();
}}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getDisabledSelectedIcon", 
function () {
if (this.disabledSelectedIcon == null) {
if (this.selectedIcon != null) {
this.disabledSelectedIcon = javax.swing.UIManager.getLookAndFeel ().getDisabledSelectedIcon (this, this.getSelectedIcon ());
} else {
return this.getDisabledIcon ();
}}return this.disabledSelectedIcon;
});
Clazz.defineMethod (c$, "setDisabledSelectedIcon", 
function (disabledSelectedIcon) {
var oldValue = this.disabledSelectedIcon;
this.disabledSelectedIcon = disabledSelectedIcon;
this.firePropertyChangeObject ("disabledSelectedIcon", oldValue, disabledSelectedIcon);
if (disabledSelectedIcon !== oldValue) {
if (disabledSelectedIcon == null || oldValue == null || disabledSelectedIcon.getIconWidth () != oldValue.getIconWidth () || disabledSelectedIcon.getIconHeight () != oldValue.getIconHeight ()) {
this.revalidate ();
}if (!this.isEnabled () && this.isSelected ()) {
this.repaint ();
}}}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getVerticalAlignment", 
function () {
return this.verticalAlignment;
});
Clazz.defineMethod (c$, "setVerticalAlignment", 
function (alignment) {
if (alignment == this.verticalAlignment) return;
var oldValue = this.verticalAlignment;
this.verticalAlignment = this.checkVerticalKey (alignment, "verticalAlignment");
this.firePropertyChangeInt ("verticalAlignment", oldValue, this.verticalAlignment);
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
this.firePropertyChangeInt ("horizontalAlignment", oldValue, this.horizontalAlignment);
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getVerticalTextPosition", 
function () {
return this.verticalTextPosition;
});
Clazz.defineMethod (c$, "setVerticalTextPosition", 
function (textPosition) {
if (textPosition == this.verticalTextPosition) return;
var oldValue = this.verticalTextPosition;
this.verticalTextPosition = this.checkVerticalKey (textPosition, "verticalTextPosition");
this.firePropertyChangeInt ("verticalTextPosition", oldValue, this.verticalTextPosition);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getHorizontalTextPosition", 
function () {
return this.horizontalTextPosition;
});
Clazz.defineMethod (c$, "setHorizontalTextPosition", 
function (textPosition) {
if (textPosition == this.horizontalTextPosition) return;
var oldValue = this.horizontalTextPosition;
this.horizontalTextPosition = this.checkHorizontalKey (textPosition, "horizontalTextPosition");
this.firePropertyChangeInt ("horizontalTextPosition", oldValue, this.horizontalTextPosition);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getIconTextGap", 
function () {
return this.iconTextGap;
});
Clazz.defineMethod (c$, "setIconTextGap", 
function (iconTextGap) {
var oldValue = this.iconTextGap;
this.iconTextGap = iconTextGap;
this.iconTextGapSet = true;
this.firePropertyChangeInt ("iconTextGap", oldValue, iconTextGap);
if (iconTextGap != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "checkHorizontalKey", 
function (key, exception) {
if ((key == 2) || (key == 0) || (key == 4) || (key == 10) || (key == 11)) {
return key;
} else {
throw  new IllegalArgumentException (exception);
}}, "~N,~S");
Clazz.defineMethod (c$, "checkVerticalKey", 
function (key, exception) {
if ((key == 1) || (key == 0) || (key == 3)) {
return key;
} else {
throw  new IllegalArgumentException (exception);
}}, "~N,~S");
Clazz.defineMethod (c$, "removeNotify", 
function () {
Clazz.superCall (this, javax.swing.AbstractButton, "removeNotify", []);
if (this.isRolloverEnabled ()) {
this.getModel ().setRollover (false);
}});
Clazz.defineMethod (c$, "setActionCommand", 
function (actionCommand) {
this.getModel ().setActionCommand (actionCommand);
}, "~S");
Clazz.defineMethod (c$, "getActionCommand", 
function () {
var ac = this.getModel ().getActionCommand ();
if (ac == null) {
ac = this.getText ();
}return ac;
});
Clazz.defineMethod (c$, "setAction", 
function (a) {
var oldValue = this.getAction ();
if (this.$action == null || !this.$action.equals (a)) {
this.$action = a;
if (oldValue != null) {
this.removeActionListener (oldValue);
oldValue.removePropertyChangeListener (this.actionPropertyChangeListener);
this.actionPropertyChangeListener = null;
}this.configurePropertiesFromAction (this.$action);
if (this.$action != null) {
if (!this.isListener (java.awt.event.ActionListener, this.$action)) {
this.addActionListener (this.$action);
}this.actionPropertyChangeListener = this.createActionPropertyChangeListener (this.$action);
this.$action.addPropertyChangeListener (this.actionPropertyChangeListener);
}this.firePropertyChangeObject ("action", oldValue, this.$action);
}}, "javax.swing.Action");
Clazz.defineMethod (c$, "isListener", 
 function (c, a) {
var isListener = false;
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === c && listeners[i + 1] === a) {
isListener = true;
}}
return isListener;
}, "Class,java.awt.event.ActionListener");
Clazz.defineMethod (c$, "getAction", 
function () {
return this.$action;
});
Clazz.defineMethod (c$, "configurePropertiesFromAction", 
function (a) {
this.setMnemonicFromAction (a);
this.setTextFromAction (a, false);
javax.swing.AbstractAction.setToolTipTextFromAction (this, a);
this.setIconFromAction (a);
this.setActionCommandFromAction (a);
javax.swing.AbstractAction.setEnabledFromAction (this, a);
if (javax.swing.AbstractAction.hasSelectedKey (a) && this.shouldUpdateSelectedStateFromAction ()) {
this.setSelectedFromAction (a);
}this.setDisplayedMnemonicIndexFromAction (a, false);
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "clientPropertyChanged", 
function (key, oldValue, newValue) {
if (key === "hideActionText") {
var current = (Clazz.instanceOf (newValue, Boolean)) ? newValue : false;
if (this.getHideActionText () != current) {
this.setHideActionText (current);
}}}, "~O,~O,~O");
Clazz.defineMethod (c$, "shouldUpdateSelectedStateFromAction", 
function () {
return false;
});
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "Name") {
this.setTextFromAction (action, true);
} else if (propertyName === "enabled") {
javax.swing.AbstractAction.setEnabledFromAction (this, action);
} else if (propertyName === "ShortDescription") {
javax.swing.AbstractAction.setToolTipTextFromAction (this, action);
} else if (propertyName === "SmallIcon") {
this.smallIconChanged (action);
} else if (propertyName === "MnemonicKey") {
this.setMnemonicFromAction (action);
} else if (propertyName === "ActionCommandKey") {
this.setActionCommandFromAction (action);
} else if (propertyName === "SwingSelectedKey" && javax.swing.AbstractAction.hasSelectedKey (action) && this.shouldUpdateSelectedStateFromAction ()) {
this.setSelectedFromAction (action);
} else if (propertyName === "SwingDisplayedMnemonicIndexKey") {
this.setDisplayedMnemonicIndexFromAction (action, true);
} else if (propertyName === "SwingLargeIconKey") {
this.largeIconChanged (action);
}}, "javax.swing.Action,~S");
Clazz.defineMethod (c$, "setDisplayedMnemonicIndexFromAction", 
 function (a, fromPropertyChange) {
var iValue = (a == null) ? null : a.getValue ("SwingDisplayedMnemonicIndexKey");
if (fromPropertyChange || iValue != null) {
var value;
if (iValue == null) {
value = -1;
} else {
value = (iValue).intValue ();
var text = this.getText ();
if (text == null || value >= text.length) {
value = -1;
}}this.setDisplayedMnemonicIndex (value);
}}, "javax.swing.Action,~B");
Clazz.defineMethod (c$, "setMnemonicFromAction", 
 function (a) {
var n = (a == null) ? null : a.getValue ("MnemonicKey");
this.setMnemonic ((n == null) ? '\0' : n);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "setTextFromAction", 
 function (a, propertyChange) {
var hideText = this.getHideActionText ();
if (!propertyChange) {
this.setText ((a != null && !hideText) ? a.getValue ("Name") : null);
} else if (!hideText) {
this.setText (a.getValue ("Name"));
}}, "javax.swing.Action,~B");
Clazz.defineMethod (c$, "setIconFromAction", 
function (a) {
var icon = null;
if (a != null) {
icon = a.getValue ("SwingLargeIconKey");
if (icon == null) {
icon = a.getValue ("SmallIcon");
}}this.setIcon (icon);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "smallIconChanged", 
function (a) {
if (a.getValue ("SwingLargeIconKey") == null) {
this.setIconFromAction (a);
}}, "javax.swing.Action");
Clazz.defineMethod (c$, "largeIconChanged", 
function (a) {
this.setIconFromAction (a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "setActionCommandFromAction", 
 function (a) {
this.setActionCommand ((a != null) ? a.getValue ("ActionCommandKey") : null);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "setSelectedFromAction", 
 function (a) {
var selected = false;
if (a != null) {
selected = javax.swing.AbstractAction.isSelected (a);
}if (selected != this.isSelected ()) {
this.setSelected (selected);
if (!selected && this.isSelected ()) {
if (Clazz.instanceOf (this.getModel (), javax.swing.DefaultButtonModel)) {
var group = (this.getModel ()).getGroup ();
if (group != null) {
group.clearSelection ();
}}}}}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
return this.createActionPropertyChangeListener0 (a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionPropertyChangeListener0", 
function (a) {
return  new javax.swing.AbstractButton.ButtonActionPropertyChangeListener (this, a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "isBorderPainted", 
function () {
return this.$paintBorder;
});
Clazz.defineMethod (c$, "setBorderPainted", 
function (b) {
var oldValue = this.$paintBorder;
this.$paintBorder = b;
this.borderPaintedSet = true;
this.firePropertyChangeBool ("borderPainted", oldValue, this.$paintBorder);
if (b != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, javax.swing.AbstractButton, "paintBorder", [g]);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "isFocusPainted", 
function () {
return this.paintFocus;
});
Clazz.defineMethod (c$, "setFocusPainted", 
function (b) {
var oldValue = this.paintFocus;
this.paintFocus = b;
this.firePropertyChangeBool ("focusPainted", oldValue, this.paintFocus);
if (b != oldValue && this.isFocusOwner ()) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "isContentAreaFilled", 
function () {
return this.contentAreaFilled;
});
Clazz.defineMethod (c$, "setContentAreaFilled", 
function (b) {
var oldValue = this.contentAreaFilled;
this.contentAreaFilled = b;
this.contentAreaFilledSet = true;
this.firePropertyChangeBool ("contentAreaFilled", oldValue, this.contentAreaFilled);
if (b != oldValue) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "isRolloverEnabled", 
function () {
return this.rolloverEnabled;
});
Clazz.defineMethod (c$, "setRolloverEnabled", 
function (b) {
var oldValue = this.rolloverEnabled;
this.rolloverEnabled = b;
this.rolloverEnabledSet = true;
this.firePropertyChangeBool ("rolloverEnabled", oldValue, this.rolloverEnabled);
if (b != oldValue) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getMnemonic", 
function () {
return this.mnemonic;
});
Clazz.defineMethod (c$, "setMnemonic", 
function (mnemonic) {
this.model.setMnemonic (mnemonic);
this.updateMnemonicProperties ();
}, "~N");
Clazz.defineMethod (c$, "setMnemonic", 
function (mnemonic) {
var vk = (mnemonic).charCodeAt (0);
if (vk >= 97 && vk <= 122) vk -= (32);
this.setMnemonic (vk);
}, "~S");
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
this.firePropertyChangeInt ("displayedMnemonicIndex", oldValue, index);
if (index != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return this.mnemonicIndex;
});
Clazz.defineMethod (c$, "updateDisplayedMnemonicIndex", 
 function (text, mnemonic) {
this.setDisplayedMnemonicIndex (javax.swing.SwingUtilities.findDisplayedMnemonicIndex (text, mnemonic));
}, "~S,~N");
Clazz.defineMethod (c$, "updateMnemonicProperties", 
 function () {
var newMnemonic = this.model.getMnemonic ();
if (this.mnemonic != newMnemonic) {
var oldValue = this.mnemonic;
this.mnemonic = newMnemonic;
this.firePropertyChangeInt ("mnemonic", oldValue, this.mnemonic);
this.updateDisplayedMnemonicIndex (this.getText (), this.mnemonic);
this.revalidate ();
this.repaint ();
}});
Clazz.defineMethod (c$, "setMultiClickThreshhold", 
function (threshhold) {
if (threshhold < 0) {
throw  new IllegalArgumentException ("threshhold must be >= 0");
}this.multiClickThreshhold = threshhold;
}, "~N");
Clazz.defineMethod (c$, "getMultiClickThreshhold", 
function () {
return this.multiClickThreshhold;
});
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.getModel ();
if (oldModel != null) {
oldModel.removeChangeListener (this.changeListener);
oldModel.removeActionListener (this.actionListener);
oldModel.removeItemListener (this.itemListener);
this.changeListener = null;
this.actionListener = null;
this.itemListener = null;
}this.model = newModel;
if (newModel != null) {
this.changeListener = this.createChangeListener ();
this.actionListener = this.createActionListener ();
this.itemListener = this.createItemListener ();
newModel.addChangeListener (this.changeListener);
newModel.addActionListener (this.actionListener);
newModel.addItemListener (this.itemListener);
this.updateMnemonicProperties ();
Clazz.superCall (this, javax.swing.AbstractButton, "setEnabled", [newModel.isEnabled ()]);
} else {
this.mnemonic = 0;
}this.updateDisplayedMnemonicIndex (this.getText (), this.mnemonic);
this.firePropertyChangeObject ("model", oldModel, newModel);
if (newModel !== oldModel) {
this.revalidate ();
this.repaint ();
}}, "javax.swing.ButtonModel");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
Clazz.superCall (this, javax.swing.AbstractButton, "setUI", [ui]);
if (Clazz.instanceOf (this.disabledIcon, javax.swing.plaf.UIResource)) {
this.setDisabledIcon (null);
}if (Clazz.instanceOf (this.disabledSelectedIcon, javax.swing.plaf.UIResource)) {
this.setDisabledSelectedIcon (null);
}}, "javax.swing.plaf.ButtonUI");
Clazz.overrideMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (!this.$setLayout) {
this.setLayout ( new javax.swing.OverlayLayout (this));
}return this.addImplSAEM (comp, constraints, index);
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "setLayout", 
function (mgr) {
this.$setLayout = true;
Clazz.superCall (this, javax.swing.AbstractButton, "setLayout", [mgr]);
}, "java.awt.LayoutManager");
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return (this.listenerList.getListeners (javax.swing.event.ChangeListener));
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "addActionListener", 
function (l) {
this.listenerList.add (java.awt.event.ActionListener, l);
}, "java.awt.event.ActionListener");
Clazz.defineMethod (c$, "removeActionListener", 
function (l) {
if ((l != null) && (this.getAction () === l)) {
this.setAction (null);
} else {
this.listenerList.remove (java.awt.event.ActionListener, l);
}}, "java.awt.event.ActionListener");
Clazz.defineMethod (c$, "getActionListeners", 
function () {
return (this.listenerList.getListeners (java.awt.event.ActionListener));
});
Clazz.defineMethod (c$, "createChangeListener", 
function () {
return this.getHandler ();
});
Clazz.defineMethod (c$, "fireActionPerformed", 
function (event) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ActionListener) {
if (e == null) {
var actionCommand = event.getActionCommand ();
if (actionCommand == null) {
actionCommand = this.getActionCommand ();
}e =  new java.awt.event.ActionEvent (this, 1001, actionCommand, event.getWhen (), event.getModifiers ());
}(listeners[i + 1]).actionPerformed (e);
}}
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "fireItemStateChanged", 
function (event) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ItemListener) {
if (e == null) {
e =  new java.awt.event.ItemEvent (this, 701, this, event.getStateChange ());
}(listeners[i + 1]).itemStateChanged (e);
}}
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "createActionListener", 
function () {
return this.getHandler ();
});
Clazz.defineMethod (c$, "createItemListener", 
function () {
return this.getHandler ();
});
Clazz.defineMethod (c$, "setEnabled", 
function (b) {
if (!b && this.model.isRollover ()) {
this.model.setRollover (false);
}Clazz.superCall (this, javax.swing.AbstractButton, "setEnabled", [b]);
this.model.setEnabled (b);
}, "~B");
Clazz.defineMethod (c$, "getLabel", 
function () {
return this.getText ();
});
Clazz.defineMethod (c$, "setLabel", 
function (label) {
this.setText (label);
}, "~S");
Clazz.overrideMethod (c$, "addItemListener", 
function (l) {
this.listenerList.add (java.awt.event.ItemListener, l);
}, "java.awt.event.ItemListener");
Clazz.overrideMethod (c$, "removeItemListener", 
function (l) {
this.listenerList.remove (java.awt.event.ItemListener, l);
}, "java.awt.event.ItemListener");
Clazz.defineMethod (c$, "getItemListeners", 
function () {
return this.listenerList.getListeners (java.awt.event.ItemListener);
});
Clazz.overrideMethod (c$, "getSelectedObjects", 
function () {
if (this.isSelected () == false) {
return null;
}var selectedObjects =  new Array (1);
selectedObjects[0] = this.getText ();
return selectedObjects;
});
Clazz.defineMethod (c$, "init", 
function (text, icon, uid) {
if (text != null) {
this.setText (text);
}if (icon != null) {
this.setIcon (icon);
}this.uiClassID = uid;
this.updateUI ();
this.setAlignmentX (0.0);
this.setAlignmentY (0.5);
}, "~S,javax.swing.Icon,~S");
Clazz.defineMethod (c$, "imageUpdate", 
function (img, infoflags, x, y, w, h) {
var iconDisplayed = this.getIcon ();
if (iconDisplayed == null) {
return false;
}if (!this.model.isEnabled ()) {
if (this.model.isSelected ()) {
iconDisplayed = this.getDisabledSelectedIcon ();
} else {
iconDisplayed = this.getDisabledIcon ();
}} else if (this.model.isPressed () && this.model.isArmed ()) {
iconDisplayed = this.getPressedIcon ();
} else if (this.isRolloverEnabled () && this.model.isRollover ()) {
if (this.model.isSelected ()) {
iconDisplayed = this.getRolloverSelectedIcon ();
} else {
iconDisplayed = this.getRolloverIcon ();
}} else if (this.model.isSelected ()) {
iconDisplayed = this.getSelectedIcon ();
}if (!javax.swing.SwingUtilities.doesIconReferenceImage (iconDisplayed, img)) {
return false;
}return Clazz.superCall (this, javax.swing.AbstractButton, "imageUpdate", [img, infoflags, x, y, w, h]);
}, "java.awt.Image,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setUIProperty", 
function (propertyName, value) {
if (propertyName === "borderPainted") {
if (!this.borderPaintedSet) {
this.setBorderPainted ((value).booleanValue ());
this.borderPaintedSet = false;
}} else if (propertyName === "rolloverEnabled") {
if (!this.rolloverEnabledSet) {
this.setRolloverEnabled ((value).booleanValue ());
this.rolloverEnabledSet = false;
}} else if (propertyName === "iconTextGap") {
if (!this.iconTextGapSet) {
this.setIconTextGap ((value).intValue ());
this.iconTextGapSet = false;
}} else if (propertyName === "contentAreaFilled") {
if (!this.contentAreaFilledSet) {
this.setContentAreaFilled ((value).booleanValue ());
this.contentAreaFilledSet = false;
}} else {
Clazz.superCall (this, javax.swing.AbstractButton, "setUIProperty", [propertyName, value]);
}}, "~S,~O");
Clazz.defineMethod (c$, "paramString", 
function () {
var defaultIconString = ((this.defaultIcon != null) && (this.defaultIcon !== this) ? this.defaultIcon.toString () : "");
var pressedIconString = ((this.pressedIcon != null) && (this.pressedIcon !== this) ? this.pressedIcon.toString () : "");
var disabledIconString = ((this.disabledIcon != null) && (this.disabledIcon !== this) ? this.disabledIcon.toString () : "");
var selectedIconString = ((this.selectedIcon != null) && (this.selectedIcon !== this) ? this.selectedIcon.toString () : "");
var disabledSelectedIconString = ((this.disabledSelectedIcon != null) && (this.disabledSelectedIcon !== this) ? this.disabledSelectedIcon.toString () : "");
var rolloverIconString = ((this.rolloverIcon != null) && (this.rolloverIcon !== this) ? this.rolloverIcon.toString () : "");
var rolloverSelectedIconString = ((this.rolloverSelectedIcon != null) && (this.rolloverSelectedIcon !== this) ? this.rolloverSelectedIcon.toString () : "");
var paintBorderString = (this.$paintBorder ? "true" : "false");
var paintFocusString = (this.paintFocus ? "true" : "false");
var rolloverEnabledString = (this.rolloverEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.AbstractButton, "paramString", []) + ",defaultIcon=" + defaultIconString + ",disabledIcon=" + disabledIconString + ",disabledSelectedIcon=" + disabledSelectedIconString + ",margin=" + this.margin + ",paintBorder=" + paintBorderString + ",paintFocus=" + paintFocusString + ",pressedIcon=" + pressedIconString + ",rolloverEnabled=" + rolloverEnabledString + ",rolloverIcon=" + rolloverIconString + ",rolloverSelectedIcon=" + rolloverSelectedIconString + ",selectedIcon=" + selectedIconString + ",text=" + this.text;
});
Clazz.defineMethod (c$, "getHandler", 
 function () {
if (this.handler == null) {
this.handler = Clazz.innerTypeInstance (javax.swing.AbstractButton.Handler, this, null);
}return this.handler;
});
c$.$AbstractButton$ButtonChangeListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.AbstractButton, "ButtonChangeListener", null, javax.swing.event.ChangeListener);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.AbstractButton"].getHandler ().stateChanged (a);
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$AbstractButton$Handler$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.AbstractButton, "Handler", null, [java.awt.event.ActionListener, javax.swing.event.ChangeListener, java.awt.event.ItemListener]);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.AbstractButton"].updateMnemonicProperties ();
if (this.b$["javax.swing.AbstractButton"].isEnabled () != this.b$["javax.swing.AbstractButton"].model.isEnabled ()) {
this.b$["javax.swing.AbstractButton"].setEnabled (this.b$["javax.swing.AbstractButton"].model.isEnabled ());
}this.b$["javax.swing.AbstractButton"].fireStateChanged ();
this.b$["javax.swing.AbstractButton"].repaint ();
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
this.b$["javax.swing.AbstractButton"].fireActionPerformed (a);
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (a) {
this.b$["javax.swing.AbstractButton"].fireItemStateChanged (a);
if (this.b$["javax.swing.AbstractButton"].shouldUpdateSelectedStateFromAction ()) {
var b = this.b$["javax.swing.AbstractButton"].getAction ();
if (b != null && javax.swing.AbstractAction.hasSelectedKey (b)) {
var c = this.b$["javax.swing.AbstractButton"].isSelected ();
var d = javax.swing.AbstractAction.isSelected (b);
if (d != c) {
b.putValue ("SwingSelectedKey", new Boolean (c));
}}}}, "java.awt.event.ItemEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.AbstractButton, "ButtonActionPropertyChangeListener", javax.swing.ActionPropertyChangeListener);
Clazz.overrideMethod (c$, "actionPropertyChanged", 
function (a, b, c) {
if (javax.swing.AbstractAction.shouldReconfigure (c)) {
a.configurePropertiesFromAction (b);
} else {
a.actionPropertyChanged (b, c.getPropertyName ());
}}, "javax.swing.AbstractButton,javax.swing.Action,java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MODEL_CHANGED_PROPERTY", "model",
"TEXT_CHANGED_PROPERTY", "text",
"MNEMONIC_CHANGED_PROPERTY", "mnemonic",
"MARGIN_CHANGED_PROPERTY", "margin",
"VERTICAL_ALIGNMENT_CHANGED_PROPERTY", "verticalAlignment",
"HORIZONTAL_ALIGNMENT_CHANGED_PROPERTY", "horizontalAlignment",
"VERTICAL_TEXT_POSITION_CHANGED_PROPERTY", "verticalTextPosition",
"HORIZONTAL_TEXT_POSITION_CHANGED_PROPERTY", "horizontalTextPosition",
"BORDER_PAINTED_CHANGED_PROPERTY", "borderPainted",
"FOCUS_PAINTED_CHANGED_PROPERTY", "focusPainted",
"ROLLOVER_ENABLED_CHANGED_PROPERTY", "rolloverEnabled",
"CONTENT_AREA_FILLED_CHANGED_PROPERTY", "contentAreaFilled",
"ICON_CHANGED_PROPERTY", "icon",
"PRESSED_ICON_CHANGED_PROPERTY", "pressedIcon",
"SELECTED_ICON_CHANGED_PROPERTY", "selectedIcon",
"ROLLOVER_ICON_CHANGED_PROPERTY", "rolloverIcon",
"ROLLOVER_SELECTED_ICON_CHANGED_PROPERTY", "rolloverSelectedIcon",
"DISABLED_ICON_CHANGED_PROPERTY", "disabledIcon",
"DISABLED_SELECTED_ICON_CHANGED_PROPERTY", "disabledSelectedIcon");
});
