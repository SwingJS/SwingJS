package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjavax.swing.JLabel;
import jsjavax.swing.JSpinner;
import jsjavax.swing.LookAndFeel;
import jsjavax.swing.SwingConstants;
import swingjs.api.DOMNode;

/**
 * A JavaScript equivalent for a label. Text only. Vertical 
 * 
 * @author Bob Hanson
 *
 */
public class JSSpinnerUI extends JSLightweightUI {
	private JSpinner spinner;
	private String textAlign;

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null)	
			textNode = domNode = newDOMObject("label", id);
		//vCenter(domNode, 10);
		String temp = "[spinner]";
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth() + "px",  "height", c.getHeight() + "px", "text-align", textAlign);
		return setCssFont(DOMNode.setAttr(domNode, "innerHTML",temp), c.getFont());
	
	}

	@Override
	public void propertyChangedFromListener(String prop) {
		boolean isVert = (prop.indexOf("vert") >= 0);
		boolean isAlign = (prop.indexOf("Ali") >= 0);
		if (isAlign && !isVert) {
			revalidate();
		} else {
			propertyChangedFromListenerCUI(prop);
		}
	}

	/**
	 * adding in outer styles for text alignment of a label
	 */
	@Override
	protected DOMNode setHTMLElement() {
		setHTMLElementCUI();
//		String prop = null;
//		switch (label.getHorizontalAlignment()) {
//		case SwingConstants.RIGHT:
//		case SwingConstants.TRAILING:
//			prop = "right";
//			break;
//		case SwingConstants.LEFT:
//		case SwingConstants.LEADING:
//			prop = "left";
//			break;
//		case SwingConstants.CENTER:
//			prop = "center";
//			break;
//		}
//		if (prop != null) 
//			DOMNode.setStyles(domNode, "width", c.getWidth() + "px", "text-align", textAlign = prop);
		return outerNode;
	}
	
	@Override
	protected void installUIImpl() {
		spinner = (JSpinner) c;
//    "Spinner.font", ControlFont,
//    "Spinner.ancestorInputMap",
//       new UIDefaults.LazyInputMap(new Object[] {
//                       "UP", "increment",
//                    "KP_UP", "increment",
//                     "DOWN", "decrement",
//                  "KP_DOWN", "decrement",
//       }),
    LookAndFeel.installColorsAndFont(jc, null, null,
        "Spinner.font");
	}

	@Override
	protected void uninstallUIImpl() {
		// TODO Auto-generated method stub
		
	}

}
