// BH re-ordered the enclosed classes so that they only refer to previous ones

Clazz_load(["java.util.AbstractList","$.AbstractMap","$.AbstractSet","$.Collection","$.Iterator","$.List","$.ListIterator","$.Map","$.RandomAccess","$.Set","$.SortedMap","$.SortedSet","java.lang.NullPointerException","$.UnsupportedOperationException","java.lang.reflect.Array"],"java.util.Collections",["java.lang.ArrayIndexOutOfBoundsException","$.ClassCastException","$.IllegalArgumentException","$.IndexOutOfBoundsException","java.util.ArrayList","$.Arrays","$.Enumeration","java.util.Map.Entry","java.util.NoSuchElementException","$.Random"],function(){
c$=Clazz_declareType(java.util,"Collections");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(list,object){
if(list==null){
throw new NullPointerException();
}if(list.isEmpty()){
return-1;
}var key=object;
if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var it=list.listIterator();
while(it.hasNext()){
var result;
if((result=key.compareTo(it.next()))<=0){
if(result==0){
return it.previousIndex();
}return-it.previousIndex()-1;
}}
return-list.size()-1;
}var low=0;
var mid=list.size();
var high=mid-1;
var result=-1;
while(low<=high){
mid=(low+high)>>1;
if((result=key.compareTo(list.get(mid)))>0){
low=mid+1;
}else if(result==0){
return mid;
}else{
high=mid-1;
}}
return-mid-(result<0?1:2);
},"java.util.List,~O");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(list,object,comparator){
if(comparator==null){
return java.util.Collections.binarySearch(list,object);
}if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var it=list.listIterator();
while(it.hasNext()){
var result;
if((result=comparator.compare(object,it.next()))<=0){
if(result==0){
return it.previousIndex();
}return-it.previousIndex()-1;
}}
return-list.size()-1;
}var low=0;
var mid=list.size();
var high=mid-1;
var result=-1;
while(low<=high){
mid=(low+high)>>1;
if((result=comparator.compare(object,list.get(mid)))>0){
low=mid+1;
}else if(result==0){
return mid;
}else{
high=mid-1;
}}
return-mid-(result<0?1:2);
},"java.util.List,~O,java.util.Comparator");
c$.copy=Clazz_defineMethod(c$,"copy",
function(destination,source){
if(destination.size()<source.size()){
throw new ArrayIndexOutOfBoundsException();
}var srcIt=source.iterator();
var destIt=destination.listIterator();
while(srcIt.hasNext()){
try{
destIt.next();
}catch(e){
if(Clazz_instanceOf(e,java.util.NoSuchElementException)){
throw new ArrayIndexOutOfBoundsException();
}else{
throw e;
}
}
destIt.set(srcIt.next());
}
},"java.util.List,java.util.List");
c$.enumeration=Clazz_defineMethod(c$,"enumeration",
function(collection){
var c=collection;

if (!Clazz_isClassDefined("java.util.Collections$1"))
	java.util.Collections.$Collections$1$(c);

var x = Clazz_innerTypeInstance(java.util.Collections$1,this,null);

return x;
},"java.util.Collection");

