package a2s;

import javax.swing.JTextArea;

public class TextArea extends JTextArea {

	public TextArea(int rows, int cols) {
		super(rows, cols);
	}

	public TextArea() {
		super();
	}
	
	public TextArea(String text) {
		super(text, 0, 9);
	}


	public TextArea(String text, int rows, int cols) {
		super(text, rows, cols);
	}

}
