package swingjs.plaf;

import jsjava.beans.PropertyChangeEvent;
import jsjavax.swing.event.ChangeEvent;

public class JSScrollBarUI extends JSSliderUI {
	// not a perfect solution
	// TODO -- tie in setHorizontal/setVertical
	
	public JSScrollBarUI() {
		super();
		isScrollBar = true;
	}

	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		super.stateChanged(e);
	}

}



