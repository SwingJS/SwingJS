/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2006, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package jsjavax.swing;

import jsjava.awt.Adjustable;
import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.event.AdjustmentEvent;
import jsjava.awt.event.AdjustmentListener;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import jsjavax.swing.plaf.ScrollBarUI;



/**
 * An implementation of a scrollbar. The user positions the knob in the
 * scrollbar to determine the contents of the viewing area. The
 * program typically adjusts the display so that the end of the
 * scrollbar represents the end of the displayable contents, or 100%
 * of the contents. The start of the scrollbar is the beginning of the
 * displayable contents, or 0%. The position of the knob within
 * those bounds then translates to the corresponding percentage of
 * the displayable contents.
 * <p>
 * Typically, as the position of the knob in the scrollbar changes
 * a corresponding change is made to the position of the JViewport on
 * the underlying view, changing the contents of the JViewport.
 * <p>
 * <strong>Warning:</strong> Swing is not thread safe. For more
 * information see <a
 * href="package-summary.html#threading">Swing's Threading
 * Policy</a>.
 * <p>
 * <strong>Warning:</strong>
 * Serialized objects of this class will not be compatible with
 * future Swing releases. The current serialization support is
 * appropriate for short term storage or RMI between applications running
 * the same version of Swing.  As of 1.4, support for long term storage
 * of all JavaBeans<sup><font size="-2">TM</font></sup>
 * has been added to the <code>java.beans</code> package.
 * Please see {@link jsjava.beans.XMLEncoder}.
 *
 * @see JScrollPane
 * @beaninfo
 *      attribute: isContainer false
 *    description: A component that helps determine the visible content range of an area.
 *
 * @author David Kloba
 */
public class JScrollBar extends JComponent implements Adjustable
{
    /**
     * All changes from the model are treated as though the user moved
     * the scrollbar knob.
     */
    private ChangeListener fwdAdjustmentEvents;


    /**
     * The model that represents the scrollbar's minimum, maximum, extent
     * (aka "visibleAmount") and current value.
     * @see #setModel
     */
    protected BoundedRangeModel model;


    /**
     * @see #setOrientation
     */
    protected int orientation;


    /**
     * @see #setUnitIncrement
     */
    protected int unitIncrement;


    /**
     * @see #setBlockIncrement
     */
    protected int blockIncrement;


    private void checkOrientation(int orientation) {
        switch (orientation) {
        case VERTICAL:
        case HORIZONTAL:
            break;
        default:
            throw new IllegalArgumentException("orientation must be one of: VERTICAL, HORIZONTAL");
        }
    }


    /**
     * Creates a scrollbar with the specified orientation,
     * value, extent, minimum, and maximum.
     * The "extent" is the size of the viewable area. It is also known
     * as the "visible amount".
     * <p>
     * Note: Use <code>setBlockIncrement</code> to set the block
     * increment to a size slightly smaller than the view's extent.
     * That way, when the user jumps the knob to an adjacent position,
     * one or two lines of the original contents remain in view.
     *
     * @exception IllegalArgumentException if orientation is not one of VERTICAL, HORIZONTAL
     *
     * @see #setOrientation
     * @see #setValue
     * @see #setVisibleAmount
     * @see #setMinimum
     * @see #setMaximum
     */
    public JScrollBar(int orientation, int value, int extent, int min, int max)
    {
        checkOrientation(orientation);
        this.unitIncrement = 1;
        this.blockIncrement = (extent == 0) ? 1 : extent;
        this.orientation = orientation;
        this.model = new DefaultBoundedRangeModel(value, extent, min, max);
        this.model.addChangeListener(fwdAdjustmentEvents = new ModelListener());
        setRequestFocusEnabled(false);
        uiClassID = "ScrollBarUI";
        updateUI();
    }

    
    /**
     * Creates a scrollbar with the specified orientation
     * and the following initial values:
     * <pre>
     * minimum = 0
     * maximum = 100
     * value = 0
     * extent = 10
     * </pre>
     */
    public JScrollBar(int orientation) {
        this(orientation, 0, 10, 0, 100);
    }


    /**
     * Creates a vertical scrollbar with the following initial values:
     * <pre>
     * minimum = 0
     * maximum = 100
     * value = 0
     * extent = 10
     * </pre>
     */
    public JScrollBar() {
        this(VERTICAL);
    }


