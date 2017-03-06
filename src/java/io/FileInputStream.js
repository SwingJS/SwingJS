//BH 7/20/2016 4:35:45 PM added to SwingJS; single read(byte[],int,int)

Clazz.load(["java.io.Closeable","$.InputStream"],"java.io.FileInputStream",["java.lang.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.fd=null;
this.innerFD=false;
Clazz.instantialize(this,arguments);
},java.io,"FileInputStream",java.io.InputStream,java.io.Closeable);
Clazz.makeConstructor(c$,
function(file){
Clazz.superConstructor(this,java.io.FileInputStream);
},"java.io.File");
Clazz.makeConstructor(c$,
function(fd){
Clazz.superConstructor(this,java.io.FileInputStream);
if(fd==null){
throw new NullPointerException();
}},"java.io.FileDescriptor");
Clazz.makeConstructor(c$,
function(fileName){
this.construct(null==fileName?null:null);
},"~S");
Clazz.overrideMethod(c$,"available",
function(){
return 0;
});
Clazz.overrideMethod(c$,"close",
function(){
if(this.fd==null){
return;
}});
Clazz.overrideMethod(c$,"finalize",
function(){
this.close();
});
Clazz.defineMethod(c$,"getFD",
function(){
return this.fd;
});
Clazz.defineMethod(c$,"readByteAsInt",
function(){
var readed=Clazz.newArray(1,0);
var result=this.read(readed,0,1);
return result==-1?-1:readed[0]&0xff;
});
Clazz.defineMethod(c$,"readB",
function(buffer){
return this.read(buffer,0,buffer.length);
},"~A");
Clazz.defineMethod(c$,"read",
function(buffer,offset,count){
switch (arguments.length) {
case 0:
 return this.readByteAsInt();
case 1:
  offset = 0;
  count = buffer.length;
}

if(count>buffer.length-offset||count<0||offset<0){
throw new IndexOutOfBoundsException();
}if(0==count){
return 0;
}return 0;
},"~A,~N,~N");
Clazz.overrideMethod(c$,"skip",
function(count){
return 0;
},"~N");
});
