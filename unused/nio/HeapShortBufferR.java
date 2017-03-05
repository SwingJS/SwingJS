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
 * A read-only HeapShortBuffer. This class extends the corresponding read/write
 * class, overriding the mutation methods to throw a
 * {@link ReadOnlyBufferException} and overriding the view-buffer methods to
 * return an instance of this class rather than of the superclass.
 */

class HeapShortBufferR extends HeapShortBuffer {

	// For speed these fields are actually declared in X-Buffer;
	// these declarations are here as documentation


	HeapShortBufferR(int cap, int lim) { // package-private

		super(cap, lim);
		this.isReadOnly = true;

	}

	HeapShortBufferR(short[] buf, int off, int len) { // package-private

		super(buf, off, len);
		this.isReadOnly = true;

	}

	protected HeapShortBufferR(short[] buf, int mark, int pos, int lim, int cap,
			int off) {

		super(buf, mark, pos, lim, cap, off);
		this.isReadOnly = true;

	}

	@Override
	public ShortBuffer slice() {
		return new HeapShortBufferR(hb, -1, 0, this.remaining(), this.remaining(),
				this.position() + offset);
	}

	@Override
	public ShortBuffer duplicate() {
		return new HeapShortBufferR(hb, this.markValue(), this.position(),
				this.limit(), this.capacity(), offset);
	}

	@Override
	public ShortBuffer asReadOnlyBuffer() {

		return duplicate();

	}

	@Override
	public boolean isReadOnly() {
		return true;
	}

	@Override
	public ShortBuffer put(short x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ShortBuffer put(int i, short x) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ShortBuffer put(short[] src, int offset, int length) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ShortBuffer put(ShortBuffer src) {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ShortBuffer compact() {

		throw new ReadOnlyBufferException();

	}

	@Override
	public ByteOrder order() {
		return ByteOrder.nativeOrder();
	}

}
