const liveRegion = document.getElementById('live-region');
const advocacySection = document.getElementById('advocacy');
const researchSection = document.getElementById('research');
const advocacyCardsContainer = document.getElementById('advocacy-cards');
const researchCardsContainer = document.getElementById('research-cards');
const advocacyBtns = document.getElementById('advocacy-btns');
const researchBtns = document.getElementById('research-btns');

function setupCards(section) {
    if (!section) return;

    const prevBtn = section.querySelector('.cards-prev-btn');
    const nextBtn = section.querySelector('.cards-next-btn');
    const container = section.querySelector('.cards-container');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.card'));
    if (cards.length === 0) return;

    let current = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCard(index, shouldFocus = true) {
        if (index < 0 || index >= cards.length) return;

        cards[current].removeAttribute('aria-current');
        cards[current].setAttribute('tabindex', '-1');
        cards[current].classList.remove('card-current');

        cards[index].setAttribute('aria-current', 'true');
        cards[index].setAttribute('tabindex', '0');
        cards[index].classList.add('card-current');

        if (shouldFocus) {
            cards[index].focus({ preventScroll: true });
        }

        if (liveRegion) {
            liveRegion.textContent = `Item ${index + 1} of ${cards.length}`;
        }

        current = index;
    }

    function goToCard(index, shouldFocus = true) {
        if (index === current) return;
        isAnimating = true;

        updateCard(index, shouldFocus);

        const card = cards[index];

        /*
        const containerWidth = container.clientWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.clientWidth;
        const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        */
        const targetScrollLeft = card.offsetLeft;

        container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });

        setTimeout(() => { isAnimating = false; }, 501)
    }

    container.addEventListener('focusin', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        const cardIndex = cards.indexOf(card);
        if (cardIndex !== -1 && cardIndex !== current) {
            updateCard(cardIndex, false);
        }
    });

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (isAnimating) return;

        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        const swipeThreshold = 50;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                let next = current === cards.length - 1 ? current : current + 1;
                goToCard(next, false);
            } else {
                let prev = current === 0 ? current : current - 1;
                goToCard(prev, false);
            }
        }
    }, { passive: true });

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating) return;
            let prev = current === 0 ? cards.length - 1 : current - 1;
            goToCard(prev, false);
        })
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating) return;
            if (isAnimating === true) return;
            let next = current === cards.length - 1 ? 0 : current + 1;
            goToCard(next, false);
        })
    }

    container.addEventListener('keydown', (e) => {
        if (isAnimating === true) return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            let prev = current === 0 ? cards.length - 1 : current - 1;
            goToCard(prev, true);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            let next = current === cards.length - 1 ? 0 : current + 1;
            goToCard(next, true);
        }
    });

    container.addEventListener('click', (e) => {
        if (isAnimating) return;
        const targetEl = e.target.closest('button, a');
        if (!targetEl) return;
        const card = targetEl.closest('.card');
        if (!card) return;
        const cardIndex = cards.indexOf(card);
        if (cardIndex !== -1) {
            if (cardIndex === current) return;
            e.preventDefault();
            goToCard(cardIndex, true);
        }
    })

    cards[current].setAttribute('aria-current', 'true');
    cards[current].setAttribute('tabindex', '0');
    cards[current].classList.add('card-current');
}

function checkScroll() {
    if (!advocacyCardsContainer || !researchCardsContainer || !advocacyBtns || !researchBtns) return;

    const advocacyScroll = advocacyCardsContainer.scrollWidth > advocacyCardsContainer.clientWidth;
    const researchScroll = researchCardsContainer.scrollWidth > researchCardsContainer.clientWidth;
    advocacyBtns.classList.toggle('hidden', !advocacyScroll);
    researchBtns.classList.toggle('hidden', !researchScroll);
}

window.addEventListener('resize', checkScroll);
checkScroll();
setupCards(advocacySection);
setupCards(researchSection);