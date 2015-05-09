package swingjs;

import java.util.Hashtable;

import javajs.util.AU;
import javajs.util.SB;

import jsjavax.swing.text.AttributeSet;
import jsjavax.swing.text.BadLocationException;
import jsjavax.swing.text.Document;
import jsjavax.swing.text.Element;
import jsjavax.swing.text.Position;
import jsjavax.swing.text.Segment;

/**
 * A very crude implementation of javax.swing.text.PlainDocument. 
 * Adapted from PlainDocument and AbstractDocument
 * 
 * DocumentListeners yet
 * 
 * @author Bob Hanson
 * 
 */
public class JSPlainDocument extends JSAbstractDocument {

	protected Document doc;
	private SB sb;
	private char[] tempChar;

	public JSPlainDocument() {
		super();
		sb = new SB();
		root = new JSElement();
		this.doc = this; // for JSElement
	}

	@Override
	public int getLength() {
		return sb.length();
	}

	private void checkLoc(int start, int end) throws BadLocationException {
		if (start < 0 || end > sb.length())
			throw new BadLocationException("JSPlainDocument: out of range",
					(start < 0 ? start : end));
	}

	private void taint() {
		tempChar = null;
	}

	@Override
	public void remove(int offs, int len) throws BadLocationException {
		checkLoc(offs, offs + len);
		taint();
		String str = sb.substring2(offs, offs + len);
		sb.replace(offs, offs + len, "");
		fixPositions(offs, offs + len, false);
		if (str.indexOf('\n') >= 0)
			setLines();
	}

	@Override
	public void insertString(int offset, String str, AttributeSet a)
			throws BadLocationException {
		checkLoc(offset, offset);
		taint();
		sb.insert(offset, str);
		fixPositions(offset, str.length(), true);
		if (str.indexOf('\n') >= 0)
			setLines();
		// TODO: what about attributes set?
	}

	private void setLines() {
		root = new JSElement();
		String s = sb.toString();
		if (s.lastIndexOf('\n') != s.length() - 1)
			s += "\n";
		int ilast = 0;
		for (int i = 0; i < s.length(); i++) {
			if (s.charAt(i) != '\n')
				continue;
			JSElement e = new JSElement();
			e.start = ilast;
			e.end = i;
			ilast = i + 1;
			root.addChild(e);
		}
	}

	@Override
	public String getText(int offset, int length) throws BadLocationException {
		checkLoc(offset, offset + length);
		return sb.substring2(offset, offset + length);
	}

	@Override
	public void getText(int offset, int length, Segment chars)
			throws BadLocationException {
		checkLoc(offset, offset + length);
		if (tempChar == null) {
			tempChar = new char[sb.length()];
			for (int i = tempChar.length; --i >= 0;)
				tempChar[i] = sb.charAt(i);
		}
		chars.array = tempChar;
		chars.offset = offset;
		chars.count = length;
	}

	@Override
	public Position getStartPosition() {
		return new JSPosition(0);
	}

	@Override
	public Position getEndPosition() {
		return new JSPosition(sb.length());
	}

	@Override
	public Position createPosition(int offs) throws BadLocationException {
		checkLoc(offs, offs);
		Integer i = Integer.valueOf(offs);
		if (positions == null)
			positions = new Hashtable<Integer, JSPosition>();
		JSPosition p = positions.get(i);
		if (p == null)
			positions.put(i, p = new JSPosition(offs));
		return p;
	}

	@Override
	public Element getDefaultRootElement() {
		return root;
	}

	@Override
	public void render(Runnable r) {
		// no idea!
		// TODO Auto-generated method stub
	}

	protected class JSElement implements Element {

		protected Element parent;
		protected AttributeSet attributeSet;
		protected int start;
		protected int end;
		protected int nchildren;
		protected JSElement[] children;
		protected int lastIndex;

		JSElement() {
			children = null;
			nchildren = 0;
			lastIndex = -1;
		}

		public void addChild(JSElement e) {
			if (children == null)
				children = new JSElement[10];
			else if (nchildren == children.length)
				children = (JSElement[]) AU.doubleLength(children);
			children[nchildren++] = e;
		}

		@Override
		public Document getDocument() {
			return doc;
		}

		@Override
		public Element getParentElement() {
			return parent;
		}

		@Override
		public String getName() {
			return getName();
		}

		@Override
		public AttributeSet getAttributes() {
			return attributeSet;
		}

		@Override
		public int getStartOffset() {
			return start;
		}

		@Override
		public int getEndOffset() {
			return end;
		}

		@Override
		public int getElementIndex(int offset) {
			int index;
			int lower = 0;
			int upper = nchildren - 1;
			int mid = 0;
			int p0 = getStartOffset();
			int p1;

			if (nchildren == 0) {
				return 0;
			}
			if (offset >= getEndOffset()) {
				return nchildren - 1;
			}

			// see if the last index can be used.
			if ((lastIndex >= lower) && (lastIndex <= upper)) {
				Element lastHit = children[lastIndex];
				p0 = lastHit.getStartOffset();
				p1 = lastHit.getEndOffset();
				if ((offset >= p0) && (offset < p1)) {
					return lastIndex;
				}

				// last index wasn't a hit, but it does give useful info about
				// where a hit (if any) would be.
				if (offset < p0) {
					upper = lastIndex;
				} else {
					lower = lastIndex;
				}
			}

			while (lower <= upper) {
				mid = lower + ((upper - lower) / 2);
				Element elem = children[mid];
				p0 = elem.getStartOffset();
				p1 = elem.getEndOffset();
				if ((offset >= p0) && (offset < p1)) {
					// found the location
					index = mid;
					lastIndex = index;
					return index;
				} else if (offset < p0) {
					upper = mid - 1;
				} else {
					lower = mid + 1;
				}
			}

			// didn't find it, but we indicate the index of where it would belong
			if (offset < p0) {
				index = mid;
			} else {
				index = mid + 1;
			}
			lastIndex = index;
			return index;
		}

		@Override
		public int getElementCount() {
			return nchildren;
		}

		@Override
		public Element getElement(int index) {
			return (index >= nchildren ? null : children[index]);
		}

		@Override
		public boolean isLeaf() {
			return (parent != null);
		}

	}

}
