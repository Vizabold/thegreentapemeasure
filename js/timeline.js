const prevBtn = document.getElementById('timeline-prev-btn');
const nextBtn = document.getElementById('timeline-next-btn');
const timeline = document.getElementById('timeline');
const liveRegion = document.getElementById('live-region');

if (prevBtn && nextBtn && liveRegion) {
  const events = timeline.querySelectorAll('.timeline-event');

  const navigate = (direction) => {
    const firstEvent = timeline.querySelector('.timeline-event');
    if (!firstEvent || !events.length) return;

    const itemWidth = firstEvent.offsetWidth;
    const currentIndex = Math.round(timeline.scrollLeft / itemWidth);
    let targetIndex = currentIndex + direction;

    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= events.length) targetIndex = events.length - 1;

    timeline.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth'
    });

    events[targetIndex].focus({ preventScroll: true });

    if (liveRegion) {
      const title = events[targetIndex].querySelector('h3')?.textContent || `Event ${targetIndex + 1}`;
      liveRegion.textContent = `Showing timeline item ${targetIndex + 1} of ${events.length}: ${title}`;
    }
  };

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (document.activeElement.closest('details')) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigate(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigate(1);
    }
  });
}
