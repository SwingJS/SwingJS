package swingjs.plaf;

import java.util.HashMap;
import java.util.Map;

import swingjs.api.DOMNode;
import jsjava.awt.Dimension;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.ButtonGroup;
import jsjavax.swing.DefaultButtonModel;
import jsjavax.swing.JRadioButton;

public class JSRadioButtonUI extends JSButtonUI {

	private DOMNode label;
	private static Map<ButtonGroup, String> groupNames;
	

	@Override
	public DOMNode getDOMObject() {
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
	}

	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// "absolute" is required for positioning of button, but must not be there for setting the size. 
		DOMNode.setStyles(domBtn, "position", null);
		DOMNode.setStyles(label, "position", null);
		Dimension d = setHTMLSize1(obj, addCSS, false);
		DOMNode.setStyles(domBtn, "position", "absolute");
		DOMNode.setStyles(label, "position", "absolute");
		return d;
	}

	protected DOMNode getButtonObject(String myType) {
		JRadioButton b = (JRadioButton) c;
		boolean isNew = false;
		boolean doAll = false;
		if (domNode == null) {
			doAll = true;
			if (groupNames == null)
				groupNames = new HashMap<ButtonGroup, String>();
			ButtonGroup bg = null;
			String name = id;
			isNew = true;
			if (b.getModel() instanceof DefaultButtonModel) {
				bg = ((DefaultButtonModel) b.getModel()).getGroup();
				name = groupNames.get(bg);
				if (name == null)
					groupNames.put(bg, name = id);
				else
					isNew = false;
			}
			domBtn = enableNode = createDOMObject("input", id, "type", myType, "name",
					name);
			label = textNode = createDOMObject("label", id + "l", "htmlFor", id);
		}
		if (b.isSelected() || isNew)
			DOMNode.setAttr(domBtn, "checked", "true");
		setCssFont(
				DOMNode.setAttr(label, "innerHTML", ((AbstractButton) c).getText()),
				c.getFont());
		// now wrap the two with a span and get its dimensions
		// along with the dimensions of the radio button by itself.
		// This is a hack, for sure.

		Dimension drad = setHTMLSize1(domBtn, false, false);
		/*Dimension dlab = */ setHTMLSize1(label, false, false);
		
		DOMNode obj = wrap("div", "", domBtn, label);
		Dimension dobj = setHTMLSize1(obj, true, true);
		vCenter(domBtn, -75);
		vCenter(label, -50);
		DOMNode.setStyles(label, "position", "absolute", "left", drad.width + "px");
		DOMNode.setStyles(domBtn, "position", "absolute");
		if (doAll) {
			// now wrap these in a div
			obj = wrap("div", id + "_0", domBtn, label);
			DOMNode.setStyles(obj, "position", "absolute");
		} else {
			// must re-introduce these to the original object
			obj = domNode;
			obj.appendChild(domBtn);
			obj.appendChild(label);
		}
		return DOMNode.setSize(obj, dobj.width, dobj.height);
	}

	
}
