/**
 * @param {object}  opts
 * @param {'nav'|'inline'|'footer'|'nav-mobile'|'nav-mobile-takeaction'} [opts.type='nav']
 * @param {string}  [opts.label='Label']
 * @param {string}  [opts.href='#']
 * @param {boolean} [opts.active=false]
 * @param {string}  [opts.ariaLabel]
 * @returns {HTMLAnchorElement}
 */
export function createLink({ type = 'nav', label = 'Label', href = '#', active = false, ariaLabel } = {}) {
  const a = document.createElement('a');
  a.href = href;
  a.className = `link link--${type}`;
  a.textContent = label;

  if (active) {
    a.classList.add('link--active');
    if (type === 'nav') a.setAttribute('aria-current', 'page');
  }

  if (ariaLabel) a.setAttribute('aria-label', ariaLabel);

  return a;
}
