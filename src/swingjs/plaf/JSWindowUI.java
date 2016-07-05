package swingjs.plaf;

import jsjava.awt.Dialog;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics2D;
import jsjava.awt.Insets;
import jsjava.awt.JSComponent;
import jsjava.awt.Toolkit;
import jsjava.awt.Window;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.peer.WindowPeer;
import jsjavax.swing.JComponent;
import jsjavax.swing.JWindow;
import swingjs.JSAppletViewer;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Applet;

public class JSWindowUI extends JSComponentUI implements WindowPeer {

	protected DOMNode  
	/**************/ frameNode, /*********************/
  /************/ titleBarNode, /********************/
  /**/ titleNode,                      closerNode, //
  /***************/ layerNode, /********************/
  /*************/ menuBarNode; /********************/
  
	protected JWindow w;
	protected int z;

  protected int defaultWidth = 400;
  protected int defaultHeight = 400;
	

	protected boolean isFrame, isDialog;
	protected Window window;
	protected Font font;

	private Graphics2D graphics;

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
		//set((JComponent)(Object)target); // yes, I know it is not a JComponent. This is JavaScript!
		window = target;
		w = (JWindow) window;
		this.isFrame = isFrame;
		isContainer = isWindow = true;
		JSComponent jc = (JSComponent) (Object) this;
		JSAppletViewer viewer = JSToolkit.getAppletViewer();
		applet = viewer.html5Applet;
		graphics = (Graphics2D) jc.getGraphics();
		return this;
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			containerNode = domNode = createDOMObject("div", id);
		}
		return domNode;
	}
	
	@Override
	protected DOMNode setHTMLElement() {
		
		DOMNode node = setHTMLElementCUI();
		return node;		
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
	public void toFront() {
		System.out.println("window to front for " + jc.htmlName);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void toBack() {
		System.out.println("window to back for " + jc.htmlName);
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
	}

	@Override
	public void dispose() {
		JSToolkit.J2S._jsUnsetMouse(domNode);
		DOMNode.remove(outerNode);
	}

	@Override
	public Insets getInsets() {
		return new Insets(0, 0, 0, 0);
	}


}
