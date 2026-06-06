const liveRegion = document.getElementById('live-region');
let slideController;

function setupSlides(dialog) {
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const slideContainer = dialog.querySelector('.presentation-slider');
  const slides = Array.from(slideContainer.querySelectorAll('.presentation-slide'));
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  let current = 0;
  let isMoving = false;
  slideController = new AbortController();
  const { signal } = slideController;

  function updateUI(index) {
    if (index < 0 || index >= slides.length) return;

    slides[current].removeAttribute('aria-current');
    slides[current].setAttribute('tabindex', '-1');

    slides[index].setAttribute('aria-current', 'true');
    slides[index].setAttribute('tabindex', '0');

    dots[current]?.removeAttribute('aria-current');
    dots[index]?.setAttribute('aria-current', 'true');

    if (liveRegion) {
      liveRegion.textContent = `Item ${index + 1} of ${slides.length}`;
    }

    if (skipBtn && dialog.id !== 'analysis-four') {
      skipBtn.classList.toggle('invisible', index === slides.length - 1);
    }

    current = index;

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

  if (dialog.id === 'analysis-three') {
    const slide3b = document.getElementById('slide-3b');
    const slide3bWrappers = slide3b.querySelectorAll('.accordion-content-wrapper');
    const analysis3Inputs = slide3b.querySelectorAll('input');
    const billDetailsContainer = document.getElementById('state-bill-details');

    analysis3Inputs.forEach(input => {
      input.addEventListener('click', () => {
        billDetailsContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        liveRegion.innerText = 'bill details updated';

        setTimeout(() => {
          billDetailsContainer.focus({
            preventScroll: true
          });
        }, 500)
      }, { signal })
    })

    slide3bWrappers.forEach(wrapper => {
      const radios = Array.from(wrapper.querySelectorAll('input[type="radio"]'));

      wrapper.addEventListener('keydown', (event) => {
        const currentInput = document.activeElement;
        if (!radios.includes(currentInput)) return;

        const currentRadio = radios.indexOf(currentInput);
        let nextRadio = null;

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          event.preventDefault();
          nextRadio = (currentRadio + 1) % radios.length;
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          event.preventDefault();
          nextRadio = (currentRadio - 1 + radios.length) % radios.length;
        }

        if (nextRadio !== null) {
          radios[nextRadio].focus();
          return;
        }

        if (event.key === ' ' || event.key === 'Enter') {
          event.stopPropagation();

          if (event.key === ' ') {
            event.preventDefault();
            currentInput.checked = true;
            currentInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }, { signal });
    })
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
  }, { signal });

  prevBtn.addEventListener('click', () => {
    if (isMoving) return;
    let prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
  }, { signal });

  nextBtn.addEventListener('click', () => {
    if (isMoving) return;
    let next = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  }, { signal });

  if (skipBtn && dialog.id !== 'analysis-four') {
    skipBtn.addEventListener('click', () => {
      if (isMoving) return;
      goToSlide(slides.length - 1)
    }, { signal });
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
  }, { signal })

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
    } else if (event.newState === 'closed') {
      if (slideController) {
        slideController.abort();
      }
    }
  }, { signal });
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