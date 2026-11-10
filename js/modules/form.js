import { $, $$, toast } from './utils.js';

const rules = {
  nombre: (v) => v.trim().length >= 3 || 'Escribe tu nombre completo.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Ingresa un correo válido.',
  tel: (v) => /^[0-9+\s()-]{8,}$/.test(v) || 'Ingresa un teléfono válido.',
  servicio: (v) => v !== '' || 'Selecciona un tratamiento.',
  fecha: (v) => {
    if (!v) return 'Elige una fecha.';
    const d = new Date(`${v}T00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (d < today) return 'La fecha no puede ser pasada.';
    return d.getDay() !== 0 || 'Atendemos de lunes a sábado.';
  },
};

export function initForm() {
  const form = $('#bookingForm');
  if (!form) return;

  const date = form.elements.fecha;
  date.min = new Date().toISOString().split('T')[0];

  const validate = (input) => {
    const field = input.closest('.field');
    const res = rules[input.name](input.value);
    const ok = res === true;
    field.classList.toggle('is-invalid', !ok);
    field.classList.toggle('is-valid', ok);
    $('small', field).textContent = ok ? '' : res;
    return ok;
  };

  const inputs = $$('input, select', form);
  inputs.forEach((i) => {
    i.addEventListener('blur', () => validate(i));
    i.addEventListener('input', () => i.closest('.field').classList.contains('is-invalid') && validate(i));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = inputs.map(validate);
    if (results.includes(false)) return toast('Revisa los campos marcados.');
    const name = form.elements.nombre.value.trim().split(' ')[0];
    toast(`¡Gracias, ${name}! Recibimos tu solicitud y te contactaremos pronto.`);
    form.reset();
    $$('.field', form).forEach((f) => f.classList.remove('is-valid', 'is-invalid'));
  });
}
