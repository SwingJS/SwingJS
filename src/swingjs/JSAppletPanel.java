package swingjs;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Enumeration;
import java.util.Hashtable;

import jsjava.applet.Applet;
import jsjava.applet.AppletContext;
import jsjava.applet.AppletStub;
import jsjava.awt.BorderLayout;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.Graphics;
import jsjava.awt.Image;
import jsjava.awt.Panel;
import jsjava.awt.Toolkit;
import jsjavax.swing.JApplet;
import jssun.applet.AppletEvent;
import jssun.applet.AppletEventMulticaster;
import jssun.applet.AppletListener;
import swingjs.api.HTML5Applet;
import swingjs.api.HTML5Canvas;
import swingjs.api.JSInterface;
import jsjavax.swing.JPanel;

/**
 * JSAppletPanel 
 * 
 * SwingJS class to start an applet. Note that this must be a JApplet,
 * not just java.awt.Applet. The implementation (for now) does not allow
 * "mixed" contents -- That is, no non-Swing Applet components are allowed.
 * 
 * The basic start up in JavaScript involves:
 * 
 * Clazz.loadClass("swingjs.JSAppletPanel"); 
 * var _appletPanel = new JSAppletPanel(viewerOptions);
 * _appletPanel.start();
 * 
 * where viewerOptions holds critical information needed to create this applet
 * 
 * 
 * @author Bob Hanson
 * 
 */
