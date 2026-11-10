import { $, prefersReducedMotion } from './utils.js';

export function initExtras() {
  $('#year').textContent = new Date().getFullYear();

  // Resplandor dorado que sigue al cursor (suavizado con lerp)
  const glow = $('#cursorGlow');
  if (prefersReducedMotion() || !matchMedia('(hover: hover)').matches) return;
  let tx = 0, ty = 0, x = 0, y = 0;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; glow.classList.add('is-on'); }, { passive: true });
  document.addEventListener('pointerleave', () => glow.classList.remove('is-on'));
  (function loop() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  })();

  // Parallax suave del hero
  const visual = $('.hero__visual');
  addEventListener('scroll', () => {
    if (visual && scrollY < innerHeight) visual.style.transform = `translateY(${scrollY * 0.08}px)`;
  }, { passive: true });
}
