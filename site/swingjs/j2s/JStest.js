Clazz.load (["jsjavax.swing.JApplet"], "JStest", ["jsContext", "jsjavax.swing.JLabel"], function () {
c$ = Clazz.declareType (null, "JStest", jsjavax.swing.JApplet);
Clazz.overrideMethod (c$, "init", 
function () {
var j =  new jsjavax.swing.JLabel ("Hello world!");
this.add (j);
System.out.println (this.getParameter ("width"));
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var app =  new JStest ();
app.setStub ( new jsContext (app));
app.init ();
var a =  Clazz.newIntArray (3, 4, 0);
var b =  Clazz.newArray (-1, [ Clazz.newIntArray (-1, [4, 5]),  Clazz.newIntArray (-1, [5, 6])]);
System.out.println (args);
}, "~A");
});
