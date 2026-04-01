document.addEventListener("DOMContentLoaded", () => {

    /*----------------------- Skip to main content link -------------------*/
    const skipLink = document.querySelector('a[href="#main-content"]');
    const mainContent = document.getElementById('main-content');

    if (skipLink && mainContent) {
        skipLink.addEventListener('click', (e) => {
            setTimeout(() => {
                const previousTabIndex = mainContent.getAttribute('tabindex');
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus({ preventScroll: true });

                if (previousTabIndex === null) {
                    mainContent.addEventListener('blur', () => {
                        mainContent.removeAttribute('tabindex');
                    }, { once: true });
                }
            }, 0);
        });
    }

    skipLink.addEventListener('keydown', (e) => {
        e.preventDefault;
        if (e.key === 'Enter' || e.key === ' ') {
            mainContent.focus();
        }
    })

    /*--------------------------FOOTER-----------------------------*/
    const footer = document.querySelector('footer');
    const footerText = document.querySelector('.footer-text');

    // Set the year dynamically 
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = `&copy; ${currentYear} The Green Tape Measure.`;

    // Footer popups
    const noticeContainers = document.querySelectorAll('.container-notices');
    const disclaimerContent = document.querySelector('.disclaimer-content');
    const privacyContent = document.querySelector('.privacy-content');

    noticeContainers.forEach(container => {
        const privacyBtn = container.firstElementChild;
        const disclaimerBtn = container.lastElementChild;

        privacyBtn.addEventListener('click', () => {
            triggeringElement = privacyBtn;
            popupContent.innerHTML = privacyContent.innerHTML;
            const title = 'Privacy Statement';
            openPopup(title);
        })
        disclaimerBtn.addEventListener('click', () => {
            triggeringElement = disclaimerBtn;
            popupContent.innerHTML = disclaimerContent.innerHTML;
            const title = 'Terms of Use / Disclaimer';
            openPopup(title);
        })

    })

    /* -------------------- Light / Dark Mode Toggle --------------------- */

    const toggleBg = document.getElementById('toggle-switch');
    const slider = document.querySelector('.slider');
    const body = document.body;
    const lightPref = window.matchMedia("(prefers-color-scheme: light)");
    const scribBg = document.querySelector('.scrib-shadow');
    let currentTheme = document.documentElement.getAttribute('data-theme');

    function toggleTheme() {
        if (body.classList.contains('light')) {
            document.documentElement.setAttribute('data-theme', 'light');
            currentTheme = 'light';
            scribBg.style.opacity = '.7';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            currentTheme = 'dark';
            scribBg.style.opacity = '.15';
        }
    }

    // Update toggle and theme to match user's browser preferences
    function updateToggle() {
        if (lightPref.matches) {
            slider.classList.add('light-mode-slider');
            slider.firstElementChild.classList.replace('fa-moon', 'fa-sun');
            toggleBg.setAttribute('aria-label', 'light mode on');
            body.classList.add('light');
            document.documentElement.classList.add('light');
        } else {
            slider.classList.remove('light-mode-slider');
            slider.firstElementChild.classList.replace('fa-sun', 'fa-moon');
            toggleBg.setAttribute('aria-label', 'dark mode on');
            body.classList.remove('light');
            document.documentElement.classList.remove('light');
        }
    }

    updateToggle();
    toggleTheme();

    toggleBg.addEventListener('click', () => {
        slider.classList.toggle('light-mode-slider');
        body.classList.toggle('light');
        document.documentElement.classList.toggle('light');
        if (body.classList.contains('light')) {
            slider.firstElementChild.classList.replace('fa-moon', 'fa-sun');
            toggleBg.setAttribute('aria-label', 'light mode on');
        } else {
            slider.firstElementChild.classList.replace('fa-sun', 'fa-moon');
            toggleBg.setAttribute('aria-label', 'dark mode on');
        }
        toggleTheme();
    })

    lightPref.addEventListener('change', () => {
        updateToggle();
        toggleTheme();
    });

    /*------------------------POPUPS--------------------------------*/

    // Popup variables
    const popupOverlay = document.querySelector('.popup-overlay');
    const popup = document.getElementById('popup-main');
    const popupContent = document.querySelector('.popup-content');
    const popupTitle = document.getElementById('popup-title');
    const closeBtn = document.getElementById('close-popup');
    const controller = new AbortController();
    const signal = controller.signal;
    let triggeringElement;

    // Open popup
    function openPopup(title) {
        popupOverlay.classList.add('unhide');
        setTimeout(() => {
            void popupOverlay.offsetHeight;
            popupOverlay.style.opacity = '1';
        }, 1)
        document.documentElement.classList.add('modal-open');
        popup.classList.remove('hide-popup');
        popup.classList.add('show-popup');
        if (triggeringElement) {
            triggeringElement.setAttribute('aria-expanded', 'true');
        }
        popupTitle.innerHTML = title;
        trapFocus();
    }

    function trapFocus() {
        function getFocusableElements() {
            const nodes = popup.querySelectorAll('a[href], button, input, textarea, select, [tabindex]');
            return Array.from(nodes).filter(node => {
                const isDisabled = node.disabled || node.getAttribute('aria-disabled') === 'true';
                const isFocusable = node.tabIndex >= 0;
                const isVisible = !!(node.offsetParent || node.getClientRects().length);
                return !isDisabled && isFocusable && isVisible;
            });
        }

        let focusableElements = getFocusableElements();
        let firstFocusable = focusableElements[0];
        let lastFocusable = focusableElements[focusableElements.length - 1];

        function handleKeyDown(e) {
            if (e.key === 'Tab') { // Shift + Tab
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') {
                closePopup();
            }
        }

        function handleFocusIn(e) {
            if (!popup.contains(e.target) && firstFocusable) {
                firstFocusable.focus();
            }
        }

        function updateFocusableElements() {
            focusableElements = getFocusableElements();
            firstFocusable = focusableElements[0];
            lastFocusable = focusableElements[focusableElements.length - 1];
        }

        const observer = new MutationObserver(() => {
            updateFocusableElements();
        });

        observer.observe(popup, { childList: true, subtree: true, attributes: true });

        const visibilityObserver = new MutationObserver(() => {
            updateFocusableElements();
        });

        visibilityObserver.observe(popup, {
            attributes: true,
            attributeFilter: ['style', 'class', 'aria-expanded']
        });

        function closePopup() {
            controller.abort();
            popup.classList.remove('show-popup');
            popup.classList.add('hide-popup');
            document.documentElement.classList.remove('modal-open');
            popup.addEventListener('animationend', () => {
                popupOverlay.classList.remove('unhide');
                popupContent.scrollTop = 0;
                setTimeout(() => {
                    void popupOverlay.offsetHeight;
                    popupOverlay.style.opacity = '0';
                }, 1)
            }, { once: true })
            // return focus to trigger element
            if (triggeringElement) {
                triggeringElement.focus();
                triggeringElement.setAttribute('aria-expanded', 'false');
            }
            observer.disconnect();
            visibilityObserver.disconnect();
        }

        document.addEventListener('keydown', handleKeyDown, { signal });
        document.addEventListener('focusin', handleFocusIn, true, { signal });
        closeBtn.addEventListener('click', closePopup, { once: true })
    }

})