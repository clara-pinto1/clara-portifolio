// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
reveals.forEach(el => observer.observe(el));

// Active nav + dot nav on scroll
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = document.querySelectorAll('nav a');
const dotLinks = document.querySelectorAll('.dot-nav a');

function updateActive() {
  const scrollY = window.scrollY + 120;

  // Percorre todas as seções e mantém a última cujo topo já foi ultrapassado
  let current = sections[0]?.id ?? '';
  for (const sec of sections) {
    if (sec.offsetTop <= scrollY) {
      current = sec.id;
    }
  }

  // Se chegou perto do fim da página, ativa o último link
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 40;
  if (nearBottom && sections.length > 0) {
    current = sections[sections.length - 1].id;
  }

  navLinks.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
  dotLinks.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive(); // estado inicial ao carregar
