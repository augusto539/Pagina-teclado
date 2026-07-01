import { layout } from './keyboard-layout.js';

/**
 * Renderiza el teclado dentro de `container` y engancha los listeners para
 * iluminar teclas en tiempo real.
 *
 * El highlight se basa 100% en `event.code` (posición física), por eso funciona
 * con un teclado de Windows sin configurar nada.
 *
 * Devuelve { setLayout } para cambiar las etiquetas entre 'mac' y 'win'.
 */
export function initKeyboard(container, { onChange } = {}) {
  const codeToEl = new Map();
  const pressed = new Set();
  const entries = []; // { key, mainEl, subEl } para poder re-etiquetar al vuelo

  for (const row of layout) {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard__row';

    for (const key of row) {
      const keyEl = document.createElement('div');
      keyEl.className = 'key';
      keyEl.dataset.code = key.code;

      const w = key.width ?? 1;
      // Ancho fijo por tecla, contemplando el gap para que las filas alineen.
      keyEl.style.width = `calc(${w} * var(--u) + ${w - 1} * var(--gap))`;

      // Siempre creamos el sub-span aunque esté vacío: así podemos aparecerlo
      // u ocultarlo cuando se cambia de layout sin re-renderizar.
      const subEl = document.createElement('span');
      subEl.className = 'key__sub';
      keyEl.appendChild(subEl);

      const mainEl = document.createElement('span');
      mainEl.className = 'key__label';
      keyEl.appendChild(mainEl);

      rowEl.appendChild(keyEl);
      codeToEl.set(key.code, keyEl);
      entries.push({ key, mainEl, subEl });
    }

    container.appendChild(rowEl);
  }

  const setLayout = (mode) => {
    const isWin = mode === 'win';
    for (const { key, mainEl, subEl } of entries) {
      const label = isWin && key.win?.label !== undefined ? key.win.label : key.label;
      const sub = isWin && key.win ? (key.win.sub ?? '') : (key.sub ?? '');
      mainEl.textContent = label;
      subEl.textContent = sub;
      subEl.style.display = sub ? '' : 'none';
    }
  };

  setLayout('mac'); // etiquetas iniciales

  const setActive = (code, isActive) => {
    const el = codeToEl.get(code);
    if (el) el.classList.toggle('active', isActive);
  };

  // Notifica el estado actual de teclas apretadas. Devuelve `true` si el
  // suscriptor pidió suprimir el comportamiento por defecto (ej. un atajo matcheó).
  const emit = () => (onChange ? onChange(pressed) : false);

  const clearAll = () => {
    for (const code of pressed) setActive(code, false);
    pressed.clear();
    emit();
  };

  window.addEventListener('keydown', (e) => {
    // Evitar que ciertas teclas hagan su acción por defecto dentro de la demo
    // (Tab mueve el foco, Espacio scrollea, las flechas scrollean).
    if (['Tab', 'Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
      e.preventDefault();
    }
    pressed.add(e.code);
    setActive(e.code, true);
    // Si el combo apretado coincide con un atajo, evitamos que el navegador se
    // lo robe (ej. ⌘S abriría "guardar página", ⌘F la barra de búsqueda).
    if (emit()) e.preventDefault();
  });

  window.addEventListener('keyup', (e) => {
    // Bug de macOS: mientras ⌘ (Command) está apretado, el navegador NO dispara
    // el `keyup` de las demás teclas. Así que al soltar ⌘ no podemos confiar en
    // haber recibido esos keyup → limpiamos todo para no dejar teclas trabadas.
    if (e.code === 'MetaLeft' || e.code === 'MetaRight') {
      clearAll();
      return;
    }
    pressed.delete(e.code);
    setActive(e.code, false);
    emit();
  });

  // Si el navegador se roba el foco (ej. ⌘+Tab, ⌘+Espacio) el `keyup` puede
  // perderse y una tecla quedaría iluminada. Al perder foco, limpiamos todo.
  window.addEventListener('blur', clearAll);

  return { setLayout };
}
