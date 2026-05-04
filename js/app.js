/* import { createButton } from './components/Button.js'; */

import('details-polyfill').catch(() => {});

const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  if (!modeToggle.checked && window.matchMedia('(prefers-color-scheme: light)').matches) {
    modeToggle.checked = true;
  }

  const toggleLabels = document.querySelectorAll('label[for="mode-toggle"]');
  const syncAriaLabel = () => {
    const text = modeToggle.checked ? 'light mode on' : 'dark mode on';
    toggleLabels.forEach(l => l.setAttribute('aria-label', text));
  };
  syncAriaLabel();
  modeToggle.addEventListener('change', syncAriaLabel);
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
