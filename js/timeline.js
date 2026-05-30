const prevBtn = document.getElementById('timeline-prev-btn');
const nextBtn = document.getElementById('timeline-next-btn');
const timelineSection = document.getElementById('timeline');
const liveRegion = document.getElementById('live-region');

if (prevBtn && nextBtn && timelineSection) {
  const events = Array.from(timelineSection.querySelectorAll('.timeline-event'));
  const lgQuery = window.matchMedia('(min-width: 850px)');
  let currentIndex = 0;
  let isAnimating = false;

  const getVisibleCount = () => lgQuery.matches ? 3 : 1;
  const getMaxIndex = () => Math.max(0, events.length - getVisibleCount());

  function setButtonsDisabled(disabledState) {
    isAnimating = disabledState;
    [prevBtn, nextBtn].forEach(btn => {
      btn.disabled = disabledState;
      btn.setAttribute('aria-disabled', disabledState.toString());
      btn.classList.toggle('opacity-50', disabledState);
      btn.classList.toggle('cursor-not-allowed', disabledState);
    })
  }

  function showCurrentEvents(announce = false) {
    const count = getVisibleCount();

    events.forEach((ev, i) => {
      const show = i >= currentIndex && i < currentIndex + count;
      ev.classList.toggle('hidden', !show);
      ev.classList.toggle('flex', show);
      if (show) ev.classList.add('animate-fadeIn');
    });

    if (announce && liveRegion) {
      const currentEventTitle = events[currentIndex]?.querySelector('h3')?.textContent || `Event ${currentIndex + 1}`;
      liveRegion.textContent = `Showing timeline item ${currentIndex + 1} of ${events.length}: ${currentEventTitle}`;
    }
  }

  function navigate(delta) {
    if (isAnimating) return;

    const max = getMaxIndex();
    let next = currentIndex + delta;

    if (next < 0) {
      next = max;
    } else if (next > max) {
      next = 0;
    }

    if (next === currentIndex) return;

    setButtonsDisabled(true);
    currentIndex = next;
    showCurrentEvents(true);

    setTimeout(() => {
      setButtonsDisabled(false);
    }, 300);
  }

  lgQuery.addEventListener('change', () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    showCurrentEvents(false);
  });

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  let touchStartY = 0;
  timelineSection.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  timelineSection.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) < 50) return;
    navigate(dy < 0 ? 1 : -1);
  }, { passive: true });

  showCurrentEvents(false);
}