public class JSAppletPanel extends Panel implements AppletStub, AppletContext,
		JSInterface {

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
	private JApplet applet;

	// /// AppletPanel fields //////

	/**
	 * The initial applet size.
	 */
	Dimension defaultAppletSize = new Dimension(10, 10);

	/**
	 * The current applet size.
	 */
	Dimension currentAppletSize = new Dimension(10, 10);

	private int nextStatus;

	/* applet event ids */
	public final static int APPLET_UNINITIALIZED = 0; // SwingJS
	public final static int APPLET_LOAD = 1;
	public final static int APPLET_INIT = 2;
	public final static int APPLET_START = 3;
	public final static int APPLET_READY = 35; // SwingJS
	public final static int APPLET_STOP = 4;
	public final static int APPLET_DESTROY = 5;
	public final static int APPLET_QUIT = 6;
	public final static int APPLET_ERROR = 7;
	public final static int APPLET_DISPOSE = 75; // SwingJS

	/* send to the parent to force relayout */
	public final static int APPLET_RESIZE = 51234;

	/*
	 * sent to a (distant) parent to indicate that the applet is being loaded or
	 * as completed loading
	 */
	public final static int APPLET_LOADING = 51235;
	public final static int APPLET_LOADING_COMPLETED = 51236;

	/**
	 * The current status. One of: APPLET_DISPOSE, APPLET_LOAD, APPLET_INIT,
	 * APPLET_START, APPLET_STOP, APPLET_DESTROY, APPLET_ERROR.
	 */
	private int status = APPLET_UNINITIALIZED;

	private AppletListener listeners;

	/**
	 * SwingJS initialization is through a Hashtable provided by the page
	 * JavaScript
	 * 
	 * After the applet is instantiated is the opportunity to add a listener using
	 * setAppletListener(x), where x.appletStateChanged(AppletEvent evt) exists
	 * 
	 * next command on page should be appletPanel.start();
	 * 
	 * @param params
	 */
	public JSAppletPanel(Hashtable params) {
		setPanel();
		set(params);
	}

	private void set(Hashtable params) {
		System.out.println("JSAppletPanel initializing");
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
			Math.max(((Integer) params.get("maximumSize")).intValue(), 100);
		async = (testAsync || params.containsKey("async"));
		HTML5Applet applet = null;
		String javaver = "?";
		/**
		 * @j2sNative
		 * 
		 *            if(self.Jmol) { applet =
		 *            Jmol._applets[this.htmlName.split("_object")[0]]; javaver =
		 *            Jmol._version; }
		 * 
		 * 
		 */
		{
		}
		html5Applet = applet;
		strJavaVersion = javaver;
		strJavaVendor = "Java2Script/Java 1.6 (HTML5)";
		// String platform = (String) params.get("platform");
		// if (platform != null && platform.length() > 0)
		// apiPlatform = (GenericPlatform) Interface.getInterface(platform);
		display = params.get("display");

		threadGroup = new JSThreadGroup(appletName);
		myThread = new JSAppletThread(this, threadGroup, appletName);
		((JSThreadGroup) threadGroup).setHtmlApplet(html5Applet);
		/**
		 * @j2sNative
		 * 
		 *            Jmol._applets[this.appletName + "_thread"] =
		 *            jsjava.lang.Thread.thisThread = this.myThread; 
		 * 
		 */
		{
		}
		appContext = JSToolkit.createNewAppContext();
		Toolkit.getDefaultToolkit();
		System.out.println("JSAppletPanel initialized");
	}

	public void start() {
		if (status == APPLET_UNINITIALIZED)
			myThread.start();
		else
			showStatus("already started");
	}

	synchronized public void addAppletListener(AppletListener l) {
		listeners = AppletEventMulticaster.add(listeners, l);
	}

	synchronized public void removeAppletListener(AppletListener l) {
		listeners = AppletEventMulticaster.remove(listeners, l);
	}

	/**
	 * Dispatch event to the listeners..
	 */
	public void dispatchAppletEvent(int id, Object argument) {
		if (listeners != null) {
			AppletEvent evt = new AppletEvent(this, id, argument);
			listeners.appletStateChanged(evt);
		}
	}

	private String getCode() {
		return getParameter("code");
	}

	private HTML5Canvas getCanvas() {
		if (canvas == null)
			canvas = html5Applet._getHtml5Canvas();
		return canvas;
	}

	// ///////// AppletStub ////////////////

	@Override
	public boolean isActive() {
		return true;
	}

	@Override
	/**
	 * Is called when the applet wants to be resized.
	 */
	public void appletResize(int width, int height) {
		final Dimension currentSize = new Dimension(currentAppletSize.width,
				currentAppletSize.height);
		currentAppletSize.width = width;
		currentAppletSize.height = height;
		applet.setBounds(0, 0, getWidth(), getHeight());
		applet.getRootPane().setBounds(0, 0, getWidth(), getHeight());
		applet.getContentPane().setBounds(0, 0, getWidth(), getHeight());
		((JPanel) applet.getContentPane()).revalidate();
		dispatchAppletEvent(APPLET_RESIZE, currentSize);
	}

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

	// // Panel (Component) ////

	@Override
	public int getHeight() {
		return this.html5Applet._getHeight();
	}

	@Override
	public int getWidth() {
		return this.html5Applet._getWidth();
	}

	@Override
	public void setBounds(int x, int y, int width, int height) {
		reshape(x, y, width, height); // straight to component
		currentAppletSize.width = width;
		currentAppletSize.height = height;
	}

	// /// AppletContext /////

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
		 *            applet = Jmol._applets[name]; applet && (applet =
		 *            applet._applet);
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
		JSToolkit.log(status);
		/**
		 * @j2sNative
		 * 
		 *            Clazz._LoaderProgressMonitor.showStatus(status, true);
		 */
		{
			System.out.println(status);
		}
	}

	// ///////// javajs.api.JSInterface ///////////
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
		//resize(width, height);
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

	/**
	 * @j2sOverride
	 */
	@Override
	public void paint(Graphics g) {
		// Note that this "Panel" is never painted.
		// This class simply maintains valuable information for applet loading.
		// Here we go straight to the contentPane and paint that.
		applet.getContentPane().paint(setGraphics(g));
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
			// did not work /**
			// * @j2sNative
			// *
			// * g.ctx._setLineWidth = function(d) {this.lineWidth = d};
			// * g.ctx._setFont = function(f) {this.font = f};
			// * g.ctx._setFillStyle = function(s) {this.fillStyle = s};
			// * g.ctx._setStrokeStyle = function(s) {this.strokeStyle = s};
			// */
			// {}
			((JSGraphics2D) g).setWindowParameters(getWidth(), getHeight());
		}
		return g;
	}

	private void showAppletStatus(String status) {
		getAppletContext().showStatus(htmlName + " " + status);
	}

	private void showAppletException(Throwable t) {
		/**
		 * @j2sNative
		 * 
		 *            this.showAppletStatus("error " + (t.getMessage ?
		 *            t.getMessage() : t)); t.printStackTrace &&
		 *            t.printStackTrace();
		 */
		{
		}
		repaint();
	}

	/**
	 * 
	 * @param mode
	 * @return LOOP or DONE
	 */
	public int run1(int mode) {
		System.out.println("JSAP run1 mode " + mode + " " + nextStatus);
		boolean ok = false;
		switch (mode) {
		case JSThread.INIT:
			currentAppletSize.width = defaultAppletSize.width = getWidth();
			currentAppletSize.height = defaultAppletSize.height = getHeight();
			setLayout(new BorderLayout());
			nextStatus = APPLET_LOAD;
			ok = true;
			break;
		case JSThread.LOOP:
			switch (nextStatus) {
			case APPLET_LOAD:
				if (status != APPLET_UNINITIALIZED) {
					showAppletStatus("notdisposed");
					status = APPLET_ERROR;
					break;
				}
				System.out.println("JSAppletPanel runloader");
				runLoader(); // applet created here
				nextStatus = APPLET_INIT;
				ok = true;
				break;
			case APPLET_INIT:
				// AppletViewer "Restart" will jump from destroy method to
				// init, that is why we need to check status w/ APPLET_DESTROY
				if (status != APPLET_LOAD && status != APPLET_DESTROY) {
					showAppletStatus("notloaded");
					break;
				}
				System.out.println("JSAppletPanel init");
				applet.resize(defaultAppletSize);
				applet.init();
				// Need the default(fallback) font to be created in this AppContext
				Font f = getFont();
				if (f == null || "dialog".equals(f.getFamily().toLowerCase())// Locale.ENGLISH))
						&& f.getSize() == 12 && f.getStyle() == Font.PLAIN) {
					setFont(new Font(Font.DIALOG, Font.PLAIN, 12));
				}
				validate(); // SwingJS
				status = APPLET_INIT;
				showAppletStatus("initialized");
				nextStatus = APPLET_START;
				ok = true;
				break;
			case APPLET_START:
				if (status != APPLET_INIT && status != APPLET_STOP) {
					showAppletStatus("notstarted");
					status = APPLET_ERROR;
					break;
				}
				applet.getRootPane().addNotify();
				// force peer creation now
				System.out.println("JSAppletPanel start" + currentAppletSize);
				applet.resize(currentAppletSize);
				applet.start();
				status = APPLET_START;
				showAppletStatus("started");
				nextStatus = APPLET_READY;
				ok = true;
				break;
			case APPLET_READY:
				JSToolkit.readyCallback(appletName,fullName,applet,this);
				break;
			case APPLET_STOP:
				if (status == APPLET_START) {
					status = APPLET_STOP;
					applet.setVisible(false);
					applet.stop();
					showAppletStatus("stopped");
				} else {
					showAppletStatus("notstopped");
					status = APPLET_ERROR;
				}
				break;
			case APPLET_DESTROY:
				if (status == APPLET_STOP || status == APPLET_INIT) {
					status = APPLET_DESTROY;
					applet.destroy();
					showAppletStatus("destroyed");
				} else {
					showAppletStatus("notdestroyed");
					status = APPLET_ERROR;
				}
				break;
			case APPLET_DISPOSE:
				if (status == APPLET_DESTROY || status == APPLET_LOAD) {
					showAppletStatus("notdisposed");
					status = APPLET_ERROR;
				} else {
					status = APPLET_UNINITIALIZED;
					removeChild(applet);
					applet = null;
					showAppletStatus("disposed");
				}
				break;
			case APPLET_QUIT:
				break;
			default:
				System.out.println("unrecognized JSAppletPanel status: " + nextStatus);
				break;
			}
			break;
		default:
			System.out.println("unrecognized JSAppletThread mode: " + mode);
			break;
		}
		return (ok ? JSThread.LOOP : JSThread.DONE);
	}

	private void runLoader() {
		dispatchAppletEvent(APPLET_LOADING, null);
		status = APPLET_LOAD;
		String code = getCode();
		try {
			if (code == null) {
				System.err.println("runloader.err-- \"code\" must be specified.");
				throw new InstantiationException("\"code\" must be specified.");
			}
			applet = (JApplet) JSToolkit.getInstance(code);
			if (!(applet instanceof JApplet)) {
				System.out.println(code + "is not a JApplet!?");
				status = APPLET_ERROR;
			}
		} catch (InstantiationException e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} catch (Exception e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} catch (ThreadDeath e) {
			status = APPLET_ERROR;
			showAppletStatus("death");
			return;
		} catch (Error e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} finally {
			// notify that loading is no longer going on
			dispatchAppletEvent(APPLET_LOADING_COMPLETED, null);
		}
		if (applet != null) {
			applet.setStub(this);
			applet.setVisible(false);
			add("Center", applet);
			showAppletStatus("loaded");
			validate();
		}
	}

}