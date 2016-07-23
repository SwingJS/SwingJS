/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2012-09-11 19:29:26 -0500 (Tue, 11 Sep 2012) $
 * $Revision: 17556 $
 *
 * Copyright (C) 2002-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package swingjs;

import java.awt.event.InputEvent;

import jsjava.awt.Component;
import jsjava.awt.Event;
import jsjava.awt.Toolkit;
import jsjava.awt.event.MouseEvent;
import jsjava.awt.event.MouseWheelEvent;

/**
 * JavaScript interface from JmolJSmol.js via handleOldJvm10Event (for now)
 * 
 * J2SRequireImport is needed because we want to allow JavaScript access to
 * java.awt.Event constant names
 * 
 */

public class JSMouse {

	private JSFrameViewer viewer;
	private Object jqevent;

	public JSMouse(JSFrameViewer v) {
		viewer = v;
	}

	public boolean processEvent(int id, int x, int y, int modifiers, long time, Object jqevent) {
		this.jqevent = jqevent;
		if (id != -1 && id != Event.MOUSE_MOVE)
			modifiers = applyLeftMouse(modifiers);
		switch (id) {
		case -1: // JavaScript
			wheeled(time, x, modifiers);
			break;
		case Event.MOUSE_DOWN:
			xWhenPressed = x;
			yWhenPressed = y;
			modifiersWhenPressed10 = modifiers;
			pressed(time, x, y, modifiers, false);
			break;
		case Event.MOUSE_DRAG:
			dragged(time, x, y, modifiers);
			break;
		case Event.MOUSE_ENTER:
			entry(time, x, y, false);
			break;
		case Event.MOUSE_EXIT:
			entry(time, x, y, true);
			break;
		case Event.MOUSE_MOVE:
			moved(time, x, y, modifiers);
			break;
		case Event.MOUSE_UP:
			released(time, x, y, modifiers);
			// simulate a mouseClicked event for us
			if (x == xWhenPressed && y == yWhenPressed
					&& modifiers == modifiersWhenPressed10) {
				// the underlying code will turn this into dbl clicks for us
				clicked(time, x, y, modifiers, 1);
			}
			break;
		default:
			return false;
		}
		return true;
	}

	/**
	 * 
	 * called by JSmol as processTwoPointGesture(canvas.touches);
	 * 
	 * @param touches
	 *          [[finger1 touches],[finger2 touches]] where finger touches are
	 *          [[x0,y0],[x1,y1],[x2,y2],...]
	 * 
	 */
	public void processTwoPointGesture(float[][][] touches) {
		getMouse2().processTwoPointGesture(touches);
	}

	private JSMouse2 mouse2;
	private JSMouse2 getMouse2() {
		return (mouse2 == null ? (mouse2 = (JSMouse2) JSToolkit.getInstance("swingjs.JSMouse2")).set(this) : mouse2);
	}

	public static final int MOUSE_LEFT = 16; // MouseEvent.BUTTON1_MASK
	public static final int MOUSE_MIDDLE = 8; // Event.ALT_MASK;  MouseEvent.BUTTON2_MASK
	public static final int MOUSE_RIGHT = 4; // Event.META_MASK;  MouseEvent.BUTTON3_MASK
	public static final int MOUSE_WHEEL = 32;

	public static final int EXTENDED_MASK = 0x3FC0; // ^(InputEvent.HIGH_MODIFIERS | JDK_1_3_MODIFIERS)  
	public final static int MAC_COMMAND = MOUSE_LEFT | MOUSE_RIGHT;
	public final static int BUTTON_MASK = MOUSE_LEFT | MOUSE_MIDDLE | MOUSE_RIGHT;
	
	void translateXYBy(int deltaX, int deltaY) {
		// TODO Auto-generated method stub

	}

	public void mouseClicked(MouseEvent e) {
		clicked(e.getWhen(), e.getX(), e.getY(), e.getModifiers(),
				e.getClickCount());
	}

	public void mouseEntered(MouseEvent e) {
		entry(e.getWhen(), e.getX(), e.getY(), false);
	}

	public void mouseExited(MouseEvent e) {
		entry(e.getWhen(), e.getX(), e.getY(), true);
	}

	public void mousePressed(MouseEvent e) {
		pressed(e.getWhen(), e.getX(), e.getY(), e.getModifiers(),
				e.isPopupTrigger());
	}

