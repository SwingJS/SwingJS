/*
 * Copyright (c) 1998, 2005, Oracle and/or its affiliates. All rights reserved.
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

package jssun.awt;

//import java.lang.ref.WeakReference;
import java.util.HashMap;

//import jsjava.awt.RenderingHints;

/**
 * This class contains rendering hints that can be used by the
 * {@link jsjava.awt.Graphics2D} class, and classes that implement
 * {@link jsjava.awt.image.BufferedImageOp} and
 * {@link jsjava.awt.image.Raster}.
 */
public class SunHints {
	
  /**
	 * Defines the base type of all keys used along with the
	 * {@link RenderingHints} class to control various
	 * algorithm choices in the rendering and imaging pipelines.
	 * Instances of this class are immutable and unique which
	 * means that tests for matches can be made using the
	 * {@code ==} operator instead of the more expensive
	 * {@code equals()} method.
	 */
	public abstract static class Key {
	    private static HashMap identitymap = new HashMap(17);
	
	    private String getIdentity() {
	        // Note that the identity string is dependent on 3 variables:
	        //     - the name of the subclass of Key
	        //     - the identityHashCode of the subclass of Key
	        //     - the integer key of the Key
	        // It is theoretically possible for 2 distinct keys to collide
	        // along all 3 of those attributes in the context of multiple
	        // class loaders, but that occurence will be extremely rare and
	        // we account for that possibility below in the recordIdentity
	        // method by slightly relaxing our uniqueness guarantees if we
	        // end up in that situation.
	        return getClass().getName()+"@"+
	            Integer.toHexString(getClass().hashCode())+":"+
	            Integer.toHexString(privatekey);
	        //SwingJS was System.getIdentityHashCode here
	    }
	
	    //SwingJS  was static:
	    private void recordIdentity(Key k) {
	        Object identity = k.getIdentity();
	        Object otherref = identitymap.get(identity);
	        if (otherref != null) {
	            Key otherkey = (Key) otherref;
	            if (otherkey != null && otherkey.getClass() == k.getClass()) {
	                throw new IllegalArgumentException(identity+
	                                                   " already registered");
	            }
	            // Note that this system can fail in a mostly harmless
	            // way.  If we end up generating the same identity
	            // String for 2 different classes (a very rare case)
	            // then we correctly avoid throwing the exception above,
	            // but we are about to drop through to a statement that
	            // will replace the entry for the old Key subclass with
	            // an entry for the new Key subclass.  At that time the
	            // old subclass will be vulnerable to someone generating
	            // a duplicate Key instance for it.  We could bail out
	            // of the method here and let the old identity keep its
	            // record in the map, but we are more likely to see a
	            // duplicate key go by for the new class than the old
	            // one since the new one is probably still in the
	            // initialization stage.  In either case, the probability
	            // of loading 2 classes in the same VM with the same name
	            // and identityHashCode should be nearly impossible.
	        }
	        // Note: Use a weak reference to avoid holding on to extra
	        // objects and classes after they should be unloaded.
	        identitymap.put(identity, k);
	    }
	
	    protected int privatekey;
	
	    /**
	     * Construct a key using the indicated private key.  Each
	     * subclass of Key maintains its own unique domain of integer
	     * keys.  No two objects with the same integer key and of the
	     * same specific subclass can be constructed.  An exception
	     * will be thrown if an attempt is made to construct another
	     * object of a given class with the same integer key as a
	     * pre-existing instance of that subclass of Key.
	     * @param privatekey the specified key
	     */
	    public Key(int privatekey) {
	        this.privatekey = privatekey;
	        recordIdentity(this);
	    }
	
	    /**
	     * Returns true if the specified object is a valid value
	     * for this Key.
	     * @param val the <code>Object</code> to test for validity
	     * @return <code>true</code> if <code>val</code> is valid;
	     *         <code>false</code> otherwise.
	     */
	    public abstract boolean isCompatibleValue(Object val);
	
	    /**
	     * Returns the private integer key that the subclass
	     * instantiated this Key with.
	     * @return the private integer key that the subclass
	     * instantiated this Key with.
	     */
	    public final int intKey() {
	        return privatekey;
	    }
	
