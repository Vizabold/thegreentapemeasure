document.addEventListener("DOMContentLoaded", () => {

    /*--------------------------FOOTER-----------------------------*/

    const mqPortrait = window.matchMedia("(max-width: 1250px) and (orientation: portrait)");
    const mqLandscape = window.matchMedia("(max-width: 1250px) and (orientation: landscape)");

    const footer = document.querySelector('footer');
    const footerText = document.querySelector('.footer-text');
    const html = document.documentElement;
    const bottomOffset = 50;

    if (!footer || !footerText) return;

    // Set the year dynamically 
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = `&copy; ${currentYear} The Green Tape Measure.`;

    const updateFooter = () => {
        // Calculate current page height
        let pageHeight = Math.max(
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        )

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const viewportHeight = window.innerHeight;
        const distanceToBottom = pageHeight - (scrollTop + viewportHeight);

        const socialContainer = document.querySelector('.social-media');
        const disclaimers = socialContainer.querySelector('.disclaimer-btns');
        if (mqPortrait.matches || mqLandscape.matches) {
            disclaimers.classList.add('hide');
            disclaimers.style.pointerEvents = 'none';
        } else {
            disclaimers.classList.remove('hide');
            disclaimers.style.pointerEvents = 'auto';
        }

        if (distanceToBottom <= bottomOffset) {
            footer.classList.add('footer-bottom');
            footerText.classList.add('unhide');
            if (mqPortrait.matches || mqLandscape.matches) {
                disclaimers.classList.add('unhide');
                disclaimers.style.pointerEvents = 'auto';
            }
        }
        else {
            footer.classList.remove('footer-bottom');
            footerText.classList.remove('unhide');
            if (mqPortrait.matches || mqLandscape.matches) {
                disclaimers.classList.remove('unhide');
                disclaimers.style.pointerEvents = 'none';
            }
        }

    }

    // Inital check upon page load
    updateFooter();

    // Update on scroll
    window.addEventListener('scroll', updateFooter);

    // Update pageHeight when window is resized
    window.addEventListener('resize', () => {
        pageHeight = Math.max(
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        updateFooter();
    })

    // Footer disclaimers popups
    const disclaimerBtn = document.querySelectorAll('.disclaimer');
    const disclaimerContent = document.querySelector('.disclaimer-content');
    const privacyBtn = document.querySelectorAll('.privacy');
    const privacyContent = document.querySelector('.privacy-content');

    disclaimerBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            triggeringElement = btn;
            popupContent.innerHTML = disclaimerContent.innerHTML;
            const title = 'Terms of Use / Disclaimer';
            const subtitle = '';
            openPopup(title, subtitle);
            const container = btn.parentElement;
            const parent = container.parentElement;
            if (parent.classList.contains('nav-mobile')) {
                closeMobileNav();
            }
        })
    })

    privacyBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            triggeringElement = btn;
            popupContent.innerHTML = privacyContent.innerHTML;
            const title = 'Privacy Statement';
            const subtitle = '';
            openPopup(title, subtitle);
            const container = btn.parentElement;
            const parent = container.parentElement;
            if (parent.classList.contains('nav-mobile')) {
                closeMobileNav();
            }
        })
    })

    // Temp popups for social media
    const socialMedia = footer.querySelector('.social-media-btns');
    const socialBtns = socialMedia.querySelectorAll('button');
    const socialMediaContent = document.querySelector('.social-media-content');

    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            triggeringElement = btn;
            popupContent.innerHTML = socialMediaContent.innerHTML;
            const title = 'Coming soon!';
            const subtitle = '';
            openPopup(title, subtitle);
        })
    })


    /*------------------------MOBILE NAVIGATION-----------------------------*/

    const mobileBtn = document.querySelector('.btn-nav-mobile');
    const mobileNav = document.getElementById('nav-mobile');
    const mobileClose = document.querySelector('.btn-close-mobile');

    function closeMobileNav() {
        mobileNav.classList.remove('nav-mobile-appear');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        document.documentElement.classList.remove('modal-open');
    }

    mobileBtn.addEventListener('click', () => {
        mobileNav.style.display = 'flex';
        setTimeout(() => {
            void mobileNav.offsetHeight;
            mobileNav.classList.add('nav-mobile-appear');
        }, 1)
        mobileNav.hidden = false;
        mobileBtn.setAttribute('aria-expanded', 'true');
        document.documentElement.classList.add('modal-open');

        mobileClose.addEventListener('click', () => {
            closeMobileNav();
        }, { once: true });
    })


    /*------------------------NAVIGATION & SCROLLING FUNCTIONS-----------------------------*/

    const navBtns = document.querySelectorAll('.btn-nav');
    const sections = document.querySelectorAll('section');
    const subnav = document.getElementById('subnav');
    const subnavMobile = document.querySelector('.subnav-mobile');
    const subnavLinks = subnav.querySelectorAll('a');
    const subnavMobileLinks = subnavMobile.querySelectorAll('a');
    const learnBtn = document.querySelector('.btn-nav-learn');
    const learnBtnMobile = document.querySelector('.btn-nav-learn-mobile');

    // Clear all active nav classes
    function clearNavClasses() {
        navBtns.forEach(btn => {
            if (!btn.classList.contains('btn-nav-learn') || !btn.classList.contains('btn-nav-learn-mobile')) {
                btn.classList.remove('btn-nav-active-green', 'btn-nav-active-orange');
            }
        });
    }

    // Open desktop subnav
    function toggleSubnav() {
        if (subnav.classList.contains('subnav-open')) {
            closeSubnav();
        }
        else {
            learnBtn.classList.add('btn-nav-active-green');
            subnav.classList.add('subnav-open');
            subnav.hidden = false;
            learnBtn.setAttribute('aria-expanded', 'true');
            subnavLinks.forEach(link => link.setAttribute('tabindex', '0'));
            subnav.firstElementChild.focus();
        }
    }

    // Close desktop subnav
    function closeSubnav() {
        subnav.classList.remove('subnav-open');
        subnav.hidden = true;
        learnBtn.setAttribute('aria-expanded', 'false');
        learnBtn.classList.remove('btn-nav-active-green');
        subnavLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Fade in section on first visibility
                entry.target.style.opacity = '1';

                // Clear active button classes for all buttons except the learn button (this is handled under the subnav toggle function)
                clearNavClasses();

                // Set the active class for the corresponding button
                if (entry.target.id === 'about') {
                    const aboutBtn = document.querySelector('.btn-nav-about');
                    const aboutBtnMobile = document.querySelector('.btn-nav-about-mobile');
                    aboutBtn.classList.add('btn-nav-active-green');
                    aboutBtnMobile.classList.add('btn-nav-active-green');
                    closeSubnav();
                    const fadeInSequence = [
                        'about-title',
                        'about-content',
                        'slogan-part-1',
                        'slogan-part-2',
                        'slogan-part-3',
                        'mission',
                        'objective',
                        'stakeholder'
                    ];
                    fadeInSequence.forEach((id, index) => {
                        setTimeout(() => {
                            const el = document.getElementById(id);
                            if (el) el.style.opacity = '1';
                        }, index * 1000);
                    });
                } else if (entry.target.id === 'connect') {
                    const connectBtn = document.querySelector('.btn-nav-connect');
                    const connectBtnMobile = document.querySelector('.btn-nav-connect-mobile');
                    connectBtn.classList.add('btn-nav-active-orange');
                    connectBtnMobile.classList.add('btn-nav-active-orange');
                    closeSubnav();
                } else {
                    subnavLinks.forEach(link => {
                        const linkClassSplit = link.classList[1].split('-');
                        const linkId = linkClassSplit[2];
                        if (linkId === entry.target.id) {
                            link.classList.add('btn-nav-active-green');
                        }
                    })
                    subnavMobileLinks.forEach(link => {
                        const linkClassSplit = link.classList[1].split('-');
                        const linkId = linkClassSplit[2];
                        if (linkId === entry.target.id) {
                            link.classList.add('btn-nav-active-green');
                        }
                    })
                }

            }

        })
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    })

    // Clear nav classes when user scrolls to top
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            clearNavClasses();
        }
    });

    // Click handler for nav buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            // Scroll to top functionality for logo button in header
            if (btn.classList.contains('top-of-page')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeSubnav();
            }

            // Toggle subnav if the Learn button is clicked
            else if (btn.classList.contains('btn-nav-learn')) {
                toggleSubnav();
            }

            // Scroll functionality for all other nav buttons
            else {
                const secondClass = btn.classList[1];
                if (secondClass) {
                    const btnClassSplit = secondClass.split('-');
                    if (btnClassSplit.length > 2) {
                        const targetId = btnClassSplit[2];
                        const targetSection = document.getElementById(targetId);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                            closeSubnav();
                        }
                    }
                }

            }
            // Close mobile nav if open
            const parent = btn.parentElement;
            if (parent.classList.contains('nav-mobile') || parent.classList.contains('subnav-mobile')) {
                closeMobileNav();
            }
        })
    })

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    /*------------------------VIDEOS-----------------------------*/

    // Replay a video
    const videos = document.querySelectorAll('video');

    function handleReplay(el, btn) {
        btn.style.display = 'block';
        setTimeout(() => {
            void btn.offsetHeight;
            btn.style.opacity = '.7';
        }, 1)

        btn.removeEventListener('click', () => {
            el.play();
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.style.display = 'none';
            }, 1000);
        })

        btn.addEventListener('click', () => {
            el.play();
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.style.display = 'none';
            }, 1000);
        })
    }

    videos.forEach(el => {
        const container = el.parentElement;
        const replayBtn = container.querySelector('button');
        el.addEventListener('ended', () => {
            handleReplay(el, replayBtn);
        })
    })

    // Header background video
    const headerVideo = document.querySelector('.header-video');
    headerVideo.loop = true;

    setTimeout(stopVideo, 8000);

    function stopVideo() {
        headerVideo.loop = false;
        headerVideo.style.display = 'none';
    }


    /*------------------------HERO SECTION BUTTONS-----------------------------*/

    const heroAboutBtn = document.getElementById('hero-btn-1');
    const heroLearnBtn = document.getElementById('hero-btn-2');
    const aboutSection = document.getElementById('about');
    const quizSection = document.getElementById('quiz');

    heroAboutBtn.addEventListener('click', () => {
        subnav.classList.remove('subnav-open');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    })

    heroLearnBtn.addEventListener('click', () => {
        quizSection.scrollIntoView({ behavior: 'smooth' });
    })


    /*------------------------POPUP FUNCTIONS--------------------------------*/

    // Popup variables
    const popupOverlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup');
    const popupContent = document.querySelector('.popup-content');
    const popupTitle = document.querySelector('.popup-title');
    const closeBtn = document.querySelector('.btn-close-popup');
    let triggeringElement;

    // Open popup
    function openPopup(title, subtitle) {
        triggeringElement.setAttribute('aria-expanded', 'true');
        popupOverlay.classList.remove('hide-popup');
        popup.hidden = false;
        popupOverlay.style.display = 'flex';
        document.documentElement.classList.add('modal-open');
        setTimeout(() => {
            void popupOverlay.offsetHeight;
            requestAnimationFrame(() => {
                popupOverlay.classList.add('show-popup');
            })
        })

        const popupTitleMain = popupTitle.firstElementChild;
        const popupTitleSub = popupTitle.lastElementChild;
        popupTitleMain.innerHTML = title;
        popupTitleSub.innerHTML = subtitle;

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.removeEventListener('click', function (e) {
                e.stopPropagation();
            });
        })
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        })

        trapFocus(popup);
    }

    // Trap focus in popup window (for keyboard users) and close popup function
    function trapFocus(el) {

        function getFocusableElements(container) {
            const nodes = container.querySelectorAll('a[href], button, input, textarea, select, [tabindex]');
            return Array.from(nodes).filter(node => {
                const isDisabled = node.disabled || node.getAttribute('aria-disabled') === 'true';
                const isFocusable = node.tabIndex >= 0;
                const isVisible = !!(node.offsetParent || node.getClientRects().length);
                return !isDisabled && isFocusable && isVisible;
            });
        }

        let focusableElements = getFocusableElements(el);
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
            if (!el.contains(e.target) && firstFocusable) {
                firstFocusable.focus();
            }
        }

        function updateFocusableElements() {
            focusableElements = getFocusableElements(el);
            firstFocusable = focusableElements[0];
            lastFocusable = focusableElements[focusableElements.length - 1];
        }

        const observer = new MutationObserver(() => {
            updateFocusableElements();
        });

        observer.observe(el, { childList: true, subtree: true, attributes: true });

        const visibilityObserver = new MutationObserver(() => {
            updateFocusableElements();
        });

        visibilityObserver.observe(el, {
            attributes: true,
            attributeFilter: ['style', 'class', 'aria-expanded']
        });

        function closePopup() {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocusIn, true);
            popupOverlay.classList.remove('show-popup');
            popupOverlay.classList.add('hide-popup');
            document.documentElement.classList.remove('modal-open');
            setTimeout(() => {
                popupContent.scrollTop = 0;
                popupOverlay.style.display = 'none';
                popup.hidden = true;
            }, 1000)

            // return focus to trigger element
            if (triggeringElement) {
                triggeringElement.focus();
                triggeringElement.setAttribute('aria-expanded', 'false');
            }
            observer.disconnect();
            visibilityObserver.disconnect();
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('focusin', handleFocusIn, true);
        closeBtn.addEventListener('click', closePopup, { once: true })
    }


    /*------------------------DROPDOWN FUNCTIONS--------------------------------*/

    function hideFocus(content) {
        const links = content.querySelectorAll('a');
        if (links.length > 0) {
            if (links.length > 1) {
                links.forEach(link => {
                    link.setAttribute('tabindex', '-1');
                })
            } else { links[0].setAttribute('tabindex', '-1') }
        }
        const subDrops = content.querySelectorAll('.btn-dropdown-sub');
        if (subDrops.length > 0) {
            if (subDrops.length > 1) {
                subDrops.forEach(sub => {
                    sub.setAttribute('tabindex', '-1');
                })

            } else { subDrops[0].setAttribute('tabindex', '-1') }
        }
    }

    function showFocus(content) {
        const links = content.querySelectorAll('a');
        if (links.length > 0) {
            if (links.length > 1) {
                links.forEach(link => {
                    link.setAttribute('tabindex', '0');
                })
            } else { links[0].setAttribute('tabindex', '0') }
        }
        const subDrops = content.querySelectorAll('.btn-dropdown-sub');
        if (subDrops.length > 0) {
            if (subDrops.length > 1) {
                subDrops.forEach(sub => {
                    sub.setAttribute('tabindex', '0');
                })

            } else { subDrops[0].setAttribute('tabindex', '0') }
        }
    }

    function closeDropdown(dropdown) {
        dropdown.firstElementChild.classList.replace('fa-chevron-down', 'fa-chevron-right');
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('dropdown-active');
        setTimeout(() => {
            const content = dropdown.parentElement.nextElementSibling;
            content.classList.remove('dropdown-content-active');
            content.hidden = true;
            hideFocus(content);
        }, 500)
    }

    function closeAllDropdowns(dropdowns) {
        dropdowns.forEach(dropdown => {
            if (dropdown.firstElementChild.classList.contains('fa-chevron-down')) {
                closeDropdown(dropdown);
            }
            const content = dropdown.parentElement.nextElementSibling;
            const subs = content.querySelectorAll('.btn-dropdown-sub');
            if (subs) subs.forEach(sub => {
                if (sub.firstElementChild.classList.contains('fa-chevron-down')) {
                    closeDropdown(sub);
                }
            })
        })
    }

    function activeDropdown(dropdown) {
        dropdown.firstElementChild.classList.replace('fa-chevron-right', 'fa-chevron-down');
        dropdown.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('dropdown-active');
        const content = dropdown.parentElement.nextElementSibling;
        content.classList.add('dropdown-content-active');
        content.hidden = false;
        setTimeout(() => {
            if (!dropdown.classList.contains('btn-dropdown-connect')) {
                dropdown.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }, 1001);
        showFocus(content);
    }

    // Caret dropdowns (both in and not in popups)
    function openDropdown(dropdown, dropdowns) {
        // close any open dropdowns
        closeAllDropdowns(dropdowns);
        // open selected dropdown
        activeDropdown(dropdown);
    }


    // Popup dropdown menu
    function dropdownMenu() {
        const menuBtn = popup.querySelector('.btn-menu');
        const menu = menuBtn.nextElementSibling;
        const options = menu.querySelectorAll('.menu-option');
        const label = menuBtn.previousElementSibling;
        const regulationContainer = popup.querySelector('.sources-3-right');
        // placeholder data elements
        const stateName = popup.querySelector('#state');
        const years = popup.querySelector('#bill-year');
        const name = popup.querySelector('#bill-name');
        const board = popup.querySelector('#board');
        const type = popup.querySelector('#bill-type');
        const exam = popup.querySelector('#exam');
        const restrict = popup.querySelector('#restrictions');

        function openMenu() {
            menu.hidden = false;
            menu.classList.add('menu-appear');
            menuBtn.setAttribute('aria-expanded', 'true');
        }

        function closeMenu({ returnFocus = true } = {}) {
            menu.hidden = true;
            menu.classList.remove('menu-appear');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (returnFocus) {
                menuBtn.focus();
            }
        }

        function toggleMenu() {
            if (menu.hidden) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        function handleKeyDownToggle(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                openMenu();
                options[0].focus();
            }
        }

        function handleMenuKeyboard(e) {
            const currentIndex = Array.from(options).indexOf(document.activeElement);
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                options[(currentIndex + 1) % options.length].focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                options([currentIndex - 1 + options.length] % options.length).focus();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                closeMenu({ returnFocus: true });
            }
        }

        function clearStateInfo() {
            stateName.textContent = '';
            years.textContent = '';
            name.innerHTML = '';
            board.textContent = '';
            type.textContent = '';
            exam.textContent = '';
            restrict.textContent = '';
        }

        function handleStateSelection(states, state) {
            clearStateInfo();

            // Remove active class if a state has already been clicked on
            states.forEach(s => {
                s.firstElementChild.nextElementSibling.setAttribute('aria-expanded', 'false');
                s.firstElementChild.style.opacity = '0';
                s.firstElementChild.nextElementSibling.classList.remove('btn-state-active');
            });

            // Add active class to selected state
            state.firstElementChild.style.opacity = '1';
            state.firstElementChild.nextElementSibling.classList.add('btn-state-active');
            state.firstElementChild.nextElementSibling.setAttribute('aria-expanded', 'true');

            // Scroll automatically to data
            regulationContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Make the data the next focus for keyboard users 
            regulationContainer.setAttribute('tabindex', '0');
            regulationContainer.focus();

            // Data elements for the selected state
            const content = state.lastElementChild;
            const stateNew = content.children[0];
            const yearsNew = content.children[1];
            const nameNew = content.children[2];
            const boardNew = content.children[3];
            const typeNew = content.children[4];
            const examNew = content.children[5];
            const restrictNew = content.children[6];

            // Update placeholder elements with data from selected state
            stateName.textContent = stateNew.textContent;
            years.textContent = yearsNew.textContent;
            name.innerHTML = nameNew.innerHTML;
            board.textContent = boardNew.textContent;
            type.textContent = typeNew.textContent;
            exam.textContent = examNew.textContent;
            restrict.textContent = restrictNew.textContent;
        }

        function selectState(reg) {
            const states = reg.querySelectorAll('.state-row');
            if (states.length) states[0].focus();
            // Reset state listeners and display
            states.forEach(state => {
                state.firstElementChild.nextElementSibling.setAttribute('aria-expanded', 'false');
                state.firstElementChild.style.opacity = '0';
                state.firstElementChild.nextElementSibling.classList.remove('btn-state-active');
                state.removeEventListener('click', () => {
                    handleStateSelection(states, state);
                })
                state.removeEventListener('keydown', (e) => {
                    if (e.key === 'enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStateSelection(states, state);
                    }
                })
            })
            //  Add back listeners for each state
            states.forEach(state => {
                state.addEventListener('click', () => {
                    handleStateSelection(states, state);
                })
                state.addEventListener('keydown', (e) => {
                    if (e.key === 'enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStateSelection(states, state);
                    }
                })
            })
        }

        function showRegion(optionIndex) {
            const region = popup.querySelectorAll('.map');
            region.forEach((reg, index) => {
                if (index === optionIndex) {
                    reg.style.display = 'flex';
                    selectState(reg);
                }
                else {
                    reg.style.display = 'none';
                }
            })
        }

        function selectOption(option, index) {
            label.textContent = option.textContent;
            closeMenu({ returnFocus: false });
            showRegion(index);
            clearStateInfo();
        }

        // Remove any old listeners
        menuBtn.removeEventListener('click', toggleMenu);
        menuBtn.removeEventListener('keydown', (e) => {
            handleKeyDownToggle(e);
        });
        menu.removeEventListener('keydown', (e) => {
            handleMenuKeyboard(e);
        })
        options.forEach((option, index) => {
            option.removeEventListener('click', () => selectOption(option, index));
            option.removeEventListener('keydown', (e) => {
                if (e.key === 'enter' || e.key === ' ') {
                    selectOption(option, index);
                }
            });
        });

        // Add back the listeners
        menuBtn.addEventListener('click', toggleMenu);
        menuBtn.addEventListener('keydown', (e) => {
            handleKeyDownToggle(e);
        });
        menu.addEventListener('keydown', (e) => {
            handleMenuKeyboard(e);
        })
        options.forEach((option, index) => {
            option.addEventListener('click', () => selectOption(option, index));
            option.addEventListener('keydown', (e) => {
                if (e.key === 'enter' || e.key === ' ') {
                    selectOption(option, index);
                }
            });
        });
    }

    /*------------------------FACTS CAROUSEL--------------------------------*/

    let currentFactIndex = 0;
    const facts = document.querySelectorAll('.fact');
    const factPlaceholder = document.getElementById('fact-placeholder');
    const nextBtn = document.getElementById('btn-next-fact');
    const previousBtn = document.getElementById('btn-previous-fact');
    const sourcesBtn = document.querySelector('.btn-sources');
    const factContainer = document.querySelector('.fact-container');
    const mc = new Hammer(factContainer);
    factContainer.style.opacity = '0';
    let isFactTransitioning = false;

    function displayFirstFact() {
        const fact = facts[0].firstElementChild.innerHTML;
        factPlaceholder.innerHTML = fact;
        factContainer.classList.add('fact-in-left');

        sourcesBtn.addEventListener('click', () => {
            triggeringElement = sourcesBtn;
            const content = facts[0].firstElementChild.nextElementSibling.innerHTML;
            popupContent.innerHTML = content;
            const title = 'Sources';
            const subtitle = 'Links will open in a new window.'
            openPopup(title, subtitle);
        })

    }

    function displayFact(index) {
        const fact = facts[index].firstElementChild.innerHTML;
        factPlaceholder.innerHTML = fact;
        factContainer.firstElementChild.textContent = 'fact updated';
        factPlaceholder.setAttribute('tabindex', '-1');
        // Remove old listener
        sourcesBtn.removeEventListener('click', () => {
            const content = facts[index].firstElementChild.nextElementSibling.innerHTML;
            popupContent.innerHTML = content;
            const title = 'Sources';
            const subtitle = 'Links will open in a new window.'
            openPopup(title, subtitle);
        })
        // Add listeners
        factContainer.addEventListener('animationend', () => {
            factPlaceholder.focus();
        }, { once: true });
        sourcesBtn.addEventListener('click', () => {
            const content = facts[index].firstElementChild.nextElementSibling.innerHTML;
            popupContent.innerHTML = content;
            const title = 'Sources';
            const subtitle = 'Links will open in a new window.'
            openPopup(title, subtitle);
        })
        currentFactIndex = index;

        setTimeout(() => {
            isFactTransitioning = false;
            nextBtn.disabled = false;
            previousBtn.disabled = false;
        }, 1001);
    };

    function showNextFact() {
        const nextIndex = (currentFactIndex + 1) % facts.length;
        clearFactClasses();
        displayFact(nextIndex);
        factContainer.classList.add('fact-in-left');
    }

    function showPreviousFact() {
        const previousIndex = (currentFactIndex - 1 + facts.length) % facts.length;
        clearFactClasses();
        displayFact(previousIndex);
        factContainer.classList.add('fact-in-right');
    }

    function clearFactClasses() {
        factContainer.classList.remove('fact-out-right');
        factContainer.classList.remove('fact-out-left');
        factContainer.classList.remove('fact-in-left');
        factContainer.classList.remove('fact-in-right');
    }

    nextBtn.addEventListener('click', () => {
        isFactTransitioning = true;
        nextBtn.disabled = true;
        previousBtn.disabled = true;
        clearFactClasses();
        factContainer.classList.add('fact-out-right');
        setTimeout(showNextFact, 1001);
    })

    mc.on("swiperight", () => {
        clearFactClasses();
        factContainer.classList.add('fact-out-right');
        setTimeout(showNextFact, 1001);
    })

    previousBtn.addEventListener('click', () => {
        isFactTransitioning = true;
        nextBtn.disabled = true;
        previousBtn.disabled = true;
        clearFactClasses();
        factContainer.classList.add('fact-out-left');
        setTimeout(showPreviousFact, 1001);
    })

    mc.on("swipeleft", () => {
        clearFactClasses();
        factContainer.classList.add('fact-out-left');
        setTimeout(showPreviousFact, 1001);
    })

    displayFirstFact();


    /*------------------------HERO SECTION ANIMATIONS--------------------------*/

    const heroLines = document.querySelectorAll('.hero-line');
    const scribVideo = document.querySelector('.hero-video');
    const trademark = document.querySelector('.trademark');

    function heroLinesAppear() {
        heroLines.forEach(heroLine => {
            heroLine.style.opacity = '1';
        })
    }

    heroLinesAppear();
    setTimeout(function () {
        scribVideo.play();
    }, 7100);

    scribVideo.addEventListener('ended', () => {
        trademark.style.display = 'block';
    })

    scribVideo.addEventListener('playing', () => {
        trademark.style.display = 'none';
    })


    /*------------------------ABOUT SECTION POPUP--------------------------*/

    const everyoneBtn = document.querySelector('.everyone');

    everyoneBtn.addEventListener('click', () => {
        triggeringElement = everyoneBtn;
        const title = 'Everyone is a stakeholder';
        const subtitle = '';
        const content = document.querySelector('.everyone-popup-content');
        popupContent.innerHTML = content.innerHTML;
        openPopup(title, subtitle);
    })


    /*--------------------------------QUIZ--------------------------------*/

    // Definitions Setup
    const prevDefBtn = document.getElementById('btn-prev-def');
    const nextDefBtn = document.getElementById('btn-next-def');
    const definitions = document.querySelectorAll('.definition-container');
    const quizSourcesBtn = document.querySelector('.btn-sources-def');
    const defText = document.querySelectorAll('.def-text');
    const liveRegion = document.getElementById('live-region');
    let currentDefIndex = 0;
    let isDefTransitioning = false;

    function showFirstDef() {
        definitions[0].style.display = 'block';
        setTimeout(() => {
            void definitions[0].offsetHeight;
            definitions[0].style.opacity = '1';
        })
    }

    function showDef(def) {
        def.style.display = 'block';
        setTimeout(() => {
            void def.offsetHeight;
            def.style.opacity = '1';
        })
        announce('Definition updated')
        setTimeout(() => {
            const text = defText[currentDefIndex];
            text.focus();
            isDefTransitioning = false;
            nextDefBtn.disabled = false;
            prevDefBtn.disabled = false;
        }, 600);
    }

    function showNextDef() {
        const nextDefIndex = (currentDefIndex + 1) % definitions.length;
        const nextDef = definitions[nextDefIndex];
        showDef(nextDef);
        currentDefIndex = nextDefIndex;
    }

    function showPrevDef() {
        const prevDefIndex = (currentDefIndex - 1 + definitions.length) % definitions.length;
        const prevDef = definitions[prevDefIndex];
        showDef(prevDef);
        currentDefIndex = prevDefIndex;
    }

    function announce(msg) {
        liveRegion.innerHTML = '';
        setTimeout(() => {
            liveRegion.innerHTML = msg;
        }, 100)
    }

    nextDefBtn.addEventListener('click', () => {
        isDefTransitioning = true;
        nextDefBtn.disabled = true;
        prevDefBtn.disabled = true;
        const def = definitions[currentDefIndex];
        def.style.opacity = '0';
        setTimeout(() => {
            def.style.display = 'none';
        }, 1000);
        setTimeout(showNextDef, 1000);
    })

    prevDefBtn.addEventListener('click', () => {
        isDefTransitioning = true;
        nextDefBtn.disabled = true;
        prevDefBtn.disabled = true;
        const def = definitions[currentDefIndex];
        def.style.opacity = '0';
        setTimeout(() => {
            def.style.display = 'none';
        }, 1000);
        setTimeout(showPrevDef, 1000);
    })

    quizSourcesBtn.addEventListener('click', () => {
        triggeringElement = quizSourcesBtn;
        const contentSources = document.querySelector('.quiz-popup-sources');
        popupContent.innerHTML = contentSources.innerHTML;
        const title = 'Sources';
        const subtitle = 'Links will open in a new window.'
        openPopup(title, subtitle);
    })

    showFirstDef();

    // Quiz Functionality
    const draggables = document.querySelectorAll('.quiz-btn');
    const dropzones = document.querySelectorAll('.quiz-placeholder');
    const resetButton = document.querySelector('.btn-reset');
    const balloonsContainer = document.querySelector('.balloons-container');
    let draggedElement = null;

    // Store original parent and position for each draggable
    const originalPositions = {};

    function handleDropOver(e) { handleDragOver(e, this); }

    function handleKeyDropWrapper(e) { handleKeyDrop(e, this); }

    // dragstart function
    function startDrag(e) {
        draggedElement = e.target;
        e.target.setAttribute('aria-grabbed', 'true');
        if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                // Hide original element while dragging
                e.target.classList.add('drag-hidden');
            }, 0);
        }
    }

    // dragend function
    function endDrag(e) {
        // Restore visibility
        e.target.classList.remove('drag-hidden');
        e.target.setAttribute('aria-grabbed', 'false');
        draggedElement = null;

        //Restore placeholder for empty dropzones
        dropzones.forEach(dropzone => {
            if (dropzone.children.length === 1) {
                const placeholder = dropzone.querySelector('.placeholder-text')
                if (placeholder) placeholder.style.opacity = '1';
            }
        });
    }

    // dragover function
    function handleDragOver(e, dropzone) {
        e.preventDefault();
        dropzone.classList.add('highlight');
    }

    // keydown function
    function handleKeyDrop(e, dropzone) {
        if (dropzone && draggedElement && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            dropEl(e, dropzone);
        }
    }

    // drop function
    function dropEl(e, dropzone) {
        e.preventDefault();

        // Check if dropped via mouse or keyboard
        const element = e.dataTransfer
            ? document.getElementById(e.dataTransfer.getData('text/plain'))
            : draggedElement;

        if (!element) return; // Prevent error if element is null

        // Hide the placeholder
        const placeholder = dropzone.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        dropzone.classList.remove('highlight');

        // Move the dragged element
        dropzone.appendChild(element);


        // Right and Wrong icons for visual cues
        const rightIcon = dropzone.previousElementSibling.firstElementChild;
        const wrongIcon = dropzone.previousElementSibling.lastElementChild;
        const elementId = element.id;
        const correctId = dropzone.dataset.correct;

        if (elementId === correctId) {
            element.classList.add('correct');
            element.classList.remove('incorrect');
            rightIcon.style.display = 'flex';
            wrongIcon.style.display = 'none';
            announce('Placed correctly. use the next or previous button to see another definition.');
            // Prevent any further drops on this dropzone
            noDrops(dropzone);
        } else {
            element.classList.add('incorrect');
            element.classList.remove('correct');
            rightIcon.style.display = 'none';
            wrongIcon.style.display = 'flex';
            announce('Incorrect. Button reset. Please try again.');
            setTimeout(returnIncorrect, 2000, element, dropzone);
        }

        checkCompletion();

        element.setAttribute('aria-grabbed', 'false');
        draggedElement = null;
    }

    function noDrops(dropzone) {
        dropzone.removeEventListener('dragover', handleDropOver)
        dropzone.removeEventListener('keydown', handleKeyDropWrapper);
    }

    function resetQuiz() {
        // remove the right and wrong icons
        const wrongIcons = document.querySelectorAll('.wrong');
        const rightIcons = document.querySelectorAll('.right');
        wrongIcons.forEach(wrong => {
            wrong.style.display = 'none';
        })
        rightIcons.forEach(right => {
            right.style.display = 'none';
        })

        // Move each draggable back  to its original location
        draggables.forEach(draggable => {
            const originalParent = originalPositions[draggable.id];

            // Temp add reset class for animation
            draggable.classList.add('resetting');

            // Restore original parent
            originalParent.appendChild(draggable);

            // Remove feedback classes
            draggable.classList.remove('correct', 'incorrect');

            // Clear inline styles
            draggable.style.transform = '';

            // Force a reflow to trigger the transition
            void draggable.offsetWidth;

            // Remove the resetting class after the transition
            setTimeout(() => {
                draggable.classList.remove('resetting');
            }, 500);
        });
        liveRegion.textContent = 'Quiz reset';
        // Restore placeholders
        dropzones.forEach(dropzone => {
            const placeholder = dropzone.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.style.display = 'block';
            }
            dropzone.addEventListener('dragover', (e) => {
                handleDragOver(e, dropzone);
            })
            dropzone.addEventListener('keydown', (e) => {
                handleKeyDrop(e, dropzone);
            });
        })

        // Reset screen reader fallback menus
        screenreaders.forEach(select => {
            select.selectedIndex = 0;
        })
    }

    function returnIncorrect(el, dropzone) {
        const originalParent = originalPositions[el.id];
        const wrongIcon = dropzone.previousElementSibling.lastElementChild;
        wrongIcon.style.display = 'none';
        originalParent.appendChild(el);
        el.classList.remove('incorrect');
        el.style.transform = '';
        void el.offsetWidth;
        const placeholder = dropzone.querySelector('.placeholder-text');
        placeholder.style.display = 'block';
    }

    function checkCompletion() {
        const totalCorrect = Array.from(dropzones).filter(dropzone =>
            dropzone.querySelector('.quiz-btn')?.id === dropzone.dataset.correct).length;
        if (totalCorrect === 4) startBalloons();
    }

    function startBalloons() {
        popupContent.innerHTML = '';
        const title = 'Congratulations! You answered correctly.';
        const subtitle = '';
        balloonsContainer.style.display = 'flex';
        setTimeout(() => {
            balloonsContainer.style.display = 'none';
        }, 5000);
        setTimeout(resetQuiz, 5000);
        setTimeout(openPopup, 4000, title, subtitle);
        triggeringElement = quizSourcesBtn;

    }


    // Mouse Drag Events
    draggables.forEach(draggable => {

        originalPositions[draggable.id] = draggable.parentElement;

        draggable.addEventListener('dragstart', (e) => { startDrag(e); });

        draggable.addEventListener('dragend', (e) => { endDrag(e); });

    });

    dropzones.forEach(dropzone => {

        dropzone.addEventListener('dragover', handleDropOver);

        dropzone.addEventListener('drop', (e) => { dropEl(e, dropzone) });

    });


    // Keyboard Drag Events
    draggables.forEach(draggable => {

        originalPositions[draggable.id] = draggable.parentElement;

        draggable.addEventListener('keydown', (e) => {
            if (draggable && (e.key === ' ' || e.key === 'Enter')) {
                e.preventDefault();

                const visibleDropzone = document.querySelector('.definition-container:not([style*="display: none"]) .quiz-placeholder');

                if (!draggedElement) {
                    draggedElement = draggable;
                    draggedElement.setAttribute('aria-grabbed', 'true');

                    // Move focus to the visible dropzone
                    if (visibleDropzone) {
                        visibleDropzone.focus();
                        announce(`${draggedElement.textContent} selected. Focus moved to dropzone. Press Enter or Space to drop.`);
                    }
                } else {
                    // Cancel Selection
                    draggedElement.setAttribute('aria-grabbed', 'false');
                    announce(`${draggedElement.innerText} deselected.`);
                    draggedElement = null;
                }
            }
        });
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('keydown', handleKeyDropWrapper);
    });


    // Screenreader quiz fallback option
    const screenreaders = document.querySelectorAll('.sr-only-fallback');

    screenreaders.forEach(select => {
        select.addEventListener('change', e => {
            const defId = e.target.id;
            const chosenTerm = e.target.value;

            // Check correctness
            if (defId === chosenTerm) {
                announce('That is the correct answer. use the next or previous button for another definition.');
                select.classList.add('correct');
                checkScreenReaderCompletion();
            } else {
                announce('Sorry, that answer is incorrect. Please try again.');;
            }
        })

    })

    function checkScreenReaderCompletion() {
        for (const el of screenreaders) {
            if (!el.classList.contains('correct')) {
                return false;
            }
        }

        return announce('Congratulations! You have matched all definitions to their job titles correctly!');
    }

    // Reset button
    resetButton.addEventListener('click', resetQuiz);


    /*--------------------------------TIMELINE--------------------------------*/

    const soundBtn = document.querySelector('.btn-sound');
    const soundNote = document.getElementById('sound-feedback');
    const sound = document.getElementById('retract-sound');
    const years = document.querySelectorAll('.timeline-year');
    const icons = document.querySelectorAll('.timeline-icon');
    const iconFeedback = document.getElementById('timeline-event-descript')
    const prevYearBtn = document.getElementById('btn-prev-year');
    const nextYearBtn = document.getElementById('btn-next-year');
    const tapeBtn = document.querySelector('.timeline-btn');
    const ariaTimelinefeedback = tapeBtn.previousElementSibling;
    const stretchLine = document.getElementById('stretch-line');
    const timelineInfo = document.querySelectorAll('.timeline-info');
    const timelineInfoContainer = document.querySelector('.timeline-info-container');
    const timelineSourcesBtn = document.querySelector('.btn-source-timeline');
    const timelineSourcesData = document.querySelectorAll('.timeline-sources-data');
    const timelineCloseBtn = document.querySelector('.btn-close-timeline');

    let currentYearIndex = 0;
    let currentIconIndex = 0;
    let currentDataIndex = 0;
    let currentSourcesIndex = 0;
    let isTimelineTransitioning = false;

    function nextYear() {
        closeTimeline();
        hideIconandYear();
        const nextYearIndex = (currentYearIndex + 1) % years.length;
        currentYearIndex = nextYearIndex;
        calculateIcon();
    }

    function prevYear() {
        closeTimeline();
        hideIconandYear();
        const prevYearIndex = (currentYearIndex - 1 + years.length) % years.length;
        currentYearIndex = prevYearIndex;
        calculateIcon();
    }

    function calculateIcon() {
        if (currentYearIndex === 1 || currentYearIndex === 12) {
            iconIndex = 1;
            iconFeedback.textContent = 'a new law';
        } else if (currentYearIndex === 2 || currentYearIndex === 3 || currentYearIndex === 11 || currentYearIndex === 17 || currentYearIndex === 20) {
            iconIndex = 2;
            iconFeedback.textContent = 'a building fire';
        } else if (currentYearIndex === 13 || currentYearIndex === 16) {
            iconIndex = 3;
            iconFeedback.textContent = 'a disagreement';
        } else if (currentYearIndex === 14 || currentYearIndex === 18 || currentYearIndex === 19 || currentYearIndex === 23) {
            iconIndex = 4;
            iconFeedback.textContent = 'industry inequality';
        } else if (currentYearIndex === 21) {
            iconIndex = 5;
            iconFeedback.textContent = 'an agreement is reached';
        } else {
            iconIndex = 0;
            iconFeedback.textContent = 'a new organization';
        }
        currentIconIndex = iconIndex;
        showIconandYear();
    }

    function showIconandYear() {
        years[currentYearIndex].classList.add('appear');
        icons[currentIconIndex].classList.add('appear');
        setTimeout(() => {
            isTimelineTransitioning = false;
            nextYearBtn.disabled = false;
            prevYearBtn.disabled = false;
        }, 501);
    }

    function hideIconandYear() {
        years[currentYearIndex].classList.remove('appear');
        icons[currentIconIndex].classList.remove('appear');
    }

    function showData() {
        currentDataIndex = currentYearIndex;
        timelineInfo[currentDataIndex].style.display = 'block'
        setTimeout(() => {
            void timelineInfo[currentDataIndex].offsetHeight;
            timelineInfoContainer.classList.add('appearX');
        }, 1);
        timelineInfoContainer.setAttribute('aria-hidden', 'false');
        ariaTimelinefeedback.innerHTML = 'timeline event details updated';
        timelineInfo[currentDataIndex].setAttribute('tabindex', '-1');
        timelineInfo[currentDataIndex].focus();
        timelineSourcesBtn.setAttribute('tabindex', '0');

        timelineSourcesBtn.removeEventListener('click', () => {
            triggeringElement = timelineSourcesBtn;
            currentSourcesIndex = currentDataIndex;
            const content = timelineSourcesData[currentSourcesIndex].innerHTML;
            popupContent.innerHTML = content;
            const title = 'Sources';
            const subtitle = 'Links will open in a new window.'
            openPopup(title, subtitle);
        })

        timelineSourcesBtn.addEventListener('click', () => {
            triggeringElement = timelineSourcesBtn;
            currentSourcesIndex = currentDataIndex;
            const content = timelineSourcesData[currentSourcesIndex].innerHTML;
            popupContent.innerHTML = content;
            const title = 'Sources';
            const subtitle = 'Links will open in a new window.'
            openPopup(title, subtitle);
        })
    }

    function closeTimeline() {
        if (stretchLine.classList.contains('line-extended')) {
            sound.play();
        }
        stretchLine.classList.remove('line-extended');
        timelineInfoContainer.classList.remove('appearX');
        setTimeout(() => {
            timelineInfo[currentDataIndex].style.display = 'none'
        }, 499);
        tapeBtn.setAttribute('aria-expanded', 'false');
        timelineInfoContainer.setAttribute('aria-hidden', 'true');
        ariaTimelinefeedback.innerHTML = 'Event details hidden.'
        tapeBtn.focus();
        timelineCloseBtn.setAttribute('tabindex', '-1');
        timelineSourcesBtn.setAttribute('tabindex', '-1');
    }

    nextYearBtn.addEventListener('click', () => {
        isTimelineTransitioning = true;
        nextYearBtn.disabled = true;
        prevYearBtn.disabled = true;
        nextYear();
    })

    prevYearBtn.addEventListener('click', () => {
        isTimelineTransitioning = true;
        nextYearBtn.disabled = true;
        prevYearBtn.disabled = true;
        prevYear();
    })

    tapeBtn.addEventListener('click', () => {
        tapeBtn.setAttribute('aria-expanded', 'true');
        stretchLine.classList.add('line-extended');
        timelineCloseBtn.setAttribute('tabindex', '0');
        setTimeout(showData, 500);
    })

    timelineCloseBtn.addEventListener('click', () => {
        closeTimeline();
    })

    soundBtn.addEventListener('click', () => {
        if (soundBtn.firstElementChild.classList.contains('fa-volume-high')) {
            soundBtn.firstElementChild.classList.replace('fa-volume-high', 'fa-volume-xmark');
            soundNote.innerHTML = 'sound is off';
            sound.muted = true;
        } else {
            soundBtn.firstElementChild.classList.replace('fa-volume-xmark', 'fa-volume-high');
            soundNote.innerHTML = 'sound is on';
            sound.muted = false;
        }
    })

    showIconandYear();


    /*--------------------------------ANALYSIS AND HIRING SLIDES--------------------------------*/

    const analysis1 = document.querySelectorAll('.analysis-1');
    const analysis2 = document.querySelectorAll('.analysis-2');
    const analysis3 = document.querySelectorAll('.analysis-3');
    const hireSlides = document.querySelectorAll('.hire-slide');
    const analysisNextBtn = document.querySelectorAll('.btn-next-slide');
    const analysisPrevBtn = document.querySelectorAll('.btn-prev-slide');
    const analysisConclusion = document.querySelectorAll('.conclusion-line');
    const analysisSourcesBtn = document.querySelectorAll('.btn-sources-analysis');
    let analysis1Slide = 0;
    let analysis2Slide = 0;
    let analysis3Slide = 0;
    let hireSlideIndex = 0;
    let isSlideTransitioning = false;

    function showAnalysis1() {
        analysis1[analysis1Slide].style.display = 'flex';
        setTimeout(() => {
            void analysis1[analysis1Slide].offsetHeight;
            analysis1[analysis1Slide].classList.add('appear-slide');
        })

        if (analysis1Slide === 0) {
            firstSlide(0);
        }
        else if (analysis1Slide === 8) {
            analysis1[analysis1Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis1[analysis1Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            lastSlide(0);
        }
        else {
            analysis1[analysis1Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis1[analysis1Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            btwnSlide(0);
        }

        if (analysis1[analysis1Slide].querySelector('video') !== null) {
            const videos = analysis1[analysis1Slide].querySelectorAll('video');
            const replayBtn = analysis1[analysis1Slide].querySelector('button');
            const barH = document.querySelector('.video-loading-3H');
            const barV = document.querySelector('.video-loading-3V');
            barH.style.display = 'none';
            barV.style.display = 'none';

            const visibleVideo = Array.from(videos).find(el => {
                return window.getComputedStyle(el).display !== 'none';
            })

            if (visibleVideo) {
                let loadingNote;
                if (analysis1Slide === 3 && visibleVideo.classList.contains('graph-bar')) {
                    loadingNote = barH;
                } else if (analysis1Slide === 3 && visibleVideo.classList.contains('graph-bar-mobile')) {
                    loadingNote = barV;
                } else {
                    loadingNote = analysis1[analysis1Slide].querySelector('.video-loading');
                }
                playVideo(visibleVideo, replayBtn, loadingNote);
            }
        }

        if (isSlideTransitioning === true) {
            setTimeout(() => {
                isSlideTransitioning = false;
                analysisNextBtn[0].disabled = false;
                analysisPrevBtn[0].disabled = false;
            }, 501);
        }

    }

    function showAnalysis2() {
        analysis2[analysis2Slide].style.display = 'flex';

        setTimeout(() => {
            void analysis2[analysis2Slide].offsetHeight;
            analysis2[analysis2Slide].classList.add('appear-slide');
        })

        if (analysis2Slide === 0) {
            firstSlide(1);
        }
        else if (analysis2Slide === 5) {
            analysis2[analysis2Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis2[analysis2Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            lastSlide(1);
        }
        else {
            analysis2[analysis2Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis2[analysis2Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            btwnSlide(1);
        }

        if (analysis2[analysis2Slide].querySelector('video') !== null) {
            const video = analysis2[analysis2Slide].querySelector('video');
            const replayBtn = video.nextElementSibling;
            const loadingNote = analysis2[analysis2Slide].querySelector('.video-loading');
            playVideo(video, replayBtn, loadingNote);
        }

        if (isSlideTransitioning === true) {
            setTimeout(() => {
                isSlideTransitioning = false;
                analysisNextBtn[1].disabled = false;
                analysisPrevBtn[1].disabled = false;
            }, 501);
        }

    }

    function showAnalysis3() {
        analysis3[analysis3Slide].style.display = 'flex';

        setTimeout(() => {
            void analysis3[analysis3Slide].offsetHeight;
            analysis3[analysis3Slide].classList.add('appear-slide');
        })

        if (analysis3Slide === 0) {
            firstSlide(2);

        }
        else if (analysis3Slide === 2) {
            analysis3[analysis3Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis3[analysis3Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            lastSlide(2);
        }
        else {
            analysis3[analysis3Slide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            analysis3[analysis3Slide].parentElement.firstElementChild.textContent = 'Slide content updated';
            btwnSlide(2);
        }

        if (analysis3[analysis3Slide].querySelector('video') !== null) {
            const video = analysis3[analysis3Slide].querySelector('video');
            const replayBtn = video.nextElementSibling;
            const loadingNote = analysis3[analysis3Slide].querySelector('.video-loading');
            playVideo(video, replayBtn, loadingNote);
        }

        if (isSlideTransitioning === true) {
            setTimeout(() => {
                isSlideTransitioning = false;
                analysisNextBtn[2].disabled = false;
                analysisPrevBtn[2].disabled = false;
            }, 501);
        }
    }

    function playVideo(el, btn, note) {
        btn.style.display = 'none';

        // Video loading for first time
        if (el.readyState === HTMLMediaElement.HAVE_NOTHING) {
            note.style.display = 'inline'
            setTimeout(() => {
                void note.offsetHeight;
                note.style.opacity = '1';
            }, 1);
            const srcValueMov = el.firstElementChild.getAttribute('data-src');
            const srcValueWebm = el.lastElementChild.getAttribute('data-src');

            if (srcValueMov || srcValueWebm) {
                el.firstElementChild.setAttribute('src', srcValueMov);
                el.firstElementChild.removeAttribute('data-src');

                el.lastElementChild.setAttribute('src', srcValueWebm);
                el.lastElementChild.removeAttribute('data-src');

                el.load();

                el.addEventListener('loadeddata', () => {
                    note.style.opacity = '0';
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.play();
                    }, 500)
                    setTimeout(() => {
                        note.style.display = 'none';
                    }, 550);
                }, { once: true })
            }

            // Video already loaded
        } else {
            note.style.opacity = '0';
            note.style.display = 'none';
            el.style.opacity = '1';
            el.play();
        }
    }

    function showHireSlides() {
        hireSlides[hireSlideIndex].style.display = 'flex';
        setTimeout(() => {
            void hireSlides[hireSlideIndex].offsetHeight;
            hireSlides[hireSlideIndex].classList.add('appear-slide');
        })

        if (hireSlideIndex === 0) {
            firstSlide(3);
        }
        else if (hireSlideIndex === 3) {
            hireSlides[hireSlideIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            hireSlides[hireSlideIndex].parentElement.firstElementChild.textContent = 'Slide content updated';
            lastSlide(3);
        }
        else {
            hireSlides[hireSlideIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            hireSlides[hireSlideIndex].parentElement.firstElementChild.textContent = 'Slide content updated';
            btwnSlide(3);
        }

        if (isSlideTransitioning === true) {
            setTimeout(() => {
                isSlideTransitioning = false;
                analysisNextBtn[3].disabled = false;
                analysisPrevBtn[3].disabled = false;
            }, 501);
        }
    }

    function firstSlide(i) {
        analysisPrevBtn[i].style.display = 'none';
        analysisNextBtn[i].firstElementChild.classList.replace('fa-rotate-right', 'fa-chevron-right');
        analysisNextBtn[i].setAttribute('aria-label', 'next slide');
    }

    function btwnSlide(i) {
        analysisPrevBtn[i].style.display = 'block';
        analysisNextBtn[i].firstElementChild.classList.replace('fa-rotate-right', 'fa-chevron-right');
        analysisNextBtn[i].setAttribute('aria-label', 'next slide');
    }

    function lastSlide(i) {
        analysisNextBtn[i].firstElementChild.classList.replace('fa-chevron-right', 'fa-rotate-right');
        analysisNextBtn[i].setAttribute('aria-label', 'restart slides');
        analysisConclusion.forEach(line => {
            line.style.opacity = '0';
            requestAnimationFrame(() => {
                line.style.opacity = '1';
            })
        });
    }

    function clearSlideClasses(data, i) {
        data[i].classList.remove('appear-slide');
        setTimeout(() => {
            data[i].style.display = 'none';
        }, 500);
    }

    function handleAnalysisSourcesBtn(btn, i) {
        triggeringElement = btn;
        const content = btn.parentElement.nextElementSibling;
        popupContent.innerHTML = content.innerHTML;
        const subtitle = 'Links will open in a new window.'
        const dropdownBtns = document.querySelectorAll('.btn-dropdown');
        const subDropdowns = document.querySelectorAll('.btn-dropdown-sub');
        let title = '';

        if (i === 0) {
            title = 'Sources\n<h4>Building Fires</h4>';
        }
        else if (i === 1) {
            title = 'Sources\n<h4>Interior Design Degree Programs</h4>';
        }
        else if (i === 2) {
            title = 'Sources\n<h4>Architecture Degree Programs</h4>';
        }
        else if (i === 3) {
            title = 'Sources\n<h4>NCIDQ Exam</h4>';
        }
        else if (i === 4) {
            title = 'Sources\n<h4>ARE Exam</h4>';
        }
        else {
            title = 'State Regulations';
            dropdownMenu();
        }

        openPopup(title, subtitle);

        // Remove any old listeners
        dropdownBtns.forEach(dropdown => {
            dropdown.removeEventListener('click', () => {
                if (dropdown.firstElementChild.classList.contains('fa-chevron-down')) {
                    closeDropdown(dropdown);
                } else {
                    openDropdown(dropdown, dropdownBtns);
                }
            })
        })
        subDropdowns.forEach(sub => {
            sub.removeEventListener('click', () => {
                if (sub.firstElementChild.classList.contains('fa-chevron-down')) {
                    closeDropdown(sub);
                } else {
                    openDropdown(sub, subDropdowns);
                }
            })
        })

        // Add back the listeners
        dropdownBtns.forEach(dropdown => {
            const content = dropdown.parentElement.nextElementSibling;
            hideFocus(content);
            dropdown.addEventListener('click', () => {
                if (dropdown.firstElementChild.classList.contains('fa-chevron-down')) {
                    closeDropdown(dropdown);
                } else {
                    openDropdown(dropdown, dropdownBtns);
                }
            })
        })
        subDropdowns.forEach(sub => {
            const content = sub.parentElement.nextElementSibling;
            hideFocus(content);
            sub.addEventListener('click', () => {
                if (sub.firstElementChild.classList.contains('fa-chevron-down')) {
                    closeDropdown(sub);
                } else {
                    openDropdown(sub, subDropdowns);
                }
            })
        })
    }

    analysisNextBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            isSlideTransitioning = true;
            btn.disabled = true;
            analysisPrevBtn[i].disabled = true;

            if (i === 0) {
                clearSlideClasses(analysis1, analysis1Slide);
                setTimeout(() => {
                    const nextIndex = (analysis1Slide + 1) % analysis1.length;
                    analysis1Slide = nextIndex;
                    showAnalysis1();
                }, 501)
            }
            else if (i === 1) {
                clearSlideClasses(analysis2, analysis2Slide);
                setTimeout(() => {
                    const nextIndex = (analysis2Slide + 1) % analysis2.length;
                    analysis2Slide = nextIndex;
                    showAnalysis2();
                }, 501)
            }
            else if (i === 2) {
                clearSlideClasses(analysis3, analysis3Slide);
                setTimeout(() => {
                    const nextIndex = (analysis3Slide + 1) % analysis3.length;
                    analysis3Slide = nextIndex;
                    showAnalysis3();
                }, 501)
            }
            else {
                clearSlideClasses(hireSlides, hireSlideIndex);
                setTimeout(() => {
                    const nextIndex = (hireSlideIndex + 1) % hireSlides.length;
                    hireSlideIndex = nextIndex;
                    showHireSlides();
                }, 501)
            }
        })
    })

    analysisPrevBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            isSlideTransitioning = true;
            btn.disabled = true;
            analysisPrevBtn[i].disabled = true;
            if (i === 0) {
                clearSlideClasses(analysis1, analysis1Slide);
                setTimeout(() => {
                    const prevIndex = (analysis1Slide - 1 + analysis1.length) % analysis1.length;
                    analysis1Slide = prevIndex;
                    showAnalysis1();
                }, 501)
            }
            else if (i === 1) {
                clearSlideClasses(analysis2, analysis2Slide);
                setTimeout(() => {
                    const prevIndex = (analysis2Slide - 1 + analysis2.length) % analysis2.length;
                    analysis2Slide = prevIndex;
                    showAnalysis2();
                }, 501)
            }
            else if (i === 2) {
                clearSlideClasses(analysis3, analysis3Slide);
                setTimeout(() => {
                    const prevIndex = (analysis3Slide - 1 + analysis3.length) % analysis3.length;
                    analysis3Slide = prevIndex;
                    showAnalysis3();
                }, 501)
            }
            else {
                clearSlideClasses(hireSlides, hireSlideIndex);
                setTimeout(() => {
                    const prevIndex = (hireSlideIndex - 1 + hireSlides.length) % hireSlides.length;
                    hireSlideIndex = prevIndex;
                    showHireSlides();
                }, 501)
            }
        })
    })

    analysisSourcesBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            handleAnalysisSourcesBtn(btn, i);
        })
    })

    showAnalysis1();
    showAnalysis2();
    showAnalysis3();
    showHireSlides();


    /*--------------------------------CONNECT SECTION--------------------------------*/

    // Caret dropdowns
    const connectDropdowns = document.querySelectorAll('.btn-dropdown-connect');

    connectDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            if (dropdown.firstElementChild.classList.contains('fa-chevron-down')) {
                closeDropdown(dropdown);
            } else {
                openDropdown(dropdown, connectDropdowns);
            }
        })
    })

    // Subscribe button
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const subscribeNote = document.querySelector('.contact-feedback');

    // determine which subscribe container is active
    function subscribeContainer() {
        const subscribeContainer = document.querySelector('.subscribe-container');
        const desktopTarget = document.querySelector('.subscribe-container-desktop');
        const mobileTarget = document.querySelector('.subscribe-container-mobile');

        if (mqPortrait.matches || mqLandscape.matches) {
            mobileTarget.appendChild(subscribeContainer);
        } else {
            desktopTarget.appendChild(subscribeContainer);
        }
    }

    subscribeContainer();

    mqPortrait.addEventListener('change', subscribeContainer);
    mqLandscape.addEventListener('change', subscribeContainer);

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Email validation
        if (!email.includes('@') || !email.includes('.') || email === '') {
            subscribeNote.style.opacity = '1';
            subscribeNote.textContent = 'Please enter a valid email address.'
            subscribeNote.style.color = 'red';
            return;
        }

        // Simulate Loading
        subscribeNote.style.opacity = '1';
        subscribeNote.textContent = 'Subscribing...';
        subscribeNote.style.color = 'var(--secondary-one)';

        try {
            const res = await fetch('/.netlify/functions/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                subscribeNote.textContent = 'Thank you for subscribing!';
                subscribeNote.style.color = 'var(--primary-one)';
                emailInput.value = '';
            } else {
                const errorText = await res.text();
                subscribeNote.textContent = `Error: ${errorText}`;
                subscribeNote.style.color = 'red';
            }
        } catch (error) {
            subscribeNote.textContent = 'Something went wrong. Please try again.';
            subscribeNote.style.color = 'red';
        }

        setTimeout(() => {
            subscribeNote.style.opacity = '0';
        }, 10000)
    });

    window.addEventListener('resize', subscribeContainer);



    /* -------------------- Light / Dark Mode Toggle --------------------- */

    const toggleBg = document.getElementById('toggle-switch');
    const slider = document.getElementById('slider');
    const sliderNote = document.getElementById('slider-note');
    const body = document.body;
    const mq = window.matchMedia("(max-width: 1700px)");
    const lightPref = window.matchMedia("(prefers-color-scheme: light)");
    let currentTheme = document.documentElement.getAttribute('data-theme');

    // Update toggle display
    function toggleTheme() {
        if (body.classList.contains('light')) {
            sliderNote.textContent = 'dark mode off';
            document.documentElement.setAttribute('data-theme', 'light');
            currentTheme = 'light';
        } else {
            sliderNote.textContent = 'dark mode on';
            document.documentElement.setAttribute('data-theme', 'dark');
            currentTheme = 'dark';
        }
    }

    // Confirm container location
    function toggleContainer() {
        const sliderContainer = document.querySelector('.container-slider');
        const sliderDesktop = document.getElementById('slider-desktop');
        const sliderMobile = document.getElementById('slider-mobile');

        if (mqPortrait.matches || mqLandscape.matches) {
            sliderMobile.appendChild(sliderContainer);
        } else {
            sliderDesktop.appendChild(sliderContainer);
        }
    }

    // Update toggle and theme to match user's browser preferences
    function updateToggle() {
        if (lightPref.matches) {
            slider.classList.add('light-mode-slider');
            body.classList.add('light');
            document.documentElement.classList.add('light');
        } else {
            slider.classList.remove('light-mode-slider');
            body.classList.remove('light');
            document.documentElement.classList.remove('light');
        }
    }

    toggleBg.addEventListener('click', () => {
        slider.classList.toggle('light-mode-slider');
        body.classList.toggle('light');
        document.documentElement.classList.toggle('light');
        toggleTheme();
    })

    toggleContainer();
    updateToggle();
    toggleTheme();

    mqPortrait.addEventListener('change', toggleContainer);
    mqLandscape.addEventListener('change', toggleContainer);
    lightPref.addEventListener('change', () => {
        updateToggle();
        toggleTheme();
    });

})