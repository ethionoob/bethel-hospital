    // ===== SLIDESHOW =====
    (function() {
      const slides = document.querySelectorAll('#heroSlideshow .slide');
      const dots = document.querySelectorAll('#heroSlideshow .slide-dots span');
      let current = 0;
      let interval;

      function goTo(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
      }

      function nextSlide() {
        const next = (current + 1) % slides.length;
        goTo(next);
      }

      function startAuto() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 4500);
      }

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', function(e) {
          e.stopPropagation();
          goTo(idx);
          startAuto();
        });
      });

      let touchStartX = 0;
      const container = document.getElementById('heroSlideshow');
      container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      });
      container.addEventListener('touchend', function(e) {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            const next = (current + 1) % slides.length;
            goTo(next);
          } else {
            const prev = (current - 1 + slides.length) % slides.length;
            goTo(prev);
          }
          startAuto();
        }
      });

      startAuto();
    })();

    // ===== MOBILE NAVIGATION TOGGLE (FIXED) =====
    document.addEventListener('DOMContentLoaded', function() {
      const toggleBtn = document.getElementById('navToggle');
      const navLinks = document.getElementById('navLinks');
      
      if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          navLinks.classList.toggle('open');
          // Toggle icon between bars and times
          const icon = this.querySelector('i');
          if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
          }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
          if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
            navLinks.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
              icon.classList.add('fa-bars');
              icon.classList.remove('fa-times');
            }
          }
        });
        
        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
              icon.classList.add('fa-bars');
              icon.classList.remove('fa-times');
            }
          });
        });
      }
    });