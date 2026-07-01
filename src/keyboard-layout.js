/**
 * Modelo declarativo del teclado (MacBook Air, ANSI US).
 *
 * Cada tecla es { code, label, sub?, width? }:
 *  - code:  el `event.code` real (posición física, independiente del layout).
 *           Es la fuente de verdad para iluminar: da igual que tu teclado
 *           físico sea de Windows, la posición no cambia.
 *  - label: lo que se dibuja en la tecla (símbolos Mac: ⌘ ⌥ ⌃ ⇧ ⌫ ⏎).
 *  - sub:   etiqueta secundaria chica (opcional).
 *  - width: ancho en "units" (1u = tecla normal). Default 1.
 *  - win:   override { label?, sub? } para el modo Windows. Si falta, la tecla
 *           usa su label/sub de Mac en ambos modos. El `code` no cambia nunca,
 *           por eso el highlight funciona igual en Mac y en Windows.
 *
 * Nota: la tecla Fn (Globe) normalmente NO dispara eventos de teclado en el
 * navegador, así que está dibujada pero puede que no se ilumine.
 */
export const layout = [
  // Fila de función
  [
    { code: 'Escape', label: 'esc' },
    { code: 'F1', label: 'F1' },
    { code: 'F2', label: 'F2' },
    { code: 'F3', label: 'F3' },
    { code: 'F4', label: 'F4' },
    { code: 'F5', label: 'F5' },
    { code: 'F6', label: 'F6' },
    { code: 'F7', label: 'F7' },
    { code: 'F8', label: 'F8' },
    { code: 'F9', label: 'F9' },
    { code: 'F10', label: 'F10' },
    { code: 'F11', label: 'F11' },
    { code: 'F12', label: 'F12' },
  ],
  // Fila de números
  [
    { code: 'Backquote', label: '`', sub: '~' },
    { code: 'Digit1', label: '1', sub: '!' },
    { code: 'Digit2', label: '2', sub: '@' },
    { code: 'Digit3', label: '3', sub: '#' },
    { code: 'Digit4', label: '4', sub: '$' },
    { code: 'Digit5', label: '5', sub: '%' },
    { code: 'Digit6', label: '6', sub: '^' },
    { code: 'Digit7', label: '7', sub: '&' },
    { code: 'Digit8', label: '8', sub: '*' },
    { code: 'Digit9', label: '9', sub: '(' },
    { code: 'Digit0', label: '0', sub: ')' },
    { code: 'Minus', label: '-', sub: '_' },
    { code: 'Equal', label: '=', sub: '+' },
    { code: 'Backspace', label: '⌫', width: 2 },
  ],
  // Fila QWERTY
  [
    { code: 'Tab', label: '⇥', sub: 'tab', width: 1.5 },
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' },
    { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[', sub: '{' },
    { code: 'BracketRight', label: ']', sub: '}' },
    { code: 'Backslash', label: '\\', sub: '|', width: 1.5 },
  ],
  // Fila home (ASDF)
  [
    { code: 'CapsLock', label: '⇪', sub: 'caps', width: 1.75 },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';', sub: ':' },
    { code: 'Quote', label: "'", sub: '"' },
    { code: 'Enter', label: '⏎', sub: 'return', width: 2.25, win: { sub: 'enter' } },
  ],
  // Fila shift (ZXCV)
  [
    { code: 'ShiftLeft', label: '⇧', sub: 'shift', width: 2.25 },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',', sub: '<' },
    { code: 'Period', label: '.', sub: '>' },
    { code: 'Slash', label: '/', sub: '?' },
    { code: 'ShiftRight', label: '⇧', sub: 'shift', width: 2.75 },
  ],
  // Fila inferior (modificadores + espacio + flechas)
  [
    { code: 'Fn', label: '🌐', sub: 'fn', win: { label: 'Fn', sub: '' } },
    { code: 'ControlLeft', label: '⌃', sub: 'control', win: { label: 'Ctrl', sub: '' } },
    { code: 'AltLeft', label: '⌥', sub: 'option', win: { label: 'Alt', sub: '' } },
    { code: 'MetaLeft', label: '⌘', sub: 'command', width: 1.25, win: { label: '⊞', sub: 'Win' } },
    { code: 'Space', label: '', width: 4.5 },
    { code: 'MetaRight', label: '⌘', sub: 'command', width: 1.25, win: { label: '⊞', sub: 'Win' } },
    { code: 'AltRight', label: '⌥', sub: 'option', win: { label: 'Alt', sub: '' } },
    { code: 'ArrowLeft', label: '◀' },
    { code: 'ArrowUp', label: '▲' },
    { code: 'ArrowDown', label: '▼' },
    { code: 'ArrowRight', label: '▶' },
  ],
];
