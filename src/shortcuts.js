/**
 * Atajos comunes con su equivalencia Windows ↔ Mac.
 *
 * Textos localizados: un campo puede ser un string (igual en ambos idiomas) o
 * un objeto { es, en } cuando difiere. El idioma sale de <html lang>.
 *
 * `mac`/`win` son lo que se muestra; `codes` es la combinación real en
 * `event.code` usada para detectar cuándo la apretás. Los modificadores se
 * escriben normalizados (Meta/Control/Alt/Shift) para que izquierda y derecha
 * cuenten igual; el resto son códigos físicos concretos (KeyC, Space, ...).
 */
const shortcuts = [
  { action: { es: 'Copiar', en: 'Copy' }, win: 'Ctrl + C', mac: '⌘ C', codes: ['Meta', 'KeyC'] },
  { action: { es: 'Pegar', en: 'Paste' }, win: 'Ctrl + V', mac: '⌘ V', codes: ['Meta', 'KeyV'] },
  { action: { es: 'Cortar', en: 'Cut' }, win: 'Ctrl + X', mac: '⌘ X', codes: ['Meta', 'KeyX'] },
  { action: { es: 'Deshacer', en: 'Undo' }, win: 'Ctrl + Z', mac: '⌘ Z', codes: ['Meta', 'KeyZ'] },
  { action: { es: 'Rehacer', en: 'Redo' }, win: 'Ctrl + Y', mac: '⇧ ⌘ Z', codes: ['Meta', 'Shift', 'KeyZ'] },
  { action: { es: 'Seleccionar todo', en: 'Select all' }, win: 'Ctrl + A', mac: '⌘ A', codes: ['Meta', 'KeyA'] },
  { action: { es: 'Guardar', en: 'Save' }, win: 'Ctrl + S', mac: '⌘ S', codes: ['Meta', 'KeyS'] },
  { action: { es: 'Buscar', en: 'Find' }, win: 'Ctrl + F', mac: '⌘ F', codes: ['Meta', 'KeyF'] },
  { action: { es: 'Cambiar de app', en: 'Switch app' }, win: 'Alt + Tab', mac: '⌘ Tab', codes: ['Meta', 'Tab'] },
  { action: 'Mission Control', win: '⊞ + Tab', mac: '⌃ ↑', codes: ['Control', 'ArrowUp'] },
  { action: { es: 'Cerrar app', en: 'Quit app' }, win: 'Alt + F4', mac: '⌘ Q', codes: ['Meta', 'KeyQ'] },
  { action: { es: 'Cerrar ventana / pestaña', en: 'Close window / tab' }, win: 'Ctrl + W', mac: '⌘ W', codes: ['Meta', 'KeyW'] },
  { action: { es: 'Nueva pestaña', en: 'New tab' }, win: 'Ctrl + T', mac: '⌘ T', codes: ['Meta', 'KeyT'] },
  { action: { es: 'Cambiar idioma del teclado', en: 'Switch keyboard language' }, win: 'Alt + Shift', mac: { es: '⌃ Espacio', en: '⌃ Space' }, codes: ['Control', 'Space'] },
  { action: { es: 'Buscar en el sistema', en: 'Spotlight search' }, win: { es: 'Tecla ⊞', en: '⊞ key' }, mac: { es: '⌘ Espacio', en: '⌘ Space' }, codes: ['Meta', 'Space'] },
  { action: { es: 'Captura de pantalla', en: 'Screenshot (area)' }, win: '⊞ + Shift + S', mac: '⇧ ⌘ 4', codes: ['Meta', 'Shift', 'Digit4'] },
  { action: { es: 'Captura completa', en: 'Screenshot (full)' }, win: { es: 'Impr Pant', en: 'Print Screen' }, mac: '⇧ ⌘ 3', codes: ['Meta', 'Shift', 'Digit3'] },
  { action: { es: 'Captura / grabación (herramienta)', en: 'Screenshot / recording tool' }, win: '⊞ + G', mac: '⇧ ⌘ 5', codes: ['Meta', 'Shift', 'Digit5'] },
  { action: { es: 'Emojis', en: 'Emoji picker' }, win: '⊞ + .', mac: { es: '⌃ ⌘ Espacio', en: '⌃ ⌘ Space' }, codes: ['Control', 'Meta', 'Space'] },
  { action: { es: 'Bloquear pantalla', en: 'Lock screen' }, win: '⊞ + L', mac: '⌃ ⌘ Q', codes: ['Control', 'Meta', 'KeyQ'] },
  { action: { es: 'Borrar palabra', en: 'Delete word' }, win: 'Ctrl + ⌫', mac: '⌥ ⌫', codes: ['Alt', 'Backspace'] },
];

const HEADER = {
  es: ['Acción', 'Windows', 'Mac'],
  en: ['Action', 'Windows', 'Mac'],
};

/** Izquierda y derecha del mismo modificador cuentan igual. */
const MODIFIER_MAP = {
  ControlLeft: 'Control',
  ControlRight: 'Control',
  ShiftLeft: 'Shift',
  ShiftRight: 'Shift',
  AltLeft: 'Alt',
  AltRight: 'Alt',
  MetaLeft: 'Meta',
  MetaRight: 'Meta',
};

const normalize = (code) => MODIFIER_MAP[code] ?? code;

const setsEqual = (a, b) =>
  a.size === b.size && [...a].every((x) => b.has(x));

/** Un campo puede ser string (igual en ambos idiomas) u objeto { es, en }. */
const pick = (value, lang) => (typeof value === 'string' ? value : value[lang]);

/**
 * Renderiza la lista de atajos (en el idioma de <html lang>) y devuelve
 * `update(pressed)`: recibe el Set de `event.code` apretados ahora mismo,
 * resalta el atajo que coincide exacto, y devuelve `true` si hubo alguna
 * coincidencia (para que el llamador pueda hacer preventDefault y que el
 * navegador no se robe el atajo).
 */
export function initShortcuts(container) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'es';

  const header = document.createElement('div');
  header.className = 'shortcuts__row shortcuts__row--head';
  header.innerHTML = HEADER[lang].map((h) => `<span>${h}</span>`).join('');
  container.appendChild(header);

  const entries = shortcuts.map((s) => {
    const row = document.createElement('div');
    row.className = 'shortcuts__row';
    row.innerHTML = `
      <span class="shortcuts__action">${pick(s.action, lang)}</span>
      <span class="shortcuts__keys">${pick(s.win, lang)}</span>
      <span class="shortcuts__keys shortcuts__keys--mac">${pick(s.mac, lang)}</span>
    `;
    container.appendChild(row);
    return { row, combo: new Set(s.codes) };
  });

  return function update(pressed) {
    const norm = new Set([...pressed].map(normalize));
    let matched = false;
    for (const { row, combo } of entries) {
      const active = setsEqual(norm, combo);
      row.classList.toggle('active', active);
      if (active) matched = true;
    }
    return matched;
  };
}
