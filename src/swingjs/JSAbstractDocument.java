package swingjs;

import java.util.HashMap;
import java.util.Map;

import swingjs.JSPlainDocument.JSElement;
import jsjavax.swing.event.DocumentEvent;
import jsjavax.swing.event.DocumentListener;
import jsjavax.swing.event.EventListenerList;
import jsjavax.swing.event.UndoableEditListener;
import jsjavax.swing.text.Document;
import jsjavax.swing.text.Element;

public abstract class JSAbstractDocument  implements Document {
	protected Map<Object, Object> props;
	protected JSElement root;
	protected Map<Integer, JSPosition> positions;
	protected EventListenerList listenerList;

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
		// notifyingListeners = true;
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
			// notifyingListeners = false;
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
	protected void fireChangedUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		// notifyingListeners = true;
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
			// notifyingListeners = false;
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
		// notifyingListeners = true;
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
			// notifyingListeners = false;
		}
	}
	
	@Override
	public void addDocumentListener(DocumentListener listener) {
		// JFormattedTextField; DefaultCaret
	}

	@Override
	public void removeDocumentListener(DocumentListener listener) {
		// JFormattedTextField; DefaultCaret
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


