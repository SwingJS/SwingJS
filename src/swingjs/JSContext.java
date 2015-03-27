package swingjs;
import jsjava.applet.AppletContext;
import jsjava.applet.AppletStub;
import java.net.URL;

import jsjavax.swing.JApplet;


/**
 * A "native" implementation of AppletStub for JavaScript 
 *
 */

public class JSContext implements AppletStub {

	JApplet app;
	public JSContext(JApplet app) {
		this.app = app;
	}

	@Override
	public boolean isActive() {
		return true;
	}

	@Override
	public URL getDocumentBase() {
		return null;
	}

	@Override
	public URL getCodeBase() {
		return null;
	}

	@Override
	public String getParameter(String name) {
		System.out.println("get parameter: " + name);
		if ("width".equals(name))
			return "300";
		if ("height".equals(name))
			return "300";
		return null;
	}

	@Override
	public AppletContext getAppletContext() {
		return null;
	}

	@Override
	public void appletResize(int width, int height) {
		System.out.println("resize applet to " + width + " " + height);
	}

}
