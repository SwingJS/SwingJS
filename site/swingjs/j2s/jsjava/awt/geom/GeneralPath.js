Clazz.declarePackage ("jsjava.awt.geom");
Clazz.load (["jsjava.awt.geom.Path2D"], "jsjava.awt.geom.GeneralPath", null, function () {
c$ = Clazz.declareType (jsjava.awt.geom, "GeneralPath", jsjava.awt.geom.Path2D.Float);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjava.awt.geom.GeneralPath, [1, 20]);
});
Clazz.makeConstructor (c$, 
function (rule) {
Clazz.superConstructor (this, jsjava.awt.geom.GeneralPath, [rule, 20]);
}, "~N");
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, jsjava.awt.geom.GeneralPath, [s, null]);
}, "jsjava.awt.Shape");
Clazz.makeConstructor (c$, 
function (windingRule, pointTypes, numTypes, pointCoords, numCoords) {
Clazz.superConstructor (this, jsjava.awt.geom.GeneralPath, []);
this.windingRule = windingRule;
this.pointTypes = pointTypes;
this.numTypes = numTypes;
this.floatCoords = pointCoords;
this.numCoords = numCoords;
}, "~N,~A,~N,~A,~N");
});
