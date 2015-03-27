Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (["jsjavax.swing.colorchooser.AbstractColorChooserPanel", "jsjavax.swing.event.ChangeListener"], "jsjavax.swing.colorchooser.DefaultRGBChooserPanel", ["java.lang.Boolean", "jsjava.awt.BorderLayout", "$.Color", "jsjavax.swing.JLabel", "$.JPanel", "$.JSlider", "$.JSpinner", "$.SpinnerNumberModel", "$.UIManager", "jsjavax.swing.colorchooser.CenterLayout", "$.SmartGridLayout"], function () {
c$ = Clazz.decorateAsClass (function () {
this.redSlider = null;
this.greenSlider = null;
this.blueSlider = null;
this.redField = null;
this.blueField = null;
this.greenField = null;
this.minValue = 0;
this.maxValue = 255;
this.isAdjusting = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.colorchooser, "DefaultRGBChooserPanel", jsjavax.swing.colorchooser.AbstractColorChooserPanel, jsjavax.swing.event.ChangeListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.colorchooser.DefaultRGBChooserPanel);
this.setInheritsPopupMenu (true);
});
Clazz.defineMethod (c$, "setColor", 
($fz = function (newColor) {
var red = newColor.getRed ();
var blue = newColor.getBlue ();
var green = newColor.getGreen ();
if (this.redSlider.getValue () != red) {
this.redSlider.setValue (red);
}if (this.greenSlider.getValue () != green) {
this.greenSlider.setValue (green);
}if (this.blueSlider.getValue () != blue) {
this.blueSlider.setValue (blue);
}if ((this.redField.getValue ()).intValue () != red) this.redField.setValue ( new Integer (red));
if ((this.greenField.getValue ()).intValue () != green) this.greenField.setValue ( new Integer (green));
if ((this.blueField.getValue ()).intValue () != blue) this.blueField.setValue ( new Integer (blue));
}, $fz.isPrivate = true, $fz), "jsjava.awt.Color");
Clazz.overrideMethod (c$, "getDisplayName", 
function () {
return jsjavax.swing.UIManager.getString ("ColorChooser.rgbNameText");
});
Clazz.overrideMethod (c$, "getMnemonic", 
function () {
return jsjavax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbMnemonic", -1);
});
Clazz.overrideMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return jsjavax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbDisplayedMnemonicIndex", -1);
});
Clazz.overrideMethod (c$, "getSmallDisplayIcon", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getLargeDisplayIcon", 
function () {
return null;
});
Clazz.overrideMethod (c$, "buildChooser", 
function () {
var redString = jsjavax.swing.UIManager.getString ("ColorChooser.rgbRedText");
var greenString = jsjavax.swing.UIManager.getString ("ColorChooser.rgbGreenText");
var blueString = jsjavax.swing.UIManager.getString ("ColorChooser.rgbBlueText");
this.setLayout ( new jsjava.awt.BorderLayout ());
var color = this.getColorFromModel ();
var enclosure =  new jsjavax.swing.JPanel ();
enclosure.setLayout ( new jsjavax.swing.colorchooser.SmartGridLayout (3, 3));
enclosure.setInheritsPopupMenu (true);
this.add (enclosure, "Center");
var l =  new jsjavax.swing.JLabel (redString);
l.setDisplayedMnemonic (jsjavax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbRedMnemonic", -1));
enclosure.add (l);
this.redSlider =  new jsjavax.swing.JSlider (0, 0, 255, color.getRed ());
this.redSlider.setMajorTickSpacing (85);
this.redSlider.setMinorTickSpacing (17);
this.redSlider.setPaintTicks (true);
this.redSlider.setPaintLabels (true);
this.redSlider.setInheritsPopupMenu (true);
enclosure.add (this.redSlider);
this.redField =  new jsjavax.swing.JSpinner ( new jsjavax.swing.SpinnerNumberModel (color.getRed (), 0, 255, 1));
l.setLabelFor (this.redSlider);
this.redField.setInheritsPopupMenu (true);
var redFieldHolder =  new jsjavax.swing.JPanel ( new jsjavax.swing.colorchooser.CenterLayout ());
redFieldHolder.setInheritsPopupMenu (true);
this.redField.addChangeListener (this);
redFieldHolder.add (this.redField);
enclosure.add (redFieldHolder);
l =  new jsjavax.swing.JLabel (greenString);
l.setDisplayedMnemonic (jsjavax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbGreenMnemonic", -1));
enclosure.add (l);
this.greenSlider =  new jsjavax.swing.JSlider (0, 0, 255, color.getGreen ());
this.greenSlider.setMajorTickSpacing (85);
this.greenSlider.setMinorTickSpacing (17);
this.greenSlider.setPaintTicks (true);
this.greenSlider.setPaintLabels (true);
this.greenSlider.setInheritsPopupMenu (true);
enclosure.add (this.greenSlider);
this.greenField =  new jsjavax.swing.JSpinner ( new jsjavax.swing.SpinnerNumberModel (color.getGreen (), 0, 255, 1));
l.setLabelFor (this.greenSlider);
this.greenField.setInheritsPopupMenu (true);
var greenFieldHolder =  new jsjavax.swing.JPanel ( new jsjavax.swing.colorchooser.CenterLayout ());
greenFieldHolder.add (this.greenField);
greenFieldHolder.setInheritsPopupMenu (true);
this.greenField.addChangeListener (this);
enclosure.add (greenFieldHolder);
l =  new jsjavax.swing.JLabel (blueString);
l.setDisplayedMnemonic (jsjavax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbBlueMnemonic", -1));
enclosure.add (l);
this.blueSlider =  new jsjavax.swing.JSlider (0, 0, 255, color.getBlue ());
this.blueSlider.setMajorTickSpacing (85);
this.blueSlider.setMinorTickSpacing (17);
this.blueSlider.setPaintTicks (true);
this.blueSlider.setPaintLabels (true);
this.blueSlider.setInheritsPopupMenu (true);
enclosure.add (this.blueSlider);
this.blueField =  new jsjavax.swing.JSpinner ( new jsjavax.swing.SpinnerNumberModel (color.getBlue (), 0, 255, 1));
l.setLabelFor (this.blueSlider);
this.blueField.setInheritsPopupMenu (true);
var blueFieldHolder =  new jsjavax.swing.JPanel ( new jsjavax.swing.colorchooser.CenterLayout ());
blueFieldHolder.add (this.blueField);
this.blueField.addChangeListener (this);
blueFieldHolder.setInheritsPopupMenu (true);
enclosure.add (blueFieldHolder);
this.redSlider.addChangeListener (this);
this.greenSlider.addChangeListener (this);
this.blueSlider.addChangeListener (this);
this.redSlider.putClientProperty ("JSlider.isFilled", Boolean.TRUE);
this.greenSlider.putClientProperty ("JSlider.isFilled", Boolean.TRUE);
this.blueSlider.putClientProperty ("JSlider.isFilled", Boolean.TRUE);
});
Clazz.defineMethod (c$, "uninstallChooserPanel", 
function (enclosingChooser) {
Clazz.superCall (this, jsjavax.swing.colorchooser.DefaultRGBChooserPanel, "uninstallChooserPanel", [enclosingChooser]);
this.removeAll ();
}, "jsjavax.swing.JColorChooser");
Clazz.overrideMethod (c$, "updateChooser", 
function () {
if (!this.isAdjusting) {
this.isAdjusting = true;
this.setColor (this.getColorFromModel ());
this.isAdjusting = false;
}});
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
if (Clazz.instanceOf (e.getSource (), jsjavax.swing.JSlider) && !this.isAdjusting) {
var red = this.redSlider.getValue ();
var green = this.greenSlider.getValue ();
var blue = this.blueSlider.getValue ();
var color =  new jsjava.awt.Color (red, green, blue);
this.getColorSelectionModel ().setSelectedColor (color);
} else if (Clazz.instanceOf (e.getSource (), jsjavax.swing.JSpinner) && !this.isAdjusting) {
var red = (this.redField.getValue ()).intValue ();
var green = (this.greenField.getValue ()).intValue ();
var blue = (this.blueField.getValue ()).intValue ();
var color =  new jsjava.awt.Color (red, green, blue);
this.getColorSelectionModel ().setSelectedColor (color);
}}, "jsjavax.swing.event.ChangeEvent");
});
