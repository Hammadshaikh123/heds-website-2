// ============================================================
// COMPLETE main.js (UPDATED & FIXED)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  
  // ---- Mobile Toggle (Clean CSS Class Toggle) ----
  var toggle = document.querySelector('.mobile-toggle, .hamburger, .nav-toggle');
  var links = document.querySelector('nav.links, .nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      // Class toggle karein taakay CSS overrides kaam karein aur inline styles mess na karein
      links.classList.toggle('active');
    });
  }

  // ---- Nav dropdown mobile (Accordion Fix) ----
  document.querySelectorAll('.nav-dropdown > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 1180) {
        e.preventDefault(); // Navigation/Refresh ko rokta hai
        e.stopPropagation(); // Event bubble hokar menu close nahi hone deta
        
        var parentDropdown = a.parentElement;
        
        // (Optional) Dusre sub-menus ko band karke sirf click waale ko open rakhta hai
        document.querySelectorAll('.nav-dropdown').forEach(function(item) {
          if (item !== parentDropdown) {
            item.classList.remove('open');
          }
        });

        parentDropdown.classList.toggle('open');
      }
    });
  });

  // ---- Close mobile menu when clicking outside ----
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 1180 && links && links.classList.contains('active')) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('active');
      }
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
