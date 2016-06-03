package swingjs;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Hashtable;
import java.util.Map;

import javajs.util.AU;
import javajs.util.Rdr;
import javajs.util.SB;
import jsjava.awt.AWTEvent;
import jsjava.awt.Color;
import jsjava.awt.Component;
import jsjava.awt.Dialog.ModalExclusionType;
import jsjava.awt.Dialog.ModalityType;
import jsjava.awt.Dimension;
import jsjava.awt.EventQueue;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Frame;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
import jsjava.awt.Window;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.BufferedImageOp;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageConsumer;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.awt.image.Raster;
import jsjava.awt.image.RasterOp;
import jsjava.awt.image.WritableRaster;
import jsjava.awt.peer.FramePeer;
import jsjava.awt.peer.LightweightPeer;
import jsjava.awt.peer.WindowPeer;
import jsjavax.swing.JComponent;
import jsjavax.swing.UIDefaults;
import jsjavax.swing.UIManager;
import jsjavax.swing.text.Document;
import jssun.awt.AppContext;
import jssun.awt.PostEventQueue;
import jssun.awt.SunToolkit;
import swingjs.api.HTML5Applet;
import swingjs.api.HTML5CanvasContext2D;
import swingjs.api.Interface;
import swingjs.api.JQuery;
import swingjs.api.JSFunction;
import swingjs.plaf.JSComponentUI;

@J2SIgnoreImport(URL.class)
public class JSToolkit extends SunToolkit {

	/*
	 * NOTE: This class is constructed from jsjava.awt.Toolkit.getDefaultToolkit()
	 * 
	 */

	public JSToolkit() {
		super();
		System.out.println("JSToolkit initialized");
	}

	/**
	 * important warnings for TODO list
	 *  
	 * @param msg
	 */
	public static void warn(String msg) {
		alert(msg);
	}

  /**
	 * JavaScript alert
	 */
	public static void alert(Object object) {
		/**
		 * @j2sNative
		 * 
		 * console.log("[JSToolkit] " + object);
		 * alert("[JSToolkit] " + object);
		 */
		{
			System.out.println(object);
		}
	}

	/**
	 * JavaScript console.log
	 */
	public static void log(String msg) {
		/**
		 * @j2sNative
		 * 
		 * System.out.println(msg);
		 * console.log(msg);
		 */
		{}
	}

	/**
	 * JavaScript confirm
	 * 
	 */
	public static boolean confirm(String msg) {
		/**
		 * @j2sNative
		 * 
		 * return confirm(msg);
		 */
		{
			return false;
		}
	}

	/**
	 * JavaScript confirm
	 * 
	 */
	public static String prompt(String msg, String defaultRet) {
		/**
		 * @j2sNative
		 * 
		 * return confirm(msg, defaultRet);
		 */
		{
			return null;
		}
	}

	/**
	 * for SwingJS debugging
	 * 
	 * @param isPost
	 * @return
	 */
	public static Object getPostEventQueue(boolean isPost) {
		return (isPost ? (PostEventQueue) AppContext.getAppContext().get(
				POST_EVENT_QUEUE_KEY) : (EventQueue) AppContext.getAppContext().get(
				AppContext.EVENT_QUEUE_KEY));
	}

	// ////// jsjava.awt.Toolkit /////////

	@SuppressWarnings("unused")
	@Override
	public Dimension getScreenSize() {
		Dimension d = new Dimension(0, 0);
		JQuery jq = getJQuery();

		/**
		 * @j2sNative
		 * 
		 *  d.setSize(jq.$(window).width(), jq.$(window).height()); return d;
		 */
		{
			return null;
		}
	}

	@Override
	public int getScreenResolution() {
		// n/a
		return 0;
	}

	@Override
	public ColorModel getColorModel() {
		return ColorModel.getRGBdefault();
	}

	@Override
	public String[] getFontList() {
		String[] hardwiredFontList = { Font.SANS_SERIF, Font.SANS_SERIF, Font.SERIF,
				Font.MONOSPACED, Font.DIALOG_INPUT

		// -- Obsolete font names from 1.0.2. It was decided that
		// -- getFontList should not return these old names:
		// "Helvetica", "TimesRoman", "Courier", "ZapfDingbats"
		};
		return hardwiredFontList;
	}

	@Override
	public void sync() {
		// n/a?
	}

	// ////// sun.awt.SunToolkit /////////

	@Override
	public boolean isModalExclusionTypeSupported(
			ModalExclusionType modalExclusionType) {
		return true;
	}

