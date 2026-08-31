const header = document.getElementById('siteHeader');
const drawer = document.getElementById('drawer');
const menuButton = document.getElementById('burgerBtn');
const closeButton = document.getElementById('closeDrawer');
const drawerLinks = drawer.querySelectorAll('a');

const setDrawerState = (isOpen) => {
  drawer.classList.toggle('open', isOpen);
  drawer.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);

  if (isOpen) {
    closeButton.focus();
  } else {
    menuButton.focus();
  }
};

window.addEventListener(
  'scroll',
  () => header.classList.toggle('scrolled', window.scrollY > 40),
  { passive: true },
);

menuButton.addEventListener('click', () => setDrawerState(true));
closeButton.addEventListener('click', () => setDrawerState(false));
drawerLinks.forEach((link) => link.addEventListener('click', () => setDrawerState(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer.classList.contains('open')) {
    setDrawerState(false);
  }
});

const revealElements = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('in'));
}