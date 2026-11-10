import { $, $$ } from './utils.js';

export function initHeader() {
  const header = $('#header');
  const nav = $('#nav');
  const burger = $('#burger');
  const links = $$('.nav__link');
  const bar = $('#progress');
  const toTop = $('#toTop');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
  document.addEventListener('click', (e) => !header.contains(e.target) && setMenu(false));

  // Scroll: header compacto, barra de progreso y botón "subir"
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      header.classList.toggle('is-scrolled', y > 30);
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      toTop.classList.toggle('is-show', y > 600);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Enlace activo según la sección visible
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${en.target.id}`));
    }),
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}
