package swingjs.plaf;

import swingjs.JSToolkit;
import swingjs.api.DOMObject;
import swingjs.api.JQuery;
import swingjs.api.JQueryObject;
import jsjava.awt.AWTEvent;
import jsjava.awt.Color;
import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
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
import jsjavax.swing.JComponent;
import jsjavax.swing.JRootPane;
import jsjavax.swing.plaf.ComponentUI;
import jssun.awt.CausedFocusEvent.Cause;

/**
 * The JSComponentUI subclasses are where all the detailed HTML5 implementation is 
 * carried out. These subclasses mirror the subclasses found in the actual javax.swing.plaf
 * but have an important difference in that that effectively act as both the UI (a single
 * implementation for a given AppContext in Swing) and a peer (one implementation per component).
 * 
 * So here we store both the constants for the HTML5 "LookAndFeel", but also
 * HTML5 objects that really are on the page. 
 * 
 * Essentially, at least for now, we are not implementing the HTML5LookAndFeel as such. We'll see how that goes. 
 * 
 *  
 *   
 * @author RM
 *
 */
public abstract class JSComponentUI extends ComponentUI implements LightweightPeer {

	protected JComponent c;
	protected String id;
	protected DOMObject tempObj, divObj;
	protected int num;
	protected boolean isTainted = true;
	protected int x, y;
	protected boolean isContainer;
	protected JSComponentUI parent;
	protected static int incr; // SwingJS 
	
	public JSComponentUI() {
		// for reflection
	}

	protected abstract void installJSUI();
	protected abstract void uninstallJSUI();
	
	public void installUI(JComponent c) {
		installJSUI();
	}

	public void uninstallUI(JComponent c) {
		uninstallJSUI();
	}

  public void setTainted() {
  	isTainted = true;
  }
  
  public abstract DOMObject getDOMObject();

	public JSComponentUI set(JComponent target) {
		c = target;
		newID();
		installJSUI();
		return this;
	}

	protected void newID() {
		num = ++incr;
		id = c.getHTMLName(c.getUIClassID()) + "_" + num;
	}