    /// BH for JScrollBarUI extends JSliderUI
    
    public void addChangeListener(ChangeListener l) {
    	model.addChangeListener(l);
    }
    
    /// BH for JScrollBarUI extends JSliderUI
    
    public void removeChangeListener(ChangeListener l) {
    	model.removeChangeListener(l);
    }
    


    /**
     * Returns the component's orientation (horizontal or vertical).
     *
     * @return VERTICAL or HORIZONTAL
     * @see #setOrientation
     * @see jsjava.awt.Adjustable#getOrientation
     */
    @Override
		public int getOrientation() {
        return orientation;
    }


    /**
     * Set the scrollbar's orientation to either VERTICAL or
     * HORIZONTAL.
     *
     * @exception IllegalArgumentException if orientation is not one of VERTICAL, HORIZONTAL
     * @see #getOrientation
     * @beaninfo
     *    preferred: true
     *        bound: true
     *    attribute: visualUpdate true
     *  description: The scrollbar's orientation.
     *         enum: VERTICAL JScrollBar.VERTICAL
     *               HORIZONTAL JScrollBar.HORIZONTAL
     */
    public void setOrientation(int orientation)
    {
        checkOrientation(orientation);
        int oldValue = this.orientation;
        this.orientation = orientation;
        firePropertyChangeInt("orientation", oldValue, orientation);

//        if ((oldValue != orientation) && (accessibleContext != null)) {
//            accessibleContext.firePropertyChange(
//                    AccessibleContext.ACCESSIBLE_STATE_PROPERTY,
//                    ((oldValue == VERTICAL)
//                     ? AccessibleState.VERTICAL : AccessibleState.HORIZONTAL),
//                    ((orientation == VERTICAL)
//                     ? AccessibleState.VERTICAL : AccessibleState.HORIZONTAL));
//        }
        if (orientation != oldValue) {
            revalidate();
        }
    }


    /**
     * Returns data model that handles the scrollbar's four
     * fundamental properties: minimum, maximum, value, extent.
     *
     * @see #setModel
     */
    public BoundedRangeModel getModel() {
        return model;
    }


    /**
     * Sets the model that handles the scrollbar's four
     * fundamental properties: minimum, maximum, value, extent.
     *
     * @see #getModel
     * @beaninfo
     *       bound: true
     *       expert: true
     * description: The scrollbar's BoundedRangeModel.
     */
    public void setModel(BoundedRangeModel newModel) {
        //Integer oldValue = null;
        BoundedRangeModel oldModel = model;
        if (model != null) {
            model.removeChangeListener(fwdAdjustmentEvents);
            //oldValue = new Integer(model.getValue());
        }
        model = newModel;
        if (model != null) {
            model.addChangeListener(fwdAdjustmentEvents);
        }

        firePropertyChangeObject("model", oldModel, model);

//        if (accessibleContext != null) {
//            accessibleContext.firePropertyChange(
//                    AccessibleContext.ACCESSIBLE_VALUE_PROPERTY,
//                    oldValue, new Integer(model.getValue()));
//        }
    }


    /**
     * Returns the amount to change the scrollbar's value by,
     * given a unit up/down request.  A ScrollBarUI implementation
     * typically calls this method when the user clicks on a scrollbar
     * up/down arrow and uses the result to update the scrollbar's
     * value.   Subclasses my override this method to compute
     * a value, e.g. the change required to scroll up or down one
     * (variable height) line text or one row in a table.
     * <p>
     * The JScrollPane component creates scrollbars (by default)
     * that override this method and delegate to the viewports
     * Scrollable view, if it has one.  The Scrollable interface
     * provides a more specialized version of this method.
     *
     * @param direction is -1 or 1 for up/down respectively
     * @return the value of the unitIncrement property
     * @see #setUnitIncrement
     * @see #setValue
     * @see Scrollable#getScrollableUnitIncrement
     */
    public int getUnitIncrement(int direction) {
        return unitIncrement;
    }


