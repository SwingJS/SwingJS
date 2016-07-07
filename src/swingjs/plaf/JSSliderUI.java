package swingjs.plaf;


import java.util.Dictionary;
import java.util.Enumeration;

import javax.swing.SwingConstants;

import jsjava.awt.Dimension;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.BoundedRangeModel;
import jsjavax.swing.JLabel;
import jsjavax.swing.JSlider;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import swingjs.J2SRequireImport;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSSliderUI extends JSLightweightUI implements PropertyChangeListener, ChangeListener {

	private JSlider jSlider;
	private int min, max, val, majorSpacing, minorSpacing;
	private String orientation;
	
	private boolean paintTicks, paintLabels;
	
	protected DOMNode jqSlider;
	private int z0 = Integer.MIN_VALUE;
	private BoundedRangeModel model;
	private boolean paintTrack = true;

	protected boolean isScrollBar;

	public JSSliderUI() {
		needPreferred = true;
		setDoc();
	}

	static {		
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-slider.css", true);
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-slider.js", true);
	}

	@Override
	public DOMNode createDOMNode() {
		boolean isNew = (domNode == null);
		JSlider js = jSlider = (JSlider) c;
		min = js.getMinimum();
		max = js.getMaximum();
		val = js.getValue();
		if (!isScrollBar) {
			minorSpacing = js.getMinorTickSpacing();
			majorSpacing = js.getMajorTickSpacing();
			paintTicks = js.getPaintTicks();
			paintLabels = js.getPaintLabels();
			paintTrack = js.getPaintTrack();
		}
		orientation = (js.getOrientation() == SwingConstants.VERTICAL ? "vertical"
				: "horizontal");
		model = js.getModel();
		if (isNew) {
			domNode = wrap("div", id + "_wrap",
					jqSlider = DOMNode.createElement("div", id));
			$(domNode).addClass("swingjs");

			/**
			 * @j2sNative
			 * 
			 *            var me = this; 
			 *            me.$(me.jqSlider).slider(
			 *             { orientation: me.orientation, 
			 *               range: false, 
			 *               min: me.min,
			 *               max: me.max,
			 *               value: me.val, 
			 *               change: function(jqevent, handle) {
			 *                     me.jqueryCallback(jqevent, handle); }, 
			 *               slide: function(jqevent, handle) { 
			 *                     me.jqueryCallback(jqevent, handle); }
			 *            });
			 */
			{
			}
		}
		setZ(isNew);
		setSlider();
		return domNode;
	}

	/**
	 * 
	 * @param isNew
	 */
	private void setZ(boolean isNew) {
		int z = getZIndex(null);
		if (z == z0)
			return;
		z0 = z;
		System.out.println("JSSliderUI setting z to " + z);
		DOMNode sliderTrack = DOMNode.firstChild(domNode);
		DOMNode sliderHandle = DOMNode.firstChild(sliderTrack);
		DOMNode.setZ(sliderTrack, z++);
		DOMNode.setZ(sliderHandle, z++);
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol._jsSetMouse();
		if (isNew) {
			$(sliderHandle).addClass("swingjs-ui");
			$(sliderTrack).addClass("swingjs-ui");
		}
	}

	/**
	 * called from JavaScript via the hook added in getDOMObject  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryCallback(Object event, DOMNode ui) {
		// from JavaScript
		int value = 0;
		
		/**
		 * @j2sNative
		 * 
		 * value = ui.value;
		 * 
		 */
		{}
		
		jSlider.setValue(val = value);
	}

	private void setSliderAttr(String key, int val) {
		System.out.println(id + " setting " + key + " = " + val);
		/**
		 * @j2sNative
		 * 
		 *  var a = {};
		 *  a[key]= val;
		 *  this.$(this.jqSlider).slider(a);
		 */
		{}
	}

	public void setSlider() {
		setSliderAttr("value", val);
		setSliderAttr("min", min);
		setSliderAttr("max", max);
		boolean isHoriz = (jSlider.getOrientation() == SwingConstants.HORIZONTAL);
		String tickClass = ".ui-slider-tick-mark" + (isHoriz ? "-vert" : "-horiz");
		$(jqSlider).find(tickClass).remove();
		$(jqSlider).find(".jslider-labels").remove();
		setHTMLSize(jqSlider, false);
		if (majorSpacing == 0 || minorSpacing == 0
				|| !paintTicks && !paintLabels)
			return;
		// TODO: test inverted
		boolean isInverted = jSlider.getInverted();
		if (paintTicks) {
			int check = majorSpacing / minorSpacing;
			int spacing = minorSpacing * 100 / (max - min);
			int numTicks = (max / minorSpacing) + 1;
			for (int i = 0; i < numTicks; i++) {
				DOMNode node = DOMNode.createElement("span", id + "_t" + i, "class",
						tickClass);
				boolean isMajor = (i % check == 0);
				String spt = (isHoriz == isInverted ? 100 - spacing * i : spacing * i)
						+ "%";
				if (isMajor)
					$(node).css(isHoriz ? "height" : "width", "10px");
				$(node).css(isHoriz ? "left" : "top", spt).appendTo(jqSlider);
			}
			setHTMLSize(jqSlider, false);
		}
		if (paintLabels) {
			int m = 10;
			int h = height;
			int w = width;			
			Dictionary<Integer, JLabel> labels = jSlider.getLabelTable();
			Enumeration keys = labels.keys();
			while (keys.hasMoreElements()) {
				Object key = keys.nextElement();
				int n = Integer.parseInt(key.toString());
				JLabel label = labels.get(key);
				DOMNode labelNode = ((JSComponentUI) label.getUI())
						.getOuterNode();
				// need calculation of pixels
				float frac = (n - min) * 1f / (max - min);
				if (isHoriz == isInverted)
					frac = 1 - frac;
				int top, left;
				if (isHoriz) {
					left = m + (int) (frac * w) - label.getWidth() / 2;
					top = (int) (h * 0.7);
				} else {
					left = (int) (w * 0.7);
					top = m + (int) (frac * w) - label.getHeight() / 2;
				}
				DOMNode.setPositionAbsolute(labelNode, top, left);
				jqSlider.appendChild(labelNode);
			}
			setHTMLSize(jqSlider, false);
		}
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return (orientation == "horizontal" ? new Dimension(100, 40) : new Dimension(20, 100));
	}

	@Override
	protected void installJSUI() {
	  jSlider.addChangeListener(this);
	  jSlider.addPropertyChangeListener(this);
	}

	@Override
	protected void uninstallJSUI() {
	  jSlider.removeChangeListener(this);
	  jSlider.removePropertyChangeListener(this);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		System.out.println(id + " propertyChange " + prop);
		if (prop == "ancestor")
			setZ(false);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		isTainted = true;
		setZ(false);
	}

}
