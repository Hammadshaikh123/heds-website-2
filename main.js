// ===== MOBILE MENU (NEW) =====
document.addEventListener('DOMContentLoaded', function () {
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var destToggle = document.getElementById('destToggle');
  var destSubmenu = document.getElementById('destSubmenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Study Destinations submenu toggle
    if (destToggle && destSubmenu) {
      destToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        destToggle.classList.toggle('expanded');
        destSubmenu.classList.toggle('open');
      });
    }

    // Close menu when any submenu link or nav link is clicked
    mobileMenu.querySelectorAll('.mobile-submenu-inner a, .mobile-menu-link:not(#destToggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (mobileToggle && mobileMenu) {
      if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
});

// ===== SCROLL-REVEAL ENTRANCE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function () {
  var selector = [
    '.why-card', '.service-card', '.country-card', '.blog-card',
    '.story-card', '.gr-card', '.team-card', '.fact-card', '.assess-card',
    '.step', '.section-head', '.vc-section', '.cta-band'
  ].join(',');

  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  var counters = new WeakMap();

  els.forEach(function (el) {
    var parent = el.parentElement;
    var idx = counters.get(parent) || 0;
    counters.set(parent, idx + 1);
    el.setAttribute('data-animate', '');
    el.style.transitionDelay = (Math.min(idx, 5) * 0.09) + 's';
  });

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in-view'); });
  }
});

// ===== CAROUSEL PREV/NEXT BUTTONS =====
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prev = carousel.querySelector('.carousel-prev');
    var next = carousel.querySelector('.carousel-next');
    if (!track) return;
    function scrollAmount() {
      var card = track.querySelector(':scope > *');
      return card ? card.getBoundingClientRect().width + 20 : 300;
    }
    if (prev) prev.addEventListener('click', function () {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', function () {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });
});

// ===== NAV DROPDOWN TAP-TO-OPEN ON MOBILE (Desktop hover still works via CSS) =====
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-dropdown > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 1180) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });
});
