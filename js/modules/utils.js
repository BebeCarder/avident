export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reinicia y dispara una animación CSS por clase. */
export function trigger(el, cls = 'pop') {
  el.classList.remove(cls);
  void el.offsetWidth; // fuerza reflow para reiniciar la animación
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}

export function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('is-show'), 3800);
}