    /**
     * Sets the unitIncrement property.
     * <p>
     * Note, that if the argument is equal to the value of Integer.MIN_VALUE,
     * the most look and feels will not provide the scrolling to the right/down.
     * @see #getUnitIncrement
     * @beaninfo
     *   preferred: true
     *       bound: true
     * description: The scrollbar's unit increment.
     */
    @Override
		public void setUnitIncrement(int unitIncrement) {
        int oldValue = this.unitIncrement;
        this.unitIncrement = unitIncrement;
        firePropertyChangeInt("unitIncrement", oldValue, unitIncrement);
    }


    /**
     * Returns the amount to change the scrollbar's value by,
     * given a block (usually "page") up/down request.  A ScrollBarUI
     * implementation typically calls this method when the user clicks
     * above or below the scrollbar "knob" to change the value
     * up or down by large amount.  Subclasses my override this
     * method to compute a value, e.g. the change required to scroll
     * up or down one paragraph in a text document.
     * <p>
     * The JScrollPane component creates scrollbars (by default)
     * that override this method and delegate to the viewports
     * Scrollable view, if it has one.  The Scrollable interface
     * provides a more specialized version of this method.
     *
     * @param direction is -1 or 1 for up/down respectively
     * @return the value of the blockIncrement property
     * @see #setBlockIncrement
     * @see #setValue
     * @see Scrollable#getScrollableBlockIncrement
     */
    public int getBlockIncrement(int direction) {
        return blockIncrement;
    }


    /**
     * Sets the blockIncrement property.
     * <p>
     * Note, that if the argument is equal to the value of Integer.MIN_VALUE,
     * the most look and feels will not provide the scrolling to the right/down.
     * @see #getBlockIncrement()
     * @beaninfo
     *   preferred: true
     *       bound: true
     * description: The scrollbar's block increment.
     */
    @Override
		public void setBlockIncrement(int blockIncrement) {
        int oldValue = this.blockIncrement;
        this.blockIncrement = blockIncrement;
        firePropertyChangeInt("blockIncrement", oldValue, blockIncrement);
    }


    /**
     * For backwards compatibility with jsjava.awt.Scrollbar.
     * @see Adjustable#getUnitIncrement
     * @see #getUnitIncrement(int)
     */
    @Override
		public int getUnitIncrement() {
        return unitIncrement;
    }


    /**
     * For backwards compatibility with jsjava.awt.Scrollbar.
     * @see Adjustable#getBlockIncrement
     * @see #getBlockIncrement(int)
     */
    @Override
		public int getBlockIncrement() {
        return blockIncrement;
    }


    /**
     * Returns the scrollbar's value.
     * @return the model's value property
     * @see #setValue
     */
    @Override
		public int getValue() {
        return getModel().getValue();
    }


    /**
     * Sets the scrollbar's value.  This method just forwards the value
     * to the model.
     *
     * @see #getValue
     * @see BoundedRangeModel#setValue
     * @beaninfo
     *   preferred: true
     * description: The scrollbar's current value.
     */
    @Override
		public void setValue(int value) {
        BoundedRangeModel m = getModel();
        //int oldValue = m.getValue();
        m.setValue(value);

//        if (accessibleContext != null) {
//            accessibleContext.firePropertyChange(
//                    AccessibleContext.ACCESSIBLE_VALUE_PROPERTY,
//                    new Integer(oldValue),
//                    new Integer(m.getValue()));
    }


    /**
     * Returns the scrollbar's extent, aka its "visibleAmount".  In many
     * scrollbar look and feel implementations the size of the
     * scrollbar "knob" or "thumb" is proportional to the extent.
     *
     * @return the value of the model's extent property
     * @see #setVisibleAmount
     */
    @Override
		public int getVisibleAmount() {
        return getModel().getExtent();
    }


    /**
     * Set the model's extent property.
     *
     * @see #getVisibleAmount
     * @see BoundedRangeModel#setExtent
     * @beaninfo
     *   preferred: true
     * description: The amount of the view that is currently visible.
     */
    @Override
		public void setVisibleAmount(int extent) {
        getModel().setExtent(extent);
    }


    /**
     * Returns the minimum value supported by the scrollbar
     * (usually zero).
     *
     * @return the value of the model's minimum property
     * @see #setMinimum
     */
    @Override
		public int getMinimum() {
        return getModel().getMinimum();
    }


