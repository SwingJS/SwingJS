Clazz.load(["java.io.Reader"],"java.io.StringReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException"],function(){
c$=Clazz.decorateAsClass(function(){
this.str=null;
this.markpos=-1;
this.pos=0;
this.count=0;
Clazz.instantialize(this,arguments);
},java.io,"StringReader",java.io.Reader);
Clazz.makeConstructor(c$,
function(str){
Clazz.superConstructor(this,java.io.StringReader,[str]);
this.str=str;
this.count=str.length;
},"~S");
Clazz.overrideMethod(c$,"close",
function(){
{
if(this.isOpen()){
this.str=null;
}}});
Clazz.defineMethod(c$,"isOpen",
($fz=function(){
return this.str!=null;
},$fz.isPrivate=true,$fz));
Clazz.overrideMethod(c$,"mark",
function(readLimit){
if(readLimit>=0){
{
if(this.isOpen()){
this.markpos=this.pos;
}else{
throw new java.io.IOException(("K0083"));
}}}else{
throw new IllegalArgumentException();
}},"~N");
Clazz.overrideMethod(c$,"markSupported",
function(){
return true;
});
Clazz.defineMethod(c$,"read",
function(){
{
if(this.isOpen()){
if(this.pos!=this.count){
return this.str.charAt(this.pos++);
}return-1;
}throw new java.io.IOException(("K0083"));
}});
Clazz.defineMethod(c$,"read",
function(buf,offset,len){
if(0<=offset&&offset<=buf.length&&0<=len&&len<=buf.length-offset){
{
if(this.isOpen()){
if(this.pos==this.count){
return-1;
}var end=this.pos+len>this.count?this.count:this.pos+len;
this.str.getChars(this.pos,end,buf,offset);
var read=end-this.pos;
this.pos=end;
return read;
}throw new java.io.IOException(("K0083"));
}}throw new ArrayIndexOutOfBoundsException();
},"~A,~N,~N");
Clazz.overrideMethod(c$,"ready",
function(){
{
if(this.isOpen()){
return true;
}throw new java.io.IOException(("K0083"));
}});
Clazz.overrideMethod(c$,"reset",
function(){
{
if(this.isOpen()){
this.pos=this.markpos!=-1?this.markpos:0;
}else{
throw new java.io.IOException(("K0083"));
}}});
Clazz.overrideMethod(c$,"skip",
function(ns){
{
if(this.isOpen()){
if(ns<=0){
return 0;
}var skipped=0;
if(ns<this.count-this.pos){
this.pos=this.pos+ns;
skipped=ns;
}else{
skipped=this.count-this.pos;
this.pos=this.count;
}return skipped;
}throw new java.io.IOException(("K0083"));
}},"~N");
});
