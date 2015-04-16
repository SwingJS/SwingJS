package swingjs;

//import java.lang.reflect.Constructor;
import java.net.URL;
//import java.security.PrivilegedAction;
import java.util.Hashtable;
import java.util.Map;

import swingjs.api.HTMLCanvasContext2D;
import swingjs.api.Interface;
import swingjs.api.JQuery;
import swingjs.plaf.JSComponentUI;
import swingjs.plaf.SwingJSLookAndFeel;

import jsjava.awt.AWTEvent;
import jsjava.awt.Dimension;
import jsjava.awt.EventQueue;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
import jsjava.awt.Dialog.ModalExclusionType;
import jsjava.awt.Dialog.ModalityType;
import jsjava.awt.Window;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.lang.Thread;
//import jsjava.lang.ThreadGroup;
import jsjavax.swing.JComponent;
import jsjavax.swing.UIDefaults;
import jssun.awt.AppContext;
import jssun.awt.SunToolkit;

public class JSToolkit extends SunToolkit {

	/*
	 * NOTE: This class is called from jsjava.awt.Toolkit within in j2sNative
	 * block.
	 */

	public JSToolkit() {
		/*
		 * If awt.threadgroup is set to class name the instance of this class is
		 * created (should be subclass of ThreadGroup) and EventDispatchThread is
		 * created inside of it
		 * 
		 * If loaded class overrides uncaughtException instance handles all uncaught
		 * exception on EventDispatchThread
		 */
		// ThreadGroup threadGroup = new ThreadGroup("AWT-ThreadGroup");
		AppContext appContext = AppContext.getAppContext();
		// EventQueue postEventQueue = ;
		// PostEventQueue postEventQueue = new PostEventQueue(eventQueue);
		appContext.put(POST_EVENT_QUEUE_KEY, new EventQueue());
		// if (threadGroup != null) {
		// Thread eqInitThread = new Thread(threadGroup, initEQ, "EventQueue-Init");
		// eqInitThread.start();
		// try {
		// eqInitThread.join();
		// } catch (InterruptedException e) {
		// System.out.println("Suntoolkit error in threadgroup " + e);
		// e.printStackTrace();
		// }
		// } else {
		// initEQ.run();
		// }
		System.out.println("JSToolkit initialized");
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
		 *            d.setSize(jq.$(window).width(), jq.$(window).height()); return
		 *            d;
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Deprecated
	public String[] getFontList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void sync() {
		// n/a?
	}

	@Override
	public Image getImage(String filename) {
		// TODO Auto-generated method stub
		return getImageObj(filename);
	}

	@Override
	public Image getImage(URL url) {
		return getImageObj(url);
	}

	private Image getImageObj(Object nameOrURL) {
		// send off to get this
		return null;
	}

	@Override
	public Image createImage(String filename) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image createImage(URL url) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean prepareImage(Image image, int width, int height,
			ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int checkImage(Image image, int width, int height,
			ImageObserver observer) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Image createImage(ImageProducer producer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image createImage(byte[] imagedata, int imageoffset, int imagelength) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isModalityTypeSupported(ModalityType modalityType) {
		// TODO Auto-generated method stub
		return false;
	}

	// ////// sun.awt.SunToolkit /////////

	@Override
	public boolean isModalExclusionTypeSupported(
			ModalExclusionType modalExclusionType) {
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

	@Override
	protected boolean syncNativeQueue(long timeout) {
		// TODO Auto-generated method stub
		return false;
	}

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
	private static HTMLCanvasContext2D defaultContext;

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

	public static float getStringWidth(HTMLCanvasContext2D context, Font font,
			String text) {
		@SuppressWarnings("unused")
		String fontInfo = getCanvasFont(font);
		if (context == null)
			context = getDefaultCanvasContext2d();
		/**
		 * context.font = fontInfo; return
		 * Math.ceil(context.measureText(text).width);
		 */
		{
			return 0;
		}
	}

	public static HTMLCanvasContext2D getDefaultCanvasContext2d() {
		/**
		 * @j2sNative
		 * 
		 *            if (this.defaultContext == null) this.defaultContext =
		 *            document.createElement( 'canvas' ).getContext('2d');
		 */
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
		// SwingJS TODO
		String name = font.getName();
		if (name.equalsIgnoreCase("Display"))
			return "Courier";
		return name;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		JSFontMetrics fm = (JSFontMetrics) getInstance("swingjs.JSFontMetrics");
		fm.setFont(font);
		return fm;
	}

	private static Map<String, Boolean> mapNotImpl;

	/**
	 * report ONCE to System.out; can check in JavaScript
	 * 
	 */
	public static void notImplemented() {
		String s = null;
		if (mapNotImpl == null)
			mapNotImpl = new Hashtable<String, Boolean>();
		/**
		 * @j2sNative
		 * 
		 *            s = arguments.callee.caller.exClazz &&
		 *            arguments.callee.caller.exClazz.__CLASS_NAME__; s += "." +
		 *            arguments.callee.caller.exName;
		 * 
		 */
		{
		}
		if (mapNotImpl.containsKey(s))
			return;
		mapNotImpl.put(s, Boolean.TRUE);
		System.out.println(s + " has not been implemented in SwingJS."
				+ getStackTrace(-5));

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
			uid = ((SwingJSLookAndFeel) getInstance("swingjs.plaf.SwingJSLookAndFeel"))
					.getDefaults();
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

	public static String getJavaResource(String resourceName) {
		System.out.println("JSToolkit getting Java resource " + resourceName);
		/**
		 * @j2sNative
		 * 
		 *            return SwingJS.getJavaResource(resourceName);
		 */
		{
			return null;
		}
	}

	private static int dispatchID = 0;

	public static void postSystemEvent(Runnable runnable) {
		Object f = null;
		/**
		 * @param eventQueue
		 * @j2sNative
		 * 
		 *            System.out.println("JST postSystemEvent " +
		 *            runnable.run.toString()); f =
		 *            function(_JSToolkit_postSystemEvent) {
		 *            System.out.println("JST running " +
		 *            runnable.run.toString());runnable.run()};
		 */
		{
		}
		setTimeout(f);
	}

	public static void postJavaEvent(EventQueue eventQueue, AWTEvent event,
			int priority) {
		Object f = null;
		/**
		 * @j2sNative
		 * 
		 *            System.out.println("JST postJavaEvent " + event); f =
		 *            function() {System.out.println("JST dispatching event " +
		 *            event); eventQueue.dispatchEvent(event)};
		 * 
		 */
		{
		}
		setTimeout(f);
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * @param f
	 */
	private static void setTimeout(Object f) {
		int id = ++dispatchID;

		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            setTimeout(function(_JSToolkit_setTimeout) {
		 *            
		 *            SwingJS.eventID = id; 
		 *            java.lang.Thread.thisThread = thread; 
		 *            f(); 
		 *            delete SwingJS.eventID;
		 *            });
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	public static boolean isDispachThread() {
		/**
		 * @j2sNative
		 * 
		 *            System.out.println("checking dispatch thread " +
		 *            SwingJS.eventID); return (!!SwingJS.eventID);
		 * 
		 */
		{
			return false;
		}
	}

}
