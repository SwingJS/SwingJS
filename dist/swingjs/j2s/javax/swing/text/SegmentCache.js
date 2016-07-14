Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.Segment"], "javax.swing.text.SegmentCache", ["JU.Lst"], function () {
c$ = Clazz.decorateAsClass (function () {
this.segments = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "SegmentCache");
c$.getSharedInstance = Clazz.defineMethod (c$, "getSharedInstance", 
function () {
return javax.swing.text.SegmentCache.sharedCache;
});
c$.getSharedSegment = Clazz.defineMethod (c$, "getSharedSegment", 
function () {
return javax.swing.text.SegmentCache.getSharedInstance ().getSegment ();
});
c$.releaseSharedSegment = Clazz.defineMethod (c$, "releaseSharedSegment", 
function (segment) {
javax.swing.text.SegmentCache.getSharedInstance ().releaseSegment (segment);
}, "javax.swing.text.Segment");
Clazz.makeConstructor (c$, 
function () {
this.segments =  new JU.Lst ();
});
Clazz.defineMethod (c$, "getSegment", 
function () {
{
var size = this.segments.size ();
if (size > 0) {
return this.segments.removeItemAt (size - 1);
}}return  new javax.swing.text.SegmentCache.CachedSegment ();
});
Clazz.defineMethod (c$, "releaseSegment", 
function (segment) {
if (Clazz.instanceOf (segment, javax.swing.text.SegmentCache.CachedSegment)) {
{
segment.array = null;
segment.count = 0;
this.segments.add (segment);
}}}, "javax.swing.text.Segment");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.SegmentCache, "CachedSegment", javax.swing.text.Segment);
c$ = Clazz.p0p ();
c$.sharedCache = c$.prototype.sharedCache =  new javax.swing.text.SegmentCache ();
});
