const hasNativePopover = HTMLElement.prototype.hasOwnProperty('popover');

document.querySelectorAll('dialog.analysis-dialog').forEach(dialog => {
  const slides = Array.from(dialog.querySelectorAll('.presentation-slide'));
  const prevBtn = dialog.querySelector('.analysis-prev-btn');
  const nextBtn = dialog.querySelector('.analysis-next-btn');
  const skipBtn = dialog.querySelector('.skip-to-sources-btn');
  const dots = Array.from(dialog.querySelectorAll('.slide-dot'));
  const slider = dialog.querySelector('.presentation-slider');
  const sliderCenter = slider.scrollLeft + (slider.clientWidth / 2);
  let current = 0;
  let minDiff = Infinity;

  if (!slides.length || !prevBtn || !nextBtn) return;

  function goTo(index) {
    slides[current].classList.remove('slide-current');
    const slideCenter = slides[current].offsetLeft + (slides[current].clientWidth / 2);
    const diff = Math.abs(sliderCenter - slideCenter);
    if (diff < minDiff) {
      minDiff = diff;
    }

    const direction = index > current ? 1 : -1;

    if (dots[current]) {
      dots[current].classList.replace('w-6', 'w-3');
      dots[current].classList.replace('bg-primary-one', 'bg-primary-three');
      current = index;
    }

    let nextIndex = current + direction;

    if (nextIndex >= 0 && nextIndex < slides.length) {
      slides[nextIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    slides[current].classList.add('slide-current');
    if (dots[current]) {
      dots[current].classList.replace('w-3', 'w-6');
      dots[current].classList.replace('bg-primary-three', 'bg-primary-one');
    }
    if (skipBtn) skipBtn.classList.toggle('invisible', current === slides.length - 1);
  }

  prevBtn.addEventListener('click', () => goTo(current === 0 ? slides.length - 1 : current - 1));
  nextBtn.addEventListener('click', () => goTo(current === slides.length - 1 ? 0 : current + 1));
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

/*
function goTo(index) {
  slides[current].classList.add('hidden');
  if (dots[current]) {
    dots[current].classList.replace('w-6', 'w-3');
    dots[current].classList.replace('bg-primary-one', 'bg-primary-three');
  }
  current = index;
  slides[current].classList.remove('hidden');
  if (dots[current]) {
    dots[current].classList.replace('w-3', 'w-6');
    dots[current].classList.replace('bg-primary-three', 'bg-primary-one');
  }
  if (skipBtn) skipBtn.classList.toggle('invisible', current === slides.length - 1);
}

slides.forEach((s, i) => { if (i !== 0) s.classList.add('hidden'); });

prevBtn.addEventListener('click', () => goTo(current === 0 ? slides.length - 1 : current - 1));
nextBtn.addEventListener('click', () => goTo(current === slides.length - 1 ? 0 : current + 1));
if (skipBtn) skipBtn.addEventListener('click', () => goTo(slides.length - 1));

function onClose() { if (current !== 0) goTo(0); }

if (hasNativePopover) {
  dialog.addEventListener('toggle', (e) => { if (e.newState === 'closed') onClose(); });
} else {
  new MutationObserver(() => {
    if (!dialog.hasAttribute('open')) onClose();
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
}
 
});
*/
