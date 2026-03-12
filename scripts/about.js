document.addEventListener('DOMContentLoaded', () => {

  /* count-up for stats */
  const statValues = document.querySelectorAll('.stat-value');

  if (statValues.length) {
    const countTargets = {
      '2021': { value: 2021, suffix: '',  duration: 1200 },
      '38':   { value: 38,   suffix: '',  duration: 900  },
      '40+':  { value: 40,   suffix: '+', duration: 900  },
      '5%':   { value: 5,    suffix: '%', duration: 800  }
    };

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function animateCount(el, target, suffix, duration) {
      const start = performance.now();
      const startVal = target > 100 ? target - 80 : 0;

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(startVal + (target - startVal) * easeOut(progress));
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const config = countTargets[text];
          if (config) animateCount(el, config.value, config.suffix, config.duration);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => statsObserver.observe(el));
  }

  /* timeline slide-in on scroll */
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-16px)';
      item.style.transition = `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`;
      tlObserver.observe(item);
    });
  }

});
