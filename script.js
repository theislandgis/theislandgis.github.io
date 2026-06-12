function showPage(id) {
  const targetPage = document.getElementById('page-' + id);
  if (!targetPage) {
    id = 'home'; // fallback for invalid hash
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.mobile-link[data-page]').forEach(l => l.classList.remove('active'));

  document.getElementById('page-' + id).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('data-page') === id) {
      l.classList.add('active');
    }
  });
  document.querySelectorAll('.mobile-link[data-page]').forEach(l => {
    if (l.getAttribute('data-page') === id) {
      l.classList.add('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // update URL hash
  window.location.hash = id;

  // close mobile menu on page change
  closeMobileMenu();
}

// load page from URL on startup
window.addEventListener('load', () => {
  const page = window.location.hash.replace('#', '');
  if (page) {
    showPage(page);
  } else {
    showPage('home');
  }
});

function openPanel(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function openDetail(id) {
  // Close any open panels first
  document.querySelectorAll('.course-detail-overlay.open').forEach(el => el.classList.remove('open'));
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePanel(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeDetail(event, id) {
  if (event.target === document.getElementById(id)) {
    closePanel(id);
  }
}

function toggleLanguage() {
  const menu = document.getElementById('lang-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  closeMobileMenu();
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.querySelector('.hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('active');
}

let currentLang = localStorage.getItem('site_lang') || 'kh';


function setLang(lang) {
  document.getElementById('lang-menu').style.display = 'none';
  currentLang = lang;
  localStorage.setItem('site_lang', lang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!el._origHTML) el._origHTML = el.innerHTML;
    if (currentLang === 'kh' && kh[key]) {
      el.innerHTML = kh[key];
    } else {
      el.innerHTML = el._origHTML;
    }
  });
}

// Apply saved language on load
window.addEventListener('DOMContentLoaded', () => { if (currentLang !== 'en') applyLang(); });

// Close language menu when clicking outside
document.addEventListener('click', function (e) {
  const menu = document.getElementById('lang-menu');
  if (!e.target.closest('#lang-menu') && !e.target.closest('[data-i18n="nav.language"]')) {
    menu.style.display = 'none';
  }
});

// Sticky Navigation Polish
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial query
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Also observe dynamically created or page-switched content
    const pageObserver = new MutationObserver(() => {
        document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(el => observer.observe(el));
    });
    
    pageObserver.observe(document.body, { childList: true, subtree: true });
});
