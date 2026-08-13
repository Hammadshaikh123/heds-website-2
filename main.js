// ============================================================
// COMPLETE main.js (100% WORKING & BULLETPROOF FIX)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile Menu Toggle Fix ----
  var toggleBtn = document.querySelector('.mobile-toggle, #hamburger-btn, .hamburger, .nav-toggle, .menu-toggle');
  var navLinks = document.querySelector('nav.links, #mobile-nav-links, .nav-links, .links, .nav-menu');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var isActive = navLinks.classList.toggle('active');
      toggleBtn.classList.toggle('active');

      // Direct inline css force overrides (CSS conflicts bypass karne ke liye)
      if (isActive) {
        navLinks.style.cssText = "display: flex !important; flex-direction: column !important; position: absolute !important; top: 100% !important; left: 0 !important; right: 0 !important; width: 100% !important; background: #0A1B33 !important; padding: 20px 24px !important; gap: 16px !important; z-index: 99999 !important; box-shadow: 0 15px 35px rgba(0,0,0,0.6) !important;";
      } else {
        navLinks.style.cssText = "";
      }
    });

    // Outside click par menu auto-close karne ka logic
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
          navLinks.classList.remove('active');
          toggleBtn.classList.remove('active');
          navLinks.style.cssText = "";
        }
      }
    });
  }

  // ---- Nav Sub-dropdown Mobile Toggle (Study Destinations sub-menu fix) ----
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(':scope > a');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 1180) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('open');

          var subMenu = dropdown.querySelector('.nav-dropdown-menu');
          if (subMenu) {
            if (dropdown.classList.contains('open')) {
              subMenu.style.cssText = "display: flex !important; flex-direction: column !important; position: static !important; background: rgba(255,255,255,0.05) !important; padding: 12px 16px !important; margin-top: 10px !important; border-radius: 8px !important; gap: 10px !important;";
            } else {
              subMenu.style.cssText = "";
            }
          }
        }
      });
    }
  });

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
