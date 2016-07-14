Clazz.declarePackage ("sun.util.resources");
Clazz.load (["sun.util.resources.OpenListResourceBundle"], "sun.util.resources.TimeZoneNamesBundle", ["java.util.LinkedHashMap"], function () {
c$ = Clazz.declareType (sun.util.resources, "TimeZoneNamesBundle", sun.util.resources.OpenListResourceBundle);
Clazz.defineMethod (c$, "handleGetObject", 
function (key) {
var contents = Clazz.superCall (this, sun.util.resources.TimeZoneNamesBundle, "handleGetObject", [key]);
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
