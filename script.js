// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    setTimeout(() => {
      const preloader = document.querySelector(".preloader")
      preloader.classList.add("hide")
  
      // Start animations after preloader is hidden
      setTimeout(() => {
        animateOnScroll()
        startTypingEffect()
        animateSkillBars()
      }, 500)
    }, 1500)
  
    // Sticky Header
    const header = document.querySelector("header")
    const scrollThreshold = 100
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }
  
      animateOnScroll()
    })
  
    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Active Navigation Link
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").substring(1) === current) {
          item.classList.add("active")
        }
      })
    })
  
    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle")
    const body = document.body
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      body.classList.add("dark-theme")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme")
  
      if (body.classList.contains("dark-theme")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  
    // Typing Effect
    function startTypingEffect() {
      const typingText = document.getElementById("typing-text")
      const phrases = ["Full Stack Developer", "DevOps Engineer"]
      let phraseIndex = 0
      let charIndex = 0
      let isDeleting = false
      let typingSpeed = 100
  
      function type() {
        const currentPhrase = phrases[phraseIndex]
  
        if (isDeleting) {
          typingText.textContent = currentPhrase.substring(0, charIndex - 1)
          charIndex--
          typingSpeed = 50
        } else {
          typingText.textContent = currentPhrase.substring(0, charIndex + 1)
          charIndex++
          typingSpeed = 100
        }
  
        if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true
          typingSpeed = 1500 // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
          typingSpeed = 500 // Pause before typing next phrase
        }
  
        setTimeout(type, typingSpeed)
      }
  
      setTimeout(type, 1000)
    }
  
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(".animate-on-scroll")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("show")
        }
      })
    }
  
    // Animate skill bars
    function animateSkillBars() {
      const skillBars = document.querySelectorAll(".skill-progress")
  
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress
      })
    }
  
    // Project Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        const filterValue = btn.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 100)
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
   // Contact Form Submission
   window.onload = function() {
    emailjs.init('AHkVPgI4a6oyL13cy'); // Initialize with your public API key
  }
// Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent the default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send email using EmailJS
    emailjs.send("service_rx3so2j", "template_5ky0ior", {
      name: name,
      email: email,
      message: message,
    })
    .then(function(response) {
      console.log("Email sent successfully:", response);
      alert("Thank you for your message! I will get back to you soon.");
      
      // Reset the form
      contactForm.reset();
    }, function(error) {
      console.error("Error sending email:", error);
      alert("There was an issue sending your message. Please try again later.");
    });
  });
}


  })
  