	@Override
	public boolean isModalityTypeSupported(ModalityType modalityType) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isTraySupported() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected int getScreenWidth() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected int getScreenHeight() {
		// TODO Auto-generated method stub
		return 0;
	}

//	@Override
//	protected boolean syncNativeQueue(long timeout) {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
	@Override
	public void grab(Window w) {
		// TODO Auto-generated method stub

	}

	@Override
	public void ungrab(Window w) {
		// TODO Auto-generated method stub

	}

	// /////////////////// Special SwingJS calls /////////////////////////

	/**
	 * get a property that is not just a String (not implemented)
	 * 
	 * @param t
	 * @param key
	 * @param def
	 * @return
	 */
	public static Object getPropertyObject(Object t, String key, Object def) {
		return def;
	}

	/**
	 * Load a class that has a () constructor.
	 * 
	 * @param className
	 * @return may be null
	 */
	public static Object getInstance(String className) {
		return swingjs.api.Interface.getInstance(className, false);
	}

	private static GraphicsConfiguration gc;
	private static HTML5CanvasContext2D defaultContext;

	public static GraphicsConfiguration getGraphicsConfiguration() {
		// TODO Auto-generated method stub
		return (gc == null ? gc = (GraphicsConfiguration) getInstance("swingjs.JSGraphicsConfiguration")
				: gc);
	}

	public static boolean isFocused(Window window) {
		// TODO Auto-generated method stub
		return false;
	}

	/**
	 * generates proper font name for JSGraphics2d Apparently Java sizes are
	 * pixels, not points. Not sure on this...
	 * 
	 * @param font
	 * @return "italic bold 10pt Helvetica"
	 */
	public static String getCSSFont(Font font) {
		String css = "";
		if (font.isItalic())
			css += "font-style:italic;";
		if (font.isBold())
			css += "font-weight:bold;";
		css += "font-size:" + font.getSize() + "px;";
		css += "font-family:" + font.getFamily() + ";";
		return css;
	}

	public static float getStringWidth(HTML5CanvasContext2D context, Font font,
			String text) {
		@SuppressWarnings("unused")
		String fontInfo = getCanvasFont(font);
		if (context == null)
			context = getDefaultCanvasContext2d();
		int w = 0;
		/**
		 * @j2sNative
		 * context.font = fontInfo; 
		 * w = Math.ceil(context.measureText(text).width);
		 */
		{
		}
		return w;
	}

	public static HTML5CanvasContext2D getDefaultCanvasContext2d() {
		/**
		 * @j2sNative
		 * 
		 *            if (this.defaultContext == null) this.defaultContext =
		 *            document.createElement( 'canvas' ).getContext('2d');
		 */
		{}
		return defaultContext;
	}

	/**
	 * generates proper font name for JSGraphics2d Apparently Java sizes are
	 * pixels, not points. Not sure on this...
	 * 
	 * @param font
	 * @return "italic bold 10pt Helvetica"
	 */
	public static String getCanvasFont(Font font) {
		String strStyle = "";
		if (font.isItalic())
			strStyle += "italic ";
		if (font.isBold())
			strStyle += "bold ";
		// for whatever reason, Java font points are much larger than HTML5 canvas
		// points
		return strStyle + font.getSize() + "px " + font.getFamily();
	}

	/**
	 * Just using name, not family name, here for now
	 * 
	 * @param font
	 * @return CSS family name
	 */
	public static String getFontFamily(Font font) {
		return font.getName();
	}

	/**
	 * In JavaScript we only have one font metric, so we can just save it with the font itself
	 */
	@Override
	public FontMetrics getFontMetrics(Font font) {
		FontMetrics fm = font.getFontMetrics();
		if (fm == null) {
			fm = (FontMetrics) getInstance("swingjs.JSFontMetrics");
			((JSFontMetrics) fm).setFont(font);
			font.setFontMetrics(fm);
		}
		return fm;
	}

	public static String getCSSColor(Color c) {
		String s = "000000" + Integer.toHexString(c.getRGB() & 0xFFFFFF);
		return "#" + s.substring(s.length() - 6);
	}

	private static Map<String, Boolean> mapNotImpl;

	/**
	 * report ONCE to System.out; can check in JavaScript
	 * 
	 * @param msg
	 *          TODO
	 * 
	 */
	public static void notImplemented(String msg) {
		String s = null;
		if (mapNotImpl == null)
			mapNotImpl = new Hashtable<String, Boolean>();
		/**
		 * @j2sNative
		 * 
		 *            s = arguments.callee.caller; s = s.__CLASS_NAME__ ||
		 *            s.claxxOwner.__CLASS_NAME__; s += "." +
		 *            arguments.callee.caller.exName;
		 */
		{
		}
		if (mapNotImpl.containsKey(s))
			return;
		mapNotImpl.put(s, Boolean.TRUE);
		System.out.println(s + " has not been implemented in SwingJS. "
				+ (msg == "" ? "" : (msg == null ? "" : msg) + getStackTrace(-5)));

	}

