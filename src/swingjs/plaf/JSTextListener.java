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
import jsjavax.swing.plaf.ComponentInputMapUIResource;
import jsjavax.swing.plaf.ComponentUI;
import jssun.swing.UIAction;

/**
 * Button Listener
 *
 * @author Jeff Dinkins
 * @author Arnaud Weber (keyboard UI support)
 */

public class JSTextListener implements MouseListener, MouseMotionListener,
                                   FocusListener, ChangeListener, PropertyChangeListener, JSEventHandler
{

    public JSTextListener(JTextComponent b) {
    }

	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		System.out.println("JSTextListener property change: " + prop + " " + e.getSource());
		if ("font" == prop || "foreground" == prop || "preferredSize" == prop) {
			JTextComponent b = (JTextComponent) e.getSource();
			((JSComponentUI) (Object) b.getUI()).notifyPropertyChanged(prop);
		}
	}

//    protected void checkOpacity(JTextComponent b) {
//        b.setOpaque( b.isContentAreaFilled() );
//    }
//
//    /**
//     * Register default key actions: pressing space to "click" a
//     * button and registring the keyboard mnemonic (if any).
//     */
//    public void installKeyboardActions(JComponent c) {
//        JTextComponent b = (JTextComponent)c;
//        // Update the mnemonic binding.
//        updateMnemonicBinding(b);
//
//        LazyActionMap.installLazyActionMap(c, JSButtonListener.class,
//                                           "Button.actionMap");
//
//        InputMap km = getInputMap(JComponent.WHEN_FOCUSED, c);
//
//        SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, km);
//    }

