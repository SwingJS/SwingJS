Clazz.declarePackage ("jssun.text.resources");
Clazz.load (["java.util.ListResourceBundle"], "jssun.text.resources.FormatData_en", null, function () {
c$ = Clazz.declareType (jssun.text.resources, "FormatData_en", java.util.ListResourceBundle);
Clazz.overrideMethod (c$, "getContents", 
function () {
return  Clazz.newArray (-1, [ Clazz.newArray (-1, ["NumberPatterns",  Clazz.newArray (-1, ["#,##0.###;-#,##0.###", "\u00A4#,##0.00;-\u00A4#,##0.00", "#,##0%"])]),  Clazz.newArray (-1, ["DateTimePatternChars", "GyMdkHmsSEDFwWahKzZ"])]);
});
});
