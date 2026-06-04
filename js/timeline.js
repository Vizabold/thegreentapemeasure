const timeline = document.getElementById('timeline-container');
const prevEventBtn = document.getElementById('timeline-prev-btn');
const nextEventBtn = document.getElementById('timeline-next-btn');
const events = Array.from(timeline.querySelectorAll('.timeline-event'));
const liveRegion = document.getElementById('live-region');
let currentEvent = 0;
let isTransitioning = false;
let touchStartEvX = 0;
let touchEndEvX = 0;

function updateEvent(index, shouldFocus = true) {
  if (index < 0 || index >= events.length) return;

  events[currentEvent].removeAttribute('aria-currentEvent');
  events[currentEvent].setAttribute('tabindex', '-1');
  events[currentEvent].classList.remove('event-currentEvent');

  events[index].setAttribute('aria-currentEvent', 'true');
  events[index].setAttribute('tabindex', '0');
  events[index].classList.add('event-currentEvent');

  if (shouldFocus) {
    events[index].focus({ preventScroll: true });
  }

  if (liveRegion) {
    liveRegion.textContent = `Item ${index + 1} of ${events.length}`;
  }

  currentEvent = index;
}

function goToEvent(index, shouldFocus = true) {
  if (index === currentEvent) return;
  isTransitioning = true;

  updateEvent(index, shouldFocus);

  const event = events[index];
  const containerPaddingLeft = parseInt(window.getComputedStyle(timeline).paddingLeft, 10) || 0;
  const targetScrollLeft = event.offsetLeft - containerPaddingLeft;

  timeline.scrollTo({
    left: targetScrollLeft,
    behavior: 'smooth'
  });

  setTimeout(() => { isTransitioning = false; }, 501)
}

timeline.addEventListener('focusin', (e) => {
  const event = e.target.closest('.timeline-event');
  if (!event) return;
  const eventIndex = events.indexOf(event);
  if (eventIndex !== -1 && eventIndex !== currentEvent) {
    updateEvent(eventIndex, false);
  }
});

timeline.addEventListener('touchstart', (e) => {
  touchStartEvX = e.changedTouches[0].screenX;
}, { passive: true });

timeline.addEventListener('touchend', (e) => {
  if (isTransitioning) return;

  touchEndEvX = e.changedTouches[0].screenX;
  const swipeDistance = touchStartEvX - touchEndEvX;
  const swipeThreshold = 50;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      let next = currentEvent === events.length - 1 ? currentEvent : currentEvent + 1;
      goToEvent(next, false);
    } else {
      let prev = currentEvent === 0 ? currentEvent : currentEvent - 1;
      goToEvent(prev, false);
    }
  }
}, { passive: true });

if (prevEventBtn) {
  prevEventBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    let prev = currentEvent === 0 ? events.length - 1 : currentEvent - 1;
    goToEvent(prev, false);
  })
}

if (nextEventBtn) {
  nextEventBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    if (isTransitioning === true) return;
    let next = currentEvent === events.length - 1 ? 0 : currentEvent + 1;
    goToEvent(next, false);
  })
}

timeline.addEventListener('keydown', (e) => {
  if (isTransitioning === true) return;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    let prev = currentEvent === 0 ? events.length - 1 : currentEvent - 1;
    goToEvent(prev, true);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    let next = currentEvent === events.length - 1 ? 0 : currentEvent + 1;
    goToEvent(next, true);
  }
});

timeline.addEventListener('click', (e) => {
  if (isTransitioning) return;
  const targetEl = e.target.closest('button, a');
  if (!targetEl) return;
  const event = targetEl.closest('.timeline-event');
  if (!event) return;
  const eventIndex = events.indexOf(event);
  if (eventIndex !== -1) {
    if (eventIndex === currentEvent) return;
    e.preventDefault();
    goToEvent(eventIndex, true);
  }
})

events[currentEvent].setAttribute('aria-currentEvent', 'true');
events[currentEvent].setAttribute('tabindex', '0');
events[currentEvent].classList.add('event-currentEvent');
