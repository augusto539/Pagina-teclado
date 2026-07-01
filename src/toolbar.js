/**
 * Barra de controles: toggle de layout (Mac/Windows) y selector de temas.
 * Persiste ambas elecciones en localStorage y las aplica al cargar.
 */
const LS_LAYOUT = 'teclado.layout';
const LS_THEME = 'teclado.theme';

const THEMES = [
  { id: 'dark', name: 'Dark' },
  { id: 'light', name: 'Light' },
  { id: 'nord', name: 'Nord' },
  { id: 'dracula', name: 'Dracula' },
];

export function initToolbar(container, { onLayout } = {}) {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  const savedLayout = localStorage.getItem(LS_LAYOUT) ?? 'mac';
  const savedTheme = localStorage.getItem(LS_THEME) ?? 'dark';

  // ---- Toggle de layout ----
  const layoutGroup = document.createElement('div');
  layoutGroup.className = 'toolbar__group';

  const layoutButtons = {};
  const setLayout = (mode) => {
    localStorage.setItem(LS_LAYOUT, mode);
    for (const [id, btn] of Object.entries(layoutButtons)) {
      btn.classList.toggle('is-active', id === mode);
    }
    onLayout?.(mode);
  };

  for (const [id, label] of [['mac', 'Mac'], ['win', 'Windows']]) {
    const btn = document.createElement('button');
    btn.className = 'toolbar__toggle';
    btn.textContent = label;
    btn.addEventListener('click', () => setLayout(id));
    layoutButtons[id] = btn;
    layoutGroup.appendChild(btn);
  }

  // ---- Selector de temas ----
  const themeGroup = document.createElement('div');
  themeGroup.className = 'toolbar__group';

  const themeButtons = {};
  const setTheme = (id) => {
    localStorage.setItem(LS_THEME, id);
    document.documentElement.dataset.theme = id;
    for (const [tid, btn] of Object.entries(themeButtons)) {
      btn.classList.toggle('is-active', tid === id);
    }
  };

  for (const theme of THEMES) {
    const btn = document.createElement('button');
    btn.className = 'toolbar__swatch';
    btn.dataset.theme = theme.id; // usa las variables del tema para colorearse
    btn.title = theme.name;
    btn.setAttribute('aria-label', `${lang === 'en' ? 'Theme' : 'Tema'} ${theme.name}`);
    btn.addEventListener('click', () => setTheme(theme.id));
    themeButtons[theme.id] = btn;
    themeGroup.appendChild(btn);
  }

  container.append(layoutGroup, themeGroup);

  // Aplicar lo guardado
  setLayout(savedLayout);
  setTheme(savedTheme);
}
