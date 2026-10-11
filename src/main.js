const root = document.documentElement;
const intro = document.querySelector('#intro-screen');
const themeToggle = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const modal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalStack = document.querySelector('#modal-stack');

function updateThemeButton() {
  const dark = root.classList.contains('dark');
  themeToggle.textContent = dark ? '☼' : '◐';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}


function closeIntro() {
  if (!intro) return;

  intro.classList.add('is-hidden');

  window.setTimeout(() => {
    intro.remove();
  }, 600);
}

if (intro) {
  const helloScreen = document.querySelector('#hello-screen');
  const loadingScreen = document.querySelector('#loading-screen');

  // Step 1: Hello screen — 1.5 seconds
  window.setTimeout(() => {
    if (helloScreen) {
      helloScreen.classList.add('is-hidden');
    }

    // Step 2: Show loading screen
    if (loadingScreen) {
      loadingScreen.classList.add('is-visible');
    }
  }, 2500);

  // Step 3: Open portfolio automatically
  window.setTimeout(closeIntro, 4500);
}


themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', root.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

if (localStorage.getItem('portfolio-theme') === 'light') root.classList.remove('dark');
updateThemeButton();

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('is-open');
  menuButton.textContent = navigation.classList.contains('is-open') ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.textContent = '☰';
}));

document.querySelectorAll('.print-resume').forEach((button) => {
  button.addEventListener('click', () => {
    window.open(
      'https://drive.google.com/file/d/1_azDS6twXcE8CE6ycoYWFCRwhXxJieWX/view?pli=1',
      '_blank',
      'noopener,noreferrer'
    );
  });
});


document.querySelectorAll('.project-card').forEach((card) => card.addEventListener('click', () => {
  modalTitle.textContent = card.getAttribute('data-project') || 'Project details';
  modalDescription.textContent = card.getAttribute('data-description') || '';
  modalStack.textContent = card.getAttribute('data-stack') || '';
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}));

function closeModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal(); });
modal.querySelector('a').addEventListener('click', closeModal);


function updateIndiaClock() {
  const now = new Date();

  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now);

  const clock = document.querySelector('#hero-clock');

  if (clock) {
    clock.textContent = time;
  }
}

updateIndiaClock();
setInterval(updateIndiaClock, 1000);
