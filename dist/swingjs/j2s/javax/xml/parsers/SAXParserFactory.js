Clazz.declarePackage ("javax.xml.parsers");
Clazz.load (null, "javax.xml.parsers.SAXParserFactory", ["java.lang.NullPointerException"], function () {
c$ = Clazz.declareType (javax.xml.parsers, "SAXParserFactory");
c$.newInstance = Clazz.defineMethod (c$, "newInstance", 
function () {
return  new javax.xml.parsers.SAXParserFactory ();
});
Clazz.defineMethod (c$, "newSAXParser", 
function () {
try {
return javax.xml.parsers.SAXParserFactory.makeParser ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
});
c$.makeParser = Clazz.defineMethod (c$, "makeParser", 
function () {
var className = System.getProperty ("org.xml.sax.parser", "swingjs.JSSAXParser");
if (className == null) {
throw  new NullPointerException ("No value for sax.parser property");
} else {
return javax.xml.parsers.SAXParserFactory.makeParser (className);
}});
c$.makeParser = Clazz.defineMethod (c$, "makeParser", 
function (className) {
return (Clazz._4Name (className).newInstance ());
}, "~S");
});
