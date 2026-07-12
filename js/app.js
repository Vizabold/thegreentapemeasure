import('details-polyfill').catch(() => { });
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
      if (entry.boundingClientRect.top > 0) {
        footer.classList.remove('js:opacity-100');
        footer.classList.add('js:opacity-0', 'js:pointer-events-none');
      }
    }
  });
}, {
  root: null,
  threshold: 0,
  rootMargin: '0px 0px 200px 0px'
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

document.querySelectorAll('button[popovertarget]').forEach(button => {
  const dialogId = button.getAttribute('popovertarget');
  const dialog = document.getElementById(dialogId);
  if (!dialog || dialog.tagName !== 'DIALOG') return;

  dialog.removeAttribute('popover');
  button.removeAttribute('popovertarget');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();

    const closeBtn = dialog.querySelector('.btn-close-dialog');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dialog.close();
        button.focus();
      }, { once: true });
    }
    dialog.addEventListener('close', () => {
      button.focus();
    }, { once: true });
  })
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
  if (window.innerWidth < 1280) {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 0) {
      header.classList.remove('-translate-y-full');
    }
    else if (currentScrollY > lastScrollY) {
      header.classList.add('-translate-y-full');
    }
    else {
      header.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
  } else {
    header.classList.remove('-translate-y-full');
  }
});

/* Close Mobile Nav When Nav Btn Tapped */
const mobileNavMenu = document.getElementById('mobile-nav-menu');

mobileNavMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    if (mobileNavMenu.tagName === 'DIALOG' && mobileNavMenu.hasAttribute('open')) {
      mobileNavMenu.close();
    } else if (typeof mobileNavMenu.hidePopover === 'function') {
      mobileNavMenu.hidePopover();
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

  const toggleLabels = document.querySelectorAll('label[for="mode-toggle"]');

  const syncAriaLabel = () => {
    const isLight = modeToggle.checked;
    const theme = isLight ? 'light' : 'dark';

    toggleLabels.forEach(label => {
      label.firstElementChild.textContent = isLight ? 'light mode on' : 'dark mode on';
    });

    document.documentElement.setAttribute('data-theme', theme);

    const pictureElements = document.querySelectorAll('picture');
    pictureElements.forEach(picture => {
      const sources = picture.querySelectorAll('source[data-theme]');
      sources.forEach(source => {
        const themes = source.dataset.theme.split(',').map(t => t.trim());
        if (themes.includes(theme) || themes.includes('all')) {
          source.removeAttribute('media');
        } else {
          source.setAttribute('media', '(max-width: 0px)');
        }
      });
    });
  };

  syncAriaLabel();
  modeToggle.addEventListener('change', syncAriaLabel);

  try {
    osPref.addEventListener('change', (e) => {
      modeToggle.checked = e.matches;
      syncAriaLabel();
    });
  } catch (e) {
    osPref.addListener((e) => {
      modeToggle.checked = e.matches;
      syncAriaLabel();
    });
  }

  toggleLabels.forEach(label => {
    label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        modeToggle.click();
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

/*------------------------------ VIDEO --------------------------------- */

const videoWrapper = document.getElementById('video-wrapper');

if (videoWrapper) {
  videoWrapper.addEventListener('click', function () {
    const videoId = this.getAttribute('data-video');
    const iframe = document.createElement('iframe');

    iframe.className = 'flex aspect-video w-full';
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?si=Vjs94y2cQ06KzTCa`;
    iframe.title = 'GTM Intro Video';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');

    const parent = this.parentElement;

    parent.innerHTML = '';
    parent.appendChild(iframe);

    iframe.focus();
  });
}