    /**
     * Sets the model's minimum property.
     *
     * @see #getMinimum
     * @see BoundedRangeModel#setMinimum
     * @beaninfo
     *   preferred: true
     * description: The scrollbar's minimum value.
     */
    @Override
		public void setMinimum(int minimum) {
        getModel().setMinimum(minimum);
    }


    /**
     * The maximum value of the scrollbar is maximum - extent.
     *
     * @return the value of the model's maximum property
     * @see #setMaximum
     */
    @Override
		public int getMaximum() {
        return getModel().getMaximum();
    }


    /**
     * Sets the model's maximum property.  Note that the scrollbar's value
     * can only be set to maximum - extent.
     *
     * @see #getMaximum
     * @see BoundedRangeModel#setMaximum
     * @beaninfo
     *   preferred: true
     * description: The scrollbar's maximum value.
     */
    @Override
		public void setMaximum(int maximum) {
        getModel().setMaximum(maximum);
    }


    /**
     * True if the scrollbar knob is being dragged.
     *
     * @return the value of the model's valueIsAdjusting property
     * @see #setValueIsAdjusting
     */
    public boolean getValueIsAdjusting() {
        return getModel().getValueIsAdjusting();
    }


    /**
     * Sets the model's valueIsAdjusting property.  Scrollbar look and
     * feel implementations should set this property to true when
     * a knob drag begins, and to false when the drag ends.  The
     * scrollbar model will not generate ChangeEvents while
     * valueIsAdjusting is true.
     *
     * @see #getValueIsAdjusting
     * @see BoundedRangeModel#setValueIsAdjusting
     * @beaninfo
     *      expert: true
     * description: True if the scrollbar thumb is being dragged.
     */
    public void setValueIsAdjusting(boolean b) {
        BoundedRangeModel m = getModel();
        //boolean oldValue = m.getValueIsAdjusting();
        m.setValueIsAdjusting(b);

//        if ((oldValue != b) && (accessibleContext != null)) {
//            accessibleContext.firePropertyChange(
//                    AccessibleContext.ACCESSIBLE_STATE_PROPERTY,
//                    ((oldValue) ? AccessibleState.BUSY : null),
//                    ((b) ? AccessibleState.BUSY : null));
//        }
    }


    /**
     * Sets the four BoundedRangeModel properties after forcing
     * the arguments to obey the usual constraints:
     * <pre>
     * minimum <= value <= value+extent <= maximum
     * </pre>
     * <p>
     *
     * @see BoundedRangeModel#setRangeProperties
     * @see #setValue
     * @see #setVisibleAmount
     * @see #setMinimum
     * @see #setMaximum
     */
    public void setValues(int newValue, int newExtent, int newMin, int newMax)
    {
        BoundedRangeModel m = getModel();
        //int oldValue = m.getValue();
        m.setRangeProperties(newValue, newExtent, newMin, newMax, m.getValueIsAdjusting());

//        if (accessibleContext != null) {
//            accessibleContext.firePropertyChange(
//                    AccessibleContext.ACCESSIBLE_VALUE_PROPERTY,
//                    new Integer(oldValue),
//                    new Integer(m.getValue()));
//        }
    }


    /**
     * Adds an AdjustmentListener.  Adjustment listeners are notified
     * each time the scrollbar's model changes.  Adjustment events are
     * provided for backwards compatibility with jsjava.awt.Scrollbar.
     * <p>
     * Note that the AdjustmentEvents type property will always have a
     * placeholder value of AdjustmentEvent.TRACK because all changes
     * to a BoundedRangeModels value are considered equivalent.  To change
     * the value of a BoundedRangeModel one just sets its value property,
     * i.e. model.setValue(123).  No information about the origin of the
     * change, e.g. it's a block decrement, is provided.  We don't try
     * fabricate the origin of the change here.
     *
     * @param l the AdjustmentLister to add
     * @see #removeAdjustmentListener
     * @see BoundedRangeModel#addChangeListener
     */
    @Override
		public void addAdjustmentListener(AdjustmentListener l)   {
        listenerList.add(AdjustmentListener.class, l);
    }


    /**
     * Removes an AdjustmentEvent listener.
     *
     * @param l the AdjustmentLister to remove
     * @see #addAdjustmentListener
     */
    @Override
		public void removeAdjustmentListener(AdjustmentListener l)  {
        listenerList.remove(AdjustmentListener.class, l);
    }


