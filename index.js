'use strict';

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const search = document.querySelector('#project-search');
const cards = [...document.querySelectorAll('.project-card')];
const count = document.querySelector('#project-count');
const empty = document.querySelector('#no-results');

if (search && count && empty) {
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matches = !query || (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `SHOWING ${String(visible).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    empty.hidden = visible !== 0;
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
