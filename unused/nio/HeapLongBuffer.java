package jsjava.nio;

public class HeapLongBuffer extends LongBuffer {

	HeapLongBuffer(int mark, int pos, int lim, int cap) {
		super(mark, pos, lim, cap);
	}

	public HeapLongBuffer(long[] buf, int off, int len) {
		super(-1, off, off + len, buf.length, buf, 0);
	}

	@Override
	public LongBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LongBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LongBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public LongBuffer put(long l) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public LongBuffer put(int index, long l) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LongBuffer compact() {
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
