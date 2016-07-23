package swingjs.plaf;

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
import jsjava.awt.JSComponent;
import jsjava.awt.Point;
import jsjava.awt.Rectangle;
import jsjava.awt.Toolkit;
import jsjava.awt.event.FocusEvent;
import jsjava.awt.event.PaintEvent;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.ImageProducer;
import jsjava.awt.image.VolatileImage;
import jsjava.awt.peer.ContainerPeer;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.JComponent;
import jsjavax.swing.plaf.ComponentUI;
import jssun.awt.CausedFocusEvent.Cause;
import swingjs.JSFrameViewer;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Applet;
import swingjs.api.HTML5Canvas;
import swingjs.api.JQueryObject;
import swingjs.api.JSFunction;

/**
 * The JSComponentUI subclasses are where all the detailed HTML5 implementation
 * is carried out. These subclasses mirror the subclasses found in the actual
 * javax.swing.plaf but have an important difference in that that effectively
 * act as both the UI (a single implementation for a given AppContext in Swing)
 * and a peer (one implementation per component).
 * 
 * So here we store both the constants for the HTML5 "LookAndFeel" as well as
 * HTML5 DOM objects (aka DOMNode) that really are on the page.
 * 
 * Essentially, at least for now, we are not implementing the HTML5LookAndFeel
 * as such. We'll see how that goes.
 * 
 * MOUSE EVENT HANDLING
 * 
 * In SwingJS, the domBtn DOM element will be given the "data-component"
 * attribute pointing to its corresponding AWT component.
 * 
 * A mouse action starts in j2sApplet.js as jQuery events, where it is processed
 * and then passed to JSFrameViewer's JSMouse object.
 * 
 * In JSMouse the event is converted to a java.awt.event.MouseEvent, with the
 * jQuery event saved as event.bdata[].jqevent. This standard MouseEvent is then
 * posted just like a "real Java" event using
 * Toolkit.getEventQueue().postEvent(e), thus giving it its own "thread."
 * 
 * The event is dispatched by java.awt.LightweightDispatcher (in
 * Container.java), where the "nativeContainer" for this window (JApplet,
 * JFrame, JWindow, JDialog, or JPopupMenu) is identified. Java has to search
 * the native container for the right X,Y coordinate for this control, but in
 * SwingJS we already know the control that was clicked. We can find that from
 * bdata.jqevent.target["data-component"]
 * 
 * Some UIs (JSComboBoxUI, JSFrameUI, and JSTextUI) set
 * jqevent.target["data-ui"] to point to themselves. This allows the control to
 * bypass the Java dispatch system entirely and just come here for processing.
 * This method is used for specific operations, including JFrame closing,
 * JComboBox selection, and JSText action handling. This connection is set up in
 * JSComponentUI.setDataUI() and handled by overriding
 * JSComponentUI.handleJSEvent().
 * 
 * Finally, some UIs (JSSliderUI and JSPopupMenuUI) set up jQueryEvents that call
 * back to themselves or handle some internal event processing themselves.
 * 
 * 
 * @see jsjava.awt.LightweightDispatcher (in Container.js)
 * 
 * @author Bob Hanson
 * 
 */
public class JSComponentUI extends ComponentUI implements ContainerPeer, JSEventHandler {

	/**
	 * provides a unique id for any component; set on instantiation
	 */
	protected static int incr;  

	
	/**
	 * a unique id
	 */
	protected String id;
	
	/**
	 * the associated Component; for which this is c.ui
	 * 
	 */
	protected JSComponent c;

	/**
	 * the associated JComponent; for which this is c.ui
	 * 
	 */
	protected JComponent jc;

	/**
	 * The outermost div holding a component -- left, top, and for a container
	 * width and height
	 * 
	 * Note that all controls have an associated outerNode div. Specifically, menu items will be
	 * surrounded by an li element, not a div.
	 * 
	 * This must be set up here, nowhere else.
	 * 
	 */
	protected DOMNode outerNode; 

	/**
	 * the main HTML5 element for the component, possibly containing others, such as
	 * radio button with its label. 
	 * 
	 */
	public DOMNode domNode;
	
