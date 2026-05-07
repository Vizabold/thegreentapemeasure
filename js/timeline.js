const prevBtn         = document.getElementById('timeline-prev-btn');
const nextBtn         = document.getElementById('timeline-next-btn');
const timelineSection = document.getElementById('timeline');

if (prevBtn && nextBtn && timelineSection) {

  const events  = Array.from(timelineSection.querySelectorAll('.timeline-event'));
  const lgQuery = window.matchMedia('(min-width: 850px)');
  let currentIndex = 0;

  function visibleCount() { return lgQuery.matches ? 3 : 1; }
  function maxIndex()     { return Math.max(0, events.length - visibleCount()); }

  function showCurrentEvents() {
    const count = visibleCount();
    events.forEach((ev, i) => {
      const show = i >= currentIndex && i < currentIndex + count;
      ev.classList.toggle('hidden', !show);
      ev.classList.toggle('flex',   show);
    });
    updateButtons();
  }

  /* clamp and re-render when the breakpoint crosses */
  lgQuery.addEventListener('change', () => {
    currentIndex = Math.min(currentIndex, maxIndex());
    showCurrentEvents();
  });

  showCurrentEvents();

  /* buttons always step one at a time */
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  /* swipe up → next (newer), swipe down → prev (older)
     velocity determines how many events to jump:
     ≥ 0.8 px/ms = 3 events, ≥ 0.4 px/ms = 2, slower = 1 */
  let touchStartY    = 0;
  let touchStartTime = 0;
  timelineSection.addEventListener('touchstart', (e) => {
    touchStartY    = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  timelineSection.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) < 30) return;
    const velocity = Math.abs(dy) / (Date.now() - touchStartTime);
    const steps    = velocity >= 0.8 ? 3 : velocity >= 0.4 ? 2 : 1;
    navigate(dy < 0 ? steps : -steps);
  }, { passive: true });

  function navigate(delta) {
    const max  = maxIndex();
    let next;
    if (delta < 0 && currentIndex === 0) {
      next = max;
    } else if (delta > 0 && currentIndex === max) {
      next = 0;
    } else {
      next = currentIndex + delta;
    }
    if (next === currentIndex) return;
    currentIndex = next;
    showCurrentEvents();
    if (delta > 0) {
      requestAnimationFrame(() => nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  }

  function updateButtons() {
    prevBtn.disabled = false;
    prevBtn.setAttribute('aria-disabled', 'false');
    prevBtn.classList.remove('opacity-50');
    nextBtn.disabled = false;
    nextBtn.setAttribute('aria-disabled', 'false');
    nextBtn.classList.remove('opacity-50');
  }

}
