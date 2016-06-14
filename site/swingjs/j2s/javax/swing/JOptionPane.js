Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JOptionPane", ["java.lang.RuntimeException", "java.awt.BorderLayout", "$.Dialog", "$.Frame", "java.awt.event.ComponentAdapter", "$.WindowAdapter", "java.beans.PropertyChangeListener", "javax.swing.JDialog", "$.SwingUtilities", "javax.swing.SwingUtilities.SharedOwnerFrame", "javax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.icon = null;
this.message = null;
this.options = null;
this.initialValue = null;
this.messageType = 0;
this.optionType = 0;
this.value = null;
this.selectionValues = null;
this.inputValue = null;
this.initialSelectionValue = null;
this.wantsInput = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "JOptionPane", javax.swing.JComponent);
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (message) {
return javax.swing.JOptionPane.showInputDialog (null, message);
}, "~O");
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (message, initialSelectionValue) {
return javax.swing.JOptionPane.showInputDialog (null, message, initialSelectionValue);
}, "~O,~O");
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (parentComponent, message) {
return javax.swing.JOptionPane.showInputDialog (parentComponent, message, javax.swing.UIManager.getString ("OptionPane.inputDialogTitle", parentComponent), 3);
}, "java.awt.Component,~O");
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (parentComponent, message, initialSelectionValue) {
return javax.swing.JOptionPane.showInputDialog (parentComponent, message, javax.swing.UIManager.getString ("OptionPane.inputDialogTitle", parentComponent), 3, null, null, initialSelectionValue);
}, "java.awt.Component,~O,~O");
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (parentComponent, message, title, messageType) {
return javax.swing.JOptionPane.showInputDialog (parentComponent, message, title, messageType, null, null, null);
}, "java.awt.Component,~O,~S,~N");
c$.showInputDialog = Clazz.defineMethod (c$, "showInputDialog", 
function (parentComponent, message, title, messageType, icon, selectionValues, initialSelectionValue) {
var pane =  new javax.swing.JOptionPane (message, messageType, 2, icon, null, null);
pane.setWantsInput (true);
pane.setSelectionValues (selectionValues);
pane.setInitialSelectionValue (initialSelectionValue);
pane.setComponentOrientation (((parentComponent == null) ? javax.swing.JOptionPane.getRootFrame () : parentComponent).getComponentOrientation ());
var style = javax.swing.JOptionPane.styleFromMessageType (messageType);
var dialog = pane.createDialog (parentComponent, title, style);
pane.selectInitialValue ();
dialog.show ();
dialog.dispose ();
var value = pane.getInputValue ();
if (value === javax.swing.JOptionPane.UNINITIALIZED_VALUE) {
return null;
}return value;
}, "java.awt.Component,~O,~S,~N,javax.swing.Icon,~A,~O");
c$.showMessageDialog = Clazz.defineMethod (c$, "showMessageDialog", 
function (parentComponent, message) {
javax.swing.JOptionPane.showMessageDialog (parentComponent, message, javax.swing.UIManager.getString ("OptionPane.messageDialogTitle", parentComponent), 1);
}, "java.awt.Component,~O");
c$.showMessageDialog = Clazz.defineMethod (c$, "showMessageDialog", 
function (parentComponent, message, title, messageType) {
javax.swing.JOptionPane.showMessageDialog (parentComponent, message, title, messageType, null);
}, "java.awt.Component,~O,~S,~N");
c$.showMessageDialog = Clazz.defineMethod (c$, "showMessageDialog", 
function (parentComponent, message, title, messageType, icon) {
javax.swing.JOptionPane.showOptionDialog (parentComponent, message, title, -1, messageType, icon, null, null);
}, "java.awt.Component,~O,~S,~N,javax.swing.Icon");
c$.showConfirmDialog = Clazz.defineMethod (c$, "showConfirmDialog", 
function (parentComponent, message) {
return javax.swing.JOptionPane.showConfirmDialog (parentComponent, message, javax.swing.UIManager.getString ("OptionPane.titleText"), 1);
}, "java.awt.Component,~O");
c$.showConfirmDialog = Clazz.defineMethod (c$, "showConfirmDialog", 
function (parentComponent, message, title, optionType) {
return javax.swing.JOptionPane.showConfirmDialog (parentComponent, message, title, optionType, 3);
}, "java.awt.Component,~O,~S,~N");
c$.showConfirmDialog = Clazz.defineMethod (c$, "showConfirmDialog", 
function (parentComponent, message, title, optionType, messageType) {
return javax.swing.JOptionPane.showConfirmDialog (parentComponent, message, title, optionType, messageType, null);
}, "java.awt.Component,~O,~S,~N,~N");
c$.showConfirmDialog = Clazz.defineMethod (c$, "showConfirmDialog", 
function (parentComponent, message, title, optionType, messageType, icon) {
return javax.swing.JOptionPane.showOptionDialog (parentComponent, message, title, optionType, messageType, icon, null, null);
}, "java.awt.Component,~O,~S,~N,~N,javax.swing.Icon");
c$.showOptionDialog = Clazz.defineMethod (c$, "showOptionDialog", 
function (parentComponent, message, title, optionType, messageType, icon, options, initialValue) {
var pane =  new javax.swing.JOptionPane (message, messageType, optionType, icon, options, initialValue);
pane.setInitialValue (initialValue);
pane.setComponentOrientation (((parentComponent == null) ? javax.swing.JOptionPane.getRootFrame () : parentComponent).getComponentOrientation ());
var style = javax.swing.JOptionPane.styleFromMessageType (messageType);
var dialog = pane.createDialog (parentComponent, title, style);
pane.selectInitialValue ();
dialog.show ();
dialog.dispose ();
var selectedValue = pane.getValue ();
if (selectedValue == null) return -1;
if (options == null) {
if (Clazz.instanceOf (selectedValue, Integer)) return (selectedValue).intValue ();
return -1;
}for (var counter = 0, maxCounter = options.length; counter < maxCounter; counter++) {
if (options[counter].equals (selectedValue)) return counter;
}
return -1;
}, "java.awt.Component,~O,~S,~N,~N,javax.swing.Icon,~A,~O");
Clazz.defineMethod (c$, "createDialog", 
function (parentComponent, title) {
var style = javax.swing.JOptionPane.styleFromMessageType (this.getMessageType ());
return this.createDialog (parentComponent, title, style);
}, "java.awt.Component,~S");
Clazz.defineMethod (c$, "createDialog", 
function (title) {
var style = javax.swing.JOptionPane.styleFromMessageType (this.getMessageType ());
var dialog =  new javax.swing.JDialog (Clazz.castNullAs ("java.awt.Dialog"), title, true);
this.initDialog (dialog, style, null);
return dialog;
}, "~S");
Clazz.defineMethod (c$, "createDialog", 
 function (parentComponent, title, style) {
var dialog;
var window = javax.swing.JOptionPane.getWindowForComponent (parentComponent);
if (Clazz.instanceOf (window, java.awt.Frame)) {
dialog =  new javax.swing.JDialog (window, title, true);
} else {
dialog =  new javax.swing.JDialog (window, title, true);
}if (Clazz.instanceOf (window, javax.swing.SwingUtilities.SharedOwnerFrame)) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
dialog.addWindowListener (ownerShutdownListener);
}this.initDialog (dialog, style, parentComponent);
return dialog;
}, "java.awt.Component,~S,~N");
Clazz.defineMethod (c$, "initDialog", 
 function (dialog, style, parentComponent) {
dialog.setComponentOrientation (this.getComponentOrientation ());
var contentPane = dialog.getContentPane ();
contentPane.setLayout ( new java.awt.BorderLayout ());
contentPane.add (this, "Center");
dialog.setResizable (false);
if (javax.swing.JDialog.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = javax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
dialog.setUndecorated (true);
this.getRootPane ().setWindowDecorationStyle (style);
}}dialog.pack ();
dialog.setLocationRelativeTo (parentComponent);
var adapter = ((Clazz.isClassDefined ("javax.swing.JOptionPane$1") ? 0 : javax.swing.JOptionPane.$JOptionPane$1$ ()), Clazz.innerTypeInstance (javax.swing.JOptionPane$1, this, null));
dialog.addWindowListener (adapter);
dialog.addWindowFocusListener (adapter);
dialog.addComponentListener (((Clazz.isClassDefined ("javax.swing.JOptionPane$2") ? 0 : javax.swing.JOptionPane.$JOptionPane$2$ ()), Clazz.innerTypeInstance (javax.swing.JOptionPane$2, this, null)));
this.addPropertyChangeListener (((Clazz.isClassDefined ("javax.swing.JOptionPane$3") ? 0 : javax.swing.JOptionPane.$JOptionPane$3$ ()), Clazz.innerTypeInstance (javax.swing.JOptionPane$3, this, Clazz.cloneFinals ("dialog", dialog))));
}, "javax.swing.JDialog,~N,java.awt.Component");
c$.getFrameForComponent = Clazz.defineMethod (c$, "getFrameForComponent", 
function (parentComponent) {
if (parentComponent == null) return javax.swing.JOptionPane.getRootFrame ();
if (Clazz.instanceOf (parentComponent, java.awt.Frame)) return parentComponent;
return javax.swing.JOptionPane.getFrameForComponent (parentComponent.getParent ());
}, "java.awt.Component");
c$.getWindowForComponent = Clazz.defineMethod (c$, "getWindowForComponent", 
function (parentComponent) {
if (parentComponent == null) return javax.swing.JOptionPane.getRootFrame ();
if (Clazz.instanceOf (parentComponent, java.awt.Frame) || Clazz.instanceOf (parentComponent, java.awt.Dialog)) return parentComponent;
return javax.swing.JOptionPane.getWindowForComponent (parentComponent.getParent ());
}, "java.awt.Component");
c$.setRootFrame = Clazz.defineMethod (c$, "setRootFrame", 
function (newRootFrame) {
if (newRootFrame != null) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JOptionPane.sharedFrameKey, newRootFrame);
} else {
javax.swing.SwingUtilities.appContextRemove (javax.swing.JOptionPane.sharedFrameKey);
}}, "java.awt.Frame");
c$.getRootFrame = Clazz.defineMethod (c$, "getRootFrame", 
function () {
var sharedFrame = javax.swing.SwingUtilities.appContextGet (javax.swing.JOptionPane.sharedFrameKey);
if (sharedFrame == null) {
sharedFrame = javax.swing.SwingUtilities.getSharedOwnerFrame ();
javax.swing.SwingUtilities.appContextPut (javax.swing.JOptionPane.sharedFrameKey, sharedFrame);
}return sharedFrame;
});
Clazz.makeConstructor (c$, 
function () {
this.construct ("JOptionPane message");
});
Clazz.makeConstructor (c$, 
function (message) {
this.construct (message, -1);
}, "~O");
Clazz.makeConstructor (c$, 
function (message, messageType) {
this.construct (message, messageType, -1);
}, "~O,~N");
Clazz.makeConstructor (c$, 
function (message, messageType, optionType) {
this.construct (message, messageType, optionType, null);
}, "~O,~N,~N");
Clazz.makeConstructor (c$, 
function (message, messageType, optionType, icon) {
this.construct (message, messageType, optionType, icon, null);
}, "~O,~N,~N,javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (message, messageType, optionType, icon, options) {
this.construct (message, messageType, optionType, icon, options, null);
}, "~O,~N,~N,javax.swing.Icon,~A");
Clazz.makeConstructor (c$, 
function (message, messageType, optionType, icon, options, initialValue) {
Clazz.superConstructor (this, javax.swing.JOptionPane, []);
this.message = message;
this.options = options;
this.initialValue = initialValue;
this.icon = icon;
this.setMessageType (messageType);
this.setOptionType (optionType);
this.value = javax.swing.JOptionPane.UNINITIALIZED_VALUE;
this.inputValue = javax.swing.JOptionPane.UNINITIALIZED_VALUE;
this.updateUI ();
}, "~O,~N,~N,javax.swing.Icon,~A,~O");
Clazz.defineMethod (c$, "setUI", 
function (ui) {
if (this.ui !== ui) {
Clazz.superCall (this, javax.swing.JOptionPane, "setUI", [ui]);
this.invalidate ();
}}, "javax.swing.plaf.OptionPaneUI");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "OptionPaneUI";
});
Clazz.defineMethod (c$, "setMessage", 
function (newMessage) {
var oldMessage = this.message;
this.message = newMessage;
this.firePropertyChangeObject ("message", oldMessage, this.message);
}, "~O");
Clazz.defineMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.defineMethod (c$, "setIcon", 
function (newIcon) {
var oldIcon = this.icon;
this.icon = newIcon;
this.firePropertyChangeObject ("icon", oldIcon, this.icon);
}, "javax.swing.Icon");
Clazz.defineMethod (c$, "getIcon", 
function () {
return this.icon;
});
Clazz.defineMethod (c$, "setValue", 
function (newValue) {
var oldValue = this.value;
this.value = newValue;
this.firePropertyChangeObject ("value", oldValue, this.value);
}, "~O");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "setOptions", 
function (newOptions) {
var oldOptions = this.options;
this.options = newOptions;
this.firePropertyChangeObject ("options", oldOptions, this.options);
}, "~A");
Clazz.defineMethod (c$, "getOptions", 
function () {
if (this.options != null) {
var optionCount = this.options.length;
var retOptions =  new Array (optionCount);
System.arraycopy (this.options, 0, retOptions, 0, optionCount);
return retOptions;
}return this.options;
});
Clazz.defineMethod (c$, "setInitialValue", 
function (newInitialValue) {
var oldIV = this.initialValue;
this.initialValue = newInitialValue;
this.firePropertyChangeObject ("initialValue", oldIV, this.initialValue);
}, "~O");
Clazz.defineMethod (c$, "getInitialValue", 
function () {
return this.initialValue;
});
Clazz.defineMethod (c$, "setMessageType", 
function (newType) {
if (newType != 0 && newType != 1 && newType != 2 && newType != 3 && newType != -1) throw  new RuntimeException ("JOptionPane: type must be one of JOptionPane.ERROR_MESSAGE, JOptionPane.INFORMATION_MESSAGE, JOptionPane.WARNING_MESSAGE, JOptionPane.QUESTION_MESSAGE or JOptionPane.PLAIN_MESSAGE");
var oldType = this.messageType;
this.messageType = newType;
this.firePropertyChangeInt ("messageType", oldType, this.messageType);
}, "~N");
Clazz.defineMethod (c$, "getMessageType", 
function () {
return this.messageType;
});
Clazz.defineMethod (c$, "setOptionType", 
function (newType) {
if (newType != -1 && newType != 0 && newType != 1 && newType != 2) throw  new RuntimeException ("JOptionPane: option type must be one of JOptionPane.DEFAULT_OPTION, JOptionPane.YES_NO_OPTION, JOptionPane.YES_NO_CANCEL_OPTION or JOptionPane.OK_CANCEL_OPTION");
var oldType = this.optionType;
this.optionType = newType;
this.firePropertyChangeInt ("optionType", oldType, this.optionType);
}, "~N");
Clazz.defineMethod (c$, "getOptionType", 
function () {
return this.optionType;
});
Clazz.defineMethod (c$, "setSelectionValues", 
function (newValues) {
var oldValues = this.selectionValues;
this.selectionValues = newValues;
this.firePropertyChangeObject ("selectionValues", oldValues, newValues);
if (this.selectionValues != null) this.setWantsInput (true);
}, "~A");
Clazz.defineMethod (c$, "getSelectionValues", 
function () {
return this.selectionValues;
});
Clazz.defineMethod (c$, "setInitialSelectionValue", 
function (newValue) {
var oldValue = this.initialSelectionValue;
this.initialSelectionValue = newValue;
this.firePropertyChangeObject ("initialSelectionValue", oldValue, newValue);
}, "~O");
Clazz.defineMethod (c$, "getInitialSelectionValue", 
function () {
return this.initialSelectionValue;
});
Clazz.defineMethod (c$, "setInputValue", 
function (newValue) {
var oldValue = this.inputValue;
this.inputValue = newValue;
this.firePropertyChangeObject ("inputValue", oldValue, newValue);
}, "~O");
Clazz.defineMethod (c$, "getInputValue", 
function () {
return this.inputValue;
});
Clazz.defineMethod (c$, "getMaxCharactersPerLineCount", 
function () {
return 2147483647;
});
Clazz.defineMethod (c$, "setWantsInput", 
function (newValue) {
var oldValue = this.wantsInput;
this.wantsInput = newValue;
this.firePropertyChangeBool ("wantsInput", oldValue, newValue);
}, "~B");
Clazz.defineMethod (c$, "getWantsInput", 
function () {
return this.wantsInput;
});
Clazz.defineMethod (c$, "selectInitialValue", 
function () {
var ui = this.getUI ();
if (ui != null) {
ui.selectInitialValue (this);
}});
c$.styleFromMessageType = Clazz.defineMethod (c$, "styleFromMessageType", 
 function (messageType) {
switch (messageType) {
case 0:
return 4;
case 3:
return 7;
case 2:
return 8;
case 1:
return 3;
case -1:
default:
return 2;
}
}, "~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var iconString = (this.icon != null ? this.icon.toString () : "");
var initialValueString = (this.initialValue != null ? this.initialValue.toString () : "");
var messageString = (this.message != null ? this.message.toString () : "");
var messageTypeString;
if (this.messageType == 0) {
messageTypeString = "ERROR_MESSAGE";
} else if (this.messageType == 1) {
messageTypeString = "INFORMATION_MESSAGE";
} else if (this.messageType == 2) {
messageTypeString = "WARNING_MESSAGE";
} else if (this.messageType == 3) {
messageTypeString = "QUESTION_MESSAGE";
} else if (this.messageType == -1) {
messageTypeString = "PLAIN_MESSAGE";
} else messageTypeString = "";
var optionTypeString;
if (this.optionType == -1) {
optionTypeString = "DEFAULT_OPTION";
} else if (this.optionType == 0) {
optionTypeString = "YES_NO_OPTION";
} else if (this.optionType == 1) {
optionTypeString = "YES_NO_CANCEL_OPTION";
} else if (this.optionType == 2) {
optionTypeString = "OK_CANCEL_OPTION";
} else optionTypeString = "";
var wantsInputString = (this.wantsInput ? "true" : "false");
return Clazz.superCall (this, javax.swing.JOptionPane, "paramString", []) + ",icon=" + iconString + ",initialValue=" + initialValueString + ",message=" + messageString + ",messageType=" + messageTypeString + ",optionType=" + optionTypeString + ",wantsInput=" + wantsInputString;
});
c$.$JOptionPane$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.gotFocus = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "JOptionPane$1", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (we) {
this.b$["javax.swing.JOptionPane"].setValue (null);
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowGainedFocus", 
function (we) {
if (!this.gotFocus) {
this.b$["javax.swing.JOptionPane"].selectInitialValue ();
this.gotFocus = true;
}}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$JOptionPane$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JOptionPane$2", java.awt.event.ComponentAdapter);
Clazz.overrideMethod (c$, "componentShown", 
function (ce) {
this.b$["javax.swing.JOptionPane"].setValue (javax.swing.JOptionPane.UNINITIALIZED_VALUE);
}, "java.awt.event.ComponentEvent");
c$ = Clazz.p0p ();
};
c$.$JOptionPane$3$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JOptionPane$3", null, java.beans.PropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
if (this.f$.dialog.isVisible () && event.getSource () === this.b$["javax.swing.JOptionPane"] && (event.getPropertyName ().equals ("value") || event.getPropertyName ().equals ("inputValue")) && event.getNewValue () != null && event.getNewValue () !== javax.swing.JOptionPane.UNINITIALIZED_VALUE) {
this.f$.dialog.setVisible (false);
}}, "java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"$uiClassID", "OptionPaneUI",
"UNINITIALIZED_VALUE", "uninitializedValue",
"DEFAULT_OPTION", -1,
"YES_NO_OPTION", 0,
"YES_NO_CANCEL_OPTION", 1,
"OK_CANCEL_OPTION", 2,
"YES_OPTION", 0,
"NO_OPTION", 1,
"CANCEL_OPTION", 2,
"OK_OPTION", 0,
"CLOSED_OPTION", -1,
"ERROR_MESSAGE", 0,
"INFORMATION_MESSAGE", 1,
"WARNING_MESSAGE", 2,
"QUESTION_MESSAGE", 3,
"PLAIN_MESSAGE", -1,
"ICON_PROPERTY", "icon",
"MESSAGE_PROPERTY", "message",
"VALUE_PROPERTY", "value",
"OPTIONS_PROPERTY", "options",
"INITIAL_VALUE_PROPERTY", "initialValue",
"MESSAGE_TYPE_PROPERTY", "messageType",
"OPTION_TYPE_PROPERTY", "optionType",
"SELECTION_VALUES_PROPERTY", "selectionValues",
"INITIAL_SELECTION_VALUE_PROPERTY", "initialSelectionValue",
"INPUT_VALUE_PROPERTY", "inputValue",
"WANTS_INPUT_PROPERTY", "wantsInput");
c$.sharedFrameKey = c$.prototype.sharedFrameKey = javax.swing.JOptionPane;
});
