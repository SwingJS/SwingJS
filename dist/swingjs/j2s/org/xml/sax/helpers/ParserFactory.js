Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (null, "org.xml.sax.helpers.ParserFactory", ["java.lang.NullPointerException", "org.xml.sax.helpers.NewInstance"], function () {
c$ = Clazz.declareType (org.xml.sax.helpers, "ParserFactory");
c$.makeParser = Clazz.defineMethod (c$, "makeParser", 
function () {
var className = System.getProperty ("org.xml.sax.parser");
if (className == null) {
throw  new NullPointerException ("No value for sax.parser property");
} else {
return org.xml.sax.helpers.ParserFactory.makeParser (className);
}});
c$.makeParser = Clazz.defineMethod (c$, "makeParser", 
function (className) {
return org.xml.sax.helpers.NewInstance.newInstance (org.xml.sax.helpers.NewInstance.getClassLoader (), className);
}, "~S");
});
