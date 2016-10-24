package swingjs;

import jsjavax.swing.JApplet;

/**
 * JSApplet -- a dummy applet for running a main method in a general class 
 * @author Bob Hanson
 * 
 */
public class JSApplet extends JApplet {

	public Class<?> runMain(String className, String[] args) {
		Class<?> theClass = null;
		try {
			theClass = Class.forName(className);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("Running main but cannot find class " + className);
			e.printStackTrace();
			return null;
		}
	  /**
	   * @j2sNative
	   * 
	   * theClass.main(args);
	   * 
	   */
		return theClass;
	}
}