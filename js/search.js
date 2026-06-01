/*--------------- CONTENT INDEX --------------------- */
const index = Array.from(document.querySelectorAll('section[id]')).map(section => ({
  id: section.id,
  title: section.querySelector('h2, h3')?.textContent.trim() ?? section.id,
  text: section.textContent.replace(/\s+/g, ' ').trim(),
  element: section,
}));

/*--------------- HELPERS --------------------- */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSnippet(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, 100) + '…';
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 80);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ') + (end < text.length ? '…' : '');
}

function highlight(text, query) {
  return text.replace(new RegExp(`(${escapeRegex(query)})`, 'gi'), '<mark>$1</mark>');
}

function buildResults(query) {
  const q = query.trim();
  if (!q) return [];
  return index.filter(({ text }) => text.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
}

function renderItems(results, query, container, onSelect) {
  container.innerHTML = '';
  if (!results.length) {
    const li = document.createElement('li');
    li.className = 'search-no-results';
    li.textContent = 'No results found.';
    container.append(li);
    return;
  }
  results.forEach(result => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '-1');
    li.className = 'search-result';
    li.innerHTML = `<p class="search-result-title">${highlight(result.title, query)}</p><p class="search-result-snippet">${highlight(getSnippet(result.text, query), query)}</p>`;
    li.addEventListener('click', () => onSelect(result));
    container.append(li);
  });
}

function handleKeys(e, container, input, onClose) {
  const items = [...container.querySelectorAll('[role="option"]')];
  const idx = items.indexOf(document.activeElement);
  switch (e.key) {
    case 'Escape':
      onClose();
      input.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      (items[idx + 1] ?? items[0])?.focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      idx <= 0 ? input.focus() : items[idx - 1].focus();
      break;
    case 'Enter':
      if (document.activeElement !== input) { e.preventDefault(); document.activeElement.click(); }
      break;
  }
}

/*--------------- DESKTOP --------------------- */
const desktopForm = document.getElementById('search').closest('form');
const desktopInput = document.getElementById('search');
const desktopList = document.querySelector('search-dropdown');

function closeDesktop() {
  desktopList.classList.remove('is-open');
  desktopInput.setAttribute('aria-expanded', 'false');
}

desktopForm.addEventListener('submit', e => {
  e.preventDefault();
  desktopList.querySelector('[role="option"]')?.click();
});

desktopInput.addEventListener('input', () => {
  const q = desktopInput.value;
  if (!q.trim()) { closeDesktop(); return; }
  renderItems(buildResults(q), q, desktopList, result => {
    result.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    desktopInput.value = '';
    closeDesktop();
  });
  desktopList.classList.add('is-open');
  desktopInput.setAttribute('aria-expanded', 'true');
});

desktopInput.addEventListener('keydown', e => handleKeys(e, desktopList, desktopInput, closeDesktop));
desktopList.addEventListener('keydown', e => handleKeys(e, desktopList, desktopInput, closeDesktop));

document.addEventListener('click', e => {
  if (!desktopForm.contains(e.target)) closeDesktop();
});

/*--------------- MOBILE --------------------- */
const searchOverlay = document.getElementById('search-overlay');
const mobileOpenBtn = document.getElementById('search-open');
const mobileCloseBtn = document.getElementById('search-close');
const mobileInput = document.getElementById('search-mobile');
const mobileList = document.getElementById('search-results-mobile');

/*
function openOverlay() {
  searchOverlay.classList.add('is-open');
  searchOverlay.setAttribute('aria-hidden', 'false');
  mobileInput.focus();
}
  */

function closeOverlay() {
  /*
  searchOverlay.classList.remove('is-open');
  searchOverlay.setAttribute('aria-hidden', 'true');
  mobileOpenBtn.focus();
  */
  mobileInput.value = '';
  mobileList.innerHTML = '';
}

mobileOpenBtn.addEventListener('click', openOverlay);
mobileCloseBtn.addEventListener('click', closeOverlay);

mobileInput.addEventListener('input', () => {
  const q = mobileInput.value;
  if (!q.trim()) { mobileList.innerHTML = ''; return; }
  renderItems(buildResults(q), q, mobileList, result => {
    closeOverlay();
    setTimeout(() => result.element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  });
});

mobileInput.addEventListener('keydown', e => handleKeys(e, mobileList, mobileInput, closeOverlay));
mobileList.addEventListener('keydown', e => handleKeys(e, mobileList, mobileInput, closeOverlay));

/*
searchOverlay.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeOverlay(); return; }
  if (e.key !== 'Tab') return;
  const focusable = [...searchOverlay.querySelectorAll('input, button')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
*/
