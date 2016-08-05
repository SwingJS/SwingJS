/*
 * Copyright (c) 1998, 2007, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
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
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package jssun.java2d.pipe;

import jsjava.awt.geom.PathIterator;
import jsjava.awt.Rectangle;
import jssun.awt.geom.PathConsumer2D;

/**
 * This class can iterate individual span elements generated by scan
 * converting a Shape.
 * This particular implementation flattens the incoming path and then
 * performs simple polygon tracing to calculate the spans.
 *
 * Note that this class holds pointers to native data which must be
 * disposed.  It is not marked as finalizable since it is intended
 * to be very lightweight and finalization is a comparitively expensive
 * procedure.  The caller must specifically use try{} finally{} to
 * manually ensure that the object is disposed after use, otherwise
 * native data structures might be leaked.
 *
 * Here is a code sample for using this class:
 *
 * public void fillShape(Shape s, Rectangle clipRect) {
 *     ShapeSpanIterator ssi = new ShapeSpanIterator(false);
 *     try {
 *         ssi.setOutputArea(clipRect);
 *         ssi.appendPath(s.getPathIterator(null));
 *         int spanbox[] = new int[4];
 *         while (ssi.nextSpan(spanbox)) {
 *             int x = spanbox[0];
 *             int y = spanbox[1];
 *             int w = spanbox[2] - x;
 *             int h = spanbox[3] - y;
 *             fillRect(x, y, w, h);
 *         }
 *     } finally {
 *         ssi.dispose();
 *     }
 * }
 */
public final class ShapeSpanIterator
    implements SpanIterator, PathConsumer2D
{
    long pData;

//    static {
//        initIDs();
//    }
//
//    public static native void initIDs();

    public ShapeSpanIterator(boolean adjust) {
        setNormalize(adjust);
    }

    /*
     * Appends the geometry and winding rule from the indicated
     * path iterator.
     */
    public void appendPath(PathIterator pi) {
        float coords[] = new float[6];

        setRule(pi.getWindingRule());
        while (!pi.isDone()) {
            addSegment(pi.currentSegment(coords), coords);
            pi.next();
        }
        pathDone();
    }

    /*
     * Appends the geometry from the indicated set of polygon points.
     */
    public native void appendPoly(int xPoints[], int yPoints[], int nPoints,
                                  int xoff, int yoff);

    /*
     * Sets the normalization flag so that incoming data is
     * adjusted to nearest (0.25, 0.25) subpixel position.
     */
    private native void setNormalize(boolean adjust);

    /*
     * Sets the rectangle of interest for storing and returning
     * span segments.
     */
    public void setOutputAreaXYWH(int x, int y, int w, int h) {
        setOutputAreaXYXY(x, y, Region.dimAdd(x, w), Region.dimAdd(y, h));
    }

    /*
     * Sets the rectangle of interest for storing and returning
     * span segments.
     */
    public native void setOutputAreaXYXY(int lox, int loy, int hix, int hiy);

    /*
     * Sets the rectangle of interest for storing and returning
     * span segments to the specified Rectangle.
     */
    public void setOutputArea(Rectangle r) {
        setOutputAreaXYWH(r.x, r.y, r.width, r.height);
    }

    /*
     * Sets the rectangle of interest for storing and returning
     * span segments to the bounds of the specified Region.
     */
    public void setOutputArea(Region r) {
        setOutputAreaXYXY(r.lox, r.loy, r.hix, r.hiy);
    }

    /*
     * Sets the winding rule in the native data structures.
     */
    public native void setRule(int rule);

    /*
     * Adds a single PathIterator segment to the internal list of
     * path element structures.
     */
    public native void addSegment(int type, float coords[]);

    /*
     * Gets the bbox of the available path segments, clipped to the
     * OutputArea.
     */
    public native void getPathBox(int pathbox[]);

    /*
     * Intersects the path box with the given bbox.
     * Returned spans are clipped to this region, or discarded
     * altogether if they lie outside it.
     */
    public native void intersectClipBox(int lox, int loy, int hix, int hiy);

    /*
     * Fetches the next span that needs to be operated on.
     * If the return value is false then there are no more spans.
     */
    public native boolean nextSpan(int spanbox[]);

    /**
     * This method tells the iterator that it may skip all spans
     * whose Y range is completely above the indicated Y coordinate.
     */
    public native void skipDownTo(int y);

    /**
     * This method returns a native pointer to a function block that
     * can be used by a native method to perform the same iteration
     * cycle that the above methods provide while avoiding upcalls to
     * the Java object.
     * The definition of the structure whose pointer is returned by
     * this method is defined in:
     * <pre>
     *     src/share/native/sun/java2d/pipe/SpanIterator.h
     * </pre>
     */
    public native long getNativeIterator();

    /*
     * Cleans out all internal data structures.
     */
    public native void dispose();

    public native void moveTo(float x, float y);
    public native void lineTo(float x, float y);
    public native void quadTo(float x1, float y1,
                              float x2, float y2);
    public native void curveTo(float x1, float y1,
                               float x2, float y2,
                               float x3, float y3);
    public native void closePath();
    public native void pathDone();
    public native long getNativeConsumer();
}
