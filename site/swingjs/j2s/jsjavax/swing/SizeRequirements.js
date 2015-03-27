Clazz.declarePackage ("jsjavax.swing");
c$ = Clazz.decorateAsClass (function () {
this.minimum = 0;
this.preferred = 0;
this.maximum = 0;
this.alignment = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "SizeRequirements");
Clazz.makeConstructor (c$, 
function () {
this.minimum = 0;
this.preferred = 0;
this.maximum = 0;
this.alignment = 0.5;
});
Clazz.makeConstructor (c$, 
function (min, pref, max, a) {
this.minimum = min;
this.preferred = pref;
this.maximum = max;
this.alignment = a > 1.0 ? 1.0 : a < 0.0 ? 0.0 : a;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.minimum + "," + this.preferred + "," + this.maximum + "]@" + this.alignment;
});
c$.getTiledSizeRequirements = Clazz.defineMethod (c$, "getTiledSizeRequirements", 
function (children) {
var total =  new jsjavax.swing.SizeRequirements ();
for (var i = 0; i < children.length; i++) {
var req = children[i];
total.minimum = Math.min (total.minimum + req.minimum, 2147483647);
total.preferred = Math.min (total.preferred + req.preferred, 2147483647);
total.maximum = Math.min (total.maximum + req.maximum, 2147483647);
}
return total;
}, "~A");
c$.getAlignedSizeRequirements = Clazz.defineMethod (c$, "getAlignedSizeRequirements", 
function (children) {
var totalAscent =  new jsjavax.swing.SizeRequirements ();
var totalDescent =  new jsjavax.swing.SizeRequirements ();
for (var i = 0; i < children.length; i++) {
var req = children[i];
var ascent = Clazz.floatToInt (req.alignment * req.minimum);
var descent = req.minimum - ascent;
totalAscent.minimum = Math.max (ascent, totalAscent.minimum);
totalDescent.minimum = Math.max (descent, totalDescent.minimum);
ascent = Clazz.floatToInt (req.alignment * req.preferred);
descent = req.preferred - ascent;
totalAscent.preferred = Math.max (ascent, totalAscent.preferred);
totalDescent.preferred = Math.max (descent, totalDescent.preferred);
ascent = Clazz.floatToInt (req.alignment * req.maximum);
descent = req.maximum - ascent;
totalAscent.maximum = Math.max (ascent, totalAscent.maximum);
totalDescent.maximum = Math.max (descent, totalDescent.maximum);
}
var min = Math.min (totalAscent.minimum + totalDescent.minimum, 2147483647);
var pref = Math.min (totalAscent.preferred + totalDescent.preferred, 2147483647);
var max = Math.min (totalAscent.maximum + totalDescent.maximum, 2147483647);
var alignment = 0.0;
if (min > 0) {
alignment = totalAscent.minimum / min;
alignment = alignment > 1.0 ? 1.0 : alignment < 0.0 ? 0.0 : alignment;
}return  new jsjavax.swing.SizeRequirements (min, pref, max, alignment);
}, "~A");
c$.calculateTiledPositions = Clazz.defineMethod (c$, "calculateTiledPositions", 
function (allocated, total, children, offsets, spans) {
jsjavax.swing.SizeRequirements.calculateTiledPositions (allocated, total, children, offsets, spans, true);
}, "~N,jsjavax.swing.SizeRequirements,~A,~A,~A");
c$.calculateTiledPositions = Clazz.defineMethod (c$, "calculateTiledPositions", 
function (allocated, total, children, offsets, spans, forward) {
var min = 0;
var pref = 0;
var max = 0;
for (var i = 0; i < children.length; i++) {
min += children[i].minimum;
pref += children[i].preferred;
max += children[i].maximum;
}
if (allocated >= pref) {
jsjavax.swing.SizeRequirements.expandedTile (allocated, min, pref, max, children, offsets, spans, forward);
} else {
jsjavax.swing.SizeRequirements.compressedTile (allocated, min, pref, max, children, offsets, spans, forward);
}}, "~N,jsjavax.swing.SizeRequirements,~A,~A,~A,~B");
c$.compressedTile = Clazz.defineMethod (c$, "compressedTile", 
($fz = function (allocated, min, pref, max, request, offsets, spans, forward) {
var totalPlay = Math.min (pref - allocated, pref - min);
var factor = (pref - min == 0) ? 0.0 : totalPlay / (pref - min);
var totalOffset;
if (forward) {
totalOffset = 0;
for (var i = 0; i < spans.length; i++) {
offsets[i] = totalOffset;
var req = request[i];
var play = factor * (req.preferred - req.minimum);
spans[i] = Clazz.floatToInt (req.preferred - play);
totalOffset = Math.min (totalOffset + spans[i], 2147483647);
}
} else {
totalOffset = allocated;
for (var i = 0; i < spans.length; i++) {
var req = request[i];
var play = factor * (req.preferred - req.minimum);
spans[i] = Clazz.floatToInt (req.preferred - play);
offsets[i] = totalOffset - spans[i];
totalOffset = Math.max (totalOffset - spans[i], 0);
}
}}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~A,~A,~A,~B");
c$.expandedTile = Clazz.defineMethod (c$, "expandedTile", 
($fz = function (allocated, min, pref, max, request, offsets, spans, forward) {
var totalPlay = Math.min (allocated - pref, max - pref);
var factor = (max - pref == 0) ? 0.0 : totalPlay / (max - pref);
var totalOffset;
if (forward) {
totalOffset = 0;
for (var i = 0; i < spans.length; i++) {
offsets[i] = totalOffset;
var req = request[i];
var play = Clazz.floatToInt (factor * (req.maximum - req.preferred));
spans[i] = Math.min (req.preferred + play, 2147483647);
totalOffset = Math.min (totalOffset + spans[i], 2147483647);
}
} else {
totalOffset = allocated;
for (var i = 0; i < spans.length; i++) {
var req = request[i];
var play = Clazz.floatToInt (factor * (req.maximum - req.preferred));
spans[i] = Math.min (req.preferred + play, 2147483647);
offsets[i] = totalOffset - spans[i];
totalOffset = Math.max (totalOffset - spans[i], 0);
}
}}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~A,~A,~A,~B");
c$.calculateAlignedPositions = Clazz.defineMethod (c$, "calculateAlignedPositions", 
function (allocated, total, children, offsets, spans) {
jsjavax.swing.SizeRequirements.calculateAlignedPositions (allocated, total, children, offsets, spans, true);
}, "~N,jsjavax.swing.SizeRequirements,~A,~A,~A");
c$.calculateAlignedPositions = Clazz.defineMethod (c$, "calculateAlignedPositions", 
function (allocated, total, children, offsets, spans, normal) {
var totalAlignment = normal ? total.alignment : 1.0 - total.alignment;
var totalAscent = Clazz.floatToInt (allocated * totalAlignment);
var totalDescent = allocated - totalAscent;
for (var i = 0; i < children.length; i++) {
var req = children[i];
var alignment = normal ? req.alignment : 1.0 - req.alignment;
var maxAscent = Clazz.floatToInt (req.maximum * alignment);
var maxDescent = req.maximum - maxAscent;
var ascent = Math.min (totalAscent, maxAscent);
var descent = Math.min (totalDescent, maxDescent);
offsets[i] = totalAscent - ascent;
spans[i] = Math.min (ascent + descent, 2147483647);
}
}, "~N,jsjavax.swing.SizeRequirements,~A,~A,~A,~B");
c$.adjustSizes = Clazz.defineMethod (c$, "adjustSizes", 
function (delta, children) {
return  Clazz.newIntArray (0, 0);
}, "~N,~A");
