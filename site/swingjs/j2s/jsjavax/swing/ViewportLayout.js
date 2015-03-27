Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager"], "jsjavax.swing.ViewportLayout", ["jsjava.awt.Dimension", "jsjavax.swing.Scrollable"], function () {
c$ = Clazz.declareType (jsjavax.swing, "ViewportLayout", null, jsjava.awt.LayoutManager);
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, c) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
var view = (parent).getView ();
if (view == null) {
return  new jsjava.awt.Dimension (0, 0);
} else if (Clazz.instanceOf (view, jsjavax.swing.Scrollable)) {
return (view).getPreferredScrollableViewportSize ();
} else {
return view.getPreferredSize ();
}}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
return  new jsjava.awt.Dimension (4, 4);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
var vp = parent;
var view = vp.getView ();
var scrollableView = null;
if (view == null) {
return;
} else if (Clazz.instanceOf (view, jsjavax.swing.Scrollable)) {
scrollableView = view;
}var insets = vp.getInsets ();
var viewPrefSize = view.getPreferredSize ();
var vpSize = vp.getSize ();
var extentSize = vp.toViewCoordinates (vpSize);
var viewSize =  new jsjava.awt.Dimension (viewPrefSize);
if (scrollableView != null) {
if (scrollableView.getScrollableTracksViewportWidth ()) {
viewSize.width = vpSize.width;
}if (scrollableView.getScrollableTracksViewportHeight ()) {
viewSize.height = vpSize.height;
}}var viewPosition = vp.getViewPosition ();
if (scrollableView == null || vp.getParent () == null || vp.getParent ().getComponentOrientation ().isLeftToRight ()) {
if ((viewPosition.x + extentSize.width) > viewSize.width) {
viewPosition.x = Math.max (0, viewSize.width - extentSize.width);
}} else {
if (extentSize.width > viewSize.width) {
viewPosition.x = viewSize.width - extentSize.width;
} else {
viewPosition.x = Math.max (0, Math.min (viewSize.width - extentSize.width, viewPosition.x));
}}if ((viewPosition.y + extentSize.height) > viewSize.height) {
viewPosition.y = Math.max (0, viewSize.height - extentSize.height);
}if (scrollableView == null) {
if ((viewPosition.x == 0) && (vpSize.width > viewPrefSize.width)) {
viewSize.width = vpSize.width;
}if ((viewPosition.y == 0) && (vpSize.height > viewPrefSize.height)) {
viewSize.height = vpSize.height;
}}vp.setViewPosition (viewPosition);
vp.setViewSize (viewSize);
}, "jsjava.awt.Container");
c$.SHARED_INSTANCE = c$.prototype.SHARED_INSTANCE =  new jsjavax.swing.ViewportLayout ();
});
