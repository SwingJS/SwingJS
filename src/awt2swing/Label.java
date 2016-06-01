package awt2swing;

import javax.swing.JLabel;

public class Label extends JLabel {

	public Label() {
		super();
	}
	
	public Label(String text) {
		super(text);
	}
	
	public Label(String text, int center) {
		super(text, center);
	}

	public void setAlignment(int alignment) {
		setAlignmentX(alignment);
		
	}

}
