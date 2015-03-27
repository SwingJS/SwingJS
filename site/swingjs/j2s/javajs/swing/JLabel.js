Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.JComponent"], "javajs.swing.JLabel", ["javajs.util.SB"], function () {
c$ = Clazz.declareType (javajs.swing, "JLabel", javajs.swing.JComponent);
Clazz.makeConstructor (c$, 
function (text) {
Clazz.superConstructor (this, javajs.swing.JLabel, ["lblJL"]);
this.text = text;
}, "~S");
Clazz.overrideMethod (c$, "toHTML", 
function () {
var sb =  new javajs.util.SB ();
sb.append ("<span id='" + this.id + "' class='JLabel' style='" + this.getCSSstyle (0, 0) + "'>");
sb.append (this.text);
sb.append ("</span>");
return sb.toString ();
});
});
