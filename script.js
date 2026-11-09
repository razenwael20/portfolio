const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

// Reveal selected content as it enters the viewport.
const revealItems = document.querySelectorAll(
  ".project-card, .service-item, .about-copy, .about-stamp, .contact-section h2"
);
revealItems.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Project cards are ready for their live URLs.
// Add a URL to each card's data-project-url attribute when you send the destinations.
const toast = document.querySelector(".interaction-toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".project-link").forEach((card) => {
  const openProject = () => {
    const url = card.dataset.projectUrl?.trim();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      showToast("Project link coming soon — send me the website URL to connect it.");
    }
  };
  card.addEventListener("click", openProject);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});

// Gentle pointer-responsive movement for the hero artwork.
const heroArt = document.querySelector(".interactive-art");
if (heroArt && window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const front = heroArt.querySelector(".card-front");
    const back = heroArt.querySelector(".card-back");
    if (front) front.style.translate = `${x * 9}px ${y * 9}px`;
    if (back) back.style.translate = `${x * -6}px ${y * -6}px`;
  });
  heroArt.addEventListener("pointerleave", () => {
    heroArt.querySelectorAll(".hero-card").forEach((card) => card.style.translate = "");
  });
}
