/**
 * Atajos comunes con su equivalencia Windows ↔ Mac.
 *
 * `mac` es lo que se muestra; `codes` es la combinación real en `event.code`
 * usada para detectar cuándo la apretás. Los modificadores se escriben
 * normalizados (Meta/Control/Alt/Shift) para que izquierda y derecha cuenten
 * igual; el resto son códigos físicos concretos (KeyC, Space, Digit4, ...).
 */
const shortcuts = [
  { action: 'Copiar', win: 'Ctrl + C', mac: '⌘ C', codes: ['Meta', 'KeyC'] },
  { action: 'Pegar', win: 'Ctrl + V', mac: '⌘ V', codes: ['Meta', 'KeyV'] },
  { action: 'Cortar', win: 'Ctrl + X', mac: '⌘ X', codes: ['Meta', 'KeyX'] },
  { action: 'Deshacer', win: 'Ctrl + Z', mac: '⌘ Z', codes: ['Meta', 'KeyZ'] },
  { action: 'Rehacer', win: 'Ctrl + Y', mac: '⇧ ⌘ Z', codes: ['Meta', 'Shift', 'KeyZ'] },
  { action: 'Seleccionar todo', win: 'Ctrl + A', mac: '⌘ A', codes: ['Meta', 'KeyA'] },
  { action: 'Guardar', win: 'Ctrl + S', mac: '⌘ S', codes: ['Meta', 'KeyS'] },
  { action: 'Buscar', win: 'Ctrl + F', mac: '⌘ F', codes: ['Meta', 'KeyF'] },
  { action: 'Cambiar de app', win: 'Alt + Tab', mac: '⌘ Tab', codes: ['Meta', 'Tab'] },
  { action: 'Mission Control', win: '⊞ + Tab', mac: '⌃ ↑', codes: ['Control', 'ArrowUp'] },
  { action: 'Cerrar app', win: 'Alt + F4', mac: '⌘ Q', codes: ['Meta', 'KeyQ'] },
  { action: 'Cerrar ventana / pestaña', win: 'Ctrl + W', mac: '⌘ W', codes: ['Meta', 'KeyW'] },
  { action: 'Nueva pestaña', win: 'Ctrl + T', mac: '⌘ T', codes: ['Meta', 'KeyT'] },
  { action: 'Cambiar idioma del teclado', win: 'Alt + Shift', mac: '⌃ Espacio', codes: ['Control', 'Space'] },
  { action: 'Buscar en el sistema', win: 'Tecla ⊞', mac: '⌘ Espacio', codes: ['Meta', 'Space'] },
  { action: 'Captura de pantalla', win: '⊞ + Shift + S', mac: '⇧ ⌘ 4', codes: ['Meta', 'Shift', 'Digit4'] },
  { action: 'Captura completa', win: 'Impr Pant', mac: '⇧ ⌘ 3', codes: ['Meta', 'Shift', 'Digit3'] },
  { action: 'Captura / grabación (herramienta)', win: '⊞ + G', mac: '⇧ ⌘ 5', codes: ['Meta', 'Shift', 'Digit5'] },
  { action: 'Emojis', win: '⊞ + .', mac: '⌃ ⌘ Espacio', codes: ['Control', 'Meta', 'Space'] },
  { action: 'Bloquear pantalla', win: '⊞ + L', mac: '⌃ ⌘ Q', codes: ['Control', 'Meta', 'KeyQ'] },
  { action: 'Borrar palabra', win: 'Ctrl + ⌫', mac: '⌥ ⌫', codes: ['Alt', 'Backspace'] },
];

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

/**
 * Renderiza la lista de atajos y devuelve `update(pressed)`:
 * recibe el Set de `event.code` apretados ahora mismo, resalta el atajo que
 * coincide exacto, y devuelve `true` si hubo alguna coincidencia (para que el
 * llamador pueda hacer preventDefault y que el navegador no se robe el atajo).
 */
export function initShortcuts(container) {
  const header = document.createElement('div');
  header.className = 'shortcuts__row shortcuts__row--head';
  header.innerHTML = `
    <span>Acción</span>
    <span>Windows</span>
    <span>Mac</span>
  `;
  container.appendChild(header);

  const entries = shortcuts.map((s) => {
    const row = document.createElement('div');
    row.className = 'shortcuts__row';
    row.innerHTML = `
      <span class="shortcuts__action">${s.action}</span>
      <span class="shortcuts__keys">${s.win}</span>
      <span class="shortcuts__keys shortcuts__keys--mac">${s.mac}</span>
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
