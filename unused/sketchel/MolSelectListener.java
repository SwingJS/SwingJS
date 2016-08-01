/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

/*
	Allows the EditorPane class to communicate whatever widget encapsulates it.
*/

public interface MolSelectListener
{
	// informs the listener that some part of a molecule has been clicked on; idx>0 for atom, <0 for bond
	public void molSelected(EditorPane source,int idx,boolean dblclick);
	
	// signifies that the right mouse button has been clicked on; idx>0 for atom, <0 for bond
	public void rightMouseButton(EditorPane source,int x,int y,int idx);
	
	// signifies that the dirtiness of the underlying molecule has been changed, i.e. an edit or an un-edit to saved state
	public void dirtyChanged(boolean isdirty);
	
	// signifies that some change has been made to the underlying molecule, such that menu enabling could be affected
	public void reviewMenuState();
}
