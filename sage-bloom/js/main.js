/* ============================================================
   THE SAGE & BLOOM PRACTICE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL BEHAVIOUR ──────────────────────────────── */

  const nav        = document.getElementById('mainNav');
  const backToTop  = document.getElementById('backToTop');
  const footer     = document.querySelector('.footer');

  const getScrollOffset = () => {
    if (window.visualViewport && typeof window.visualViewport.pageTop === 'number') {
      return window.visualViewport.pageTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop;
  };

  const updateScrollState = () => {
    const offset = getScrollOffset();
    const scrolled = offset > 60;
    nav.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', offset > 400);
  };

  // Suppress transitions until after browser scroll restoration has settled (~200ms)
  nav.classList.add('no-transition');
  requestAnimationFrame(() => {
    updateScrollState();
    setTimeout(() => nav.classList.remove('no-transition'), 200);
  });

  window.addEventListener('scroll', () => {
    updateScrollState();

    // When footer is in view, move button up so it sits above the footer
    if (backToTop && footer) {
      const footerTop = footer.getBoundingClientRect().top;
      const gap = 16;
      if (footerTop < window.innerHeight) {
        backToTop.style.bottom = Math.max(32, window.innerHeight - footerTop + gap) + 'px';
      } else {
        backToTop.style.bottom = '';
      }
    }
  }, { passive: true });


  /* ── HERO PARALLAX ZOOM ────────────────────────────────── */

  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    // Slight delay lets the browser paint first for a smooth
    // zoom-out entrance effect via the CSS transition.
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }


  /* ── BURGER / MOBILE MENU ──────────────────────────────── */

  const burgerBtn  = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    burgerBtn.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  // Close when any mobile link is tapped
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── SCROLL REVEAL ─────────────────────────────────────── */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ── CONTACT FORM ──────────────────────────────────────── */

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Message sent ✓';
      btn.style.background = 'var(--sage-dark)';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }


  /* ── BACK TO TOP ───────────────────────────────────────── */

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ── ACCORDION ─────────────────────────────────────────── */

  const accordionHeaders = document.querySelectorAll('.accordion-header');

  const toggleAccordion = (event) => {
    if (event.type === 'touchend') {
      event.preventDefault();
    }

    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const accordion = header.closest('.accordion');

    if (!content || !content.classList.contains('accordion-content')) return;

    if (accordion) {
      accordion.querySelectorAll('.accordion-content.show').forEach(openContent => {
        if (openContent !== content) {
          openContent.classList.remove('show');
        }
      });
    }

    content.classList.toggle('show');
  };

  accordionHeaders.forEach(header => {
    header.addEventListener('click', toggleAccordion);
    header.addEventListener('touchend', toggleAccordion, { passive: false });
  });

});
