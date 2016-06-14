package swingjs.plaf;

import jsjava.awt.AWTEvent;
import jsjava.awt.Color;
import jsjava.awt.Component;
import jsjava.awt.Dialog;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics;
import jsjava.awt.Graphics2D;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.Image;
import jsjava.awt.Insets;
import jsjava.awt.Point;
import jsjava.awt.Rectangle;
import jsjava.awt.Toolkit;
import jsjava.awt.Window;
import jsjava.awt.event.PaintEvent;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.awt.image.VolatileImage;
import jsjava.awt.peer.ContainerPeer;
import jsjava.awt.peer.WindowPeer;
import jsjavax.swing.JComponent;
import jssun.awt.CausedFocusEvent.Cause;
import swingjs.JSGraphicsEnvironment;
import swingjs.JSThreadGroup;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Applet;

public class JSWindowUI extends JSComponentUI implements WindowPeer {

	
	protected int frameZ;
	protected boolean isFrame;
	protected Window window;
	protected HTML5Applet applet;
	protected Graphics2D graphics;
	protected Font font;

	/*
	 * Not Lightweight; an independent space with RootPane, LayeredPane,
	 * ContentPane, (optional) MenuBar, and GlassPane
	 * 
	 * 
	 * Used by JWindow, JFrame, JDialog, and JPopupMenu
	 * 
	 * 
	 * Lots to do here
	 * 
	 * @author Bob Hanson
	 */
	@Override
	public WindowPeer setFrame(Window target, boolean isFrame) {
		frameZ = 19000;
		this.isFrame = isFrame;
		window = target;
		JComponent jc = (JComponent) (Object) this;
		jc.myThread = Thread.currentThread();
		jc.threadGroup = jc.myThread.getThreadGroup();
		applet = ((JSThreadGroup) jc.threadGroup).getHtmlApplet();
		graphics = ((JSGraphicsEnvironment) GraphicsEnvironment
				.getLocalGraphicsEnvironment()).createGraphicsSized(target, 500, 300);
		return this;
	}

	@Override
	public DOMNode createDOMNode() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Graphics getGraphics() {
		// and also set the font for the component.
		graphics.setFont(window.getFont());
		return graphics;
	}

	@Override
	public Toolkit getToolkit() {
		return Toolkit.getDefaultToolkit();
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		if (!font.equals(this.font))
			this.window.setFont(this.font = font);
		return graphics.getFontMetrics(font);
	}

	@Override
	public Insets getInsets() {
		return new Insets(30, 2, 2, 2);
	}

	@Override
	public void beginValidate() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void endValidate() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beginLayout() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void endLayout() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void toFront() {
		System.out.println("window to front for " + c.htmlName);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void toBack() {
		System.out.println("window to back for " + c.htmlName);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAlwaysOnTopState() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFocusableWindowState() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean requestWindowFocus() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setModalBlocked(Dialog blocker, boolean blocked) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateMinimumSize() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateIconImages() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOpacity(float opacity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOpaque(boolean isOpaque) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateWindow(BufferedImage backBuffer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void repositionSecurityWarning() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void installJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}
