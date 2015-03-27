Clazz.declarePackage ("jssun.misc");
Clazz.load (null, "jssun.misc.MessageUtils", ["java.lang.Character", "$.StringBuffer"], function () {
c$ = Clazz.declareType (jssun.misc, "MessageUtils");
Clazz.makeConstructor (c$, 
function () {
});
c$.subst = Clazz.defineMethod (c$, "subst", 
function (patt, arg) {
var args =  Clazz.newArray (-1, [arg]);
return jssun.misc.MessageUtils.subst (patt, args);
}, "~S,~S");
c$.subst = Clazz.defineMethod (c$, "subst", 
function (patt, arg1, arg2) {
var args =  Clazz.newArray (-1, [arg1, arg2]);
return jssun.misc.MessageUtils.subst (patt, args);
}, "~S,~S,~S");
c$.subst = Clazz.defineMethod (c$, "subst", 
function (patt, arg1, arg2, arg3) {
var args =  Clazz.newArray (-1, [arg1, arg2, arg3]);
return jssun.misc.MessageUtils.subst (patt, args);
}, "~S,~S,~S,~S");
c$.subst = Clazz.defineMethod (c$, "subst", 
function (patt, args) {
var result =  new StringBuffer ();
var len = patt.length;
for (var i = 0; i >= 0 && i < len; i++) {
var ch = patt.charAt (i);
if (ch == '%') {
if (i != len) {
var index = Character.digit (patt.charAt (i + 1), 10);
if (index == -1) {
result.append (patt.charAt (i + 1));
i++;
} else if (index < args.length) {
result.append (args[index]);
i++;
}}} else {
result.append (ch);
}}
return result.toString ();
}, "~S,~A");
c$.substProp = Clazz.defineMethod (c$, "substProp", 
function (propName, arg) {
return jssun.misc.MessageUtils.subst (System.getProperty (propName), arg);
}, "~S,~S");
c$.substProp = Clazz.defineMethod (c$, "substProp", 
function (propName, arg1, arg2) {
return jssun.misc.MessageUtils.subst (System.getProperty (propName), arg1, arg2);
}, "~S,~S,~S");
c$.substProp = Clazz.defineMethod (c$, "substProp", 
function (propName, arg1, arg2, arg3) {
return jssun.misc.MessageUtils.subst (System.getProperty (propName), arg1, arg2, arg3);
}, "~S,~S,~S,~S");
c$.toStderr = Clazz.defineMethod (c$, "toStderr", 
function (msg) {
{
System.out.println(msg);
}}, "~S");
c$.toStdout = Clazz.defineMethod (c$, "toStdout", 
function (msg) {
{
System.out.println(msg);
}}, "~S");
c$.err = Clazz.defineMethod (c$, "err", 
function (s) {
jssun.misc.MessageUtils.toStderr (s + "\n");
}, "~S");
c$.out = Clazz.defineMethod (c$, "out", 
function (s) {
jssun.misc.MessageUtils.toStdout (s + "\n");
}, "~S");
c$.where = Clazz.defineMethod (c$, "where", 
function () {
{
System.out.println(Clazz.getStackTrace());
}});
});
