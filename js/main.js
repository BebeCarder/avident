import { initPreloader } from './modules/preloader.js';
import { initHeader } from './modules/header.js';
import { initPop } from './modules/pop.js';
import { initReveal } from './modules/reveal.js';
import { initCounters } from './modules/counters.js';
import { initTilt } from './modules/tilt.js';
import { initCompare } from './modules/compare.js';
import { initSlider } from './modules/slider.js';
import { initFaq } from './modules/faq.js';
import { initForm } from './modules/form.js';
import { initExtras } from './modules/extras.js';

const boot = () => {
  initPreloader();
  initHeader();
  initPop();
  initReveal();
  initCounters();
  initTilt();
  initCompare();
  initSlider();
  initFaq();
  initForm();
  initExtras();
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();
