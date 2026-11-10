import { $, $$, trigger } from './utils.js';

/** Efecto pop: botones, enlaces, cambio de sección y ripple en clics. */
export function initPop() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn, .nav__link, .brand, .burger, .to-top, .slider__dots button, .faq__q, .service');
    if (!target) return;
    trigger(target, 'pop');

    if (target.classList.contains('btn')) {
      const r = target.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
  });

  // Al navegar a una sección, su tarjeta hace pop al llegar
  $$('[data-nav]').forEach((a) => a.addEventListener('click', () => {
    const section = $(a.getAttribute('href'));
    const card = section && $('.card', section);
    if (card) setTimeout(() => trigger(card, 'pop-section'), 550);
  }));
}