    /**
     * Returns an array of all the <code>AdjustmentListener</code>s added
     * to this JScrollBar with addAdjustmentListener().
     *
     * @return all of the <code>AdjustmentListener</code>s added or an empty
     *         array if no listeners have been added
     * @since 1.4
     */
    public AdjustmentListener[] getAdjustmentListeners() {
        return (AdjustmentListener[])listenerList.getListeners(
                AdjustmentListener.class);
    }


    /**
     * Notify listeners that the scrollbar's model has changed.
     *
     * @see #addAdjustmentListener
     * @see EventListenerList
     */
    protected void fireAdjustmentValueChanged(int id, int type, int value) {
        fireAdjustmentValueChanged(id, type, value, getValueIsAdjusting());
    }

    /**
     * Notify listeners that the scrollbar's model has changed.
     *
     * @see #addAdjustmentListener
     * @see EventListenerList
     */
    private void fireAdjustmentValueChanged(int id, int type, int value,
                                            boolean isAdjusting) {
        Object[] listeners = listenerList.getListenerList();
        AdjustmentEvent e = null;
        for (int i = listeners.length - 2; i >= 0; i -= 2) {
            if (listeners[i]==AdjustmentListener.class) {
                if (e == null) {
                    e = new AdjustmentEvent(this, id, type, value, isAdjusting);
                }
                ((AdjustmentListener)listeners[i+1]).adjustmentValueChanged(e);
            }
        }
    }


    /**
     * This class listens to ChangeEvents on the model and forwards
     * AdjustmentEvents for the sake of backwards compatibility.
     * Unfortunately there's no way to determine the proper
     * type of the AdjustmentEvent as all updates to the model's
     * value are considered equivalent.
     */
    private class ModelListener implements ChangeListener {
        @Override
				public void stateChanged(ChangeEvent e)   {
            Object obj = e.getSource();
            if (obj instanceof BoundedRangeModel) {
                int id = AdjustmentEvent.ADJUSTMENT_VALUE_CHANGED;
                int type = AdjustmentEvent.TRACK;
                BoundedRangeModel model = (BoundedRangeModel)obj;
                int value = model.getValue();
                boolean isAdjusting = model.getValueIsAdjusting();
                fireAdjustmentValueChanged(id, type, value, isAdjusting);
            }
        }
    }

    // PENDING(hmuller) - the next three methods should be removed

    /**
     * The scrollbar is flexible along it's scrolling axis and
     * rigid along the other axis.
     */
    @Override
		public Dimension getMinimumSize() {
        Dimension pref = getPreferredSize();
        if (orientation == VERTICAL) {
            return new Dimension(pref.width, 5);
        } else {
            return new Dimension(5, pref.height);
        }
    }

    /**
     * The scrollbar is flexible along it's scrolling axis and
     * rigid along the other axis.
     */
    @Override
		public Dimension getMaximumSize() {
        Dimension pref = getPreferredSize();
        if (getOrientation() == VERTICAL) {
            return new Dimension(pref.width, Short.MAX_VALUE);
        } else {
            return new Dimension(Short.MAX_VALUE, pref.height);
        }
    }

