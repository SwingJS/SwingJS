package swingjs.plaf;

import swingjs.JSToolkit;
import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.Font;
import jsjava.awt.Graphics;
import jsjavax.swing.JComponent;
import jsjavax.swing.plaf.ComponentUI;

public abstract class JSComponentUI extends ComponentUI {

	protected JComponent c;
	protected String id;
	protected Object span;
	protected int num;

	public JSComponentUI() {
	}

	public JSComponentUI set(JComponent target) {
		c = target;
		id = c.getUIClassID() + num;
		num = ++incr;
		return this;
	}

	/**
	 * c ignored
	 */
	public Dimension getPreferredSize(JComponent c) {
  	return getDimension(getSpanObject());
  }

	protected static int incr; //SwingJS
	
	public void installUI(JComponent c) {
	}

	public void uninstallUI(JComponent c) {
	}

	public void paint(Graphics g, JComponent c) {
	}

	public void update(Graphics g, JComponent c) {
		// if (c.isOpaque()) {
		// g.setColor(c.getBackground());
		// g.fillRect(0, 0, c.getWidth(),c.getHeight());
		// }
		// paint(g, c);
	}

	public Dimension getMinimumSize(JComponent c) {
		return getPreferredSize(c);
	}

	public Dimension getMaximumSize(JComponent c) {
		return null;// getPreferredSize(c);
	}

	@SuppressWarnings("unused")
	protected void setCssFont(Object obj, Font font) {
		if (font == null)
			return;
		String fam = font.getFamily();
		String size = font.getSize() + "px";
		int istyle = font.getStyle();
		String style = ((istyle & Font.ITALIC) == 0 ? "normal" : "italic");
		String weight = ((istyle & Font.BOLD) == 0 ? "normal" : "bold");
		/**
		 * @j2sNative
		 * 
		 *            obj.style["font-family"] = fam; obj.style["font-size"] = size;
		 *            obj.style["font-style"] = style; obj.style["font-weight"] =
		 *            weight;
		 * 
		 */
		{
		}
	}

	protected Object getElement(String key, String id, String... attr) {
		Object d = null;
		/**
		 * 
		 * @j2sNative
		 * 
		 *            d = document.createElement(key); d.id = id; for (var i = 0; i
		 *            < attr.length;) 	d[attr[i++]] = attr[i++];
		 * 
		 */
		{
		}
		return d;
	}

	protected Object getSpan(String id, Object... elements) {
		Object span = getElement("span", id + "s");
		for (int i = 0; i < elements.length; i++) {
			/**
			 * @j2sNative
			 * 
			 *            span.appendChild(elements[i]);
			 * 
			 */
			{
			}
		}
		return span;
	}

	protected Dimension getDimension(Object span) {
		String div = JSToolkit.getSwingDivId();
		int w = 0, h = 0;
		/**
		 * 
		 * @j2sNative
		 * 
		 *            var jd = Jmol._$(div); jd.append(span); w =
		 *            Jmol._$(span.id).width(); h = Jmol._$(span.id).height();
		 *            jd.html("");
		 * 
		 */
		{
		}
		return new Dimension(w, h);
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
  
  public abstract Object getSpanObject();

}
