package swingjs.plaf;

import jsjavax.swing.JLabel;
import jsjavax.swing.LookAndFeel;
import jsjavax.swing.SwingConstants;
import swingjs.api.DOMNode;

/**
 * A JavaScript equivalent for a label. Text only. Vertical 
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSComponentUI {

	private JLabel label;

	@Override
	public DOMNode getDOMObject() {
		label = (JLabel) c;
		if (domNode == null)
			textNode = domNode = createDOMObject("label", id);
		vCenter(domNode, 10);
		DOMNode.setStyles(domNode,  "width", c.getWidth() + "px",  "height", c.getHeight() + "px");
		return setCssFont(DOMNode.setAttr(domNode, "innerHTML",((JLabel) c).getText()), c.getFont());
	
	}

	@Override
	public void notifyPropertyChanged(String prop) {
		boolean isVert = (prop.indexOf("vert") >= 0);
		boolean isAlign = (prop.indexOf("Ali") >= 0);
		if (isAlign && !isVert) {
			setTainted();
			setHTMLElement();
		} else {
			notifyPropChangeCUI(prop);
		}
	}

	/**
	 * adding in outer styles for text alignment of a label
	 */
	@Override
	protected DOMNode setHTMLElement() {
		DOMNode outerNode = setHTMLElementCUI();
		String prop = null;
		switch (label.getHorizontalAlignment()) {
		case SwingConstants.RIGHT:
		case SwingConstants.TRAILING:
			prop = "right";
			break;
		case SwingConstants.LEFT:
		case SwingConstants.LEADING:
			prop = "left";
			break;
		case SwingConstants.CENTER:
			prop = "center";
			break;
		}
		if (prop != null)
			DOMNode.setStyles(outerNode, "width", c.getWidth() + "px", "text-align", prop);
		return outerNode;
	}
	
	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(c, null, null,
        "Label.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}
