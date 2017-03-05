package jsjava.nio;

public class HeapIntBuffer extends IntBuffer {

	HeapIntBuffer(int cap, int lim) { // package-private
		super(-1, 0, lim, cap, new int[cap], 0);
	}

	HeapIntBuffer(int[] buf, int off, int len) { // package-private
		super(-1, off, off + len, buf.length, buf, 0);
	}

	protected HeapIntBuffer(int[] buf, int mark, int pos, int lim, int cap,
			int off) {
		super(mark, pos, lim, cap, buf, off);
	}


	@Override
	public IntBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IntBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IntBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public IntBuffer put(int i) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public IntBuffer put(int index, int i) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IntBuffer compact() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isDirect() {
		// TODO Auto-generated method stub
		return false;
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
