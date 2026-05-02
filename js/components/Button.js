const ICONS = {
  arrow: `<svg aria-hidden="true"><use href="/assets/sprites/solid.svg#arrow-right"></use></svg>`,
  dots:  `<svg aria-hidden="true"><use href="/assets/sprites/solid.svg#ellipsis-vertical"></use></svg>`,
  grip:  `<svg aria-hidden="true"><use href="/assets/sprites/solid.svg#grips-vertical"></use></svg>`,
  user:  `<svg aria-hidden="true"><use href="/assets/sprites/solid.svg#user"></use></svg>`,
};

/**
 * @param {object}   opts
 * @param {'primary'|'secondary'|'cta'|'icon'|'draggable'|'dropzone'|'link'} opts.variant
 * @param {'large'|'medium'|'small'} [opts.size='large']
 * @param {string}   [opts.label='label']
 * @param {string}   [opts.ariaLabel]
 * @returns {HTMLButtonElement}
 */
export function createButton({ variant = 'primary', size = 'large', label = 'label', ariaLabel } = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';

  switch (variant) {
    case 'primary':
      btn.className = `btn btn-primary ${size === 'large' ? 'btn-lg' : 'btn-md'}`;
      btn.innerHTML = `<span>${label}</span>${size === 'large' ? ICONS.arrow : ''}`;
      break;

    case 'secondary':
      btn.className = 'btn btn-secondary btn-lg';
      btn.innerHTML = `<span>${label}</span>`;
      break;

    case 'cta':
      btn.className = `btn btn-cta ${size === 'large' ? 'btn-lg' : 'btn-md'}`;
      btn.innerHTML = `<span>${label}</span>${size === 'large' ? ICONS.arrow : ''}`;
      break;

    case 'icon':
      btn.className = `btn btn-icon${size === 'small' ? ' btn-icon-sm' : ''}`;
      btn.innerHTML = ICONS.dots;
      btn.setAttribute('aria-label', ariaLabel || label);
      break;

    case 'draggable':
      btn.className = 'btn btn-draggable';
      btn.innerHTML = `${ICONS.user}<span>${label}</span>${ICONS.grip}`;
      btn.setAttribute('draggable', 'true');
      break;

    case 'dropzone':
      btn.className = 'btn btn-dropzone';
      btn.innerHTML = `<span>${label}</span>`;
      break;

    case 'link':
      btn.className = 'btn btn-link';
      btn.innerHTML = `<span>${label}</span>`;
      break;
  }

  return btn;
}
