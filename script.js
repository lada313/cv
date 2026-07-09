const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('metrics')) animateNumbers(entry.target);
    }
  });
}, { threshold: 0.16 });
reveals.forEach((el) => observer.observe(el));

function animateNumbers(root) {
  root.querySelectorAll('[data-count]').forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = 'true';
    const target = Number(node.dataset.count);
    const suffix = node.dataset.suffix || '';
    const start = performance.now();
    const duration = target >= 100 ? 1150 : 850;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

const jobCards = document.querySelectorAll('.job-card');
function setCardHeight(card) {
  const content = card.querySelector('.job-content');
  const inner = card.querySelector('.job-inner');
  if (!content || !inner) return;
  content.style.height = card.classList.contains('open') ? `${inner.offsetHeight}px` : '0px';
}
jobCards.forEach((card) => {
  setCardHeight(card);
  const button = card.querySelector('.job-toggle');
  button.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    setCardHeight(card);
  });
});
window.addEventListener('resize', () => jobCards.forEach(setCardHeight));

const dot = document.querySelector('.cursor-dot');
window.addEventListener('pointermove', (event) => {
  dot.style.left = `${event.clientX}px`;
  dot.style.top = `${event.clientY}px`;
});

const mobileAvatar = document.querySelector('.mobile-avatar');
const photoModal = document.querySelector('.photo-modal');
const photoModalClose = document.querySelector('.photo-modal__close');
function openPhotoModal() {
  if (!photoModal) return;
  photoModal.classList.add('open');
  photoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closePhotoModal() {
  if (!photoModal) return;
  photoModal.classList.remove('open');
  photoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
mobileAvatar?.addEventListener('click', openPhotoModal);
photoModalClose?.addEventListener('click', closePhotoModal);
photoModal?.addEventListener('click', (event) => { if (event.target === photoModal) closePhotoModal(); });

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
function closeMobileMenu() {
  menuToggle?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.setAttribute('aria-hidden', 'true');
}
menuToggle?.addEventListener('click', () => {
  const isOpen = !mobileMenu?.classList.contains('open');
  menuToggle.classList.toggle('open', isOpen);
  mobileMenu?.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closePhotoModal(); closeMobileMenu(); }
});
