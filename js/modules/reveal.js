import { $$ } from './utils.js';

export function initReveal() {
  const items = $$('[data-reveal]');
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-visible');
    io.unobserve(en.target);
  }), { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}
