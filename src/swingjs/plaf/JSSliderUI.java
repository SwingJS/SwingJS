package swingjs.plaf;


import java.util.Dictionary;
import java.util.Enumeration;

import javax.swing.SwingConstants;

import jsjava.awt.Dimension;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.BoundedRangeModel;
import jsjavax.swing.JLabel;
import jsjavax.swing.JScrollBar;
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
	private JScrollBar jScrollBar;
	private DOMNode sliderTrack;

	public JSSliderUI() {
		needPreferred = true;
		setDoc();
	}

	static {
		
		// this mechanism allows on-demand loading of the jQuery slider
		
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-j2sslider.css", true);
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-j2sslider.js", true);
	}

	@Override
	public DOMNode createDOMNode() {
		boolean isNew = (domNode == null);
		JSlider js = jSlider = (JSlider) c;
		min = js.getMinimum();
		max = js.getMaximum();
		val = js.getValue();
		if (isScrollBar) {
			// temporary
			jScrollBar = (JScrollBar) c;
		} else {
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
			setJQuerySliderAndEvents();
		}
		setup(isNew);
		setSlider();
		return domNode;
	}

	private void setJQuerySliderAndEvents() {

		/**
		 * @j2sNative
		 * 
		 *            var me = this; 
		 *            me.$(me.jqSlider).j2sslider(
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

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryCallback(Object event, DOMNode ui) {
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

	/**
	 * 
	 * @param isNew
	 */
	private void setup(boolean isNew) {
		int z = getZIndex(null);
		if (z == z0)
			return;
		z0 = z;
		System.out.println("JSSliderUI setting z to " + z);
		sliderTrack = DOMNode.firstChild(domNode);
		DOMNode sliderHandle = DOMNode.firstChild(sliderTrack);
		//DOMNode.setZ(sliderTrack, z++);
		//DOMNode.setZ(sliderHandle, z++);
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol._jsSetMouse();
		if (isNew) {
			$(sliderHandle).addClass("swingjs-ui");
			$(sliderTrack).addClass("swingjs-ui");
		}
	}

	private void setSliderAttr(String key, int val) {
		//	System.out.println(id + " setting " + key + " = " + val);
		/**
		 * @j2sNative
		 * 
		 *  var a = {};
		 *  a[key]= val;
		 *  this.$(this.jqSlider).j2sslider(a);
		 */
		{}
	}

	public void setSlider() {
		setSliderAttr("value", val);
		setSliderAttr("min", min);
		setSliderAttr("max", max);
		
		boolean isHoriz = (jSlider.getOrientation() == SwingConstants.HORIZONTAL);

		int barPlace = 40;
		if (isHoriz &&  jSlider.getBorder() != null)
			barPlace += 10;

		String tickClass = "ui-slider-tick-mark" + (isHoriz ? "-vert" : "-horiz");
		$(jqSlider).find(tickClass).remove();
		$(jqSlider).find(".jslider-labels").remove();
		setHTMLSize(jqSlider, false);
		if (majorSpacing == 0 || minorSpacing == 0
				|| !paintTicks && !paintLabels)
			return;
		// TODO: test inverted
		boolean isInverted = jSlider.getInverted();
		int margin = 10;
		int totalWidth = jSlider.getWidth();
		if (paintTicks) {
			int check = majorSpacing / minorSpacing;
			float fracSpacing = minorSpacing * 1f / (max - min);
			int numTicks = (100 / minorSpacing) + 1;
			for (int i = 0; i < numTicks; i++) {
				DOMNode node = DOMNode.createElement("span", id + "_t" + i);
				$(node).addClass("swingjs");
				$(node).addClass(tickClass);
				boolean isMajor = (i % check == 0);
				float frac = (isHoriz == isInverted ? 1 - fracSpacing * i : fracSpacing * i);
				String spt = (frac * (totalWidth - 2 * margin) + margin) + "px";
				if (isMajor)
					$(node).css(isHoriz ? "height" : "width", "10px");
				$(node).css(isHoriz ? "left" : "top", spt).appendTo(domNode);
			}
			setHTMLSize(domNode, false);
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
				float px = (frac * (totalWidth - 2 * margin) + margin);
				int left = (int) (px - label.getWidth() / 2);
				int top;
				if (isHoriz) {
					top = 28;
				} else {
					top = left;
					left = 28;
				}
				DOMNode.setPositionAbsolute(labelNode, top, left);
				domNode.appendChild(labelNode);
			}
			DOMNode.setStyles(sliderTrack, isHoriz ? "top" : "left", barPlace + "%"); 
			setHTMLSize(domNode, false);
		}
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		int d = 20;
		if (paintLabels || paintTicks)
			d += 20;
		if (jSlider.getBorder() != null)
			d += 10;
		return (orientation == "horizontal" ? new Dimension(100, d) : new Dimension(d, 100));
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
			setup(false);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		isTainted = true;
				int v;
		if ((v = jSlider.getMinimum()) != min)
			setSliderAttr("min", min = v);
		if ((v = jSlider.getMaximum()) != max)
			setSliderAttr("max", max = v);		
		if ((v = jSlider.getValue()) != val)
			setSliderAttr("value", val = v);
		setup(false);
	}

}
