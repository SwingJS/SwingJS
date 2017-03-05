package jsjava.nio;

import java.io.IOException;

public class HeapCharBuffer extends CharBuffer {

	HeapCharBuffer(int cap, int lim) { // package-private
		super(-1, 0, lim, cap, new char[cap], 0);
	}

	HeapCharBuffer(char[] buf, int off, int len) { // package-private
		super(-1, off, off + len, buf.length, buf, 0);
	}

	protected HeapCharBuffer(char[] buf, int mark, int pos, int lim, int cap,
			int off) {
		super(mark, pos, lim, cap, buf, off);
	}


	@Override
	public int read(CharBuffer cb) throws IOException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public CharBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CharBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CharBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public char get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public CharBuffer put(char c) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public char get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public CharBuffer put(int index, char c) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CharBuffer compact() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isDirect() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	String toString(int start, int end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CharSequence subSequence(int start, int end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ByteOrder order() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isReadOnly() {
		// TODO Auto-generated method stub
		return false;
	}

}
