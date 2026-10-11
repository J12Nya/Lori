// ===== CORAZONES FLOTANTES =====
const heartsContainer = document.getElementById("hearts-container");
const heartChars = ["💜", "🧡", "🖤", "💖"];

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 16 + "px";
  const duration = 8 + Math.random() * 6;
  heart.style.animationDuration = duration + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 900);

// ===== TIMELINE: APARICIÓN AL HACER SCROLL =====
const items = document.querySelectorAll(".t-item");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
items.forEach((item) => observer.observe(item));

// ===== GALERÍA: SI FALTA UNA FOTO, MOSTRAR PLACEHOLDER BONITO =====
document.querySelectorAll(".photo img").forEach((img) => {
  img.addEventListener("error", () => {
    const fig = img.closest(".photo");
    img.remove();
    const placeholder = document.createElement("div");
    placeholder.style.cssText =
      "height:240px;display:flex;align-items:center;justify-content:center;" +
      "color:#5a5a66;font-size:0.9rem;padding:1rem;text-align:center;";
    placeholder.textContent = "💜 Aquí irá una foto nuestra (" + img.getAttribute("src") + ")";
    fig.prepend(placeholder);
  });
});

// ===== EASTER EGG: MOTO SIN MOTOR =====
const motoBtn = document.getElementById("moto-btn");
function motoSinMotor() {
  const overlay = document.createElement("div");
  overlay.id = "moto-overlay";
  const text = document.createElement("div");
  text.className = "moto-text";
  text.textContent = "🏍️ MOTO SIN MOTOR";
  overlay.appendChild(text);
  document.body.appendChild(overlay);
  overlay.addEventListener("click", () => overlay.remove());
  setTimeout(() => overlay.remove(), 4000);
}
motoBtn.addEventListener("click", motoSinMotor);

// Teclea "moto" en cualquier parte de la página 😉
let buffer = "";
document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) {
    buffer = (buffer + e.key.toLowerCase()).slice(-4);
    if (buffer === "moto") motoSinMotor();
  }
});