	public static String getStackTrace() {
		/**
		 * @j2sNative
		 * 
		 *            return Clazz.getStackTrace();
		 */
		{
			return null;
		}
	}

	public static String getStackTrace(int n) {
		/**
		 * @j2sNative
		 * 
		 *            return Clazz.getStackTrace(n);
		 */
		{
			return null;
		}
	}

	private static UIDefaults uid;

	public static UIDefaults getLookAndFeelDefaults() {
		if (uid == null)
			uid = UIManager.getLookAndFeel().getDefaults();
		return uid;
	}

	public static JSComponentUI getComponentUI(JComponent target) {
		JSComponentUI c = (JSComponentUI) Interface.getInstance("swingjs.plaf.JS"
				+ target.getUIClassID(), true);
		if (c != null)
			c.set(target);
		return c;
	}

	public static String getSwingDivId() {
		return Thread.currentThread().getName() + "_swingdiv";
	}

	/**
	 * Sets window.jQuery.$ = window.jQuery, so that we can call jQuery.$
	 * 
	 * @return an object with $ as a method
	 */
	public static JQuery getJQuery() {
		/**
		 * @j2sNative
		 * 
		 *            if (!window.jQuery) alert(
		 *            "jQuery is required for SwingJS, but window.jQuery is not defined."
		 *            ); jQuery.$ || (jQuery.$ = jQuery); return(jQuery);
		 */
		{
			return null;
		}
	}

	public static String getJavaResource(String resourceName, boolean isJavaPath) {
		System.out.println("JSToolkit getting Java resource " + resourceName);
		/**
		 * @j2sNative
		 * 
		 *            return SwingJS.getJavaResource(resourceName, isJavaPath);
		 */
		{
			return null;
		}
	}

	private static int dispatchID = 0;

	public static void dispatchSystemEvent(Runnable runnable) {
		JSFunction f = null;
		/**
		 * @param eventQueue
		 * @j2sNative
		 * 
		 *            System.out.println("JST dispatchSystemEvent " +
		 *            runnable.run.toString()); f =
		 *            function(_JSToolkit_dispatchSystemEvent) {
		 *            System.out.println("JST running " +
		 *            runnable.run.toString());runnable.run()};
		 */
		{
		}
		setTimeout(f, 0, 0);
	}

