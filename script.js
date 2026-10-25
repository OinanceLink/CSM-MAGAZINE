/* ========================================
   CSM — CELEB STYLE MAGAZINE
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE NAVIGATION */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("nav-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "CLOSE" : "MENU";
        });
    }


    /* SEARCH PANEL */

    const searchButton = document.querySelector(".search-button");
    const searchPanel = document.querySelector(".search-panel");
    const searchInput = document.querySelector("#site-search");

    if (searchButton && searchPanel) {
        searchButton.addEventListener("click", function () {
            const isVisible = searchPanel.classList.toggle("show");

            searchButton.setAttribute("aria-expanded", String(isVisible));

            if (isVisible && searchInput) {
                searchInput.focus();
            }
        });
    }


    /* LIVE STORY SEARCH */

    const searchForm = document.querySelector(".search-form");
    const storyCards = document.querySelectorAll(".story-card");
    const storySections = document.querySelectorAll("[data-search-section]");

    function searchStories(searchTerm) {
        const term = searchTerm.trim().toLowerCase();
        let visibleCount = 0;

        storyCards.forEach(function (card) {
            const searchableText = card.textContent.toLowerCase();
            const matches = searchableText.includes(term);

            card.style.display = matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }
        });

        storySections.forEach(function (section) {
            const cards = section.querySelectorAll(".story-card");
            const visibleCards = Array.from(cards).filter(function (card) {
                return card.style.display !== "none";
            });

            section.style.display =
                cards.length === 0 || visibleCards.length > 0 ? "" : "none";
        });

        let message = document.querySelector(".search-result-message");

        if (!message && searchForm) {
            message = document.createElement("p");
            message.className = "search-result-message";
            message.setAttribute("role", "status");
            searchForm.insertAdjacentElement("afterend", message);
        }

        if (message) {
            if (!term) {
                message.textContent = "";
            } else if (visibleCount === 0) {
                message.textContent = "No stories found. Try another search.";
            } else {
                message.textContent =
                    visibleCount + (visibleCount === 1
                        ? " story found."
                        : " stories found.");
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            searchStories(searchInput.value);
        });
    }

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (searchInput) {
                searchStories(searchInput.value);

                const firstVisibleCard = Array.from(storyCards).find(
                    function (card) {
                        return card.style.display !== "none";
                    }
                );

                if (firstVisibleCard) {
                    firstVisibleCard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }
        });
    }


    /* CURRENT YEAR IN FOOTER */

    const yearElements = document.querySelectorAll("[data-current-year]");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });


    /* BACK TO TOP */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* CLOSE MOBILE MENU AFTER SELECTING A LINK */

    if (mainNav) {
        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (window.innerWidth <= 600) {
                    mainNav.classList.remove("nav-open");

                    if (menuToggle) {
                        menuToggle.textContent = "MENU";
                        menuToggle.setAttribute("aria-expanded", "false");
                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );
                    }
                }
            });
        });
    }


    /* NEWSLETTER FORM NOTICE */

    const newsletterForm = document.querySelector(".newsletter-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = newsletterForm.querySelector(
                'input[type="email"]'
            );

            if (!emailInput || !emailInput.checkValidity()) {
                if (emailInput) {
                    emailInput.reportValidity();
                }

                return;
            }

            alert(
                "Thank you for your interest in CSM! " +
                "Newsletter subscriptions are not connected yet."
            );
        });
    }

});
