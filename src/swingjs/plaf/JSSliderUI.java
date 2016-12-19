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

	JSlider jSlider;
	private int min, max, val, majorSpacing, minorSpacing;
	private boolean paintTicks, paintLabels, snapToTicks;
	private Dictionary<Integer, JLabel> labelTable;
	
	private String orientation;
	
	boolean iVertScrollBar; // vertical scrollbars on scroll panes are inverted
	
	JSScrollPaneUI scrollPaneUI;

	
	protected DOMNode jqSlider;
	private int z0 = Integer.MIN_VALUE;
	private BoundedRangeModel model;
	private boolean paintTrack = true;

	protected boolean isScrollBar;
	private JScrollBar jScrollBar;
	private DOMNode sliderTrack;
	private DOMNode sliderHandle;
	private int disabled;

	public JSSliderUI() {
		needPreferred = true;
		setDoc();
	}

	static {
		
		// this mechanism allows on-demand loading of the jQuery slider
		
		JSToolkit.getStaticResource("swingjs/jquery/jquery-ui-j2sslider.css");
		JSToolkit.getStaticResource("swingjs/jquery/jquery-ui-j2sslider.js");
	}

	@Override
	protected DOMNode updateDOMNode() {
		boolean isNew = (domNode == null);
		JSlider js = (JSlider) c;
		min = js.getMinimum();
		max = js.getMaximum();
		val = js.getValue();
		if (!isScrollBar) {
			minorSpacing = js.getMinorTickSpacing();
			majorSpacing = js.getMajorTickSpacing();
			paintTicks = js.getPaintTicks();
			paintLabels = js.getPaintLabels();
			paintTrack = js.getPaintTrack();
			snapToTicks = js.getSnapToTicks();
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

	@Override
	public void installUIImpl() {
		jSlider = (JSlider) c;
		if (isScrollBar)
			jScrollBar = (JScrollBar) c;
	}
	
	private void setJQuerySliderAndEvents() {

		/**
		 * @j2sNative
		 * 
		 *            var me = this; 
		 *            me.$(me.jqSlider).j2sslider(
		 *             { orientation: me.orientation, 
		 *               jslider: me.c,
		 *               range: false, 
		 *               min: me.min,
		 *               max: me.max,
		 *               value: me.val, 
		 *               disabled: me.disabled,
		 *               inverted: me.iVertScrollBar,
		 *               change: function(jqevent, handle) {
		 *                     me.jqueryCallback(jqevent, handle); }, 
		 *               slide: function(jqevent, handle) { 
		 *                     me.jqueryCallback(jqevent, handle); },
		 *               start: function(jqevent, handle) {
		 *                     me.jqueryStart(jqevent, handle); },
		 *               stop: function(jqevent, handle) {
		 *                     me.jqueryStop(jqevent, handle); }
		 *            });
		 */
		{
		}
	}

	@Override
	public void setEnabled(boolean b) {
		super.setEnabled(b);
		setSliderAttr("disabled", (disabled = (b ? 0 : 1)));
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStart(Object event, DOMNode ui) {
	    jSlider.setValueIsAdjusting(true);
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStop(Object event, DOMNode ui) {
	    jSlider.setValueIsAdjusting(false);
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
		
		jSlider.setValue(val = (iVertScrollBar ? 100 - value : value));
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
		//System.out.println("JSSliderUI setting z to " + z);
		sliderTrack = DOMNode.firstChild(domNode);
		sliderHandle = DOMNode.firstChild(sliderTrack);
		//DOMNode.setZ(sliderTrack, z++);
		//DOMNode.setZ(sliderHandle, z++);
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol._jsSetMouse();
		if (isNew) {
			handleAllMouseEvents(sliderHandle);
			handleAllMouseEvents(sliderTrack);
			setDataComponent(sliderHandle);
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

		String tickClass = "ui-j2sslider-tick-mark" + (isHoriz ? "-vert" : "-horiz");
		$(domNode).find("." + tickClass).remove();
		$(domNode).find(".jslider-labels").remove();
		setHTMLSize(jqSlider, false);
		if (majorSpacing == 0 && minorSpacing == 0
				|| !paintTicks && !paintLabels)
			return;
		// TODO: test inverted
		boolean isInverted = jSlider.getInverted();
		int margin = 10;
		int length = (isHoriz ? jSlider.getWidth() : jSlider.getHeight()) - 2 * margin;
		if (paintTicks) {
			if (minorSpacing == 0)
				minorSpacing = majorSpacing;
			int check = majorSpacing / minorSpacing;
			float fracSpacing = minorSpacing * 1f / (max - min);
			int numTicks = ((max - min) / minorSpacing) + 1;
			for (int i = 0; i < numTicks; i++) {
				DOMNode node = DOMNode.createElement("div", id + "_t" + i);
				$(node).addClass("swingjs");
				$(node).addClass(tickClass);
				boolean isMajor = (i % check == 0);
				float frac = (isHoriz == isInverted ? 1 - fracSpacing * i : fracSpacing * i);
				String spt = (frac * length + margin) + "px";
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
			labelTable = jSlider.getLabelTable();
			Enumeration keys = labelTable.keys();
			while (keys.hasMoreElements()) {
				Object key = keys.nextElement();
				int n = Integer.parseInt(key.toString());
				JLabel label = labelTable.get(key);
				DOMNode labelNode = ((JSComponentUI) label.getUI())
						.getOuterNode();
				// need calculation of pixels
				float frac = (n - min) * 1f / (max - min);
				if (isHoriz == isInverted)
					frac = 1 - frac;
				float px = (frac * length + margin);
				int left, top;
				if (isHoriz) {
					top = 20;
					left = (int) (px - label.getWidth() / 2);
				} else {
					top = (int) (px - label.getHeight() / 2);
					left = 28;
				}
				DOMNode.setPositionAbsolute(labelNode, top, left);
				domNode.appendChild(labelNode);
			}
			if (paintTicks) {
				if (isHoriz) {
					DOMNode.setStyles(sliderHandle, "transform","scaleX(0.5) rotateZ(45deg)", "top","-8px");					
					DOMNode.setStyles(sliderTrack, "height","1px", "background", "black", "top", "10px");					
				} else {
					DOMNode.setStyles(sliderHandle, "transform","scaleY(0.5) rotateZ(45deg)", "left","-10px", "margin-bottom", "-7px" );					
					DOMNode.setStyles(sliderTrack, "width","1px","left", "12px", "background", "black" );					
				}
					
			} else {
				DOMNode.setStyles(sliderTrack, isHoriz ? "top" : "left", barPlace + "%");
			}
			if (!isHoriz && !iVertScrollBar)
				DOMNode.setStyles(sliderTrack, "height", length  + "px");
				
			setHTMLSize(domNode, false);
		}
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		int d = 20;
		if (paintLabels || paintTicks)
			d += 10;
		if (jSlider.getBorder() != null)
			d += 10;
		// only the width or height will be read here, not both
		return new Dimension(d, d);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (prop == "ancestor") {
			setup(false);
//		} else if (domNode != null && "paintLabels paintTicks snapToTicks minorTickSpacing majorTickSpacing labelTable ".indexOf(prop) >= 0) {
//		  updateDOMNode();
		}
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		//isTainted = true;
				int v;
		if ((v = jSlider.getMinimum()) != min)
			setSliderAttr("min", min = v);
		if ((v = jSlider.getMaximum()) != max)
			setSliderAttr("max", max = v);		
		if ((v = jSlider.getValue()) != val) 
			setSliderAttr("value", val = v);
		setup(false);
	}


	@Override
	public void setInnerComponentBounds(int width, int height) {
		//DOMNode.setSize(jqSlider, width, height + (iVertScrollBar ? -20 : 0));
		if (iVertScrollBar)
			DOMNode.setStyles(sliderHandle, "left", "-8px");
			
	}

}
