// ============================================================
//  APP.JS — Sullivan Sextius Book Library
// ============================================================

/* ---- STATE ---- */
let currentPage = 'home';
let currentCategory = 'all';
let currentSort = 'title';
let previousPage = 'home';

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHomePage();
  initCategoriesPage();
  initRecommendationsPage();
  animateCounter();
});

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
}

function handleSearch(val) {
  if (!val.trim()) return;
  const query = val.toLowerCase();
  const results = BOOKS.filter(b =>
    b.title.toLowerCase().includes(query) ||
    b.author.toLowerCase().includes(query) ||
    b.tags.some(t => t.toLowerCase().includes(query)) ||
    getCategoryLabel(b.category).toLowerCase().includes(query)
  );
  renderSearchResults(results, val);
  showPage('search');
}

function renderSearchResults(books, query) {
  document.getElementById('searchResultCount').textContent =
    `${books.length} résultat${books.length !== 1 ? 's' : ''} pour "${query}"`;
  const grid = document.getElementById('searchResults');
  grid.innerHTML = books.length > 0
    ? books.map((b, i) => bookCardHTML(b, i)).join('')
    : emptyStateHTML('Aucun résultat', 'Essaie un autre mot-clé.');
  addCardListeners(grid);
}

/* ============================================================
   PAGE ROUTING
   ============================================================ */
function showPage(name) {
  previousPage = currentPage;
  currentPage = name;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${name}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Set back button behaviour
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = () => showPage(previousPage);
  }

  // Close mobile menu if open
  document.getElementById('mobileMenu').classList.remove('open');

  // Re-trigger animations
  if (name !== 'book') {
    triggerCardAnimations(`page-${name}`);
  }
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ============================================================
   HOME
   ============================================================ */
function initHomePage() {
  renderFloatingBooks();
  renderCategoriesGrid();
  renderFeaturedBooks();
  renderLatestBooks();
}

function renderFloatingBooks() {
  const container = document.getElementById('floatingBooks');
  if (!container) return;
  const sample = BOOKS.slice(0, 5);
  container.innerHTML = sample.map(b => `
    <div class="floating-book" onclick="openBook(${b.id})" title="${b.title}">
      ${b.cover
        ? `<img src="${b.cover}" alt="${b.title}" loading="lazy" onerror="this.parentNode.innerHTML='<div class=\'fb-color\' style=\'background:${b.coverColor}\'>${b.title}</div>'">`
        : `<div class="fb-color" style="background:${b.coverColor}">${b.title}</div>`
      }
    </div>
  `).join('');
}

function renderCategoriesGrid() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = BOOKS.filter(b => b.category === cat.id).length;
    return `
      <div class="cat-card" onclick="showCategoryPage('${cat.id}')" style="--cat-color:${cat.color}">
        <div class="cat-emoji">${cat.emoji}</div>
        <div class="cat-name">${cat.label}</div>
        <div class="cat-count">${count} livre${count !== 1 ? 's' : ''}</div>
      </div>
    `;
  }).join('');
}

function renderFeaturedBooks() {
  const container = document.getElementById('featuredBooks');
  if (!container) return;
  const featured = BOOKS.filter(b => b.featured);
  container.innerHTML = featured.map((b, i) => featuredCardHTML(b, i)).join('');
  addFeaturedListeners(container);
}

function renderLatestBooks() {
  const grid = document.getElementById('latestBooks');
  if (!grid) return;
  const latest = [...BOOKS]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .filter(b => b.recent)
    .slice(0, 8);
  grid.innerHTML = latest.map((b, i) => bookCardHTML(b, i)).join('');
  addCardListeners(grid);
}

/* ============================================================
   CATEGORIES PAGE
   ============================================================ */
function initCategoriesPage() {
  renderFilterTabs();
  renderAllBooks();
}

function showCategoryPage(catId) {
  currentCategory = catId;
  showPage('categories');
  renderFilterTabs();
  renderAllBooks();
}

