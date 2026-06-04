const prevBtn = document.getElementById('timeline-prev-btn');
const nextBtn = document.getElementById('timeline-next-btn');
const timeline = document.getElementById('timeline');
const liveRegion = document.getElementById('live-region');

if (prevBtn && nextBtn && liveRegion) {
  const events = timeline.querySelectorAll('.timeline-event');

  const announceCurrentEvent = () => {
    if (!liveRegion || !events[0]) return;
    const index = Math.round(timeline.scrollLeft / events[0].offsetWidth);
    const title = events[index]?.querySelector('h3')?.textContent || `Event ${index + 1}`;

    liveRegion.textContent = `Showing timeline item ${index + 1} of ${events.length}: ${title}`;
  };

  const navigate = (direction) => {
    const itemWidth = events[0]?.offsetWidth || 0;

    timeline.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
    setTimeout(announceCurrentEvent, 400);
  };

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
