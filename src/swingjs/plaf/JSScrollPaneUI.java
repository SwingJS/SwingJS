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

import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import jsjava.awt.Component;
import jsjavax.swing.JComponent;
import jsjavax.swing.JLabel;
import jsjavax.swing.JScrollPane;
import jsjavax.swing.JTextArea;
import jsjavax.swing.JViewport;

public class JSScrollPaneUI extends JSComponentUI {

	private JComponent scrolledComponent;
	private JScrollPane scrollpane;
	private JViewport viewport;
	private JSComponentUI scrolledUI;
	
	@Override
	public DOMNode getDOMObject() {
		isContainer = true;
		scrollpane = (JScrollPane) c;
		if (domNode == null) {
			domNode = createDOMObject("div", id);
		}
		JViewport v = scrollpane.getViewport();
		
		if (v != null) {
			viewport = v;
			System.out.println("JSScrollPaneUI v=" + v);
			JComponent sc = null;
			try {
				sc = (JComponent) v.getComponent(0);
			} catch (Exception e) {
				// unusable 
			}
			if (sc != null && sc != scrolledComponent) {
				scrolledComponent = sc;
				scrolledUI = ((JSComponentUI)sc.getUI());
				scrollNode = scrolledUI.divNode;
				if (scrollNode == null)
					scrollNode = scrolledUI.setHTMLElement();
				setDims(scrollNode, c.getWidth(), c.getHeight());
				scrolledUI.scrollerNode = this;
				components = new Component[] { scrolledComponent };
			}
		}
		return domNode;
	}

	@Override
	protected void installJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}
