/**
 * ePoster Help Center Theme — JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile nav toggle ---
  var menuToggle = document.querySelector('.menu-toggle');
  var headerNav = document.querySelector('.header-nav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function () {
      headerNav.classList.toggle('is-open');
      menuToggle.setAttribute(
        'aria-expanded',
        headerNav.classList.contains('is-open')
      );
    });
  }

  // --- Smooth scroll for same-page anchors ---
  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active sidebar highlight ---
  var sidebarLinks = document.querySelectorAll('.article-sidebar a, .sidenav-link');
  var currentPath = window.location.pathname;

  sidebarLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // --- Article vote buttons ---
  var voteButtons = document.querySelectorAll('.article-vote-up, .article-vote-down');
  voteButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      voteButtons.forEach(function (b) { b.style.opacity = '0.5'; });
      this.style.opacity = '1';
    });
  });

  // ============================================================
  // HOME PAGE — chapter accordion
  // ============================================================

  var chapters = document.querySelectorAll('.chapter');
  if (!chapters.length) return;

  // Editorial kicker labels for known sections (graceful fallback for new sections)
  var KICKERS = {
    'Getting Started': 'Setup',
    'Managing Your Posters': 'Posters',
    'Breakroom Screens': 'Display',
    'Email Signing': 'Sign-off',
    'Widget': 'Embed'
  };

  var totalChapters = chapters.length;
  var totalStr = String(totalChapters).padStart(2, '0');

  chapters.forEach(function (chapter, i) {
    // Numbering: 01 / 05
    var numEl = chapter.querySelector('.chapter-num');
    if (numEl) numEl.textContent = String(i + 1).padStart(2, '0') + ' / ' + totalStr;

    // Kicker label
    var name = chapter.getAttribute('data-section-name') || '';
    var kicker = KICKERS[name];
    var kickerEl = chapter.querySelector('.chapter-kicker');
    if (kickerEl && kicker) kickerEl.textContent = kicker;
    if (kickerEl && !kicker) kickerEl.style.display = 'none';
  });

  // --- Lazy-load section articles via Help Center API ---
  function loadSectionArticles(chapter) {
    var list = chapter.querySelector('.chapter-articles');
    if (!list || list.getAttribute('data-loaded') === 'true') return;
    var sectionId = list.getAttribute('data-section-articles');
    if (!sectionId) return;
    list.setAttribute('data-loaded', 'true');

    var locale = (document.documentElement.lang || 'en-us').toLowerCase();
    var url = '/api/v2/help_center/' + locale + '/sections/' + sectionId + '/articles.json?per_page=8&sort_by=position';

    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var articles = (data && data.articles) || [];
        var count = (data && data.count) || articles.length;

        // Update tag count
        var countEl = chapter.querySelector('.chapter-count');
        if (countEl) countEl.textContent = count + (count === 1 ? ' article' : ' articles');

        // Update view-all label
        var viewAll = chapter.querySelector('.chapter-view-all');
        if (viewAll) viewAll.innerHTML = 'View all ' + count + ' articles &rarr;';

        if (!articles.length) {
          list.innerHTML = '<li class="chapter-articles-empty">No articles in this section yet.</li>';
          return;
        }

        list.innerHTML = articles.map(function () {
          return '<li><a class="chapter-article-link" href="">' +
            '<span></span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            '</a></li>';
        }).join('');

        var links = list.querySelectorAll('.chapter-article-link');
        links.forEach(function (link, i) {
          link.setAttribute('href', articles[i].html_url);
          link.querySelector('span').textContent = articles[i].title;
        });
      })
      .catch(function () {
        list.innerHTML = '<li class="chapter-articles-empty">Unable to load articles.</li>';
      });
  }

  // Pre-fetch counts for all chapters so the tag row shows real numbers
  chapters.forEach(function (chapter) {
    var sectionId = chapter.querySelector('.chapter-articles');
    if (!sectionId) return;
    var id = sectionId.getAttribute('data-section-articles');
    if (!id) return;
    var locale = (document.documentElement.lang || 'en-us').toLowerCase();
    fetch('/api/v2/help_center/' + locale + '/sections/' + id + '/articles.json?per_page=1', {
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var count = (data && data.count) || 0;
        var countEl = chapter.querySelector('.chapter-count');
        if (countEl) countEl.textContent = count + (count === 1 ? ' article' : ' articles');
      })
      .catch(function () { /* ignore */ });
  });

  // Toggle handlers
  var rows = document.querySelectorAll('.chapter-row');
  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      var chapter = row.closest('.chapter');
      if (!chapter) return;
      var open = chapter.classList.toggle('is-open');
      row.setAttribute('aria-expanded', String(open));
      if (open) loadSectionArticles(chapter);
    });
  });

  // Auto-open the featured chapter
  var featured = document.querySelector('.chapter--featured');
  if (featured) {
    featured.classList.add('is-open');
    var featuredRow = featured.querySelector('.chapter-row');
    if (featuredRow) featuredRow.setAttribute('aria-expanded', 'true');
    loadSectionArticles(featured);
  }

});
