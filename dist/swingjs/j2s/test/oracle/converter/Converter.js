Clazz.declarePackage ("test.oracle.converter");
Clazz.load (["javax.swing.JApplet", "test.oracle.converter.ConverterRangeModel"], "test.oracle.converter.Converter", ["java.awt.Color", "$.Dimension", "javax.swing.BorderFactory", "$.Box", "$.BoxLayout", "$.JPanel", "$.UIManager", "test.oracle.converter.ConversionPanel", "$.FollowerRangeModel", "$.Unit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metricPanel = null;
this.usaPanel = null;
this.metricDistances = null;
this.usaDistances = null;
this.dataModel = null;
this.mainPane = null;
Clazz.instantialize (this, arguments);
}, test.oracle.converter, "Converter", javax.swing.JApplet);
Clazz.prepareFields (c$, function () {
this.metricDistances =  new Array (3);
this.usaDistances =  new Array (4);
this.dataModel =  new test.oracle.converter.ConverterRangeModel ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.oracle.converter.Converter, []);
this.metricDistances[0] =  new test.oracle.converter.Unit ("Centimeters", 0.01);
this.metricDistances[1] =  new test.oracle.converter.Unit ("Meters", 1.0);
this.metricDistances[2] =  new test.oracle.converter.Unit ("Kilometers", 1000.0);
this.metricPanel =  new test.oracle.converter.ConversionPanel (this, "Metric System", this.metricDistances, this.dataModel);
this.usaDistances[0] =  new test.oracle.converter.Unit ("Inches", 0.0254);
this.usaDistances[1] =  new test.oracle.converter.Unit ("Feet", 0.305);
this.usaDistances[2] =  new test.oracle.converter.Unit ("Yards", 0.914);
this.usaDistances[3] =  new test.oracle.converter.Unit ("Miles", 1613.0);
this.usaPanel =  new test.oracle.converter.ConversionPanel (this, "U.S. System", this.usaDistances,  new test.oracle.converter.FollowerRangeModel (this.dataModel));
this.mainPane =  new javax.swing.JPanel ();
this.mainPane.setLayout ( new javax.swing.BoxLayout (this.mainPane, 3));
if (false) {
this.mainPane.setOpaque (true);
this.mainPane.setBackground ( new java.awt.Color (255, 0, 0));
}this.mainPane.setBorder (javax.swing.BorderFactory.createEmptyBorder (5, 5, 5, 5));
this.mainPane.add (javax.swing.Box.createRigidArea ( new java.awt.Dimension (0, 5)));
this.mainPane.add (this.metricPanel);
this.mainPane.add (javax.swing.Box.createRigidArea ( new java.awt.Dimension (0, 5)));
this.mainPane.add (this.usaPanel);
this.mainPane.add (javax.swing.Box.createGlue ());
this.resetMaxValues (true);
});
Clazz.defineMethod (c$, "resetMaxValues", 
function (resetCurrentValues) {
var metricMultiplier = this.metricPanel.getMultiplier ();
var usaMultiplier = this.usaPanel.getMultiplier ();
var maximum = 10000;
if (metricMultiplier > usaMultiplier) {
maximum = Clazz.doubleToInt (10000 * (usaMultiplier / metricMultiplier));
}this.dataModel.setMaximum (maximum);
if (resetCurrentValues) {
this.dataModel.setDoubleValue (maximum);
}}, "~B");
c$.initLookAndFeel = Clazz.defineMethod (c$, "initLookAndFeel", 
 function () {
var lookAndFeel = null;
if (test.oracle.converter.Converter.LOOKANDFEEL != null) {
if (test.oracle.converter.Converter.LOOKANDFEEL.equals ("Metal")) {
lookAndFeel = javax.swing.UIManager.getCrossPlatformLookAndFeelClassName ();
} else if (test.oracle.converter.Converter.LOOKANDFEEL.equals ("System")) {
lookAndFeel = javax.swing.UIManager.getSystemLookAndFeelClassName ();
} else if (test.oracle.converter.Converter.LOOKANDFEEL.equals ("Motif")) {
lookAndFeel = "com.sun.java.swing.plaf.motif.MotifLookAndFeel";
} else if (test.oracle.converter.Converter.LOOKANDFEEL.equals ("GTK+")) {
lookAndFeel = "com.sun.java.swing.plaf.gtk.GTKLookAndFeel";
} else {
System.err.println ("Unexpected value of LOOKANDFEEL specified: " + test.oracle.converter.Converter.LOOKANDFEEL);
lookAndFeel = javax.swing.UIManager.getCrossPlatformLookAndFeelClassName ();
}try {
javax.swing.UIManager.setLookAndFeel (lookAndFeel);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
System.err.println ("Couldn't find class for specified look and feel:" + lookAndFeel);
System.err.println ("Did you include the L&F library in the class path?");
System.err.println ("Using the default look and feel.");
}
} else if (Clazz.exceptionOf (e$$, javax.swing.UnsupportedLookAndFeelException)) {
var e = e$$;
{
System.err.println ("Can't use the specified look and feel (" + lookAndFeel + ") on this platform.");
System.err.println ("Using the default look and feel.");
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("Couldn't get specified look and feel (" + lookAndFeel + "), for some reason.");
System.err.println ("Using the default look and feel.");
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}});
Clazz.overrideMethod (c$, "init", 
function () {
this.resize (300, 170);
this.createAndShowGUI ();
});
Clazz.defineMethod (c$, "createAndShowGUI", 
 function () {
test.oracle.converter.Converter.initLookAndFeel ();
var converter =  new test.oracle.converter.Converter ();
converter.mainPane.setOpaque (true);
this.add (converter.mainPane);
});
Clazz.defineStatics (c$,
"MULTICOLORED", false,
"LOOKANDFEEL", null);
});
