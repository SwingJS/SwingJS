package swingjs;

import jsjava.awt.AWTEvent;
import jsjava.awt.Color;
import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
import jsjava.awt.Insets;
import jsjava.awt.Point;
import jsjava.awt.Rectangle;
import jsjava.awt.Toolkit;
import jsjava.awt.event.PaintEvent;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.awt.image.VolatileImage;
import jsjava.awt.peer.ContainerPeer;
import jsjava.awt.peer.LightweightPeer;
import jsjavax.swing.plaf.ComponentUI;
import jssun.awt.CausedFocusEvent.Cause;

/**
 * A class to provide a JavaScript peer interface for Swing AWT components that
 * have not been developed yet?
 * 
 * @author Bob Hanson
 * 
 */
public class JSNullComponentPeer implements LightweightPeer {

	private Component target;
	private boolean isNull = true;
	
	public JSNullComponentPeer(Component target) {
		this.target = target;
		
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
		return null;
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
	public Toolkit getToolkit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Graphics getGraphics() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void dispose() {
		// TODO Auto-generated method stub

	}

	@Override
	public void setForeground(Color c) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBackground(Color c) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setFont(Font f) {
		// TODO Auto-generated method stub

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
	public Insets getInsets() {
		return null;
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

}
