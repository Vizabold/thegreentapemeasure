const hasNativePopover = HTMLElement.prototype.hasOwnProperty('popover');
const slide3b = document.getElementById('slide-3b');
const analysis3Input = slide3b.querySelectorAll('input');
const billDetailsContainer = document.getElementById('state-bill-details');
const liveRegion = document.getElementById('live-region');
let currentlyChecked;

document.querySelectorAll('dialog.analysis-dialog').forEach(dialog => {
  const slides = Array.from(dialog.querySelectorAll('.presentation-slide'));
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  const slider = dialog.querySelector('.presentation-slider');
  let current = 0;
  if (!slides.length || !prevBtn || !nextBtn) return;

  function removeActiveSlide() {
    slides.forEach(slide => {
      if (slide.classList.contains('slide-current')) {
        slide.classList.remove('slide-current');
      }
    })
  }

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        removeActiveSlide();
        setTimeout(() => {
          entry.target.classList.add('slide-current');
        }, 301)
      }
    })
  })

  function goTo(index) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    skipBtn.disabled = true;
    current = index;

    slides[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    dots.forEach((dot, i) => {
      if (i === current) {
        dot.classList.replace('w-3', 'w-6');
        dot.classList.replace('bg-primary-three', 'bg-primary-one');
      } else {
        dot.classList.replace('w-6', 'w-3');
        dot.classList.replace('bg-primary-one', 'bg-primary-three');
      }
    })

    if (skipBtn) skipBtn.classList.toggle('invisible', current === slides.length - 1);

    setTimeout(() => {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      skipBtn.disabled = false;
    }, 751)
  }

  prevBtn.addEventListener('click', () => {
    let prev = current === 0 ? slides.length - 1 : current - 1;
    goTo(prev);
  });

  nextBtn.addEventListener('click', () => {
    let next = current === slides.length - 1 ? 0 : current + 1;
    goTo(next);
  });

  if (skipBtn) skipBtn.addEventListener('click', () => goTo(slides.length - 1));

  function onClose() { if (current !== 0) goTo(0); }

  if (hasNativePopover) {
    dialog.addEventListener('toggle', (e) => { if (e.newState === 'closed') onClose(); });
  } else {
    new MutationObserver(() => {
      if (!dialog.hasAttribute('open')) onClose();
    }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  }

})

analysis3Input.forEach(input => {
  input.addEventListener('click', () => {
    if (currentlyChecked) {
      currentlyChecked.setAttribute('aria-expanded', 'false');
    }
    input.setAttribute('aria-expanded', 'true');
    currentlyChecked = input;
    liveRegion.innerText = 'bill details updated';
    billDetailsContainer.focus();
  })
})


