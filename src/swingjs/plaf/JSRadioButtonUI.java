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

	private DOMNode wrapper;
	private static Map<ButtonGroup, String> groupNames;
	

	@Override
	public DOMNode createDOMNode() {
		isRadio = true;
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// "absolute" is required for positioning of button, but must not be there for setting the size. 
		DOMNode.setStyles(domBtn, "position", null);
		DOMNode.setStyles(textNode, "position", null);
		DOMNode.setStyles(wrapper, "position", null);
		Dimension d = setHTMLSize1(obj, addCSS, false);
		DOMNode.setPositionAbsolute(domBtn, -1, -1);
		DOMNode.setPositionAbsolute(textNode, -1, -1);
		DOMNode.setPositionAbsolute(wrapper, -1, -1);
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
			if (b.getModel() instanceof DefaultButtonModel) {
				bg = ((DefaultButtonModel) b.getModel()).getGroup();
				name = groupNames.get(bg);
				isNew = (bg != null && name == null);
				if (isNew)
					groupNames.put(bg, name = id);
			}
			domBtn = enableNode = createDOMObject("input", id, "type", myType, "name",
					name);
			textNode = createDOMObject("label", id + "l");
			wrapper = createDOMObject("label", id + "2", "htmlFor", id);
			wrapper.appendChild(domBtn);
			wrapper.appendChild(textNode);
		}
		if (b.isSelected() || isNew)
			DOMNode.setAttr(domBtn, "checked", "true");
		setCssFont(
				DOMNode.setAttr(textNode, "innerHTML", ((AbstractButton) c).getText()),
				c.getFont());

		// get the dimensions of the radio button by itself.
		Dimension drad = setHTMLSize1(domBtn, false, false);
		
		// now wrap the two with a span and get its dimensions
		// and then put them back into wrapper
		setHTMLSize1(textNode, false, false);
		DOMNode obj = wrap("div", "", domBtn, textNode);
		Dimension dobj = setHTMLSize1(obj, true, true);
		wrapper.appendChild(domBtn);
		wrapper.appendChild(textNode);
		
		// set the offset of the text based on the radio button size
		DOMNode.setStyles(textNode, "left", drad.width + "px");
		
		// add a couple of vertical adjustments
		vCenter(domBtn, -75);
		vCenter(textNode, -50);
		
		// make everything absolute to pass sizing info to all
		DOMNode.setPositionAbsolute(domBtn, -1, -1);
		DOMNode.setPositionAbsolute(textNode, -1, -1);
		DOMNode.setPositionAbsolute(wrapper, -1, -1);
		if (doAll) {
			// now wrap these in a div
			domNode = obj = wrap("div", id + "_0", wrapper);
			DOMNode.setPositionAbsolute(obj, -1, -1);
		} else {
			obj = domNode;
		}
		DOMNode.setSize(wrapper, dobj.width, dobj.height);
		return DOMNode.setSize(obj, dobj.width, dobj.height);
	}

	
}
