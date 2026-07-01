import { inject } from '@vercel/analytics';
import { initKeyboard } from './keyboard.js';
import { initShortcuts } from './shortcuts.js';
import { initToolbar } from './toolbar.js';

// Vercel Web Analytics. Corre en ambas páginas (ES y EN) porque las dos
// cargan main.js. En local va en modo debug (no cuenta visitas); en producción
// carga el script de Vercel y registra las páginas vistas.
inject();

const updateShortcuts = initShortcuts(document.getElementById('shortcuts'));
const keyboard = initKeyboard(document.getElementById('keyboard'), {
  onChange: (pressed) => updateShortcuts(pressed),
});
initToolbar(document.getElementById('toolbar'), {
  onLayout: (mode) => keyboard.setLayout(mode),
});
