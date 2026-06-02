const liveRegion = document.getElementById('live-region');

function setupSlides(dialog) {
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const slideContainer = dialog.querySelector('.presentation-slider');
  const slides = Array.from(slideContainer.querySelectorAll('.presentation-slide'));
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  let current = 0;
  let isMoving = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let isIntentDeclared = false;
  let lockAxis = null;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isIntentDeclared = false;
    lockAxis = null;
  }

  function handleTouchMove(e) {
    const currentSlide = slides[current];
    if (!currentSlide || !slideContainer) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    if (!isIntentDeclared && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      isIntentDeclared = true;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        lockAxis = 'y';
        slideContainer.classList.remove('snap-x', 'snap-mandatory');
        slideContainer.classList.add('snap-none');
      } else {
        lockAxis = 'x';
      }
    }

    if (lockAxis === 'y') {
      e.stopPropagation();
      if (currentSlide.scrollTop === 0 && deltaY < 0) {
        currentSlide.scrollTop = Math.abs(deltaY);
      }
    }
  }

  function handleTouchEnd() {
    if (slideContainer) {
      slideContainer.classList.remove('snap-none');
      slideContainer.classList.add('snap-x', 'snap-mandatory');
    }
    isIntentDeclared = false;
    lockAxis = null;
  }

  function updateUI(index) {
    if (index < 0 || index >= slides.length) return;

    slides[current].removeEventListener('touchstart', handleTouchStart);
    slides[current].removeEventListener('touchmove', handleTouchMove);
    slides[current].removeEventListener('touchend', handleTouchEnd);

    slides[current].removeAttribute('aria-current');
    slides[current].setAttribute('tabindex', '-1');

    slides[index].setAttribute('aria-current', 'true');
    slides[index].setAttribute('tabindex', '0');

    dots[current]?.removeAttribute('aria-current');
    dots[index]?.setAttribute('aria-current', 'true');

    if (liveRegion) {
      liveRegion.textContent = `Item ${index + 1} of ${slides.length}`;
    }

    if (skipBtn) {
      skipBtn.classList.toggle('invisible', index === slides.length - 1);
    }

    current = index;

    slides[current].addEventListener('touchstart', handleTouchStart, { passive: true });
    slides[current].addEventListener('touchmove', handleTouchMove, { passive: false });
    slides[current].addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  function goToSlide(index) {
    if (index === current) return;
    isMoving = true;

    updateUI(index);

    slides[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    const handleScrollEnd = () => {
      slides[index].focus({ preventScroll: true });
      isMoving = false;
      slideContainer.removeEventListener('scrollend', handleScrollEnd);
    };

    slideContainer.addEventListener('scrollend', handleScrollEnd);
  }

  slideContainer.addEventListener('scroll', () => {
    if (isMoving) return;

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
    if (isMoving) return;
    let prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
  });

  nextBtn.addEventListener('click', () => {
    if (isMoving) return;
    let next = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      if (isMoving) return;
      goToSlide(slides.length - 1)
    });
  }

  dialog.addEventListener('keydown', (e) => {
    if (isMoving) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      let prev = current === 0 ? slides.length - 1 : current - 1;
      goToSlide(prev);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      let next = current === slides.length - 1 ? 0 : current + 1;
      goToSlide(next);
    }
  })

  dialog.addEventListener('toggle', (event) => {
    if (event.newState === 'open') {
      requestAnimationFrame(() => {
        isMoving = true;

        slides.forEach(s => {
          s.removeAttribute('aria-current');
          s.setAttribute('tabindex', '-1');
        });
        dots.forEach(d => d.removeAttribute('aria-current'));

        current = 0;
        updateUI(0);
        slideContainer.scrollLeft = 0;
        slides[0].focus({ preventScroll: true });
        isMoving = false;
      });
    };
  });
}

document.querySelectorAll('.open-analysis-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialogId = btn.getAttribute('aria-controls');
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      setupSlides(dialog);
    } else { console.log('dialog not found') };
  })
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
  })
})
