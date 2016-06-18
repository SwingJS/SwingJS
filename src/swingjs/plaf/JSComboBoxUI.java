package swingjs.plaf;


import javajs.util.PT;


import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.JComboBox;
import jsjavax.swing.JComponent;
import jsjavax.swing.LookAndFeel;
import swingjs.api.DOMNode;

/**
 * A simple drop-down non-editable list for now. Using the jQuery method
 *  
 * 		$(domNode).on("change", f);
 * 
 * we can run our own function here when the selection is made. 
 * 
 */

public class JSComboBoxUI extends JSLightweightUI implements PropertyChangeListener {

	public JSComboBoxUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode createDOMNode() {
		if (domNode == null)
			domNode = focusNode = createDOMObject("select", id);
		populateList();
		JComboBox b = (JComboBox) c;
		b.addPropertyChangeListener(this);
		bindMouse(domNode);
		//bindKeys(domNode); // ? perhaps?
		DOMNode.addJqueryHandledEvent(this, domNode, "change");
		DOMNode.setStyles(domNode, "z-index", "" + (getZIndex(null) + 5));
		setFocusable();
    return domNode;
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		switch (eventType) {
		case -1:
      int index = PT.parseInt("" + DOMNode.getAttr(domNode, "selectedIndex"));
      ((JComboBox) c).setSelectedIndex(index);
			break;
		}
		return true;
	}

	
	private void populateList() {
		$(domNode).empty();
		JComboBox b = (JComboBox) c;
		int n = b.getItemCount();
		int iselect = b.getSelectedIndex();
		for (int i = 0; i < n; i++) {
			String item = b.getItemAt(i).toString();
			DOMNode option = DOMNode.createElement("option", id + "_" + (++incr));
			DOMNode.setAttr(option,  "innerHTML", item);
			if (i == iselect)
				DOMNode.setAttr(option, "selected", "true");
			DOMNode.add(domNode, option);
		}		
	}

	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(jc,
        "ComboBox.background",
        "ComboBox.foreground",
        "ComboBox.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		System.out.println("JSComboBoxUI " + evt);
	}
	
	@Override
  public boolean contains(JComponent c, int x, int y) {
    return false; // do not accept responsibility for this one?
}

  /**
   * Set the visiblity of the popup
   */
  public void setPopupVisible( JComboBox c, boolean v ) {
  	// TODO
  }

  /**
   * Determine the visibility of the popup
   */
  public boolean isPopupVisible( JComboBox c ) {
  	return false;
  }

  /**
   * Determine whether or not the combo box itself is traversable
   */
  public boolean isFocusTraversable( JComboBox c ) {
  	return true;
  }


}
