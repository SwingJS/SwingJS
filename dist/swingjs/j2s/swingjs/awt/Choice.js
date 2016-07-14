Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JComboBox"], "swingjs.awt.Choice", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Choice", javax.swing.JComboBox);
Clazz.defineMethod (c$, "select", 
function (index) {
this.setSelectedIndex (index);
}, "~N");
Clazz.defineMethod (c$, "select", 
function (key) {
this.setSelectedItem (key);
}, "~S");
Clazz.defineMethod (c$, "add", 
function (label) {
this.addItem (label);
}, "~S");
});
