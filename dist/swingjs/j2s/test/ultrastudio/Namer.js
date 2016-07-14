Clazz.declarePackage ("test.ultrastudio");
c$ = Clazz.declareType (test.ultrastudio, "Namer");
c$.name = Clazz.defineMethod (c$, "name", 
function (n) {
var d = Clazz.doubleToInt (n * 10);
switch (d) {
case 10:
return "air";
case 13:
return "ice";
case 14:
return "teflon";
case 15:
return "salt";
case 16:
case 17:
return "glass";
case 18:
return "sapphire";
case 24:
return "diamond";
default:
return "";
}
}, "~N");
