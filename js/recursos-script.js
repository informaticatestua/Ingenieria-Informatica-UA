/* =====================================================================
   Hub de Recursos Globales — Ingeniería Informática UA
   Configuración centralizada + lógica de la interfaz.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1) CONFIGURACIÓN DE ENLACES
   ---------------------------------------------------------------------
   Para cambiar/añadir un enlace en el futuro basta con editar estas
   listas. No hace falta tocar el HTML ni el CSS. En ambas: deja `url`
   en null para que la fila salga como "Próximamente"; en cuanto pongas
   una URL, esa fila se convierte en un enlace real automáticamente.
--------------------------------------------------------------------- */

// Botones destacados que son un enlace único (abren la URL directamente)
const LINKS = {
  esquemas: 'https://informatica-esquemas-ua.vercel.app',
};

// Colecciones que muestra el botón "Tests"
const TEST_RESOURCES = [
  { name: 'Tests generales', url: 'https://informatica-test-ua.vercel.app' },
  { name: 'Tests P3',        url: 'https://backist.github.io/Practicando-P3/' },
];

// Carpetas de Mega por curso que muestra el botón "Mega"
const MEGA_FOLDERS = [
  { name: 'Primero', url: null },
  { name: 'Segundo', url: 'https://mega.nz/folder/YnpFmIrQ#szU1jdnIwixWStZdIeAx0Q' },
  { name: 'Tercero', url: null },
  { name: 'Cuarto',  url: null },
];

/* ---------------------------------------------------------------------
   2) CATEGORÍAS SECUNDARIAS (placeholders elegantes)
   ---------------------------------------------------------------------
   Añade recursos futuros aquí. Deja `url` en null para que aparezcan
   como marcador de posición ("Próximamente"); en cuanto pongas una URL
   la tarjeta se vuelve un enlace real automáticamente.
--------------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: 'pisos',
    title: 'Pisos compartidos',
    desc: 'Alojamiento y compañeros de piso',
    url: null,
    icon: 'home',
  },
];

/* ---------------------------------------------------------------------
   3) ICONOS (SVG inline reutilizables para las categorías)
--------------------------------------------------------------------- */
const ICONS = {
  terminal:
    '<path d="M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.6"/><path d="M7 9.5l2.5 2.5L7 14.5M12.5 14.5h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  building:
    '<path d="M5 20V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15M15 20V9h3a1 1 0 0 1 1 1v10M3.5 20h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8h2M8 11.5h2M8 15h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  chat:
    '<path d="M4 5.5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3.5V15.5H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 10h8M8 12.5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  book:
    '<path d="M5 4.5h9a2 2 0 0 1 2 2V20a1.5 1.5 0 0 0-1.5-1.5H5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 6.5h2.5a1 1 0 0 1 1 1V20a1.5 1.5 0 0 0-1.5-1.5H16" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  home:
    '<path d="M4 10.5 12 4l8 6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 9.5V20h12V9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20v-4.5h4V20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* =====================================================================
   LÓGICA DE LA INTERFAZ
   ===================================================================== */

/* ---------- Tema claro/oscuro ---------- */
const THEME_KEY = 'recursos-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light'
          : 'dark';
      applyTheme(current);
      localStorage.setItem(THEME_KEY, current);
    });
  }
}

/* ---------- Botones destacados de enlace único ---------- */
function initFeaturedLinks() {
  document.querySelectorAll('[data-link]').forEach((el) => {
    const url = LINKS[el.getAttribute('data-link')];
    if (url) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      // Sin URL configurada: se deshabilita de forma segura.
      el.setAttribute('aria-disabled', 'true');
      el.addEventListener('click', (e) => e.preventDefault());
    }
  });
}

/* ---------- Listas de los modales (Tests / Mega) ---------- */
// Rellena la lista <ul> de un modal a partir de su array de recursos.
// `actionText` es el texto que aparece a la derecha en las filas activas.
function renderLinkList(listId, items, actionText) {
  const list = document.getElementById(listId);
  if (!list) return;

  list.innerHTML = items
    .map((item) => {
      const isLink = Boolean(item.url);
      if (isLink) {
        return `
        <li>
          <a class="year-row" href="${item.url}" target="_blank" rel="noopener noreferrer">
            <span class="year-row__label">${item.name}</span>
            <span class="year-row__meta">${actionText}</span>
            <span class="year-row__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 12h12M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>
        </li>`;
      }
      return `
        <li>
          <div class="year-row year-row--placeholder" aria-disabled="true">
            <span class="year-row__label">${item.name}</span>
            <span class="year-row__meta">Próximamente</span>
          </div>
        </li>`;
    })
    .join('');
}

/* ---------- Control genérico de modales ---------- */
// Conecta el botón [data-modal="key"] con el panel #key-modal.
function initModal(key) {
  const modal = document.getElementById(`${key}-modal`);
  const opener = document.querySelector(`[data-modal="${key}"]`);
  if (!modal || !opener) return;

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    // Enfoca el botón de cierre para accesibilidad de teclado.
    modal.querySelector('.modal__close')?.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus();
  };

  opener.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  });

  // Cierra al pulsar el fondo o cualquier elemento con [data-close].
  modal.querySelectorAll('[data-close]').forEach((el) =>
    el.addEventListener('click', close)
  );

  // Cierra con la tecla Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

/* ---------- Rejilla de categorías secundarias ---------- */
function renderCategories() {
  const grid = document.getElementById('secondary-grid');
  if (!grid) return;

  const html = CATEGORIES.map((cat) => {
    const iconSvg = ICONS[cat.icon] || '';
    const isLink = Boolean(cat.url);
    const tag = isLink ? 'a' : 'div';
    const attrs = isLink
      ? `href="${cat.url}" target="_blank" rel="noopener noreferrer"`
      : '';
    const placeholderClass = isLink ? '' : ' res-card--placeholder';

    return `
      <${tag} class="res-card${placeholderClass}" ${attrs}>
        <span class="res-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">${iconSvg}</svg>
        </span>
        <span class="res-card__body">
          <span class="res-card__title">${cat.title}</span>
          <span class="res-card__desc">${
            isLink ? cat.desc : 'Próximamente'
          }</span>
        </span>
      </${tag}>
    `;
  }).join('');

  grid.innerHTML = html;
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  // Botones de enlace único (Esquemas)
  initFeaturedLinks();

  // Modal de Tests
  renderLinkList('tests-list', TEST_RESOURCES, 'Abrir');
  initModal('tests');

  // Modal de Mega
  renderLinkList('mega-year-list', MEGA_FOLDERS, 'Abrir carpeta');
  initModal('mega');

  renderCategories();
});
