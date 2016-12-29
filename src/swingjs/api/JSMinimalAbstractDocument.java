package swingjs.api;

import jsjavax.swing.text.AttributeSet;
import jsjavax.swing.text.BadLocationException;
import jsjavax.swing.text.Document;
import jsjavax.swing.text.DocumentFilter;

/**
 * class for all the important methods that do not involve extensive document parsing
 * 
 * @author Bob Hanson
 *
 */
public interface JSMinimalAbstractDocument extends Document {

	int getAsynchronousLoadPriority();

	void replace(int p0, int i, String content,
			AttributeSet attr) throws BadLocationException;

	void setDocumentFilter(DocumentFilter filter);

}
