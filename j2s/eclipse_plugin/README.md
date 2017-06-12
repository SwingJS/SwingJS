# Developers:

**INSTALLING JAVA2SCRIPT**

At this point in time, you will need either Eclipse 4.2-4.4
for the Java2Script compiler to work. The plug-in can be found in 
j2s/eclipse_plugin. 

Within each of those zip files remove net.sf.j2s.core_2.0.0.jar
and place it in your eclipse/plugins/ directory.

Make sure you have a .j2s file in the top directory of your project as well.

Currently, this needs to be the swingjs directory itself, because the ANT
tasks in that project do a lot of manipulation of the .js files that j2s
creates, in order to create the web site version of the files in the site/swingjs directory.
 
Bob Hanson 9/1/2016
