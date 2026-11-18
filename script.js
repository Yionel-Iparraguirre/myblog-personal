const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
const birthDate = new Date(2003, 8, 12);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const birthdayPassed = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
if (!birthdayPassed) age--;
const ageLabel = document.querySelector('.hero-facts div:nth-child(2) strong');
// La fecha exacta se conserva en el diseño; la edad se calcula automáticamente en el pie del dato.
ageLabel.innerHTML = `12 de septiembre<br>de 2003 · ${age} años`;

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Mensaje desde el portafolio de Jerik - ${data.get('nombre')}`);
  const body = encodeURIComponent(`Nombre: ${data.get('nombre')}\nCorreo: ${data.get('email')}\n\nMensaje:\n${data.get('mensaje')}`);
  document.getElementById('formHint').textContent = 'Se abrirá tu aplicación de correo. Añade tu dirección de destino para completar el envío.';
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