    /**
     * Enables the component so that the knob position can be changed.
     * When the disabled, the knob position cannot be changed.
     *
     * @param x a boolean value, where true enables the component and
     *          false disables it
     */
    @Override
		public void setEnabled(boolean x)  {
        super.setEnabled(x);
        Component[] children = getComponents();
        for(int i = 0; i < children.length; i++) {
            children[i].setEnabled(x);
        }
    }

//    /**
//     * See readObject() and writeObject() in JComponent for more
//     * information about serialization in Swing.
//     */
//    private void writeObject(ObjectOutputStream s) throws IOException {
//        s.defaultWriteObject();
//        if (getUIClassID().equals(uiClassID)) {
//            byte count = JComponent.getWriteObjCounter(this);
//            JComponent.setWriteObjCounter(this, --count);
//            if (count == 0 && ui != null) {
//                ui.installUI(this);
//            }
//        }
//    }
//
//
    /**
     * Returns a string representation of this JScrollBar. This method
     * is intended to be used only for debugging purposes, and the
     * content and format of the returned string may vary between
     * implementations. The returned string may be empty but may not
     * be <code>null</code>.
     *
     * @return  a string representation of this JScrollBar.
     */
    @Override
		protected String paramString() {
        String orientationString = (orientation == HORIZONTAL ?
                                    "HORIZONTAL" : "VERTICAL");

        return super.paramString() +
        ",blockIncrement=" + blockIncrement +
        ",orientation=" + orientationString +
        ",unitIncrement=" + unitIncrement;
    }

/////////////////
// Accessibility support
////////////////
//
//    /**
//     * Gets the AccessibleContext associated with this JScrollBar.
//     * For JScrollBar, the AccessibleContext takes the form of an
//     * AccessibleJScrollBar.
//     * A new AccessibleJScrollBar instance is created if necessary.
//     *
//     * @return an AccessibleJScrollBar that serves as the
//     *         AccessibleContext of this JScrollBar
//     */
//    public AccessibleContext getAccessibleContext() {
//        if (accessibleContext == null) {
//            accessibleContext = new AccessibleJScrollBar();
//        }
//        return accessibleContext;
//    }
//
//    /**
//     * This class implements accessibility support for the
//     * <code>JScrollBar</code> class.  It provides an implementation of the
//     * Java Accessibility API appropriate to scroll bar user-interface
//     * elements.
//     * <p>
//     * <strong>Warning:</strong>
//     * Serialized objects of this class will not be compatible with
//     * future Swing releases. The current serialization support is
//     * appropriate for short term storage or RMI between applications running
//     * the same version of Swing.  As of 1.4, support for long term storage
//     * of all JavaBeans<sup><font size="-2">TM</font></sup>
//     * has been added to the <code>java.beans</code> package.
//     * Please see {@link jsjava.beans.XMLEncoder}.
//     */
//    protected class AccessibleJScrollBar extends AccessibleJComponent
//        implements AccessibleValue {
//
//        /**
//         * Get the state set of this object.
//         *
//         * @return an instance of AccessibleState containing the current state
//         * of the object
//         * @see AccessibleState
//         */
//        public AccessibleStateSet getAccessibleStateSet() {
//            AccessibleStateSet states = super.getAccessibleStateSet();
//            if (getValueIsAdjusting()) {
//                states.add(AccessibleState.BUSY);
//            }
//            if (getOrientation() == VERTICAL) {
//                states.add(AccessibleState.VERTICAL);
//            } else {
//                states.add(AccessibleState.HORIZONTAL);
//            }
//            return states;
//        }
//
//        /**
//         * Get the role of this object.
//         *
//         * @return an instance of AccessibleRole describing the role of the
//         * object
//         */
//        public AccessibleRole getAccessibleRole() {
//            return AccessibleRole.SCROLL_BAR;
//        }
//
//        /**
//         * Get the AccessibleValue associated with this object.  In the
//         * implementation of the Java Accessibility API for this class,
//         * return this object, which is responsible for implementing the
//         * AccessibleValue interface on behalf of itself.
//         *
//         * @return this object
//         */
//        public AccessibleValue getAccessibleValue() {
//            return this;
//        }
//
//        /**
//         * Get the accessible value of this object.
//         *
//         * @return The current value of this object.
//         */
//        public Number getCurrentAccessibleValue() {
//            return new Integer(getValue());
//        }
//
//        /**
//         * Set the value of this object as a Number.
//         *
//         * @return True if the value was set.
//         */
//        public boolean setCurrentAccessibleValue(Number n) {
//            // TIGER - 4422535
//            if (n == null) {
//                return false;
//            }
//            setValue(n.intValue());
//            return true;
//        }
//
//        /**
//         * Get the minimum accessible value of this object.
//         *
//         * @return The minimum value of this object.
//         */
//        public Number getMinimumAccessibleValue() {
//            return new Integer(getMinimum());
//        }
//
//        /**
//         * Get the maximum accessible value of this object.
//         *
//         * @return The maximum value of this object.
//         */
//        public Number getMaximumAccessibleValue() {
//            // TIGER - 4422362
//            return new Integer(model.getMaximum() - model.getExtent());
//        }
//
//    } // AccessibleJScrollBar
}
