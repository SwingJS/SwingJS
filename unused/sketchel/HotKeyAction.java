/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.util.*;
import java.awt.*;
import java.awt.geom.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.event.*;

/*
	General use class which traps named hotkeys, and fires them back to the caller as actions. This trivial class should probably
	be in the SWING libraries, rather than forcing every frame component to make its own inner-class version.
*/

public class HotKeyAction extends AbstractAction
{
	String hotkey;
	ActionListener listen;
	public HotKeyAction(String hotkey,ActionListener listen) {this.hotkey=hotkey; this.listen=listen;}
	
	public void actionPerformed(ActionEvent e) 
	{
		listen.actionPerformed(new ActionEvent(hotkey,0,hotkey));
	}
}
