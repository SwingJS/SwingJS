package swingjs.plaf;

import swingjs.JSToolkit;
import swingjs.api.DOMObject;
import swingjs.api.JQuery;
import swingjs.api.JQueryObject;
import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.Graphics;
import jsjavax.swing.JComponent;
import jsjavax.swing.plaf.ComponentUI;

public abstract class JSComponentUI extends ComponentUI {

	protected JComponent c;
	protected String id;
	protected DOMObject domObj;
	protected int num;

	public JSComponentUI() {
		// for reflection
	}

  public abstract DOMObject getDomObject();

	public JSComponentUI set(JComponent target) {
		c = target;
		newID();
		return this;
	}

	protected void newID() {
		num = ++incr;
		id = c.getUIClassID() + num;
	}

	protected void setCssFont(DOMObject obj, Font font) {
		if (font == null)
			return;
		int istyle = font.getStyle();
		DOMObject.setStyle(obj, "font-family", font.getFamily());
		DOMObject.setStyle(obj, "font-size", font.getSize() + "px");
		DOMObject.setStyle(obj, "font-style", ((istyle & Font.ITALIC) == 0 ? "normal" : "italic"));
		DOMObject.setStyle(obj, "font-weight", ((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
	}

	protected DOMObject getDOMObject(String key, String id, String... attr) {
		DOMObject d = DOMObject.createElement(key, id);
		for (int i = 0; i < attr.length;)
			DOMObject.setAttr(d, attr[i++], attr[i++]);
		debugDump(d);
		return d;
	}

	private void debugDump(DOMObject d) {
		System.out.println(DOMObject.getOuterHTML(d));
	}

	protected DOMObject getDiv(String id, Object... elements) {
		DOMObject div = getDOMObject("div", id + "s");
		for (int i = 0; i < elements.length; i++)
			div.appendChild(elements[i]);
		return div;
	}

	protected Dimension getDimension(DOMObject obj) {
		String div = JSToolkit.getSwingDivId();
		JQuery jq = JSToolkit.getJQuery();
		JQueryObject jo = jq.$("#" + div);
		jo.append(obj);
		int w = jq.$(obj).width();
		int h = jq.$(obj).height();
		jo.html("");
		System.out.println("JSComponent " + div + " (" + w + "," + h+")");
		return new Dimension(w, h);
	}

	/**
	 * c ignored because JSComponentUI is one per component
	 */
	public Dimension getPreferredSize(JComponent c) {
		newID();
		Dimension d = getDimension(getDomObject());
		System.out.println(id + " getPreferredSize " + d + " called on " + c);
  	return d;
  }

	protected static int incr; // SwingJS 
	
	public void installUI(JComponent c) {
		System.out.println(id + " installUI called on " + c);
	}

	public void uninstallUI(JComponent c) {
		System.out.println(id + " uninstallUI called on " + c);
	}

	public void paint(Graphics g, JComponent c) {
	}

	public void update(Graphics g, JComponent c) {
		System.out.println(id + " update/paint at " + c.getLocation() + " " + c.getWidth() + " " + c.getHeight() + JSToolkit.getStackTrace(-10));
		 if (c.isOpaque()) {
			 g.setColor(c.getBackground());
			 g.fillRect(0, 0, c.getWidth(),c.getHeight());
		 }
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
      throw new Error("ComponentUI.createUI not implemented.");
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
  
}
