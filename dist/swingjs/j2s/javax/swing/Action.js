Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.ActionListener"], "javax.swing.Action", null, function () {
c$ = Clazz.declareInterface (javax.swing, "Action", java.awt.event.ActionListener);
Clazz.defineStatics (c$,
"DEFAULT", "Default",
"NAME", "Name",
"SHORT_DESCRIPTION", "ShortDescription",
"LONG_DESCRIPTION", "LongDescription",
"SMALL_ICON", "SmallIcon",
"ACTION_COMMAND_KEY", "ActionCommandKey",
"ACCELERATOR_KEY", "AcceleratorKey",
"MNEMONIC_KEY", "MnemonicKey",
"SELECTED_KEY", "SwingSelectedKey",
"DISPLAYED_MNEMONIC_INDEX_KEY", "SwingDisplayedMnemonicIndexKey",
"LARGE_ICON_KEY", "SwingLargeIconKey");
});
