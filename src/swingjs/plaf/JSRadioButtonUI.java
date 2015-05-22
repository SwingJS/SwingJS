/*
 * Copyright (c) 1997, 2005, Oracle and/or its affiliates. All rights reserved.
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

package swingjs.plaf;

import java.util.HashMap;
import java.util.Map;

import swingjs.api.DOMNode;
import jsjava.awt.Dimension;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.ButtonGroup;
import jsjavax.swing.DefaultButtonModel;
import jsjavax.swing.JRadioButton;

public class JSRadioButtonUI extends JSToggleButtonUI {

	private DOMNode label;
	private static Map<ButtonGroup, String> groupNames;
	

	@Override
	public DOMNode getDOMObject() {
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
	}

	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// "absolute" is required for positioning of button, but must not be there for setting the size. 
		DOMNode.setStyles(domBtn, "position", null);
		DOMNode.setStyles(label, "position", null);
		Dimension d = setHTMLSize1(obj, addCSS);
		DOMNode.setStyles(domBtn, "position", "absolute");
		DOMNode.setStyles(label, "position", "absolute");
		return d;
	}

	protected DOMNode getButtonObject(String myType) {
		JRadioButton b = (JRadioButton) c;
		boolean isNew = false;
		boolean doAll = false;
		if (domNode == null) {
			doAll = true;
			if (groupNames == null)
				groupNames = new HashMap<ButtonGroup, String>();
			ButtonGroup bg = null;
			String name = id;
			isNew = true;
			if (b.getModel() instanceof DefaultButtonModel) {
				bg = ((DefaultButtonModel) b.getModel()).getGroup();
				name = groupNames.get(bg);
				if (name == null)
					groupNames.put(bg, name = id);
				else
					isNew = false;
			}
			domBtn = enableNode = createDOMObject("input", id, "type", myType, "name",
					name);
			label = textNode = createDOMObject("label", id + "l", "htmlFor", id);
		}
		if (b.isSelected() || isNew)
			DOMNode.setAttr(domBtn, "checked", "true");
		setCssFont(
				DOMNode.setAttr(label, "innerHTML", ((AbstractButton) c).getText()),
				c.getFont());
		// now wrap the two with a span and get its dimensions
		// along with the dimensions of the radio button by itself.
		// This is a hack, for sure.

		Dimension drad = setHTMLSize1(domBtn, false);
		/*Dimension dlab = */ setHTMLSize1(label, false);
		
		DOMNode obj = wrap("div", "", domBtn, label);
		Dimension dobj = setHTMLSize1(obj, true);
		vCenter(domBtn, -75);
		vCenter(label, -50);
		DOMNode.setStyles(label, "position", "absolute", "left", drad.width + "px");
		DOMNode.setStyles(domBtn, "position", "absolute");
		if (doAll) {
			// now wrap these in a div
			obj = wrap("div", id + "_0", domBtn, label);
			DOMNode.setStyles(obj, "position", "absolute");
		} else {
			// must re-introduce these to the original object
			obj = domNode;
			obj.appendChild(domBtn);
			obj.appendChild(label);
		}
		return setDims(obj, dobj.width, dobj.height);
	}

	
}
