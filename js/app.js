import('details-polyfill').catch(() => { });
import('./popover.min.js').catch(() => { });
import('./quiz.js').catch(() => { });
import('./timeline.js').catch(() => { });
import('./graphs.js').catch(() => { });
import('./presentation.js').catch(() => { });
import('./cards.js').catch(() => { });
import('./search.js').catch(() => { });

const liveRegion = document.getElementById('live-region');

/*--------------- FOOTER DATE AUTO-UPDATE --------------------- */
const year = document.getElementById('year');
const currentYear = new Date().getFullYear();
year.innerHTML = `${currentYear}`;

/*--------------- FOOTER FADE IN/OUT --------------------- */
const footerSentinel = document.getElementById('footer-scroll-sentinel');
const footer = document.querySelector('footer');

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.remove('js:opacity-0', 'js:pointer-events-none');
      footer.classList.add('js:opacity-100');
    } else {
      footer.classList.remove('js:opacity-100');
      footer.classList.add('js:opacity-0', 'js:pointer-events-none');
    }
  });
}, {
  root: null,
  threshold: 0.1
});

footerObserver.observe(footerSentinel);

/*--------------- POPOVER FOCUS TRAP & LEGACY SUPPORT --------------------- */
function applyFocusTrap(e, container) {
  if (e.key !== 'Tab') return;

  const focusableElements = Array.from(
    container.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]')
  ).filter(el => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hasNativePopover = HTMLElement.prototype.hasOwnProperty('popover');

  document.querySelectorAll('button[popovertarget]').forEach(button => {
    const dialogId = button.getAttribute('popovertarget');
    const dialog = document.getElementById(dialogId);
    if (!dialog || dialog.tagName !== 'DIALOG') return;

    if (!hasNativePopover) {
      const closeBtn = dialog.querySelector('.btn-close-dialog');

      button.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.showModal();
        dialog.dispatchEvent(new ToggleEvent('toggle', { newState: 'open' }));
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          dialog.close();
          dialog.dispatchEvent(new ToggleEvent('toggle', { newState: 'closed' }));
        });
      }
    } else {
      dialog.addEventListener('toggle', (e) => {
        if (e.newState === 'open') {
          const firstFocusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex="0"]');
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            dialog.setAttribute('tabindex', '-1');
            dialog.focus();
          }
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      const isOpen = dialog.hasAttribute('open') || (hasNativePopover && dialog.matches(':popover-open'));
      if (isOpen) {
        applyFocusTrap(e, dialog);
      }
    });
  });
});

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
            mobileNavLinks[5].classList.toggle("link--nav-mobile-active-alt");
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
    if (typeof mobileNavMenu.hidePopover === 'function') {
      mobileNavMenu.hidePopover();
    } else if (typeof mobileNavMenu.close === 'function') {
      mobileNavMenu.close();
    }
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

  toggleLabels.forEach(label => {
    label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        label.click();
      }
    });
  });
}

/*------------------------------ FORMS --------------------------------- */

const comment = document.getElementById('comment');
const count = document.querySelector('.textarea-count');
comment.addEventListener('input', (e) => {
  count.textContent = e.target.value.length;
});

/*------------------------------ CAMPAIGN --------------------------------- */

async function loadProgress() {
  try {
    const response = await fetch('/.netlify/functions/get-progress');
    const data = await response.json();

    if (data.error) {
      console.error("Server error:", data.error);
      return;
    }

    const raisedValue = data.raised || 0;
    const goalValue = data.goal || 0;
    const percentage = data.goal > 0 ? (raisedValue / goalValue) * 100 : 0;

    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('raised-text').innerText = '$' + raisedValue.toLocaleString();
    document.getElementById('goal-text').innerText = '$' + goalValue.toLocaleString();

  } catch (err) {
    console.error("Could not load dynamic progress bar", err);
  }
}

loadProgress();

