import { $ } from './utils.js';

export function initPreloader() {
  const el = $('#preloader');
  const done = () => el.classList.add('is-done');
  window.addEventListener('load', () => setTimeout(done, 500));
  setTimeout(done, 2500); // respaldo por si "load" tarda
}
