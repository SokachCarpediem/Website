'use strict';

// Presentation-only controls: experience content and the three games' logic are untouched.
const filterButtons = Array.from(document.querySelectorAll('.we-filter'));
const roles = Array.from(document.querySelectorAll('.we-role'));
const filterStatus = document.querySelector('#we-filter-status');
const emptyMessage = document.querySelector('#we-no-results');

function setExperienceFilter(filter) {
  if (!filterButtons.some((button) => button.dataset.filter === filter)) return;
  let total = 0;
  roles.forEach((role) => {
    const categories = (role.dataset.focus || '').split(/\s+/);
    const visible = filter === 'all' || categories.includes(filter);
    role.hidden = !visible;
    if (visible) total += 1;
  });
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (filterStatus) filterStatus.textContent = `${String(total).padStart(2, '0')} ${total === 1 ? 'ROLE' : 'ROLES'}`;
  if (emptyMessage) emptyMessage.hidden = total > 0;
}

filterButtons.forEach((button) => button.addEventListener('click', () => setExperienceFilter(button.dataset.filter)));

// Reveal animation only when supported; no content relies on JavaScript visibility.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll('.we-snapshot-main, .we-exp-header, .we-outro-body');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach((element) => {
    element.classList.add('we-reveal');
    observer.observe(element);
  });
}