function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container) return;
  const tabs = [{ id: 'all', label: 'Tous' }, ...CATEGORIES];
  container.innerHTML = tabs.map(cat => {
    const count = cat.id === 'all'
      ? BOOKS.length
      : BOOKS.filter(b => b.category === cat.id).length;
    return `
      <button class="filter-tab ${cat.id === currentCategory ? 'active' : ''}"
        onclick="filterByCategory('${cat.id}')">
        ${cat.emoji ? cat.emoji + ' ' : ''}${cat.label} <span style="opacity:.5;margin-left:4px">${count}</span>
      </button>
    `;
  }).join('');
}

function filterByCategory(catId) {
  currentCategory = catId;
  renderFilterTabs();
  renderAllBooks();
}

function applySort() {
  currentSort = document.getElementById('sortSelect')?.value || 'title';
  renderAllBooks();
}

function renderAllBooks() {
  const grid = document.getElementById('allBooksGrid');
  if (!grid) return;

  let books = currentCategory === 'all'
    ? [...BOOKS]
    : BOOKS.filter(b => b.category === currentCategory);

  // Sort
  if (currentSort === 'title') books.sort((a, b) => a.title.localeCompare(b.title));
  if (currentSort === 'rating') books.sort((a, b) => b.rating - a.rating);
  if (currentSort === 'recent') books.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));

  grid.innerHTML = books.length > 0
    ? books.map((b, i) => bookCardHTML(b, i)).join('')
    : emptyStateHTML('Aucun livre dans cette catégorie', 'Reviens bientôt !');
  addCardListeners(grid);
}

/* ============================================================
   RECOMMENDATIONS PAGE
   ============================================================ */
function initRecommendationsPage() {
  const container = document.getElementById('recoBooks');
  if (!container) return;
  const recos = BOOKS.filter(b => b.featured).sort((a, b) => b.rating - a.rating);
  container.innerHTML = recos.map((b, i) => featuredCardHTML(b, i)).join('');
  addFeaturedListeners(container);
}

/* ============================================================
   BOOK DETAIL
   ============================================================ */
function openBook(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const cat = CATEGORIES.find(c => c.id === book.category);
  const detail = document.getElementById('bookDetail');

  detail.innerHTML = `
    <div class="bd-cover">
      <div class="bd-cover-img">
        ${book.cover
          ? `<img src="${book.cover}" alt="${book.title}" onerror="this.parentNode.innerHTML='<div class=\'bd-cover-fallback\' style=\'background:${book.coverColor}\'>${book.title}</div>'">`
          : `<div class="bd-cover-fallback" style="background:${book.coverColor}">${book.title}</div>`
        }
      </div>
      <div class="bd-actions">
        ${book.amazon ? `<a href="${book.amazon}" target="_blank" class="btn-primary">🛒 Acheter le livre</a>` : ''}
        ${book.tiktok ? `<a href="${book.tiktok}" target="_blank" class="btn-ghost">▶ Voir ma vidéo TikTok</a>` : ''}
      </div>
    </div>
    <div class="bd-content">
      <div class="bd-badge" style="background:${cat?.color}22;color:${cat?.color}">
        ${cat?.emoji || ''} ${cat?.label || book.category}
      </div>
      <h1 class="bd-title">${book.title}</h1>
      <p class="bd-author">${book.author}</p>
      <div class="bd-rating">
        ${starsHTML(book.rating, 20)}
      </div>

      <div class="bd-section-label">Résumé</div>
      <p class="bd-summary">${book.summary}</p>

      <div class="bd-section-label">Ma recommandation</div>
      <div class="bd-reco-block">
        <p class="bd-reco-text">"${book.recommendation}"</p>
      </div>

      ${book.tags?.length ? `
        <div class="bd-tags">
          ${book.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      ` : ''}

      ${book.tiktok ? `
        <div class="bd-tiktok">
          <div class="bd-tiktok-label">Vidéo TikTok associée</div>
          <a href="${book.tiktok}" target="_blank" class="bd-tiktok-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.79a4.85 4.85 0 01-1.01-.1z"/></svg>
            @sullivan.sextius — Regarder la vidéo
          </a>
        </div>
      ` : ''}
    </div>
  `;

  showPage('book');
}

/* ============================================================
   HELPERS — HTML GENERATORS
   ============================================================ */
function starsHTML(rating, size = 14) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star ${i < rating ? 'filled' : ''}" style="font-size:${size}px">★</span>`
  ).join('');
}

