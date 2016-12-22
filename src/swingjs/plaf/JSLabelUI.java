package swingjs.plaf;

import jsjavax.swing.ImageIcon;
import jsjavax.swing.JLabel;
import jsjavax.swing.LookAndFeel;
import swingjs.api.DOMNode;

/**
 * A JavaScript equivalent for a label.  
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSLightweightUI {
	private JLabel label;

	public JSLabelUI() {
		setDoc();
	}
	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null)	{
			domNode = newDOMObject("label", id);
			textNode = newDOMObject("span", id+"_text");
			addCenteringNode(domNode);
		}
		setIconAndText("label", (ImageIcon) label.getIcon(), label.getIconTextGap(), label.getText());
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth() + "px",  "height", c.getHeight() + "px", "text-align");
		if (actualHeight > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "height", actualHeight + "px");
		if (actualWidth > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "width", actualWidth + "px");
		setCssFont(centeringNode, c.getFont());
		return domNode;
	
	}

	/**
	 * adding in outer styles for text alignment of a label
	 */
	@Override
	protected DOMNode setHTMLElement() {
		setHTMLElementCUI();
		return outerNode;
	}
	
	@Override
	protected void installUIImpl() {
		label = (JLabel) c;
    LookAndFeel.installColorsAndFont(jc, null, null,
        "Label.font");
	}

	@Override
	protected void uninstallUIImpl() {
		// TODO Auto-generated method stub
		
	}

}
