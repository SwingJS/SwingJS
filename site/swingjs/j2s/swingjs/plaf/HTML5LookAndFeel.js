Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["javax.swing.LookAndFeel"], "swingjs.plaf.HTML5LookAndFeel", ["java.lang.Boolean", "$.Long", "java.awt.Color", "$.Dimension", "javax.swing.DefaultListCellRenderer", "$.UIDefaults", "javax.swing.UIDefaults.ActiveValue", "javax.swing.plaf.ColorUIResource", "$.DimensionUIResource", "$.FontUIResource", "$.InsetsUIResource"], function () {
c$ = Clazz.declareType (swingjs.plaf, "HTML5LookAndFeel", javax.swing.LookAndFeel);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.HTML5LookAndFeel, []);
});
Clazz.overrideMethod (c$, "getDefaults", 
function () {
var table =  new javax.swing.UIDefaults (610, 0.75);
this.initClassDefaults (table);
this.initSystemColorDefaults (table);
this.initComponentDefaults (table);
return table;
});
Clazz.overrideMethod (c$, "initialize", 
function () {
});
Clazz.defineMethod (c$, "installAWTEventListener", 
function () {
});
Clazz.overrideMethod (c$, "uninitialize", 
function () {
});
Clazz.defineMethod (c$, "initClassDefaults", 
function (table) {
var packageName = "swingjs.plaf.";
var uiDefaults = ["ButtonUI", "swingjs.plaf.JSButtonUI", "CheckBoxUI", "swingjs.plaf.JSCheckBoxUI", "ColorChooserUI", "swingjs.plaf.JSColorChooserUI", "FormattedTextFieldUI", "swingjs.plaf.JSFormattedTextFieldUI", "MenuBarUI", "swingjs.plaf.JSMenuBarUI", "MenuUI", "swingjs.plaf.JSMenuUI", "MenuItemUI", "swingjs.plaf.JSMenuItemUI", "CheckBoxMenuItemUI", "swingjs.plaf.JSCheckBoxMenuItemUI", "RadioButtonMenuItemUI", "swingjs.plaf.JSRadioButtonMenuItemUI", "RadioButtonUI", "swingjs.plaf.JSRadioButtonUI", "ToggleButtonUI", "swingjs.plaf.JSToggleButtonUI", "PopupMenuUI", "swingjs.plaf.JSPopupMenuUI", "ProgressBarUI", "swingjs.plaf.JSProgressBarUI", "ScrollBarUI", "swingjs.plaf.JSScrollBarUI", "ScrollPaneUI", "swingjs.plaf.JSScrollPaneUI", "SplitPaneUI", "swingjs.plaf.JSSplitPaneUI", "SliderUI", "swingjs.plaf.JSSliderUI", "SeparatorUI", "swingjs.plaf.JSSeparatorUI", "SpinnerUI", "swingjs.plaf.JSSpinnerUI", "ToolBarSeparatorUI", "swingjs.plaf.JSToolBarSeparatorUI", "PopupMenuSeparatorUI", "swingjs.plaf.JSPopupMenuSeparatorUI", "TabbedPaneUI", "swingjs.plaf.JSTabbedPaneUI", "TextAreaUI", "swingjs.plaf.JSTextAreaUI", "TextFieldUI", "swingjs.plaf.JSTextFieldUI", "PasswordFieldUI", "swingjs.plaf.JSPasswordFieldUI", "TextPaneUI", "swingjs.plaf.JSTextPaneUI", "EditorPaneUI", "swingjs.plaf.JSEditorPaneUI", "TreeUI", "swingjs.plaf.JSTreeUI", "LabelUI", "swingjs.plaf.JSLabelUI", "ListUI", "swingjs.plaf.JSListUI", "ToolBarUI", "swingjs.plaf.JSToolBarUI", "ToolTipUI", "swingjs.plaf.JSToolTipUI", "ComboBoxUI", "swingjs.plaf.JSComboBoxUI", "TableUI", "swingjs.plaf.JSTableUI", "TableHeaderUI", "swingjs.plaf.JSTableHeaderUI", "InternalFrameUI", "swingjs.plaf.JSInternalFrameUI", "DesktopPaneUI", "swingjs.plaf.JSDesktopPaneUI", "DesktopIconUI", "swingjs.plaf.JSDesktopIconUI", "OptionPaneUI", "swingjs.plaf.JSOptionPaneUI", "PanelUI", "swingjs.plaf.JSPanelUI", "ViewportUI", "swingjs.plaf.JSViewportUI", "RootPaneUI", "swingjs.plaf.JSRootPaneUI"];
table.putDefaults (uiDefaults);
}, "javax.swing.UIDefaults");
Clazz.defineMethod (c$, "initSystemColorDefaults", 
function (table) {
var defaultSystemColors = ["window", "#FFFFFF", "windowText", "#333333", "menu", "#C0C0C0", "menuText", "#333333", "text", "#C0C0C0", "textText", "#333333", "control", "#EEEEEE", "controlText", "#333333", "scrollbar", "#E0E0E0", "info", "#FFFFE1", "infoText", "#000000"];
this.loadSystemColors (table, defaultSystemColors, this.isNativeLookAndFeel ());
}, "javax.swing.UIDefaults");
Clazz.defineMethod (c$, "loadSystemColors", 
function (table, systemColors, useNative) {
for (var i = 0; i < systemColors.length; i += 2) {
var color = java.awt.Color.black;
try {
color = java.awt.Color.decode (systemColors[i + 1]);
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
e.printStackTrace ();
} else {
throw e;
}
}
table.put (systemColors[i],  new javax.swing.plaf.ColorUIResource (color));
}
}, "javax.swing.UIDefaults,~A,~B");
Clazz.defineMethod (c$, "initResourceBundle", 
 function (table) {
}, "javax.swing.UIDefaults");
Clazz.defineMethod (c$, "initComponentDefaults", 
function (table) {
this.initResourceBundle (table);
var oneThousand =  new Long (1000);
var twelve =  new Integer (12);
var fontPlain =  new Integer (0);
var serifPlain12 =  new javax.swing.plaf.FontUIResource ("Serif", 0, 12);
var sansSerifPlain12 =  new javax.swing.plaf.FontUIResource ("SansSerif", 0, 12);
var dialogPlain12 =  new javax.swing.plaf.FontUIResource ("Dialog", 0, 12);
var monospacedPlain12 =  new javax.swing.plaf.FontUIResource ("Monospaced", 0, 12);
var black =  new javax.swing.plaf.ColorUIResource (java.awt.Color.black);
var white =  new javax.swing.plaf.ColorUIResource (java.awt.Color.white);
var gray =  new javax.swing.plaf.ColorUIResource (java.awt.Color.gray);
var darkGray =  new javax.swing.plaf.ColorUIResource (java.awt.Color.darkGray);
var control = table.getColor ("control");
var controlText = table.getColor ("controlText");
var menu = table.getColor ("menu");
var menuText = table.getColor ("menuText");
var textText = table.getColor ("textText");
var window = table.getColor ("window");
var zeroInsets =  new javax.swing.plaf.InsetsUIResource (0, 0, 0, 0);
var twoInsets =  new javax.swing.plaf.InsetsUIResource (2, 2, 2, 2);
var threeInsets =  new javax.swing.plaf.InsetsUIResource (3, 3, 3, 3);
var listCellRendererActiveValue = ((Clazz.isClassDefined ("swingjs.plaf.HTML5LookAndFeel$1") ? 0 : swingjs.plaf.HTML5LookAndFeel.$HTML5LookAndFeel$1$ ()), Clazz.innerTypeInstance (swingjs.plaf.HTML5LookAndFeel$1, this, null));
var zero =  new Integer (0);
var tabbedPaneTabInsets =  new javax.swing.plaf.InsetsUIResource (0, 4, 1, 4);
var tabbedPaneTabPadInsets =  new javax.swing.plaf.InsetsUIResource (2, 2, 2, 1);
var tabbedPaneTabAreaInsets =  new javax.swing.plaf.InsetsUIResource (3, 2, 0, 2);
var tabbedPaneContentBorderInsets =  new javax.swing.plaf.InsetsUIResource (2, 2, 3, 3);
var editorMargin = threeInsets;
var four =  new Integer (4);
var defaults = ["*.font", dialogPlain12, "*.background", control, "*.foreground", controlText, "Button.margin",  new javax.swing.plaf.InsetsUIResource (2, 14, 2, 14), "ToggleButton.margin",  new javax.swing.plaf.InsetsUIResource (2, 14, 2, 14), "ToggleButton.textIconGap", four, "ToggleButton.textShiftOffset", zero, "RadioButton.margin", twoInsets, "RadioButton.textIconGap", four, "RadioButton.textShiftOffset", zero, "CheckBox.margin", twoInsets, "CheckBox.textIconGap", four, "CheckBox.textShiftOffset", zero, "ColorChooser.swatchesSwatchSize",  new java.awt.Dimension (10, 10), "ColorChooser.swatchesRecentSwatchSize",  new java.awt.Dimension (10, 10), "ColorChooser.swatchesDefaultRecentColor", control, "ComboBox.font", sansSerifPlain12, "ComboBox.background", window, "ComboBox.foreground", textText, "ComboBox.timeFactor", oneThousand, "ComboBox.isEnterSelectablePopup", Boolean.FALSE, "FileChooser.readOnly", Boolean.FALSE, "Label.font", dialogPlain12, "Label.border", null, "List.background", window, "List.foreground", textText, "List.cellRenderer", listCellRendererActiveValue, "List.timeFactor", oneThousand, "MenuBar.font", dialogPlain12, "MenuBar.background", menu, "MenuBar.foreground", menuText, "MenuItem.font", dialogPlain12, "MenuItem.background", menu, "MenuItem.foreground", menuText, "MenuItem.margin", twoInsets, "RadioButtonMenuItem.font", dialogPlain12, "RadioButtonMenuItem.background", menu, "RadioButtonMenuItem.foreground", menuText, "RadioButtonMenuItem.margin", twoInsets, "CheckBoxMenuItem.font", dialogPlain12, "CheckBoxMenuItem.background", menu, "CheckBoxMenuItem.foreground", menuText, "CheckBoxMenuItem.margin", twoInsets, "Menu.background", menu, "Menu.foreground", menuText, "Menu.margin", twoInsets, "PopupMenu.background", menu, "PopupMenu.foreground", menuText, "PopupMenu.consumeEventOnClose", Boolean.FALSE, "OptionPane.messageForeground", controlText, "Panel.font", dialogPlain12, "Panel.background", control, "Panel.foreground", textText, "ProgressBar.cellLength",  new Integer (1), "ProgressBar.cellSpacing", zero, "ProgressBar.repaintInterval",  new Integer (50), "ProgressBar.cycleTime",  new Integer (3000), "ProgressBar.horizontalSize",  new javax.swing.plaf.DimensionUIResource (146, 12), "ProgressBar.verticalSize",  new javax.swing.plaf.DimensionUIResource (12, 146), "ScrollBar.foreground", control, "ScrollBar.width",  new Integer (16), "Viewport.foreground", textText, "Slider.horizontalSize",  new java.awt.Dimension (200, 21), "Slider.verticalSize",  new java.awt.Dimension (21, 200), "Slider.minimumHorizontalSize",  new java.awt.Dimension (36, 21), "Slider.minimumVerticalSize",  new java.awt.Dimension (21, 36), "Spinner.font", monospacedPlain12, "Spinner.arrowButtonSize",  new java.awt.Dimension (16, 5), "Spinner.editorAlignment", new Integer (11), "SplitPane.background", control, "SplitPane.dividerSize",  new Integer (7), "SplitPaneDivider.draggingColor", darkGray, "TabbedPane.selected", null, "TabbedPane.textIconGap", four, "TabbedPane.tabsOverlapBorder", Boolean.FALSE, "TabbedPane.labelShift", new Integer (1), "TabbedPane.selectedLabelShift", new Integer (-1), "TabbedPane.tabInsets", tabbedPaneTabInsets, "TabbedPane.selectedTabPadInsets", tabbedPaneTabPadInsets, "TabbedPane.tabAreaInsets", tabbedPaneTabAreaInsets, "TabbedPane.contentBorderInsets", tabbedPaneContentBorderInsets, "TabbedPane.tabRunOverlay",  new Integer (2), "Table.background", window, "Table.dropLineShortColor", black, "Table.gridColor", gray, "Table.focusCellBackground", window, "Table.focusCellForeground", controlText, "TextField.font", sansSerifPlain12, "TextField.background", window, "TextField.foreground", textText, "TextField.margin", zeroInsets, "FormattedTextField.font", sansSerifPlain12, "FormattedTextField.background", window, "FormattedTextField.foreground", textText, "FormattedTextField.caretForeground", textText, "FormattedTextField.margin", zeroInsets, "PasswordField.font", monospacedPlain12, "PasswordField.background", window, "PasswordField.foreground", textText, "PasswordField.margin", zeroInsets, "PasswordField.echoChar", new Character ('*'), "TextArea.font", monospacedPlain12, "TextArea.background", window, "TextArea.foreground", textText, "TextArea.margin", zeroInsets, "TextPane.font", serifPlain12, "TextPane.background", white, "TextPane.foreground", textText, "TextPane.margin", editorMargin, "EditorPane.font", serifPlain12, "EditorPane.background", white, "EditorPane.foreground", textText, "EditorPane.margin", editorMargin, "TitledBorder.titleColor", controlText, "Tree.paintLines", Boolean.TRUE, "Tree.lineTypeDashed", Boolean.FALSE, "Tree.background", window, "Tree.foreground", textText, "Tree.hash", gray, "Tree.textForeground", textText, "Tree.textBackground", table.get ("text"), "Tree.leftChildIndent",  new Integer (7), "Tree.rightChildIndent",  new Integer (13), "Tree.rowHeight",  new Integer (16), "Tree.scrollsOnExpand", Boolean.TRUE, "Tree.timeFactor", oneThousand];
table.putDefaults (defaults);
}, "javax.swing.UIDefaults");
Clazz.overrideMethod (c$, "getName", 
function () {
return "SwingJS";
});
Clazz.overrideMethod (c$, "getID", 
function () {
return "SwingJS";
});
Clazz.overrideMethod (c$, "getDescription", 
function () {
return "SwingJS L&F";
});
Clazz.overrideMethod (c$, "isNativeLookAndFeel", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isSupportedLookAndFeel", 
function () {
return true;
});
c$.$HTML5LookAndFeel$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (swingjs.plaf, "HTML5LookAndFeel$1", null, javax.swing.UIDefaults.ActiveValue);
Clazz.overrideMethod (c$, "createValue", 
function (table) {
return  new javax.swing.DefaultListCellRenderer.UIResource ();
}, "javax.swing.UIDefaults");
c$ = Clazz.p0p ();
};
});
