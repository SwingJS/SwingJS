/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 * Copyright 2000-2002 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

// -- This file was mechanically generated: Do not edit! -- //

package jsjava.nio;

/**
 * 
 * 
 * 
 * A read-only HeapByteBuffer. This class extends the corresponding read/write
 * class, overriding the mutation methods to throw a
 * {@link ReadOnlyBufferException} and overriding the view-buffer methods to
 * return an instance of this class rather than of the superclass.
 */

class HeapByteBufferR extends HeapByteBuffer {

	// For speed these fields are actually declared in X-Buffer;
	// these declarations are here as documentation
	/*




    */

	HeapByteBufferR(int cap, int lim) { // package-private

		super(cap, lim);
		this.isReadOnly = true;

	}

	HeapByteBufferR(byte[] buf, int off, int len) { // package-private

		super(buf, off, len);
		this.isReadOnly = true;

	}

	protected HeapByteBufferR(byte[] buf, int mark, int pos, int lim, int cap,
			int off) {

		super(buf, mark, pos, lim, cap, off);
		this.isReadOnly = true;

	}

	@Override
	public ByteBuffer slice() {
		return new HeapByteBufferR(hb, -1, 0, this.remaining(), this.remaining(),
				this.position() + offset);
	}

	@Override
	public ByteBuffer duplicate() {
		return new HeapByteBufferR(hb, this.markValue(), this.position(),
				this.limit(), this.capacity(), offset);
	}

	@Override
	public ByteBuffer asReadOnlyBuffer() {

		return duplicate();

	}

	@Override
	public boolean isReadOnly() {
		return true;
	}

	@Override
	public ByteBuffer put(byte x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer put(int i, byte x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer put(byte[] src, int offset, int length) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer put(ByteBuffer src) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer compact() {

		throw new ReadOnlyBufferException();

	}

	@Override
	byte _get(int i) { // package-private
		return hb[i];
	}

	@Override
	void _put(int i, byte b) { // package-private

		throw new ReadOnlyBufferException();

	}

	// char

	@Override
	public ByteBuffer putChar(char x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putChar(int i, char x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public CharBuffer asCharBuffer() {
//		int size = this.remaining() >> 1;
//		int off = offset + position();
//		return (bigEndian ? (CharBuffer) (new ByteBufferAsCharBufferRB(this, -1, 0,
//				size, size, off)) : (CharBuffer) (new ByteBufferAsCharBufferRL(this,
//				-1, 0, size, size, off)));
//	}

	// short

	@Override
	public ByteBuffer putShort(short x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putShort(int i, short x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public ShortBuffer asShortBuffer() {
//		int size = this.remaining() >> 1;
//		int off = offset + position();
//		return (bigEndian ? (ShortBuffer) (new ByteBufferAsShortBufferRB(this, -1,
//				0, size, size, off)) : (ShortBuffer) (new ByteBufferAsShortBufferRL(
//				this, -1, 0, size, size, off)));
//	}

	// int

	@Override
	public ByteBuffer putInt(int x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putInt(int i, int x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public IntBuffer asIntBuffer() {
//		int size = this.remaining() >> 2;
//		int off = offset + position();
//		return (bigEndian ? (IntBuffer) (new ByteBufferAsIntBufferRB(this, -1, 0,
//				size, size, off)) : (IntBuffer) (new ByteBufferAsIntBufferRL(this, -1,
//				0, size, size, off)));
//	}

	// long

	@Override
	public ByteBuffer putLong(long x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putLong(int i, long x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public LongBuffer asLongBuffer() {
//		int size = this.remaining() >> 3;
//		int off = offset + position();
//		return (bigEndian ? (LongBuffer) (new ByteBufferAsLongBufferRB(this, -1, 0,
//				size, size, off)) : (LongBuffer) (new ByteBufferAsLongBufferRL(this,
//				-1, 0, size, size, off)));
//	}

	// float

	@Override
	public ByteBuffer putFloat(float x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putFloat(int i, float x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public FloatBuffer asFloatBuffer() {
//		int size = this.remaining() >> 2;
//		int off = offset + position();
//		return (bigEndian ? (FloatBuffer) (new ByteBufferAsFloatBufferRB(this, -1,
//				0, size, size, off)) : (FloatBuffer) (new ByteBufferAsFloatBufferRL(
//				this, -1, 0, size, size, off)));
//	}

	// double

	@Override
	public ByteBuffer putDouble(double x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteBuffer putDouble(int i, double x) {

		throw new ReadOnlyBufferException();

	}

//	@Override
//	public DoubleBuffer asDoubleBuffer() {
//		int size = this.remaining() >> 3;
//		int off = offset + position();
//		return (bigEndian ? (DoubleBuffer) (new ByteBufferAsDoubleBufferRB(this,
//				-1, 0, size, size, off))
//				: (DoubleBuffer) (new ByteBufferAsDoubleBufferRL(this, -1, 0, size,
//						size, off)));
//	}

}
