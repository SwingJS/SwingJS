Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.GraphicElm"], "test.Circuit.BoxElm", ["java.awt.Color", "test.Circuit.CircuitElm"], function () {
c$ = Clazz.declareType (test.Circuit, "BoxElm", test.Circuit.GraphicElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.BoxElm, [xx, yy]);
this.x2 = xx + 16;
this.y2 = yy + 16;
this.setBbox (this.x, this.y, this.x2, this.y2);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.BoxElm, [xa, ya, xb, yb, f]);
this.x2 = xb;
this.y2 = yb;
this.setBbox (this.x, this.y, this.x2, this.y2);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'b';
});
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
this.x = xx;
this.y = yy;
}, "~N,~N");
Clazz.overrideMethod (c$, "draw", 
function (g) {
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : java.awt.Color.GRAY);
this.setBbox (this.x, this.y, this.x2, this.y2);
if (this.x < this.x2 && this.y < this.y2) g.fillRect (this.x, this.y, this.x2 - this.x, this.y2 - this.y);
 else if (this.x > this.x2 && this.y < this.y2) g.fillRect (this.x2, this.y, this.x - this.x2, this.y2 - this.y);
 else if (this.x < this.x2 && this.y > this.y2) g.fillRect (this.x, this.y2, this.x2 - this.x, this.y - this.y2);
 else g.fillRect (this.x2, this.y2, this.x - this.x2, this.y - this.y2);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
}, "~A");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});
