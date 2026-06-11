/* =====================================================
   script.js — Portfolio Interactions
===================================================== */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
});

// ── Mobile hamburger menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('open');
});
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

// ── Active nav highlight ──────────────────────────────
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(s => {
    // trigger activation when the section is a third of the way down the screen
    if (window.scrollY >= s.offsetTop - window.innerHeight / 3) {
      current = s.id;
    }
  });

  // Force active state to the last section if scrolled to the absolute bottom
  if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
    current = sections[sections.length - 1].id;
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── Typing animation ──────────────────────────────────
const roles = ['Software QA Engineer', 'Test Automation Specialist', 'Bug Hunter', 'Defect Detective'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const word = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Scroll reveal ─────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    // Skill bars
    e.target.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    // Stat counters
    e.target.querySelectorAll('[data-target]').forEach(el => {
      animateCount(el, +el.dataset.target);
    });
    // QA progress bar
    e.target.querySelectorAll('[data-width]').forEach(bar => {
      if (bar.classList.contains('qa-progress-fill'))
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 400);
    });
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .svc-card, .p-card, .testi-card, .blog-card').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// ── Animated counter ──────────────────────────────────
function animateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

// ── Hero canvas particles (QA code syntax) ────────────
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

// QA-specific syntax tokens — varied for authenticity
const symbols = [
  '✓', '✗', '⚠', '⚙',
  'PASS', 'FAIL', 'BUG',
  'assert()', 'expect()', 'describe()',
  'it()', 'test()', 'run()',
  '{ }', '[ ]', '()',
  '404', '200', '500', '302',
  'null', 'error', 'timeout',
  '#bug', '#fix', '#qa',
  'xpath', 'css', 'api',
  '→', '⟳', '▶', '●'
];
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function makeParticle() {
  const isPrimary = Math.random() > 0.5;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    sym: symbols[Math.floor(Math.random() * symbols.length)],
    size: Math.random() * 13 + 10,
    alpha: Math.random() * 0.22 + 0.08,   // 0.08–0.30 (was 0.03–0.12)
    speed: Math.random() * 0.35 + 0.08,
    drift: (Math.random() - 0.5) * 0.25,
    color: isPrimary ? '#a78bfa' : '#38bdf8'
  };
}
for (let i = 0; i < 65; i++) particles.push(makeParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.font = `500 ${p.size}px 'Fira Code', monospace`;
    ctx.fillText(p.sym, p.x, p.y);
    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -40) { p.y = canvas.height + 40; p.x = Math.random() * canvas.width; }
    if (p.x < -80 || p.x > canvas.width + 80) p.x = Math.random() * canvas.width;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Contact form ──────────────────────────────────────
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
  e.preventDefault();
  const orig = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  // Gather form data
  const data = {
    name: document.getElementById('fname').value,
    email: document.getElementById('femail').value,
    subject: document.getElementById('fsubject').value,
    message: document.getElementById('fmessage').value,
    _captcha: false // Disable captcha for AJAX
  };

  // Send via Formsubmit.co AJAX API
  fetch('https://formsubmit.co/ajax/rakibsanto.cse@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      submitBtn.innerHTML = 'Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      form.reset();
      setTimeout(() => {
        submitBtn.innerHTML = orig;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch(error => {
      submitBtn.innerHTML = 'Error!';
      submitBtn.style.background = 'var(--red)';
      setTimeout(() => {
        submitBtn.innerHTML = orig;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });
});

// ── Card subtle 3D tilt ───────────────────────────────
document.querySelectorAll('.svc-card,.p-card,.testi-card,.blog-card,.qa-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = (-(e.clientY - r.top - r.height / 2) / r.height) * 6;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 6;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