	/**
	 * The HTML5 input element being pressed, if the control subclasses JSButtonUI.
	 * 
	 */
	protected DOMNode domBtn;
	
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
	 * a component that is focusable
	 */
	protected DOMNode focusNode;


	/**
	 * DOM components pre-defined (JScrollPane)
	 * 
	 */
	protected Component[] children;

	/**
	 * a numerical reference for an ID
	 */
	protected int num;
	
	/**
	 * indicates that we need a new outerNode 
	 * 
	 */
	protected boolean isTainted = true;

	/**
	 * indicates that we need an outerNode
	 */
	
	protected boolean hasOuterDiv = true;

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
	protected boolean isContainer, isWindow;
	
	/**
	 * linked nodes of this class
	 * 
	 */
	protected JSComponentUI parent;


	String currentText;


	/**
	 * the scroller for a text area
	 */
	protected JSScrollPaneUI scrollerNode;


	/**
	 * uiClassID for this component
	 */
	protected String classID;
	
  /**
   * initial frameZ
   * 
   */
  protected static int frameZ = 19000;


	protected DOMNode body;
	private DOMNode document;
	protected HTML5Applet applet; // used in getting z value, setting frame mouse actions

	
	protected boolean needPreferred;
	
	protected int width;
	protected int height;


	protected DOMNode containerNode;


	public boolean isNull;


	public JSComponentUI() {
		setDoc();
	}

	protected void setDoc() {
		/**
		 * @j2sNative
		 * 
		 * this.document = document;
		 * this.body = document.body;
		 */
		{}
	}

	protected void installJSUI(){}
	protected void uninstallJSUI(){}
	
	public void installUI(JComponent c) {
		
		// can be overloaded to install layout managers, for example. (JSMenuBarUI)
	}

	public void uninstallUI(JComponent c) {
		if (outerNode != null) {
			DOMNode.remove(outerNode);
			outerNode = null;
		}
		uninstallJSUI();
	}

	protected JQueryObject $(DOMNode node) {
		return JSToolkit.getJQuery().$(node);
	}
	
	/**
	 * mark this component as in need of update; 
	 * maybe not necessary, though. It comes after the value  callback 
	 */
  public void setTainted() {
  	isTainted = true;
  }
  
  public DOMNode createDOMNode(){
  	System.out.println("Swingjs WARNING: default JSComponentUI is being used for " + getClass().getName());
  	return (domNode == null ? domNode = DOMNode.createElement("div", id) : domNode);  	
  }

	public JSComponentUI set(JComponent target) {
 		c = target;
		jc = (JComponent) c; // in JavaScript, in certain cases this will not be a JComponent
		applet = JSToolkit.getHTML5Applet(c);
		newID();
		if (needPreferred)
	  	getHTMLSize();
		installJSUI(); // need to do this immediately, not later
		return this;
	}

