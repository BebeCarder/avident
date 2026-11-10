import { $, $$ } from './utils.js';

/** Carrusel de opiniones: autoplay, puntos, swipe y pausa al pasar el cursor. */
export function initSlider() {
  const root = $('#slider');
  const track = $('#sliderTrack');
  const dotsBox = $('#sliderDots');
  if (!root) return;
  const slides = $$('.quote', track);
  let index = 0;
  let timer;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Opinión ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
    return b;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, n) => d.classList.toggle('is-active', n === index));
  }
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 5500); };

  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', restart);

  let startX = 0;
  root.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  root.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
  });

  go(0);
  restart();
}
