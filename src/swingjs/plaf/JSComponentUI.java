package swingjs.plaf;

import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.JQuery;
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
import jsjavax.swing.AbstractButton;
import jsjavax.swing.JComponent;
import jsjavax.swing.JRootPane;
import jsjavax.swing.JViewport;
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
 * @author Bob Hanson
 *
 */
public abstract class JSComponentUI extends ComponentUI implements LightweightPeer, JSEventHandler {

	/**
	 * provides a unique id for any component; set on instantiation
	 */
	protected static int incr;  

	
	/**
	 * a unique id
	 */
	protected String id;
	
	/**
	 * the associated JComponent; for which this is c.ui
	 * 
	 */
	protected JComponent c;

		
	/**
	 * the outermost div holding a component -- left, top, and for a container width and height
	 */
	protected DOMNode divNode; 

	/**
	 * the main object for the component, possibly containing others, such as radio button with its label
	 */
	protected DOMNode domNode;
	
	/**
	 * a component or subcomponent that can be enabled/disabled 
	 */
	protected DOMNode enableNode; 
	
	/**
	 * the part of a component that can hold text
	 */
	protected DOMNode textNode;
	
	/**
	 * the subcomponent with the value field
	 */
	protected DOMNode valueNode;

	/**
	 * a component that is being scrolled by a JScrollPane
	 */
	protected DOMNode scrollNode;


	/**
	 * DOM components pre-defined (JScrollPane)
	 * 
	 */
	protected Component[] components;

	/**
	 * a numberical reference for an ID
	 */
	protected int num;
	
	/**
	 * not implemented/needed currently. Java handles this nicedly 
	 * 
	 */
	protected boolean isTainted = true;
	
	/**
	 * left and top coordinates
	 */
	protected int x, y;
	
	/**
	 * preferred dimension set by user
	 * 
	 */
	protected Dimension preferredSize;
	
	
	/**
	 * panels 
	 * 
	 */
	protected boolean isContainer;
	
	/**
	 * linked nodes of this class
	 * 
	 */
	protected JSComponentUI parent;


	String currentValue;


	/**
	 * the scroller for a text area
	 */
	public JSScrollPaneUI scrollerNode;
	
	
	public JSComponentUI() {
		// for reflection
	}

	protected abstract void installJSUI();
	protected abstract void uninstallJSUI();
	
	public void installUI(JComponent c) {
		// already done installJSUI();
	}

	public void uninstallUI(JComponent c) {
		uninstallJSUI();
	}

	/**
	 * mark this component as in need of update; 
	 * maybe not necessary, though. It comes after the value  callback 
	 */
  public void setTainted() {
  	isTainted = true;
  }
  
  public abstract DOMNode getDOMObject();

	public JSComponentUI set(JComponent target) {
		c = target;
		newID();
		installJSUI(); // need to do this immediately, not later
		return this;
	}

	protected void newID() {
		if (id == null) {
			num = ++incr;
			id = c.getHTMLName(c.getUIClassID()) + "_" + num;
		}
	}

