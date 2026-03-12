document.addEventListener('DOMContentLoaded', () => {

  /* fade-in */
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

  /* carousel */
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (track && prevBtn && nextBtn && dotsContainer) {

    /* creator data loaded from JSON file */
    const fallbackCreators = [
      { id: "maya", name: "Maya Chen", role: "Illustrator", supporters: "2,340", earnings: "$12,800/mo", iconImage: "assets/icons/palette.svg", iconBgColor: "#f0e4e4" },
      { id: "jordan", name: "Jordan Ellis", role: "Podcaster", supporters: "8,120", earnings: "$34,200/mo", iconImage: "assets/icons/microphone.svg", iconBgColor: "#dbe0f0" },
      { id: "priya", name: "Priya Sharma", role: "Educator", supporters: "5,670", earnings: "$21,500/mo", iconImage: "assets/icons/books.svg", iconBgColor: "#e8dae8" },
      { id: "alex", name: "Alex Rivera", role: "Musician", supporters: "3,890", earnings: "$18,900/mo", iconImage: "assets/icons/music-note.svg", iconBgColor: "#eee0d5" },
      { id: "liam", name: "Liam Thorne", role: "UX Designer", supporters: "4,150", earnings: "$19,200/mo", iconImage: "assets/icons/wireframe.svg", iconBgColor: "#d5e5ee" },
      { id: "chloe", name: "Chloe Vance", role: "DIY Hardware Maker", supporters: "6,420", earnings: "$24,100/mo", iconImage: "assets/icons/circuit.svg", iconBgColor: "#e0ebd5" },
      { id: "mateo", name: "Mateo Cruz", role: "Pet Foster Advocate", supporters: "9,850", earnings: "$41,000/mo", iconImage: "assets/icons/paw-print.svg", iconBgColor: "#f0d5d5" },
      { id: "zoe", name: "Zoe Lin", role: "Matcha Enthusiast", supporters: "3,110", earnings: "$14,500/mo", iconImage: "assets/icons/teacup.svg", iconBgColor: "#dbe8d5" }
    ];

    let creators = [];
    let currentPage = 0;
    let cardsPerView = 4;
    let isStacked = false;

    /* try loading from creators.json or "fall back" to data in local files */
    fetch('creators.json')
      .then(res => res.json())
      .then(data => {
        creators = data;
        initCarousel();
      })
      .catch(() => {
        creators = fallbackCreators;
        initCarousel();
      });

    function initCarousel() {
      renderCards();
      calculateLayout();
      renderDots();
      updateCarousel();
      updateArrows();
    }

    function renderCards() {
      track.innerHTML = creators.map(creator => `
        <div class="creator-card">
          <div class="creator-avatar" style="background: ${creator.iconBgColor};">
            <img src="${creator.iconImage}" alt="${creator.role}">
          </div>
          <div class="creator-name">${creator.name}</div>
          <div class="creator-type">${creator.role}</div>
          <div class="creator-stats">
            <div>
              <div class="creator-stat-label">Supporters</div>
              <div class="creator-stat-value">${creator.supporters}</div>
            </div>
            <div style="text-align:right;">
              <div class="creator-stat-label">Earning</div>
              <div class="creator-stat-value" style="color:var(--accent);">${creator.earnings}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    function calculateLayout() {
      const w = window.innerWidth;
      if (w <= 500) {
        cardsPerView = 2;
        isStacked = true;
      } else if (w <= 768) {
        cardsPerView = 2;
        isStacked = false;
      } else {
        cardsPerView = 4;
        isStacked = false;
      }
    }

    function totalPages() {
      return Math.ceil(creators.length / cardsPerView);
    }

    function renderDots() {
      const pages = totalPages();
      dotsContainer.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentPage ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to page ' + (i + 1));
        dot.addEventListener('click', () => {
          currentPage = i;
          updateCarousel();
          updateArrows();
          updateDots();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      if (!track.children.length) return;

      if (isStacked) {
        /* 2 cards stacked for mobile */
        const viewportWidth = track.parentElement.offsetWidth;
        const gap = 16;
        const offset = currentPage * (viewportWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
      } else {
        /* normal mode */
        const card = track.children[0];
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const startIndex = currentPage * cardsPerView;
        const offset = startIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
      }
    }

    function updateArrows() {
      prevBtn.disabled = currentPage <= 0;
      nextBtn.disabled = currentPage >= totalPages() - 1;
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
      });
    }

    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        updateCarousel();
        updateArrows();
        updateDots();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages() - 1) {
        currentPage++;
        updateCarousel();
        updateArrows();
        updateDots();
      }
    });

    window.addEventListener('resize', () => {
      calculateLayout();
      currentPage = 0;
      renderDots();
      updateCarousel();
      updateArrows();
    });

    /* init is called after fetch completes */
  }

});
