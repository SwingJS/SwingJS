package swingjs;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Enumeration;
import java.util.Hashtable;

import swingjs.api.HTML5Applet;
import swingjs.api.HTML5Canvas;

import swingjs.api.JSInterface;
import jsjava.applet.Applet;
import jsjava.applet.AppletContext;
import jsjava.awt.AWTEvent;
import jsjava.awt.Component;
import jsjava.awt.Graphics;
import jsjava.awt.Image;
import jsjava.awt.event.PaintEvent;
import jsjava.awt.image.ColorModel;
import jsjava.awt.peer.ComponentPeer;
import jsjava.awt.peer.ContainerPeer;
import jsjavax.swing.JApplet;
import jssun.applet.AppletPanel;
import jssun.awt.CausedFocusEvent.Cause;

/**
 * SwingJS class to start an applet. 
 * 
 * For now we use the following, but this will be different once we compress
 * 
 * Clazz.loadClass("swingjs.JSAppletPanel");
 * this._appletPanel = new JSAppletPanel(viewerOptions);
 * 
 * where viewerOptions holds critical information needed to create this applet
 * 
 * 
 * @author Bob Hanson 
 *
 */
public class JSAppletPanel extends AppletPanel implements AppletContext, JSInterface {

	private Hashtable params;
	/*
	 * the JavaScript SwingJS._Applet object
	 */
	public HTML5Applet html5Applet;
	
	public String fullName;
	public String appletCodeBase;
	public String appletIdiomaBase;
	public String appletDocumentBase;

  public int maximumSize = Integer.MAX_VALUE;
	public String appletName;
	public String syncId;
	public boolean testAsync;
	public boolean async;
	public String strJavaVersion;
	public Object strJavaVendor;
	public Object display;
	private HTML5Canvas canvas;
	private JSGraphics2D jsgraphics;

  private void setMaximumSize(int x) {
    maximumSize = Math.max(x, 100);
  }

	public JSAppletPanel(Hashtable params) {
		super();
		System.out.println("JSAppletPanel initializing");
		set(params);
		// This will allow us to get an applet from any component while running.
		// The trick will be that when we fire events, we make sure to set the
		// "currentThread" to the one appropriate for this applet. That is,  
		// 
		// Might work! -- BH
		
		System.out.println("JSAppletPanel initialized");
	}

	private void set(Hashtable params) {
		this.params = params;
		htmlName = JSUtil.split("" + getParameter("name"), "_object")[0];
		appletName = JSUtil.split(htmlName + "_", "_")[0];
		// should be the same as htmlName; probably should point out that applet
		// names cannot have _ in them.

		syncId = getParameter("syncId");
		fullName = htmlName + "__" + syncId + "__";
		params.put("fullName", fullName);
		Object o = params.get("codePath");
		if (o == null)
			o = "../java/";
		appletCodeBase = o.toString();
		appletIdiomaBase = appletCodeBase.substring(0,
				appletCodeBase.lastIndexOf("/", appletCodeBase.length() - 2) + 1)
				+ "idioma";
		o = params.get("documentBase");
		appletDocumentBase = (o == null ? "" : o.toString());
		if (params.containsKey("maximumSize"))
			setMaximumSize(((Integer) params.get("maximumSize")).intValue());

		// syncId = (i < 0 ? "" : fullName.substring(i + 2, fullName.length() - 2));
		async = (testAsync || params.containsKey("async"));
		HTML5Applet applet = null;
		String javaver = "?";
		/**
		 * @j2sNative
		 * 
		 *            if(self.Jmol) { applet =
		 *            Jmol._applets[this.htmlName.split("_object")[0]]; 
		 *            javaver =
		 *            Jmol._version; }
		 * 
		 * 
		 */
		{
		}
		html5Applet = applet;
		strJavaVersion = javaver;
		strJavaVendor = "Java2Script/Java 1.6 (HTML5)";
		//String platform = (String) params.get("platform");
		//if (platform != null && platform.length() > 0)
	  //		apiPlatform = (GenericPlatform) Interface.getInterface(platform);
		display = params.get("display");

		threadGroup = new JSThreadGroup(appletName);
		myThread = new JSThread(threadGroup, appletName);
		((JSThreadGroup) threadGroup).setHtmlApplet(html5Applet);
		/**
		 * @j2sNative
		 * 
		 *            Jmol._applets[this.appletName + "_thread"] =
		 *            jsjava.lang.Thread.thisThread = this.myThread; this.appContext =
		 *            jssun.awt.SunToolkit.createNewAppContext(); if
		 *            (SwingJS._JSToolkit == null) SwingJS._JSToolkit =
		 *            swingjs.api.Interface.getInstance("swingjs.JSToolkit", false);
		 */
		{
		}

		init();

		System.out.println("JSAppletPanel runloader");
		runLoader(); // applet created here
		System.out.println("JSAppletPane  init");
		appletInit();
		this.applet.invalidate();
		System.out.println("JSAppletPanel start");
		appletStart();
		System.out.println("JSAppletPanel done");

		notifyAppletReady();

	}
	
