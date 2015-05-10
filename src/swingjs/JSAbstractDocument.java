package swingjs;

import java.util.HashMap;
import java.util.Map;

import swingjs.JSPlainDocument.JSElement;
import jsjava.awt.font.TextAttribute;
import jsjavax.swing.event.DocumentEvent;
import jsjavax.swing.event.DocumentListener;
import jsjavax.swing.event.EventListenerList;
import jsjavax.swing.event.UndoableEditEvent;
import jsjavax.swing.event.UndoableEditListener;
import jsjavax.swing.text.AttributeSet;
import jsjavax.swing.text.BadLocationException;
import jsjavax.swing.text.Document;
import jsjavax.swing.text.Element;
import jsjavax.swing.text.StyleConstants;
import jsjavax.swing.text.Utilities;
import jsjavax.swing.text.AbstractDocument.DefaultDocumentEvent;
import jsjavax.swing.undo.UndoableEdit;
import jssun.swing.SwingUtilities2;

public abstract class JSAbstractDocument  implements Document {
	protected Map<Object, Object> props;
	protected JSElement root;
	protected Map<Integer, JSPosition> positions;
	protected EventListenerList listenerList;
	private boolean notifyingListeners;

	public JSAbstractDocument() {
		props = new HashMap<Object, Object>();
	}
	
	@Override
	public Element[] getRootElements() {
		return new Element[] { root, null };
	}

	protected void fixPositions(int offset, int length, boolean isInsert) {
		if (positions == null || positions.isEmpty())
			return;
		if (isInsert) {
			for (Integer i : positions.keySet()) {
				int pos = i.intValue();
				if (pos > offset)
					positions.get(i).pos += length;
			}
			return;
		}
		for (Integer i : positions.keySet()) {
			int pos = i.intValue();
			if (pos <= offset)
				continue;
			if (pos >= offset + length)
				positions.get(i).pos -= length;
			else
				positions.get(i).pos = offset;
		}
	}

  /**
   * Performs the actual work of inserting the text; it is assumed the
   * caller has obtained a write lock before invoking this.
   */
	protected void handleInsertString(int offs, String str, AttributeSet a)
                       throws BadLocationException {
      if ((str == null) || (str.length() == 0)) {
          return;
      }
      // SwingJS n/a
      //UndoableEdit u = data.insertString(offs, str);
      JSDocumentEvent e =
          new JSDocumentEvent(this, offs, str.length(), DocumentEvent.EventType.INSERT);
//      if (u != null) {
//          e.addEdit(u);
//      }

//      // see if complex glyph layout support is needed
//      if( getProperty(I18NProperty).equals( Boolean.FALSE ) ) {
//          // if a default direction of right-to-left has been specified,
//          // we want complex layout even if the text is all left to right.
//          Object d = getProperty(TextAttribute.RUN_DIRECTION);
//          if ((d != null) && (d.equals(TextAttribute.RUN_DIRECTION_RTL))) {
//              putProperty( I18NProperty, Boolean.TRUE);
//          } else {
//              char[] chars = str.toCharArray();
//              if (SwingUtilities2.isComplexLayout(chars, 0, chars.length)) {
//                  putProperty( I18NProperty, Boolean.TRUE);
//              }
//          }
//      }
//
//      insertUpdate(e, a);
//      // Mark the edit as done.
//      e.end();
      fireInsertUpdate(e);
      // only fire undo if Content implementation supports it
      // undo for the composed text is not supported for now
//      if (u != null &&
//          (a == null || !a.isDefined(StyleConstants.ComposedTextAttribute))) {
//          fireUndoableEditUpdate(new UndoableEditEvent(this, e));
//      }
  }

	protected void checkLoc(int start, int end) throws BadLocationException {
		if (start < 0 || end > getLength())
			throw new BadLocationException("JSPlainDocument: out of range",
					(start < 0 ? start : end));
	}

  /**
   * Performs the actual work of the remove. It is assumed the caller
   * will have obtained a <code>writeLock</code> before invoking this.
   */
  protected void handleRemove(int offs, int len) throws BadLocationException {
      if (len > 0) {
          DocumentEvent chng =
                  new JSDocumentEvent(this, offs, len, DocumentEvent.EventType.REMOVE);

          //boolean isComposedTextElement = false;
          // Check whether the position of interest is the composed text
          //isComposedTextElement = Utilities.isComposedTextElement(this, offs);

          // SwingJS n/a
          // removeUpdate(chng);
          // SwingJS n/a 
          // UndoableEdit u = data.remove(offs, len);
          // if (u != null) {
          //     chng.addEdit(u);
          // }
          // SwingJS BIDI only
          // postRemoveUpdate(chng);
          // Mark the edit as done.
          ///chng.end();
          fireRemoveUpdate(chng);
          // only fire undo if Content implementation supports it
          // undo for the composed text is not supported for now
          // SwingJS n/a
          //if ((u != null) && !isComposedTextElement) {
          //    fireUndoableEditUpdate(new UndoableEditEvent(this, chng));
          //}
      }
  }

  /**
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireInsertUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).insertUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}

	/**
	 * SwingJS note: SwingJS does not implement redo/undo and compound edits.  
	 *   
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireChangedUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).changedUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}

	/**
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireRemoveUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).removeUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}
	
	private void checkAlreadyNotifying() {
		if (notifyingListeners)
			throw new IllegalStateException("One of the document listeners modifed the document. This is not allowed.");
	}

	@Override
	public void addDocumentListener(DocumentListener listener) {
		if (listenerList == null)
			listenerList = new EventListenerList();
		listenerList.add(DocumentListener.class, listener);
		// JFormattedTextField; DefaultCaret
	}

	@Override
	public void removeDocumentListener(DocumentListener listener) {
		if (listenerList != null)
			listenerList.remove(DocumentListener.class, listener);
	}

	@Override
	public void addUndoableEditListener(UndoableEditListener listener) {
		// SwingJS -- not necessary?
	}

	@Override
	public void removeUndoableEditListener(UndoableEditListener listener) {
		// SwingJS -- not necessary?
	}

	@Override
	public Object getProperty(Object key) {
		return props.get(key);
	}

	@Override
	public void putProperty(Object key, Object value) {
		props.put(key, value);
	}


}


