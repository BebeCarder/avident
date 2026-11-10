import { $, $$ } from './utils.js';

/** Acordeón: solo una pregunta abierta a la vez. */
export function initFaq() {
  const list = $('#faqList');
  if (!list) return;
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__q');
    if (!btn) return;
    const item = btn.parentElement;
    const willOpen = !item.classList.contains('is-open');
    $$('.faq__item', list).forEach((it) => {
      it.classList.remove('is-open');
      $('.faq__q', it).setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}
