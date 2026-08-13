// ============================================================
// COMPLETE main.js (CLEANED & FIXED)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  
  // ---- 1. Mobile Menu Toggle Fix ----
  const toggleBtn = document.querySelector('.mobile-toggle, #hamburger-btn, .hamburger, .nav-toggle, .menu-toggle');
  const navLinks = document.querySelector('nav.links, #mobile-nav-links, .nav-links, .links, .nav-menu');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Simple CSS Class Toggle (CSS handles display flex automatically)
      navLinks.classList.toggle('active');
      toggleBtn.classList.toggle('active');
    });

    // Outside click auto-close logic
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
          navLinks.classList.remove('active');
          toggleBtn.classList.remove('active');
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
        // Sirf mobile/tablet break-point par default navigation rokna hai
        if (window.innerWidth <= 1180) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // ---- 3. Screen Resize Auto-Reset Fix ----
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180) {
      if (navLinks) {
        navLinks.classList.remove('active');
      }
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
      }
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove('open');
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
