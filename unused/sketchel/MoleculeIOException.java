/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.IOException;

/*
	Exception used when molecule reading or writing goes wrong, in such a way that the format is at fault, rather than the
	underlying IO transport mechanism. Extends IOException so that lazy calling code does not need to distinguish.
*/

public class MoleculeIOException extends IOException
{
	public MoleculeIOException(String message) {super(message);}
	public MoleculeIOException(String message,Throwable cause) {super(message,cause);}
}