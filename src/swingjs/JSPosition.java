package swingjs;

import jsjavax.swing.text.Position;

class JSPosition implements Position {

	int pos;

	JSPosition(int offset) {
		pos = offset;
	}

	@Override
	public int getOffset() {
		return pos;
	}

}