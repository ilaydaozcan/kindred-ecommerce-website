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

  /* tab changing */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanels.forEach(p => {
        if (p.id === 'tab-' + target) {
          p.style.display = p.classList.contains('post-feed') ? 'flex' : 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  /* hearting buttons */
  document.querySelectorAll('.like-btn[data-post]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isLiked = btn.classList.toggle('liked');
      const countEl = btn.querySelector('.like-count');
      if (countEl) {
        let count = parseInt(countEl.textContent);
        countEl.textContent = isLiked ? count + 1 : count - 1;
      }
      const heartImg = btn.querySelector('.heart-icon');
      if (heartImg) {
        heartImg.src = isLiked ? 'assets/icons/heart-filled.svg' : 'assets/icons/heart.svg';
      }
    });
  });

  /* tier cards expand & collapse */
  document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('click', () => {
      const wasSelected = card.classList.contains('selected');
      document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
      if (!wasSelected) card.classList.add('selected');
    });
  });

});
