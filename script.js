/**
 * ePoster Help Center Theme — JavaScript
 *
 * Handles:
 * - Mobile nav toggle
 * - Smooth scroll for anchor links
 * - Active sidebar state on article pages
 * - Collapsible sidebar on mobile
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

  // --- Collapsible sidebar on mobile ---
  var sidebar = document.querySelector('.collapsible-sidebar');
  var sidebarTitle = sidebar ? sidebar.querySelector('.section-nav-title, h4') : null;

  if (sidebar && sidebarTitle && window.innerWidth <= 1024) {
    sidebar.classList.add('is-collapsed');

    sidebarTitle.style.cursor = 'pointer';
    sidebarTitle.addEventListener('click', function () {
      sidebar.classList.toggle('is-collapsed');
    });
  }

  // --- Home page sections accordion ---
  var sectionHeaders = document.querySelectorAll('.section-card__header');
  sectionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var card = header.closest('.section-card');
      if (!card) return;
      var isOpen = card.classList.toggle('is-open');
      header.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Auto-open the featured section ("Getting Started") on page load
  var featured = document.querySelector('.section-card--featured');
  if (featured) {
    featured.classList.add('is-open');
    var featuredHeader = featured.querySelector('.section-card__header');
    if (featuredHeader) featuredHeader.setAttribute('aria-expanded', 'true');
  }

  // --- Article vote buttons ---
  var voteButtons = document.querySelectorAll('.article-vote-up, .article-vote-down');
  voteButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var voteType = this.getAttribute('data-vote');
      var articleId = document.querySelector('[data-article-id]');

      if (articleId) {
        // Zendesk API handles votes via their built-in system
        // This just provides visual feedback
        voteButtons.forEach(function (b) {
          b.style.opacity = '0.5';
        });
        this.style.opacity = '1';
        this.style.borderColor = voteType === 'up'
          ? 'var(--eposter-500)'
          : '#ef4444';
      }
    });
  });

});