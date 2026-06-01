const liveRegion = document.getElementById('live-region');
const analysisBtns = document.querySelectorAll('.open-analysis-btn');

function setupSlides(dialog) {
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const slideContainer = dialog.querySelector('.presentation-slider');
  const slides = Array.from(slideContainer.querySelectorAll('.presentation-slide'));
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  let current = 0;
  let isKeyboardOrButtonClick = false;
  let debounceTimeout = null;
  let dialogController = null;

  function updateUI(index) {
    slides[current].classList.remove('slide-current');
    slides[current].removeAttribute('aria-current');
    slides[index].classList.add('slide-current');
    slides[index].setAttribute('aria-current', 'true');

    if (liveRegion) {
      liveRegion.textContent = `Item ${index + 1} of ${slides.length}`;
    }

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.replace('w-3', 'w-6');
        dot.classList.replace('bg-primary-three', 'bg-primary-one');
      } else {
        dot.classList.replace('w-6', 'w-3');
        dot.classList.replace('bg-primary-one', 'bg-primary-three');
      }
    });

    if (skipBtn) {
      skipBtn.classList.toggle('invisible', index === slides.length - 1);
    }

    current = index;
  }

  function goToSlide(index) {
    isKeyboardOrButtonClick = true;
    updateUI(index);

    slides[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      isKeyboardOrButtonClick = false;
    }, 350);
  }

  dialog.addEventListener('toggle', (event) => {
    if (event.newState === 'open') {
      const dialogController = new AbortController();
      const signal = dialogController.signal;
      isKeyboardOrButtonClick = true;

      const handleTransitionEnd = () => {
        slides.forEach(slide => {
          if (slide.classList.contains('slide-current')) {
            slide.classList.remove('slide-current');
            slide.removeAttribute('aria-current');
          }
        })
        slides[0].classList.add('slide-current');
        slides[0].setAttribute('aria-current', 'true');
        dots.forEach((dot, i) => {
          if (i === 0) {
            dot.classList.replace('w-3', 'w-6');
            dot.classList.replace('bg-primary-three', 'bg-primary-one');
          } else {
            dot.classList.replace('w-6', 'w-3');
            dot.classList.replace('bg-primary-one', 'bg-primary-three');
          }
        });
        slides[0].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
        current = 0;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          isKeyboardOrButtonClick = false;
        }, 350);
        dialog.removeEventListener('transitionend', handleTransitionEnd);
      };

      dialog.addEventListener('transitionend', handleTransitionEnd);

      slideContainer.addEventListener('scroll', () => {
        if (isKeyboardOrButtonClick) return;
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          const containerLeft = slideContainer.getBoundingClientRect().left;
          const containerCenter = containerLeft + (slideContainer.offsetWidth / 2);

          const activeIndex = slides.findIndex(slide => {
            const rect = slide.getBoundingClientRect();
            return rect.left <= containerCenter && rect.right >= containerCenter;
          });
          if (activeIndex !== -1) {
            updateUI(activeIndex);
          }
        }, 50);
      }, { signal });

      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          let prev = current === 0 ? slides.length - 1 : current - 1;
          goToSlide(prev);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          let next = current === slides.length - 1 ? 0 : current + 1;
          goToSlide(next);
        }
      }, { signal });

      prevBtn.addEventListener('click', () => {
        let prev = current === 0 ? slides.length - 1 : current - 1;
        goToSlide(prev);
      }, { signal });

      nextBtn.addEventListener('click', () => {
        let next = current === slides.length - 1 ? 0 : current + 1;
        goToSlide(next);
      }, { signal });

      if (skipBtn) {
        skipBtn.addEventListener('click', () => goToSlide(slides.length - 1), { signal });
      }
    } else {
      clearTimeout(debounceTimeout);
      if (dialogController) {
        dialogController.abort();
        dialogController = null;
      }
    };
  });
}

analysisBtns.forEach(btn => {
  const dialogId = btn.getAttribute('popovertarget');
  const dialog = document.getElementById(dialogId);
  if (dialog) {
    setupSlides(dialog);
  }
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
