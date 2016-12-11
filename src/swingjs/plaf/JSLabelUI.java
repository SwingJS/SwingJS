package swingjs.plaf;

import javajs.util.PT;
import jsjava.awt.JSComponent;
import jsjavax.swing.ImageIcon;
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
public class JSLabelUI extends JSLightweightUI {
	private JLabel label;
	private ImageIcon icon;

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null)	{
			textNode = domNode = newDOMObject("label", id);
		}
		DOMNode.setAttr(domNode, "innerHTML", "");
		icon = (ImageIcon) label.getIcon();
		String text = label.getText();
		if (icon != null) {
			DOMNode imageNode = DOMNode.getImageNode(icon.getImage());
			domNode.appendChild(imageNode);
			prefHeight = icon.getIconHeight();
		}
		if (text != null) {
			if (icon != null) {
				int gap = label.getIconTextGap();
				if (gap != 0)
					DOMNode.addHorizontalGap(domNode, gap);
			}
			DOMNode t;
			if (text.indexOf("<html>") == 0) {
				text = fixHTMLString(text);
				t = newDOMObject("span", null, "innerHTML", text);
			} else {
				t = DOMNode.createTextNode(text);
			}	
			domNode.appendChild(t);
		}
		//vCenter(domNode, 10);
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth() + "px",  "height", c.getHeight() + "px", "text-align", textAlign);
		return setCssFont(domNode, c.getFont());
	
	}

	private String fixHTMLString(String text) {
		// PhET uses <html> in labels and uses </br>
		return PT.rep(text.substring(6, text.length() - 7),  "</br>", "");
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