	    /**
	     * The hash code for all Key objects will be the same as the
	     * system identity code of the object as defined by the
	     * System.identityHashCode() method.
	     */
	    public final int hashCode() {
	        return super.hashCode();
	    }
	
	    /**
	     * The equals method for all Key objects will return the same
	     * result as the equality operator '=='.
	     */
	    public final boolean equals(Object o) {
	        return this == o;
	    }
	}


    /**
     * Defines the type of all keys used to control various
     * aspects of the rendering and imaging pipelines.  Instances
     * of this class are immutable and unique which means that
     * tests for matches can be made using the == operator instead
     * of the more expensive equals() method.
     */
    public static class SunKey extends SunHints.Key {
        String description;

        /**
         * Construct a key using the indicated private key.  Each
         * subclass of Key maintains its own unique domain of integer
         * keys.  No two objects with the same integer key and of the
         * same specific subclass can be constructed.  An exception
         * will be thrown if an attempt is made to construct another
         * object of a given class with the same integer key as a
         * pre-existing instance of that subclass of Key.
         */
        public SunKey(int privatekey, String description) {
            super(privatekey);
            this.description = description;
        }

        /**
         * Returns the numeric index associated with this Key.  This
         * is useful for use in switch statements and quick lookups
         * of the setting of a particular key.
         */
        public final int getIndex() {
        	  return privatekey;
//            return intKey();
        }
        
        /**
         * Returns a string representation of the Key.
         */
        public final String toString() {
            return description;
        }

        /**
         * Returns true if the specified object is a valid value
         * for this Key.
         */
        public boolean isCompatibleValue(Object val) {
            if (val instanceof Value) {
                return ((Value)val).isCompatibleKey(this);
            }
            return false;
        }
    }

    /**
     * Defines the type of all "enumerative" values used to control
     * various aspects of the rendering and imaging pipelines.  Instances
     * of this class are immutable and unique which means that
     * tests for matches can be made using the == operator instead
     * of the more expensive equals() method.
     */
    public static class Value {
        private SunKey myKey;
        private int index;
        private String description;

        private static Value[][] ValueObjects =
            new Value[NUM_KEYS][VALS_PER_KEY];

        private synchronized static void register(SunKey key,
                                                  Value value) {
            int kindex = key.getIndex();
            int vindex = value.getIndex();
            if (ValueObjects[kindex][vindex] != null) {
                throw new InternalError("duplicate index: "+vindex);
            }
            ValueObjects[kindex][vindex] = value;
        }

        public static Value get(int keyindex, int valueindex) {
            return ValueObjects[keyindex][valueindex];
        }

        /**
         * Construct a value using the indicated private index.  Each
         * subclass of Value maintains its own unique domain of integer
         * indices.  Enforcing the uniqueness of the integer indices
         * is left to the subclass.
         */
        public Value(SunKey key, int index, String description) {
            this.myKey = key;
            this.index = index;
            this.description = description;

            register(key, this);
        }

        /**
         * Returns the numeric index associated with this Key.  This
         * is useful for use in switch statements and quick lookups
         * of the setting of a particular key.
         */
        public final int getIndex() {
            return index;
        }

        /**
         * Returns a string representation of this Value.
         */
        public final String toString() {
            return description;
        }

        /**
         * Returns true if the specified object is a valid Key
         * for this Value.
         */
        public final boolean isCompatibleKey(SunKey k) {
            return myKey == k;
        }

        /**
         * The hash code for all Value objects will be the same
         * as the system identity code of the object as defined by the
         * System.identityHashCode() method.
         */
        public final int hashCode() {
        	// SwingJS -- TODO
            return description.hashCode();//System.identityHashCode(this);
        }

        /**
         * The equals method for all Value objects will return
         * the same result as the equality operator '=='.
         */
        public final boolean equals(Object o) {
            return this == o;
        }
    }

    private static final int NUM_KEYS = 9;
    private static final int VALS_PER_KEY = 8;

    /**
     * Rendering hint key and values
     */
    public static final int INTKEY_RENDERING = 0;
    public static final int INTVAL_RENDER_DEFAULT = 0;
    public static final int INTVAL_RENDER_SPEED = 1;
    public static final int INTVAL_RENDER_QUALITY = 2;

