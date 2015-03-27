Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.FieldPosition", "jsjava.text.Format.FieldDelegate"], "jsjava.text.DontCareFieldPosition", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.noDelegate = null;
Clazz.instantialize (this, arguments);
}, jsjava.text, "DontCareFieldPosition", jsjava.text.FieldPosition);
Clazz.prepareFields (c$, function () {
this.noDelegate = ((Clazz.isClassDefined ("jsjava.text.DontCareFieldPosition$1") ? 0 : jsjava.text.DontCareFieldPosition.$DontCareFieldPosition$1$ ()), Clazz.innerTypeInstance (jsjava.text.DontCareFieldPosition$1, this, null));
});
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jsjava.text.DontCareFieldPosition, [0]);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getFieldDelegate", 
function () {
return this.noDelegate;
});
c$.$DontCareFieldPosition$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjava.text, "DontCareFieldPosition$1", null, jsjava.text.Format.FieldDelegate);
Clazz.defineMethod (c$, "formatted", 
function (attr, value, start, end, buffer) {
}, "jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "formatted", 
function (fieldID, attr, value, start, end, buffer) {
}, "~N,jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
c$ = Clazz.p0p ();
};
c$.INSTANCE = c$.prototype.INSTANCE =  new jsjava.text.DontCareFieldPosition ();
});
