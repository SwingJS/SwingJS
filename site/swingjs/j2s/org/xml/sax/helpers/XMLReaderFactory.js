Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (null, "org.xml.sax.helpers.XMLReaderFactory", ["java.io.BufferedReader", "$.InputStreamReader", "java.lang.ClassLoader", "org.xml.sax.SAXException", "org.xml.sax.helpers.NewInstance", "$.ParserAdapter", "$.ParserFactory"], function () {
c$ = Clazz.declareType (org.xml.sax.helpers, "XMLReaderFactory");
c$.createXMLReader = Clazz.defineMethod (c$, "createXMLReader", 
function () {
var className = null;
var loader = org.xml.sax.helpers.NewInstance.getClassLoader ();
try {
className = System.getProperty ("org.xml.sax.driver");
} catch (e) {
if (Clazz.exceptionOf (e, RuntimeException)) {
} else {
throw e;
}
}
if (className == null) {
try {
var service = "META-INF/services/org.xml.sax.driver";
var $in;
var reader;
if (loader == null) $in = ClassLoader.getSystemResourceAsStream (service);
 else $in = loader.getResourceAsStream (service);
if ($in != null) {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF8"));
className = reader.readLine ();
$in.close ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}if (className == null) {
}if (className != null) return org.xml.sax.helpers.XMLReaderFactory.loadClass (loader, className);
try {
return  new org.xml.sax.helpers.ParserAdapter (org.xml.sax.helpers.ParserFactory.makeParser ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new org.xml.sax.SAXException ("Can\'t create default XMLReader; is system property org.xml.sax.driver set?");
} else {
throw e;
}
}
});
c$.createXMLReader = Clazz.defineMethod (c$, "createXMLReader", 
function (className) {
return org.xml.sax.helpers.XMLReaderFactory.loadClass (org.xml.sax.helpers.NewInstance.getClassLoader (), className);
}, "~S");
c$.loadClass = Clazz.defineMethod (c$, "loadClass", 
 function (loader, className) {
try {
return org.xml.sax.helpers.NewInstance.newInstance (loader, className);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e1 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX2 driver class " + className + " not found", e1);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e2 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX2 driver class " + className + " found but cannot be loaded", e2);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e3 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX2 driver class " + className + " loaded but cannot be instantiated (no empty public constructor?)", e3);
}
} else if (Clazz.exceptionOf (e$$, ClassCastException)) {
var e4 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX2 driver class " + className + " does not implement XMLReader", e4);
}
} else {
throw e$$;
}
}
}, "ClassLoader,~S");
Clazz.defineStatics (c$,
"property", "org.xml.sax.driver");
});
