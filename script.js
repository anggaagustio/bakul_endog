// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current) + "+";
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + "+";
            }
          };

          updateCounter();
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  counterObserver.observe(heroStats);
}

// ===== FORM HANDLING =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
    btn.style.background = "#28a745";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.disabled = false;
      this.reset();
    }, 2000);
  }, 1500);
});

// ===== GALLERY LIGHTBOX (simple) =====
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    const overlay = document.createElement("div");
    overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                `;

    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    imgClone.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                `;

    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      overlay.remove();
    });
  });
});

// Add fadeIn keyframe dynamically
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
document.head.appendChild(style);

//footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });
