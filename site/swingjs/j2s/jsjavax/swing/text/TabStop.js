Clazz.declarePackage ("jsjavax.swing.text");
c$ = Clazz.decorateAsClass (function () {
this.alignment = 0;
this.position = 0;
this.leader = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "TabStop");
Clazz.makeConstructor (c$, 
function (pos) {
this.construct (pos, 0, 0);
}, "~N");
Clazz.makeConstructor (c$, 
function (pos, align, leader) {
this.alignment = align;
this.leader = leader;
this.position = pos;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getPosition", 
function () {
return this.position;
});
Clazz.defineMethod (c$, "getAlignment", 
function () {
return this.alignment;
});
Clazz.defineMethod (c$, "getLeader", 
function () {
return this.leader;
});
Clazz.overrideMethod (c$, "equals", 
function (other) {
if (other === this) {
return true;
}if (Clazz.instanceOf (other, jsjavax.swing.text.TabStop)) {
var o = other;
return ((this.alignment == o.alignment) && (this.leader == o.leader) && (this.position == o.position));
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.alignment ^ this.leader ^ Math.round (this.position);
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buf;
switch (this.alignment) {
default:
case 0:
buf = "";
break;
case 1:
buf = "right ";
break;
case 2:
buf = "center ";
break;
case 4:
buf = "decimal ";
break;
case 5:
buf = "bar ";
break;
}
buf = buf + "tab @" + String.valueOf (this.position);
if (this.leader != 0) buf = buf + " (w/leaders)";
return buf;
});
Clazz.defineStatics (c$,
"ALIGN_LEFT", 0,
"ALIGN_RIGHT", 1,
"ALIGN_CENTER", 2,
"ALIGN_DECIMAL", 4,
"ALIGN_BAR", 5,
"LEAD_NONE", 0,
"LEAD_DOTS", 1,
"LEAD_HYPHENS", 2,
"LEAD_UNDERLINE", 3,
"LEAD_THICKLINE", 4,
"LEAD_EQUALS", 5);
