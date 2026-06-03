const liveRegion = document.getElementById('live-region');
const advocacySection = document.getElementById('advocacy');
const researchSection = document.getElementById('research');
const advocacyCardsContainer = document.getElementById('advocacy-cards');
const researchCardsContainer = document.getElementById('research-cards');
const advocacyBtns = document.getElementById('advocacy-btns');
const researchBtns = document.getElementById('research-btns');

function setupCards(section) {
    const prevBtn = section.querySelector('.cards-prev-btn');
    const nextBtn = section.querySelector('.cards-next-btn');
    const container = section.querySelector('.cards-container');
    const cards = Array.from(container.querySelectorAll('.card'));
    let current = 0;
    let isAnimating = false;

    function updateCard(index) {
        if (index < 0 || index >= cards.length) return;

        cards[current].removeAttribute('aria-current');
        cards[current].setAttribute('tabindex', '-1');
        cards[current].classList.remove('card-current');

        cards[index].setAttribute('aria-current', 'true');
        cards[index].setAttribute('tabindex', '0');
        cards[index].classList.add('card-current');
        cards[index].focus({ preventScroll: true });

        if (liveRegion) {
            liveRegion.textContent = `Item ${index + 1} of ${cards.length}`;
        }

        current = index;
    }

    function goToCard(index) {
        isAnimating = true;

        if (index === current) return;

        updateCard(index);

        const containerRect = container.getBoundingClientRect();
        const cardRect = cards[index].getBoundingClientRect();

        const isFullyVisible = (
            cardRect.left >= containerRect.left &&
            cardRect.right <= containerRect.right
        );

        if (!isFullyVisible) {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        setTimeout(() => { isAnimating = false; }, 501)
    }

    prevBtn.addEventListener('click', () => {
        if (isAnimating = true) return;
        let prev = current === 0 ? cards.length - 1 : current - 1;
        goToCard(prev);
    })

    nextBtn.addEventListener('click', () => {
        if (isAnimating = true) return;
        let next = current === cards.length - 1 ? 0 : current + 1;
        goToCard(next);
    })

    container.addEventListener('keydown', (e) => {
        if (isAnimating = true) return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            let prev = current === 0 ? cards.length - 1 : current - 1;
            goToCard(prev);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            let next = current === cards.length - 1 ? 0 : current + 1;
            goToCard(next);
        }
    });

    container.addEventListener('click', (e) => {
        if (isAnimating = true) return;
        const targetEl = e.target.closest('button, a');
        if (!targetEl) return;

        const card = targetEl.closest('.card');
        if (!card) return;

        const cardIndex = cards.indexOf(card);
        if (cardIndex !== -1) {
            goToCard(cardIndex);
        }
    })

    cards[current].setAttribute('aria-current', 'true');
    cards[current].setAttribute('tabindex', '0');
    cards[current].classList.add('card-current');
}

setupCards(advocacySection);
setupCards(researchSection);

function checkScroll() {
    const advocacyScroll = advocacyCardsContainer.scrollWidth > advocacyCardsContainer.clientWidth;
    const researchScroll = researchCardsContainer.scrollWidth > researchCardsContainer.clientWidth;
    advocacyBtns.classList.toggle('hidden', !advocacyScroll);
    researchBtns.classList.toggle('hidden', !researchScroll);
}

window.addEventListener('resize', checkScroll);
checkScroll();