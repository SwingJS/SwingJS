package a2s;

import javax.swing.JCheckBox;

public class Checkbox extends JCheckBox {

	public Checkbox(String string) {
		super(string, false);
	}

	public Checkbox(String string, boolean b) {
		super(string, b);
	}

	public Checkbox() {
		super();
	}

	public boolean getState() {
		return isSelected();
	}

	public void setState(boolean b) {
		setSelected(b);
	}

}
