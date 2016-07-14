Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.GraphicElm"], "test.Circuit.TextElm", ["java.awt.Checkbox", "$.Font", "java.lang.StringBuffer", "java.util.Vector", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.lines = null;
this.size = 0;
this.FLAG_CENTER = 1;
this.FLAG_BAR = 2;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TextElm", test.Circuit.GraphicElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TextElm, [xx, yy]);
this.text = "hello";
this.lines =  new java.util.Vector ();
this.lines.add (this.text);
this.size = 24;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TextElm, [xa, ya, xb, yb, f]);
this.size =  new Integer (st.nextToken ()).intValue ();
this.text = st.nextToken ();
while (st.hasMoreTokens ()) this.text += ' ' + st.nextToken ();

this.split ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "split", 
function () {
var i;
this.lines =  new java.util.Vector ();
var sb =  new StringBuffer (this.text);
for (i = 0; i < sb.length (); i++) {
var c = sb.charAt (i);
if (c == '\\') {
sb.deleteCharAt (i);
c = sb.charAt (i);
if (c == 'n') {
this.lines.add (sb.substring (0, i));
sb.$delete (0, i + 1);
i = -1;
continue;
}}}
this.lines.add (sb.toString ());
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TextElm, "dump", []) + " " + this.size + " " + this.text;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'x';
});
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
this.x = xx;
this.y = yy;
this.x2 = xx + 16;
this.y2 = yy;
}, "~N,~N");
Clazz.overrideMethod (c$, "draw", 
function (g) {
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
var f =  new java.awt.Font ("SansSerif", 0, this.size);
g.setFont (f);
var fm = g.getFontMetrics ();
var i;
var maxw = -1;
for (i = 0; i != this.lines.size (); i++) {
var w = fm.stringWidth ((this.lines.elementAt (i)));
if (w > maxw) maxw = w;
}
var cury = this.y;
this.setBbox (this.x, this.y, this.x, this.y);
for (i = 0; i != this.lines.size (); i++) {
var s = (this.lines.elementAt (i));
if ((this.flags & 1) != 0) this.x = Clazz.doubleToInt ((test.Circuit.CircuitElm.sim.winSize.width - fm.stringWidth (s)) / 2);
g.drawString (s, this.x, cury);
if ((this.flags & 2) != 0) {
var by = cury - fm.getAscent ();
g.drawLine (this.x, by, this.x + fm.stringWidth (s) - 1, by);
}this.adjustBbox (this.x, cury - fm.getAscent (), this.x + fm.stringWidth (s), cury + fm.getDescent ());
cury += fm.getHeight ();
}
this.x2 = this.boundingBox.x + this.boundingBox.width;
this.y2 = this.boundingBox.y + this.boundingBox.height;
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("Text", 0, -1, -1);
ei.text = this.text;
return ei;
}if (n == 1) return  new test.Circuit.EditInfo ("Size", this.size, 5, 100);
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Center", (this.flags & 1) != 0);
return ei;
}if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Draw Bar On Top", (this.flags & 2) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
this.text = ei.textf.getText ();
this.split ();
}if (n == 1) this.size = Clazz.doubleToInt (ei.value);
if (n == 3) {
if (ei.checkbox.getState ()) this.flags |= 2;
 else this.flags &= -3;
}if (n == 2) {
if (ei.checkbox.getState ()) this.flags |= 1;
 else this.flags &= -2;
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "isCenteredText", 
function () {
return (this.flags & 1) != 0;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = this.text;
}, "~A");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 't';
});
});
