
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  // Smooth follower with easing
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
});

// Cursor hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .social-icon, .project-card, .education-card, .achievement-card');

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });

  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// Navigation Active Link Update
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });

  // Show/Hide back-to-top button
  const backToTopBtn = document.querySelector('.back-to-top a');
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Smooth scroll for navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Scroll animations - Reveal elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and content for fade-in animation
document.querySelectorAll('.education-card, .achievement-card, .project-card, .skill-item, .detail-item, .contact-item').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Floating shapes parallax effect on mouse move
const shapes = document.querySelectorAll('.shape');
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX / window.innerWidth) * 20 - 10;
  const moveY = (e.clientY / window.innerHeight) * 20 - 10;

  shapes.forEach((shape, index) => {
    shape.style.transform = `translate(${moveX * (index + 1) * 0.5}px, ${moveY * (index + 1) * 0.5}px)`;
  });
});

// Hero image parallax on mouse move
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth) * 15 - 7.5;
    const moveY = (e.clientY / window.innerHeight) * 15 - 7.5;
    heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills-section');

if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            bar.style.width = width;
          }, 50);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillObserver.observe(skillsSection);
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      // Create mailto link
      const mailtoLink = `mailto:2200090024csit@gmail.com?subject=Portfolio Contact - Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
      window.location.href = mailtoLink;

      // Clear form
      contactForm.reset();
    } else {
      alert('Please fill in all fields');
    }
  });
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (navLinksContainer) {
      navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
    }
  });
}

// Close mobile menu on link click
if (navLinksContainer) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinksContainer.style.display = 'none';
    });
  });
}

// Ripple effect on button clicks
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn, button, .social-icon')) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.pointerEvents = 'none';
    ripple.style.width = '15px';
    ripple.style.height = '15px';
    ripple.style.background = 'rgba(143, 163, 212, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '9998';

    document.body.appendChild(ripple);

    // Add ripple animation
    const keyframes = `
      @keyframes ripple {
        to {
          width: 50px;
          height: 50px;
          opacity: 0;
        }
      }
    `;
    if (!document.querySelector('style[data-ripple]')) {
      const style = document.createElement('style');
      style.setAttribute('data-ripple', 'true');
      style.textContent = keyframes;
      document.head.appendChild(style);
    }

    ripple.style.animation = 'ripple 0.6s ease-out forwards';

    setTimeout(() => ripple.remove(), 600);
  }
});

// Section title fade-in animation
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach((title) => {
  title.style.opacity = '0';
  title.style.transform = 'translateY(20px)';
  title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        titleObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  titleObserver.observe(title);
});

// Back to top smooth scroll
const backToTopLink = document.querySelector('.back-to-top a');
if (backToTopLink) {
  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
