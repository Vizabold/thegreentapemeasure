/* import { createButton } from './components/Button.js'; */

import('details-polyfill').catch(() => { });

/*--------------- SCROLLING FUNCTIONS --------------------- */

document.documentElement.classList.add('js-enabled');

Observer.start();

let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    header.classList.add('-translate-y-full');
  } else {
    header.classList.remove('-translate-y-full');
  }
  lastScrollY = window.scrollY;
});

/*--------------- LIGHT, DARK TOGGLE --------------------- */

const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  const osPref = window.matchMedia('(prefers-color-scheme: light)');

  if (!modeToggle.checked && osPref.matches) {
    modeToggle.checked = true;
  }

  const themeSources = document.querySelectorAll('source[data-theme]');
  themeSources.forEach(source => {
    source.dataset.originalMedia = source.getAttribute('media') ?? 'all';
  });

  const toggleLabels = document.querySelectorAll('label[for="mode-toggle"]');
  const syncAriaLabel = () => {
    const isLight = modeToggle.checked;
    const theme = isLight ? 'light' : 'dark';
    toggleLabels.forEach(l => l.setAttribute('aria-label', isLight ? 'light mode on' : 'dark mode on'));
    document.documentElement.setAttribute('data-theme', theme);
    themeSources.forEach(source => {
      const themes = source.dataset.theme.split(',').map(t => t.trim());
      source.media = themes.includes(theme) || themes.includes('all')
        ? source.dataset.originalMedia
        : 'not all';
    });
  };
  syncAriaLabel();

  modeToggle.addEventListener('change', syncAriaLabel);

  osPref.addEventListener('change', (e) => {
    modeToggle.checked = e.matches;
    syncAriaLabel();
  });
}

/*
const container = document.querySelector('#buttons');

const buttons = [
  { variant: 'primary', size: 'large', label: 'label' },
  { variant: 'secondary', size: 'large', label: 'label' },
  { variant: 'primary', size: 'medium', label: 'label' },
  { variant: 'cta', size: 'large', label: 'label' },
  { variant: 'cta', size: 'medium', label: 'label' },
  { variant: 'icon', size: 'small', label: 'More options' },
  { variant: 'icon', size: 'large', label: 'More options' },
  { variant: 'draggable', size: 'large', label: 'label' },
  { variant: 'dropzone', size: 'large', label: 'label' },
  { variant: 'link', size: 'small', label: 'Label' },
];

buttons.forEach(opts => container.appendChild(createButton(opts)));
*/
