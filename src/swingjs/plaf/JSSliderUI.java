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


import javax.swing.SwingConstants;

import jsjava.awt.Dimension;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.JSlider;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import swingjs.J2SRequireImport;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSSliderUI extends JSComponentUI implements PropertyChangeListener, ChangeListener {

	private JSlider jSlider;
	private int min, max, val;
	private String orientation;
	
	protected DOMNode jqSlider;
	private int z0 = Integer.MIN_VALUE;

	public JSSliderUI() {
		needPreferred = true;
		setDoc();
	}

	static {		
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-slider.css");
		JSToolkit.getJavaResource("swingjs/jquery/jquery-ui-slider.js");
	}
	@Override
	public DOMNode getDOMObject() {
		JSlider js  = jSlider = (JSlider) c;
		boolean isNew = (domNode == null);
		if (isNew) {
			domNode = wrap("div", id + "_wrap", jqSlider = DOMNode.createElement("div", id));
			DOMNode.setAttr(domNode, "className", "swingjs");
			orientation = (js.getOrientation() == SwingConstants.VERTICAL ? "vertical" : "horizontal");
			min = js.getMinimum();
			max = js.getMaximum();
			val = js.getValue();
					

			/**	
			 * @j2sNative
			 *
    var me = this;
    me.$(me.jqSlider).slider({
      orientation: me.orientation,
      range: false,
      min: me.min,
      max: me.max,
      value: me.val,
      change: function( event, handle ) {
      	me.jqueryCallback(event, handle);
      },
      slide: function( event, handle ) {
      	me.jqueryCallback(event, handle);
      }
    });
    
			 */
			{}
			
		}
		setZ(isNew);
    return domNode;
	}

	/**
	 * 
	 * @param isNew
	 */
	private void setZ(boolean isNew) {
		int z = JSToolkit.getZIndex(this, null);
		if (z == z0)
			return;
		z0 = z;
		System.out.println("JSSliderUI setting z to " + z);
		DOMNode sliderTrack = null;
		DOMNode sliderHandle = null;
		/**
		 * @j2sNative
		 * 
		 * sliderTrack = this.domNode.firstChild;
		 * sliderHandle = sliderTrack.firstChild;
		 * sliderTrack.style["z-index"] = z++;
		 * sliderHandle.style["z-index"] = z++;
		 */
		{}
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol._jsSetMouse();
		if (isNew) {
			$(sliderHandle).addClass("swingjs-ui");
			$(sliderTrack).addClass("swingjs-ui");
		}
	}

	/**
	 * called from JavaScript via the hook added in getDOMObject  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryCallback(Object event, DOMNode ui) {
		// from JavaScript
		int value = 0;
		
		/**
		 * @j2sNative
		 * 
		 * value = ui.value;
		 * 
		 */
		{}
		
		jSlider.setValue(val = value);
	}
	
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return (orientation == "horizontal" ? new Dimension(100, 20) : new Dimension(20, 100));
	}

	@Override
	protected void installJSUI() {
	  jSlider.addChangeListener(this);
	  jSlider.addPropertyChangeListener(this);
	}

	@Override
	protected void uninstallJSUI() {
	  jSlider.removeChangeListener(this);
	  jSlider.removePropertyChangeListener(this);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		System.out.println(id + " propertyChange " + prop);
		if (prop == "ancestor")
			setZ(false);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		int v;
		if ((v = jSlider.getMinimum()) != min)
			setSliderAttr("min", min = v);
		if ((v = jSlider.getMaximum()) != max)
			setSliderAttr("max", max = v);		
		if ((v = jSlider.getValue()) != val)
			setSliderAttr("value", val = v);		
		setZ(false);
	}

	private void setSliderAttr(String key, int val) {
		System.out.println(id + " setting " + key + " = " + val);
		/**
		 * @j2sNative
		 * 
		 *  var a = {};
		 *  a[key]= val;
		 *  this.$(this.jqSlider).slider(a);
		 */
		{}
	}

}