function getCategoryLabel(catId) {
  return CATEGORIES.find(c => c.id === catId)?.label || catId;
}

function getCategoryColor(catId) {
  return CATEGORIES.find(c => c.id === catId)?.color || '#888';
}

function getCategoryEmoji(catId) {
  return CATEGORIES.find(c => c.id === catId)?.emoji || '';
}

function bookCardHTML(book, index) {
  const catColor = getCategoryColor(book.category);
  const catLabel = getCategoryLabel(book.category);
  return `
    <div class="book-card" data-id="${book.id}" style="animation-delay:${index * 0.06}s">
      <div class="book-cover">
        ${book.cover
          ? `<img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
          : ''
        }
        <div class="book-cover-fallback" style="background:${book.coverColor};display:${book.cover ? 'none' : 'flex'}">
          ${book.title}
        </div>
        <div class="book-cover-overlay">
          <span class="book-cover-cta">Voir le livre</span>
        </div>
      </div>
      <div class="book-info">
        <span class="book-category-badge" style="background:${catColor}22;color:${catColor}">
          ${catLabel}
        </span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-rating">${starsHTML(book.rating, 11)}</div>
      </div>
    </div>
  `;
}

function featuredCardHTML(book, index) {
  const catColor = getCategoryColor(book.category);
  const catLabel = getCategoryLabel(book.category);
  return `
    <div class="book-card-featured" data-id="${book.id}" style="animation-delay:${index * 0.08}s">
      <div class="bfc-cover">
        ${book.cover
          ? `<img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
          : ''
        }
        <div class="bfc-cover-fallback" style="background:${book.coverColor};display:${book.cover ? 'none' : 'flex'}">
          ${book.title}
        </div>
      </div>
      <div class="bfc-content">
        <span class="bfc-tag" style="color:${catColor}">${catLabel}</span>
        <h3 class="bfc-title">${book.title}</h3>
        <p class="bfc-author">${book.author}</p>
        <p class="bfc-summary">${book.summary}</p>
        <div class="bfc-footer">
          <div class="bfc-rating">${starsHTML(book.rating, 13)}</div>
          <div class="bfc-arrow">→</div>
        </div>
      </div>
    </div>
  `;
}

function emptyStateHTML(title, sub) {
  return `<div class="empty-state" style="grid-column:1/-1"><h3>${title}</h3><p>${sub}</p></div>`;
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function addCardListeners(container) {
  container.querySelectorAll('[data-id]').forEach(card => {
    card.addEventListener('click', () => openBook(Number(card.dataset.id)));
  });
}

function addFeaturedListeners(container) {
  container.querySelectorAll('[data-id]').forEach(card => {
    card.addEventListener('click', () => openBook(Number(card.dataset.id)));
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounter() {
  const el = document.getElementById('totalBooks');
  if (!el) return;
  const target = BOOKS.length;
  let current = 0;
  const step = Math.ceil(target / 20);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 60);
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function triggerCardAnimations(pageId) {
  const page = document.getElementById(pageId);
  if (!page) return;
  page.querySelectorAll('.book-card, .book-card-featured, .cat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.animation = 'none';
    requestAnimationFrame(() => {
      el.style.animation = `fadeUp 0.5s ease ${i * 0.05}s forwards`;
    });
  });
}

// Intersection Observer for scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Observe sections periodically
setInterval(() => {
  document.querySelectorAll('.section').forEach(section => observer.observe(section));
}, 500);