	protected void newID() {
		classID = c.getUIClassID();
		if (id == null) {
			num = ++incr;
			id = c.getHTMLName(classID) + "_" + num;
		}
	}

	
	protected DOMNode setCssFont(DOMNode obj, Font font) {
		if (font != null) {
			int istyle = font.getStyle();
			String name = font.getFamily();
			if (name == "Dialog")
				name = "Arial";
			DOMNode.setStyles(obj, "font-family", name, "font-size",
					font.getSize() + "px", "font-style",
					((istyle & Font.ITALIC) == 0 ? "normal" : "italic"), "font-weight",
					((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
		}
		if (c.isBackgroundSet())
			setBackground(c.getBackground());
    setForeground(c.getForeground());
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
		System.out.println(DOMNode.getAttr(d, "outerHTML"));
	}
	
	protected static void vCenter(DOMNode obj, int offset) {
		DOMNode.setStyles(obj, 
				"top", "50%", 
				"transform","translateY(" + offset + "%)");
	}
	
	/**
	 * overloaded to allow panel and radiobutton to handle slightly differently 
	 * 
	 * @param obj
	 * @param addCSS
	 * @return
	 */
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return setHTMLSize1(obj, addCSS, true);
	}

	/**
	 * also called by JSRadioButtonUI so that it can calculate
	 * subset dimensions
	 *  
	 * @param node
	 * @param addCSS
	 * @param usePreferred
	 * @return
	 */
	@SuppressWarnings("unused")
	protected Dimension setHTMLSize1(DOMNode node, boolean addCSS, boolean usePreferred) {
		if (node == null)
			return null;
		int h, w;
		String w0 = null, h0 = null;
		DOMNode parentNode = null;

		if (scrollerNode != null) {
			w = scrollerNode.c.getWidth();
			h = scrollerNode.c.getHeight();
		} else if (usePreferred && preferredSize != null) {
			// user has set preferred size
			w = preferredSize.width;
			h = preferredSize.height;
		} else {
      // determine the natural size of this object
			// save the parent node -- we will need to reset that.
			parentNode = DOMNode.remove(node);

			// remove position, width, and height, because those are what we are
			// setting here
			/**
			 * @j2sNative
			 * 
			 * w0 = node.style.width;
			 * h0 = node.style.height;
			 */
			{}
			DOMNode.setStyles(node, "position", null, "width", null, "height", null);
			DOMNode div;
			if (DOMNode.getAttr(node, "tagName") == "DIV")
				div = node;
			else
				div = wrap("div", id + "_temp", node);
			DOMNode.setPositionAbsolute(div, -1, -1);

			// process of discovering width and height is facilitated using jQuery
			// and appending to document.body.

			body.appendChild(div);
			//System.out.println(DOMNode.getAttr(node, "outerHTML"));
			w = (int) Math.max(0, Math.ceil($(div).width() + 0.5));
			h = (int) Math.max(0, Math.ceil($(div).height() + 0.5));
			body.removeChild(div);
		}

		Dimension size = getCSSDimension(width = w, height = h);
		if (addCSS) {
			DOMNode.setPositionAbsolute(node, -1, -1);
			DOMNode.setSize(node, size.width, size.height);
		} else {
			DOMNode.setStyles(node, "position", null);
			// check to reset width/height after getPreferredSize
			if (w0 != null)
				DOMNode.setStyles(node, "width", w0, "height", h0);
		}
		if (parentNode != null)
			parentNode.appendChild(node);
		//System.out.println("JSComponentUI " + id + " resized to " + w + "x" + h + " parent=" + DOMNode.getAttr(parentNode,"id"));	
		return size;
	}

	/**
	 * allows for 
	 * can be overloaded to allow some special adjustments
	 * 
	 * @param w
	 * @param h
	 * @return
	 */
	protected Dimension getCSSDimension(int w, int h) {
		return new Dimension(w, h);
	}

	/**
	 * creates the DOM node and inserts it into the tree at the correct place,
	 * iterating through all children if this is a container
	 * 
	 * @return the outerNode
	 * 
	 */
	protected DOMNode setHTMLElement() {
		return setHTMLElementCUI();
	}
	
	protected DOMNode setHTMLElementCUI() {
		if (!isTainted)
			return outerNode;

		domNode = createDOMNode();
		Component[] children = getChildren();
		int n = children.length;

		if (!hasOuterDiv) {
			outerNode = domNode;
			if (n == 0)
				return outerNode; 
		}
		
		if (outerNode == null) 
			outerNode = wrap("div", id, domNode);

		// set position

		if (hasOuterDiv) {
			DOMNode.setPositionAbsolute(outerNode, -1, -1);
			DOMNode.setStyles(outerNode, "left", (x = c.getX()) + "px", "top",
					(y = c.getY()) + "px");
		}
		if (n > 0 && containerNode == null)
			containerNode = outerNode;
		if (isContainer || n > 0) {
			// set width from component
			if (isContainer && hasOuterDiv) {
				//System.out.println("JSComponentUI container " + id + " "
					//	+ c.getBounds());
				DOMNode
						.setSize(outerNode, getContainerWidth(), getContainerHeight());
			}
			if (jc.isRootPane) {
				if (jc.getFrameViewer().isApplet) {
					// If the applet's root pane, we insert it into the applet's content
					// layer div
					swingjs.JSToolkit.getHTML5Applet(jc)._getContentLayer()
							.appendChild(outerNode);
				} else {
					// This is the root pane of a JFrame, JDialog, JWindow, etc.
					// we insert the canvas for the frame into this content pane
					HTML5Canvas canvas = jc.getFrameViewer().canvas;
					if (DOMNode.getAttr(canvas, "_installed") != null) {
						outerNode.appendChild(canvas);
						DOMNode.setAttr(canvas, "_installed", "1");
					}
				}
			}
			
			addChildrenToDOM(children);

			if (isWindow) {
				DOMNode.remove(outerNode);
				$(body).append(outerNode);
			}
		}

		// mark as not tainted
		// debugDump(divObj);
		isTainted = false;
		return outerNode;
	}

	protected Component[] getChildren() {
		return (this.children == null ? jc.getComponents()
				: this.children);
	}

	protected void addChildrenToDOM(Component[] children) {
		// add all children
		int n = children.length;
		for (int i = 0; i < n; i++) {
			JSComponentUI ui = JSToolkit.getUI(children[i], false);
			if (ui == null || ui.isNull) {
				// Box.Filler has no ui.
				continue;
			}
			if (ui.getOuterNode() == null) {
				System.out.println("JSCUI could not add " + ui.c.getName() + " to "
						+ c.getName());
			} else {

				containerNode.appendChild(ui.outerNode);
			}
			ui.parent = this;
		}
	}

	protected int getContainerWidth() {
		return width = c.getWidth();
	}

	protected int getContainerHeight() {
		 return height = c.getHeight();
	}
	
	@Override
	public Dimension getPreferredSize() {
  	return getHTMLSize();
  }

	private Dimension getHTMLSize() {
		return setHTMLSize(createDOMNode(), false);
	}

	@Override
	public void update(Graphics g, JComponent c) {
		// called from JComponent.paintComponent
		boolean testing = false;//true;
		if (testing) {
			g.setColor(Color.red);
			g.drawRect(0, 0, c.getWidth(), c.getHeight());
			System.out.println("drawing " + c.getWidth() + " " + c.getHeight());
		}
		setHTMLElement();
		paint(g, c);
	}

	@Override
	public void paint(Graphics g, JComponent c) {
    // Note that for now, button graphics 
		// are BEHIND the button. We will need to paint onto the
		// glass pane for this to work, and then also manage
		// mouse clicks and key clicks with that in mind. 
		if (c.isOpaque()) {
			g.setColor(c.getBackground());
			g.fillRect(0, 0, c.getWidth(), c.getHeight());
		}
	}

	@Override
	public Dimension getMinimumSize() {
		return getPreferredSize();
	}

	@Override
	public Dimension getMaximumSize() {
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
  @Override
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
  @Override
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
  @Override
	public Component.BaselineResizeBehavior getBaselineResizeBehavior(
          JComponent c) {
      if (c == null) {
          throw new NullPointerException("Component must be non-null");
      }
      return Component.BaselineResizeBehavior.OTHER;
  }

  /**
   * overridden in JSPasswordFieldUI
   * @return texat
   */
  public String getJSTextValue() {
  	return (String) DOMNode.getAttr(domNode, valueNode == null ? "innerHTML" : "value");
  }
  
	public void notifyPropertyChanged(String prop) {
		notifyPropChangeCUI(prop);
	}
	
	protected void notifyPropChangeCUI(String prop) {
		DOMNode obj = null;
		String val = null;
		boolean isStyle = false;
		if (prop == "preferredSize") {
			preferredSize = c.getPreferredSize(); // may be null
			getPreferredSize();
			return;
		}
		if (prop == "text") {
			val = ((AbstractButton) c).getText();
			if (val.equals(currentText)) // we set it here, then fired the property change
				return;
			currentText = val;
			if (textNode != null) {
				prop = "innerHTML";
				obj = textNode;
			} else if (valueNode != null) {
				prop = "value";
				obj = valueNode;
			}
		}
		if (obj == null) {
			System.out.println("JSComponentUI: unrecognized prop: " + prop);
		} else {
			System.out.println("JSComponentUI: setting " + id + " " + prop);// + " " + val);
			if (isStyle)
				DOMNode.setStyles(obj, prop, val);
			else
				setProp(obj, prop, val);
		}
	}

	DOMNode getOuterNode() {
		return (outerNode == null ? setHTMLElement() : outerNode);
	}

	protected DOMNode setProp(DOMNode obj, String prop, String val) {
		return DOMNode.setAttr(obj, prop, val);
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
		DOMNode node = getOuterNode();
		if (node == null)
			node = domNode; // a frame or other window
		DOMNode.setStyles(node, "display", b ? "block" : "none");
		if (b)
			toFront();
	}
	
	public void toFront() {
		// windows only
	}

	@Override
	public void setEnabled(boolean b) {	
		if (enableNode != null)
		  DOMNode.setAttr(enableNode, "disabled", (b ? null : "TRUE"));
	}

	@Override
	public void paint(Graphics g) {
		// nothing to do here
	}

	@Override
	public void repaint(long tm, int x, int y, int width, int height) {
		// nothing to do here
	}

	@Override
	public void print(Graphics g) {
		JSToolkit.notImplemented("");		
	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		switch (op) {
		case SET_SIZE:
		case SET_BOUNDS:
		case SET_CLIENT_SIZE:
			if (scrollerNode != null) {
				width = Math.min(width, scrollerNode.c.getWidth());
				height = Math.min(height, scrollerNode.c.getHeight());
			}
			// allow for special adjustments
			Dimension size = getCSSDimension(width, height);
			this.width = size.width;
			this.height = size.height;
			//System.out.println(id + " setBounds " + x + " " + y + " " + this.width
				//	+ " " + this.height + " op=" + op);
			if (domNode == null && createDOMNode() == null)
				System.out.println("JSCUI no DOM node created for " + id);
			else
				DOMNode.setSize(domNode, this.width, this.height);
			break;
		}
	}

	@Override
	public void handleEvent(AWTEvent e) {
		JSToolkit.notImplemented("");
		
	}

	@Override
	public void coalescePaintEvent(PaintEvent e) {
		JSToolkit.notImplemented("");
		
	}

	/**
	 * Coordinates relative to the document
	 * 
	 */
	@Override
	public Point getLocationOnScreen() {
		Insets offset = (Insets) $(outerNode).offset();
		return new Point(offset.left, offset.top);
	}

	@Override
	public ColorModel getColorModel() {
		return Toolkit.getDefaultToolkit().getColorModel();
	}

	@Override
	public Toolkit getToolkit() {
		return Toolkit.getDefaultToolkit();
	}

	@Override
	public Graphics getGraphics() {
		// n/a  -- called from java.awt.Component when NOT a LightweightPeer.
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		return c.getFontMetrics(font);
	}

	@Override
	public void dispose() {
    DOMNode.remove(domNode);
    DOMNode.remove(outerNode);
	}

	@Override
	public void setForeground(Color color) {
		if (domNode != null)
			DOMNode.setStyles(domNode, "color", JSToolkit.getCSSColor(color == null ? Color.black : color));
	}

	@Override
	public void setBackground(Color color) {
		if (domNode != null)
			DOMNode.setStyles(domNode, "background-color", JSToolkit.getCSSColor(color == null ? Color.white : color));
	}

	@Override
	public void setFont(Font f) {
		if (domNode != null)
			setCssFont(domNode, f);
	}

	@Override
	public void updateCursorImmediately() {
		JSToolkit.notImplemented("");		
	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary,
			boolean focusedWindowChangeAllowed, long time, Cause cause) {
		if (focusNode == null)
			return false;
		$(focusNode).focus();
		if (textNode != null)
			$(textNode).select();
		return true;
	}

	@Override
	public boolean isFocusable() {
		return (focusNode != null);
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

	public boolean hasFocus() {
		return focusNode != null && focusNode == DOMNode.getAttr(document, "activeElement");
	}

	public void notifyFocus(boolean focusGained) {
		Toolkit.getEventQueue().postEvent(new FocusEvent(c, focusGained ? FocusEvent.FOCUS_GAINED : FocusEvent.FOCUS_LOST));
	}
	
	@SuppressWarnings("unused")
	protected void setFocusable() {
		JQueryObject node = $(focusNode);
		Object me = this;

		/**
		 * @j2sNative
		 * 
		 * node.focus(function() {me.notifyFocus(true)});
		 * node.blur(function() {me.notifyFocus(false)});
		 */
		{}
	}

	protected void bindKeys(DOMNode domNode) {
		JSFunction f = null;
		JSEventHandler me = this;
		/**
		 * @j2sNative
		 * 
		 *            f = function(event) { me.handleJSEvent(me.domNode, 401, event)
		 *            }
		 */
		{
			System.out.println(me);
		}
		$(domNode).bind("keydown keypress keyup", f);
	}

	protected void setJ2sMouseHandler(DOMNode node, boolean isFrame) {
		JSFrameViewer vwr = jc.getFrameViewer();
		DOMNode.setAttrs(node, "applet", applet, "_frameViewer", vwr);
		// j2sMenu.js will take care of this for each item. 
		if (isFrame)
			JSToolkit.J2S._jsSetMouse(node, true);
	}

	/**
	 * specifically for buttons, indicates to LightweightDispatcher that we
	 * already know what button was clicked; not necessary to check x and y for that
	 * 
	 * @param button
	 */
	protected void setDataComponent(DOMNode button) {
		DOMNode.setAttr(button, "data-component", c);
	}

	/**
	 * JSmolCore.js will look for the data-ui attribute of a jQuery event target
	 * and, if found, reroute the event to handleJSEvent.
	 * 
	 * Some UIs (JSComboBoxUI, JSFrameUI, and JSTextUI) set
	 * jqevent.target["data-ui"] to point to themselves. This allows the control
	 * to bypass the Java dispatch system entirely and just come here for
	 * processing. This method is used for specific operations, including JFrame
	 * closing, JComboBox selection, and JSText action handling. This connection
	 * is set up in JSComponentUI.setDataUI() and handled by overriding
	 * JSComponentUI.handleJSEvent().
	 * 
	 * @param node
	 */
	protected void setDataUI(DOMNode node) {
		DOMNode.setAttr(node, "data-ui", this);		
	}
	
	/**
	 * called by JmolCore.js;
	 * 
	 * Some UIs (JSComboBoxUI, JSFrameUI, and JSTextUI) set
	 * jqevent.target["data-ui"] to point to themselves. This allows the control
	 * to bypass the Java dispatch system entirely and just come here for
	 * processing. This method is used for specific operations, including JFrame
	 * closing, JComboBox selection, and JSText action handling. This connection
	 * is set up in JSComponentUI.setDataUI() and handled by overriding
	 * JSComponentUI.handleJSEvent().
	 * 
	 * @param target
	 *          a DOMNode
	 * @param eventType
	 *          a MouseEvent id, including 501, 502, 503, or 506 (pressed,
	 *          released, moved, and dragged, respectively)
	 * @param jQueryEvent
	 * @return false to prevent the default process
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		//System.out.println(id + " handling event " + eventType + jQueryEvent);
		return true;
	}

	public int getZIndex(String what) {
		@SuppressWarnings("unused")
		Component c = this.c;
		int z = 0;		
		/**
		 * looking for high-level content pane
		 * 
		 * @j2sNative
		 * 
		 * if (what) return this.applet._z[what];
		 * 
		 * while (c && c.style && c.style["z-index"]) {
		 *   z = c.style["z-index"];
		 *   c = c.parentNode;
		 * }
		 * 
		 */
		{
			return (z == 0 ? 100000 : z);
		}
	}
	
	///////////////////////////// ContainerPeer ///////////////////////////
	
	// all Swing components are containers
	
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

	public String getId() {
		return  id;
	}


}
