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
import jsjava.awt.peer.FramePeer;
import jsjava.awt.peer.WindowPeer;
import jsjavax.swing.JComponent;
import jssun.awt.CausedFocusEvent.Cause;
import swingjs.JSGraphicsEnvironment;
import swingjs.JSThreadGroup;
import swingjs.api.HTML5Applet;

public class JSWindowUI extends JSPanelUI implements FramePeer /* and thus WindowPeer*/ {

	// adds window closing controls to a panel in making a frame or dialog
	
	Window window;
	boolean isFrame;
	HTML5Applet applet;
	Graphics2D graphics;
	private Font font;

	/**
	 * The window peer handles creating an off-line graphics for a JFrame,
	 * JDialog, JWindow, or JApplet when JComponent.getGraphics() is invoked. This
	 * will need to be sized, perhaps. The graphics is intended to provide
	 * information about fonts, if nothing else.
	 * 
	 * 
	 * Lots to do here
	 * 
	 * @author Bob Hanson
	 */
	@Override
	public WindowPeer setFrame(Window target, boolean isFrame) {
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

	// ///////// not implemented /////////////////

	@Override
	public Insets getInsets() {
		return new Insets(0, 0, 0, 0);	
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
	public boolean isObscured() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean canDetermineObscurity() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setVisible(boolean b) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setEnabled(boolean b) {
		// TODO Auto-generated method stub

	}

	@Override
	public void paint(Graphics g) {
		// TODO Auto-generated method stub

	}

	@Override
	public void repaint(long tm, int x, int y, int width, int height) {
		// TODO Auto-generated method stub

	}

	@Override
	public void print(Graphics g) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEvent(AWTEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void coalescePaintEvent(PaintEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public Point getLocationOnScreen() {
		// TODO Auto-generated method stub
		return new Point();
	}

	@Override
	
	
	public Dimension getPreferredSize() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Dimension getMinimumSize() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ColorModel getColorModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void dispose() {
		// TODO Auto-generated method stub

	}

	@Override
	public void setForeground(Color c) {
		// would happen on foreground color change
	}

	@Override
	public void setBackground(Color c) {
		// TODO Auto-generated method stub

	}

	
	@Override
	public void setFont(Font f) {
		font = f;
	}

	@Override
	public void updateCursorImmediately() {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary,
			boolean focusedWindowChangeAllowed, long time, Cause cause) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isFocusable() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Image createImage(ImageProducer producer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image createImage(int width, int height) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public VolatileImage createVolatileImage(int width, int height) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean prepareImage(Image img, int w, int h, ImageObserver o) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int checkImage(Image img, int w, int h, ImageObserver o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public GraphicsConfiguration getGraphicsConfiguration() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean handlesWheelScrolling() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Image getBackBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void destroyBuffers() {
		// TODO Auto-generated method stub

	}

	@Override
	public void reparent(ContainerPeer newContainer) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean isReparentSupported() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void layout() {
		// TODO Auto-generated method stub

	}

	@Override
	public Rectangle getBounds() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void toFront() {
		// TODO Auto-generated method stub

	}

	@Override
	public void toBack() {
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
	public void setTitle(String title) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setMenuBar(Object mb) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setResizable(boolean resizeable) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setState(int state) {
		// TODO Auto-generated method stub

	}

	@Override
	public int getState() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void setMaximizedBounds(Rectangle bounds) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBoundsPrivate(int x, int y, int width, int height) {
		// TODO Auto-generated method stub

	}

	@Override
	public Rectangle getBoundsPrivate() {
		// TODO Auto-generated method stub
		return null;
	}

}
