
"use strict";

/* PERSONAL SETTINGS — EDIT YOUR MESSAGE HERE */

const CONFIG = {
  name: "Aiman",
  dateStamp: "BIRTHDAY · 20.10.2026",

  letter: `Happy Birthday, Aiman! ♡

I hope this year brings you peaceful days,
unexpected happiness, and a hundred little
reasons to smile.
Hum ne van mai bohat memories banayi hai aur bohat acha time spent kera hai ous time woh bhi kiya din thai yaad aate hai tum bhi yaad aati ho ,
I just wanted to say Aiman that i love you and,
 I know that you dont love me and thats 
 completely fine I cannot force you to stay
  with me but mai tumhe pehle jese JANU bolta tha
 ab mere pass woh position nhi hai ke tumhe keh
 saku if you remeber tum se hi permission li thi, aaj tumhari Birthday hai mai day kharaab nhi keru,
 mera muqsad tumhe hurt kerna nhi tha , Bas tumse mohabbat ker baitha aur kerta rahu ga jab tak maut nhi aati aur jannat mai bhi tumhe hi maangu ga kiyu ke maine tum se sacha pyar kiya hai tum meri life ho , Jab tum ne bola ke meri side se sab clear hai ous din bohat roya tha har dua mai maanga maine infact aaj bhi maangta hu tumhe apni sari galat cheezai chor di because of you aur aaj bhi bohat jealousy hoti hai bohat dard hota hai kaash tum bhi muj se pyar kerti tumse mai itna pyar kerta hu ager 2 bacho ke saath bhi aaogina tab bhi palko per baitha ke rakhu ga , sochna is bare mai mera kiya hai mai tou life long wait kerlu ga , tum attraction nhi thi tum mohabbat thi ho aur raho gi bhi bohat ajeeb sa feel hota hai jab tumse baat kerte time woh cheez nhi express ker sakta jo kerna chahta hu bas bohat din se keh nhi paya I LOVE YOU , Thank you , if kuch galtiya hoyi ho tou maaf kerdena ye msg jab perho gi na ye jo maine likha hai i was literary crying mera rab gawa hai , maine tumhe tab khoya tha jab mai tumse sab se zyada mohabbat kerta tha . Meri fikaar nhi kerna khush rehna tumhari happiness bohat matter kerti hai .  

Keep being your own kind of wonderful.`,

  signature: "__ from Hassan ♡",

  wish: "May this year bring you beautiful surprises, good people, and little moments worth remembering.",

  kittenMessages: [
    "Your tiny cat committee wishes you a purr-fect birthday! 🐾",
    "Official verdict: you deserve extra happiness today. ♡",
    "Sending you tiny paws and a whole lot of good vibes. ✨"
  ],

  secret: "Psst… the world is a little brighter with you in it. ♡"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* START AFTER THE HTML IS READY */

document.addEventListener("DOMContentLoaded", () => {
  const intro = $("#intro");
  const experience = $("#experience");
  const enterButton = $("#enter");
  const skipButton = $("#skip");

  // Stop safely if an essential element is missing.
  if (!intro || !experience || !enterButton || !skipButton) {
    console.error("Birthday website: an essential HTML element is missing.");
    return;
  }

  // Personalise the page.
  $("#stamp").textContent = CONFIG.dateStamp;
  $("#letterText").textContent = CONFIG.letter;
  $("#signature").textContent = CONFIG.signature;
  document.title = `Happy Birthday, ${CONFIG.name} ♡`;

  // Ensure the intro is visible and the main page starts hidden.
  intro.hidden = false;
  experience.hidden = true;

  createPetals();
  setupReveals();
  setupComicPanels();
  setupKittenMessages();
  setupGallery();
  setupLetter();
  setupBirthdayWish();
  setupSecretFlower();

  // THE ENTER BUTTON — FIXED.
  let hasEntered = false;

  function enterUniverse(celebrate) {
    if (hasEntered) return;
    hasEntered = true;

    enterButton.disabled = true;
    skipButton.disabled = true;

    intro.classList.add("intro-exit");

    const finishIntro = () => {
      intro.hidden = true;
      experience.hidden = false;

      window.scrollTo({ top: 0, behavior: "auto" });

      // Reveal sections after the main page becomes visible.
      setupReveals();

      if (celebrate) {
        launchConfetti(90);
        floaters(["♡", "✦", "✧"], 12);
      }
    };

    if (reducedMotion) {
      finishIntro();
    } else {
      window.setTimeout(finishIntro, 650);
    }
  }

  enterButton.addEventListener("click", () => {
    enterUniverse(true);
  });

  skipButton.addEventListener("click", () => {
    enterUniverse(false);
  });
});


/* PETALS */

function createPetals() {
  const container = $("#petals");
  if (!container || reducedMotion) return;

  for (let i = 0; i < 14; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";
    petal.textContent = i % 2 ? "✿" : "❀";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${10 + Math.random() * 14}px`;
    petal.style.animationDuration = `${15 + Math.random() * 16}s`;
    petal.style.animationDelay = `${-Math.random() * 25}s`;

    container.appendChild(petal);
  }
}


/* SCROLL REVEALS */

let revealObserver = null;

function setupReveals() {
  const items = $$(".reveal");

  if (!("IntersectionObserver" in window) || reducedMotion) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }

  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(item => {
    if (!item.classList.contains("is-visible")) {
      revealObserver.observe(item);
    }
  });
}


/* COMIC PANELS */

function setupComicPanels() {
  $$(".comic-panel").forEach(panel => {
    panel.addEventListener("click", () => {
      panel.classList.remove("panel-hit");
      void panel.offsetWidth;
      panel.classList.add("panel-hit");

      floaters(["✦", "♡", "★"], 5);

      window.setTimeout(() => {
        panel.classList.remove("panel-hit");
      }, 600);
    });
  });
}


/* KITTEN MESSAGES */

function setupKittenMessages() {
  const button = $("#paw");
  const message = $("#pawMessage");
  if (!button || !message) return;

  let index = 0;

  button.addEventListener("click", () => {
    message.textContent =
      CONFIG.kittenMessages[index % CONFIG.kittenMessages.length];

    index++;
    floaters(["🐾", "♡"], 5);
  });
}


/* OPTIONAL PERSONAL PHOTOS */

function setupGallery() {
  const lightbox = $("#lightbox");
  if (!lightbox) return;

  const enlargedImage = $("img", lightbox);

  $$(".memory-card").forEach(card => {
    const image = $("img", card);
    if (!image) return;

    const path = `./images/${card.dataset.photo}`;

    image.addEventListener("load", () => {
      card.classList.add("has-photo");
    });

    image.addEventListener("error", () => {
      // Keep the illustrated placeholder if no photo exists.
      card.classList.remove("has-photo");
      image.removeAttribute("src");
    });

    image.src = path;

    card.addEventListener("click", () => {
      if (!card.classList.contains("has-photo")) return;

      enlargedImage.src = image.src;
      enlargedImage.alt = image.alt;

      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      } else {
        window.open(image.src, "_blank", "noopener");
      }
    });
  });

  $(".lightbox-close")?.addEventListener("click", () => {
    lightbox.close();
  });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener("close", () => {
    enlargedImage.removeAttribute("src");
  });
}


/* LETTER ENVELOPE */

function setupLetter() {
  const envelope = $("#envelope");
  const hint = $("#letterHint");
  if (!envelope || !hint) return;

  envelope.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("is-open");

    envelope.setAttribute("aria-expanded", String(isOpen));

    hint.textContent = isOpen
      ? "tap again to close ♡"
      : "tap the envelope to open ♡";

    if (isOpen) floaters(["♡"], 7);
  });
}


/* BIRTHDAY WISH */

function setupBirthdayWish() {
  const button = $("#wish");
  const cake = $("#cake");
  const message = $("#wishMessage");

  if (!button || !cake || !message) return;

  button.addEventListener("click", () => {
    cake.classList.add("cake-lit");
    message.textContent = CONFIG.wish;
    message.classList.add("wish-show");

    launchConfetti(150);
    floaters(["♡", "✦", "✧", "❀"], 18);

    button.textContent = "Wish made! ♡";
  });
}


/* SECRET FLOWER */

function setupSecretFlower() {
  const button = $("#bloom");
  const message = $("#secretMessage");

  if (!button || !message) return;

  button.addEventListener("click", () => {
    const bloomed = button.classList.toggle("bloomed");

    message.textContent = CONFIG.secret;
    message.classList.toggle("secret-show", bloomed);

    button.setAttribute("aria-expanded", String(bloomed));

    if (bloomed) floaters(["❀", "♡"], 10);
  });
}


/* FLOATING SYMBOLS */

function floaters(symbols = ["♡", "✦"], count = 10) {
  if (reducedMotion) return;

  for (let i = 0; i < count; i++) {
    const element = document.createElement("span");

    element.className = "floater";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${Math.random() * 100}%`;
    element.style.animationDelay = `${Math.random() * 0.5}s`;
    element.style.fontSize = `${15 + Math.random() * 16}px`;

    document.body.appendChild(element);

    window.setTimeout(() => element.remove(), 4200);
  }
}


/* CONFETTI */

const canvas = $("#confetti");
const ctx = canvas?.getContext("2d");

let particles = [];
let animationFrame = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


function launchConfetti(count = 100) {
  if (reducedMotion || !ctx) return;

  const colors = ["#b51f32", "#10182d", "#dca5ae", "#d0aa69", "#f4ead8"];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.55,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 12 - 3,
      size: 3 + Math.random() * 5,
      rotation: Math.random() * 6,
      color: colors[i % colors.length],
      life: 100 + Math.random() * 65
    });
  }

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(drawConfetti);
  }
}


function drawConfetti() {
  if (!ctx) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles = particles.filter(p => p.life-- > 0);

  particles.forEach(p => {
    p.vy += 0.18;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += 0.13;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
    ctx.restore();
  });

  animationFrame = particles.length
    ? requestAnimationFrame(drawConfetti)
    : 0;
}