	protected DOMObject setCssFont(DOMObject obj, Font font) {
		if (font != null) {
			int istyle = font.getStyle();
			DOMObject.setStyle(obj, "font-family", font.getFamily(), "font-size",
					font.getSize() + "px", "font-style",
					((istyle & Font.ITALIC) == 0 ? "normal" : "italic"), "font-weight",
					((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
		}
		return obj;
	}

	protected DOMObject createDOMObject(String key, String id, String... attr) {
		DOMObject obj = DOMObject.createElement(key, id);
		for (int i = 0; i < attr.length;)
			DOMObject.setAttr(obj, attr[i++], attr[i++]);
		return obj;
	}

	protected DOMObject wrap(String type, String id, DOMObject... elements) {
		DOMObject obj = createDOMObject(type, id + type);
		for (int i = 0; i < elements.length; i++)
			obj.appendChild(elements[i]);
		return obj;
	}

	private void debugDump(DOMObject d) {
		System.out.println(DOMObject.getAttr(d, "outerHTML"));
	}
	
	protected static void vCenter(DOMObject obj, int offset) {
		DOMObject.setStyle(obj, 
				"top", "50%", 
				"transform","translateY(" + offset + "%)");
	}
	
	protected Dimension setHTMLSize(DOMObject obj, boolean addCSS) {
		if (obj == null)
			return null;
		String div = JSToolkit.getSwingDivId();
		JQuery jq = JSToolkit.getJQuery();
		// Wow! A <div> is necessary for the height, 
		//      and a <span> is necessary for the width!
		JQueryObject jo = jq.$("#" + div);
		jo.append(obj);	
		int w = jq.$(obj).width();
		DOMObject d = wrap("div", id, obj);
		jo.append(d);	
		int h = jq.$(d).height();		
		jo.html("");
		DOMObject.setStyle(obj, "position", "absolute");
		if (addCSS)
			setDims(obj, w, h);
		return new Dimension(w, h);
	}

	protected DOMObject setDims(DOMObject obj, int w, int h) {
		return DOMObject.setStyle(obj, 
				"width", w + "px", 
				"height", h + "px");
	}

	/**
	 * createst the DOM object and inserts it into the tree at the correct place,
	 * iterating through all children if this is a container
	 * 
	 */
	private void setHTMLElement() {
		if (!isTainted)
			return;

		//System.out.println("JSCUI setHTMLElement " + c);

		JRootPane root = (isContainer ? c.getRootPane() : null);
		if (c == root) {
			isTainted = false;
			return;
		}
		

		// tempObj will need recreating if a propertyChange event has occurred
		
		if (tempObj == null)
			tempObj = getDOMObject();

		// divObj will need recreating if a propertyChange event has occurred
		// check for content pane -- needs to be added to the HTML5 content layer div

		// needs some work for changes after applet creation
		
		if (divObj == null) {
			divObj = wrap("div", id, tempObj);
			if (root != null && root.getContentPane() == c)
				swingjs.JSToolkit.getHTML5Applet(c)._getContentLayer()
						.appendChild(divObj);
		}

		// set position
		
		DOMObject.setStyle(divObj, "position", "absolute", "left", (x = c.getX())
				+ "px", "top", (y = c.getY()) + "px");
		
		if (isContainer) {
			// check for root pane -- not included in DOM
			// set width from component

			DOMObject.setStyle(divObj, "width", c.getWidth() + "px", "height",
					c.getHeight() + "px");
			// DOMObject.setStyle(divObj, "background-color",
			// JSToolkit.getCSSColor(c.getBackground()));

			// add all children
			Component[] children = c.getComponents();
			for (int i = children.length; --i >= 0;) {
				JSComponentUI ui = ((JSComponentUI) ((JComponent) children[i]).getUI());
				if (ui.divObj == null)
					ui.setHTMLElement();
				if (ui.divObj == null) {
					//System.out.println("JSCUI could not add " + ui.c.getName() + " to "
						//	+ c.getName());
				} else {
					//System.out.println("JSCUI appending " + ui.c.getName() + " to "
						//	+ c.getName());
					divObj.appendChild(ui.divObj);
					//System.out.println("JSCUI appending OK");
				}
				ui.parent = this;
			}
		}
		// mark as not tainted
		//debugDump(divObj);
		isTainted = false;
	}

	/**
	 * c ignored because JSComponentUI is one per component
	 */
	public Dimension getPreferredSize(JComponent c) {
		newID();
		Dimension d = setHTMLSize(tempObj = getDOMObject(), true);
  	return d;
  }

	public void paint(Graphics g, JComponent c) {
		// for users to use. Note that for now, button graphics 
		// are BEHIND the button. We will need to paint onto the
		// glass pane for this to work, and then also manage
		// mouse clicks and key clicks with that in mind. 
	}

	public void update(Graphics g, JComponent c) {
		//System.out.println(id + " update/paint at " + c.getLocation() + " " + c.getWidth() + " " + c.getHeight());
		 if (c.isOpaque()) {
			 g.setColor(c.getBackground());
			 g.fillRect(0, 0, c.getWidth(),c.getHeight());
		 }
		boolean testing = false;
 		if (testing) {
			g.setColor(Color.red);
			g.drawRect(0, 0, c.getWidth(), c.getHeight());
		}

 		setHTMLElement();
 		
 		
		 paint(g, c);
	}

	public Dimension getMinimumSize(JComponent c) {
		return getPreferredSize(c);
	}

	public Dimension getMaximumSize(JComponent c) {
		return null;// getPreferredSize(c);
	}

  /**
   * Returns <code>true</code> if the specified <i>x,y</i> location is
   * contained within the look and feel's defined shape of the specified
   * component. <code>x</code> and <code>y</code> are defined to be relative
   * to the coordinate system of the specified component.  Although
   * a component's <code>bounds</code> is constrained to a rectangle,
   * this method provides the means for defining a non-rectangular
   * shape within those bounds for the purpose of hit detection.
   *
   * @param c the component where the <i>x,y</i> location is being queried;
   *          this argument is often ignored,
   *          but might be used if the UI object is stateless
   *          and shared by multiple components
   * @param x the <i>x</i> coordinate of the point
   * @param y the <i>y</i> coordinate of the point
   *
   * @see jsjavax.swing.JComponent#contains
   * @see jsjava.awt.Component#contains
   */
  public boolean contains(JComponent c, int x, int y) {
      return c.inside(x, y);
  }

  /**
   * Returns an instance of the UI delegate for the specified component.
   * Each subclass must provide its own static <code>createUI</code>
   * method that returns an instance of that UI delegate subclass.
   * If the UI delegate subclass is stateless, it may return an instance
   * that is shared by multiple components.  If the UI delegate is
   * stateful, then it should return a new instance per component.
   * The default implementation of this method throws an error, as it
   * should never be invoked.
   */
  public static ComponentUI createUI(JComponent c) {
  	// SwingJS  so, actually, we don't do this. This class is NOT stateless.
  	// Instead, what we do is to create a unique instance 
  	// right in UIManager. The sequence is:
  	// JRadioButton.updateUI() 
  	// --> jsjavax.swing.UIManager.getUI(this)
  	// --> jsjavax.swing.UIManager.getDefaults().getUI(target) 
  	// --> JSToolkit.getComponentUI(target)
  	// --> creates an instance of JRadioButtonUI and returns
  	// that instance as JRadioButton.ui, which is NOT static.
  	// 
//      throw new Error("ComponentUI.createUI not implemented.");
  	return null;
  }

  /**
   * Returns the baseline.  The baseline is measured from the top of
   * the component.  This method is primarily meant for
   * <code>LayoutManager</code>s to align components along their
   * baseline.  A return value less than 0 indicates this component
   * does not have a reasonable baseline and that
   * <code>LayoutManager</code>s should not align this component on
   * its baseline.
   * <p>
   * This method returns -1.  Subclasses that have a meaningful baseline
   * should override appropriately.
   *
   * @param c <code>JComponent</code> baseline is being requested for
   * @param width the width to get the baseline for
   * @param height the height to get the baseline for
   * @throws NullPointerException if <code>c</code> is <code>null</code>
   * @throws IllegalArgumentException if width or height is &lt; 0
   * @return baseline or a value &lt; 0 indicating there is no reasonable
   *                  baseline
   * @see jsjavax.swing.JComponent#getBaseline(int,int)
   * @since 1.6
   */
  public int getBaseline(JComponent c, int width, int height) {
      if (c == null) {
          throw new NullPointerException("Component must be non-null");
      }
      if (width < 0 || height < 0) {
          throw new IllegalArgumentException(
                  "Width and height must be >= 0");
      }
      return -1;
  }

  /**
   * Returns an enum indicating how the baseline of he component
   * changes as the size changes.  This method is primarily meant for
   * layout managers and GUI builders.
   * <p>
   * This method returns <code>BaselineResizeBehavior.OTHER</code>.
   * Subclasses that support a baseline should override appropriately.
   *
   * @param c <code>JComponent</code> to return baseline resize behavior for
   * @return an enum indicating how the baseline changes as the component
   *         size changes
   * @throws NullPointerException if <code>c</code> is <code>null</code>
   * @see jsjavax.swing.JComponent#getBaseline(int, int)
   * @since 1.6
   */
  public Component.BaselineResizeBehavior getBaselineResizeBehavior(
          JComponent c) {
      if (c == null) {
          throw new NullPointerException("Component must be non-null");
      }
      return Component.BaselineResizeBehavior.OTHER;
  }

	public void notifyPropertyChanged(String prop) {
		//System.out.println("-----------------JSComponent " + c.getName() + " propertyChange " + prop);
		setTainted();
		// more needs to be done here...
//		tempObj = null;
//		setHTMLElement();
	}

	@Override
	public boolean isObscured() {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public boolean canDetermineObscurity() {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public void setVisible(boolean b) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void setEnabled(boolean b) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void paint(Graphics g) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void repaint(long tm, int x, int y, int width, int height) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void print(Graphics g) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void handleEvent(AWTEvent e) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void coalescePaintEvent(PaintEvent e) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public Point getLocationOnScreen() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public Dimension getPreferredSize() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public Dimension getMinimumSize() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public ColorModel getColorModel() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public Toolkit getToolkit() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public Graphics getGraphics() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public void dispose() {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void setForeground(Color c) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void setBackground(Color c) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void setFont(Font f) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void updateCursorImmediately() {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary,
			boolean focusedWindowChangeAllowed, long time, Cause cause) {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public boolean isFocusable() {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public Image createImage(ImageProducer producer) {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public Image createImage(int width, int height) {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public VolatileImage createVolatileImage(int width, int height) {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public boolean prepareImage(Image img, int w, int h, ImageObserver o) {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public int checkImage(Image img, int w, int h, ImageObserver o) {
		JSToolkit.notImplemented("");
		return 0;
	}

	@Override
	public GraphicsConfiguration getGraphicsConfiguration() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public boolean handlesWheelScrolling() {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public Image getBackBuffer() {
		JSToolkit.notImplemented("");
		return null;
	}

	@Override
	public void destroyBuffers() {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void reparent(ContainerPeer newContainer) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public boolean isReparentSupported() {
		JSToolkit.notImplemented("");
		return false;
	}

	@Override
	public void layout() {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public Rectangle getBounds() {
		JSToolkit.notImplemented("");
		return null;
	}
  
}
