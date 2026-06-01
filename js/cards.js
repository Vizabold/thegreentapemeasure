const liveRegion = document.getElementById('live-region');
const advocacyCards = document.getElementById('advocacy-cards');
const researchCards = document.getElementById('research-cards');
const advocacyBtns = advocacyCards.previousElementSibling;
const researchBtns = researchCards.previousElementSibling;

function setupSlider(container) {
    const prevBtn = container.firstElementChild;
    const nextBtn = container.lastElementChild;
    const cardContainer = container.nextElementSibling;
    const cards = Array.from(cardContainer.querySelectorAll('.card'));
    let current = 0;
    let isAnimating = false;

    cards[current].classList.add('card-current');
    cards[current].setAttribute('aria-current', 'true');

    if (!cardContainer.hasAttribute('tabindex')) {
        cardContainer.setAttribute('tabindex', '0');
    }

    function goToCard(index) {
        isAnimating = true;
        cards[current].classList.remove('card-current');
        cards[current].removeAttribute('tabindex');
        cards[current].removeAttribute('aria-current');

        setTimeout(() => {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            })
            cards[index].classList.add('card-current');
            cards[index].setAttribute('aria-current', 'true');
            cards[index].setAttribute('tabindex', '-1');
            cards[index].focus();
            if (liveRegion) {
                liveRegion.textContent = `Item ${index + 1} of ${cards.length}`;
            }
            current = index;
            isAnimating = false;
        }, 301)
    }

    cardContainer.addEventListener('keydown', (e) => {
        if (isAnimating) return;
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

    cardContainer.addEventListener('click', (e) => {
        if (isAnimating) return;
        const targetEl = e.target.closest('button, a');
        if (!targetEl) return;

        const card = targetEl.closest('.card');
        if (!card) return;

        const cardIndex = cards.indexOf(card);
        if (cardIndex !== -1) {
            goToCard(cardIndex);
        }
    })

    prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        let prev = current === 0 ? cards.length - 1 : current - 1;
        goToCard(prev);
    })

    nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        let next = current === cards.length - 1 ? 0 : current + 1;
        goToCard(next);
    })
}

setupSlider(advocacyBtns);
setupSlider(researchBtns);

function checkScroll() {
    const advocacyScroll = advocacyCards.scrollWidth > advocacyCards.clientWidth;
    const researchScroll = researchCards.scrollWidth > researchCards.clientWidth;
    advocacyBtns.classList.toggle('hidden', !advocacyScroll);
    researchBtns.classList.toggle('hidden', !researchScroll);
}

window.addEventListener('resize', checkScroll);
checkScroll();