Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.AbstractAction"], "jsjavax.swing.text.TextAction", ["java.util.Hashtable", "jsjavax.swing.text.JTextComponent"], function () {
c$ = Clazz.declareType (jsjavax.swing.text, "TextAction", jsjavax.swing.AbstractAction);
Clazz.defineMethod (c$, "getTextComponent", 
function (e) {
if (e != null) {
var o = e.getSource ();
if (Clazz.instanceOf (o, jsjavax.swing.text.JTextComponent)) {
return o;
}}return this.getFocusedComponent ();
}, "jsjava.awt.event.ActionEvent");
c$.augmentList = Clazz.defineMethod (c$, "augmentList", 
function (list1, list2) {
var h =  new java.util.Hashtable ();
for (var i = 0; i < list1.length; i++) {
var a = list1[i];
var value = a.getValue ("Name");
h.put ((value != null ? value : ""), a);
}
for (var i = 0; i < list2.length; i++) {
var a = list2[i];
var value = a.getValue ("Name");
h.put ((value != null ? value : ""), a);
}
var actions =  new Array (h.size ());
var index = 0;
for (var e = h.elements (); e.hasMoreElements (); ) {
actions[index++] = e.nextElement ();
}
return actions;
}, "~A,~A");
Clazz.defineMethod (c$, "getFocusedComponent", 
function () {
return jsjavax.swing.text.JTextComponent.getFocusedComponent ();
});
});
