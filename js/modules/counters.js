import { $$, prefersReducedMotion } from './utils.js';

const easeOut = (t) => 1 - Math.pow(1 - t, 4);

function animate(el) {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const fmt = new Intl.NumberFormat('es-MX');
  if (prefersReducedMotion()) { el.textContent = fmt.format(end) + suffix; return; }
  const dur = 1800;
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = fmt.format(Math.round(end * easeOut(p))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initCounters() {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    animate(en.target);
    io.unobserve(en.target);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach((el) => io.observe(el));
}
