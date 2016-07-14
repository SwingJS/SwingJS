Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.Dialog", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ItemListener"], ["test.Circuit.EditDialog", "$.Editable"], ["java.awt.Button", "$.Label", "$.Scrollbar", "$.TextField", "java.awt.event.WindowAdapter", "java.text.DecimalFormat", "$.ParseException", "test.Circuit.CirSim", "$.EditDialogLayout"], function () {
Clazz.declareInterface (test.Circuit, "Editable");
c$ = Clazz.decorateAsClass (function () {
this.elm = null;
this.cframe = null;
this.applyButton = null;
this.okButton = null;
this.einfos = null;
this.einfocount = 0;
this.barmax = 1000;
this.noCommaFormat = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "EditDialog", java.awt.Dialog, [java.awt.event.AdjustmentListener, java.awt.event.ActionListener, java.awt.event.ItemListener]);
Clazz.makeConstructor (c$, 
function (ce, f) {
Clazz.superConstructor (this, test.Circuit.EditDialog, [f, "Edit Component", false]);
this.cframe = f;
this.elm = ce;
this.setLayout ( new test.Circuit.EditDialogLayout ());
this.einfos =  new Array (10);
this.noCommaFormat = java.text.DecimalFormat.getInstance ();
this.noCommaFormat.setMaximumFractionDigits (10);
this.noCommaFormat.setGroupingUsed (false);
var i;
for (i = 0; ; i++) {
this.einfos[i] = this.elm.getEditInfo (i);
if (this.einfos[i] == null) break;
var ei = this.einfos[i];
this.add ( new java.awt.Label (ei.name));
if (ei.choice != null) {
this.add (ei.choice);
ei.choice.addItemListener (this);
} else if (ei.checkbox != null) {
this.add (ei.checkbox);
ei.checkbox.addItemListener (this);
} else {
this.add (ei.textf =  new java.awt.TextField (this.unitString (ei), 10));
if (ei.text != null) ei.textf.setText (ei.text);
ei.textf.addActionListener (this);
if (ei.text == null) {
this.add (ei.bar =  new java.awt.Scrollbar (0, 50, 10, 0, 1002));
this.setBar (ei);
ei.bar.addAdjustmentListener (this);
}}}
this.einfocount = i;
this.add (this.applyButton =  new java.awt.Button ("Apply"));
this.applyButton.addActionListener (this);
this.add (this.okButton =  new java.awt.Button ("OK"));
this.okButton.addActionListener (this);
var x = test.Circuit.CirSim.main.getLocationOnScreen ();
var d = this.getSize ();
this.setLocation (x.x + Clazz.doubleToInt ((this.cframe.winSize.width - d.width) / 2), x.y + Clazz.doubleToInt ((this.cframe.winSize.height - d.height) / 2));
this.addWindowListener (((Clazz.isClassDefined ("test.Circuit.EditDialog$1") ? 0 : test.Circuit.EditDialog.$EditDialog$1$ ()), Clazz.innerTypeInstance (test.Circuit.EditDialog$1, this, null)));
}, "test.Circuit.Editable,test.Circuit.CirSim");
Clazz.defineMethod (c$, "unitString", 
function (ei) {
var v = ei.value;
var va = Math.abs (v);
if (ei.dimensionless) return this.noCommaFormat.format (v);
if (v == 0) return "0";
if (va < 1e-9) return this.noCommaFormat.format (v * 1e12) + "p";
if (va < 1e-6) return this.noCommaFormat.format (v * 1e9) + "n";
if (va < 1e-3) return this.noCommaFormat.format (v * 1e6) + "u";
if (va < 1 && !ei.forceLargeM) return this.noCommaFormat.format (v * 1e3) + "m";
if (va < 1e3) return this.noCommaFormat.format (v);
if (va < 1e6) return this.noCommaFormat.format (v * 1e-3) + "k";
if (va < 1e9) return this.noCommaFormat.format (v * 1e-6) + "M";
return this.noCommaFormat.format (v * 1e-9) + "G";
}, "test.Circuit.EditInfo");
Clazz.defineMethod (c$, "parseUnits", 
function (ei) {
var s = ei.textf.getText ();
s = s.trim ();
var len = s.length;
var uc = s.charAt (len - 1);
var mult = 1;
switch (uc) {
case 'p':
case 'P':
mult = 1e-12;
break;
case 'n':
case 'N':
mult = 1e-9;
break;
case 'u':
case 'U':
mult = 1e-6;
break;
case 'm':
mult = (ei.forceLargeM) ? 1e6 : 1e-3;
break;
case 'k':
case 'K':
mult = 1e3;
break;
case 'M':
mult = 1e6;
break;
case 'G':
case 'g':
mult = 1e9;
break;
}
if (mult != 1) s = s.substring (0, len - 1).trim ();
return this.noCommaFormat.parse (s).doubleValue () * mult;
}, "test.Circuit.EditInfo");
Clazz.defineMethod (c$, "apply", 
function () {
var i;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.textf == null) continue;
if (ei.text == null) {
try {
var d = this.parseUnits (ei);
ei.value = d;
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
}this.elm.setEditValue (i, ei);
if (ei.text == null) this.setBar (ei);
}
this.cframe.needAnalyze ();
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var i;
var src = e.getSource ();
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (src === ei.textf) {
if (ei.text == null) {
try {
var d = this.parseUnits (ei);
ei.value = d;
} catch (ex) {
if (Clazz.exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
}this.elm.setEditValue (i, ei);
if (ei.text == null) this.setBar (ei);
this.cframe.needAnalyze ();
}}
if (e.getSource () === this.okButton) {
this.apply ();
this.closeDialog ();
}if (e.getSource () === this.applyButton) this.apply ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
var src = e.getSource ();
var i;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.bar === src) {
var v = ei.bar.getValue () / 1000.;
if (v < 0) v = 0;
if (v > 1) v = 1;
ei.value = (ei.maxval - ei.minval) * v + ei.minval;
ei.value = Math.round (ei.value / ei.minval) * ei.minval;
this.elm.setEditValue (i, ei);
ei.textf.setText (this.unitString (ei));
this.cframe.needAnalyze ();
}}
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
var src = e.getItemSelectable ();
var i;
var changed = false;
for (i = 0; i != this.einfocount; i++) {
var ei = this.einfos[i];
if (ei.choice === src || ei.checkbox === src) {
this.elm.setEditValue (i, ei);
if (ei.newDialog) changed = true;
this.cframe.needAnalyze ();
}}
if (changed) {
this.setVisible (false);
test.Circuit.CirSim.editDialog =  new test.Circuit.EditDialog (this.elm, this.cframe);
test.Circuit.CirSim.editDialog.show ();
}}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.closeDialog ();
return true;
}return Clazz.superCall (this, test.Circuit.EditDialog, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "setBar", 
function (ei) {
var x = Clazz.doubleToInt (1000 * (ei.value - ei.minval) / (ei.maxval - ei.minval));
ei.bar.setValue (x);
}, "test.Circuit.EditInfo");
Clazz.defineMethod (c$, "closeDialog", 
function () {
test.Circuit.CirSim.main.requestFocus ();
this.setVisible (false);
test.Circuit.CirSim.editDialog = null;
});
c$.$EditDialog$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.Circuit, "EditDialog$1", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (we) {
this.b$["test.Circuit.EditDialog"].closeDialog ();
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
});
