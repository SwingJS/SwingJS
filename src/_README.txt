The SwingJS source includes several critical packages as well as some 
unnecessary ones. For more detail, see _README.txt in each of the directories.


a2s          AWT-2-SWING methods that are only for use if trying to adapt a 
             non-Swing applet or an applet that has mixed Swing and non-Swing
             components.

com,edu,org,test  (noncritical) example applications and applets

Jama         (noncritical) matrix utilities used by some com.falstad applets

java         (critical) raw JavaScript replacements for Java2Script originals

javajs       (critical) utility classes that can be added to any Java program
             and run in both Java and JavaScript
             
jsjava       (critical) primary java classes (awt, io, lang, etc.)

jsjavax      (critical) imageio, sound, swing, and xml Java extensions

jssun        (critical) JavaScript-compatible sun classes

swingjs      (critical) Core SwingJS classes, including platform look and feel (plaf)
 
test		 test applets and applications. Note that to quickly test any of the
             form Test_XXX.java, simply run buildApps.xml (if no changes in SwingJS classes)
             or buildSite.xml (if changes have been made to the SwingJS system) and then
             in site/examples/test/ run test.htm. You will be prompted for XXX. Or you can
             run test.htm?XXX. And either way you can add #j2sdebugcode to that URL to
             use non-compressed swingjs/j2s/core files for easier debugging in JavaScript. 
             