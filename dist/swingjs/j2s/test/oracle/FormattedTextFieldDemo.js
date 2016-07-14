Clazz.declarePackage ("test.oracle");
Clazz.load (["java.awt.event.ActionListener", "$.FocusListener", "java.beans.PropertyChangeListener", "javax.swing.JApplet", "$.JFormattedTextField"], "test.oracle.FormattedTextFieldDemo", ["java.awt.BorderLayout", "$.Color", "$.GridLayout", "java.lang.Boolean", "$.Double", "java.text.NumberFormat", "javax.swing.JFrame", "$.JLabel", "$.JPanel", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.amount = 100000;
this.rate = 7.5;
this.numPeriods = 30;
this.amountLabel = null;
this.rateLabel = null;
this.numPeriodsLabel = null;
this.paymentLabel = null;
this.amountField = null;
this.rateField = null;
this.numPeriodsField = null;
this.paymentField = null;
this.amountFormat = null;
this.percentFormat = null;
this.paymentFormat = null;
if (!Clazz.isClassDefined ("test.oracle.FormattedTextFieldDemo.SwingJSValidatedNumberField")) {
test.oracle.FormattedTextFieldDemo.$FormattedTextFieldDemo$SwingJSValidatedNumberField$ ();
}
Clazz.instantialize (this, arguments);
}, test.oracle, "FormattedTextFieldDemo", javax.swing.JApplet, [java.awt.event.ActionListener, java.beans.PropertyChangeListener, java.awt.event.FocusListener]);
Clazz.overrideMethod (c$, "init", 
function () {
this.setLayout ( new java.awt.BorderLayout ());
this.setUpFormats ();
var payment = this.computePayment (this.amount, this.rate, this.numPeriods);
this.amountLabel =  new javax.swing.JLabel (test.oracle.FormattedTextFieldDemo.amountString);
this.rateLabel =  new javax.swing.JLabel (test.oracle.FormattedTextFieldDemo.rateString);
this.numPeriodsLabel =  new javax.swing.JLabel (test.oracle.FormattedTextFieldDemo.numPeriodsString);
this.paymentLabel =  new javax.swing.JLabel (test.oracle.FormattedTextFieldDemo.paymentString);
this.amountField = Clazz.innerTypeInstance (test.oracle.FormattedTextFieldDemo.SwingJSValidatedNumberField, this, null, this.amountFormat);
this.amountField.setValue ( new Double (this.amount));
this.amountField.setColumns (10);
this.amountField.addPropertyChangeListener ("value", this);
this.amountField.addActionListener (this);
this.rateField = Clazz.innerTypeInstance (test.oracle.FormattedTextFieldDemo.SwingJSValidatedNumberField, this, null, this.percentFormat);
this.rateField.setValue ( new Double (this.rate));
this.rateField.setColumns (10);
this.rateField.addPropertyChangeListener ("value", this);
this.rateField.addActionListener (this);
this.rateField.addActionListener (this);
this.numPeriodsField = Clazz.innerTypeInstance (test.oracle.FormattedTextFieldDemo.SwingJSValidatedNumberField, this, null);
this.numPeriodsField.setValue ( new Integer (this.numPeriods));
this.numPeriodsField.setColumns (10);
this.numPeriodsField.addPropertyChangeListener ("value", this);
this.numPeriodsField.addActionListener (this);
this.paymentField =  new javax.swing.JFormattedTextField (this.paymentFormat);
this.paymentField.setValue ( new Double (payment));
this.paymentField.setColumns (10);
this.paymentField.setEditable (false);
this.paymentField.setForeground (java.awt.Color.red);
this.amountLabel.setLabelFor (this.amountField);
this.rateLabel.setLabelFor (this.rateField);
this.numPeriodsLabel.setLabelFor (this.numPeriodsField);
this.paymentLabel.setLabelFor (this.paymentField);
var labelPane =  new javax.swing.JPanel ( new java.awt.GridLayout (0, 1));
labelPane.add (this.amountLabel);
labelPane.add (this.rateLabel);
labelPane.add (this.numPeriodsLabel);
labelPane.add (this.paymentLabel);
var fieldPane =  new javax.swing.JPanel ( new java.awt.GridLayout (0, 1));
fieldPane.add (this.amountField);
fieldPane.add (this.rateField);
fieldPane.add (this.numPeriodsField);
fieldPane.add (this.paymentField);
this.add (labelPane, "Center");
this.add (fieldPane, "After");
this.resize (270, 100);
});
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var source = e.getSource ();
System.out.println ("propertyChange " + e);
if (source === this.amountField) {
this.amount = (this.amountField.getValue ()).doubleValue ();
} else if (source === this.rateField) {
this.rate = (this.rateField.getValue ()).doubleValue ();
} else if (source === this.numPeriodsField) {
this.numPeriods = (this.numPeriodsField.getValue ()).intValue ();
}var payment = this.computePayment (this.amount, this.rate, this.numPeriods);
this.paymentField.setValue ( new Double (payment));
}, "java.beans.PropertyChangeEvent");
c$.createAndShowGUI = Clazz.defineMethod (c$, "createAndShowGUI", 
 function () {
var frame =  new javax.swing.JFrame ("FormattedTextFieldDemo");
frame.setDefaultCloseOperation (3);
frame.add ( new test.oracle.FormattedTextFieldDemo ());
frame.pack ();
frame.setVisible (true);
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
javax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("test.oracle.FormattedTextFieldDemo$1") ? 0 : test.oracle.FormattedTextFieldDemo.$FormattedTextFieldDemo$1$ ()), Clazz.innerTypeInstance (test.oracle.FormattedTextFieldDemo$1, this, null)));
}, "~A");
Clazz.defineMethod (c$, "computePayment", 
function (loanAmt, rate, numPeriods) {
var I;
var partial1;
var denominator;
var answer;
numPeriods *= 12;
if (rate > 0.01) {
I = rate / 100.0 / 12.0;
partial1 = Math.pow ((1 + I), (0.0 - numPeriods));
denominator = (1 - partial1) / I;
} else {
denominator = numPeriods;
}answer = (-1 * loanAmt) / denominator;
return answer;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setUpFormats", 
 function () {
this.amountFormat = java.text.NumberFormat.getNumberInstance ();
this.percentFormat = java.text.NumberFormat.getNumberInstance ();
this.percentFormat.setMinimumFractionDigits (3);
this.paymentFormat = java.text.NumberFormat.getCurrencyInstance ();
});
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
System.out.println ("focusGained " + (e.getSource ()).getText () + " " + (e.getSource ()).getValue ());
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
System.out.println ("focusLost " + (e.getSource ()).getText () + " " + (e.getSource ()).getValue ());
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
System.out.println ("actionEvent " + e);
(e.getSource ()).validateNumber ();
}, "java.awt.event.ActionEvent");
c$.$FormattedTextFieldDemo$SwingJSValidatedNumberField$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.oracle.FormattedTextFieldDemo, "SwingJSValidatedNumberField", javax.swing.JFormattedTextField);
Clazz.overrideMethod (c$, "invalidEdit", 
function () {
this.validateNumber ();
});
Clazz.defineMethod (c$, "validateNumber", 
function () {
try {
this.setText (this.getFormatter ().valueToString (this.getValue ()));
} catch (e1) {
if (Clazz.exceptionOf (e1, java.text.ParseException)) {
} else {
throw e1;
}
}
});
c$ = Clazz.p0p ();
};
c$.$FormattedTextFieldDemo$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle, "FormattedTextFieldDemo$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
javax.swing.UIManager.put ("swing.boldMetal", Boolean.FALSE);
test.oracle.FormattedTextFieldDemo.createAndShowGUI ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"amountString", "Loan Amount: ",
"rateString", "APR (%): ",
"numPeriodsString", "Years: ",
"paymentString", "Monthly Payment: ");
});
