Clazz.declarePackage ("swingjs");
Clazz.load (["swingjs.JSAbstractDocument"], "swingjs.JSPlainDocument", ["java.util.Hashtable", "JU.SB", "swingjs.JSPosition"], function () {
c$ = Clazz.declareType (swingjs, "JSPlainDocument", swingjs.JSAbstractDocument);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSPlainDocument);
this.sb =  new JU.SB ();
this.root = Clazz.innerTypeInstance (swingjs.JSAbstractDocument.JSElement, this, null);
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.sb.length ();
});
Clazz.defineMethod (c$, "getText", 
function (offset, length) {
this.checkLoc (offset, offset + length);
return this.sb.substring2 (offset, offset + length);
}, "~N,~N");
Clazz.defineMethod (c$, "getText", 
function (offset, length, chars) {
this.checkLoc (offset, offset + length);
if (this.tempChar == null) {
this.tempChar =  Clazz.newCharArray (this.sb.length (), '\0');
for (var i = this.tempChar.length; --i >= 0; ) this.tempChar[i] = this.sb.charAt (i);

}chars.array = this.tempChar;
chars.offset = offset;
chars.count = length;
}, "~N,~N,javax.swing.text.Segment");
Clazz.overrideMethod (c$, "getStartPosition", 
function () {
return  new swingjs.JSPosition (0);
});
Clazz.overrideMethod (c$, "getEndPosition", 
function () {
return  new swingjs.JSPosition (this.sb.length ());
});
Clazz.overrideMethod (c$, "createPosition", 
function (offs) {
this.checkLoc (offs, offs);
var i = Integer.$valueOf (offs);
if (this.positions == null) this.positions =  new java.util.Hashtable ();
var p = this.positions.get (i);
if (p == null) this.positions.put (i, p =  new swingjs.JSPosition (offs));
return p;
}, "~N");
Clazz.overrideMethod (c$, "getDefaultRootElement", 
function () {
return this.root;
});
Clazz.overrideMethod (c$, "render", 
function (r) {
}, "Runnable");
Clazz.defineStatics (c$,
"tabSizeAttribute", "tabSize",
"lineLimitAttribute", "lineLimit");
});