	private void notifyAppletReady() {
		/**
		 *  not quite correct yet. Have to think about this...
		 * 
		 * @j2sNative
		 * 
		 * 	Jmol._readyCallback(this.appletName, this.fullName, true, this.applet, this);
		 * 
		 */
		{}
	}
	
	@Override
	protected void setupAppletAppContext() {
		// probably do something here
		// do nothing
	}

	///// AppletStub /////
	
	
	@Override
	public URL getDocumentBase() {
		try {
			return new URL((String) params.get("documentBase"));
		} catch (MalformedURLException e) {
			return null;
		}
	}

	@Override
	public URL getCodeBase() {
		try {
			return new URL((String) params.get("codeBase"));
		} catch (MalformedURLException e) {
			return null;
		}
	}

	@Override
	public String getParameter(String name) {
		String s = (String) params.get(name);
		System.out.println("get parameter: " + name + " = " + s);
		return s;
	}

	@Override
	public AppletContext getAppletContext() {
		return this;
	}


	@Override
	protected String getCode() {
		return getParameter("code");
	}

//	@Override
//	protected String getJarFiles() {
//		return null;
//	}
//
//	@Override
//	protected String getSerializedObject() {
//		return null;
//	}

	private HTML5Canvas getCanvas() {
		if (canvas == null)
			canvas = html5Applet._getHtml5Canvas();
		return canvas;
	}

	@Override
	public int getHeight() {
		return JSToolkit.getJQuery().$(getCanvas()).height();
	}

	@Override
	public int getWidth() {
		return JSToolkit.getJQuery().$(getCanvas()).width();
	}

	@Override
	public boolean hasInitialFocus() {
		return true;
	}

	@Override
	public boolean isActive() {
		return true;
	}

	///// AppletContext /////
	
	@Override
	public Image getImage(URL url) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Applet getApplet(String name) {
		Applet applet = null;
		/**
		 * @j2sNative
		 * 
		 * 		applet = Jmol._applets[name];
		 *    applet && (applet = applet._applet);
		 */
		{
			
		}
		return applet;
	}

	@Override
	public Enumeration<Applet> getApplets() {
		// not supported for now
	return null;
	}

	@Override
	public void showDocument(URL url) {
    /**
     * @j2sNative window.open(url.toString());
     */
    {
      System.out.println(url);
    }
	}

	@Override
	public void showDocument(URL url, String target) {
    /**
     * @j2sNative window.open(url.toString(), target);
     */
    {
      System.out.println(url);
    }
	}

	@Override
	public void showStatus(String status) {
		/**
		 * @j2sNative
		 * 
		 *  Clazz._LoaderProgressMonitor.showStatus(status, true);
		 */
		{
			System.out.println(status);
		}
	}

	/////////// javajs.api.JSInterface ///////////
	//
	// methods called by page JavaScript
	//
	//
	
	@Override
	public int cacheFileByName(String fileName, boolean isAdd) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void cachePut(String key, Object data) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getFullName() {
		return fullName;
	}

	@Override
	public void openFileAsyncSpecial(String fileName, int flags) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean processMouseEvent(int id, int x, int y, int modifiers,
			long time) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void processTwoPointGesture(float[][][] touches) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setDisplay(HTML5Canvas canvas) {
		this.canvas = canvas;		
	}

	@Override
	public void setScreenDimension(int width, int height) {
		setGraphics(jsgraphics = null);
		resize(width, height);
		if (applet != null)
			applet.resize(width, height);
	}

	@Override
	public boolean setStatusDragDropped(int mode, int x, int y, String fileName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void startHoverWatcher(boolean enable) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void paint(Graphics g) {
		// Note that this "Panel" is never painted.
		// This class simply maintains valuable information for applet loading.
		// Here we go straight to the contentPane and paint that.	
		(applet instanceof JApplet ? ((JApplet) applet).getContentPane(): applet).paint(setGraphics(g));
	}

	/**
	 * SwingJS will deliver a null graphics here. 
	 * 
	 * @param g
	 * @return
	 */
	private Graphics setGraphics(Graphics g) {
		if (g == null || (g = jsgraphics) == null) {
			g = jsgraphics = new JSGraphics2D(getCanvas());
			// set methods for HTMLCanvasContext2D that are just direct assignments
//did not work			/**
//			 * @j2sNative
//			 * 
//			 * 	g.ctx._setLineWidth = function(d) {this.lineWidth = d};
//			 *  g.ctx._setFont = function(f) {this.font = f};
//			 * 	g.ctx._setFillStyle = function(s) {this.fillStyle = s};
//			 *	g.ctx._setStrokeStyle = function(s) {this.strokeStyle = s};
//			 */
//			{}
			((JSGraphics2D)g).setWindowParameters(getWidth(), getHeight());
		}
		return g;
	}


}
