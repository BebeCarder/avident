import { $, clamp } from './utils.js';

/** Comparador antes/después arrastrable (ratón, táctil y teclado). */
export function initCompare() {
  const box = $('#compare');
  const handle = $('#compareHandle');
  if (!box) return;

  const set = (pct) => {
    pct = clamp(pct, 0, 100);
    box.style.setProperty('--pos', `${pct}%`);
    handle.setAttribute('aria-valuenow', Math.round(pct));
  };
  const fromEvent = (e) => {
    const r = box.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  box.addEventListener('pointerdown', (e) => {
    box.setPointerCapture(e.pointerId);
    box.classList.add('is-drag');
    fromEvent(e);
  });
  box.addEventListener('pointermove', (e) => box.classList.contains('is-drag') && fromEvent(e));
  ['pointerup', 'pointercancel'].forEach((ev) => box.addEventListener(ev, () => box.classList.remove('is-drag')));

  handle.addEventListener('keydown', (e) => {
    const cur = Number(handle.getAttribute('aria-valuenow'));
    if (e.key === 'ArrowLeft') set(cur - 5);
    if (e.key === 'ArrowRight') set(cur + 5);
  });

  // Pequeña demostración al entrar en pantalla
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    let t = 0;
    const demo = () => {
      t += 0.04;
      if (t > Math.PI * 2 || box.classList.contains('is-drag')) return set(50);
      set(50 + Math.sin(t) * 30);
      requestAnimationFrame(demo);
    };
    demo();
  }, { threshold: 0.6 });
  io.observe(box);
}
