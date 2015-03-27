Clazz.declarePackage ("jsjava.awt.image");
Clazz.load (null, "jsjava.awt.image.DataBuffer", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataType = 0;
this.banks = 0;
this.offset = 0;
this.size = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.image, "DataBuffer");
c$.getDataTypeSize = Clazz.defineMethod (c$, "getDataTypeSize", 
function (type) {
if (type < 0 || type > 5) {
throw  new IllegalArgumentException ("Unknown data type " + type);
}return jsjava.awt.image.DataBuffer.dataTypeSize[type];
}, "~N");
Clazz.defineStatics (c$,
"TYPE_BYTE", 0,
"TYPE_USHORT", 1,
"TYPE_SHORT", 2,
"TYPE_INT", 3,
"TYPE_FLOAT", 4,
"TYPE_DOUBLE", 5,
"TYPE_UNDEFINED", 32,
"dataTypeSize",  Clazz.newIntArray (-1, [8, 16, 16, 32, 32, 64]));
});
