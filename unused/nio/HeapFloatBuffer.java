package jsjava.nio;

public class HeapFloatBuffer extends FloatBuffer {

	HeapFloatBuffer(int cap, int lim) { // package-private
		super(-1, 0, lim, cap, new float[cap], 0);
	}

	HeapFloatBuffer(float[] buf, int off, int len) { // package-private
		super(-1, off, off + len, buf.length, buf, 0);
	}

	protected HeapFloatBuffer(float[] buf, int mark, int pos, int lim, int cap,
			int off) {
		super(mark, pos, lim, cap, buf, off);
	}


	@Override
	public FloatBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FloatBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FloatBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public float get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public FloatBuffer put(float f) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public float get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public FloatBuffer put(int index, float f) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FloatBuffer compact() {
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