c$.fill=Clazz_defineMethod(c$,"fill",
function(list,object){
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(object);
}
},"java.util.List,~O");
c$.max=Clazz_defineMethod(c$,"max",
function(collection){
var it=collection.iterator();
var max=it.next();
while(it.hasNext()){
var next=it.next();
if(max.compareTo(next)<0){
max=next;
}}
return max;
},"java.util.Collection");
c$.max=Clazz_defineMethod(c$,"max",
function(collection,comparator){
var it=collection.iterator();
var max=it.next();
while(it.hasNext()){
var next=it.next();
if(comparator.compare(max,next)<0){
max=next;
}}
return max;
},"java.util.Collection,java.util.Comparator");
c$.min=Clazz_defineMethod(c$,"min",
function(collection){
var it=collection.iterator();
var min=it.next();
while(it.hasNext()){
var next=it.next();
if(min.compareTo(next)>0){
min=next;
}}
return min;
},"java.util.Collection");
c$.min=Clazz_defineMethod(c$,"min",
function(collection,comparator){
var it=collection.iterator();
var min=it.next();
while(it.hasNext()){
var next=it.next();
if(comparator.compare(min,next)>0){
min=next;
}}
return min;
},"java.util.Collection,java.util.Comparator");
c$.nCopies=Clazz_defineMethod(c$,"nCopies",
function(length,object){
return new java.util.Collections.CopiesList(length,object);
},"~N,~O");
c$.reverse=Clazz_defineMethod(c$,"reverse",
function(list){
var size=list.size();
var front=list.listIterator();
var back=list.listIterator(size);
for(var i=0;i<Math.floor(size/2);i++){
var frontNext=front.next();
var backPrev=back.previous();
front.set(backPrev);
back.set(frontNext);
}
},"java.util.List");
c$.reverseOrder=Clazz_defineMethod(c$,"reverseOrder",
function(){
return new java.util.Collections.ReverseComparator();
});
c$.reverseOrder=Clazz_defineMethod(c$,"reverseOrder",
function(c){
if(c==null){
return java.util.Collections.reverseOrder();
}return new java.util.Collections.ReverseComparatorWithComparator(c);
},"java.util.Comparator");
c$.shuffle=Clazz_defineMethod(c$,"shuffle",
function(list){
java.util.Collections.shuffle(list,new java.util.Random());
},"java.util.List");
c$.shuffle=Clazz_defineMethod(c$,"shuffle",
function(list,random){
if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var array=list.toArray();
for(var i=array.length-1;i>0;i--){
var index=random.nextInt()%(i+1);
if(index<0){
index=-index;
}var temp=array[i];
array[i]=array[index];
array[index]=temp;
}
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
}else{
var rawList=list;
for(var i=rawList.size()-1;i>0;i--){
var index=random.nextInt()%(i+1);
if(index<0){
index=-index;
}rawList.set(index,rawList.set(i,rawList.get(index)));
}
}},"java.util.List,java.util.Random");
c$.singleton=Clazz_defineMethod(c$,"singleton",
function(object){
return new java.util.Collections.SingletonSet(object);
},"~O");
c$.singletonList=Clazz_defineMethod(c$,"singletonList",
function(object){
return new java.util.Collections.SingletonList(object);
},"~O");
c$.singletonMap=Clazz_defineMethod(c$,"singletonMap",
function(key,value){
return new java.util.Collections.SingletonMap(key,value);
},"~O,~O");
c$.sort=Clazz_defineMethod(c$,"sort",
function(list){
var array=list.toArray();
java.util.Arrays.sort(array);
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
},"java.util.List");
c$.sort=Clazz_defineMethod(c$,"sort",
function(list,comparator){
var array=list.toArray(new Array(list.size()));
java.util.Arrays.sort(array,comparator);
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
},"java.util.List,java.util.Comparator");
c$.swap=Clazz_defineMethod(c$,"swap",
function(list,index1,index2){
if(list==null){
throw new NullPointerException();
}if(index1==index2){
return;
}var rawList=list;
rawList.set(index2,rawList.set(index1,rawList.get(index2)));
},"java.util.List,~N,~N");
c$.replaceAll=Clazz_defineMethod(c$,"replaceAll",
function(list,obj,obj2){
var index;
var found=false;
while((index=list.indexOf(obj))>-1){
found=true;
list.set(index,obj2);
}
return found;
},"java.util.List,~O,~O");
c$.rotate=Clazz_defineMethod(c$,"rotate",
function(lst,dist){
var list=lst;
var size=list.size();
if(size==0){
return;
}var normdist;
if(dist>0){
normdist=dist%size;
}else{
normdist=size-((dist%size)*(-1));
}if(normdist==0||normdist==size){
return;
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
var temp=list.get(0);
var index=0;
var beginIndex=0;
for(var i=0;i<size;i++){
index=(index+normdist)%size;
temp=list.set(index,temp);
if(index==beginIndex){
index=++beginIndex;
temp=list.get(beginIndex);
}}
}else{
var divideIndex=(size-normdist)%size;
var sublist1=list.subList(0,divideIndex);
var sublist2=list.subList(divideIndex,size);
java.util.Collections.reverse(sublist1);
java.util.Collections.reverse(sublist2);
java.util.Collections.reverse(list);
}},"java.util.List,~N");
c$.indexOfSubList=Clazz_defineMethod(c$,"indexOfSubList",
function(list,sublist){
var size=list.size();
var sublistSize=sublist.size();
if(sublistSize>size){
return-1;
}if(sublistSize==0){
return 0;
}var firstObj=sublist.get(0);
var index=list.indexOf(firstObj);
if(index==-1){
return-1;
}while(index<size&&(size-index>=sublistSize)){
var listIt=list.listIterator(index);
if((firstObj==null)?listIt.next()==null:firstObj.equals(listIt.next())){
var sublistIt=sublist.listIterator(1);
var difFound=false;
while(sublistIt.hasNext()){
var element=sublistIt.next();
if(!listIt.hasNext()){
return-1;
}if((element==null)?listIt.next()!=null:!element.equals(listIt.next())){
difFound=true;
break;
}}
if(!difFound){
return index;
}}index++;
}
return-1;
},"java.util.List,java.util.List");
c$.lastIndexOfSubList=Clazz_defineMethod(c$,"lastIndexOfSubList",
function(list,sublist){
var sublistSize=sublist.size();
var size=list.size();
if(sublistSize>size){
return-1;
}if(sublistSize==0){
return size;
}var lastObj=sublist.get(sublistSize-1);
var index=list.lastIndexOf(lastObj);
while((index>-1)&&(index+1>=sublistSize)){
var listIt=list.listIterator(index+1);
if((lastObj==null)?listIt.previous()==null:lastObj.equals(listIt.previous())){
var sublistIt=sublist.listIterator(sublistSize-1);
var difFound=false;
while(sublistIt.hasPrevious()){
var element=sublistIt.previous();
if(!listIt.hasPrevious()){
return-1;
}if((element==null)?listIt.previous()!=null:!element.equals(listIt.previous())){
difFound=true;
break;
}}
if(!difFound){
return listIt.nextIndex();
}}index--;
}
return-1;
},"java.util.List,java.util.List");
c$.list=Clazz_defineMethod(c$,"list",
function(enumeration){
var list=new java.util.ArrayList();
while(enumeration.hasMoreElements()){
list.add(enumeration.nextElement());
}
return list;
},"java.util.Enumeration");
c$.synchronizedCollection=Clazz_defineMethod(c$,"synchronizedCollection",
function(collection){
if(collection==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedCollection(collection);
},"java.util.Collection");
c$.synchronizedList=Clazz_defineMethod(c$,"synchronizedList",
function(list){
if(list==null){
throw new NullPointerException();
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.SynchronizedRandomAccessList(list);
}return new java.util.Collections.SynchronizedList(list);
},"java.util.List");
c$.synchronizedMap=Clazz_defineMethod(c$,"synchronizedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedMap(map);
},"java.util.Map");
c$.synchronizedSet=Clazz_defineMethod(c$,"synchronizedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSet(set);
},"java.util.Set");
c$.synchronizedSortedMap=Clazz_defineMethod(c$,"synchronizedSortedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSortedMap(map);
},"java.util.SortedMap");
c$.synchronizedSortedSet=Clazz_defineMethod(c$,"synchronizedSortedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSortedSet(set);
},"java.util.SortedSet");
c$.unmodifiableCollection=Clazz_defineMethod(c$,"unmodifiableCollection",
function(collection){
if(collection==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableCollection(collection);
},"java.util.Collection");
c$.unmodifiableList=Clazz_defineMethod(c$,"unmodifiableList",
function(list){
if(list==null){
throw new NullPointerException();
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.UnmodifiableRandomAccessList(list);
}return new java.util.Collections.UnmodifiableList(list);
},"java.util.List");
c$.unmodifiableMap=Clazz_defineMethod(c$,"unmodifiableMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableMap(map);
},"java.util.Map");
c$.unmodifiableSet=Clazz_defineMethod(c$,"unmodifiableSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSet(set);
},"java.util.Set");
c$.unmodifiableSortedMap=Clazz_defineMethod(c$,"unmodifiableSortedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSortedMap(map);
},"java.util.SortedMap");
c$.unmodifiableSortedSet=Clazz_defineMethod(c$,"unmodifiableSortedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSortedSet(set);
},"java.util.SortedSet");
c$.frequency=Clazz_defineMethod(c$,"frequency",
function(c,o){
if(c==null){
throw new NullPointerException();
}if(c.isEmpty()){
return 0;
}
var result=0;
var itr=c.iterator();
while(itr.hasNext()){
var e=itr.next();
if(o==null?e==null:o.equals(e)){
result++;
}}
return result;
},"java.util.Collection,~O");

