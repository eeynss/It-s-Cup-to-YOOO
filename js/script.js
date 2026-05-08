
const slideSources = [
  "img/straw.webp",
  "img/matcha.webp",
  "img/choco.webp",
  "img/mgraham.webp",
  "img/boba1.webp",
  "img/float.webp",
  "img/rabbit.webp",
  "img/palabok.webp",
  "img/tiramisu1.webp",
];

const slideTitles = [
  "Strawberry Bliss",
  "Matcha Cream",
  "Chocolate Soft Serve",
  "Mango Graham",
  "Sundae Boba",
  "Matcha Milktea Float",
  "Rabbit Float",
  "Palabok",
  "Banana Tiramisu",
];

const slideDecorImages = [
  "img/strawpart.webp",
  "img/matchapart.webp",
  "img/chocopart.webp",
  "img/mgraham11.webp",
  "img/boba2.webp",
  "img/floats.webp",
  "img/rabbitpart.webp",
  "img/palabokpart.webp",
  "img/tiramisu2.webp",
];

const sliderContainer = document.querySelector(".slider");
const titleDisplay = document.getElementById("slide-title");

if (sliderContainer && titleDisplay) {
  const SLIDE_WIDTH = 280;
  const SLIDE_HEIGHT = 380;
  const SLIDE_GAP = 300;
  const SLIDE_COUNT = slideSources.length;
  const ARC_DEPTH = 180;
  const CENTER_LIFT = 100;
  const SCROLL_LERP = 0.05;

  const trackWidth = SLIDE_COUNT * SLIDE_GAP;

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowCenterX = windowWidth / 2;
  let arcBaselineY = windowHeight * 0.35;

  let scrollCurrent = 0;
  let scrollTarget = 0;

  slideSources.forEach((src, i) => {
    const slideEl = document.createElement("div");
    slideEl.classList.add("slide");

    const bgImg = document.createElement("img");
    bgImg.src = slideDecorImages[i];
    bgImg.classList.add("slide-bg-img");

    const imgEl = document.createElement("img");
    imgEl.src = src;
    imgEl.classList.add("slide-product-img");

    slideEl.appendChild(bgImg);
    slideEl.appendChild(imgEl);
    sliderContainer.appendChild(slideEl);
  });

  const slideElements = gsap.utils.toArray(".slide");

  function computeSlideTransform(slideIndex, scrollOffset) {
    let wrappedOffset =
      (((slideIndex * SLIDE_GAP - scrollOffset) % trackWidth) + trackWidth) %
      trackWidth;

    if (wrappedOffset > trackWidth / 2) {
      wrappedOffset -= trackWidth;
    }

    const slideCenterX = windowCenterX + wrappedOffset;
    const normalizedDist = (slideCenterX - windowCenterX) / (windowWidth * 0.5);
    const absDist = Math.min(Math.abs(normalizedDist), 1.3);

    const scaleFactor = Math.max(1 - absDist * 0.8, 0.25);
    const scaledWidth = SLIDE_WIDTH * scaleFactor;
    const scaledHeight = SLIDE_HEIGHT * scaleFactor;

    const clampedDist = Math.min(absDist, 1);
    const arcDropY =
      (1 - Math.cos(clampedDist * Math.PI)) * 0.5 * ARC_DEPTH;

    const centerLiftY = Math.max(1 - absDist * 2, 0) * CENTER_LIFT;

    return {
      x: slideCenterX - scaledWidth / 2,
      y: arcBaselineY - scaledHeight / 2 + arcDropY - centerLiftY,
      width: scaledWidth,
      height: scaledHeight,
      zIndex: Math.round((1 - absDist) * 100),
      distanceFromCenter: Math.abs(wrappedOffset),
    };
  }

  function layoutSlides(scrollOffset) {
    slideElements.forEach((slideEl, i) => {
      const { x, y, width, height, zIndex } = computeSlideTransform(
        i,
        scrollOffset
      );

      gsap.set(slideEl, { x, y, width, height, zIndex });
    });
  }

  function syncActiveTitle(scrollOffset) {
    let closestIndex = 0;
    let closestDist = Infinity;

    slideElements.forEach((_, i) => {
      const { distanceFromCenter } = computeSlideTransform(i, scrollOffset);

      if (distanceFromCenter < closestDist) {
        closestDist = distanceFromCenter;
        closestIndex = i;
      }
    });

    slideElements.forEach((slide) => {
      slide.classList.remove("active");
    });

    slideElements[closestIndex].classList.add("active");
    titleDisplay.textContent = slideTitles[closestIndex];
  }

  sliderContainer.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      scrollTarget += e.deltaY * 0.7;
    },
    { passive: false }
  );

  function animate() {
    scrollCurrent += (scrollTarget - scrollCurrent) * SCROLL_LERP;
    layoutSlides(scrollCurrent);
    syncActiveTitle(scrollCurrent);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    windowCenterX = windowWidth / 2;
    arcBaselineY = windowHeight * 0.35;
  });

  animate();
}

/* HOME PAGE CUP CHANGER */
const heroItems = [
  {
    image: "img/prod.webp",
    title: "Classic Froyo Cup",
    desc: "Creamy soft serve with fun toppings.",
  },
  {
    image: "img/prod1.webp",
    title: "Loaded Dessert Cup",
    desc: "A sweet mix of sauce, crunch, and soft serve.",
  },
  {
    image: "img/prod2.webp",
    title: "Party Sprinkle Cup",
    desc: "Colorful, fun, and made for sharing.",
  },
  {
    image: "img/boba.webp",
    title: "Sundae Boba",
    desc: "Soft serve with chewy boba pearls.",
  },
  {
    image: "img/matchaice.webp",
    title: "Matcha Cream",
    desc: "A green tea favorite with a creamy swirl.",
  },
];

let heroIndex = 0;

const heroImage = document.getElementById("hero-product");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");

function changeHero() {
  if (!heroImage || !heroTitle || !heroDesc) return;

  heroIndex = (heroIndex + 1) % heroItems.length;

  heroImage.classList.add("is-changing");

  setTimeout(() => {
    heroImage.src = heroItems[heroIndex].image;
    heroImage.alt = heroItems[heroIndex].title;
    heroTitle.textContent = heroItems[heroIndex].title;
    heroDesc.textContent = heroItems[heroIndex].desc;

    heroImage.classList.remove("is-changing");
  }, 350);
}

if (heroImage && heroTitle && heroDesc) {
  setInterval(changeHero, 3000);
}

/* MOBILE NAV */
const menuButton = document.querySelector(".menu-button");
const siteNav = document.getElementById("site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

