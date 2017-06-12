# SwingJS 2017

### Robert M. Hanson
### Udo Borkowski

[Original Link](http://sourceforge.net/projects/swingjs/)

**NOTE: THIS PROJECT IS NOT IN AN EXECUTABLE STATE YET**

### Description
SwingJS is a work in progress -- interested developers are welcome. 
The overall objective is to allow Java Swing Applets to be ported to 
JavaScript/HTML5 with a minimum of refactoring. The project derives 
from the highly successful port of the Jmol Java Applet to 
JavaScript/HTML5 (See [jmol](http://sourceforge.net/p/jmol) and [jsmol](http://sourceforge.net/p/jsmol)) using the Java2Script Eclipse-based J2S compiler. 


### Running the testApplet 
----------------------

- run buildsite.xml (from Eclipse, or command line ("ant -f buildSite.xml"))
- open site/swingjs/test.htm


### Directory structure for the SwingjS project:
--------------------------------------------

| 	Directory   | Description 	                                                               				|
| ------------- | ----------------------------------------------------------------------------------------- |
| bin/ | .class and .js files are found here flagged with svn-ignore |
| [doc/](doc)  | working documents for SwingJS developer |
| [html/](html)  | client test files to be expanded and modified as needed |
| [j2s/eclipse_plugin/](j2s/eclipse_plugin)  | the most recent j2s Eclipse plugin binaries from Zhou Renjian (copied from the JSmol project)
| [j2s/java/](j2s/java)  | the basic set of java classes delivered with Java2Script (copied from the JSmol project) |
| [jars/](jars) | the Google Closure Compiler used in final preparation (compressed core.xxx.js files) |
| [js/](js) | JavaScript library files specific to SwingJS implementations |
| [jsmol/bin/](jmol/bin) | J2S-compiled Java classes from the JSmol project
| [jsmoljs/](jsmoljs/) | JavaScript library files from JSmol, also for implementations at least for now, for compatibility with JSmol)
| [lib/jquery/](lib/jquery) | implemented jQuery version |
| [php/](php) | server-side PHP required for some browsers for cross-platform file transfer |
| site/ | recreated from scratch by buildSite.htm (this directory is marked as svn-ignore; please don't upload it) |
| [src/jsjava/](src/jsjava) | java classes temporarily named "jsjsava" |
| [src/javax/](src/javax) | javax classes temporarily named "jsjavax" |
| [src/jssun/](src/jssun) | sun classes temporarily named "jssun" |
| [src/swingjs/](src/swingjs) | JavaScript-specific "native" classes called from within java classes |
| [src/swingjs/test/](src/swingjs/test) | Test suite for SwingjS |
| [srcjs/com/](srcjs/com) | java classes added to the JSmol binary for ZIP file reading and writing for reference only -- do not modify (or modify only in the Jmol project) |
| [srcjs/java/](srcjs/java) | java classes that override the original classes from the J2S distribution for reference only -- do not modify (or modify only in the Jmol project) |
| [srcjs/js/](srcjs/js) | package.js used for site implementation |
| [unused/](unused) | java classes that were pulled from Java 1.6 but not used; quite randomly ordered -- no real directory structure maintained; just in case we need them. |
| _buildFromJSmol.xml | ANT task Bob will adapt to pull files from the JSmol project as needed. |
| [buildSite.xml](buildSite.xml) | ANT task to build the site/swingjs directory |
