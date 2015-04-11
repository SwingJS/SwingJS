package swingjs;

import java.net.URL;

import swingjs.api.HTMLCanvasContext2D;

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
import jssun.awt.SunToolkit;


public class JSToolkit extends SunToolkit {

	/*
	 * NOTE: This class is called from jsjava.awt.Toolkit
	 * within in j2sNative block.
	 * 
	 */
	
	public JSToolkit(){
		System.out.println("JSToolkit initialized");		
	}

	//////// jsjava.awt.Toolkit /////////

	@Override
	public Dimension getScreenSize() {
		Dimension d = new Dimension(0, 0);
		/**
		 * @j2sNative
		 * 
		 * d.setSize(Jmol.$(window).width(), Jmol.$(window).height());
		 * return d;
		 */
		{
			return d;
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
	@Deprecated
	public FontMetrics getFontMetrics(Font font) {
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
	protected EventQueue getSystemEventQueueImpl() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public boolean isModalityTypeSupported(ModalityType modalityType) {
		// TODO Auto-generated method stub
		return false;
	}

	//////// sun.awt.SunToolkit /////////

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
	
	///////////////////// Special SwingJS calls /////////////////////////

	/**
	 * get a property that is not just a String
	 * 
	 * @param t
	 * @param key
	 * @param def
	 * @return
	 */
	public static Object getPropertyObject(Object t, String key, Object def) {
		/**
		 * @j2sNative
		 * switch (key) {
		 * case "graphics":
		 *   return SwingJS.getGraphics(t)
		 *   break;
		 * }
		 * 
		 */
		{}
		return def;
	}

	/**
	 * Load a class that has a () constructor.
	 * 
	 * @param className
	 * @return may be null
	 */
	public static Object getInstance(String className) {
		/**
		 * @j2sNative
		 * 
		 *   return swingjs.api.Interface.getInterface(className);
		 * 
		 */
		{
			return null;
		}
	}

	private static GraphicsConfiguration gc;
	private static HTMLCanvasContext2D defaultContext;

	public static GraphicsConfiguration getGraphicsConfiguration() {
		// TODO Auto-generated method stub
		return (gc == null ? gc = (GraphicsConfiguration) getInstance("swingjs.JSGraphicsConfiguration") : gc);
	}

	public static boolean isFocused(Window window) {
		// TODO Auto-generated method stub
		return false;
	}

	public static int getJqueryInt(Object o, String type) {
		/**
		 * @j2sNative 
		 * 
		 * var d = Jmol.$(o);
		 * switch (type) {
		 * case "width":
		 * return d.width();
		 * break;
		 * case "height":
		 * return d.height();
		 * }
		 *  
		 */
		{
			return 0;
		}
	}

	public static float getStringWidth(HTMLCanvasContext2D context, Font font, String text) {
		@SuppressWarnings("unused")
		String fontInfo = getCanvasFont(font);
		if (context == null)
			context = getDefaultCanvasContext2d();
		/**
	   * context.font = fontInfo;
     * return Math.ceil(context.measureText(text).width);
     */
		{
			return 0;
		}
	}

	public static HTMLCanvasContext2D getDefaultCanvasContext2d() {
		/**
		 * @j2sNative
		 * 
		 * if (this.defaultContext == null)
		 *   this.defaultContext = document.createElement( 'canvas' ).getContext('2d'); 
		 */
		return defaultContext;
	}

	
	/**
	 * generates proper font name for JSGraphics2d
	 * @param font
	 * @return  "italic bold 10pt Helvetica" 
	 */
	public static String getCanvasFont(Font font) {
		String strStyle = "";
		if (font.isItalic())
			strStyle += "italic ";
		if (font.isBold())
			strStyle += "bold ";
		// for whatever reason, Java font points are much larger than HTML5 canvas points
		return strStyle + font.getSize() + "px " + font.getFamily();
	}

	/**
	 * Just using name, not family name, here for now
	 * 
	 * @param font
	 * @return CSS family name 
	 */
	public static String getFontFamily(Font font) {
		//SwingJS TODO
		String name = font.getName();
		if (name.equalsIgnoreCase("Display"))
			return "Courier";
		return name;
	}
	
	
	
	
	
}
