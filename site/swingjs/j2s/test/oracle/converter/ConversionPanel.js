Clazz.declarePackage ("test.oracle.converter");
Clazz.load (["java.awt.event.ActionListener", "java.beans.PropertyChangeListener", "javax.swing.JPanel", "javax.swing.event.ChangeListener"], "test.oracle.converter.ConversionPanel", ["java.awt.Color", "$.Dimension", "java.lang.Double", "java.text.NumberFormat", "javax.swing.BorderFactory", "$.Box", "$.BoxLayout", "$.JComboBox", "$.JFormattedTextField", "$.JSlider", "javax.swing.text.NumberFormatter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.textField = null;
this.unitChooser = null;
this.slider = null;
this.sliderModel = null;
this.controller = null;
this.units = null;
this.title = null;
this.numberFormat = null;
this.formatter = null;
Clazz.instantialize (this, arguments);
}, test.oracle.converter, "ConversionPanel", javax.swing.JPanel, [java.awt.event.ActionListener, javax.swing.event.ChangeListener, java.beans.PropertyChangeListener]);
Clazz.makeConstructor (c$, 
function (myController, myTitle, myUnits, myModel) {
Clazz.superConstructor (this, test.oracle.converter.ConversionPanel, []);
if (false) {
this.setOpaque (true);
this.setBackground ( new java.awt.Color (0, 255, 255));
}this.setBorder (javax.swing.BorderFactory.createCompoundBorder (javax.swing.BorderFactory.createTitledBorder (myTitle), javax.swing.BorderFactory.createEmptyBorder (5, 5, 5, 5)));
this.controller = myController;
this.units = myUnits;
this.title = myTitle;
this.sliderModel = myModel;
this.numberFormat = java.text.NumberFormat.getNumberInstance ();
this.numberFormat.setMaximumFractionDigits (2);
this.formatter =  new javax.swing.text.NumberFormatter (this.numberFormat);
this.formatter.setAllowsInvalid (true);
this.formatter.setCommitsOnValidEdit (false);
this.textField =  new javax.swing.JFormattedTextField (this.formatter);
this.textField.setColumns (10);
this.textField.setValue ( new Double (this.sliderModel.getDoubleValue ()));
this.textField.addPropertyChangeListener (this);
this.unitChooser =  new javax.swing.JComboBox ();
for (var i = 0; i < this.units.length; i++) {
this.unitChooser.addItem (this.units[i].description);
}
this.unitChooser.setSelectedIndex (0);
this.sliderModel.setMultiplier (this.units[0].multiplier);
this.unitChooser.addActionListener (this);
this.slider =  new javax.swing.JSlider (this.sliderModel);
this.sliderModel.addChangeListener (this);
var unitGroup = ((Clazz.isClassDefined ("test.oracle.converter.ConversionPanel$1") ? 0 : test.oracle.converter.ConversionPanel.$ConversionPanel$1$ ()), Clazz.innerTypeInstance (test.oracle.converter.ConversionPanel$1, this, null));
unitGroup.setLayout ( new javax.swing.BoxLayout (unitGroup, 3));
if (false) {
unitGroup.setOpaque (true);
unitGroup.setBackground ( new java.awt.Color (0, 0, 255));
}unitGroup.setBorder (javax.swing.BorderFactory.createEmptyBorder (0, 0, 0, 5));
unitGroup.add (this.textField);
unitGroup.add (this.slider);
var chooserPanel =  new javax.swing.JPanel ();
chooserPanel.setLayout ( new javax.swing.BoxLayout (chooserPanel, 3));
if (false) {
chooserPanel.setOpaque (true);
chooserPanel.setBackground ( new java.awt.Color (255, 0, 255));
}chooserPanel.add (this.unitChooser);
chooserPanel.add (javax.swing.Box.createHorizontalStrut (100));
this.setLayout ( new javax.swing.BoxLayout (this, 2));
this.add (unitGroup);
this.add (chooserPanel);
unitGroup.setAlignmentY (0.0);
chooserPanel.setAlignmentY (0.0);
}, "test.oracle.converter.Converter,~S,~A,test.oracle.converter.ConverterRangeModel");
Clazz.overrideMethod (c$, "getMaximumSize", 
function () {
return  new java.awt.Dimension (2147483647, this.getPreferredSize ().height);
});
Clazz.defineMethod (c$, "getMultiplier", 
function () {
return this.sliderModel.getMultiplier ();
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.sliderModel.getDoubleValue ();
});
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var min = this.sliderModel.getMinimum ();
var max = this.sliderModel.getMaximum ();
var value = this.sliderModel.getDoubleValue ();
var formatter = this.textField.getFormatter ();
formatter.setMinimum ( new Double (min));
formatter.setMaximum ( new Double (max));
this.textField.setValue ( new Double (value));
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var i = this.unitChooser.getSelectedIndex ();
this.sliderModel.setMultiplier (this.units[i].multiplier);
this.controller.resetMaxValues (false);
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
if ("value".equals (e.getPropertyName ())) {
var value = e.getNewValue ();
this.sliderModel.setDoubleValue (value.doubleValue ());
if (this.textField.getCaretPosition () == 0) this.textField.selectAll ();
}}, "java.beans.PropertyChangeEvent");
c$.$ConversionPanel$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle.converter, "ConversionPanel$1", javax.swing.JPanel);
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
return this.getPreferredSize ();
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (150, Clazz.superCall (this, test.oracle.converter.ConversionPanel$1, "getPreferredSize", []).height);
});
Clazz.overrideMethod (c$, "getMaximumSize", 
function () {
return this.getPreferredSize ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MULTICOLORED", false,
"MAX", 10000);
});
