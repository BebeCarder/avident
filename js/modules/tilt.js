import { $$, prefersReducedMotion } from './utils.js';

/** Inclinación 3D de tarjetas siguiendo el cursor. */
export function initTilt() {
  if (prefersReducedMotion() || !matchMedia('(hover: hover)').matches) return;
  $$('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
