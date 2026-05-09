/* import { createButton } from './components/Button.js'; */

import('./quiz.js').catch(() => { });
import('./timeline.js').catch(() => { });
import('./presentation.js').catch(() => { });
import('details-polyfill').catch(() => { });

/*--------------- POPOVER LEGACY SUPPORT --------------------- */

if (!HTMLElement.prototype.hasOwnProperty('popover')) {
  document.querySelectorAll('[popovertarget]').forEach(btn => {
    btn.onclick = () => document.getElementById(btn.getAttribute('popovertarget')).toggleAttribute('open');
  });
}

/*--------------- SCROLLING & NAV FUNCTIONS --------------------- */

const sections = document.querySelectorAll('section');
const desktopNav = document.getElementById('desktop-nav');
const mobileNav = document.getElementById('mobile-nav-menu');
const desktopNavLinks = desktopNav.querySelectorAll('.link--nav');
const mobileNavLinks = document.querySelectorAll('.link--nav-mobile');
const mobileBtn = document.getElementById('mobile-nav-btn');
const isMobileBtnShown = window.getComputedStyle(mobileBtn);

/* Scrolling & Nav Links */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0');
      entry.target.classList.add('scroll-appear');
      if (isMobileBtnShown.display !== 'none') {
        mobileNavLinks.forEach(link => {
          if (entry.target.id === 'takeaction') {
            mobileNavLinks[5].classList.toggle("link--nav-mobile-takeaction-active");
          } else {
            mobileNavLinks.forEach(link => {
              link.classList.toggle("link--nav-mobile-active",
                link.getAttribute("href").substring(1) === entry.target.id
              );
            })
          }
        });
      } else {
        desktopNavLinks.forEach(link => {
          link.classList.toggle("link--nav-active",
            link.getAttribute("href").substring(1) === entry.target.id
          );
        });
      }
    }

  }), {
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  }
})

sections.forEach(section => observer.observe(section));

/* Header Hide and Appear */
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

/* Close Mobile Nav When Nav Btn Tapped */
const mobileNavMenu = document.getElementById('mobile-nav-menu');

mobileNavMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    mobileNavMenu.hidePopover();
  }
});

/* Remove Scroll Indicator */
const scrollIndicator = document.getElementById('scroll-indicator');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    scrollIndicator.classList.add('opacity-0', 'pointer-events-none');
  } else {
    scrollIndicator.classList.remove('opacity-0', 'pointer-events-none');
  }
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

/*--------------- FORMS --------------------- */

const takeAction = document.getElementById('takeaction');
const comment = takeAction.querySelector('textarea');
const count = takeAction.querySelector('.textarea-count');
comment.oninput = () => {
  count.textContent = this.value.length;
}

/*--------------- DIALOG FOCUS TRAP & SCROLL LOCK --------------------- */

(function () {
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details > summary, [tabindex]:not([tabindex="-1"])';
  const hasNativePopover = HTMLElement.prototype.hasOwnProperty('popover');

  function setupDialog(dialogEl) {
    let priorFocus = null;
    let removeKeyTrap = null;

    function onOpen() {
      priorFocus = document.activeElement;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : '';
      requestAnimationFrame(() => {
        const nodes = Array.from(dialogEl.querySelectorAll(FOCUSABLE));
        if (nodes.length) nodes[0].focus();
      });

      function onKeydown(e) {
        if (e.key === 'Escape' && !hasNativePopover) {
          dialogEl.removeAttribute('open');
          return;
        }
        if (e.key !== 'Tab') return;
        const nodes = Array.from(dialogEl.querySelectorAll(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }

      dialogEl.addEventListener('keydown', onKeydown);
      removeKeyTrap = () => dialogEl.removeEventListener('keydown', onKeydown);
    }

    function onClose() {
      document.documentElement.style.overflowY = '';
      document.body.style.paddingRight = '';
      if (removeKeyTrap) { removeKeyTrap(); removeKeyTrap = null; }
      if (priorFocus) { priorFocus.focus(); priorFocus = null; }
    }

    if (hasNativePopover) {
      dialogEl.addEventListener('toggle', (e) => (e.newState === 'open' ? onOpen() : onClose()));
    } else {
      new MutationObserver(() =>
        (dialogEl.hasAttribute('open') ? onOpen() : onClose())
      ).observe(dialogEl, { attributes: true, attributeFilter: ['open'] });
    }
  }

  ['disclaimer', 'privacy', 'analysis-one', 'analysis-two', 'analysis-three'].forEach(id => {
    const el = document.getElementById(id);
    if (el) setupDialog(el);
  });
}());

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
