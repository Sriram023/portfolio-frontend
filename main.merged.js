/* ===== MERGED JS FOR SRIRAM PORTFOLIO (corrected) ===== */
/* Prevents duplicate form alerts and keeps all original features intact */

/* Mobile Menu Toggle */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close menu after clicking a link (mobile UX)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('show'));
  });
}

/* Scroll Animation for .animate elements */
const animatedElements = document.querySelectorAll('.animate');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  animatedElements.forEach((el) => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* Projects page: appear-on-scroll + glow hover */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');

  if (cards.length) {
    const appear = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });

    cards.forEach(card => appear.observe(card));

    // Glowing hover effect
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,191,255,0.25), rgba(10,25,47,0.85))`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255,255,255,0.07)';
      });
    });
  }

  /* About page: fade-in sections */
  const sections = document.querySelectorAll('.fade-in');
  if (sections.length) {
    const appearSections = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });

    sections.forEach(section => appearSections.observe(section));
  }

  /* Contact form: single, guarded submit handler (prevents double alerts) */
  const form = document.getElementById('contactForm');
  if (form && form.dataset.bound !== 'true') {
    form.dataset.bound = 'true';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }

      try {
        const res = await fetch('https://portfolio-backend-l3gb.onrender.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();

        if (res.ok) {
          alert('✅ Message sent successfully!');
          form.reset();
        } else {
          alert('❌ Error: ' + (data.error || 'Failed to send'));
        }
      } catch (_err) {
        alert('⚠️ ⚠️ The server is waking up, please try again in a few seconds.');
      }
    });
  }
});