c$.emptyList=Clazz_defineMethod(c$,"emptyList",
function(){
return java.util.Collections.EMPTY_LIST;
});
c$.emptySet=Clazz_defineMethod(c$,"emptySet",
function(){
return java.util.Collections.EMPTY_SET;
});
c$.emptyMap=Clazz_defineMethod(c$,"emptyMap",
function(){
return java.util.Collections.EMPTY_MAP;
});
c$.checkedCollection=Clazz_defineMethod(c$,"checkedCollection",
function(c,type){
return new java.util.Collections.CheckedCollection(c,type);
},"java.util.Collection,Class");
c$.checkedMap=Clazz_defineMethod(c$,"checkedMap",
function(m,keyType,valueType){
return new java.util.Collections.CheckedMap(m,keyType,valueType);
},"java.util.Map,Class,Class");
c$.checkedList=Clazz_defineMethod(c$,"checkedList",
function(list,type){
if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.CheckedRandomAccessList(list,type);
}return new java.util.Collections.CheckedList(list,type);
},"java.util.List,Class");
c$.checkedSet=Clazz_defineMethod(c$,"checkedSet",
function(s,type){
return new java.util.Collections.CheckedSet(s,type);
},"java.util.Set,Class");
c$.checkedSortedMap=Clazz_defineMethod(c$,"checkedSortedMap",
function(m,keyType,valueType){
return new java.util.Collections.CheckedSortedMap(m,keyType,valueType);
},"java.util.SortedMap,Class,Class");
c$.checkedSortedSet=Clazz_defineMethod(c$,"checkedSortedSet",
function(s,type){
return new java.util.Collections.CheckedSortedSet(s,type);
},"java.util.SortedSet,Class");
c$.addAll=Clazz_defineMethod(c$,"addAll",
function(c,a){
var modified=false;
for(var i=0;i<a.length;i++){
modified=new Boolean(modified|c.add(a[i])).valueOf();
}
return modified;
},"java.util.Collection,~A");
c$.disjoint=Clazz_defineMethod(c$,"disjoint",
function(c1,c2){
if((Clazz_instanceOf(c1,java.util.Set))&&!(Clazz_instanceOf(c2,java.util.Set))||(c2.size())>c1.size()){
var tmp=c1;
c1=c2;
c2=tmp;
}var it=c1.iterator();
while(it.hasNext()){
if(c2.contains(it.next())){
return false;
}}
return true;
},"java.util.Collection,java.util.Collection");
c$.checkType=Clazz_defineMethod(c$,"checkType",
function(obj,type){
if(!type.isInstance(obj)){
throw new ClassCastException("Attempt to insert "+obj.getClass()+" element into collection with element type "+type);
}return obj;
},"~O,Class");

