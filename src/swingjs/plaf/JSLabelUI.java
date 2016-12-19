package swingjs.plaf;

import jsjavax.swing.ImageIcon;
import jsjavax.swing.JLabel;
import jsjavax.swing.LookAndFeel;
import swingjs.api.DOMNode;

/**
 * A JavaScript equivalent for a label. Text only.  
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSLightweightUI {
	private JLabel label;

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null)	{
			domNode = newDOMObject("label", id);
			domNode.appendChild(iconNode = newDOMObject("span", id+"_icon"));
			domNode.appendChild(textNode = newDOMObject("span", id+"_text"));
		}
		setIconAndText("dom", (ImageIcon) label.getIcon(), label.getIconTextGap(), label.getText());
		//vCenter(domNode, 10);
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth() + "px",  "height", c.getHeight() + "px", "text-align", textAlign);
		return setCssFont(domNode, c.getFont());
	
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
		setTextAlignment(label.getHorizontalAlignment());
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
