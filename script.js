// 1Dev.co — Mwathi Dennis portfolio
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('site-nav');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menu.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !menu.contains(e.target)) setMenu(false);
  });

  /* ---------- Solid nav after scrolling past the top ---------- */
  const header = document.getElementById('top-nav');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('visible'));
  } else {
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => revealer.observe(el));
  }

  /* ---------- Typing role (visual only; screen readers get the full list) ---------- */
  const roles = ['Software Developer', 'Full-stack Engineer', 'Cloud & DevOps Engineer', 'Data & AI Builder'];
  const roleEl = document.querySelector('.typed-role');
  if (roleEl && !reduceMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    const typeRole = () => {
      const role = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      roleEl.textContent = role.slice(0, charIndex);
      if (!deleting && charIndex === role.length) { deleting = true; setTimeout(typeRole, 1600); return; }
      if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      setTimeout(typeRole, deleting ? 40 : 75);
    };
    setTimeout(typeRole, 1800);
  }

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('#site-nav a[href^="#"]')];
  const activeNav = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const on = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', on);
          if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach((s) => activeNav.observe(s));

  /* ---------- Project filters ---------- */
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      projects.forEach((p) => { p.hidden = cat !== 'all' && p.dataset.cat !== cat; });
    });
  });

  /* ---------- Hide floating WhatsApp button over the contact section ---------- */
  const fab = document.querySelector('.whatsapp-float');
  const contact = document.getElementById('contact');
  if (fab && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => fab.classList.toggle('hidden', e.isIntersecting), { threshold: 0.3 }).observe(contact);
  }
})();
