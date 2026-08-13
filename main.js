// ============================================================
// COMPLETE main.js (UPDATED & FIXED)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile Toggle (FIXED) ----
  var toggle = document.querySelector('.mobile-toggle, .hamburger, .nav-toggle, .menu-toggle');
  
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Multi-selector check taake HTML tag mismatch se script na ruke
      var links = document.querySelector('nav.links, .nav-links, .links, .nav-menu, .nav ul');
      if (!links) return;

      // Class toggle for CSS styling
      links.classList.toggle('active');
      toggle.classList.toggle('active');

      // Computed Display check taake style conflict na ho
      var currentDisplay = window.getComputedStyle(links).display;

      if (currentDisplay === 'none') {
        links.style.setProperty('display', 'flex', 'important');
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = '#0A1B33';
        links.style.padding = '20px 28px';
        links.style.gap = '18px';
        links.style.zIndex = '999';
        links.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
      } else {
        links.style.setProperty('display', 'none', 'important');
      }
    });
  }

  // ---- Scroll-reveal animations ----
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

  // ---- Carousel prev/next ----
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prev = carousel.querySelector('.carousel-prev');
    var next = carousel.querySelector('.carousel-next');
    if (!track) return;
    function scrollAmount() {
      var card = track.querySelector(':scope > *');
      return card ? card.getBoundingClientRect().width + 20 : 300;
    }
    if (prev) {
      prev.addEventListener('click', function () {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }
  });

  // ---- Nav dropdown mobile ----
  document.querySelectorAll('.nav-dropdown > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 1180) {
        e.preventDefault();
        e.stopPropagation();
        a.parentElement.classList.toggle('open');
      }
    });
  });
});

// ---- Lightbox functions (global) ----
function openLightbox(src) {
  var overlay = document.getElementById('lightbox-overlay');
  var img = document.getElementById('lightbox-img');
  if (!overlay || !img) return;
  img.src = src;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key and overlay click
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('lightbox-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
  }
});
