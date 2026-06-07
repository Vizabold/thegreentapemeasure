const STANDARD_TIMER_SECONDS = 30;
const EXTENDED_TIMER_SECONDS = 300;
const STORAGE_KEY = 'gtm-quiz-daily';

const draggablesEl = document.getElementById('draggables');
const dropzonesEl = document.getElementById('dropzones');
const readyBtn = document.getElementById('ready-btn');
const resetBtn = document.getElementById('reset-quiz-btn');

if (draggablesEl && dropzonesEl && readyBtn) {

  /* ── daily-limit helpers ── */

  function getDailyState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored && stored.date === new Date().toDateString()) return stored;
    } catch (_) { }
    return { date: new Date().toDateString(), incorrect: 0, correct: 0 };
  }

  function saveDailyState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { }
  }

  /* ── live-region for screen readers ── */

  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  draggablesEl.parentElement.parentElement.appendChild(announcer);

  function announce(msg) {
    announcer.textContent = '';
    requestAnimationFrame(() => { announcer.textContent = msg; });
  }

  /* ── DOM helpers ── */

  function getDraggables() {
    return Array.from(draggablesEl.querySelectorAll('.btn-draggable'));
  }

  function getDropzoneCards() {
    return Array.from(dropzonesEl.querySelectorAll('[data-answer]'));
  }

  function getDraggableValue(btn) {
    return btn.querySelector('span.font-button')?.textContent.trim() ?? '';
  }

  function getDefinitionText(card) {
    return card.querySelector('.flex.items-center p')?.textContent.trim() ?? '';
  }

  /* ── state ── */

  let activeDraggable = null;
  let draggingBtn = null;
  let timerInterval = null;
  let timeLeft = STANDARD_TIMER_SECONDS;
  let quizRunning = false;
  let panelsShown = false;

  /* ── init ── */

  draggablesEl.hidden = true;
  dropzonesEl.hidden = true;

  getDraggables().forEach(btn => {
    btn.setAttribute('draggable', 'true');
    btn.setAttribute('aria-pressed', 'false');
  });

  /* Label each dropzone button with its definition so screen readers announce context */
  getDropzoneCards().forEach(card => {
    const dropzoneBtn = card.querySelector('.btn-dropzone');
    const def = getDefinitionText(card);
    if (def) dropzoneBtn.setAttribute('aria-label', `Empty drop zone: ${def}`);
  });

  const dailyStateOnLoad = getDailyState();
  if (dailyStateOnLoad.correct >= 1 || dailyStateOnLoad.incorrect >= 5) {
    showExhausted();
  } else {
    readyBtn.addEventListener('click', startQuiz, { once: true });
  }

  setupDraggables();
  setupDropzones();

  if (resetBtn) resetBtn.addEventListener('click', handleReset);

  /* Escape deselects the active draggable */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeDraggable) {
      announce(`${getDraggableValue(activeDraggable)} put down.`);
      deselectDraggable();
    }
  });

  /* ── quiz flow ── */

  function startQuiz() {
    if (!panelsShown) {
      panelsShown = true;
      draggablesEl.hidden = false;
      dropzonesEl.hidden = false;

      const parent = draggablesEl.parentElement;
      parent.style.overflow = 'hidden';

      draggablesEl.style.animation = 'slideInLeft 0.5s ease-out';
      dropzonesEl.style.animation = 'slideInRight 0.5s ease-out';

      let done = 0;
      const clearAnim = (el) => {
        el.style.animation = '';
        if (++done === 2) parent.style.overflow = '';
      };
      draggablesEl.addEventListener('animationend', () => clearAnim(draggablesEl), { once: true });
      dropzonesEl.addEventListener('animationend', () => clearAnim(dropzonesEl), { once: true });
    }

    const accessibilityCheckbox = document.getElementById('sr-timer-toggle');
    const isExtended = accessibilityCheckbox && accessibilityCheckbox.checked;
    quizRunning = true;
    timeLeft = isExtended ? EXTENDED_TIMER_SECONDS : STANDARD_TIMER_SECONDS;
    readyBtn.disabled = true;
    readyBtn.className = 'btn btn-md btn-secondary';

    if (accessibilityCheckbox) {
      accessibilityCheckbox.parentElement.style.display = 'none';
    }

    startTimer();

    const timeMessage = isExtended ? '5 minutes' : '30 seconds';
    announce(`Quiz started. ${timeMessage} on the clock. Tab to a job title and press Enter or Space to pick it up, then Tab to a definition box and press Enter or Space to place it. Press Escape to put a title back down.`);
  }

  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft > 0 && timeLeft % 30 === 0) {
        announce(`${timeLeft} seconds remaining.`);
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerExpired();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    readyBtn.textContent = `${timeLeft}s`;
    readyBtn.setAttribute('aria-label', `${timeLeft} seconds remaining`);
  }

  function timerExpired() {
    quizRunning = false;
    if (activeDraggable) deselectDraggable();
    const state = getDailyState();
    state.incorrect++;
    saveDailyState(state);
    announce("Time's up!");
    showTryAgain(state);
  }

  function showTryAgain(state) {
    readyBtn.disabled = false;
    if (state.incorrect >= 5) {
      showExhausted();
      return;
    }
    readyBtn.textContent = 'Try again?';
    readyBtn.className = 'btn btn-md btn-cta';
    readyBtn.removeAttribute('aria-label');
    readyBtn.addEventListener('click', handleReset, { once: true });
    const accessibilityCheckbox = document.getElementById('sr-timer-toggle');
    if (accessibilityCheckbox) {
      accessibilityCheckbox.parentElement.style.display = '';
    }
    announce('Time has run out! Would you like to try again?');
    readyBtn.focus();
  }

  function quizWon() {
    clearInterval(timerInterval);
    quizRunning = false;
    const state = getDailyState();
    state.correct++;
    saveDailyState(state);
    announce('All correct! Well done!');
    showShare();
  }

  function showShare() {
    readyBtn.disabled = false;
    readyBtn.textContent = 'Share!';
    readyBtn.className = 'btn btn-md btn-primary';
    readyBtn.removeAttribute('aria-label');
    readyBtn.addEventListener('click', shareResult);
    readyBtn.focus();
  }

  function shareResult() {
    const text = 'I just aced the Design Roles IQ quiz at The Green Tape Measure! #InteriorDesign #GTM';
    if (navigator.share) {
      navigator.share({ title: 'The Green Tape Measure', text, url: window.location.href }).catch(() => { });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + window.location.href)}`,
        '_blank', 'noopener,noreferrer'
      );
    }
  }

  function showExhausted() {
    readyBtn.textContent = 'Come back tomorrow!';
    readyBtn.disabled = true;
    readyBtn.className = 'btn btn-md btn-secondary opacity-50 cursor-not-allowed';
    readyBtn.removeAttribute('aria-label');
  }

  function handleReset() {
    clearInterval(timerInterval);
    resetQuiz();
    const state = getDailyState();
    if (state.correct >= 1 || state.incorrect >= 5) {
      showExhausted();
      return;
    }
    startQuiz();
  }

  /* ── reset ── */

  function resetQuiz() {
    getDropzoneCards().forEach(clearDropzoneCard);

    getDraggables().forEach(btn => {
      btn.disabled = false;
      delete btn.dataset.correct;
      delete btn.dataset.placedIn;
      btn.classList.remove('opacity-30', 'opacity-50', 'invisible');
      btn.querySelector('svg').classList.replace('text-neutral-two-dark', 'text-neutral-nine');
      btn.setAttribute('draggable', 'true');
      btn.setAttribute('aria-pressed', 'false');
    });

    activeDraggable = null;

    shuffleChildren(draggablesEl, '.btn-draggable');
    shuffleDropzones();
  }

  function clearDropzoneCard(card) {
    const dropzoneBtn = card.querySelector('.btn-dropzone');

    if (dropzoneBtn.dataset.placedValue) {
      const draggable = getDraggables().find(d => getDraggableValue(d) === dropzoneBtn.dataset.placedValue);
      if (draggable) draggable.classList.remove('invisible');
    }

    dropzoneBtn.className = 'btn btn-lg btn-dropzone';
    dropzoneBtn.textContent = 'place job title here';
    dropzoneBtn.dataset.placedValue = '';
    dropzoneBtn.disabled = false;
    dropzoneBtn.removeAttribute('draggable');

    const def = getDefinitionText(card);
    dropzoneBtn.setAttribute('aria-label', `Empty drop zone: ${def}`);

    delete card.dataset.correct;

    const statusDiv = card.querySelector('.quiz-status');
    statusDiv.classList.add('hidden');
    statusDiv.classList.remove('flex');
    statusDiv.querySelectorAll(':scope > div').forEach(d => d.classList.remove('hidden'));
  }

  /* ── shuffle helpers ── */

  function fisherYates(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shuffleChildren(container, selector) {
    const rows = Array.from(container.querySelectorAll(':scope > div'));
    const items = fisherYates(rows.flatMap(r => Array.from(r.querySelectorAll(selector))));
    const per = Math.ceil(items.length / rows.length);
    rows.forEach((row, ri) => {
      for (let ci = 0; ci < per; ci++) {
        const item = items[ri * per + ci];
        if (item) row.appendChild(item);
      }
    });
  }

  function shuffleDropzones() {
    const cards = getDropzoneCards();
    const cardRows = [...new Set(cards.map(c => c.parentElement))];
    const shuffled = fisherYates([...cards]);
    const per = Math.ceil(shuffled.length / cardRows.length);
    cardRows.forEach((row, ri) => {
      for (let ci = 0; ci < per; ci++) {
        const card = shuffled[ri * per + ci];
        if (card) row.appendChild(card);
      }
    });
  }

  /* ── focus management ── */

  function focusNextDraggable() {
    const next = getDraggables().find(btn => !btn.disabled && btn.dataset.correct !== 'true');
    if (next) next.focus();
  }

  /* ── shared drag helpers ── */

  function handleDragEnd() {
    if (draggingBtn) {
      draggingBtn.classList.remove('ring-2', 'ring-primary-one');
      if (!draggingBtn.dataset.placedIn && draggingBtn.dataset.correct !== 'true') {
        draggingBtn.classList.remove('invisible');
      }
      draggingBtn = null;
    }
  }

  /* ── drag & click — draggables ── */

  function setupDraggables() {
    draggablesEl.addEventListener('click', (e) => {
      if (!quizRunning) return;
      const btn = e.target.closest('.btn-draggable');
      if (!btn || btn.disabled) return;

      if (activeDraggable === btn) {
        announce(`${getDraggableValue(btn)} put down.`);
        deselectDraggable();
        return;
      }

      if (btn.dataset.placedIn) {
        const card = dropzonesEl.querySelector(`[data-answer="${btn.dataset.placedIn}"]`);
        if (card) clearDropzoneCard(card);
      }

      selectDraggable(btn);
    });

    draggablesEl.addEventListener('dragstart', (e) => {
      if (!quizRunning) return;
      const btn = e.target.closest('.btn-draggable');
      if (!btn || btn.disabled) { e.preventDefault(); return; }

      if (btn.dataset.placedIn) {
        const card = dropzonesEl.querySelector(`[data-answer="${btn.dataset.placedIn}"]`);
        if (card) clearDropzoneCard(card);
      }

      e.dataTransfer.setData('text/plain', getDraggableValue(btn));
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setDragImage(btn, btn.offsetWidth / 2, btn.offsetHeight / 2);
      draggingBtn = btn;
      selectDraggable(btn);
      requestAnimationFrame(() => { if (draggingBtn) draggingBtn.classList.add('invisible'); });
    });

    draggablesEl.addEventListener('dragend', handleDragEnd);
  }

  /* ── drag & click — dropzones ── */

  function setupDropzones() {
    dropzonesEl.addEventListener('click', (e) => {
      if (!quizRunning) return;
      const btn = e.target.closest('.btn-dropzone');
      if (!btn || btn.disabled) return;
      const card = btn.closest('[data-answer]');
      if (!card || card.dataset.correct === 'true') return;

      if (!activeDraggable) {
        if (btn.dataset.placedValue) {
          const draggable = getDraggables().find(d => getDraggableValue(d) === btn.dataset.placedValue);
          clearDropzoneCard(card);
          if (draggable) selectDraggable(draggable);
        }
        return;
      }

      if (btn.dataset.placedValue) {
        const prev = getDraggables().find(d => getDraggableValue(d) === btn.dataset.placedValue);
        if (prev) { delete prev.dataset.placedIn; prev.classList.remove('invisible'); }
      }

      placeDraggable(activeDraggable, card);
      deselectDraggable();
    });

    dropzonesEl.addEventListener('dragstart', (e) => {
      if (!quizRunning) return;
      const btn = e.target.closest('.btn-dropzone');
      if (!btn || !btn.dataset.placedValue) return;
      const card = btn.closest('[data-answer]');
      if (!card || card.dataset.correct === 'true') return;

      const draggable = getDraggables().find(d => getDraggableValue(d) === btn.dataset.placedValue);
      if (!draggable) return;

      clearDropzoneCard(card);
      e.dataTransfer.setData('text/plain', getDraggableValue(draggable));
      e.dataTransfer.effectAllowed = 'move';
      draggingBtn = draggable;
      selectDraggable(draggable);
      requestAnimationFrame(() => { if (draggingBtn) draggingBtn.classList.add('invisible'); });
    });

    dropzonesEl.addEventListener('dragend', handleDragEnd);

    dropzonesEl.addEventListener('dragover', (e) => {
      const card = e.target.closest('[data-answer]');
      if (!card || card.dataset.correct === 'true' || !quizRunning) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('ring-2', 'ring-primary-one');
    });

    dropzonesEl.addEventListener('dragleave', (e) => {
      const card = e.target.closest('[data-answer]');
      if (card && !card.contains(e.relatedTarget)) card.classList.remove('ring-2', 'ring-primary-one');
    });

    dropzonesEl.addEventListener('drop', (e) => {
      if (!quizRunning) return;
      const card = e.target.closest('[data-answer]');
      if (!card || card.dataset.correct === 'true') return;
      e.preventDefault();
      card.classList.remove('ring-2', 'ring-primary-one');

      const occupantValue = card.querySelector('.btn-dropzone').dataset.placedValue;
      if (occupantValue) {
        const prev = getDraggables().find(d => getDraggableValue(d) === occupantValue);
        if (prev) { delete prev.dataset.placedIn; prev.classList.remove('invisible'); }
      }

      if (activeDraggable) {
        placeDraggable(activeDraggable, card);
        deselectDraggable();
      }
    });
  }

  /* ── selection ── */

  function selectDraggable(btn) {
    if (activeDraggable && activeDraggable !== btn) deselectDraggable();
    activeDraggable = btn;
    btn.classList.add('ring-2', 'ring-primary-one');
    btn.setAttribute('aria-pressed', 'true');
    announce(`${getDraggableValue(btn)} picked up. Tab to a definition box and press Enter or Space to place it. Press Escape to put it back.`);
  }

  function deselectDraggable() {
    if (!activeDraggable) return;
    activeDraggable.classList.remove('ring-2', 'ring-primary-one');
    activeDraggable.setAttribute('aria-pressed', 'false');
    activeDraggable = null;
  }

  /* ── placement ── */

  function placeDraggable(draggableBtn, dropzoneCard) {
    const value = getDraggableValue(draggableBtn);
    const answer = dropzoneCard.dataset.answer;
    const isCorrect = value === answer;
    const dropzoneBtn = dropzoneCard.querySelector('.btn-dropzone');
    const def = getDefinitionText(dropzoneCard);

    // Render the draggable's appearance inside the dropzone button
    const colorClass = isCorrect ? 'bg-primary-two' : 'bg-secondary-five';
    dropzoneBtn.className = `btn btn-lg btn-dropzone btn-dropzone--placed ${colorClass}`;
    dropzoneBtn.querySelector('svg').classList.replace('text-neutral-nine', 'text-neutral-two-dark');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = draggableBtn.innerHTML;
    tempDiv.querySelector('[id]')?.removeAttribute('id');
    dropzoneBtn.innerHTML = tempDiv.innerHTML;
    dropzoneBtn.dataset.placedValue = value;
    dropzoneBtn.setAttribute('aria-label', `${isCorrect ? 'Correct' : 'Incorrect'}: ${value} placed in "${def}"`);

    if (isCorrect) dropzoneCard.dataset.correct = 'true';

    const statusDiv = dropzoneCard.querySelector('.quiz-status');
    const [correctEl, incorrectEl] = statusDiv.querySelectorAll(':scope > div');
    statusDiv.classList.remove('hidden');
    statusDiv.classList.add('flex');
    if (isCorrect) {
      incorrectEl.classList.add('hidden');
    } else {
      correctEl.classList.add('hidden');
    }

    // Hide draggable in its source container — it is now visible in the dropzone
    draggableBtn.classList.add('invisible');

    if (isCorrect) {
      draggableBtn.disabled = true;
      draggableBtn.dataset.correct = 'true';
      draggableBtn.setAttribute('draggable', 'false');
      delete draggableBtn.dataset.placedIn;
      dropzoneBtn.disabled = true;
      announce(`Correct! ${value} matches "${def}".`);
    } else {
      draggableBtn.dataset.placedIn = answer;
      dropzoneBtn.setAttribute('draggable', 'true');
      announce(`Incorrect. ${value} does not match "${def}". You can pick it up again to try another box.`);
    }

    if (getDropzoneCards().every(c => c.dataset.correct === 'true')) {
      quizWon();
    } else if (isCorrect) {
      focusNextDraggable();
    }
  }

}
