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
import java.util.Hashtable;
import java.util.Map;

import swingjs.api.DOMObject;
import jsjava.awt.Dimension;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.ButtonGroup;
import jsjavax.swing.DefaultButtonModel;
import jsjavax.swing.JRadioButton;

public class JSRadioButtonUI extends JSComponentUI {

	private DOMObject radio;
	private DOMObject label;
	private static Map<ButtonGroup, String> groupNames;

	@Override
	public DOMObject getDOMObject() {
		if (groupNames == null)
			groupNames = new HashMap<ButtonGroup, String>();
		JRadioButton b = (JRadioButton) c;
		ButtonGroup bg = null;
		String name = id;
		boolean isNew = true;
		if (b.getModel() instanceof DefaultButtonModel) {
			bg = ((DefaultButtonModel) b.getModel()).getGroup();
		  name = groupNames.get(bg);
		  if (name == null)
		  	groupNames.put(bg, name = id);
		  else
		  	isNew = false;
		}
		radio = createDOMObject("input", id, "type", "radio", "name", name);
		if (b.isSelected() || isNew)
			DOMObject.setAttr(radio, "checked", "true");
		label = setCssFont(createDOMObject("label", id + "l", "htmlFor", id, "innerHTML",
				((AbstractButton) c).getText()), c.getFont());
		// now wrap the two with a sapn and get its dimensions
		// along with the dimensions of the radio button by itself.
		// This is a hack, for sure. 
		DOMObject obj = wrap("span", "", radio, label);
		Dimension d = setHTMLSize(obj, true);
		Dimension drad = setHTMLSize(radio, false);
		setHTMLSize(label, false);
		vCenter(radio, -75);
		vCenter(label, -50);
	  DOMObject.setStyle(label, "left", (drad.width + 8)+"px");
		obj = wrap("div", id + "_0", radio, label);
		return setDims(obj, d.width, d.height);
	}
}
