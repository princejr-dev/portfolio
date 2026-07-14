// ===== CUSTOM CURSOR =====
const cursor = document.createElement('div');
cursor.classList.add('cursor');
const follower = document.createElement('div');
follower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(follower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on hover
document.querySelectorAll('a, button, .project-card, .contact-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ===== MODAL / BOTTOM SHEET =====
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const toggle = document.getElementById("menu-toggle");

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
  document.documentElement.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  modal.style.transform = "";
  modal.style.transition = "";
  document.documentElement.style.overflow = "";
}

toggle.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

modal.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== SWIPE TO CLOSE =====
let startY = 0, currentY = 0, isDragging = false;

modal.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
}, { passive: true });

modal.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentY = e.touches[0].clientY;
  const diff = currentY - startY;
  if (diff > 0) {
    modal.style.transform = `translateY(${diff}px)`;
    modal.style.transition = "none";
  }
}, { passive: true });

modal.addEventListener("touchend", () => {
  isDragging = false;
  modal.style.transition = "";
  const diff = currentY - startY;
  diff > 120 ? closeModal() : (modal.style.transform = "");
  startY = 0; currentY = 0;
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");

let scrollTimer;

window.addEventListener("scroll", () => {

  // montre si on est descendu un peu
  if (window.scrollY > 150) {
    scrollTopBtn.classList.add("visible");
  }

  // reset timer à chaque scroll
  clearTimeout(scrollTimer);

  // cache après 1s sans mouvement
  scrollTimer = setTimeout(() => {
    scrollTopBtn.classList.remove("visible");
  }, 1000);

});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== HANDLE TOGGLE + SWIPE =====
const handle = document.getElementById("handle"); // ton div handle

// Tap = toggle
handle.addEventListener("click", () => {
  modal.classList.contains("active") ? closeModal() : openModal();
});

// Swipe down depuis le handle uniquement
let hStartY = 0;

handle.addEventListener("touchstart", (e) => {
  hStartY = e.touches[0].clientY;
}, { passive: true });

handle.addEventListener("touchend", (e) => {
  const hEndY = e.changedTouches[0].clientY;
  const diff = hEndY - hStartY;

  if (diff > 60) closeModal(); // swipe vers bas
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.section-tag, .section-title, .section-sub, .about-text, .about-stats, .skill-category, .project-card, .contact-card, .contact-form, .stat-card');

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.modal a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary-color)';
    }
  });
});

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});