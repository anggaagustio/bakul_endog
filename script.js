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

// Create backdrop element for mobile menu (dark overlay)
let navBackdrop = document.getElementById("nav-backdrop");
if (!navBackdrop) {
  navBackdrop = document.createElement("div");
  navBackdrop.id = "nav-backdrop";
  navBackdrop.className = "nav-backdrop";
  document.body.appendChild(navBackdrop);
}

navBackdrop.addEventListener("click", () => {
  setMenuOpen(false);
});

function setMenuOpen(isOpen) {
  if (isOpen) {
    navLinks.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.classList.add("open");
    navBackdrop.classList.add("active");
    // lock scrolling when menu is open
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("open");
    navBackdrop.classList.remove("active");
    // restore scrolling
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("active");
  setMenuOpen(!isOpen);
});

// Allow closing with Escape when menu is open
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    setMenuOpen(false);
    hamburger.focus();
  }
});

// Close mobile menu when clicking a link and update aria state
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
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

// ===== THEME TOGGLE (dark/light) =====
const themeToggle = document.getElementById("themeToggle");
function applyTheme(t) {
  if (t === "dark") {
    document.documentElement.classList.add("dark");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.classList.remove("dark");
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ===== NAV FOCUS TRAP & STAGGERED ITEMS =====
let navKeyHandler = null;
function enableNavFocusTrap(enable) {
  const focusable = Array.from(navLinks.querySelectorAll("a, button"));
  if (enable) {
    // focus first link
    if (focusable.length) focusable[0].focus();
    navKeyHandler = function (e) {
      if (e.key === "Tab") {
        const idx = focusable.indexOf(document.activeElement);
        if (e.shiftKey && idx === 0) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        } else if (!e.shiftKey && idx === focusable.length - 1) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    };
    document.addEventListener("keydown", navKeyHandler);
  } else {
    if (navKeyHandler) document.removeEventListener("keydown", navKeyHandler);
    navKeyHandler = null;
  }
}

// Stagger nav items when opening
function applyNavStagger(open) {
  const items = navLinks.querySelectorAll("li");
  items.forEach((li, i) => {
    if (open) {
      li.style.transitionDelay = `${i * 70}ms`;
      li.classList.add("nav-item-enter");
    } else {
      li.style.transitionDelay = "";
      li.classList.remove("nav-item-enter");
    }
  });
}

// Update setMenuOpen to enable focus trap & stagger
const originalSetMenuOpen = setMenuOpen;
setMenuOpen = function (isOpen) {
  originalSetMenuOpen(isOpen);
  enableNavFocusTrap(isOpen);
  applyNavStagger(isOpen);
};

// ===== FETCH PRICES (static JSON) =====
fetch("prices.json")
  .then((r) => r.json())
  .then((data) => {
    Object.entries(data).forEach(([key, value]) => {
      const el = document.querySelector(`[data-price-key="${key}"]`);
      if (el) el.textContent = value;
    });
  })
  .catch(() => {
    // ignore fetch errors (site still works offline)
  });

// Small UX: move focus to contact form when floating-order clicked
const floatingOrder = document.querySelector(".floating-order");
if (floatingOrder) {
  floatingOrder.addEventListener("click", (e) => {
    // default anchor to #contact; ensure focus on name input
    const nameInput = document.getElementById("name");
    setTimeout(() => nameInput && nameInput.focus(), 500);
  });
}