c$.$Collections$1$=function(c){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.it=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$1",null,java.util.Enumeration);

Clazz_prepareFields(c$,function(){
this.it=c.iterator();
});

Clazz_defineMethod(c$,"hasMoreElements",
function(){
return this.it.hasNext();
});
Clazz_defineMethod(c$,"nextElement",
function(){
return this.it.next();
});
c$=Clazz_p0p();
};

Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.n=0;
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CopiesList",java.util.AbstractList,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CopiesList,[]);
if(a<0){
throw new IllegalArgumentException();
}this.n=a;
this.element=b;
},"~N,~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.n;
});
Clazz_overrideMethod(c$,"get",
function(a){
if(0<=a&&a<this.n){
return this.element;
}throw new IndexOutOfBoundsException();
},"~N");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptyList",java.util.AbstractList,java.io.Serializable);
Clazz_overrideMethod(c$,"contains",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 0;
});
Clazz_overrideMethod(c$,"get",
function(a){
throw new IndexOutOfBoundsException();
},"~N");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptySet",java.util.AbstractSet,java.io.Serializable);
Clazz_overrideMethod(c$,"contains",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 0;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$EmptySet$1")?0:java.util.Collections.EmptySet.$Collections$EmptySet$1$()),Clazz_innerTypeInstance(java.util.Collections$EmptySet$1,this,null));
});
c$.$Collections$EmptySet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$EmptySet$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return false;
});
Clazz_overrideMethod(c$,"next",
function(){
throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptyMap",java.util.AbstractMap,java.io.Serializable);
Clazz_overrideMethod(c$,"containsKey",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"entrySet",
function(){
return java.util.Collections.EMPTY_SET;
});
Clazz_overrideMethod(c$,"get",
function(a){
return null;
},"~O");
Clazz_overrideMethod(c$,"keySet",
function(){
return java.util.Collections.EMPTY_SET;
});
Clazz_overrideMethod(c$,"values",
function(){
return java.util.Collections.EMPTY_LIST;
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"ReverseComparator",null,[java.util.Comparator,java.io.Serializable]);
Clazz_overrideMethod(c$,"compare",
function(a,b){
var c=b;
return c.compareTo(a);
},"~O,~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.comparator=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"ReverseComparatorWithComparator",null,[java.util.Comparator,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.comparator=a;
},"java.util.Comparator");
Clazz_defineMethod(c$,"compare",
function(a,b){
return this.comparator.compare(b,a);
},"~O,~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonSet",java.util.AbstractSet,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SingletonSet,[]);
this.element=a;
},"~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonSet$1")?0:java.util.Collections.SingletonSet.$Collections$SingletonSet$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonSet$1,this,null));
});
c$.$Collections$SingletonSet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.$hasNext=true;
Clazz_instantialize(this,arguments);
},java.util,"Collections$SingletonSet$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.$hasNext){
this.$hasNext=false;
return this.b$["java.util.Collections.SingletonSet"].element;
}throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonList",java.util.AbstractList,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SingletonList,[]);
this.element=a;
},"~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"get",
function(a){
if(a==0){
return this.element;
}throw new IndexOutOfBoundsException();
},"~N");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.k=null;
this.v=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonMap",java.util.AbstractMap,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SingletonMap,[]);
this.k=a;
this.v=b;
},"~O,~O");
Clazz_overrideMethod(c$,"containsKey",
function(a){
return this.k==null?a==null:this.k.equals(a);
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(a){
return this.v==null?a==null:this.v.equals(a);
},"~O");
Clazz_overrideMethod(c$,"get",
function(a){
if(this.containsKey(a)){
return this.v;
}return null;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"entrySet",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1")?0:java.util.Collections.SingletonMap.$Collections$SingletonMap$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1,this,null));
});
c$.$Collections$SingletonMap$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$SingletonMap$1",java.util.AbstractSet);
Clazz_overrideMethod(c$,"contains",
function(a){
if(Clazz_instanceOf(a,java.util.Map.Entry)){
var b=a;
return this.b$["java.util.Collections.SingletonMap"].containsKey(b.getKey())&&this.b$["java.util.Collections.SingletonMap"].containsValue(b.getValue());
}return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1")?0:java.util.Collections.$Collections$SingletonMap$1$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1,this,null));
});
c$=Clazz_p0p();
};
c$.$Collections$SingletonMap$1$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.$hasNext=true;
Clazz_instantialize(this,arguments);
},java.util,"Collections$SingletonMap$1$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.$hasNext){
this.$hasNext=false;
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1$1")?0:java.util.Collections.$Collections$SingletonMap$1$1$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1$1,this,null));
}throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$.$Collections$SingletonMap$1$1$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$SingletonMap$1$1$1",null,java.util.Map.Entry);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.b$["java.util.Collections$SingletonMap$1"].contains(a);
},"~O");
Clazz_overrideMethod(c$,"getKey",
function(){
return this.b$["java.util.Collections.SingletonMap"].k;
});
Clazz_overrideMethod(c$,"getValue",
function(){
return this.b$["java.util.Collections.SingletonMap"].v;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return(this.b$["java.util.Collections.SingletonMap"].k==null?0:this.b$["java.util.Collections.SingletonMap"].k.hashCode())^(this.b$["java.util.Collections.SingletonMap"].v==null?0:this.b$["java.util.Collections.SingletonMap"].v.hashCode());
});
Clazz_overrideMethod(c$,"setValue",
function(a){
throw new UnsupportedOperationException();
},"~O");
c$=Clazz_p0p();
};
c$=Clazz_p0p();



