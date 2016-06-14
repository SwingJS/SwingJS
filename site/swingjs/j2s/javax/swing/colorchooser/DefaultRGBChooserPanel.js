Clazz.declarePackage ("javax.swing.colorchooser");
Clazz.load (["javax.swing.colorchooser.AbstractColorChooserPanel", "javax.swing.event.ChangeListener"], "javax.swing.colorchooser.DefaultRGBChooserPanel", ["java.lang.Boolean", "java.awt.BorderLayout", "$.Color", "javax.swing.JLabel", "$.JPanel", "$.JSlider", "$.JSpinner", "$.SpinnerNumberModel", "$.UIManager", "javax.swing.colorchooser.CenterLayout", "$.SmartGridLayout"], function () {
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
}, javax.swing.colorchooser, "DefaultRGBChooserPanel", javax.swing.colorchooser.AbstractColorChooserPanel, javax.swing.event.ChangeListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.colorchooser.DefaultRGBChooserPanel);
this.setInheritsPopupMenu (true);
});
Clazz.defineMethod (c$, "setColor", 
 function (newColor) {
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
}, "java.awt.Color");
Clazz.overrideMethod (c$, "getDisplayName", 
function () {
return javax.swing.UIManager.getString ("ColorChooser.rgbNameText");
});
Clazz.overrideMethod (c$, "getMnemonic", 
function () {
return javax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbMnemonic", -1);
});
Clazz.overrideMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return javax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbDisplayedMnemonicIndex", -1);
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
var redString = javax.swing.UIManager.getString ("ColorChooser.rgbRedText");
var greenString = javax.swing.UIManager.getString ("ColorChooser.rgbGreenText");
var blueString = javax.swing.UIManager.getString ("ColorChooser.rgbBlueText");
this.setLayout ( new java.awt.BorderLayout ());
var color = this.getColorFromModel ();
var enclosure =  new javax.swing.JPanel ();
enclosure.setLayout ( new javax.swing.colorchooser.SmartGridLayout (3, 3));
enclosure.setInheritsPopupMenu (true);
this.add (enclosure, "Center");
var l =  new javax.swing.JLabel (redString);
l.setDisplayedMnemonic (javax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbRedMnemonic", -1));
enclosure.add (l);
this.redSlider =  new javax.swing.JSlider (0, 0, 255, color.getRed ());
this.redSlider.setMajorTickSpacing (85);
this.redSlider.setMinorTickSpacing (17);
this.redSlider.setPaintTicks (true);
this.redSlider.setPaintLabels (true);
this.redSlider.setInheritsPopupMenu (true);
enclosure.add (this.redSlider);
this.redField =  new javax.swing.JSpinner ( new javax.swing.SpinnerNumberModel (color.getRed (), 0, 255, 1));
l.setLabelFor (this.redSlider);
this.redField.setInheritsPopupMenu (true);
var redFieldHolder =  new javax.swing.JPanel ( new javax.swing.colorchooser.CenterLayout ());
redFieldHolder.setInheritsPopupMenu (true);
this.redField.addChangeListener (this);
redFieldHolder.add (this.redField);
enclosure.add (redFieldHolder);
l =  new javax.swing.JLabel (greenString);
l.setDisplayedMnemonic (javax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbGreenMnemonic", -1));
enclosure.add (l);
this.greenSlider =  new javax.swing.JSlider (0, 0, 255, color.getGreen ());
this.greenSlider.setMajorTickSpacing (85);
this.greenSlider.setMinorTickSpacing (17);
this.greenSlider.setPaintTicks (true);
this.greenSlider.setPaintLabels (true);
this.greenSlider.setInheritsPopupMenu (true);
enclosure.add (this.greenSlider);
this.greenField =  new javax.swing.JSpinner ( new javax.swing.SpinnerNumberModel (color.getGreen (), 0, 255, 1));
l.setLabelFor (this.greenSlider);
this.greenField.setInheritsPopupMenu (true);
var greenFieldHolder =  new javax.swing.JPanel ( new javax.swing.colorchooser.CenterLayout ());
greenFieldHolder.add (this.greenField);
greenFieldHolder.setInheritsPopupMenu (true);
this.greenField.addChangeListener (this);
enclosure.add (greenFieldHolder);
l =  new javax.swing.JLabel (blueString);
l.setDisplayedMnemonic (javax.swing.colorchooser.AbstractColorChooserPanel.getInt ("ColorChooser.rgbBlueMnemonic", -1));
enclosure.add (l);
this.blueSlider =  new javax.swing.JSlider (0, 0, 255, color.getBlue ());
this.blueSlider.setMajorTickSpacing (85);
this.blueSlider.setMinorTickSpacing (17);
this.blueSlider.setPaintTicks (true);
this.blueSlider.setPaintLabels (true);
this.blueSlider.setInheritsPopupMenu (true);
enclosure.add (this.blueSlider);
this.blueField =  new javax.swing.JSpinner ( new javax.swing.SpinnerNumberModel (color.getBlue (), 0, 255, 1));
l.setLabelFor (this.blueSlider);
this.blueField.setInheritsPopupMenu (true);
var blueFieldHolder =  new javax.swing.JPanel ( new javax.swing.colorchooser.CenterLayout ());
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
Clazz.superCall (this, javax.swing.colorchooser.DefaultRGBChooserPanel, "uninstallChooserPanel", [enclosingChooser]);
this.removeAll ();
}, "javax.swing.JColorChooser");
Clazz.overrideMethod (c$, "updateChooser", 
function () {
if (!this.isAdjusting) {
this.isAdjusting = true;
this.setColor (this.getColorFromModel ());
this.isAdjusting = false;
}});
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
if (Clazz.instanceOf (e.getSource (), javax.swing.JSlider) && !this.isAdjusting) {
var red = this.redSlider.getValue ();
var green = this.greenSlider.getValue ();
var blue = this.blueSlider.getValue ();
var color =  new java.awt.Color (red, green, blue);
this.getColorSelectionModel ().setSelectedColor (color);
} else if (Clazz.instanceOf (e.getSource (), javax.swing.JSpinner) && !this.isAdjusting) {
var red = (this.redField.getValue ()).intValue ();
var green = (this.greenField.getValue ()).intValue ();
var blue = (this.blueField.getValue ()).intValue ();
var color =  new java.awt.Color (red, green, blue);
this.getColorSelectionModel ().setSelectedColor (color);
}}, "javax.swing.event.ChangeEvent");
});
