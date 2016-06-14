Clazz.declarePackage ("jssun.util.resources");
Clazz.load (["jssun.util.resources.OpenListResourceBundle"], "jssun.util.resources.TimeZoneNamesBundle", ["java.util.LinkedHashMap"], function () {
c$ = Clazz.declareType (jssun.util.resources, "TimeZoneNamesBundle", jssun.util.resources.OpenListResourceBundle);
Clazz.defineMethod (c$, "handleGetObject", 
function (key) {
var contents = Clazz.superCall (this, jssun.util.resources.TimeZoneNamesBundle, "handleGetObject", [key]);
if (contents == null) {
return null;
}var clen = contents.length;
var tmpobj =  new Array (clen + 1);
tmpobj[0] = key;
for (var i = 0; i < clen; i++) {
tmpobj[i + 1] = contents[i];
}
return tmpobj;
}, "~S");
Clazz.overrideMethod (c$, "createMap", 
function (size) {
return  new java.util.LinkedHashMap (size);
}, "~N");
});