// SynchronizedCollection


Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
this.mutex=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.c=a;
this.mutex=this;
},"java.util.Collection");
Clazz_makeConstructor(c$,
function(a,b){
this.c=a;
this.mutex=b;
},"java.util.Collection,~O");
Clazz_defineMethod(c$,"add",
function(a){
{
return this.c.add(a);
}},"~O");
Clazz_defineMethod(c$,"addAll",
function(a){
{
return this.c.addAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"clear",
function(){
{
this.c.clear();
}});
Clazz_defineMethod(c$,"contains",
function(a){
{
return this.c.contains(a);
}},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
{
return this.c.containsAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"isEmpty",
function(){
{
return this.c.isEmpty();
}});
Clazz_defineMethod(c$,"iterator",
function(){
{
return this.c.iterator();
}});
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.c.remove(a);
}},"~O");
Clazz_defineMethod(c$,"removeAll",
function(a){
{
return this.c.removeAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"retainAll",
function(a){
{
return this.c.retainAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"size",
function(){
{
return this.c.size();
}});
Clazz_defineMethod(c$,"toArray",
function(){
{
return this.c.toArray();
}});
Clazz_defineMethod(c$,"toString",
function(){
{
return this.c.toString();
}});
Clazz_defineMethod(c$,"toArray",
function(a){
{
return this.c.toArray(a);
}},"~A");
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.list=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedList",java.util.Collections.SynchronizedCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedList,[a]);
this.list=a;
},"java.util.List");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedList,[a,b]);
this.list=a;
},"java.util.List,~O");
Clazz_defineMethod(c$,"add",
function(a,b){
{
this.list.add(a,b);
}},"~N,~O");
Clazz_defineMethod(c$,"addAll",
function(a,b){
{
return this.list.addAll(a,b);
}},"~N,java.util.Collection");
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.list.equals(a);
}},"~O");
Clazz_defineMethod(c$,"get",
function(a){
{
return this.list.get(a);
}},"~N");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.list.hashCode();
}});
Clazz_defineMethod(c$,"indexOf",
function(a){
{
return this.list.indexOf(a);
}},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
{
return this.list.lastIndexOf(a);
}},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//{
//return this.list.listIterator();
//}});
Clazz_defineMethod(c$,"listIterator",
function(a){
{
a || (a = 0);
return this.list.listIterator(a);
}},"~N");
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.list.remove(a);
}},"~N");
Clazz_defineMethod(c$,"set",
function(a,b){
{
return this.list.set(a,b);
}},"~N,~O");
Clazz_defineMethod(c$,"subList",
function(a,b){
{
return new java.util.Collections.SynchronizedList(this.list.subList(a,b),this.mutex);
}},"~N,~N");
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"SynchronizedRandomAccessList",java.util.Collections.SynchronizedList,java.util.RandomAccess);
Clazz_overrideMethod(c$,"subList",
function(a,b){
{
return new java.util.Collections.SynchronizedRandomAccessList(this.list.subList(a,b),this.mutex);
}},"~N,~N");
c$=Clazz_p0p();




Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
this.mutex=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.m=a;
this.mutex=this;
},"java.util.Map");
Clazz_makeConstructor(c$,
function(a,b){
this.m=a;
this.mutex=b;
},"java.util.Map,~O");
Clazz_defineMethod(c$,"clear",
function(){
{
this.m.clear();
}});
Clazz_defineMethod(c$,"containsKey",
function(a){
{
return this.m.containsKey(a);
}},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
{
return this.m.containsValue(a);
}},"~O");
Clazz_defineMethod(c$,"entrySet",
function(){
{
return new java.util.Collections.SynchronizedSet(this.m.entrySet(),this.mutex);
}});
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.m.equals(a);
}},"~O");
Clazz_defineMethod(c$,"get",
function(a){
{
return this.m.get(a);
}},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.m.hashCode();
}});
Clazz_defineMethod(c$,"isEmpty",
function(){
{
return this.m.isEmpty();
}});
Clazz_defineMethod(c$,"keySet",
function(){
{
return new java.util.Collections.SynchronizedSet(this.m.keySet(),this.mutex);
}});
Clazz_defineMethod(c$,"put",
function(a,b){
{
return this.m.put(a,b);
}},"~O,~O");
Clazz_defineMethod(c$,"putAll",
function(a){
{
this.m.putAll(a);
}},"java.util.Map");
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.m.remove(a);
}},"~O");
Clazz_defineMethod(c$,"size",
function(){
{
return this.m.size();
}});
Clazz_defineMethod(c$,"values",
function(){
{
return new java.util.Collections.SynchronizedCollection(this.m.values(),this.mutex);
}});
Clazz_defineMethod(c$,"toString",
function(){
{
return this.m.toString();
}});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"SynchronizedSet",java.util.Collections.SynchronizedCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.c.equals(a);
}},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.c.hashCode();
}});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedSortedMap",java.util.Collections.SynchronizedMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedMap,[a]);
this.sm=a;
},"java.util.SortedMap");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedMap,[a,b]);
this.sm=a;
},"java.util.SortedMap,~O");
Clazz_defineMethod(c$,"comparator",
function(){
{
return this.sm.comparator();
}});
Clazz_defineMethod(c$,"firstKey",
function(){
{
return this.sm.firstKey();
}});
Clazz_defineMethod(c$,"headMap",
function(a){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.headMap(a),this.mutex);
}},"~O");
Clazz_defineMethod(c$,"lastKey",
function(){
{
return this.sm.lastKey();
}});
Clazz_defineMethod(c$,"subMap",
function(a,b){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.subMap(a,b),this.mutex);
}},"~O,~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.tailMap(a),this.mutex);
}},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedSortedSet",java.util.Collections.SynchronizedSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedSet,[a]);
this.ss=a;
},"java.util.SortedSet");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedSet,[a,b]);
this.ss=a;
},"java.util.SortedSet,~O");
Clazz_defineMethod(c$,"comparator",
function(){
{
return this.ss.comparator();
}});
Clazz_defineMethod(c$,"first",
function(){
{
return this.ss.first();
}});
Clazz_defineMethod(c$,"headSet",
function(a){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.headSet(a),this.mutex);
}},"~O");
Clazz_defineMethod(c$,"last",
function(){
{
return this.ss.last();
}});
Clazz_defineMethod(c$,"subSet",
function(a,b){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.subSet(a,b),this.mutex);
}},"~O,~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.tailSet(a),this.mutex);
}},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.c=a;
},"java.util.Collection");
Clazz_overrideMethod(c$,"add",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_overrideMethod(c$,"addAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_overrideMethod(c$,"clear",
function(){
throw new UnsupportedOperationException();
});
Clazz_defineMethod(c$,"contains",
function(a){
return this.c.contains(a);
},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.c.containsAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.c.isEmpty();
});
Clazz_defineMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableCollection$1")?0:java.util.Collections.UnmodifiableCollection.$Collections$UnmodifiableCollection$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableCollection$1,this,null));
});
Clazz_overrideMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_overrideMethod(c$,"removeAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_overrideMethod(c$,"retainAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_defineMethod(c$,"size",
function(){
return this.c.size();
});
Clazz_defineMethod(c$,"toArray",
function(){
return this.c.toArray();
});
Clazz_defineMethod(c$,"toArray",
function(a){
return this.c.toArray(a);
},"~A");
Clazz_defineMethod(c$,"toString",
function(){
return this.c.toString();
});
c$.$Collections$UnmodifiableCollection$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableCollection$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableCollection"].c.iterator();
});
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return this.iterator.next();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();