//    /**
//     * Unregister's default key actions
//     */
//    public void uninstallKeyboardActions(JComponent c) {
//        SwingUtilities.replaceUIInputMap(c, JComponent.
//                                         WHEN_IN_FOCUSED_WINDOW, null);
//        SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, null);
//        SwingUtilities.replaceUIActionMap(c, null);
//    }

    /**
     * Returns the InputMap for condition <code>condition</code>. Called as
     * part of <code>installKeyboardActions</code>.
     */
    InputMap getInputMap(int condition, JComponent c) {
//        if (condition == JComponent.WHEN_FOCUSED) {
//            BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
//                         ((JTextComponent)c).getUI(), BasicButtonUI.class);
//            if (ui != null) {
//                return (InputMap)DefaultLookup.get(
//                             c, ui, ui.getPropertyPrefix() + "focusInputMap");
//            }
//        }
        return null;
    }

    public void stateChanged(ChangeEvent e) {
        JTextComponent b = (JTextComponent) e.getSource();
        b.repaint();
    }

    public void focusGained(FocusEvent e) {
//        JTextComponent b = (JTextComponent) e.getSource();
//        if (b instanceof JButton && ((JButton)b).isDefaultCapable()) {
//            JRootPane root = b.getRootPane();
//            if (root != null) {
//               BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
//                         ((JTextComponent)b).getUI(), BasicButtonUI.class);
//               if (ui != null && DefaultLookup.getBoolean(b, ui,
//                                   ui.getPropertyPrefix() +
//                                   "defaultButtonFollowsFocus", true)) {
//                   root.putClientProperty("temporaryDefaultButton", b);
//                   root.setDefaultButton((JButton)b);
//                   root.putClientProperty("temporaryDefaultButton", null);
//               }
//            }
//        }
//        b.repaint();
    }

    public void focusLost(FocusEvent e) {
        JTextComponent b = (JTextComponent) e.getSource();
//        JRootPane root = b.getRootPane();
//        if (root != null) {
//           JButton initialDefault = (JButton)root.getClientProperty("initialDefaultButton");
//           if (b != initialDefault) {
//               BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
//                         ((JTextComponent)b).getUI(), BasicButtonUI.class);
//               if (ui != null && DefaultLookup.getBoolean(b, ui,
//                                   ui.getPropertyPrefix() +
//                                   "defaultButtonFollowsFocus", true)) {
//                   root.setDefaultButton(initialDefault);
//               }
//           }
//        }
//
//        ButtonModel model = b.getModel();
//        model.setArmed(false);
//        model.setPressed(false);
//
//        b.repaint();
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
//			// We need to check the state before and after the button click 
//			// for radio and checkboxes to make sure the DOM button actually got hit.
//			// mousePress is an "arm"; mouseRelease is a "click"
//			
//			((JSButtonUI) (ComponentUI) b.getUI()).verifyButtonClick(false);
//			long multiClickThreshhold = b.getMultiClickThreshhold();
//			long lastTime = lastPressedTimestamp;
//			long currentTime = lastPressedTimestamp = e.getWhen();
//			if (lastTime != -1 && currentTime - lastTime < multiClickThreshhold) {
//				shouldDiscardRelease = true;
//				return;
//			}
//
//			//System.out.println("JSButtonListener press " + b.getName() + " " + e);
//
//			ButtonModel model = b.getModel();
//			if (!model.isEnabled()) {
//				// Disabled buttons ignore all input...
//				return;
//			}
//			if (!model.isArmed()) {
//				// button not armed, should be
//				model.setArmed(true);
//			}
//			model.setPressed(true);
			if (!b.hasFocus() && b.isRequestFocusEnabled()) {
				b.requestFocus();
			}
		}
	};

    public void mouseReleased(MouseEvent e) {
        if (SwingUtilities.isLeftMouseButton(e)) {
//            // Support for multiClickThreshhold
//            JTextComponent b = (JTextComponent) e.getSource();
//      			//System.out.println("JSTextListener released " + b.getName() + " " + e);
//
        }
    };

    public void mouseEntered(MouseEvent e) {
//        JTextComponent b = (JTextComponent) e.getSource();
//        ButtonModel model = b.getModel();
//        if (b.isRolloverEnabled() && !SwingUtilities.isLeftMouseButton(e)) {
//            model.setRollover(true);
//        }
//        if (model.isPressed())
//                model.setArmed(true);
    };

    public void mouseExited(MouseEvent e) {
//        JTextComponent b = (JTextComponent) e.getSource();
//        ButtonModel model = b.getModel();
//        if(b.isRolloverEnabled()) {
//            model.setRollover(false);
//        }
//        model.setArmed(false);
    };


    /**
     * Actions for Buttons. Two types of action are supported:
     * pressed: Moves the button to a pressed state
     * released: Disarms the button.
     */
    private static class Actions extends UIAction {
        private static final String PRESS = "pressed";
        private static final String RELEASE = "released";

        Actions(String name) {
            super(name);
        }

        public void actionPerformed(ActionEvent e) {
            JTextComponent b = (JTextComponent)e.getSource();
            String key = getName();
            if (key == PRESS) {
                if(!b.hasFocus()) {
                    b.requestFocus();
                }
            }
        }

        public boolean isEnabled(Object sender) {
            if(sender != null && (sender instanceof JTextComponent) &&
                      !((JTextComponent)sender).isEnabled()) {
                return false;
            } else {
                return true;
            }
        }
    }


	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		JSTextUI ui = (JSTextUI) target;
		int dot = 0, mark = 0;
		String evType = null;
		/**
		 * @j2sNative
		 * 
		 *            dot = jQueryEvent.target.selectionStart; mark =
		 *            jQueryEvent.target.selectionEnd; evType = jQueryEvent.type;
		 */
		{
		}
		if (dot > mark) {
			int t = dot;
			dot = mark;
			mark = t;
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
		}
		if (dot != ui.editor.getCaret().getDot()
				|| mark != ui.editor.getCaret().getMark()) {
			ui.editor.getCaret().setDot(dot);
			if (dot != mark)
				ui.editor.getCaret().moveDot(mark);
			ui.editor.caretEvent.fire();
		}
		System.out.println(ui.id + " handling event " + evType + " " + eventType
				+ " " + ui.editor.getCaret() + " " + ui.editor.getText());
		return true;
	}
}
  