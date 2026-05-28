import('./quiz.js').catch(() => { });
import('./timeline.js').catch(() => { });
import('./graphs.js').catch(() => { });
import('./presentation.js').catch(() => { });
import('./search.js').catch(() => { });
import('details-polyfill').catch(() => { });

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

/*-------------- NAV BTNS IN RESEARCH AND ADVOCACY --------------- */

const advocacyCards = document.getElementById('advocacy-cards');
const researchCards = document.getElementById('research-cards');
const advocacyBtns = advocacyCards.previousElementSibling;
const researchBtns = researchCards.previousElementSibling;

function handleSectionBtns(container) {
  const prevBtn = container.firstElementChild;
  const nextBtn = container.lastElementChild;
  const cards = container.nextElementSibling.querySelectorAll('.card');
  const openBtns = container.querySelectorAll('.open-analysis-btn');
  let current = 0;
  cards[current].classList.add('card-current');

  function goToCard(index) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    cards[current].classList.remove('card-current');
    setTimeout(() => {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
      cards[index].classList.add('card-current');
      current = index;
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }, 301)
  }

  prevBtn.addEventListener('click', () => {
    let prev = current === 0 ? cards.length - 1 : current - 1;
    goToCard(prev);
  })

  nextBtn.addEventListener('click', () => {
    let next = current === cards.length - 1 ? 0 : current + 1;
    goToCard(next);
  })

  openBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      goToCard(i);
    })
  })

}

function checkScroll() {
  const advocacyScroll = advocacyCards.scrollWidth > advocacyCards.clientWidth;
  const researchScroll = researchCards.scrollWidth > researchCards.clientWidth;
  advocacyBtns.classList.toggle('hidden', !advocacyScroll);
  researchBtns.classList.toggle('hidden', !researchScroll);
  if (!advocacyBtns.classList.contains('hidden')) { handleSectionBtns(advocacyBtns) };
  if (!researchBtns.classList.contains('hidden')) { handleSectionBtns(researchBtns) };
}

window.addEventListener('resize', checkScroll);
checkScroll();

/*--------------- BILL DETAILS CONTAINER --------------------- */

const detailsContainer = document.getElementById('state-bill-details');
const accordions = document.querySelectorAll('.accordion-content-wrapper');
const detailsController = new AbortController();

accordions.forEach(accordion => {
  const stateBtns = accordion.querySelectorAll('label');
  stateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      detailsContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      }, { signal: detailsController.signal })
    })
  })
});

document.getElementById('analysis-three').addEventListener('close', () => {
  detailsController.abort();
  console.log('analysis two closed, event listeners removed');
});


/*--------------- FORMS --------------------- */

const takeAction = document.getElementById('takeaction');
const comment = takeAction.querySelector('textarea');
const count = takeAction.querySelector('.textarea-count');
comment.oninput = () => {
  count.textContent = this.value.length;
}

/*--------------- DIALOG FOCUS TRAP & SCROLL LOCK --------------------- */

document.querySelectorAll('button[popovertarget]').forEach(button => {
  const dialogId = button.getAttribute('popovertarget');
  const dialog = document.getElementById(dialogId);
  const closeBtn = dialog.querySelector('.btn-close-dialog');

  if (dialog && dialog.tagName === 'DIALOG') {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      dialog.showModal();
      closeBtn.addEventListener('click', () => dialog.close(), { once: true });
    });
  };
});