	protected DOMNode setCssFont(DOMNode obj, Font font) {
		if (font != null) {
			int istyle = font.getStyle();
			DOMNode.setStyles(obj, "font-family", font.getFamily(), "font-size",
					font.getSize() + "px", "font-style",
					((istyle & Font.ITALIC) == 0 ? "normal" : "italic"), "font-weight",
					((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
		}
		return obj;
	}

	protected DOMNode createDOMObject(String key, String id, String... attr) {
		DOMNode obj = DOMNode.createElement(key, id);
		for (int i = 0; i < attr.length;)
			DOMNode.setAttr(obj, attr[i++], attr[i++]);
		if (!c.isEnabled())
			setEnabled(false);
		return obj;
	}

	/**
	 * JSmolCore.js will look for  data-UI attribute  and, if found, reroute directly here 
	 * @param node 
	 */
	protected void bindMouse(DOMNode node) {
		DOMNode.setAttr(node, "data-UI", this);		
	}
	
	/**
	 * called by JmolCore.js
	 * @return true if handled
	 */
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		System.out.println(id + " handling event " + eventType + jQueryEvent);
		return false;
	}

	protected DOMNode wrap(String type, String id, DOMNode... elements) {
		return append(createDOMObject(type, id + type), elements);
	}

	protected DOMNode append(DOMNode obj, DOMNode[] elements) {
		for (int i = 0; i < elements.length; i++) {
			obj.appendChild(elements[i]);
		}
		return obj;
	}

	protected void debugDump(DOMNode d) {
		System.out.println(d.getAttribute("outerHTML"));
	}
	
	protected static void vCenter(DOMNode obj, int offset) {
		DOMNode.setStyles(obj, 
				"top", "50%", 
				"transform","translateY(" + offset + "%)");
	}
	
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return setHTMLSize1(obj, addCSS);
	}

	protected Dimension setHTMLSize1(DOMNode node, boolean addCSS) {
		if (node == null)
			return null;
		int h, w;
		DOMNode parentNode = null;

		if (addCSS && scrollerNode != null) {
			w = scrollerNode.c.getWidth();
			h = scrollerNode.c.getHeight();	
		} else if (addCSS && preferredSize != null) {
			// user has set preferred size
			w = preferredSize.width;
			h = preferredSize.height;
		} else {

			// save the parent node -- we wil need to reset that.
			parentNode = DOMNode.remove(node);

			// remove position, width, and height, because those are what we are
			// setting here
			DOMNode.setStyles(node, "position", null, "width", null, "height", null);

			DOMNode div;
			if (node.getAttribute("tagName") == "DIV")
				div = node;
			else
				div = wrap("div", id + "_temp", node);
			DOMNode.setStyles(div, "position", "absolute");

			// process of discovering width and height is facilitated using jQuery
			// and appending to document.body.

			DOMNode body = DOMNode.getBody();
			body.appendChild(div);
			JQuery jq = JSToolkit.getJQuery();
			w = (int) Math.ceil(jq.$(div).width() + 0.5);
			h = (int) Math.ceil(jq.$(div).height() + 0.5);
			body.removeChild(div);
		}

		if (addCSS) {
			DOMNode.setStyles(node, "position", "absolute");
			setDims(node, w, h);
		} else {
			DOMNode.setStyles(node, "position", null);
		}
		if (parentNode != null)
			parentNode.appendChild(node);
		System.out.println("JSComponentUI " + id + " resized to " + w + "x" + h + " " + DOMNode.getAttr(parentNode,"id"));	
		return new Dimension(w, h);
	}

	protected DOMNode setDims(DOMNode obj, int w, int h) {
		return DOMNode.setStyles(obj, 
				"width", w + "px", 
				"height", h + "px");
	}

	/**
	 * creates the DOM node and inserts it into the tree at the correct place,
	 * iterating through all children if this is a container
	 * @return 
	 * 
	 */
	protected DOMNode setHTMLElement() {
		if (!isTainted)
			return divNode;

		// check for root pane -- not included in DOM
		JRootPane root = (isContainer ? c.getRootPane() : null);
		if (c == root) {
			isTainted = false;
			return divNode;
		}
		
		domNode = getDOMObject();

		// divObj will need recreating if a propertyChange event has occurred
		// check for content pane -- needs to be added to the HTML5 content layer div

		// needs some work for changes after applet creation
		
		if (divNode == null) {
			divNode = wrap("div", id, domNode);
			if (root != null && root.getContentPane() == c)
				swingjs.JSToolkit.getHTML5Applet(c)._getContentLayer()
						.appendChild(divNode);
		}

		// set position
		
		DOMNode.setStyles(divNode, "position", "absolute", "left", (x = c.getX())
				+ "px", "top", (y = c.getY()) + "px");
		
		if (isContainer) {

			// set width from component

			System.out.println("JSComponentUI container " + id + " " + c.getBounds());
			DOMNode.setStyles(divNode, "width", c.getWidth() + "px", "height",
					c.getHeight() + "px");
			

			// add all children
			Component[] children = (components == null ? c.getComponents() : components);
			for (int i = children.length; --i >= 0;) {
				JSComponentUI ui = ((JSComponentUI) ((JComponent) children[i]).getUI());
				if (ui.divNode == null)
					ui.setHTMLElement();
				if (ui.divNode == null) {
					System.out.println("JSCUI could not add " + ui.c.getName() + " to "
						 + c.getName());
				} else {
					System.out.println("JSCUI appending " + ui.c.getName() + " to "
							+ c.getName());
					divNode.appendChild(ui.divNode);
					System.out.println("JSCUI appending OK");
				}
				ui.parent = this;
			}
		}
		
		// mark as not tainted
		//debugDump(divObj);
		isTainted = false;
		return divNode;
	}

	/**
	 * c ignored because JSComponentUI is one per component
	 */
	public Dimension getPreferredSize(JComponent c) {
		System.out.println("getPreferredSize for " + id + " " + c.getName());
		Dimension d = setHTMLSize(getDOMObject(), true);
		System.out.println("JSComponentUI " + id + " getting preferred size as " + d);
  	return d;
  }

	public void paintC(Graphics g, JComponent c) {
		// for users to use. Note that for now, button graphics 
		// are BEHIND the button. We will need to paint onto the
		// glass pane for this to work, and then also manage
		// mouse clicks and key clicks with that in mind. 
	}

	public void update(Graphics g, JComponent c) {
		// System.out.println("JComponentUI " + id + " tainted " + isTainted +
		// " update/paint at " + c.getLocation() + " " + c.getWidth() + " " +
		// c.getHeight());
		if (c.isOpaque()) {
			g.setColor(c.getBackground());
			g.fillRect(0, 0, c.getWidth(), c.getHeight());
		}
		boolean testing = false;//true;
		if (testing) {
			g.setColor(Color.red);
			g.drawRect(0, 0, c.getWidth(), c.getHeight());
			System.out.println("drawing " + c.getWidth() + " " + c.getHeight());
		}
		setHTMLElement();
		paintC(g, c);
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

  public String getJSValue() {
  	return (String) DOMNode.getAttr(domNode, valueNode == null ? "innerHTML" : "value");
  }
  
	public void notifyPropertyChanged(String prop) {
		DOMNode obj = null;
		String val = null;
		if (prop == "text") {
			val = ((AbstractButton) c).getText();
			if (val.equals(currentValue)) // we set it here, then fired the property change
				return;
			currentValue = val;
			if (textNode != null) {
				prop = "innerHTML";
				obj = textNode;
			} else if (valueNode != null) {
				prop = "value";
				obj = valueNode;
			}
		} else if (prop == "preferredSize") {
			preferredSize = c.getPreferredSize(); // may be null
			getPreferredSize();
			return;
		}
		if (obj == null) {
			System.out.println("JSComponentUI: unrecognized prop: " + prop);
		} else {
			System.out.println("JSComponentUI: setting " + id + " " + prop);// + " " + val);
			DOMNode.setAttr(obj, prop, val);
		}
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
		if (enableNode != null)
		  DOMNode.setAttr(enableNode, "disabled", (b ? null : "TRUE"));
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
		if (domNode != null)
			setDims(domNode, width, height);
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
		return getPreferredSize(c);
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
		return Toolkit.getDefaultToolkit();
	}

	@Override
	public Graphics getGraphics() {
		// called from java.awt.Component when NOT a LightweightPeer.
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		return c.getFontMetrics(font);
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
