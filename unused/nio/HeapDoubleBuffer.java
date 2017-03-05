package jsjava.nio;

public class HeapDoubleBuffer extends DoubleBuffer {

	HeapDoubleBuffer(int cap, int lim) { // package-private
		super(-1, 0, lim, cap, new double[cap], 0);
	}

	HeapDoubleBuffer(double[] buf, int off, int len) { // package-private
		super(-1, off, off + len, buf.length, buf, 0);
	}

	protected HeapDoubleBuffer(double[] buf, int mark, int pos, int lim, int cap,
			int off) {
		super(mark, pos, lim, cap, buf, off);
	}


	@Override
	public DoubleBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DoubleBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DoubleBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public DoubleBuffer put(double d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public DoubleBuffer put(int index, double d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DoubleBuffer compact() {
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
