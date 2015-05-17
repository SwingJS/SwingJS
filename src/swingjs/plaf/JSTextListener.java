/*
 * Copyright (c) 1997, 2006, Oracle and/or its affiliates. All rights reserved.
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

import jsjava.awt.event.ActionEvent;
import jsjava.awt.event.FocusEvent;
import jsjava.awt.event.FocusListener;
import jsjava.awt.event.InputEvent;
import jsjava.awt.event.KeyEvent;
import jsjava.awt.event.MouseEvent;
import jsjava.awt.event.MouseListener;
import jsjava.awt.event.MouseMotionListener;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.text.JTextComponent;
import jsjavax.swing.ButtonModel;
import jsjavax.swing.InputMap;
import jsjavax.swing.JComponent;
import jsjavax.swing.KeyStroke;
import jsjavax.swing.SwingUtilities;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import jsjavax.swing.event.DocumentEvent;
import jsjavax.swing.event.DocumentListener;
import jsjavax.swing.plaf.ComponentInputMapUIResource;
import jsjavax.swing.plaf.ComponentUI;
import jssun.swing.UIAction;

public class JSTextListener implements MouseListener, MouseMotionListener,
                                   FocusListener, ChangeListener, PropertyChangeListener, DocumentListener, JSEventHandler
{

    private JTextComponent b;
    
    boolean haveDocument;

		public JSTextListener(JTextComponent b) {
    	this.b = b;
    	
    }

  void checkDocument() {
  	if (!haveDocument && b.getDocument() != null) {
  		haveDocument = true;
  		b.getDocument().addDocumentListener(this);
  	}
  }
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		System.out.println("JSTextListener property change: " + prop + " " + e.getSource());
		if ("font" == prop || "foreground" == prop || "preferredSize" == prop) {
			JTextComponent b = (JTextComponent) e.getSource();
			((JSComponentUI) (Object) b.getUI()).notifyPropertyChanged(prop);
		}
	}

  public void stateChanged(ChangeEvent e) {
        JTextComponent b = (JTextComponent) e.getSource();
        b.repaint();
    }

    public void focusGained(FocusEvent e) {
    }

    public void focusLost(FocusEvent e) {
        JTextComponent b = (JTextComponent) e.getSource();
    }

    public void mouseMoved(MouseEvent e) {
    }


    public void mouseDragged(MouseEvent e) {
    }

    public void mouseClicked(MouseEvent e) {
    }

	public void mousePressed(MouseEvent e) {
		if (SwingUtilities.isLeftMouseButton(e)) {
			JTextComponent b = (JTextComponent) e.getSource();
			if (!b.contains(e.getX(), e.getY()))
				return;
			if (!b.hasFocus() && b.isRequestFocusEnabled()) {
				b.requestFocus();
			}
		}
	};

    public void mouseReleased(MouseEvent e) {
    };

    public void mouseEntered(MouseEvent e) {
    };

    public void mouseExited(MouseEvent e) {
//        JTextComponent b = (JTextComponent) e.getSource();
//        ButtonModel model = b.getModel();
//        if(b.isRolloverEnabled()) {
//            model.setRollover(false);
//        }
//        model.setArmed(false);
    };


	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		JSTextUI ui = (JSTextUI) target;
		int dot = 0, mark = 0;
		String evType = null;
		/**
		 * @j2sNative
		 * 
		 *            mark = jQueryEvent.target.selectionStart; dot =
		 *            jQueryEvent.target.selectionEnd; evType = jQueryEvent.type;
		 */
		{
		}

		// HTML5 selection is always mark....dot
		// but Java can be oldDot....oldMark

		int oldDot = ui.editor.getCaret().getDot();
		int oldMark = ui.editor.getCaret().getMark();
		if (dot != mark && oldMark == dot) {
			dot = mark;
			mark = oldMark;
		}
		switch (eventType) {
		case MouseEvent.MOUSE_PRESSED:
		case MouseEvent.MOUSE_RELEASED:
		case MouseEvent.MOUSE_CLICKED:
			break;
		case KeyEvent.KEY_PRESSED:
		case KeyEvent.KEY_RELEASED:
		case KeyEvent.KEY_TYPED:
			String val = ui.getJSValue();
			if (!val.equals(ui.currentValue)) {
				String oldval = ui.currentValue;
				ui.currentValue = val; // prevents overwriting of new value same as old
				ui.editor.setText(val);
				ui.editor.firePropertyChangeObject("text", oldval, val);
			}
			break;
		}
		if (dot != oldDot || mark != oldMark) {
			ui.editor.getCaret().setDot(dot);
			if (dot != mark)
				ui.editor.getCaret().moveDot(mark);
			ui.editor.caretEvent.fire();
		}
		System.out.println(ui.id + " handling event " + evType + " " + eventType
				+ " " + ui.editor.getCaret());// + " " + ui.editor.getText());
		return true;
	}

	@Override
	public void insertUpdate(DocumentEvent e) {
		setText();
	}

	@Override
	public void removeUpdate(DocumentEvent e) {
		setText();
	}

	@Override
	public void changedUpdate(DocumentEvent e) {
	}

	private void setText() {
		// this method will only be run in JavaScript; so as not to 
		// have to modify the actual javax.swing code so much, we use
		// the double qualification to prevent Java compilation errors.
		// Not a great idea in general....
	
		((JSComponentUI) (Object) b.getUI()).notifyPropertyChanged("text");	
	}
}
  