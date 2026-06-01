const liveRegion = document.getElementById('live-region');

function setupSlides(dialog) {
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const slideContainer = dialog.querySelector('.presentation-slider');
  const slides = Array.from(slideContainer.querySelectorAll('.presentation-slide'));
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));

  let current = 0;
  let isScrollSyncing = false;

  function updateUI(index) {
    if (index < 0 || index >= slides.length) return;

    slides[current].removeAttribute('aria-current');
    slides[index].setAttribute('aria-current', 'true');

    dots[current]?.removeAttribute('aria-current');
    dots[index]?.setAttribute('aria-current', 'true');

    if (liveRegion) {
      liveRegion.textContent = `Item ${index + 1} of ${slides.length}`;
    }

    if (skipBtn) {
      skipBtn.classList.toggle('invisible', index === slides.length - 1);
    }

    current = index;
  }

  function goToSlide(index) {
    if (index === current) return;
    isScrollSyncing = true;

    updateUI(index);

    slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    setTimeout(() => {
      slides[index].focus({ preventScroll: true });
      isScrollSyncing = false;
    }, 350);
  }

  slideContainer.addEventListener('scroll', () => {
    if (isScrollSyncing) return;

    const containerRect = slideContainer.getBoundingClientRect();
    const midPoint = containerRect.left + (containerRect.width / 2);

    const activeIndex = slides.findIndex(slide => {
      const rect = slide.getBoundingClientRect();
      return rect.left <= midPoint && rect.right >= midPoint;
    });

    if (activeIndex !== -1 && activeIndex !== current) {
      updateUI(activeIndex);
    }
  });

  prevBtn.addEventListener('click', () => {
    let prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
  });

  nextBtn.addEventListener('click', () => {
    let next = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', () => goToSlide(slides.length - 1));
  }

  dialog.addEventListener('toggle', (event) => {
    if (event.newState === 'open') {
      requestAnimationFrame(() => {
        isScrollSyncing = true;

        slides.forEach(s => s.removeAttribute('aria-current'));
        dots.forEach(d => d.removeAttribute('aria-current'));

        current = 0;
        updateUI(0);
        slideContainer.scrollLeft = 0;
        slides[0].focus({ preventScroll: true });

        isScrollSyncing = false;
      });
    }
  });
}

document.querySelectorAll('.open-analysis-btn').forEach(btn => {
  const dialogId = btn.getAttribute('popovertarget');
  const dialog = document.getElementById(dialogId);
  if (dialog) setupSlides(dialog);
});

/*--------------- BILL DETAILS CONTAINER --------------------- */

const slide3b = document.getElementById('slide-3b');
const accordions = slide3b.querySelectorAll('.accordion-content-wrapper');
const analysis3Input = slide3b.querySelectorAll('input');
const billDetailsContainer = document.getElementById('state-bill-details');
let currentlyChecked;

analysis3Input.forEach(input => {
  input.addEventListener('click', () => {
    if (currentlyChecked) {
      currentlyChecked.setAttribute('aria-expanded', 'false');
    }
    input.setAttribute('aria-expanded', 'true');
    currentlyChecked = input;
    billDetailsContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    liveRegion.innerText = 'bill details updated';
    billDetailsContainer.focus();
  }, { signal: dialogController.signal })
})
