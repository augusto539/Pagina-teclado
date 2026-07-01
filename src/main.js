import { initKeyboard } from './keyboard.js';
import { initShortcuts } from './shortcuts.js';
import { initToolbar } from './toolbar.js';

const updateShortcuts = initShortcuts(document.getElementById('shortcuts'));
const keyboard = initKeyboard(document.getElementById('keyboard'), {
  onChange: (pressed) => updateShortcuts(pressed),
});
initToolbar(document.getElementById('toolbar'), {
  onLayout: (mode) => keyboard.setLayout(mode),
});
