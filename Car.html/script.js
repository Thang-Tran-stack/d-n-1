/* =========================================================
   JDM CAR - INTERACTIVE SCRIPT (JAVASCRIPT)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect on Scroll
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 3. Search Form Handler with Toast Notification
  const searchForm = document.getElementById('search-form');
  const searchName = document.getElementById('search-name');
  const searchBrand = document.getElementById('search-brand');
  const searchType = document.getElementById('search-type');

  const showToast = (message) => {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `<i class="fas fa-circle-check"></i> <span class="toast-text"></span>`;
      document.body.appendChild(toast);
    }

    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const carName = searchName ? searchName.value.trim() : '';
      const carBrand = searchBrand && searchBrand.value ? searchBrand.options[searchBrand.selectedIndex].text : '';
      const carType = searchType && searchType.value ? searchType.options[searchType.selectedIndex].text : '';

      let searchSummary = [];
      if (carName) searchSummary.push(`Tên: "${carName}"`);
      if (carBrand && searchBrand.value) searchSummary.push(`Hãng: ${carBrand}`);
      if (carType && searchType.value) searchSummary.push(`Loại: ${carType}`);

      if (searchSummary.length > 0) {
        showToast(`Đang tìm kiếm: ${searchSummary.join(' | ')}`);
      } else {
        showToast('Vui lòng nhập tên xe hoặc chọn hãng xe để tìm kiếm.');
      }
    });
  }

  // 4. Smooth Card Reveal Animation on Scroll
  const cards = document.querySelectorAll('.service-card');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    cardObserver.observe(card);
  });
});