    /**
     * Antialiasing hint key and values
     */
    public static final int INTKEY_ANTIALIASING = 1;
    public static final int INTVAL_ANTIALIAS_DEFAULT = 0;
    public static final int INTVAL_ANTIALIAS_OFF = 1;
    public static final int INTVAL_ANTIALIAS_ON = 2;

    /**
     * Text antialiasing hint key and values
     */
    public static final int INTKEY_TEXT_ANTIALIASING = 2;
    public static final int INTVAL_TEXT_ANTIALIAS_DEFAULT = 0;
    public static final int INTVAL_TEXT_ANTIALIAS_OFF = 1;
    public static final int INTVAL_TEXT_ANTIALIAS_ON = 2;
    public static final int INTVAL_TEXT_ANTIALIAS_GASP = 3;
    public static final int INTVAL_TEXT_ANTIALIAS_LCD_HRGB = 4;
    public static final int INTVAL_TEXT_ANTIALIAS_LCD_HBGR = 5;
    public static final int INTVAL_TEXT_ANTIALIAS_LCD_VRGB = 6;
    public static final int INTVAL_TEXT_ANTIALIAS_LCD_VBGR = 7;

    /**
     * Font fractional metrics hint key and values
     */
    public static final int INTKEY_FRACTIONALMETRICS = 3;
    public static final int INTVAL_FRACTIONALMETRICS_DEFAULT = 0;
    public static final int INTVAL_FRACTIONALMETRICS_OFF = 1;
    public static final int INTVAL_FRACTIONALMETRICS_ON = 2;

    /**
     * Dithering hint key and values
     */
    public static final int INTKEY_DITHERING = 4;
    public static final int INTVAL_DITHER_DEFAULT = 0;
    public static final int INTVAL_DITHER_DISABLE = 1;
    public static final int INTVAL_DITHER_ENABLE = 2;

    /**
     * Interpolation hint key and values
     */
    public static final int INTKEY_INTERPOLATION = 5;
    public static final int INTVAL_INTERPOLATION_NEAREST_NEIGHBOR = 0;
    public static final int INTVAL_INTERPOLATION_BILINEAR = 1;
    public static final int INTVAL_INTERPOLATION_BICUBIC = 2;

    /**
     * Alpha interpolation hint key and values
     */
    public static final int INTKEY_ALPHA_INTERPOLATION = 6;
    public static final int INTVAL_ALPHA_INTERPOLATION_DEFAULT = 0;
    public static final int INTVAL_ALPHA_INTERPOLATION_SPEED = 1;
    public static final int INTVAL_ALPHA_INTERPOLATION_QUALITY = 2;

    /**
     * Color rendering hint key and values
     */
    public static final int INTKEY_COLOR_RENDERING = 7;
    public static final int INTVAL_COLOR_RENDER_DEFAULT = 0;
    public static final int INTVAL_COLOR_RENDER_SPEED = 1;
    public static final int INTVAL_COLOR_RENDER_QUALITY = 2;

    /**
     * Stroke normalization control hint key and values
     */
    public static final int INTKEY_STROKE_CONTROL = 8;
    public static final int INTVAL_STROKE_DEFAULT = 0;
    public static final int INTVAL_STROKE_NORMALIZE = 1;
    public static final int INTVAL_STROKE_PURE = 2;

    /**
     * LCD text contrast control hint key.
     * Value is "100" to make discontiguous with the others which
     * are all enumerative and are of a different class.
     */
    public static final int INTKEY_AATEXT_LCD_CONTRAST = 100;

    /**
     * Rendering hint key and value objects
     */
    public static final SunKey KEY_RENDERING =
        new SunKey(INTKEY_RENDERING,
                         "Global rendering quality key");
    public static final Object VALUE_RENDER_SPEED =
        new Value(KEY_RENDERING,
                           INTVAL_RENDER_SPEED,
                           "Fastest rendering methods");
    public static final Object VALUE_RENDER_QUALITY =
        new Value(KEY_RENDERING,
                           INTVAL_RENDER_QUALITY,
                           "Highest quality rendering methods");
    public static final Object VALUE_RENDER_DEFAULT =
        new Value(KEY_RENDERING,
                           INTVAL_RENDER_DEFAULT,
                           "Default rendering methods");

