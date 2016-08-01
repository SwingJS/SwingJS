/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

/*
	Should be implemented by classes that wish to "listen in" on save events.
*/

public interface SaveListener
{
	public void saveMolecule(Molecule mol);
}
