/**
 * Punto de entrada — CARBONET
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-card, .stat-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.08}s`;
  });
});

window.addEventListener('error', (event) => {
  console.error(event.error);
});