//// ural

Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.list=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableList",java.util.Collections.UnmodifiableCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableList,[a]);
this.list=a;
},"java.util.List");
Clazz_defineMethod(c$,"add",
function(a,b){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_defineMethod(c$,"addAll",
function(a,b){
throw new UnsupportedOperationException();
},"~N,java.util.Collection");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.list.equals(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.list.get(a);
},"~N");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.list.hashCode();
});
Clazz_defineMethod(c$,"indexOf",
function(a){
return this.list.indexOf(a);
},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
return this.list.lastIndexOf(a);
},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//return this.listIterator(0);
//});
Clazz_defineMethod(c$,"listIterator",
function(a){
a || (a = 0);
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableList$1")?0:java.util.Collections.UnmodifiableList.$Collections$UnmodifiableList$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableList$1,this,null));
},"~N");
Clazz_defineMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~N");
Clazz_overrideMethod(c$,"set",
function(a,b){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_defineMethod(c$,"subList",
function(a,b){
return new java.util.Collections.UnmodifiableList(this.list.subList(a,b));
},"~N,~N");
c$.$Collections$UnmodifiableList$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableList$1",null,java.util.ListIterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableList"].list.listIterator(location);
});
Clazz_overrideMethod(c$,"add",
function(b){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"hasPrevious",
function(){
return this.iterator.hasPrevious();
});
Clazz_defineMethod(c$,"next",
function(){
return this.iterator.next();
});
Clazz_defineMethod(c$,"nextIndex",
function(){
return this.iterator.nextIndex();
});
Clazz_defineMethod(c$,"previous",
function(){
return this.iterator.previous();
});
Clazz_defineMethod(c$,"previousIndex",
function(){
return this.iterator.previousIndex();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
Clazz_overrideMethod(c$,"set",
function(b){
throw new UnsupportedOperationException();
},"~O");
c$=Clazz_p0p();
};
c$=Clazz_p0p();

Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"UnmodifiableRandomAccessList"
,java.util.Collections.UnmodifiableList,java.util.RandomAccess);
Clazz_overrideMethod(c$,"subList",
function(a,b){
return new java.util.Collections.UnmodifiableRandomAccessList(this.list.subList(a,b));
},"~N,~N");
c$=Clazz_p0p();





Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.m=a;
},"java.util.Map");
Clazz_overrideMethod(c$,"clear",
function(){
throw new UnsupportedOperationException();
});
Clazz_defineMethod(c$,"containsKey",
function(a){
return this.m.containsKey(a);
},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
return this.m.containsValue(a);
},"~O");
Clazz_defineMethod(c$,"entrySet",
function(){
return new java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet(this.m.entrySet());
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.m.equals(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.m.get(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.m.hashCode();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.m.isEmpty();
});
Clazz_defineMethod(c$,"keySet",
function(){
return new java.util.Collections.UnmodifiableSet(this.m.keySet());
});
Clazz_overrideMethod(c$,"put",
function(a,b){
throw new UnsupportedOperationException();
},"~O,~O");
Clazz_overrideMethod(c$,"putAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Map");
Clazz_overrideMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"size",
function(){
return this.m.size();
});
Clazz_defineMethod(c$,"values",
function(){
return new java.util.Collections.UnmodifiableCollection(this.m.values());
});
Clazz_defineMethod(c$,"toString",
function(){
return this.m.toString();
});
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections.UnmodifiableMap,"UnmodifiableEntrySet",java.util.Collections.UnmodifiableSet);
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1")?0:java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1,this,null));
});
Clazz_defineMethod(c$,"toArray",
function(){
var a=this.c.size();
var b=new Array(a);
var c=this.iterator();
for(var d=a;--d>=0;){
b[d]=c.next();
}
return b;
});
Clazz_defineMethod(c$,"toArray",
function(a){
var b=this.c.size();
var c=0;
var d=this.iterator();
if(b>a.length){
var e=a.getClass().getComponentType();
a=java.lang.reflect.Array.newInstance(e,b);
}while(c<b){
a[c++]=d.next();
}
if(c<a.length){
a[c]=null;
}return a;
},"~A");
c$.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableMap$UnmodifiableEntrySet$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet"].c.iterator();
});
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return new java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.UnmodifiableMapEntry(this.iterator.next());
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.mapEntry=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet,"UnmodifiableMapEntry",null,java.util.Map.Entry);
Clazz_makeConstructor(c$,
function(a){
this.mapEntry=a;
},"java.util.Map.Entry");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.mapEntry.equals(a);
},"~O");
Clazz_defineMethod(c$,"getKey",
function(){
return this.mapEntry.getKey();
});
Clazz_defineMethod(c$,"getValue",
function(){
return this.mapEntry.getValue();
});
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.mapEntry.hashCode();
});
Clazz_overrideMethod(c$,"setValue",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"toString",
function(){
return this.mapEntry.toString();
});
c$=Clazz_p0p();
c$=Clazz_p0p();
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"UnmodifiableSet",java.util.Collections.UnmodifiableCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.c.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.c.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableSortedMap",java.util.Collections.UnmodifiableMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableSortedMap,[a]);
this.sm=a;
},"java.util.SortedMap");
Clazz_defineMethod(c$,"comparator",
function(){
return this.sm.comparator();
});
Clazz_defineMethod(c$,"firstKey",
function(){
return this.sm.firstKey();
});
Clazz_defineMethod(c$,"headMap",
function(a){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.headMap(a));
},"~O");
Clazz_defineMethod(c$,"lastKey",
function(){
return this.sm.lastKey();
});
Clazz_defineMethod(c$,"subMap",
function(a,b){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.subMap(a,b));
},"~O,~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.tailMap(a));
},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableSortedSet",java.util.Collections.UnmodifiableSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableSortedSet,[a]);
this.ss=a;
},"java.util.SortedSet");
Clazz_defineMethod(c$,"comparator",
function(){
return this.ss.comparator();
});
Clazz_defineMethod(c$,"first",
function(){
return this.ss.first();
});
Clazz_defineMethod(c$,"headSet",
function(a){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.headSet(a));
},"~O");
Clazz_defineMethod(c$,"last",
function(){
return this.ss.last();
});
Clazz_defineMethod(c$,"subSet",
function(a,b){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.subSet(a,b));
},"~O,~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.tailSet(a));
},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
this.type=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a,b){
if(a==null||b==null){
throw new NullPointerException();
}this.c=a;
this.type=b;
},"java.util.Collection,Class");
Clazz_defineMethod(c$,"size",
function(){
return this.c.size();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.c.isEmpty();
});
Clazz_defineMethod(c$,"contains",
function(a){
return this.c.contains(a);
},"~O");
Clazz_defineMethod(c$,"iterator",
function(){
var a=this.c.iterator();
if(Clazz_instanceOf(a,java.util.ListIterator)){
a=new java.util.Collections.CheckedListIterator(a,this.type);
}return a;
});
Clazz_defineMethod(c$,"toArray",
function(){
return this.c.toArray();
});
Clazz_defineMethod(c$,"toArray",
function(a){
return this.c.toArray(a);
},"~A");
Clazz_defineMethod(c$,"add",
function(a){
return this.c.add(java.util.Collections.checkType(a,this.type));
},"~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.c.remove(a);
},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.c.containsAll(a);
},"java.util.Collection");
Clazz_overrideMethod(c$,"addAll",
function(a){
var b=a.size();
if(b==0){
return false;
}var c=new Array(b);
var d=a.iterator();
for(var e=0;e<b;e++){
c[e]=java.util.Collections.checkType(d.next(),this.type);
}
var f=false;
for(var g=0;g<b;g++){
f=new Boolean(f|this.c.add(c[g])).valueOf();
}
return f;
},"java.util.Collection");
Clazz_defineMethod(c$,"removeAll",
function(a){
return this.c.removeAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"retainAll",
function(a){
return this.c.retainAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"clear",
function(){
this.c.clear();
});
Clazz_defineMethod(c$,"toString",
function(){
return this.c.toString();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.i=null;
this.type=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedListIterator",null,java.util.ListIterator);
Clazz_makeConstructor(c$,
function(a,b){
this.i=a;
this.type=b;
},"java.util.ListIterator,Class");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.i.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return this.i.next();
});
Clazz_defineMethod(c$,"remove",
function(){
this.i.remove();
});
Clazz_defineMethod(c$,"hasPrevious",
function(){
return this.i.hasPrevious();
});
Clazz_defineMethod(c$,"previous",
function(){
return this.i.previous();
});
Clazz_defineMethod(c$,"nextIndex",
function(){
return this.i.nextIndex();
});
Clazz_defineMethod(c$,"previousIndex",
function(){
return this.i.previousIndex();
});
Clazz_defineMethod(c$,"set",
function(a){
this.i.set(java.util.Collections.checkType(a,this.type));
},"~O");
Clazz_defineMethod(c$,"add",
function(a){
this.i.add(java.util.Collections.checkType(a,this.type));
},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.l=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedList",java.util.Collections.CheckedCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CheckedList,[a,b]);
this.l=a;
},"java.util.List,Class");
Clazz_defineMethod(c$,"addAll",
function(a,b){
var c=b.size();
if(c==0){
return false;
}var d=new Array(c);
var e=b.iterator();
for(var f=0;f<c;f++){
d[f]=java.util.Collections.checkType(e.next(),this.type);
}
return this.l.addAll(a,java.util.Arrays.asList(d));
},"~N,java.util.Collection");
Clazz_defineMethod(c$,"get",
function(a){
return this.l.get(a);
},"~N");
Clazz_defineMethod(c$,"set",
function(a,b){
return this.l.set(a,java.util.Collections.checkType(b,this.type));
},"~N,~O");
Clazz_defineMethod(c$,"add",
function(a,b){
this.l.add(a,java.util.Collections.checkType(b,this.type));
},"~N,~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.l.remove(a);
},"~N");
Clazz_defineMethod(c$,"indexOf",
function(a){
return this.l.indexOf(a);
},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
return this.l.lastIndexOf(a);
},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//return new java.util.Collections.CheckedListIterator(this.l.listIterator(),this.type);
//});
Clazz_defineMethod(c$,"listIterator",
function(a){
a || (a = 0);
return new java.util.Collections.CheckedListIterator(this.l.listIterator(a),this.type);
},"~N");
Clazz_defineMethod(c$,"subList",
function(a,b){
return java.util.Collections.checkedList(this.l.subList(a,b),this.type);
},"~N,~N");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.l.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.l.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"CheckedRandomAccessList",java.util.Collections.CheckedList,java.util.RandomAccess);
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"CheckedSet",java.util.Collections.CheckedCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.c.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.c.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
this.keyType=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
($fz=function(a,b,c){
if(a==null||b==null||c==null){
throw new NullPointerException();
}this.m=a;
this.keyType=b;
this.valueType=c;
},$fz.isPrivate=true,$fz),"java.util.Map,Class,Class");
Clazz_defineMethod(c$,"size",
function(){
return this.m.size();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.m.isEmpty();
});
Clazz_defineMethod(c$,"containsKey",
function(a){
return this.m.containsKey(a);
},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
return this.m.containsValue(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.m.get(a);
},"~O");
Clazz_defineMethod(c$,"put",
function(a,b){
return this.m.put(java.util.Collections.checkType(a,this.keyType),java.util.Collections.checkType(b,this.valueType));
},"~O,~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.m.remove(a);
},"~O");
Clazz_overrideMethod(c$,"putAll",
function(a){
var b=a.size();
if(b==0){
return;
}var c=new Array(b);
var d=a.entrySet().iterator();
for(var e=0;e<b;e++){
var f=d.next();
java.util.Collections.checkType(f.getKey(),this.keyType);
java.util.Collections.checkType(f.getValue(),this.valueType);
c[e]=f;
}
for(var f=0;f<b;f++){
this.m.put(c[f].getKey(),c[f].getValue());
}
},"java.util.Map");
Clazz_defineMethod(c$,"clear",
function(){
this.m.clear();
});
Clazz_defineMethod(c$,"keySet",
function(){
return this.m.keySet();
});
Clazz_defineMethod(c$,"values",
function(){
return this.m.values();
});
Clazz_defineMethod(c$,"entrySet",
function(){
return new java.util.Collections.CheckedMap.CheckedEntrySet(this.m.entrySet(),this.valueType);
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.m.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.m.hashCode();
});
Clazz_defineMethod(c$,"toString",
function(){
return this.m.toString();
});
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.e=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap,"CheckedEntry",null,java.util.Map.Entry);
Clazz_makeConstructor(c$,
function(a,b){
if(a==null){
throw new NullPointerException();
}this.e=a;
this.valueType=b;
},"java.util.Map.Entry,Class");
Clazz_defineMethod(c$,"getKey",
function(){
return this.e.getKey();
});
Clazz_defineMethod(c$,"getValue",
function(){
return this.e.getValue();
});
Clazz_defineMethod(c$,"setValue",
function(a){
return this.e.setValue(java.util.Collections.checkType(a,this.valueType));
},"~O");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.e.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.e.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.s=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap,"CheckedEntrySet",null,java.util.Set);
Clazz_makeConstructor(c$,
function(a,b){
this.s=a;
this.valueType=b;
},"java.util.Set,Class");
Clazz_defineMethod(c$,"iterator",
function(){
return new java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator(this.s.iterator(),this.valueType);
});
Clazz_defineMethod(c$,"toArray",
function(){
var a=this.size();
var b=new Array(a);
var c=this.iterator();
for(var d=0;d<a;d++){
b[d]=c.next();
}
return b;
});
Clazz_defineMethod(c$,"toArray",
function(a){
var b=this.size();
if(a.length<b){
var c=a.getClass().getComponentType();
a=java.lang.reflect.Array.newInstance(c,b);
}var c=this.iterator();
for(var d=0;d<b;d++){
a[d]=c.next();
}
if(b<a.length){
a[b]=null;
}return a;
},"~A");
Clazz_defineMethod(c$,"retainAll",
function(a){
return this.s.retainAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"removeAll",
function(a){
return this.s.removeAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.s.containsAll(a);
},"java.util.Collection");
Clazz_overrideMethod(c$,"addAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_defineMethod(c$,"remove",
function(a){
return this.s.remove(a);
},"~O");
Clazz_defineMethod(c$,"contains",
function(a){
return this.s.contains(a);
},"~O");
Clazz_overrideMethod(c$,"add",
function(a){
throw new UnsupportedOperationException();
},"java.util.Map.Entry");
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.s.isEmpty();
});
Clazz_defineMethod(c$,"clear",
function(){
this.s.clear();
});
Clazz_defineMethod(c$,"size",
function(){
return this.s.size();
});
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.s.hashCode();
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.s.equals(a);
},"~O");
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.i=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap.CheckedEntrySet,"CheckedEntryIterator",null,java.util.Iterator);
Clazz_makeConstructor(c$,
function(a,b){
this.i=a;
this.valueType=b;
},"java.util.Iterator,Class");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.i.hasNext();
});
Clazz_defineMethod(c$,"remove",
function(){
this.i.remove();
});
Clazz_defineMethod(c$,"next",
function(){
return new java.util.Collections.CheckedMap.CheckedEntry(this.i.next(),this.valueType);
});
c$=Clazz_p0p();
c$=Clazz_p0p();
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedSortedSet",java.util.Collections.CheckedSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CheckedSortedSet,[a,b]);
this.ss=a;
},"java.util.SortedSet,Class");
Clazz_defineMethod(c$,"comparator",
function(){
return this.ss.comparator();
});
Clazz_defineMethod(c$,"subSet",
function(a,b){
return new java.util.Collections.CheckedSortedSet(this.ss.subSet(a,b),this.type);
},"~O,~O");
Clazz_defineMethod(c$,"headSet",
function(a){
return new java.util.Collections.CheckedSortedSet(this.ss.headSet(a),this.type);
},"~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
return new java.util.Collections.CheckedSortedSet(this.ss.tailSet(a),this.type);
},"~O");
Clazz_defineMethod(c$,"first",
function(){
return this.ss.first();
});
Clazz_defineMethod(c$,"last",
function(){
return this.ss.last();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedSortedMap",java.util.Collections.CheckedMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a,b,c){
Clazz_superConstructor(this,java.util.Collections.CheckedSortedMap,[a,b,c]);
this.sm=a;
},"java.util.SortedMap,Class,Class");
Clazz_defineMethod(c$,"comparator",
function(){
return this.sm.comparator();
});
Clazz_defineMethod(c$,"subMap",
function(a,b){
return new java.util.Collections.CheckedSortedMap(this.sm.subMap(a,b),this.keyType,this.valueType);
},"~O,~O");
Clazz_defineMethod(c$,"headMap",
function(a){
return new java.util.Collections.CheckedSortedMap(this.sm.headMap(a),this.keyType,this.valueType);
},"~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
return new java.util.Collections.CheckedSortedMap(this.sm.tailMap(a),this.keyType,this.valueType);
},"~O");
Clazz_defineMethod(c$,"firstKey",
function(){
return this.sm.firstKey();
});
Clazz_defineMethod(c$,"lastKey",
function(){
return this.sm.lastKey();
});
c$=Clazz_p0p();
c$.EMPTY_LIST=c$.prototype.EMPTY_LIST=new java.util.Collections.EmptyList();
c$.EMPTY_SET=c$.prototype.EMPTY_SET=new java.util.Collections.EmptySet();
c$.EMPTY_MAP=c$.prototype.EMPTY_MAP=new java.util.Collections.EmptyMap();
});


