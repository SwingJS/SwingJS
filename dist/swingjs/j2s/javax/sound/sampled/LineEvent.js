Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (["java.util.EventObject"], "javax.sound.sampled.LineEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.position = 0;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled, "LineEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (line, type, position) {
Clazz.superConstructor (this, javax.sound.sampled.LineEvent, [line]);
this.type = type;
this.position = position;
}, "javax.sound.sampled.Line,javax.sound.sampled.LineEvent.Type,~N");
Clazz.defineMethod (c$, "getLine", 
function () {
return this.getSource ();
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getFramePosition", 
function () {
return this.position;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var sType = "";
if (this.type != null) sType = this.type.toString () + " ";
var sLine;
if (this.getLine () == null) {
sLine = "null";
} else {
sLine = this.getLine ().toString ();
}return  String.instantialize (sType + "event from line " + sLine);
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.LineEvent, "Type");
Clazz.makeConstructor (c$, 
function (a) {
this.name = a;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
c$.OPEN = c$.prototype.OPEN =  new javax.sound.sampled.LineEvent.Type ("Open");
c$.CLOSE = c$.prototype.CLOSE =  new javax.sound.sampled.LineEvent.Type ("Close");
c$.START = c$.prototype.START =  new javax.sound.sampled.LineEvent.Type ("Start");
c$.STOP = c$.prototype.STOP =  new javax.sound.sampled.LineEvent.Type ("Stop");
c$ = Clazz.p0p ();
});
