document.addEventListener('DOMContentLoaded', () => {

  /* fade-in scroll */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* nav scroll */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* toggle */
  const toggle = document.getElementById('billing-toggle');
  if (toggle) {
    const thumb = toggle.querySelector('.toggle-thumb');
    const monthlyLabel = document.getElementById('label-monthly');
    const annualLabel = document.getElementById('label-annual');
    const saveBadge = document.getElementById('save-badge');
    let isAnnual = true;

    function updatePricing() {
      toggle.style.background = isAnnual ? 'var(--rose)' : 'var(--border)';
      thumb.style.left = isAnnual ? '23px' : '3px';
      monthlyLabel.className = 'toggle-label ' + (isAnnual ? 'inactive' : 'active');
      annualLabel.className = 'toggle-label ' + (isAnnual ? 'active' : 'inactive');
      if (saveBadge) saveBadge.style.display = isAnnual ? 'inline' : 'none';

      document.querySelectorAll('[data-monthly]').forEach(el => {
        const monthly = el.getAttribute('data-monthly');
        const yearly = el.getAttribute('data-yearly');
        el.textContent = '$' + (isAnnual ? yearly : monthly);
      });

      document.querySelectorAll('[data-billing-monthly]').forEach(el => {
        const monthlyText = el.getAttribute('data-billing-monthly');
        const yearlyText = el.getAttribute('data-billing-yearly');
        el.textContent = isAnnual ? yearlyText : monthlyText;
      });
    }

    toggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      updatePricing();
    });

    updatePricing();
  }

  /* accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

});
