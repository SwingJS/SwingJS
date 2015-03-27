Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.Segment"], "jsjavax.swing.text.SegmentCache", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.segments = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "SegmentCache");
c$.getSharedInstance = Clazz.defineMethod (c$, "getSharedInstance", 
function () {
return jsjavax.swing.text.SegmentCache.sharedCache;
});
c$.getSharedSegment = Clazz.defineMethod (c$, "getSharedSegment", 
function () {
return jsjavax.swing.text.SegmentCache.getSharedInstance ().getSegment ();
});
c$.releaseSharedSegment = Clazz.defineMethod (c$, "releaseSharedSegment", 
function (segment) {
jsjavax.swing.text.SegmentCache.getSharedInstance ().releaseSegment (segment);
}, "jsjavax.swing.text.Segment");
Clazz.makeConstructor (c$, 
function () {
this.segments =  new java.util.ArrayList (11);
});
Clazz.defineMethod (c$, "getSegment", 
function () {
{
var size = this.segments.size ();
if (size > 0) {
return this.segments.remove (size - 1);
}}return  new jsjavax.swing.text.SegmentCache.CachedSegment ();
});
Clazz.defineMethod (c$, "releaseSegment", 
function (segment) {
if (Clazz.instanceOf (segment, jsjavax.swing.text.SegmentCache.CachedSegment)) {
{
segment.array = null;
segment.count = 0;
this.segments.add (segment);
}}}, "jsjavax.swing.text.Segment");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.SegmentCache, "CachedSegment", jsjavax.swing.text.Segment);
c$ = Clazz.p0p ();
c$.sharedCache = c$.prototype.sharedCache =  new jsjavax.swing.text.SegmentCache ();
});
