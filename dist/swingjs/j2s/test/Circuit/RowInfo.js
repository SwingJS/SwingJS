Clazz.declarePackage ("test.Circuit");
c$ = Clazz.decorateAsClass (function () {
this.nodeEq = 0;
this.type = 0;
this.mapCol = 0;
this.mapRow = 0;
this.value = 0;
this.rsChanges = false;
this.lsChanges = false;
this.dropRow = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "RowInfo");
Clazz.makeConstructor (c$, 
function () {
this.type = 0;
});
Clazz.defineStatics (c$,
"ROW_NORMAL", 0,
"ROW_CONST", 1,
"ROW_EQUAL", 2);
