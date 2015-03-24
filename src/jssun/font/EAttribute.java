/*
 * Copyright (c) 2005, Oracle and/or its affiliates. All rights reserved.
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

/*
 * (C) Copyright IBM Corp. 2005 - All Rights Reserved
 *
 * The original version of this source code and documentation is
 * copyrighted and owned by IBM. These materials are provided
 * under terms of a License Agreement between IBM and Sun.
 * This technology is protected by multiple US and International
 * patents. This notice and attribution to IBM may not be removed.
 */

package jssun.font;

import static jsjava.awt.font.TextAttribute.BACKGROUND;
import static jsjava.awt.font.TextAttribute.BIDI_EMBEDDING;
import static jsjava.awt.font.TextAttribute.CHAR_REPLACEMENT;
import static jsjava.awt.font.TextAttribute.FAMILY;
import static jsjava.awt.font.TextAttribute.FONT;
import static jsjava.awt.font.TextAttribute.FOREGROUND;
import static jsjava.awt.font.TextAttribute.INPUT_METHOD_HIGHLIGHT;
import static jsjava.awt.font.TextAttribute.INPUT_METHOD_UNDERLINE;
import static jsjava.awt.font.TextAttribute.JUSTIFICATION;
import static jsjava.awt.font.TextAttribute.KERNING;
import static jsjava.awt.font.TextAttribute.LIGATURES;
import static jsjava.awt.font.TextAttribute.NUMERIC_SHAPING;
import static jsjava.awt.font.TextAttribute.POSTURE;
import static jsjava.awt.font.TextAttribute.RUN_DIRECTION;
import static jsjava.awt.font.TextAttribute.SIZE;
import static jsjava.awt.font.TextAttribute.STRIKETHROUGH;
import static jsjava.awt.font.TextAttribute.SUPERSCRIPT;
import static jsjava.awt.font.TextAttribute.SWAP_COLORS;
import static jsjava.awt.font.TextAttribute.TRACKING;
import static jsjava.awt.font.TextAttribute.TRANSFORM;
import static jsjava.awt.font.TextAttribute.UNDERLINE;
import static jsjava.awt.font.TextAttribute.WEIGHT;
import static jsjava.awt.font.TextAttribute.WIDTH;

import jsjava.text.AttributedCharacterIterator.Attribute;

import jsjava.awt.font.TextAttribute;

public enum EAttribute {
    EFAMILY(FAMILY),
    EWEIGHT(WEIGHT),
    EWIDTH(WIDTH),
    EPOSTURE(POSTURE),
    ESIZE(SIZE),
    ETRANSFORM(TRANSFORM),
    ESUPERSCRIPT(SUPERSCRIPT),
    EFONT(FONT),
    ECHAR_REPLACEMENT(CHAR_REPLACEMENT),
    EFOREGROUND(FOREGROUND),
    EBACKGROUND(BACKGROUND),
    EUNDERLINE(UNDERLINE),
    ESTRIKETHROUGH(STRIKETHROUGH),
    ERUN_DIRECTION(RUN_DIRECTION),
    EBIDI_EMBEDDING(BIDI_EMBEDDING),
    EJUSTIFICATION(JUSTIFICATION),
    EINPUT_METHOD_HIGHLIGHT(INPUT_METHOD_HIGHLIGHT),
    EINPUT_METHOD_UNDERLINE(INPUT_METHOD_UNDERLINE),
    ESWAP_COLORS(SWAP_COLORS),
    ENUMERIC_SHAPING(NUMERIC_SHAPING),
    EKERNING(KERNING),
    ELIGATURES(LIGATURES),
    ETRACKING(TRACKING),
    EBASELINE_TRANSFORM(null);

    /* package */ final int mask;
    /* package */ final TextAttribute att;

    EAttribute(TextAttribute ta) {
        mask = 1 << ordinal();
        att = ta;
    }

    /* package */ static final EAttribute[] atts = EAttribute.class.getEnumConstants();

    public static EAttribute forAttribute(Attribute ta) {
        for (EAttribute ea: atts) {
            if (ea.att == ta) {
                return ea;
            }
        }
        return null;
    }

    public String toString() {
        return name().substring(1).toLowerCase();
    }
}
