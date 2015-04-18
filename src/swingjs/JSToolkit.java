package swingjs;

import java.net.URL;
import java.util.Hashtable;
import java.util.Map;

import jsjava.awt.AWTEvent;
import jsjava.awt.Component;
import jsjava.awt.Dialog.ModalExclusionType;
import jsjava.awt.Dialog.ModalityType;
import jsjava.awt.Dimension;
import jsjava.awt.EventQueue;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
import jsjava.awt.Window;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.lang.Thread;
import jsjavax.swing.JComponent;
import jsjavax.swing.UIDefaults;
import jssun.awt.AppContext;
import jssun.awt.PostEventQueue;
import jssun.awt.SunToolkit;
import swingjs.api.HTMLCanvasContext2D;
import swingjs.api.Interface;
import swingjs.api.JQuery;
import swingjs.plaf.JSComponentUI;
import swingjs.plaf.SwingJSLookAndFeel;

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
		{}
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

	public static void dispatchSystemEvent(Runnable runnable) {
		Object f = null;
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
		Object f = null;
		int id = ++dispatchID;
		/**
		 * @j2sNative
		 * 
		 *            System.out.println("JST dispatchAWTEvent andWait=" + andWait +
		 *            "," + event + " src=" + src); f = function()
		 *            {System.out.println("JST dispatching AWTEvent " + event); if
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
		 *            System.out.println("setTimeout " + id); 
		 *            SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; 
		 *            if (f.run)
		 *             f.run();
		 *            else
		 *             f();
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
	private static void invokeAndWait(Object f, int id) {
		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            var thread0 = thread;
		 *            (function(_JSToolkit_setTimeout) {
		 *            var id0 = SwingJS.eventID || 0;
		 *            System.out.println("runNow " + id); SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; 
		 *            if (f.run)
		 *             f.run();
		 *            else
		 *             f();
		 *            SwingJS.eventID = id0;
		 *            java.lang.Thread.thisThread = thread0; 
		 *            })();
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	public static boolean isDispatchThread() {
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

}