    /**
     * Antialiasing hint key and value objects
     */
    public static final SunKey KEY_ANTIALIASING =
        new SunKey(INTKEY_ANTIALIASING,
                         "Global antialiasing enable key");
    public static final Object VALUE_ANTIALIAS_ON =
        new Value(KEY_ANTIALIASING,
                           INTVAL_ANTIALIAS_ON,
                           "Antialiased rendering mode");
    public static final Object VALUE_ANTIALIAS_OFF =
        new Value(KEY_ANTIALIASING,
                           INTVAL_ANTIALIAS_OFF,
                           "Nonantialiased rendering mode");
    public static final Object VALUE_ANTIALIAS_DEFAULT =
        new Value(KEY_ANTIALIASING,
                           INTVAL_ANTIALIAS_DEFAULT,
                           "Default antialiasing rendering mode");

    /**
     * Text antialiasing hint key and value objects
     */
    public static final SunKey KEY_TEXT_ANTIALIASING =
        new SunKey(INTKEY_TEXT_ANTIALIASING,
                         "Text-specific antialiasing enable key");
    public static final Object VALUE_TEXT_ANTIALIAS_ON =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_ON,
                           "Antialiased text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_OFF =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_OFF,
                           "Nonantialiased text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_DEFAULT =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_DEFAULT,
                           "Default antialiasing text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_GASP =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_GASP,
                           "gasp antialiasing text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_LCD_HRGB =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_LCD_HRGB,
                           "LCD HRGB antialiasing text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_LCD_HBGR =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_LCD_HBGR,
                           "LCD HBGR antialiasing text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_LCD_VRGB =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_LCD_VRGB,
                           "LCD VRGB antialiasing text mode");
    public static final Object VALUE_TEXT_ANTIALIAS_LCD_VBGR =
        new Value(KEY_TEXT_ANTIALIASING,
                           INTVAL_TEXT_ANTIALIAS_LCD_VBGR,
                           "LCD VBGR antialiasing text mode");

    /**
     * Font fractional metrics hint key and value objects
     */
    public static final SunKey KEY_FRACTIONALMETRICS =
        new SunKey(INTKEY_FRACTIONALMETRICS,
                         "Fractional metrics enable key");
    public static final Object VALUE_FRACTIONALMETRICS_ON =
        new Value(KEY_FRACTIONALMETRICS,
                           INTVAL_FRACTIONALMETRICS_ON,
                           "Fractional text metrics mode");
    public static final Object VALUE_FRACTIONALMETRICS_OFF =
        new Value(KEY_FRACTIONALMETRICS,
                           INTVAL_FRACTIONALMETRICS_OFF,
                           "Integer text metrics mode");
    public static final Object VALUE_FRACTIONALMETRICS_DEFAULT =
        new Value(KEY_FRACTIONALMETRICS,
                           INTVAL_FRACTIONALMETRICS_DEFAULT,
                           "Default fractional text metrics mode");

    /**
     * Dithering hint key and value objects
     */
    public static final SunKey KEY_DITHERING =
        new SunKey(INTKEY_DITHERING,
                         "Dithering quality key");
    public static final Object VALUE_DITHER_ENABLE =
        new Value(KEY_DITHERING,
                           INTVAL_DITHER_ENABLE,
                           "Dithered rendering mode");
    public static final Object VALUE_DITHER_DISABLE =
        new Value(KEY_DITHERING,
                           INTVAL_DITHER_DISABLE,
                           "Nondithered rendering mode");
    public static final Object VALUE_DITHER_DEFAULT =
        new Value(KEY_DITHERING,
                           INTVAL_DITHER_DEFAULT,
                           "Default dithering mode");

    /**
     * Interpolation hint key and value objects
     */
    public static final SunKey KEY_INTERPOLATION =
        new SunKey(INTKEY_INTERPOLATION,
                         "Image interpolation method key");
    public static final Object VALUE_INTERPOLATION_NEAREST_NEIGHBOR =
        new Value(KEY_INTERPOLATION,
                           INTVAL_INTERPOLATION_NEAREST_NEIGHBOR,
                           "Nearest Neighbor image interpolation mode");
    public static final Object VALUE_INTERPOLATION_BILINEAR =
        new Value(KEY_INTERPOLATION,
                           INTVAL_INTERPOLATION_BILINEAR,
                           "Bilinear image interpolation mode");
    public static final Object VALUE_INTERPOLATION_BICUBIC =
        new Value(KEY_INTERPOLATION,
                           INTVAL_INTERPOLATION_BICUBIC,
                           "Bicubic image interpolation mode");

    /**
     * Alpha interpolation hint key and value objects
     */
    public static final SunKey KEY_ALPHA_INTERPOLATION =
        new SunKey(INTKEY_ALPHA_INTERPOLATION,
                         "Alpha blending interpolation method key");
    public static final Object VALUE_ALPHA_INTERPOLATION_SPEED =
        new Value(KEY_ALPHA_INTERPOLATION,
                           INTVAL_ALPHA_INTERPOLATION_SPEED,
                           "Fastest alpha blending methods");
    public static final Object VALUE_ALPHA_INTERPOLATION_QUALITY =
        new Value(KEY_ALPHA_INTERPOLATION,
                           INTVAL_ALPHA_INTERPOLATION_QUALITY,
                           "Highest quality alpha blending methods");
    public static final Object VALUE_ALPHA_INTERPOLATION_DEFAULT =
        new Value(KEY_ALPHA_INTERPOLATION,
                           INTVAL_ALPHA_INTERPOLATION_DEFAULT,
                           "Default alpha blending methods");

    /**
     * Color rendering hint key and value objects
     */
    public static final SunKey KEY_COLOR_RENDERING =
        new SunKey(INTKEY_COLOR_RENDERING,
                         "Color rendering quality key");
    public static final Object VALUE_COLOR_RENDER_SPEED =
        new Value(KEY_COLOR_RENDERING,
                           INTVAL_COLOR_RENDER_SPEED,
                           "Fastest color rendering mode");
    public static final Object VALUE_COLOR_RENDER_QUALITY =
        new Value(KEY_COLOR_RENDERING,
                           INTVAL_COLOR_RENDER_QUALITY,
                           "Highest quality color rendering mode");
    public static final Object VALUE_COLOR_RENDER_DEFAULT =
        new Value(KEY_COLOR_RENDERING,
                           INTVAL_COLOR_RENDER_DEFAULT,
                           "Default color rendering mode");

    /**
     * Stroke normalization control hint key and value objects
     */
    public static final SunKey KEY_STROKE_CONTROL =
        new SunKey(INTKEY_STROKE_CONTROL,
                         "Stroke normalization control key");
    public static final Object VALUE_STROKE_DEFAULT =
        new Value(KEY_STROKE_CONTROL,
                           INTVAL_STROKE_DEFAULT,
                           "Default stroke normalization");
    public static final Object VALUE_STROKE_NORMALIZE =
        new Value(KEY_STROKE_CONTROL,
                           INTVAL_STROKE_NORMALIZE,
                           "Normalize strokes for consistent rendering");
    public static final Object VALUE_STROKE_PURE =
        new Value(KEY_STROKE_CONTROL,
                           INTVAL_STROKE_PURE,
                           "Pure stroke conversion for accurate paths");


    public static class LCDContrastKey extends SunKey {

        public LCDContrastKey(int privatekey, String description) {
            super(privatekey, description);
        }

        /**
         * Returns true if the specified object is a valid value
         * for this Key. The allowable range is 100 to 250.
         */
        public final boolean isCompatibleValue(Object val) {
            if (val instanceof Integer) {
                int ival = ((Integer)val).intValue();
                return ival >= 100 && ival <= 250;
            }
            return false;
        }

    }

		/**
     * LCD text contrast hint key
     */
    public static final Key
        KEY_TEXT_ANTIALIAS_LCD_CONTRAST =
        new LCDContrastKey(INTKEY_AATEXT_LCD_CONTRAST,
                           "Text-specific LCD contrast key");
}
