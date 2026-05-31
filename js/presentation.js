const liveRegion = document.getElementById('live-region');
const analysisBtns = document.querySelectorAll('.open-analysis-btn');

function setupSlides(dialog) {
  const dialogController = new AbortController();
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const slideContainer = dialog.querySelector('.presentation-slider');
  const slides = Array.from(slideContainer.querySelectorAll('.presentation-slide'));
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  let current = 0;
  let scrollTimeout;

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
  });

  slides[current].classList.add('slide-current');
  slides[current].setAttribute('aria-current', 'true');

  if (!slideContainer.hasAttribute('tabindex')) {
    slideContainer.setAttribute('tabindex', '0');
  }

  function updateSlideState(newIndex) {
    slides[current].classList.remove('slide-current');
    slides[current].removeAttribute('tabindex');
    slides[current].removeAttribute('aria-current');

    current = newIndex;

    slides[current].classList.add('slide-current');
    slides[current].setAttribute('aria-current', 'true');
    slides[current].setAttribute('tabindex', '-1');

    if (liveRegion) {
      liveRegion.textContent = `Item ${current + 1} of ${slides.length}`;
    }

    dots.forEach((dot, i) => {
      if (i === current) {
        dot.classList.replace('w-3', 'w-6');
        dot.classList.replace('bg-primary-three', 'bg-primary-one');
      } else {
        dot.classList.replace('w-6', 'w-3');
        dot.classList.replace('bg-primary-one', 'bg-primary-three');
      }
    });

    if (skipBtn) skipBtn.classList.toggle('invisible', current === slides.length - 1);
  }

  function goToSlide(index) {
    if (index === current) return;

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    updateSlideState(index);

    slides[index].scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'center'
    })

    setTimeout(() => {
      slides[index].focus();
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }, 301)
  }

  slideContainer.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const containerLeft = slideContainer.getBoundingClientRect().left;
      const containerCenter = containerLeft + (slideContainer.offsetWidth / 2);
      const activeIndex = slides.findIndex(slide => {
        const rect = slide.getBoundingClientRect();
        return rect.left <= containerCenter && rect.right >= containerCenter;
      });

      if (activeIndex !== -1 && activeIndex !== current) {
        updateSlideState(activeIndex);
      }
    }, 50);
  }, { signal: dialogController.signal });


  slideContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      let prev = current === 0 ? slides.length - 1 : current - 1;
      goToSlide(prev);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      let next = current === slides.length - 1 ? 0 : current + 1;
      goToSlide(next);
    }
  }, { signal: dialogController.signal });

  slideContainer.addEventListener('click', (e) => {
    const targetEl = e.target.closest('button, a');
    if (!targetEl) return;
    const slide = targetEl.closest('.presentation-slide');
    if (!slide) return;
    const slideIndex = slides.indexOf(slide);

    if (slideIndex !== -1) {
      goToSlide(slideIndex);
    }
  }, { signal: dialogController.signal })

  prevBtn.addEventListener('click', () => {
    let prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
  }, { signal: dialogController.signal })

  nextBtn.addEventListener('click', () => {
    let next = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  }, { signal: dialogController.signal })

  if (skipBtn) skipBtn.addEventListener('click', () => goToSlide(slides.length - 1), { signal: dialogController.signal });

  dialog.addEventListener('close', () => {
    dialogController.abort();
  }, { once: true });

}

analysisBtns.forEach(btn => {
  const dialogId = btn.getAttribute('popovertarget');
  const dialog = document.getElementById(dialogId);

  btn.addEventListener('click', () => {
    setupSlides(dialog);
  })

})

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
