/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

/*
	Interface used to provide text metrics for some arbitrary font system
*/

public interface ArrangeMeasurement
{
	// conversion between angstrom units of molecules, and device units
	public double scale();
	public double angToX(double AX);
	public double angToY(double AY);
	public double xToAng(double PX);
	public double yToAng(double PY);

	// return true for math-style Y-axis, false for screen-style Y-axis
	public boolean yIsUp();

	// returns an array of 3 numbers: ascent, descent, width
	public double[] measureText(String str,double fontSize);
}
