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


import jsjava.awt.Dimension;
import jsjavax.swing.LookAndFeel;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

public class JSMenuBarUI extends JSPanelUI {

	// http://www.kriesi.at/wp-content/extra_data/suckerfish_tutorial/step4.html
	
	static {
		JSToolkit.getJavaResource("swingjs/jquery/swingjs-menu.css", true);
	}


	public JSMenuBarUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			containerNode = domNode = createDOMObject("ui", id);
			DOMNode.setPositionAbsolute(domNode, 0, 0); // after title bar 
			$(domNode).addClass("swingjs-menu");
		}

		return domNode;
	}

	private void setMenu() {
		
		/**
		 * @j2sNative

  $(".swingjs-menu ul").css({display: "none"});
  $(".swingjs-menu li").hover(
    function(){$(this).find('ul:first').css({visibility: "visible",display: "none"}).show();},
    function(){$(this).find('ul:first').css({visibility: "hidden"});}
   );

		 * 
		 */
		{}
		
	
	}

	
	
	//	@Override
//  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
//		// SwingJS for now: just designated container width/height 
//		return new Dimension(c.getWidth(), c.getHeight());
//	}
//	
//	@Override
//	public Dimension getPreferredSize() {
//		// SwingJS should defer to containing panel
//		return null;
//	}

	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(jc,
        "MenuBar.background",
        "MenuBar.foreground",
        "MenuBar.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected int getCompHeight() {
		return height = 25;
	}
	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		setMenu();
		return new Dimension(150, 25);
	}



}
