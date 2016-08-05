package jsjavax.swing.text;

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