	public void mouseReleased(MouseEvent e) {
		released(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
	}

	public void mouseDragged(MouseEvent e) {
		int modifiers = e.getModifiers();
		/****************************************************************
		 * Netscape 4.* Win32 has a problem with mouseDragged if you left-drag then
		 * none of the modifiers are selected we will try to fix that here
		 ****************************************************************/
		if ((modifiers & BUTTON_MASK) == 0)
			modifiers |= MOUSE_LEFT;
		/****************************************************************/
		dragged(e.getWhen(), e.getX(), e.getY(), modifiers);
	}

	public void mouseMoved(MouseEvent e) {
		moved(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
	}

	public void mouseWheelMoved(MouseWheelEvent e) {
		e.consume();
		wheeled(e.getWhen(), e.getWheelRotation(), e.getModifiers());
	}

	private void entry(long time, int x, int y, boolean isExit) {
		wheeling = false;
		mouseEnterExit(time, x, y, isExit);
	}

	/**
	 * 
	 * @param time
	 * @param x
	 * @param y
	 * @param modifiers
	 * @param clickCount
	 */
	private void clicked(long time, int x, int y, int modifiers, int clickCount) {
		// clearKeyBuffer();
		// clickedCount is not reliable on some platforms
		// so we will just deal with it ourselves
		mouseAction(MouseEvent.MOUSE_CLICKED, time, x, y, 1, modifiers);
	}

	private boolean isMouseDown; // Macintosh may not recognize CTRL-SHIFT-LEFT as
																// drag, only move
	private boolean wheeling;

	private void moved(long time, int x, int y, int modifiers) {
		// clearKeyBuffer();
		if (isMouseDown)
			mouseAction(MouseEvent.MOUSE_DRAGGED, time, x, y, 0,
					applyLeftMouse(modifiers));
		else
			mouseAction(MouseEvent.MOUSE_MOVED, time, x, y, 0, modifiers);
	}

	void wheeled(long time, int rotation, int modifiers) {
		// clearKeyBuffer();
		wheeling = true;
		mouseAction(MouseEvent.MOUSE_WHEEL, time, 0, rotation, 0, modifiers
				& ~BUTTON_MASK | MOUSE_WHEEL);
	}

	/**
	 * 
	 * @param time
	 * @param x
	 * @param y
	 * @param modifiers
	 * @param isPopupTrigger
	 */
	private void pressed(long time, int x, int y, int modifiers,
			boolean isPopupTrigger) {
		// clearKeyBuffer();
		isMouseDown = true;
		wheeling = false;
		mouseAction(MouseEvent.MOUSE_PRESSED, time, x, y, 0, modifiers);
	}

	private void released(long time, int x, int y, int modifiers) {
		isMouseDown = false;
		wheeling = false;
		mouseAction(MouseEvent.MOUSE_RELEASED, time, x, y, 0, modifiers);
	}

	private void dragged(long time, int x, int y, int modifiers) {
		if (wheeling)
			return;
		if ((modifiers & MAC_COMMAND) == MAC_COMMAND)
			modifiers = modifiers & ~MOUSE_RIGHT | Event.CTRL_MASK;
		mouseAction(MouseEvent.MOUSE_DRAGGED, time, x, y, 0, modifiers);
	}

	private static int applyLeftMouse(int modifiers) {
		// if neither BUTTON2 or BUTTON3 then it must be BUTTON1
		return ((modifiers & BUTTON_MASK) == 0) ? (modifiers | MOUSE_LEFT)
				: modifiers;
	}

	private int xWhenPressed, yWhenPressed, modifiersWhenPressed10;

	private int getButton(int modifiers) {
		switch (modifiers & BUTTON_MASK) {
		case MOUSE_LEFT:
			return MouseEvent.BUTTON1;
		case MOUSE_MIDDLE:
			return MouseEvent.BUTTON2;
		case MOUSE_RIGHT:
			return MouseEvent.BUTTON3;
		default:
			return MouseEvent.NOBUTTON;
		}
	}

	private void mouseEnterExit(long time, int x, int y, boolean isExit) {
		// nothing here?
	}

	private void mouseAction(int id, long time, int x, int y,
			int count, int modifiers) {
	  boolean popupTrigger = 
	      ( (modifiers & EXTENDED_MASK) == 
	          (JSToolkit.isMac ? InputEvent.CTRL_DOWN_MASK | InputEvent.BUTTON1_DOWN_MASK
	          : InputEvent.BUTTON3_DOWN_MASK)
	       );
		int button = getButton(modifiers);
		Component source = viewer.top; // may be a JFrame
		MouseEvent e = new MouseEvent(source, id, time, modifiers, x, y, x, y, count, popupTrigger, button);
		byte[] bdata = new byte[0];
		Object jqevent = this.jqevent;
		/**
		 * @j2sNative
		 *  bdata.jqevent = this.jqevent; 
		 */
		{
			System.out.println(jqevent);
		}
		e.setBData(e, bdata);
		Toolkit.getEventQueue().postEvent(e);
	}


}
