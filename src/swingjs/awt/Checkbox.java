package swingjs.awt;

import javax.swing.JCheckBox;

public class Checkbox extends JCheckBox {

	public Checkbox(String label) {
		super(label);
	}

	public Checkbox(String text, boolean selected) {
		super(text,selected);
	}

	public boolean getState() {
		super.isSelected();
		return false;
	}

	public void setState(boolean state) {
		super.setSelected(state);
		
	}

}


