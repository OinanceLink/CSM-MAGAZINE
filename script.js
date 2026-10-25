/* ========================================
   CSM — CELEB STYLE MAGAZINE
   Main JavaScript
======================================== */

"use strict";

/* ----------------------------------------
   1. DEMO STORIES
   These are sample stories for testing.
   Replace them with real, verified news
   before publishing them as news.
---------------------------------------- */

const stories = [
  {
    title: "The Biggest Celebrity Style Moments Making Headlines",
    category: "Fashion",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    description: "A look at the fashion choices and standout moments attracting attention across the entertainment world.",
    slug: "celebrity-style-moments",
    section: "latest"
  },
  {
    title: "African Stars Continue to Influence Global Entertainment",
    category: "African Stars",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    description: "African entertainers continue to build international audiences through music, film, fashion and culture.",
    slug: "african-stars-global-entertainment",
    section: "african-stars"
  },
  {
    title: "Hollywood's Red Carpet Style Gets Everyone Talking",
    category: "Hollywood",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    description: "Red carpet appearances remain a major part of celebrity culture and fashion conversations.",
    slug: "hollywood-red-carpet-style",
    section: "hollywood"
  },
  {
    title: "The Fashion Trends Shaping Celebrity Wardrobes",
    category: "Fashion",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    description: "Explore some of the styles influencing modern celebrity wardrobes and fashion inspiration.",
    slug: "celebrity-fashion-trends",
    section: "fashion"
  },
  {
    title: "Inside the Changing World of Global Entertainment",
    category: "Entertainment",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    description: "Entertainment continues to evolve as performers connect with fans across borders and platforms.",
    slug: "global-entertainment",
    section: "entertainment"
  },
  {
    title: "Celebrity Lifestyle: The People and Places in the Spotlight",
    category: "Lifestyle",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description: "A closer look at the lifestyle themes and personal brands associated with celebrity culture.",
    slug: "celebrity-lifestyle",
    section: "lifestyle"
  },
  {
    title: "New Voices From Africa Reach International Audiences",
    category: "African Stars",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    description: "Artists and entertainers from across Africa are finding new ways to connect with audiences worldwide.",
    slug: "new-african-entertainment-voices",
    section: "african-stars"
  },
  {
    title: "The Art of Making a Memorable Fashion Statement",
    category: "Fashion",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "Personal style, creative design and confident presentation all play a role in fashion culture.",
    slug: "memorable-fashion-statements",
    section: "fashion"
  },
  {
    title: "The Celebrity Stories Fans Are Following",
    category: "Entertainment",
    author: "CSM Editorial",
    date: "October 25, 2026",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    description: "Celebrity culture connects audiences with entertainment, creativity and stories from around the world.",
    slug: "celebrity-stories-fans-follow",
    section: "entertainment"
  }
];

/* ----------------------------------------
   2. HELPER FUNCTIONS
---------------------------------------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function createStoryCard(story) {
  const title = escapeHTML(story.title);
  const category = escapeHTML(story.category);
  const author = escapeHTML(story.author);
  const date = escapeHTML(story.date);
  const image = escapeHTML(story.image);
  const description = escapeHTML(story.description);

  /*
   * article.html will need to be created separately.
   * Until then, these links are placeholders.
   */
  const articleLink = "article.html?story=" +
    encodeURIComponent(story.slug);

  return `
    <article class="story-card">
      <a href="${articleLink}" aria-label="${title}">
        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          onerror="this.style.display='none'"
        >
      </a>

      <span class="story-category">${category}</span>

      <h3>
        <a href="${articleLink}">${title}</a>
      </h3>

      <p class="description">${description}</p>

      <div class="story-meta">
        <span>${author}</span>
        <span>${date}</span>
      </div>
    </article>
  `;
}

/* ----------------------------------------
   3. RENDER STORIES
---------------------------------------- */

function renderStories() {
  const sectionMap = {
    latest: "latestGrid",
    "african-stars": "africanGrid",
    hollywood: "hollywoodGrid",
    fashion: "fashionGrid",
    entertainment: "entertainmentGrid",
    lifestyle: "lifestyleGrid"
  };

  Object.entries(sectionMap).forEach(function ([section, elementId]) {
    const container = document.getElementById(elementId);

    if (!container) {
      return;
    }

    const sectionStories = stories.filter(function (story) {
      return section === "latest" || story.section === section;
    });

    if (sectionStories.length === 0) {
      container.innerHTML =
        '<p class="empty-state">Stories will appear here soon.</p>';
      return;
    }

    container.innerHTML = sectionStories
      .map(createStoryCard)
      .join("");
  });
}

/* ----------------------------------------
   4. SEARCH
---------------------------------------- */

function setupSearch() {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchStatus = document.getElementById("searchStatus");

  if (!searchForm || !searchInput) {
    return;
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      if (searchStatus) {
        searchStatus.textContent = "Enter a celebrity, topic or keyword.";
        searchStatus.classList.add("visible");
      }

      return;
    }

    const results = stories.filter(function (story) {
      const searchableText = [
        story.title,
        story.category,
        story.description,
        story.author
      ].join(" ").toLowerCase();

      return searchableText.includes(query);
    });

    if (searchStatus) {
      searchStatus.classList.add("visible");

      if (results.length > 0) {
        searchStatus.textContent =
          results.length + " result(s) found for \"" +
          searchInput.value.trim() + "\".";
      } else {
        searchStatus.textContent =
          "No stories found for \"" +
          searchInput.value.trim() + "\".";
      }
    }

    const latestGrid = document.getElementById("latestGrid");

    if (latestGrid) {
      latestGrid.innerHTML = results.length
        ? results.map(createStoryCard).join("")
        : '<p class="empty-state">No matching stories found. Try another keyword.</p>';

      const latestSection = document.getElementById("latest");

      if (latestSection) {
        latestSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });

  searchInput.addEventListener("input", function () {
    if (!searchInput.value.trim() && searchStatus) {
      searchStatus.textContent = "";
      searchStatus.classList.remove("visible");
      renderStories();
    }
  });
}

/* ----------------------------------------
   5. MOBILE NAVIGATION
---------------------------------------- */

function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "CLOSE ✕" : "MENU ☰";
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "MENU ☰";
    });
  });
}

/* ----------------------------------------
   6. NEWSLETTER FORM
---------------------------------------- */

function setupNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterNote = document.getElementById("newsletterNote");

  if (!newsletterForm || !newsletterEmail || !newsletterNote) {
    return;
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email || !newsletterEmail.checkValidity()) {
      newsletterNote.textContent =
        "Please enter a valid email address.";
      return;
    }

    /*
     * This is only a front-end demonstration.
     * It does not save email addresses or send newsletters.
     */
    newsletterNote.textContent =
      "Thank you for your interest in CSM! Newsletter subscriptions are not active yet.";

    newsletterForm.reset();
  });
}

/* ----------------------------------------
   7. FOOTER YEAR
---------------------------------------- */

function setupFooterYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ----------------------------------------
   8. START THE WEBSITE
---------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  renderStories();
  setupSearch();
  setupMobileMenu();
  setupNewsletter();
  setupFooterYear();

  console.log("CSM — Celeb Style Magazine is ready.");
});