	/**
	 * dispatch an event "on the event thread"
	 * @param event
	 * @param src
	 * @param andWait
	 */
	public static void dispatchEvent(AWTEvent event, Object src, boolean andWait) {
		JSFunction f = null;
		int id = ++dispatchID;
		
//		 *            System.out.println("JST dispatchAWTEvent andWait=" + andWait +
//		 *            "," + event + " src=" + src); 
//		 *            System.out.println("JST dispatching AWTEvent " + event); 

		/**
		 * @j2sNative
		 * 
		 *            f = function()
		 *            {
		 *            if
		 *            (src == null) event.dispatch(); else src.dispatchEvent(event);
		 *            };
		 * 
		 */
		{
		}
		if (andWait)
			invokeAndWait(f, id);
		else
			setTimeout(f, 0, id);
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * @param f a function or Runnable
	 * @param msDelay a time to wait for, in milliseconds
	 * @param id an event id or 0 if not via EventQueue 
	 */
	public static void setTimeout(Object f, int msDelay, int id) {
			
		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            var thread0 = thread;
		 *            var id0 = SwingJS.eventID || 0;
		 *            setTimeout(function(_JSToolkit_setTimeout) {
		 *            SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; 
		 *            try {
		 *            if (f.run)
		 *             f.run();
		 *            else
		 *             f();
		 *             } catch (e) {
		 *             var s = "JSToolkit.setTimeout(" + id +"): " + e;
		 *             System.out.println(s);
		 *             alert(s)}
		 *            SwingJS.eventID = id0; 
		 *            java.lang.Thread.thisThread = thread0; 
		 *            }, msDelay);
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * 
	 * @param f a function or Runnable
	 * @param id an event id or 0 if not via EventQueue 
	 */
	private static void invokeAndWait(JSFunction f, int id) {
		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            var thread0 = thread;
		 *            (function(_JSToolkit_setTimeout) {
		 *              var id0 = SwingJS.eventID || 0;
		 *              System.out.println("runNow " + id); SwingJS.eventID = id;
		 *              java.lang.Thread.thisThread = thread; 
		 *              if (f.run)
		 *                f.run();
		 *              else
		 *                f();
		 *              SwingJS.eventID = id0;
		 *              java.lang.Thread.thisThread = thread0; 
		 *            })();
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	public static boolean isDispatchThread() {
//		 *            System.out.println("checking dispatch thread " +
//		 *            SwingJS.eventID); 
//		 *            
		/**
		 * @j2sNative
		 * 
		 *            return (!!SwingJS.eventID);
		 * 
		 */
		{
			return false;
		}
	}

	/**
	 * 
	 * check if a J2S class implements a specific method with a specific signature
	 * 
	 * @param component
	 * @param fname
	 *          "coalesceEvents
	 * @param signature
	 *          "\\jsjava.awt.AWTEvent\\jsjava.awt.AWTEvent"
	 * @return
	 */
	public static boolean checkClassMethod(Component component, String fname,
			String signature) {
		/**
		 * @j2sNative
		 * 
		 *            return component[fname] && component[fname][signature];
		 * 
		 */
		{
			return false;
		}
	}

	public static void readyCallback(String aname, String fname, Object a,
			Object me) {
		/**
		 * 
		 * @j2sNative
		 * 
		 *            Jmol._readyCallback(aname, fname, true,a, me);
		 * 
		 */
		{
		}
	}

	public static void forceRepaint(Component c) {
		// NO LONGER NECESSARY :)
//		System.out.println("JSToolkit not forcing paint on component " + c.getName());
//		try {
//			getHTML5Applet((JComponent) c)._repaintNow();
//		} catch (Throwable e) {
//			alert("Repaint error:" + e);
//		}
	}
	
	public static HTML5Applet getHTML5Applet(JComponent c) {
		return ((JSThreadGroup) c.getAppContext().getThreadGroup()).getHtmlApplet();
	}

	public static void taintUI(Component c) {
		// JApplet is a JComponent, but it does not have a getUI
		// some components may have getUI but currently no UI
		
		/**
		 * @j2sNative
		 * 
		 * c.getUI && c.getUI() && c.getUI().setTainted(); 
		 * 
		 */
		{}
	}

	/**
	 * Provide a LightweightPeer for all Components. The JSComponentUI itself
	 * serves as a peer for all JComponents; others will need the generic jSComponentPeer
	 *  
	 */
	@Override
  protected LightweightPeer createComponent(Component target) {
  	System.out.println("JSToolkit creating LightweightPeer for " +  target);
  	LightweightPeer peer = getUI(target, true);
  	// JLayeredPane will need JSComponentPeer ?
  	return (peer == null ? new JSComponentPeer(target) : peer);
  }

	public static Document getPlainDocument(JComponent c) {
		return (Document) getInstance("swingjs.JSPlainDocument");
	}

	public static String getClassName(Object c) {
		/**
		 * @j2sNative
		 * 
		 *            return c.__CLASS_NAME__;
		 * 
		 */
		{
			return null;
		}
	}

	/**
	 * A protected version of Rdr.getStreamAsBytes
	 * @param bis
	 * @return
	 */
	public static byte[] getSignedStreamBytes(BufferedInputStream bis) {
		try {
			return AU.ensureSignedBytes((byte[]) Rdr.getStreamAsBytes(bis, null));
		} catch (IOException e) {
			return null;
		}
	}

	/**
	 * This could be a simple String, a javajs.util.SB, or unsigned or signed bytes
	 * depending upon the browser and the file type.
	 * 
	 * @param uri
	 * @return
	 */
	public static Object getFileContents(String uri) {
		/**
		 * @j2sNative
		 * 
		 * return Jmol._getFileData(uri);
		 */
		{
			try {
				return Rdr.StreamToUTF8String(new BufferedInputStream((InputStream) new URL(uri).getContent()));
			} catch (Exception e) {
				return null;
			}
		}
	}


	/**
	 * Regardless of how returned by Jmol._getFileContents(), 
	 * this method ensures that we get signed bytes.
	 * 
	 * @param filename
	 * @return
	 */
	public byte[] getFileAsBytes(String filename) {
		Object data = getFileContents(filename);
		byte[] b = null;
		if (AU.isAB(data))
			b = (byte[]) data;
		else if (data instanceof String) 
			b = ((String) data).getBytes();
		else if (data instanceof SB)
			b = Rdr.getBytesFromSB((SB) data);
		else if (data instanceof InputStream)
			try {
				b = Rdr.getLimitedStreamBytes((InputStream) data, -1);
			} catch (IOException e) {
			}
		return AU.ensureSignedBytes(b);
	}


	//////////////// images ///////////////
	
	private JSImagekit imageKit;
	
	private JSImagekit getImagekit() {
		return (imageKit == null ? imageKit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit", false) : imageKit);
	}

	@Override
	public Image createImage(ImageProducer producer) {
		JSImagekit kit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit", false);
		producer.startProduction(kit); // JSImageKit is the ImageConsumer here
		return kit.getCreatedImage();
	}

	@Override
	public Image createImage(String filename) {
		return getImagekit().createImageFromBytes(getSignedStreamBytes(new BufferedInputStream(new ByteArrayInputStream(getFileAsBytes(filename)))), 0, -1);
	}

	@Override
	public Image createImage(URL url) {
		try {
			return getImagekit().createImageFromBytes(getSignedStreamBytes(new BufferedInputStream(url.openStream())), 0, -1);
		} catch (IOException e) {
			return null;
		}
	}

	@Override
	public Image createImage(byte[] data, int imageoffset, int imagelength) {
		return getImagekit().createImageFromBytes(data, imageoffset, imagelength);
	}
	
	@Override
	public int checkImage(Image image, int width, int height,
			ImageObserver observer) {
		return 63; // everything is here -- always has been - images are loaded asynchronously
	}

	@Override
	public boolean prepareImage(Image image, int width, int height,
			ImageObserver observer) {
		// It's all synchronous
		return true;
	}

	public static boolean hasFocus(Component c) {
	  JSComponentUI ui = getUI(c, false);
		return (ui != null && ui.hasFocus());
	}

	public static JSComponentUI getUI(Component c, boolean isQuiet) {
		JSComponentUI ui = null;
		/**
		 * @j2sNative
		 * 
		 *  ui = c.getUI && c.getUI();
		 */
		{
			ui = (JSComponentUI) ((JComponent) c).getUI();
		}
	  if (ui == null) {
	  	String s = "[JSToolkit] Component " + c.getClass().getName() + " has no cooresponding JSComponentUI.";
//	  	if (isQuiet)
	  		System.out.println(s);
//	  	else
//		  	alert(s + getStackTrace());
	  }
	  return ui;
	}

	public static boolean requestFocus(Component c) {
		final JSComponentUI ui = getUI(c, false);
		if (ui == null || !ui.isFocusable())
			return  false;
		Runnable r = new Runnable() {

			@Override
			public void run() {
				ui.requestFocus(null, false, false, 0, null);
			}
			
		};
		setTimeout(r, 50, 0);
		return true;
	}

	private static JSGraphicsCompositor compositor;

  static JSGraphicsCompositor getCompositor() {
		return (compositor == null ? compositor = (JSGraphicsCompositor) Interface
				.getInstance("swingjs.JSGraphicsCompositor", false) : compositor);
	}

	public static boolean setGraphicsCompositeAlpha(JSGraphics2D g, int rule) {
		return getCompositor().setGraphicsCompositeAlpha(g, rule);
	}

	public static boolean drawImageOp(JSGraphics2D g,
			BufferedImage img, BufferedImageOp op, int x, int y) {
		return getCompositor().drawImageOp(g, img, op, x, y);
	}

	public static WritableRaster filterRaster(Raster src, WritableRaster dst,
			RasterOp op) {
		return getCompositor().filterRaster(src, dst, op);
	}

	public static BufferedImage filterImage(BufferedImage src, BufferedImage dst,
			BufferedImageOp op) {
		return getCompositor().filterImage(src, dst, op);
	}

	public static int getZIndex(JSComponentUI ui, String what) {
		/**
		 * looking for high-level content pane
		 * 
		 * @j2sNative
		 * 
		 * if (what) return getHTML5Applet(ui.c)._z[what];
		 * var c = ui.domNode; var z;
		 * while (c && !(z = c.style["z-index"])) {
		 *  c = c.parentNode;
		 * }
		 * return z || 100000;
		 */
		{
			return 0;
		}
	}

	@Override
	protected FramePeer createFrame(Frame target) {
		return (FramePeer) createWindowPeer(target, true);
	}

	@Override
	protected WindowPeer createWindow(Window target) {
		return createWindowPeer(target, false);
	}

	private WindowPeer createWindowPeer(Window target, boolean isFrame) {
		return ((WindowPeer) getInstance("swingjs.JSWindowPeer")).setFrame(target, true);
	}

}
