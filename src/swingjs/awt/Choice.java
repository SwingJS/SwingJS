package swingjs.awt;

import javax.swing.JComboBox;


public class Choice extends JComboBox {

	public void select(Object key) {
		setSelectedItem(key);
	}

}
