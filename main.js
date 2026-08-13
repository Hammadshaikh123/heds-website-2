// ============================================================
// COMPLETE main.js (OPTIMIZED & BULLETPROOF)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  
  // ---- 1. Mobile Menu Toggle Fix ----
  const toggleBtn = document.querySelector('.mobile-toggle, #hamburger-btn, .hamburger, .nav-toggle, .menu-toggle');
  const navLinks = document.querySelector('nav.links, #mobile-nav-links, .nav-links, .links, .nav-menu');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isActive = navLinks.classList.toggle('active');
      toggleBtn.classList.toggle('active');

      // Direct inline css force overrides
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

  // ---- 2. Nav Sub-dropdown Mobile Toggle ----
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector(':scope > a');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 1180) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('open');

          const subMenu = dropdown.querySelector('.nav-dropdown-menu');
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

  // ---- 3. Screen Resize Auto-Reset Fix ----
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180) {
      if (navLinks) {
        navLinks.classList.remove('active');
        navLinks.style.cssText = "";
      }
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
      }
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove('open');
        const subMenu = dropdown.querySelector('.nav-dropdown-menu');
        if (subMenu) subMenu.style.cssText = "";
      });
    }
  });

  // ---- 4. Scroll-reveal Animations ----
  const selector = [
    '.why-card', '.service-card', '.country-card', '.blog-card',
    '.story-card', '.gr-card', '.team-card', '.fact-card', '.assess-card',
    '.step', '.section-head', '.vc-section', '.cta-band'
  ].join(',');

  const els = Array.prototype.slice.call(document.querySelectorAll(selector));
  const counters = new WeakMap();

  els.forEach(function (el) {
    const parent = el.parentElement;
    const idx = counters.get(parent) || 0;
    counters.set(parent, idx + 1);
    el.setAttribute('data-animate', '');
    el.style.transitionDelay = (Math.min(idx, 5) * 0.09) + 's';
  });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
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

  // ---- 5. Carousel Prev/Next ----
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    if (!track) return;

    function scrollAmount() {
      const card = track.querySelector(':scope > *');
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

  // ---- 6. Lightbox Overlay Click ----
  const overlay = document.getElementById('lightbox-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
  }
});

// ---- Lightbox Global Functions ----
function openLightbox(src) {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  if (!overlay || !img) return;
  img.src = src;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
