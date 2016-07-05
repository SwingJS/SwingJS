/*
 * Copyright (c) 1995, 2011, Oracle and/or its affiliates. All rights reserved.
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
package jsjava.awt;

import jsjavax.swing.JComponent;
import jsjavax.swing.UIDefaults;
import jsjavax.swing.UIManager;
import jsjavax.swing.plaf.ComponentUI;
import jssun.awt.ConstrainableGraphics;
import swingjs.JSAppletViewer;
import swingjs.JSFrameViewer;
import swingjs.JSToolkit;
import swingjs.api.HTML5Canvas;

/*
 * A class to support swingJS for selected AWT and Swing components
 * 
 * @author Bob Hanson
 * 
 */
public abstract class JSComponent extends Component {

	/**
	 * 
	 * used by SwingJS
	 * 
	 */

  public String htmlName;
	protected int num;
	private static int incr;

	public boolean isRootPane, isContentPane;
	public HTML5Canvas canvas;
	public JSFrameViewer frameViewer;
	public JSAppletViewer appletViewer = JSToolkit.getAppletViewer();    


  public JSComponent() {
  	super();
    num = ++incr;
  }

	/**
	 * 
	 * For SwingJS, we have the graphics without needing to get it from a peer.
	 * Creates a canvas and graphics context for this component's window or applet
	 * at the Applet or Frame level.
	 * 
	 */
	@Override
	public Graphics getGraphics() {
		if (width == 0 || height == 0 || !isVisible())
			return null;
		if (frameViewer != null)
			return frameViewer.getGraphics(0, 0).create();
		// This is for a lightweight component, need to
		// translate coordinate spaces and clip relative to the parent
		if (parent == null)
			return null;
		Graphics g = parent.getGraphics();
		if (g == null)
			return null;
//		if (g instanceof ConstrainableGraphics) {
//			((ConstrainableGraphics) g).constrain(x, y, width, height);
//		} else {
			g.translate(x, y);
			g.setClip(0, 0, width, height);
//		}
		g.setFont(getFont());
		return g;
	}

  public JSFrameViewer getFrameViewer() {
  	JSComponent parent = null;
    return (frameViewer != null  ? frameViewer 
    		: (parent = getParent()) == null ? null  
    				: (frameViewer = parent.getFrameViewer())); 
  }
	
  public String getHTMLName(String uid) {
  	return (htmlName == null ? htmlName = appContext.getThreadGroup().getName() 
  			+ "_" + uid + "_" + num : htmlName);
  }

	public ComponentUI ui;
  
  
  public String uiClassID = "JSComponentUI";


  /**
   * Returns the <code>UIDefaults</code> key used to
   * look up the name of the <code>swing.plaf.ComponentUI</code>
   * class that defines the look and feel
   * for this component.  Most applications will never need to
   * call this method.  Subclasses of <code>JComponent</code> that support
   * pluggable look and feel should override this method to
   * return a <code>UIDefaults</code> key that maps to the
   * <code>ComponentUI</code> subclass that defines their look and feel.
   *
   * @return the <code>UIDefaults</code> key for a
   *          <code>ComponentUI</code> subclass
   * @see UIDefaults#getUI
   * @beaninfo
   *      expert: true
   * description: UIClassID
   */
	public String getUIClassID() {
      return uiClassID;
  }

	public void setUI(ComponentUI ui) {
		this.ui = ui;
	}

	public ComponentUI getUI() {
  	return ui;
  }
	
  /**
   * Run once for every component. Resets the UI property to a value from the current look and
   * feel.
   *
   * @see JComponent#updateUI
   */
  public void updateUI() {
      setUI(UIManager.getUI(this));
  }
  
  /**
   * not totally successful;
   * triggered for images, background, and fillBox
   * 
   */
  public boolean isBackgroundPainted;

  public void setIsPainted(boolean TF) {
  	isBackgroundPainted = TF;
  }

  @Override
	public boolean isBackgroundSet() {
    return false;// TODO (background != null && !isBackgroundPainted);
}

}
