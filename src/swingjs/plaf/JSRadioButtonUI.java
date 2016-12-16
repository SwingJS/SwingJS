package swingjs.plaf;

import java.util.HashMap;
import java.util.Map;

import swingjs.api.DOMNode;
import jsjava.awt.Dimension;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.ButtonGroup;
import jsjavax.swing.DefaultButtonModel;
import jsjavax.swing.ImageIcon;
import jsjavax.swing.JRadioButton;

public class JSRadioButtonUI extends JSButtonUI {

	private DOMNode label;
	private DOMNode wrapper;
	private static Map<ButtonGroup, String> groupNames;
	

	@Override
	protected DOMNode updateDOMNode() {
		isRadio = true;
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
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
				if (name == null)
					name = id;
				if (isNew)
					groupNames.put(bg, name);
			}
			domBtn = enableNode = newDOMObject("input", id, "type", myType, "name",
					name);
			setDataComponent(domBtn);
			iconNode = newDOMObject("span", id + "_icon");
			textNode = newDOMObject("label", id + "l1");
			setEnabled(c.isEnabled());
			label = newDOMObject("label", id + "l2", "htmlFor", id);
			setDataComponent(label);
			setDataComponent(iconNode); // needed for mac safari/chrome
			setDataComponent(textNode); // needed for mac safari/chrome
			// hasOuterDiv will be true unless this is a menu bar menu ?
			if (hasOuterDiv) {
				wrapper = label;
			} else {
				wrapper = createItem("_item", label);
			}
		}
		if (b.isSelected() || isNew)
			DOMNode.setAttr(domBtn, "checked", "true");
		setCssFont(textNode, c.getFont());

		setIconAndText("radio", (ImageIcon) button.getIcon(), button.getIconTextGap(), button.getText());

		// Get the dimensions of the radio button by itself.

		// We have to remove any position:abolute because if that
		// is there, it messes up the width and height calculation.
		DOMNode.setStyles(iconNode, "position", null);
		DOMNode.setStyles(domBtn, "position", null);
		DOMNode.setStyles(textNode, "position", null);
		DOMNode obj;
		Dimension dobj = null;
		if (hasOuterDiv) {
			// We need the width of the text to position the button.
			// But we need to slightly underestimate it so that the
			// width of label + button does not go over the total calculated width
			int wBtn = setHTMLSize1(domBtn, false, false).width - 1;
			int wIcon = Math.max(0, setHTMLSize1(iconNode, false, false).width - 1);
			// Now wrap the two with a div and get its dimensions
			// and then put them back into the wrapper.
			dobj = setHTMLSize1(wrap("div", "", iconNode, domBtn, textNode), false, false);
			// set the offset of the text based on the icon and radio button size
			DOMNode.setStyles(textNode, "left", wBtn + wIcon + "px");
			// add a couple of vertical adjustments

			vCenter(domBtn, -75);
			vCenter(iconNode, -15);
			vCenter(textNode, -50);

			// make everything absolute to pass sizing info to all
			DOMNode.setPositionAbsolute(domBtn, Integer.MIN_VALUE, 0);
			DOMNode.setPositionAbsolute(iconNode, Integer.MIN_VALUE, 0);
			DOMNode.setPositionAbsolute(textNode, Integer.MIN_VALUE, 0);
			DOMNode.setPositionAbsolute(label, Integer.MIN_VALUE, 0);

			// (Re)create label.
		}
		label.appendChild(iconNode);
		label.appendChild(domBtn);
		label.appendChild(textNode);
		if (doAll) {
			// now wrap these in a div
			domNode = obj = (hasOuterDiv ? wrap("div", id + "_0", label) : wrapper);
			if (hasOuterDiv)
				DOMNode.setPositionAbsolute(obj, Integer.MIN_VALUE, 0);
		} else {
			obj = domNode;
		}
		if (hasOuterDiv) {
			DOMNode.setSize(label, dobj.width, dobj.height);
			DOMNode.setSize(obj, dobj.width, dobj.height);
		}
		return obj;
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// "absolute" is required for positioning of button, but must not be there
		// for setting the size.
		DOMNode.setStyles(label, "position", null, "width", null, "height", null);
		DOMNode.setStyles(domBtn, "position", null, "width", null, "height", null);
		DOMNode
				.setStyles(textNode, "position", null, "width", null, "height", null);
		Dimension d;
		if (hasOuterDiv) {
			d = setHTMLSize1(obj, addCSS, false);
			DOMNode.setPositionAbsolute(domBtn, Integer.MIN_VALUE, 0);
			DOMNode.setPositionAbsolute(textNode, Integer.MIN_VALUE, 0);
			DOMNode.setPositionAbsolute(label, Integer.MIN_VALUE, 0);
			DOMNode.setStyles(label, "width", d.width + "px", "height", d.height
					+ "px");
		} else {
			d = new Dimension(20,20);
		}
		return d;
	}


	public void handleDOMEvent(Object e) {
		((AbstractButton) c).doClick(0);
	}
	
	@Override
	protected int getDefaultIconTextGap() {
		return 4;
	}


}
