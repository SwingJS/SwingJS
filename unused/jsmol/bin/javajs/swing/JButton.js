Clazz.declarePackage ("javajs.swing");
Clazz.load (["javajs.swing.AbstractButton"], "javajs.swing.JButton", ["javajs.util.SB"], function () {
c$ = Clazz.declareType (javajs.swing, "JButton", javajs.swing.AbstractButton);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javajs.swing.JButton, ["btnJB"]);
});
Clazz.overrideMethod (c$, "toHTML", 
function () {
var sb =  new javajs.util.SB ();
sb.append ("<input type=button id='" + this.id + "' class='JButton' style='" + this.getCSSstyle (80, 0) + "' onclick='SwingController.click(this)' value='" + this.text + "'/>");
return sb.toString ();
});
});
